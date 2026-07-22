import { getFeedPage, type FeedKey, type HnItem } from "@/api/hackerNews";
import { useEffect, useState } from "react";

export default function useFeedList(feed: FeedKey, pageSize = 20) {
  const [list, setList] = useState<HnItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setList([]);
    setPage(1);
    setHasMore(false);
    setIsInitialLoading(true);
    setIsLoadingMore(false);

    async function loadInitialPage() {
      try {
        const { items, hasMore } = await getFeedPage(feed, 1, pageSize);
        setList(items);
        setHasMore(hasMore);
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitialLoading(false);
      }
    }

    loadInitialPage();
  }, [feed, pageSize]);

  async function loadMore() {
    if (isInitialLoading || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      const { items, hasMore: more } = await getFeedPage(
        feed,
        nextPage,
        pageSize,
      );
      setList((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore(more);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
    }
  }

  return {
    list,
    hasMore,
    isInitialLoading,
    isLoadingMore,
    loadMore,
  };
}
