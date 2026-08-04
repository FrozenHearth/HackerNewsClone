import { Skeleton } from "@/components/ui/skeleton";

function CommentRowSkeleton() {
  return (
    <li className="flex w-full flex-col gap-3" aria-hidden="true">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-px w-full" />
    </li>
  );
}

export function CommentsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      className="w-full border-t border-neutral-200"
      aria-busy="true"
      aria-label="Loading comments"
    >
      <Skeleton className="my-4 h-6 w-32" />
      <ul className="flex w-full flex-col gap-4">
        {Array.from({ length: count }, (_, index) => (
          <CommentRowSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
}

export default function StoryPageSkeleton() {
  return (
    <>
      <div
        className="flex flex-col gap-6 md:gap-4"
        aria-busy="true"
        aria-label="Loading story"
      >
        <Skeleton className="h-9 w-4/5 md:h-10" />
        <div className="flex flex-wrap gap-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-5/6" />
      </div>
    </>
  );
}
