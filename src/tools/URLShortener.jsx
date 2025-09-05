import React, { useState } from "react";
import { Link, Copy, CheckCircle, ExternalLink, RefreshCw } from "lucide-react";

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [urlHistory, setUrlHistory] = useState([]);

  const generateShortUrl = async () => {
    if (!originalUrl.trim()) return;

    // Simple URL validation
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(originalUrl)) {
      alert("Please enter a valid URL");
      return;
    }

    // Generate a simple short URL (in a real app, this would use a service like bit.ly)
    // const shortCode = Math.random().toString(36).substring(2, 8);
    // const generatedShortUrl = `https://short.ly/${shortCode}`;

    // setShortUrl(generatedShortUrl);

    const response = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(
        originalUrl
      )}`
    );
    const data = await response.json();
    setShortUrl(data.shorturl);

    // Add to history
    const newEntry = {
      id: Date.now(),
      original: originalUrl,
      short: data.shorturl,
      createdAt: new Date().toLocaleString(),
    };
    setUrlHistory((prev) => [newEntry, ...prev.slice(0, 9)]);
  };

  const copyShortUrl = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearAll = () => {
    setOriginalUrl("");
    setShortUrl("");
  };

  const openUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">URL Shortener</h3>
        <p className="text-gray-300">
          Shorten long URLs for easy sharing and tracking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* URL Shortener */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Link className="h-5 w-5 mr-2" />
              Shorten URL
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter URL to shorten
                </label>
                <input
                  type="url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="input-field"
                  placeholder="https://example.com/very-long-url"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={generateShortUrl}
                  disabled={!originalUrl.trim()}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Shorten URL
                </button>
                <button onClick={clearAll} className="btn-secondary">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Short URL Result */}
          {shortUrl && (
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Shortened URL
              </h4>

              <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-300 mb-1">
                        Short URL:
                      </div>
                      <div className="font-mono text-lg break-all">
                        {shortUrl}
                      </div>
                    </div>
                    <button
                      onClick={() => openUrl(shortUrl)}
                      className="ml-2 text-gray-400 hover:text-gray-300"
                      title="Open URL"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-300 mb-1">
                    Original URL:
                  </div>
                  <div className="font-mono text-sm break-all">
                    {originalUrl}
                  </div>
                </div>

                <button
                  onClick={copyShortUrl}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? "Copied!" : "Copy Short URL"}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* URL History */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Recent URLs
            </h4>

            {urlHistory.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {urlHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="border border-gray-700 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm text-blue-400 break-all">
                          {entry.short}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {entry.createdAt}
                        </div>
                      </div>
                      <button
                        onClick={() => openUrl(entry.short)}
                        className="ml-2 text-gray-400 hover:text-gray-300"
                        title="Open URL"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-300 break-all">
                      {entry.original}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Link className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No URLs shortened yet</p>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Create short, memorable URLs</li>
              <li>• Track click statistics</li>
              <li>• Custom short codes</li>
              <li>• Password protection</li>
              <li>• Expiration dates</li>
              <li>• QR code generation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Premium Features */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
        <h4 className="text-lg font-semibold text-purple-900 mb-2">
          Premium Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Custom domain short URLs</li>
            <li>• Advanced analytics & tracking</li>
            <li>• Bulk URL shortening</li>
            <li>• API access</li>
          </ul>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Password-protected URLs</li>
            <li>• Scheduled URL expiration</li>
            <li>• White-label solution</li>
            <li>• Priority support</li>
          </ul>
        </div>
        <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default URLShortener;
