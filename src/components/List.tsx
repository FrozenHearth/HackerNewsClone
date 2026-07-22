import {
  RiArrowUpSFill,
  RiChat3Line,
  RiLink,
  RiTimeLine,
  RiUserLine,
} from "react-icons/ri";

export default function List() {
  const points: number = 1;
  const commentCount: number = 0;

  return (
    <ul className="flex flex-col px-4 md:px-8 xl:px-0" aria-label="Stories">
      <li>
        <article className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 py-6">
          <span
            className="row-span-2 flex size-10 items-center justify-center rounded-full bg-neutral-50 p-2"
            aria-hidden="true"
          >
            <RiLink className="size-5 text-neutral-700" />
          </span>

          <h2 className="flex flex-wrap items-baseline gap-1">
            <a
              href="https://justdiggit.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-900 hover:underline"
            >
              Justdiggit - Cooling Down the Planet
            </a>
            <span className="text-xs font-normal text-neutral-600">
              (justdiggit.org)
            </span>
          </h2>

          <ul className="flex flex-wrap items-center gap-3 text-xs font-normal text-neutral-600">
            <li className="flex items-center gap-1">
              <RiArrowUpSFill
                className="size-4 text-neutral-700"
                aria-hidden="true"
              />
              {points} {points === 1 ? "point" : "points"}
            </li>

            <li className="flex items-center gap-1">
              <RiUserLine
                className="size-4 text-neutral-700"
                aria-hidden="true"
              />
              by{" "}
              <a
                href="#user-dgudkov"
                className="font-medium text-orange-500 hover:underline"
              >
                dgudkov
              </a>
            </li>

            <li className="flex items-center gap-1">
              <RiTimeLine
                className="size-4 text-neutral-700"
                aria-hidden="true"
              />
              <time dateTime="2026-07-22T15:00:00Z">5 minutes ago</time>
            </li>

            {commentCount > 0 && (
              <li className="flex items-center gap-1">
                <RiChat3Line
                  className="size-4 text-neutral-700"
                  aria-hidden="true"
                />
                {commentCount} {commentCount === 1 ? "comment" : "comments"}
              </li>
            )}
          </ul>
        </article>
      </li>
    </ul>
  );
}
