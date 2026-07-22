import type { FeedKey } from "@/api/hackerNews";
import {
  RiBriefcase3Line,
  RiEyeLine,
  RiHome6Line,
  RiSpeakLine,
} from "react-icons/ri";

const feedIcons = {
  new: RiHome6Line,
  ask: RiSpeakLine,
  show: RiEyeLine,
  jobs: RiBriefcase3Line,
} as const;

export default function EmptyState({ feed }: { feed: FeedKey }) {
  const Icon = feedIcons[feed];

  return (
    <section
      className="flex flex-1 items-center justify-center px-4 md:px-8 xl:px-[6.4rem] xl:py-10"
      aria-labelledby="empty-state-title"
    >
      <article className="w-full max-w-[20rem] p-6 text-center">
        <header>
          <Icon
            className="mx-auto mb-5 size-12 rounded-lg p-3 text-orange-500 shadow"
            aria-hidden="true"
          />
          <h2
            id="empty-state-title"
            className="mb-2 text-xl font-medium text-neutral-900"
          >
            No Posts Available
          </h2>
        </header>

        <p className="text-base font-normal text-neutral-900">
          Hang tight! We&apos;ll have more for you soon. If you believe this is
          an error, feel free to reach out to us.
        </p>

        <footer className="mt-5">
          <a
            href="mailto:support@greatfrontend.com"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-sm bg-orange-500 px-4 py-2.5 text-base font-medium text-white shadow-sm hover:bg-orange-800 focus:bg-orange-800 focus:ring-4 focus:ring-orange-600/12 focus:outline-none"
          >
            Contact
          </a>
        </footer>
      </article>
    </section>
  );
}
