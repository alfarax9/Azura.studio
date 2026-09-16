import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge classifies any unrecognised `text-*` class as a colour, so a
 * size token (`text-body`) and a colour (`text-secondary`) look like the same
 * group and one silently wins. Declaring both sets keeps them independent.
 */
const FONT_SIZES = [
  "hero",
  "section",
  "feature",
  "card-title",
  "intro",
  "body",
  "eyebrow",
  "meta",
  "nav",
  "metric",
];

const COLORS = [
  "canvas",
  "card",
  "elevated",
  "hairline",
  "primary",
  "secondary",
  "blue",
  "blue-fill",
  "blue-fill-hover",
  "link",
  "red",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: FONT_SIZES }],
      "text-color": [{ text: COLORS }],
      "bg-color": [{ bg: COLORS }],
      "border-color": [{ border: COLORS }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
