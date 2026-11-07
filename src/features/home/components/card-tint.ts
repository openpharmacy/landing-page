/**
 * Subtle colour glow emanating from the top-right corner of a card — the Figma
 * cards use a radial gradient (full-opacity colour → transparent) anchored near
 * the top-right; reproduced here at a low opacity so it reads as a faint tint.
 */
export function cardTint(color: string): string {
  return `radial-gradient(55% 80% at 96% 6%, ${color}0d, transparent 70%)`;
}
