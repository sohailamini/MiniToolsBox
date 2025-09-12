import React, { useState, useEffect } from "react";
import { FileText, Copy, CheckCircle, BarChart3 } from "lucide-react";

const TextCounter = () => {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    lines: 0,
  });
  const [copied, setCopied] = useState(false);

  const calculateStats = (inputText) => {
    const characters = inputText.length;
    const charactersNoSpaces = inputText.replace(/\s/g, "").length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const sentences = inputText
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;
    const paragraphs = inputText
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length;
    const lines = inputText.split("\n").length;

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
    };
  };

  useEffect(() => {
    setStats(calculateStats(text));
  }, [text]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearText = () => {
    setText("");
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const minutes = Math.ceil(stats.words / wordsPerMinute);
    return minutes;
  };

  const getGradeLevel = () => {
    // Simple Flesch-Kincaid approximation
    const avgWordsPerSentence = stats.words / Math.max(stats.sentences, 1);
    const avgSyllablesPerWord = 1.5; // Rough approximation
    const score =
      0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

    if (score <= 6) return "Elementary (6th grade)";
    if (score <= 8) return "Middle School (8th grade)";
    if (score <= 10) return "High School (10th grade)";
    if (score <= 12) return "High School (12th grade)";
    return "College level";
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Text Counter & Analyzer
        </h3>
        <p className="text-gray-300 text-sm sm:text-base">
          Count words, characters, and analyze your text content
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3 sm:gap-4">
              <h4 className="text-base sm:text-lg font-semibold text-white flex items-center">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                <span className="truncate">Your Text</span>
              </h4>
              <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2">
                <button
                  onClick={copyText}
                  disabled={!text}
                  className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50 text-sm px-3 py-2"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  onClick={clearText}
                  disabled={!text}
                  className="btn-secondary disabled:opacity-50 text-sm px-3 py-2"
                >
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 sm:h-56 md:h-64 p-3 sm:p-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-white placeholder-gray-400 text-sm sm:text-base"
              placeholder="Type or paste your text here to analyze..."
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Statistics
            </h4>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Characters:
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {stats.characters.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Characters (no spaces):
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {stats.charactersNoSpaces.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Words:
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {stats.words.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Sentences:
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {stats.sentences.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Paragraphs:
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {stats.paragraphs.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Lines:
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {stats.lines.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Reading Analysis */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
              Reading Analysis
            </h4>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Reading time:
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {getReadingTime()} min
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Grade level:
                </span>
                <span className="font-semibold text-xs sm:text-sm">
                  {getGradeLevel()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm sm:text-base">
                  Avg words/sentence:
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {stats.sentences > 0
                    ? (stats.words / stats.sentences).toFixed(1)
                    : "0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold">
            {stats.words.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm opacity-90">Words</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold">
            {stats.characters.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm opacity-90">Characters</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold">
            {stats.sentences.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm opacity-90">Sentences</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-3 sm:p-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold">
            {getReadingTime()}
          </div>
          <div className="text-xs sm:text-sm opacity-90">Min Read</div>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="mt-6 sm:mt-8 bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
          Writing Tips
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h5 className="font-medium text-white mb-2 text-sm sm:text-base">
              General Guidelines
            </h5>
            <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
              <li>• Aim for 15-20 words per sentence</li>
              <li>• Keep paragraphs under 150 words</li>
              <li>• Use active voice when possible</li>
              <li>• Vary sentence length for rhythm</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2 text-sm sm:text-base">
              Content Types
            </h5>
            <ul className="text-xs sm:text-sm text-gray-300 space-y-1">
              <li>• Blog posts: 300-2000 words</li>
              <li>• Social media: 1-280 characters</li>
              <li>• Emails: 50-200 words</li>
              <li>• Academic papers: 1000+ words</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCounter;
