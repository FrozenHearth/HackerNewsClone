import { NavLink } from "react-router";
import {
  RiBriefcase3Line,
  RiEyeLine,
  RiHome6Line,
  RiSpeakLine,
} from "react-icons/ri";

const links = [
  { to: "/new", label: "New", icon: <RiHome6Line size={20} /> },
  { to: "/ask", label: "Ask", icon: <RiSpeakLine size={20} /> },
  { to: "/show", label: "Show", icon: <RiEyeLine size={20} /> },
  { to: "/jobs", label: "Jobs", icon: <RiBriefcase3Line size={20} /> },
] as const;

export default function Sidenav() {
  return (
    <nav
      className="text-sm xl:flex flex-col w-60 p-4 pt-6 border-r border-sidebar-border h-full hidden"
      aria-label="Feed categories"
    >
      <header className="py-4 flex items-center">
        <img src="/logo.svg" alt="Hacker News" className="w-10 h-10" />
        <h1 className="text-neutral-950 font-medium text-sm">Hacker News</h1>
      </header>
      <ul className="flex flex-col gap-1">
        {links.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "bg-orange-50 font-medium text-orange-600 flex items-center gap-3 p-1.5 rounded-lg"
                  : "hover:bg-orange-50/90 flex items-center gap-3 p-1.5 rounded-lg"
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
