import { RiArrowDownLine } from "react-icons/ri";

type LoadMoreButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function LoadMoreButton({
  onClick,
  disabled = false,
}: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className="justify-center mt-4 inline-flex items-center font-medium rounded-sm shadow-sm not-disabled:cursor-pointer disabled:cursor-not-allowed focus:outline-none focus:ring-4 [&_svg:not([class*='size-'])]:size-5 bg-white border border-neutral-200 text-neutral-950 hover:text-neutral-950 hover:bg-neutral-50 focus:bg-neutral-50 focus:shadow-none! focus:ring-indigo-800/20 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none! disabled:border-none px-3.5 py-2.5 text-sm gap-1.5 w-full md:w-fit"
    >
      <span className="px-0.5 text-sm font-medium text-neutral-900">More</span>
      <RiArrowDownLine className="size-5 text-neutral-900" aria-hidden="true" />
    </button>
  );
}
