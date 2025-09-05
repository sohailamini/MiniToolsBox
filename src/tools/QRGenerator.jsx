import React, { useState } from "react";
import { QrCode, Download, Copy, CheckCircle, RefreshCw } from "lucide-react";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const generateQR = () => {
    if (!text.trim()) return;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      text
    )}`;
    setQrCodeUrl(qrUrl);
  };

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.href = qrCodeUrl;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const copyQR = async () => {
    if (qrCodeUrl) {
      try {
        await navigator.clipboard.writeText(qrCodeUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          QR Code Generator
        </h3>
        <p className="text-gray-300">
          Generate QR codes for text, URLs, and more
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Generate QR Code
        </h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="input-field h-24 resize-none"
              placeholder="Enter text, URL, or any data to encode..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Size: {size}px
            </label>
            <input
              type="range"
              min="100"
              max="500"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>100px</span>
              <span>500px</span>
            </div>
          </div>

          <button
            onClick={generateQR}
            disabled={!text.trim()}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <QrCode className="h-4 w-4" />
            <span>Generate QR Code</span>
          </button>
        </div>
      </div>

      {qrCodeUrl && (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Generated QR Code
          </h4>

          <div className="text-center">
            <div className="inline-block p-4 bg-gray-800 border-2 border-gray-700 rounded-lg">
              <img
                src={qrCodeUrl}
                alt="Generated QR Code"
                className="max-w-full h-auto"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <button
                onClick={downloadQR}
                className="btn-primary flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>

              <button
                onClick={copyQR}
                className="btn-secondary flex items-center space-x-2"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? "Copied!" : "Copy URL"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-900 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          QR Code Ideas
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-white mb-2">Common Uses</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Website URLs</li>
              <li>• Contact information (vCard)</li>
              <li>• WiFi network details</li>
              <li>• Social media profiles</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Business Uses</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Product information</li>
              <li>• Event details</li>
              <li>• Payment links</li>
              <li>• App download links</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;

