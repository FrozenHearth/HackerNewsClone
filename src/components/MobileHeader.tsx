import { RiCloseLine, RiMenuLine } from "react-icons/ri";
import { Link } from "react-router";

type MobileHeaderProps = {
  menuOpen: boolean;
  onMenuToggle: () => void;
};

export default function MobileHeader({
  menuOpen,
  onMenuToggle,
}: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-neutral-200 px-3 py-4 md:px-8 xl:hidden">
      <Link
        to="/new"
        className="flex items-center gap-1"
        onClick={() => {
          if (menuOpen) onMenuToggle();
        }}
      >
        <img src="/logo.svg" alt="" className="h-8 w-8" />
        <span className="text-base font-medium text-neutral-950">
          Hacker News
        </span>
      </Link>

      <button
        type="button"
        onClick={onMenuToggle}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="inline-flex cursor-pointer items-center justify-center rounded-sm text-lg text-neutral-600 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 focus:ring-4 focus:ring-indigo-800/20 focus:outline-none"
      >
        {menuOpen ? (
          <RiCloseLine className="size-6" aria-hidden="true" />
        ) : (
          <RiMenuLine className="size-6" aria-hidden="true" />
        )}
      </button>
    </header>
  );
}
