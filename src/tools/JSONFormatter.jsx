import React, { useState } from "react";
import { Copy, CheckCircle, FileText, Code, AlertCircle } from "lucide-react";

const JSONFormatter = () => {
  const [inputJson, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    if (!inputJson.trim()) {
      setFormattedJson("");
      setIsValid(true);
      setError("");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setFormattedJson(formatted);
      setIsValid(true);
      setError("");
    } catch (err) {
      setFormattedJson("");
      setIsValid(false);
      setError(err.message);
    }
  };

  const minifyJson = () => {
    if (!inputJson.trim()) return;

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setIsValid(true);
      setError("");
    } catch (err) {
      setFormattedJson("");
      setIsValid(false);
      setError(err.message);
    }
  };

  const copyFormatted = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearAll = () => {
    setInputJson("");
    setFormattedJson("");
    setIsValid(true);
    setError("");
  };

  const validateJson = () => {
    if (!inputJson.trim()) {
      setIsValid(true);
      setError("");
      return;
    }

    try {
      JSON.parse(inputJson);
      setIsValid(true);
      setError("");
    } catch (err) {
      setIsValid(false);
      setError(err.message);
    }
  };

  const loadExample = () => {
    const example = {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      address: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
      hobbies: ["reading", "swimming", "coding"],
      isActive: true,
      lastLogin: "2024-01-15T10:30:00Z",
    };
    setInputJson(JSON.stringify(example, null, 2));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          JSON Formatter & Validator
        </h3>
        <p className="text-gray-300">
          Format, validate, and minify JSON data with syntax highlighting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Input JSON
              </h4>
              <div className="flex space-x-2">
                <button onClick={loadExample} className="btn-secondary text-sm">
                  Load Example
                </button>
                <button onClick={clearAll} className="btn-secondary text-sm">
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <textarea
                value={inputJson}
                onChange={(e) => {
                  setInputJson(e.target.value);
                  validateJson();
                }}
                className={`w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm text-white placeholder-gray-400 ${
                  !isValid
                    ? "border-red-400 bg-red-900/20"
                    : "border-gray-600 bg-gray-700"
                }`}
                placeholder="Paste your JSON here..."
              />

              {!isValid && error && (
                <div className="flex items-start space-x-2 p-3 bg-red-900/20 border border-red-400 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-300">
                    <div className="font-medium">Invalid JSON:</div>
                    <div>{error}</div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={formatJson}
                  disabled={!inputJson.trim() || !isValid}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Format JSON
                </button>
                <button
                  onClick={minifyJson}
                  disabled={!inputJson.trim() || !isValid}
                  className="btn-secondary disabled:opacity-50"
                >
                  Minify
                </button>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Formatting Options
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Indentation Size: {indentSize} spaces
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={indentSize}
                  onChange={(e) => setIndentSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Formatted JSON
              </h4>
              <button
                onClick={copyFormatted}
                disabled={!formattedJson}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <div className="w-full h-64 p-4 border border-gray-600 rounded-lg bg-gray-900 overflow-auto">
              <pre className="font-mono text-sm whitespace-pre-wrap break-words">
                {formattedJson || "Formatted JSON will appear here..."}
              </pre>
            </div>
          </div>

          {/* JSON Info */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              JSON Information
            </h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Characters:</span>
                <span className="font-mono">{formattedJson.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Lines:</span>
                <span className="font-mono">
                  {formattedJson.split("\n").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span className="font-mono">
                  {(formattedJson.length / 1024).toFixed(2)} KB
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Examples */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">JSON Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-white mb-2">Valid JSON</h5>
            <div className="bg-gray-900 p-4 rounded-lg">
              <pre className="text-sm font-mono overflow-x-auto">
                {`{
  "name": "John",
  "age": 30,
  "city": "New York"
}`}
              </pre>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Invalid JSON</h5>
            <div className="bg-red-50 p-4 rounded-lg">
              <pre className="text-sm font-mono text-red-700 overflow-x-auto">
                {`{
  "name": "John",
  "age": 30,
  "city": "New York"  // Missing comma
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Tips */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">JSON Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-white mb-2">Best Practices</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Use double quotes for strings</li>
              <li>• No trailing commas</li>
              <li>• Use consistent indentation</li>
              <li>• Validate before using</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Common Errors</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Missing quotes around keys</li>
              <li>• Trailing commas</li>
              <li>• Single quotes instead of double</li>
              <li>• Comments (not allowed in JSON)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;
