import React, { useState } from "react";
import {
  Copy,
  CheckCircle,
  Code,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    global: false,
    ignoreCase: false,
    multiline: false,
    dotAll: false,
    unicode: false,
    sticky: false,
  });
  const [matches, setMatches] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const testRegex = () => {
    if (!pattern.trim()) {
      setMatches([]);
      setIsValid(true);
      setError("");
      return;
    }

    try {
      const flagString = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag, _]) => flag[0])
        .join("");

      const regex = new RegExp(pattern, flagString);
      const globalRegex = new RegExp(pattern, flagString + "g");

      const allMatches = [];
      let match;

      while ((match = globalRegex.exec(testString)) !== null) {
        allMatches.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          fullMatch: match,
        });

        if (match.index === globalRegex.lastIndex) {
          globalRegex.lastIndex++;
        }
      }

      setMatches(allMatches);
      setIsValid(true);
      setError("");
    } catch (err) {
      setMatches([]);
      setIsValid(false);
      setError(err.message);
    }
  };

  const copyPattern = async () => {
    try {
      await navigator.clipboard.writeText(pattern);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const loadExample = (example) => {
    const examples = {
      email: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        string: "test@example.com, invalid-email, user@domain.org",
        flags: { ignoreCase: true },
      },
      phone: {
        pattern: "^\\+?[1-9]\\d{1,14}$",
        string: "+1234567890, 123-456-7890, (123) 456-7890",
        flags: {},
      },
      url: {
        pattern:
          "^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$",
        string: "https://example.com, http://test.org, invalid-url",
        flags: {},
      },
      password: {
        pattern:
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        string: "Password123!, weakpass, StrongP@ss1",
        flags: {},
      },
    };

    const exampleData = examples[example];
    if (exampleData) {
      setPattern(exampleData.pattern);
      setTestString(exampleData.string);
      setFlags(exampleData.flags);
    }
  };

  const clearAll = () => {
    setPattern("");
    setTestString("");
    setMatches([]);
    setIsValid(true);
    setError("");
  };

  const highlightMatches = (text, matches) => {
    if (matches.length === 0) return text;

    let result = text;
    let offset = 0;

    matches.forEach((match, index) => {
      const start = match.index + offset;
      const end = start + match.match.length;

      const before = result.substring(0, start);
      const highlighted = `<mark class="bg-yellow-200 px-1 rounded">${match.match}</mark>`;
      const after = result.substring(end);

      result = before + highlighted + after;
      offset += highlighted.length - match.match.length;
    });

    return result;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Regex Tester</h3>
        <p className="text-gray-300">
          Test and debug regular expressions with real-time matching
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Regular Expression
              </h4>
              <div className="flex space-x-2">
                <button
                  onClick={copyPattern}
                  disabled={!pattern}
                  className="btn-secondary text-sm disabled:opacity-50"
                >
                  Copy
                </button>
                <button onClick={clearAll} className="btn-secondary text-sm">
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pattern
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono ${
                      !isValid ? "border-red-300 bg-red-50" : "border-gray-600"
                    }`}
                    placeholder="/your-regex-pattern/"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isValid ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              {!isValid && error && (
                <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-700">
                    <div className="font-medium">Invalid Regex:</div>
                    <div>{error}</div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Test String
                </label>
                <textarea
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="w-full h-24 p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Enter text to test against the regex..."
                />
              </div>

              <button
                onClick={testRegex}
                disabled={!pattern.trim() || !isValid}
                className="w-full btn-primary disabled:opacity-50"
              >
                Test Regex
              </button>
            </div>
          </div>

          {/* Flags */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Flags</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(flags).map(([flag, enabled]) => (
                <label key={flag} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) =>
                      setFlags((prev) => ({
                        ...prev,
                        [flag]: e.target.checked,
                      }))
                    }
                    className="mr-3"
                  />
                  <span className="text-sm text-gray-300">
                    {flag === "global" && "g - Global"}
                    {flag === "ignoreCase" && "i - Ignore Case"}
                    {flag === "multiline" && "m - Multiline"}
                    {flag === "dotAll" && "s - Dot All"}
                    {flag === "unicode" && "u - Unicode"}
                    {flag === "sticky" && "y - Sticky"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Examples
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "url", label: "URL" },
                { key: "password", label: "Password" },
              ].map((example) => (
                <button
                  key={example.key}
                  onClick={() => loadExample(example.key)}
                  className="btn-secondary text-sm"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Test Results
            </h4>

            {matches.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-300">
                  Found {matches.length} match{matches.length !== 1 ? "es" : ""}
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm font-medium text-gray-300 mb-2">
                    Highlighted Text:
                  </div>
                  <div
                    className="font-mono text-sm"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatches(testString, matches),
                    }}
                  />
                </div>

                <div className="space-y-2">
                  {matches.map((match, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-300">
                          Match {index + 1}
                        </span>
                        <span className="text-xs text-gray-400">
                          Position: {match.index}
                        </span>
                      </div>
                      <div className="font-mono text-sm bg-gray-700 p-2 rounded">
                        {match.match}
                      </div>
                      {match.groups.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-gray-300 mb-1">
                            Groups:
                          </div>
                          <div className="space-y-1">
                            {match.groups.map((group, groupIndex) => (
                              <div
                                key={groupIndex}
                                className="text-xs font-mono bg-blue-50 p-1 rounded"
                              >
                                Group {groupIndex + 1}: {group}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Code className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No matches found</p>
                <p className="text-sm">
                  Try adjusting your pattern or test string
                </p>
              </div>
            )}
          </div>

          {/* Regex Cheat Sheet */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Common Patterns
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium text-white">
                  Character Classes:
                </div>
                <div className="font-mono text-gray-300">
                  [a-z], [A-Z], [0-9], [a-zA-Z0-9], [^abc]
                </div>
              </div>
              <div>
                <div className="font-medium text-white">Quantifiers:</div>
              </div>
              <div>
                <div className="font-medium text-white">Anchors:</div>
                <div className="font-mono text-gray-300">^, $, \b, \B</div>
              </div>
              <div>
                <div className="font-medium text-white">Groups:</div>
                <div className="font-mono text-gray-300">
                  (), (?:), (?=), (?!)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;


