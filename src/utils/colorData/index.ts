// src/utils/colorData/index.ts
import { colorsBASIC } from "./colorsBASIC";
import { colorsHTML } from "./colorsHTML";
import { colorsNTC } from "./colorsNTC";
import { colorsPANTONE } from "./colorsPANTONE";
import { colorsX11 } from "./colorsX11";

export { colorsBASIC, colorsHTML, colorsNTC, colorsPANTONE, colorsX11 };

export const namedColors = [...colorsHTML, ...colorsNTC, ...colorsBASIC, ...colorsPANTONE, , ...colorsX11];