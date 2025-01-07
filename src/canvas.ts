import { rgbToHex, rgbToRgba, rgbToHsl, rgbToOklch, getColorName } from './utils/colorUtils';

figma.showUI(__html__, { themeColors: true, width: 280, height: 272 });

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
          const rgba = rgbToRgba(color, fill.opacity || 1);
          const hsl = rgbToHsl(color);
          const oklch = rgbToOklch(color);
          const colorName = getColorName(hex);

          colors.push({
            name: colorName,
            hex,
            rgba,
            hsl,
            oklch,
          });
        }
      }
    }
  }

  figma.ui.postMessage({ type: "colors", colors });
}

figma.on("selectionchange", () => {
  extractColorsFromSelection();
});

extractColorsFromSelection();