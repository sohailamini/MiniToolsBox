import React, { useState } from "react";
import { Copy, CheckCircle, RefreshCw, FileText, Code } from "lucide-react";

const Base64Converter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("encode");
  const [copied, setCopied] = useState(false);

  const encodeText = (text) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      return "Error: Invalid input for encoding";
    }
  };

  const decodeText = (text) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (error) {
      return "Error: Invalid Base64 input for decoding";
    }
  };

  const handleConvert = () => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }

    if (mode === "encode") {
      setOutputText(encodeText(inputText));
    } else {
      setOutputText(decodeText(inputText));
    }
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
  };

  const swapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    setInputText(outputText);
    setOutputText("");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Base64 Encoder/Decoder
        </h3>
        <p className="text-gray-300">
          Encode and decode text using Base64 encoding
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
              </h4>
              <div className="flex space-x-2">
                <button
                  onClick={swapMode}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Swap</span>
                </button>
                <button onClick={clearAll} className="btn-secondary">
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-48 p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm text-white placeholder-gray-400"
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 string to decode..."
              }
            />

            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-400">
                {inputText.length} characters
              </span>
              <button
                onClick={handleConvert}
                disabled={!inputText.trim()}
                className="btn-primary disabled:opacity-50"
              >
                {mode === "encode" ? "Encode" : "Decode"}
              </button>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Mode</h4>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setMode("encode")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  mode === "encode"
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-700 hover:border-gray-600 text-gray-300"
                }`}
              >
                <div className="text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Encode</div>
                  <div className="text-sm opacity-75">Text → Base64</div>
                </div>
              </button>
              <button
                onClick={() => setMode("decode")}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  mode === "decode"
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-gray-700 hover:border-gray-600 text-gray-300"
                }`}
              >
                <div className="text-center">
                  <Code className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-medium">Decode</div>
                  <div className="text-sm opacity-75">Base64 → Text</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Code className="h-5 w-5 mr-2" />
                {mode === "encode" ? "Base64 Output" : "Decoded Text"}
              </h4>
              <button
                onClick={copyOutput}
                disabled={!outputText}
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

            <div className="w-full h-48 p-4 border border-gray-600 rounded-lg bg-gray-900 overflow-auto">
              <pre className="font-mono text-sm whitespace-pre-wrap break-words">
                {outputText ||
                  (mode === "encode"
                    ? "Encoded text will appear here..."
                    : "Decoded text will appear here...")}
              </pre>
            </div>

            {outputText && (
              <div className="mt-4 text-sm text-gray-400">
                {outputText.length} characters
              </div>
            )}
          </div>

          {/* Information */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              About Base64
            </h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>
                Base64 is a binary-to-text encoding scheme that represents
                binary data in an ASCII string format using 64 different
                characters.
              </p>
              <p>
                <strong>Common uses:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Email attachments</li>
                <li>Data URLs in web pages</li>
                <li>Storing binary data in JSON/XML</li>
                <li>Basic authentication headers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-white mb-2">Encoding Examples</h5>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-900 p-3 rounded">
                <div className="font-medium">Input:</div>
                <div className="font-mono">Hello World!</div>
                <div className="font-medium mt-2">Output:</div>
                <div className="font-mono">SGVsbG8gV29ybGQh</div>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Decoding Examples</h5>
            <div className="space-y-2 text-sm">
              <div className="bg-gray-900 p-3 rounded">
                <div className="font-medium">Input:</div>
                <div className="font-mono">SGVsbG8gV29ybGQh</div>
                <div className="font-medium mt-2">Output:</div>
                <div className="font-mono">Hello World!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;
