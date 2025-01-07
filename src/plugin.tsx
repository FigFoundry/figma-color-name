import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/base.scss";

// Color conversion functions
const convertToRgba = (hex: string): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

const hexToHsl = (hex: string): string => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

const hexToCmyk = (hex: string): string => {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let k = 1 - Math.max(r, g, b);
  let c = (1 - r - k) / (1 - k);
  let m = (1 - g - k) / (1 - k);
  let y = (1 - b - k) / (1 - k);

  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
};

const hexToOklch = (hex: string): string => {
  return `oklch(${Math.round(Math.random() * 100)}% ${Math.round(Math.random() * 0.3 * 100) / 100} ${Math.round(Math.random() * 360)})`;
};

// Helper function to title case
const toTitleCase = (str: string): string => {
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const App = () => {
  const [colors, setColors] = React.useState<{ hex: string; names: string[] }[]>([]);

  React.useEffect(() => {
    window.onmessage = (event) => {
      if (event.data.pluginMessage.type === "colors") {
        setColors(event.data.pluginMessage.colors);
      } else if (event.data.pluginMessage.type === "no-selection") {
        setColors([]);
      }
    };
  }, []);

  return (
    <div className="color-grid">
      {colors.length > 0 ? (
        colors.map((color, index) => {
          const textColor = parseInt(color.hex.slice(1), 16) > 0xffffff / 2 ? '#000' : '#fff';
          
          return (
            <div 
              key={index} 
              className="color-card" 
              style={{
                backgroundColor: color.hex,
                color: textColor,
              }}
            >
              <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                {color.names && color.names.length > 0
                  ? `${color.names.map(toTitleCase).join(', ')}`
                  : "Not available"}
              </div>
              <div className="meta-content">
                <div>{color.hex}</div>
                <div>{convertToRgba(color.hex)}</div>
                <div>{hexToHsl(color.hex)}</div>
                {/* <div>{hexToOklch(color.hex)}</div> */}
                <div>{hexToCmyk(color.hex)}</div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="no-colors">Select an element with a solid fill.</div>
      )}
    </div>
  );
};

const container = document.getElementById("color-list");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Container element not found");
}