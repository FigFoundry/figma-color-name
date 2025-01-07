// src/plugin.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/base.scss';

const container = document.getElementById('color-list');
if (container) {
  const root = createRoot(container);

  const App = () => {
    const [colors, setColors] = React.useState([]);

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
      <div>
        {colors.length > 0 ? (
          colors.map((color, index) => (
            <div key={index} className="color-info">
              <div><strong>Color Name:</strong> {color.name}</div>
              <div><strong>HEX:</strong> {color.hex}</div>
              <div><strong>RGBA:</strong> {color.rgba}</div>
              <div><strong>HSL:</strong> {color.hsl}</div>
              <div><strong>OKLCH:</strong> {color.oklch}</div>
            </div>
          ))
        ) : (
          <div>No colors found. Please select an element with a solid fill.</div>
        )}
      </div>
    );
  };

  root.render(<App />);
} else {
  console.error('Container element not found');
}