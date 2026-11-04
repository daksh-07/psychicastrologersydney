import type { ElementType } from "react";

/**
 * Hero headline with a per-word masked rise, rendered on the server and animated purely in CSS
 * (see `.hw` in globals.css). It starts at first paint — no hydration or JS dependency — and stays
 * fully responsive because each word wraps naturally. `*word*` segments become italic accents.
 */
export function HeroTitle({ text, className, as: Tag = "h1", id }: { text: string; className?: string; as?: ElementType; id?: string }) {
  let n = 0;
  const segments = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <Tag id={id} className={className}>
      {segments.map((seg, si) => {
        const italic = seg.startsWith("*") && seg.endsWith("*");
        const words = (italic ? seg.slice(1, -1) : seg).split(/(\s+)/);
        return words.map((w, wi) => {
          if (!w) return null;
          if (/^\s+$/.test(w)) return " ";
          const i = n++;
          const inner = (
            <span className="hw" key={`${si}-${wi}`}>
              <span style={{ ["--w" as string]: i }}>{w}</span>
            </span>
          );
          return italic ? <em key={`${si}-${wi}`}>{inner}</em> : inner;
        });
      })}
    </Tag>
  );
}
