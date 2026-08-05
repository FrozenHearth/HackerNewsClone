import { NavLink } from "react-router";
import { feedLinks } from "@/components/feedLinks";

export default function Sidenav() {
  return (
    <nav
      className="hidden h-full w-60 flex-col border-r border-neutral-200 p-4 pt-6 text-sm xl:flex"
      aria-label="Feed categories"
    >
      <header className="flex items-center py-4">
        <img src="/logo.svg" alt="Hacker News" className="h-10 w-10" />
        <h1 className="text-sm font-medium text-neutral-950">Hacker News</h1>
      </header>
      <ul className="flex flex-col gap-1">
        {feedLinks.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 rounded-lg bg-orange-50 p-1.5 font-medium text-orange-600"
                  : "flex items-center gap-3 rounded-lg p-1.5 hover:bg-orange-50/90"
              }
            >
              {icon}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
