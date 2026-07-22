import type { FeedKey } from "@/api/hackerNews";
import List from "./List";
import useFeedList from "@/hooks/useFeedList";
import LoadMoreButton from "./LoadMoreButton";
import StoryListSkeleton from "./StoryListSkeleton";
import EmptyState from "./EmptyState";

export default function FeedPage({
  title,
  description,
  feed,
}: {
  title: string;
  description: string;
  feed: FeedKey;
}) {
  const { list, hasMore, isInitialLoading, isLoadingMore, loadMore } =
    useFeedList(feed, 20);

  const isEmpty = !isInitialLoading && list.length === 0;

  return (
    <main className="flex flex-1 flex-col overflow-auto xl:px-16">
      <header className="flex flex-col gap-2 px-4 py-8 md:px-8 xl:px-0">
        <h1 className="text-xl font-semibold text-neutral-900 md:text-2xl">
          {title}
        </h1>
        <p className="text-xs font-normal text-neutral-500 md:text-sm">
          {description}
        </p>
      </header>

      {isInitialLoading ? (
        <StoryListSkeleton count={8} />
      ) : isEmpty ? (
        <EmptyState feed={feed} />
      ) : (
        <List items={list} />
      )}

      {isLoadingMore ? <StoryListSkeleton count={4} /> : null}

      {hasMore && !isInitialLoading && !isEmpty ? (
        <LoadMoreButton onClick={loadMore} disabled={isLoadingMore} />
      ) : null}
    </main>
  );
}
