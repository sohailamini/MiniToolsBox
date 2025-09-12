import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Eye, EyeOff, CheckCircle } from "lucide-react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";

    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (excludeSimilar) {
      charset = charset.replace(/[il1Lo0O]/g, "");
    }

    if (excludeAmbiguous) {
      charset = charset.replace(/[{}[\]()\/\\~,;.<>]/g, "");
    }

    if (charset === "") {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) setStrength("Weak");
    else if (score <= 4) setStrength("Medium");
    else if (score <= 6) setStrength("Strong");
    else setStrength("Very Strong");
  };

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case "Weak":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Strong":
        return "text-blue-600 bg-blue-100";
      case "Very Strong":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-300 bg-gray-700";
    }
  };

  useEffect(() => {
    generatePassword();
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    excludeSimilar,
    excludeAmbiguous,
  ]);

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Password Generator
        </h3>
        <p className="text-gray-300 text-sm sm:text-base">
          Generate secure passwords with customizable options
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
          <div className="flex-1 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              readOnly
              className="input-field pr-20 text-sm sm:text-base lg:text-lg font-mono"
              placeholder="Generated password will appear here"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
            <button
              onClick={copyPassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
          <button
            onClick={generatePassword}
            className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:py-3"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Generate</span>
          </button>
        </div>

        {password && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-2 sm:gap-0">
            <span className="text-gray-300">
              Length: {password.length} characters
            </span>
            <span
              className={`px-2 sm:px-3 py-1 rounded-full font-medium text-xs sm:text-sm ${getStrengthColor()}`}
            >
              {strength}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6">
          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Password Length
          </h4>
          <div className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2">
                Length: {length} characters
              </label>
              <input
                type="range"
                min="4"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>4</span>
                <span>50</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6">
          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
            Character Types
          </h4>
          <div className="space-y-2 sm:space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="mr-3"
              />
              <span className="text-xs sm:text-sm text-gray-300">
                Uppercase letters (A-Z)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="mr-3"
              />
              <span className="text-xs sm:text-sm text-gray-300">
                Lowercase letters (a-z)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="mr-3"
              />
              <span className="text-xs sm:text-sm text-gray-300">
                Numbers (0-9)
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="mr-3"
              />
              <span className="text-xs sm:text-sm text-gray-300">
                Symbols (!@#$%^&*)
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 sm:p-6 mt-4 sm:mt-6">
        <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
          Advanced Options
        </h4>
        <div className="space-y-2 sm:space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={(e) => setExcludeSimilar(e.target.checked)}
              className="mr-3"
            />
            <span className="text-xs sm:text-sm text-gray-300">
              Exclude similar characters (il1Lo0O)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              className="mr-3"
            />
            <span className="text-xs sm:text-sm text-gray-300">
              Exclude ambiguous characters (&#123; &#125; &#91; &#93; &#40;
              &#41; &#47; &#92; &#126; &#44; &#59; &#46; &#60; &#62;)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
