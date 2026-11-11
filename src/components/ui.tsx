/** Button label that rolls up on hover and comes back from below (see `.roll`). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}

const glyph = { "up-right": "↗", right: "→", down: "↓" } as const;

/** Arrow that leaves in its own direction on hover and re-enters behind itself (see `.arrow`). */
export function Arrow({ dir = "up-right" }: { dir?: keyof typeof glyph }) {
  return (
    <span aria-hidden className="arrow" data-dir={dir} data-arrow={glyph[dir]}>
      <span>{glyph[dir]}</span>
    </span>
  );
}
