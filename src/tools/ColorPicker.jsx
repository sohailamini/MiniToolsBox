import React, { useState, useEffect } from "react";
import { Copy, CheckCircle, Palette, RefreshCw } from "lucide-react";

const ColorPicker = () => {
  const [color, setColor] = useState("#3b82f6");
  const [hex, setHex] = useState("#3b82f6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState("");
  const [colorHistory, setColorHistory] = useState([]);
  const [randomColors, setRandomColors] = useState([]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const updateColor = (newColor) => {
    setColor(newColor);
    setHex(newColor);

    const rgbValues = hexToRgb(newColor);
    if (rgbValues) {
      setRgb(rgbValues);
      const hslValues = rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b);
      setHsl(hslValues);
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const addToHistory = (color) => {
    if (!colorHistory.includes(color)) {
      setColorHistory((prev) => [color, ...prev.slice(0, 9)]);
    }
  };

  const generateRandomColor = () => {
    const randomHex =
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
    updateColor(randomHex);
    addToHistory(randomHex);
  };

  const generateRandomPalette = () => {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      colors.push(
        "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
      );
    }
    setRandomColors(colors);
  };

  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000000";
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  };

  useEffect(() => {
    updateColor(color);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Color Picker</h3>
        <p className="text-gray-300">
          Pick colors and get hex, RGB, HSL values with color palettes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Color Picker Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Color Picker
            </h4>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => {
                    updateColor(e.target.value);
                    addToHistory(e.target.value);
                  }}
                  className="w-16 h-16 rounded-lg border-2 border-gray-600 cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                        updateColor(value);
                        addToHistory(value);
                      } else {
                        setHex(value);
                      }
                    }}
                    className="input-field font-mono text-lg"
                    placeholder="#000000"
                  />
                </div>
                <button
                  onClick={() => copyToClipboard(hex, "hex")}
                  className="btn-secondary flex items-center space-x-2"
                >
                  {copied === "hex" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>Copy</span>
                </button>
              </div>

              <button
                onClick={generateRandomColor}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Generate Random Color</span>
              </button>
            </div>
          </div>

          {/* Color Values */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Color Values
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-300">HEX:</span>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-700 px-3 py-1 rounded font-mono">
                    {hex}
                  </code>
                  <button
                    onClick={() => copyToClipboard(hex, "hex")}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    {copied === "hex" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-300">RGB:</span>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-700 px-3 py-1 rounded font-mono">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                        "rgb"
                      )
                    }
                    className="text-gray-400 hover:text-gray-300"
                  >
                    {copied === "rgb" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-300">HSL:</span>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-700 px-3 py-1 rounded font-mono">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </code>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                        "hsl"
                      )
                    }
                    className="text-gray-400 hover:text-gray-300"
                  >
                    {copied === "hsl" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Color Preview & Palettes */}
        <div className="space-y-6">
          {/* Color Preview */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Color Preview
            </h4>

            <div className="space-y-4">
              <div
                className="w-full h-32 rounded-lg border-2 border-gray-600 flex items-center justify-center text-2xl font-bold"
                style={{
                  backgroundColor: color,
                  color: getContrastColor(color),
                }}
              >
                Sample Text
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div
                  className="h-16 rounded border flex items-center justify-center text-sm font-medium"
                  style={{
                    backgroundColor: color,
                    color: getContrastColor(color),
                  }}
                >
                  Primary
                </div>
                <div
                  className="h-16 rounded border flex items-center justify-center text-sm font-medium"
                  style={{ backgroundColor: color + "20", color: color }}
                >
                  Light
                </div>
              </div>
            </div>
          </div>

          {/* Random Palette Generator */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">
                Random Palette
              </h4>
              <button
                onClick={generateRandomPalette}
                className="btn-secondary flex items-center space-x-2"
              >
                <Palette className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {randomColors.map((color, index) => (
                <div
                  key={index}
                  className="h-16 rounded border cursor-pointer hover:scale-105 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    updateColor(color);
                    addToHistory(color);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Color History */}
          {colorHistory.length > 0 && (
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Recent Colors
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {colorHistory.map((color, index) => (
                  <div
                    key={index}
                    className="h-12 rounded border cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => updateColor(color)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;

