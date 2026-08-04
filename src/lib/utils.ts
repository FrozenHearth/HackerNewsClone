import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { twMerge } from "tailwind-merge";

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(unixSeconds: number) {
  return dayjs.unix(unixSeconds).fromNow();
}

export function formatTimeIso(unixSeconds: number) {
  return dayjs.unix(unixSeconds).toISOString();
}

export function decodeHtmlEntities(text: string) {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.documentElement.textContent ?? "";
}
