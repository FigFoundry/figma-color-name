import { colorsHTML, colorsNTC, colorsPANTONE, colorsX11 } from "./utils/colorData";

figma.showUI(__html__, { themeColors: true, width: 280, height: 400 });

function extractColorsFromSelection() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.ui.postMessage({ type: "no-selection" });
    return;
  }

  const colors = [];

  for (const node of selection) {
    if ("fills" in node) {
      const fills = node.fills as Paint[];
      for (const fill of fills) {
        if (fill.type === "SOLID") {
          const color = fill.color;
          const hex = rgbToHex(color);
          const names = findClosestColors(hex);

          colors.push({
            hex,
            names
          });
        }
      }
    }
  }

  figma.ui.postMessage({ type: "colors", colors });
}

function findClosestColors(hex: string): string[] {
  const datasets = [colorsHTML, colorsNTC, colorsPANTONE, colorsX11];
  const matches = [];

  for (const dataset of datasets) {
    let minDistance = Infinity;
    let closestName = '';

    for (const color of dataset) {
      const distance = getColorDistance(hex, color.hex);
      if (distance < minDistance) {
        minDistance = distance;
        closestName = color.name;
      }
    }

    // Always add the closest name, even if it doesn't meet the threshold
    matches.push(closestName);
  }

  // Remove duplicates and similar words
  return [...new Set(matches)].reduce((unique, name) => {
    const words = name.toLowerCase().split(' ');
    const shouldAdd = !unique.some(existing => {
      const existingWords = existing.toLowerCase().split(' ');
      return words.some(word => existingWords.includes(word));
    });
    
    if (shouldAdd) {
      unique.push(name);
    }
    return unique;
  }, [] as string[]);
}

function rgbToHex(color: RGB): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
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

figma.on("selectionchange", () => {
  extractColorsFromSelection();
});

extractColorsFromSelection();