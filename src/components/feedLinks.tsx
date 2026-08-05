import type { ReactNode } from "react";
import {
  RiBriefcase3Line,
  RiEyeLine,
  RiHome6Line,
  RiSpeakLine,
} from "react-icons/ri";

export const feedLinks: ReadonlyArray<{
  to: string;
  label: string;
  icon: ReactNode;
}> = [
  { to: "/new", label: "New", icon: <RiHome6Line size={20} /> },
  { to: "/ask", label: "Ask", icon: <RiSpeakLine size={20} /> },
  { to: "/show", label: "Show", icon: <RiEyeLine size={20} /> },
  { to: "/jobs", label: "Jobs", icon: <RiBriefcase3Line size={20} /> },
];
