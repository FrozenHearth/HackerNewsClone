import type { HnItem } from "@/api/hackerNews";
import { formatTimeAgo } from "@/lib/utils";

export type CommentNode = HnItem & { replies: CommentNode[] };

const bodyClass =
  "text-sm font-normal text-neutral-900 [&_a]:break-all [&_a]:font-medium [&_a]:text-orange-500 [&_a]:hover:text-orange-700 [&_code]:break-all";

const nestClass =
  "relative w-full pl-4 pt-7 before:absolute before:top-0 before:left-0 before:h-10 before:w-3 before:rounded-bl-lg before:border-b before:border-l before:border-neutral-300 before:content-[''] md:pl-8 md:before:left-2 md:before:w-4";

function CommentMeta({ comment }: { comment: CommentNode }) {
  return (
    <p className="text-sm font-normal text-neutral-600">
      <span className="font-semibold text-neutral-900">{comment.by}</span>
      {comment.time != null ? <> • {formatTimeAgo(comment.time)}</> : null}
    </p>
  );
}

function CommentBody({ comment }: { comment: CommentNode }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: comment.text ?? "" }}
      className={bodyClass}
    />
  );
}

function NestedComment({ comment }: { comment: CommentNode }) {
  return (
    <article className={nestClass}>
      <div className="flex w-full flex-col gap-3">
        <CommentMeta comment={comment} />
        <CommentBody comment={comment} />
      </div>
      {comment.replies.length > 0 ? (
        <div className="flex w-full flex-col">
          {comment.replies.map((reply) => (
            <NestedComment key={reply.id} comment={reply} />
          ))}
        </div>
      ) : null}
    </article>
  );
}

export default function CommentThread({ comment }: { comment: CommentNode }) {
  return (
    <li className="flex w-full flex-col gap-3">
      <CommentMeta comment={comment} />
      <CommentBody comment={comment} />
      {comment.replies.length > 0 ? (
        <div className="flex w-full flex-col">
          {comment.replies.map((reply) => (
            <NestedComment key={reply.id} comment={reply} />
          ))}
        </div>
      ) : null}
      <hr className="h-px w-full border-0 bg-neutral-200" />
    </li>
  );
}
