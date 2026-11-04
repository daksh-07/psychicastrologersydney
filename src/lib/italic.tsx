import { Fragment, type ReactNode } from "react";

/** Renders `*word*` segments as <em> accents. */
export function withItalic(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
  );
}

export const plain = (text: string) => text.replace(/\*/g, "");
