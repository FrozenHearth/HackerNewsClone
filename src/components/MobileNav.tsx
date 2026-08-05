import { useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router";
import { RiCloseLine } from "react-icons/ri";
import { feedLinks } from "@/components/feedLinks";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return createPortal(
    <>
      <div
        aria-hidden="true"
        data-visible={open || undefined}
        onClick={onClose}
        className="pointer-events-none fixed top-0 left-0 z-40 h-dvh w-screen bg-transparent transition-colors duration-100 data-[visible=true]:pointer-events-auto data-[visible=true]:bg-neutral-500/50 data-[visible=true]:backdrop-blur-xs xl:hidden"
      />

      <aside
        id="mobile-nav"
        data-visible={open || undefined}
        aria-label="Main menu"
        aria-hidden={!open}
        className="fixed top-0 left-0 z-50 h-dvh -translate-x-full bg-white transition-transform data-[visible=true]:translate-x-0 xl:hidden"
      >
        <nav className="flex h-full w-60 flex-col border-r border-neutral-200 p-4 pt-6">
          <div className="flex items-center justify-between px-1 py-4">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="" className="h-8 w-8" />
              <span className="text-sm font-medium text-neutral-950">
                Hacker News
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex cursor-pointer items-center justify-center rounded-sm px-2.5 py-2 text-sm text-neutral-600 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 focus:ring-4 focus:ring-indigo-800/20 focus:outline-none"
            >
              <RiCloseLine className="size-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="flex flex-col gap-1 text-sm">
            {feedLinks.map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  tabIndex={open ? undefined : -1}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 rounded-lg bg-orange-50 p-1.5 font-medium text-orange-600"
                      : "flex items-center gap-3 rounded-lg p-1.5 text-neutral-700 hover:bg-orange-50/90"
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>,
    document.body,
  );
}
