import React from "react";
import QuoteGenerator from "../tools/QuoteGenerator";
import PasswordGenerator from "../tools/PasswordGenerator";
import ImageResizer from "../tools/ImageResizer";
import ColorPicker from "../tools/ColorPicker";
import UnitConverter from "../tools/UnitConverter";
import JokeGenerator from "../tools/JokeGenerator";
import QRGenerator from "../tools/QRGenerator";
import TextCounter from "../tools/TextCounter";
import Base64Converter from "../tools/Base64Converter";
import URLShortener from "../tools/URLShortener";
import HashGenerator from "../tools/HashGenerator";
import JSONFormatter from "../tools/JSONFormatter";
import RegexTester from "../tools/RegexTester";
import MarkdownPreview from "../tools/MarkdownPreview";
import AgeCalculator from "../tools/AgeCalculator";

const ToolRenderer = ({ tool }) => {
  const toolComponents = {
    QuoteGenerator: QuoteGenerator,
    PasswordGenerator: PasswordGenerator,
    ImageResizer: ImageResizer,
    ColorPicker: ColorPicker,
    UnitConverter: UnitConverter,
    JokeGenerator: JokeGenerator,
    QRGenerator: QRGenerator,
    TextCounter: TextCounter,
    Base64Converter: Base64Converter,
    URLShortener: URLShortener,
    HashGenerator: HashGenerator,
    JSONFormatter: JSONFormatter,
    // RegexTester: RegexTester,
    MarkdownPreview: MarkdownPreview,
    AgeCalculator: AgeCalculator,
  };

  const ToolComponent = toolComponents[tool.component];

  if (!ToolComponent) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Tool not found</p>
      </div>
    );
  }

  return <ToolComponent />;
};

export default ToolRenderer;


