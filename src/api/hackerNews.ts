const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export const FEEDS = {
  new: "newstories",
  ask: "askstories",
  show: "showstories",
  jobs: "jobstories",
} as const;

export type FeedKey = keyof typeof FEEDS;

export type HnItemType = "job" | "story" | "comment" | "poll" | "pollopt";

/** Hacker News item from `/v0/item/:id.json`. */
export type HnItem = {
  id: number;
  deleted?: boolean;
  type?: HnItemType;
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
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
