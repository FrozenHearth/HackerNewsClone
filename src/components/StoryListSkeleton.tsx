import { Skeleton } from "@/components/ui/skeleton";

function StoryRowSkeleton() {
  return (
    <div
      className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-6"
      aria-hidden="true"
    >
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4 max-w-md" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

type StoryListSkeletonProps = {
  count?: number;
};

export default function StoryListSkeleton({
  count = 8,
}: StoryListSkeletonProps) {
  return (
    <ul
      className="flex flex-col px-4 md:px-8 xl:px-0"
      aria-busy="true"
      aria-label="Loading stories"
    >
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <StoryRowSkeleton />
        </li>
      ))}
    </ul>
  );
}
