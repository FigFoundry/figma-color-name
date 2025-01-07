import chroma from "chroma-js";
import { namedColors } from "./colorData";

// Function to calculate text color based on background color
export function getTextColor(backgroundColor: string): string {
  const contrastWithWhite = chroma.contrast(backgroundColor, "#ffffff");
  const contrastWithBlack = chroma.contrast(backgroundColor, "#000000");
  return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000";
}

// Function to find the closest named color
export function getClosestNamedColor(hex: string): string {
  let closestColor = "Unknown Color";
  let minDistance = Infinity;

  for (const color of namedColors) {
    const distance = chroma.distance(hex, color.hex);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color.name;
    }
  }

  return closestColor;
}

// Convert RGB to HEX
export function rgbToHex(color: RGB): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
}

// Convert RGB to RGBA
export function rgbToRgba(color: RGB, opacity: number): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Convert RGB to HSL
export function rgbToHsl(color: RGB): string {
  const r = color.r;
  const g = color.g;
  const b = color.b;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Convert RGB to OKLCH (placeholder)
export function rgbToOklch(color: RGB): string {
  return "oklch(0.5, 0.2, 0.3)"; // Example value
}