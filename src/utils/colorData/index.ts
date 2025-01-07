// src/utils/colorData/index.ts
import { colorsBASIC } from "./colorsBASIC";
import { colorsHTML } from "./colorsHTML";
import { colorsNTC } from "./colorsNTC";
import { colorsPANTONE } from "./colorsPANTONE";
import { colorsROY } from "./colorsROY";
import { colorsX11 } from "./colorsX11";

// Export individual datasets
export { colorsBASIC, colorsHTML, colorsNTC, colorsPANTONE, colorsROY, colorsX11 };

// Export combined array (optional)
export const namedColors = [...colorsHTML, ...colorsNTC, ...colorsBASIC, ...colorsPANTONE, ...colorsROY, ...colorsX11];