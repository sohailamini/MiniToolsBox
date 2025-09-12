import React, { useState } from "react";
import { ArrowUpDown, Calculator, Copy, CheckCircle } from "lucide-react";

const UnitConverter = () => {
  const [category, setCategory] = useState("length");
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const conversionRates = {
    length: {
      mm: 1,
      cm: 10,
      m: 1000,
      km: 1000000,
      in: 25.4,
      ft: 304.8,
      yd: 914.4,
      mi: 1609344,
    },
    weight: {
      mg: 1,
      g: 1000,
      kg: 1000000,
      oz: 28349.5,
      lb: 453592,
      ton: 1000000000,
    },
    temperature: {
      celsius: "celsius",
      fahrenheit: "fahrenheit",
      kelvin: "kelvin",
    },
    area: {
      "mm²": 1,
      "cm²": 100,
      "m²": 1000000,
      "km²": 1000000000000,
      "in²": 645.16,
      "ft²": 92903.04,
      "yd²": 836127.36,
      acre: 4046856422.4,
    },
    volume: {
      ml: 1,
      l: 1000,
      "cm³": 1,
      "m³": 1000000,
      "in³": 16.387064,
      "ft³": 28316.846592,
      gal: 3785.411784,
      qt: 946.352946,
    },
  };

  const unitLabels = {
    length: {
      mm: "Millimeter (mm)",
      cm: "Centimeter (cm)",
      m: "Meter (m)",
      km: "Kilometer (km)",
      in: "Inch (in)",
      ft: "Foot (ft)",
      yd: "Yard (yd)",
      mi: "Mile (mi)",
    },
    weight: {
      mg: "Milligram (mg)",
      g: "Gram (g)",
      kg: "Kilogram (kg)",
      oz: "Ounce (oz)",
      lb: "Pound (lb)",
      ton: "Ton (t)",
    },
    temperature: {
      celsius: "Celsius (°C)",
      fahrenheit: "Fahrenheit (°F)",
      kelvin: "Kelvin (K)",
    },
    area: {
      "mm²": "Square Millimeter (mm²)",
      "cm²": "Square Centimeter (cm²)",
      "m²": "Square Meter (m²)",
      "km²": "Square Kilometer (km²)",
      "in²": "Square Inch (in²)",
      "ft²": "Square Foot (ft²)",
      "yd²": "Square Yard (yd²)",
      acre: "Acre",
    },
    volume: {
      ml: "Milliliter (ml)",
      l: "Liter (l)",
      "cm³": "Cubic Centimeter (cm³)",
      "m³": "Cubic Meter (m³)",
      "in³": "Cubic Inch (in³)",
      "ft³": "Cubic Foot (ft³)",
      gal: "Gallon (gal)",
      qt: "Quart (qt)",
    },
  };

  const convertTemperature = (value, from, to) => {
    let celsius = 0;

    // Convert to Celsius first
    switch (from) {
      case "celsius":
        celsius = parseFloat(value);
        break;
      case "fahrenheit":
        celsius = ((parseFloat(value) - 32) * 5) / 9;
        break;
      case "kelvin":
        celsius = parseFloat(value) - 273.15;
        break;
    }

    // Convert from Celsius to target
    switch (to) {
      case "celsius":
        return celsius;
      case "fahrenheit":
        return (celsius * 9) / 5 + 32;
      case "kelvin":
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const convert = () => {
    if (!fromValue || !fromUnit || !toUnit) return;

    const value = parseFloat(fromValue);
    if (isNaN(value)) return;

    if (category === "temperature") {
      const converted = convertTemperature(value, fromUnit, toUnit);
      setResult(converted.toFixed(6));
    } else {
      const rates = conversionRates[category];
      const fromRate = rates[fromUnit];
      const toRate = rates[toUnit];

      if (fromRate && toRate) {
        const converted = (value * fromRate) / toRate;
        setResult(converted.toFixed(6));
      }
    }
  };

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setFromUnit("");
    setToUnit("");
    setFromValue("");
    setResult("");
  };

  const currentUnits = Object.keys(conversionRates[category]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Unit Converter
        </h3>
        <p className="text-gray-300">
          Convert between different units of measurement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Converter */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Unit Converter
          </h4>

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="input-field"
              >
                <option value="length">Length</option>
                <option value="weight">Weight</option>
                <option value="temperature">Temperature</option>
                <option value="area">Area</option>
                <option value="volume">Volume</option>
              </select>
            </div>

            {/* From Value */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                From Value
              </label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="input-field"
                placeholder="Enter value"
                step="any"
              />
            </div>

            {/* From Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                From Unit
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="input-field"
              >
                <option value="">Select unit</option>
                {currentUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unitLabels[category][unit]}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
                title="Swap units"
              >
                <ArrowUpDown className="h-6 w-6" />
              </button>
            </div>

            {/* To Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To Unit
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="input-field"
              >
                <option value="">Select unit</option>
                {currentUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unitLabels[category][unit]}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={convert} className="w-full btn-primary">
              Convert
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-white mb-6">Result</h4>

          {result ? (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="text-2xl font-bold text-white mb-2">
                  {result}
                </div>
                <div className="text-sm text-gray-300">
                  {fromValue} {fromUnit && unitLabels[category][fromUnit]} ={" "}
                  {result} {toUnit && unitLabels[category][toUnit]}
                </div>
              </div>

              <button
                onClick={copyResult}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? "Copied!" : "Copy Result"}</span>
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Enter values and select units to convert</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Conversions */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Quick Conversions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <h5 className="font-medium text-white mb-2">Length</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>1 meter = 100 centimeters</li>
              <li>1 kilometer = 1000 meters</li>
              <li>1 inch = 2.54 centimeters</li>
              <li>1 foot = 12 inches</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <h5 className="font-medium text-white mb-2">Weight</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>1 kilogram = 1000 grams</li>
              <li>1 pound = 16 ounces</li>
              <li>1 ton = 1000 kilograms</li>
              <li>1 gram = 1000 milligrams</li>
            </ul>
          </div>
          <div className="bg-gray-900 rounded-lg p-4">
            <h5 className="font-medium text-white mb-2">Temperature</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>0°C = 32°F = 273.15K</li>
              <li>100°C = 212°F = 373.15K</li>
              <li>Room temp: 20°C = 68°F</li>
              <li>Freezing: 0°C = 32°F</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;




