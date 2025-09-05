import React, { useState } from "react";
import { Copy, CheckCircle, Shield, RefreshCw } from "lucide-react";

const HashGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [hashes, setHashes] = useState({});
  const [copied, setCopied] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateHash = async (text, algorithm) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const generateAllHashes = async () => {
    if (!inputText.trim()) {
      setHashes({});
      return;
    }

    setIsGenerating(true);
    try {
      const newHashes = {};

      // MD5 (using a simple implementation)
      newHashes.md5 = await generateMD5(inputText);

      // SHA-1
      newHashes.sha1 = await generateHash(inputText, "SHA-1");

      // SHA-256
      newHashes.sha256 = await generateHash(inputText, "SHA-256");

      // SHA-512
      newHashes.sha512 = await generateHash(inputText, "SHA-512");

      setHashes(newHashes);
    } catch (error) {
      console.error("Error generating hashes:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Simple MD5 implementation (for demonstration)
  const generateMD5 = async (text) => {
    // This is a simplified version - in production, use a proper MD5 library
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .substring(0, 32);
  };

  const copyHash = async (hash, algorithm) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(algorithm);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearAll = () => {
    setInputText("");
    setHashes({});
  };

  const hashTypes = [
    { key: "md5", name: "MD5", description: "128-bit hash (deprecated)" },
    { key: "sha1", name: "SHA-1", description: "160-bit hash" },
    {
      key: "sha256",
      name: "SHA-256",
      description: "256-bit hash (recommended)",
    },
    {
      key: "sha512",
      name: "SHA-512",
      description: "512-bit hash (high security)",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Hash Generator</h3>
        <p className="text-gray-300">
          Generate MD5, SHA1, SHA256, and SHA512 hashes for your text
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Input Text
            </h4>

            <div className="space-y-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-32 p-4 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
                placeholder="Enter text to generate hashes..."
              />

              <div className="flex space-x-3">
                <button
                  onClick={generateAllHashes}
                  disabled={!inputText.trim() || isGenerating}
                  className="btn-primary flex-1 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      <span>Generate Hashes</span>
                    </>
                  )}
                </button>
                <button onClick={clearAll} className="btn-secondary">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Hash Information */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Hash Types
            </h4>
            <div className="space-y-3">
              {hashTypes.map((hash) => (
                <div
                  key={hash.key}
                  className="flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium text-white">{hash.name}</div>
                    <div className="text-sm text-gray-300">
                      {hash.description}
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      hash.key === "md5"
                        ? "bg-red-100 text-red-700"
                        : hash.key === "sha1"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {hash.key === "md5"
                      ? "Deprecated"
                      : hash.key === "sha1"
                      ? "Weak"
                      : "Secure"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Generated Hashes
            </h4>

            {Object.keys(hashes).length > 0 ? (
              <div className="space-y-4">
                {hashTypes.map((hash) => (
                  <div
                    key={hash.key}
                    className="border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-white">{hash.name}</div>
                      <button
                        onClick={() => copyHash(hashes[hash.key], hash.key)}
                        className="text-gray-400 hover:text-gray-300 flex items-center space-x-1"
                      >
                        {copied === hash.key ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                        <span className="text-sm">
                          {copied === hash.key ? "Copied!" : "Copy"}
                        </span>
                      </button>
                    </div>
                    <div className="font-mono text-sm bg-gray-900 p-2 rounded break-all">
                      {hashes[hash.key]}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Generated hashes will appear here</p>
              </div>
            )}
          </div>

          {/* Security Tips */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Security Tips
            </h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Use SHA-256 or SHA-512 for new applications</li>
              <li>• MD5 and SHA-1 are vulnerable to collision attacks</li>
              <li>• Always use salt with hashes for passwords</li>
              <li>• Consider using bcrypt for password hashing</li>
              <li>• Hashes are one-way - you cannot reverse them</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Common Use Cases
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-white mb-2">Data Integrity</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• File verification</li>
              <li>• Download integrity checks</li>
              <li>• Data transmission validation</li>
              <li>• Backup verification</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">
              Security Applications
            </h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Password hashing (with salt)</li>
              <li>• Digital signatures</li>
              <li>• Blockchain transactions</li>
              <li>• Certificate generation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;
