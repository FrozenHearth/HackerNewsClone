const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const FEEDS = {
  new: "newstories",
  ask: "askstories",
  show: "showstories",
  jobs: "jobstories",
} as const;

export type FeedKey = keyof typeof FEEDS;

export type HnItem = {
  id: number;
  type: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time: number;
  title?: string;
  text?: string;
  url?: string;
  score?: number;
  descendants?: number;
  kids?: number[];
  parts?: number[];
  dead?: boolean;
  deleted?: boolean;
};

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path}.json`);

  if (!response.ok) {
    throw new Error(`HN API error ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}

export function getFeedIds(feed: FeedKey) {
  return getJson<number[]>(FEEDS[feed]);
}

export function getItem(id: number) {
  return getJson<HnItem | null>(`item/${id}`);
}

export async function getItems(ids: number[]) {
  const items = await Promise.all(ids.map((id) => getItem(id)));
  return items.filter((item) => item != null) as HnItem[];
}

export async function getFeedPage(feed: FeedKey, page = 1, pageSize = 20) {
  const ids = await getFeedIds(feed);
  const start = (page - 1) * pageSize;
  const pageIds = ids.slice(start, start + pageSize);
  const items = await getItems(pageIds);

  return {
    items,
    hasMore: start + pageSize < ids.length,
  };
}
