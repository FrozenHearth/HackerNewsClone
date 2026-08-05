const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const CACHE_TTL_MS = 5 * 60 * 1000;

export const FEEDS = {
  new: "newstories",
  ask: "askstories",
  show: "showstories",
  jobs: "jobstories",
} as const;

export type FeedKey = keyof typeof FEEDS;

export type HnItem = {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
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

const feedCache = new Map<FeedKey, { ids: number[]; fetchedAt: number }>();
const itemCache = new Map<number, { item: HnItem; fetchedAt: number }>();

function isFresh(fetchedAt: number) {
  return Date.now() - fetchedAt < CACHE_TTL_MS;
}

async function getJson(path: string) {
  const response = await fetch(`${BASE_URL}/${path}.json`);
  if (!response.ok) {
    throw new Error(`HN ${response.status}: ${path}`);
  }
  return response.json();
}

export async function getFeedIds(feed: FeedKey) {
  const cached = feedCache.get(feed);
  if (cached && isFresh(cached.fetchedAt)) {
    return cached.ids;
  }

  const ids = await getJson(FEEDS[feed]);
  feedCache.set(feed, { ids, fetchedAt: Date.now() });
  return ids;
}

export async function getItem(id: number) {
  const cached = itemCache.get(id);
  if (cached && isFresh(cached.fetchedAt)) {
    return cached.item;
  }

  const item = await getJson(`item/${id}`);
  if (item) {
    itemCache.set(id, { item, fetchedAt: Date.now() });
  }
  return item;
}

export async function getItems(ids: number[]) {
  const items = await Promise.all(ids.map(getItem));
  return items?.filter((item) => item != null);
}

export async function getFeedPage(feed: FeedKey, page = 1, pageSize = 20) {
  const ids = await getFeedIds(feed);
  const start = (page - 1) * pageSize;
  const items = await getItems(ids.slice(start, start + pageSize));

  return {
    items,
    hasMore: start + pageSize < ids.length,
  };
}
