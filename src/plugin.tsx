import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/base.scss";

const container = document.getElementById("color-list");
if (container) {
  const root = createRoot(container);

  const App = () => {
    const [colors, setColors] = React.useState([]);

    React.useEffect(() => {
      // Listen for messages from the main thread
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
          colors.map((color, index) => (
            <div key={index} className="color-card">
              <div className="color-info">
                <div className="color-name">{color.name}</div>
                <div className="color-value">HEX: {color.hex}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-colors">No colors found. Please select an element with a solid fill.</div>
        )}
      </div>
    );
  };

  root.render(<App />);
} else {
  console.error("Container element not found");
}