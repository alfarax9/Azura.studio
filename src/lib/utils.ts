import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge classifies any unrecognised `text-*` class as a colour, so a
 * custom size token (`text-display`) and a colour (`text-ink`) look like the
 * same group and one silently wins. Declaring both sets keeps them independent.
 */
const FONT_SIZES = ["display", "headline", "title", "subtitle", "lead", "tag", "nav", "cta"];

const COLORS = [
  "void",
  "ink",
  "cream",
  "off-white",
  "azure",
  "azure-light",
  "ember",
  "muted",
  "grey",
  "background",
  "foreground",
  "hairline",
  "hairline-invert",
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

/** "01", "02" … used for the numbered index labels across the site. */
export function pad(n: number, width = 2) {
  return String(n).padStart(width, "0");
}
