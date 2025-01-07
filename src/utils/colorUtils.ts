import { namedColors } from "./colorData";

export function getClosestNamedColor(hex: string): string {
  let closestColor = "Unknown Color";
  let minDistance = Infinity;

  for (const color of namedColors) {
    const distance = getColorDistance(hex, color.hex);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color.name;
    }
  }
  return closestColor;
}

function getColorDistance(hex1: string, hex2: string): number {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);

  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);

  return Math.sqrt(
    Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2)
  );
}