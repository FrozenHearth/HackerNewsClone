import type { HnItem } from "@/api/hackerNews";
import { decodeHtmlEntities } from "@/lib/utils";

function scoreOf(item: HnItem) {
  return item.score || 0;
}

export default function PollOptions({
  pollOptions,
}: {
  pollOptions: HnItem[];
}) {
  const options = [...pollOptions].sort((a, b) => scoreOf(b) - scoreOf(a));
  const maxScore = Math.max(...options.map(scoreOf), 1);

  return (
    <ul className="flex w-full flex-col gap-2" aria-label="Poll options">
      {options.map((item) => {
        const score = scoreOf(item);
        const width = (score / maxScore) * 100;

        return (
          <li
            key={item.id}
            className="flex items-center gap-2 hover:bg-orange-50/50"
          >
            <div className="relative min-h-9 flex-1">
              <div
                className="absolute h-full rounded-lg bg-orange-200"
                style={{ width: `${width}%` }}
              />
              <p className="relative p-2 text-sm font-normal text-neutral-900 mix-blend-darken">
                {decodeHtmlEntities(item.text || "")}
              </p>
            </div>
            <span className="w-25 text-right text-sm font-medium text-neutral-900">
              {score} {score === 1 ? "point" : "points"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
