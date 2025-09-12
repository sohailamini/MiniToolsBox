import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { tools } from "../data/tools";

// Import all tool components
import AgeCalculator from "../tools/AgeCalculator";
import Base64Converter from "../tools/Base64Converter";
import ColorPicker from "../tools/ColorPicker";
import HashGenerator from "../tools/HashGenerator";
import ImageResizer from "../tools/ImageResizer";
import JokeGenerator from "../tools/JokeGenerator";
import JSONFormatter from "../tools/JSONFormatter";
import MarkdownPreview from "../tools/MarkdownPreview";
import PasswordGenerator from "../tools/PasswordGenerator";
import QRGenerator from "../tools/QRGenerator";
import QuoteGenerator from "../tools/QuoteGenerator";
import RegexTester from "../tools/RegexTester";
import TextCounter from "../tools/TextCounter";
import UnitConverter from "../tools/UnitConverter";
import URLShortener from "../tools/URLShortener";

const ToolPage = () => {
  const { toolId } = useParams();

  // Safety check for toolId
  if (!toolId) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Loading...
          </h1>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">
            Please wait while we load the tool.
          </p>
        </div>
      </div>
    );
  }

  const tool = tools.find((t) => t.id === toolId);

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Tool Not Found
          </h1>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">
            The requested tool could not be found.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base inline-flex items-center"
          >
            <Home className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const toolComponents = {
    AgeCalculator,
    Base64Converter,
    ColorPicker,
    HashGenerator,
    ImageResizer,
    JokeGenerator,
    JSONFormatter,
    MarkdownPreview,
    PasswordGenerator,
    QRGenerator,
    QuoteGenerator,
    RegexTester,
    TextCounter,
    UnitConverter,
    URLShortener,
  };

  const ToolComponent = toolComponents[tool.component];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Tool Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Back to Home
              </Link>
              <div className="hidden sm:block h-6 w-px bg-gray-600"></div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-2xl sm:text-3xl">{tool.icon}</span>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-white">
                    {tool.name}
                  </h1>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {tool.category}
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/all-tools"
              className="flex items-center text-gray-400 hover:text-white transition-colors text-sm sm:text-base self-start sm:self-auto"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              All Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 border border-gray-700">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Description
              </h2>
              <p className="text-gray-300 text-sm sm:text-base">
                {tool.description}
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 sm:p-4 md:p-6 border border-gray-700">
              {ToolComponent ? (
                <ToolComponent />
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-400 text-sm sm:text-base">
                    Tool component not found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
