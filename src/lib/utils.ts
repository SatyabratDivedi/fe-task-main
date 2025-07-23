import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitlecase(s: string) {
  return s
    .replace(/^[-_]*(.)/, (_, c: string) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c: string) => " " + c.toUpperCase());
}
