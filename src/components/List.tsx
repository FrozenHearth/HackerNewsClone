import type { HnItem } from "@/api/hackerNews";
import { formatTimeAgo, formatTimeIso } from "@/lib/utils";
import {
  RiArrowUpDoubleLine,
  RiArticleLine,
  RiBarChart2Line,
  RiChat2Line,
  RiExternalLinkLine,
  RiTimeLine,
  RiUserLine,
} from "react-icons/ri";
import { useNavigate } from "react-router";

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

type CardKind = "url" | "article" | "poll";

function getCardKind(item: HnItem): CardKind {
  if (item.type === "poll") return "poll";
  if (item.url) return "url";
  return "article";
}

function StoryMeta({ item }: { item: HnItem }) {
  const commentCount = item.descendants ?? 0;

  return (
    <ul className="flex flex-wrap items-center gap-3 text-xs font-normal text-neutral-600">
      {item.score != null && (
        <li className="flex items-center gap-1">
          <RiArrowUpDoubleLine
            className="size-4 text-neutral-700"
            aria-hidden="true"
          />
          {item.score} {item.score === 1 ? "point" : "points"}
        </li>
      )}

      {item.by ? (
        <li className="flex items-center gap-1">
          <RiUserLine className="size-4 text-neutral-700" aria-hidden="true" />
          by <span className="font-medium text-orange-500">{item.by}</span>
        </li>
      ) : null}

      {item.time != null ? (
        <li className="flex items-center gap-1">
          <RiTimeLine className="size-4 text-neutral-700" aria-hidden="true" />
          <time dateTime={formatTimeIso(item.time)}>
            {formatTimeAgo(item.time)}
          </time>
        </li>
      ) : null}

      {commentCount > 0 ? (
        <li className="flex items-center gap-1">
          <RiChat2Line
            className="text-neutral-900"
            size={20}
            aria-hidden="true"
          />
          {commentCount} {commentCount === 1 ? "comment" : "comments"}
        </li>
      ) : null}
    </ul>
  );
}

function StoryIcon({ kind }: { kind: CardKind }) {
  if (kind === "url") {
    return <RiExternalLinkLine className="size-5 text-neutral-700" />;
  }
  if (kind === "poll") {
    return <RiBarChart2Line className="size-5 text-neutral-700" />;
  }
  return <RiArticleLine className="size-5 text-neutral-700" />;
}

function StoryContent({ item, kind }: { item: HnItem; kind: CardKind }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() =>
        kind !== "url" &&
        navigate(`/story/${item.id}`, { state: { item } })
      }
      className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 py-6"
    >
      <span
        className="row-span-2 flex size-10 items-center justify-center rounded-full bg-neutral-50 p-2"
        aria-hidden="true"
      >
        <StoryIcon kind={kind} />
      </span>

      <h2 className="flex flex-wrap items-baseline gap-1">
        <span className="text-sm font-medium text-neutral-900">
          {item.title ?? ""}
        </span>
        {kind === "url" && item.url ? (
          <span className="text-xs font-normal text-neutral-600">
            ({getDomain(item.url)})
          </span>
        ) : null}
      </h2>

      <StoryMeta item={item} />
    </article>
  );
}

export default function List({ items }: { items: HnItem[] }) {
  return (
    <ul className="flex flex-col px-4 md:px-8 xl:px-0" aria-label="Stories">
      {items.map((item) => {
        const kind = getCardKind(item);
        const rowClassName = "cursor-pointer rounded-lg hover:bg-orange-50";

        if (kind === "url" && item.url) {
          return (
            <li key={item.id} className={rowClassName}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <StoryContent item={item} kind="url" />
              </a>
            </li>
          );
        }

        return (
          <li key={item.id} className={rowClassName}>
            <StoryContent item={item} kind={kind} />
          </li>
        );
      })}
    </ul>
  );
}
