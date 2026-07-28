import { getItem, type HnItem } from "@/api/hackerNews";
import { formatTimeAgo, formatTimeIso } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowUpDoubleLine,
  RiChat2Line,
  RiPenNibLine,
  RiTimeLine,
} from "react-icons/ri";
import { useLocation, useNavigate, useParams } from "react-router";

const backButtonClass =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-sm px-3.5 py-2.5 text-sm font-medium text-orange-500 hover:text-orange-800 focus:bg-neutral-50 focus:text-orange-800 focus:ring-4 focus:ring-orange-800/20 focus:outline-none disabled:cursor-not-allowed disabled:text-neutral-400";

const metaRowClass =
  "flex flex-nowrap items-center gap-1 text-sm font-normal text-secondary-foreground";

const commentBodyClass =
  "text-sm font-normal text-neutral-900 [&_a]:break-all [&_a]:font-normal [&_a]:text-orange-500 [&_a]:hover:text-orange-700 [&_code]:break-all";

async function loadComments(kids: number[]) {
  const results = await Promise.all(kids?.map((id) => getItem(id)));
  return results?.filter((item): item is HnItem => item != null);
}

export default function StoryPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [story, setStory] = useState<HnItem | null>(null);
  const [comments, setComments] = useState<HnItem[]>([]);

  useEffect(() => {
    const storyId = id ? Number(id) : location.state?.item?.id;
    if (!storyId || Number.isNaN(storyId)) return;

    let cancelled = false;

    async function loadItemsAndComments() {
      try {
        const item =
          location.state?.item?.id === storyId
            ? location.state.item
            : await getItem(storyId);

        if (cancelled || !item) return;

        setStory(item);
        setComments(item.kids?.length ? await loadComments(item.kids) : []);
      } catch (error) {
        console.error(error);
      }
    }

    loadItemsAndComments();

    return () => {
      cancelled = true;
    };
  }, [id, location.state]);

  const commentCount = story?.descendants ?? 0;

  return (
    <main className="flex flex-1 flex-col overflow-auto xl:px-16">
      <header className="px-4 py-6 md:pb-4 md:pt-10 xl:px-0 xl:py-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={backButtonClass}
        >
          <RiArrowLeftLine className="size-5" aria-hidden="true" />
          Back
        </button>
      </header>

      <section className="flex w-full flex-col gap-12 overflow-x-auto px-4 py-6 md:gap-10 md:px-8 md:py-10 xl:mx-auto xl:max-w-222.5 xl:px-0">
        <div className="flex flex-col gap-6 md:gap-4">
          <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
            {story?.title ?? ""}
          </h1>

          <div className="flex flex-wrap gap-3">
            {story?.score != null && (
              <div className={metaRowClass}>
                <RiArrowUpDoubleLine
                  className="text-neutral-900"
                  size={20}
                  aria-hidden="true"
                />
                {story.score} {story.score === 1 ? "point" : "points"}
              </div>
            )}

            <div className={metaRowClass}>
              <RiPenNibLine
                className="text-neutral-900"
                size={20}
                aria-hidden="true"
              />
              by{" "}
              <span className="font-medium text-orange-500">
                {story?.by ?? ""}
              </span>
            </div>

            {story?.time != null && (
              <div className={metaRowClass}>
                <RiTimeLine
                  className="text-neutral-900"
                  size={20}
                  aria-hidden="true"
                />
                <time dateTime={formatTimeIso(story.time)}>
                  {formatTimeAgo(story.time)}
                </time>
              </div>
            )}

            {commentCount > 0 && (
              <div className={metaRowClass}>
                <RiChat2Line
                  className="text-neutral-900"
                  size={20}
                  aria-hidden="true"
                />
                {commentCount === 1
                  ? `${commentCount} comment`
                  : `${commentCount} comments`}
              </div>
            )}
          </div>
        </div>

        <article
          dangerouslySetInnerHTML={{ __html: story?.text ?? "" }}
          className="flex flex-col gap-6 text-base font-normal text-neutral-600 md:text-lg"
        />

        {story?.kids?.length ? (
          <footer className="w-full border-t border-neutral-200">
            <h2 className="py-4 text-lg font-medium text-neutral-900">
              {commentCount === 1
                ? `${commentCount} comment`
                : `${commentCount} comments`}
            </h2>
            <ul className="flex w-full flex-col gap-4">
              {comments.map((comment) => (
                <li key={comment.id} className="flex w-full flex-col gap-3">
                  <p className="text-sm font-normal text-neutral-600">
                    <span className="font-semibold text-neutral-900">
                      {comment.by}
                    </span>{" "}
                    • {formatTimeAgo(comment.time ?? 0)}
                  </p>
                  <article
                    dangerouslySetInnerHTML={{ __html: comment.text ?? "" }}
                    className={commentBodyClass}
                  />
                  <hr className="h-px w-full border-0 bg-neutral-200" />
                </li>
              ))}
            </ul>
          </footer>
        ) : null}
      </section>
    </main>
  );
}
