import { getClosestNamedColor } from "./utils/colorUtils";

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
          const colorName = getClosestNamedColor(hex);

          colors.push({
            name: colorName,
            hex,
          });
        }
      }
    }
  }

  // Send the colors to the UI
  figma.ui.postMessage({ type: "colors", colors });
}

// Convert RGB to HEX
function rgbToHex(color: RGB): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`.toUpperCase();
}

// Listen for selection changes
figma.on("selectionchange", () => {
  extractColorsFromSelection();
});

// Initial call to extract colors when the plugin loads
extractColorsFromSelection();