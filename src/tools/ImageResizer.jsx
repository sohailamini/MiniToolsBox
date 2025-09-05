import React, { useState, useRef } from "react";
import {
  Upload,
  Download,
  RotateCcw,
  Settings,
  CheckCircle,
} from "lucide-react";

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(90);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImage(e.target.result);
          setOriginalDimensions({ width: img.width, height: img.height });
          if (maintainAspectRatio) {
            const aspectRatio = img.width / img.height;
            setHeight(Math.round(width / aspectRatio));
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = () => {
    if (!image) return;

    setIsProcessing(true);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = `image/${format}`;
      const qualityValue = format === "jpeg" ? quality / 100 : undefined;

      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          setResizedImage(url);
          setIsProcessing(false);
        },
        mimeType,
        qualityValue
      );
    };

    img.src = image;
  };

  const downloadImage = () => {
    if (resizedImage) {
      const link = document.createElement("a");
      link.href = resizedImage;
      link.download = `resized-image.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetImage = () => {
    setImage(null);
    setResizedImage(null);
    setWidth(800);
    setHeight(600);
    setOriginalDimensions(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleWidthChange = (newWidth) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (newHeight) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Image Resizer & Converter
        </h3>
        <p className="text-gray-300">
          Resize and convert images to different formats with quality control
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Upload Image
            </h4>

            {!image ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 mb-2">Click to upload an image</p>
                <p className="text-sm text-gray-400">
                  Supports JPG, PNG, GIF, WebP
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={image}
                    alt="Original"
                    className="w-full h-64 object-contain rounded-lg border"
                  />
                  <button
                    onClick={resetImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
                {originalDimensions && (
                  <p className="text-sm text-gray-300 text-center">
                    Original: {originalDimensions.width} ×{" "}
                    {originalDimensions.height}px
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Resize Settings
            </h4>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) =>
                      handleWidthChange(parseInt(e.target.value) || 0)
                    }
                    className="input-field"
                    min="1"
                    max="4000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) =>
                      handleHeightChange(parseInt(e.target.value) || 0)
                    }
                    className="input-field"
                    min="1"
                    max="4000"
                  />
                </div>
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="mr-3"
                />
                <span className="text-sm text-gray-300">
                  Maintain aspect ratio
                </span>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="input-field"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                    disabled={format === "png"}
                  />
                </div>
              </div>

              <button
                onClick={resizeImage}
                disabled={!image || isProcessing}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4" />
                    <span>Resize Image</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Resized Image
            </h4>

            {resizedImage ? (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={resizedImage}
                    alt="Resized"
                    className="w-full h-64 object-contain rounded-lg border"
                  />
                </div>
                <p className="text-sm text-gray-300 text-center">
                  Resized: {width} × {height}px
                </p>
                <button
                  onClick={downloadImage}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Image</span>
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Settings className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-300">Resized image will appear here</p>
              </div>
            )}
          </div>

          {/* Premium Features Placeholder */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <h4 className="text-lg font-semibold text-purple-900 mb-2">
              Premium Features
            </h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Batch resize multiple images</li>
              <li>• High-resolution downloads (up to 8K)</li>
              <li>• Advanced filters and effects</li>
              <li>• Cloud storage integration</li>
            </ul>
            <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResizer;

