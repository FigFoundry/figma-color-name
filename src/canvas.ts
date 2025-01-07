import { rgbToHex, rgbToRgba, rgbToHsl, rgbToOklch, getClosestNamedColor, getTextColor } from "./utils/colorUtils";

// Show the plugin UI
figma.showUI(__html__, { themeColors: true, width: 280, height: 272 });

// Function to extract colors from the current selection
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
          const colorName = getClosestNamedColor(hex);
          const textColor = getTextColor(hex);

          colors.push({
            name: colorName,
            hex,
            rgba,
            hsl,
            oklch,
            textColor,
          });
        }
      }
    }
  }

  // Send the colors to the UI
  figma.ui.postMessage({ type: "colors", colors });
}

// Listen for selection changes
figma.on("selectionchange", () => {
  extractColorsFromSelection();
});

// Initial call to extract colors when the plugin loads
extractColorsFromSelection();