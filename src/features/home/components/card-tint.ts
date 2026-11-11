export function cardTint(color: string): string {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' preserveAspectRatio='none'>" +
    "<radialGradient id='g' gradientUnits='userSpaceOnUse' cx='.5' cy='.5' r='.5' " +
    "gradientTransform='matrix(0.00277 -1.04046 0.42405 -0.01212 0.72011 0.69392)'>" +
    `<stop stop-color='${color}'/><stop offset='1' stop-color='#fff' stop-opacity='0'/>` +
    "</radialGradient><rect width='1' height='1' fill='url(#g)' opacity='.05'/></svg>";
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
