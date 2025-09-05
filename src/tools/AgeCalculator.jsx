import React, { useState } from "react";
import { Calendar, Copy, CheckCircle, Calculator } from "lucide-react";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [age, setAge] = useState(null);
  const [copied, setCopied] = useState(false);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const current = currentDate ? new Date(currentDate) : new Date();

    if (birth > current) {
      alert("Birth date cannot be in the future");
      return;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((current - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    setAge({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      nextBirthday: getNextBirthday(birth, current),
    });
  };

  const getNextBirthday = (birth, current) => {
    const nextBirthday = new Date(
      current.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );

    if (nextBirthday <= current) {
      nextBirthday.setFullYear(current.getFullYear() + 1);
    }

    const daysUntil = Math.ceil(
      (nextBirthday - current) / (1000 * 60 * 60 * 24)
    );
    return {
      date: nextBirthday.toLocaleDateString(),
      daysUntil,
    };
  };

  const copyAge = async () => {
    if (!age) return;

    const ageText = `Age: ${age.years} years, ${age.months} months, ${age.days} days`;
    try {
      await navigator.clipboard.writeText(ageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const clearAll = () => {
    setBirthDate("");
    setCurrentDate("");
    setAge(null);
  };

  const setToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setCurrentDate(today);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Age Calculator</h3>
        <p className="text-gray-300">
          Calculate age in years, months, and days with detailed breakdown
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Date Input
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Birth Date *
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="input-field"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Date (optional)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    className="input-field flex-1"
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <button onClick={setToday} className="btn-secondary">
                    Today
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Leave empty to use current date
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={calculateAge}
                  disabled={!birthDate}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  Calculate Age
                </button>
                <button onClick={clearAll} className="btn-secondary">
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Examples
            </h4>
            <div className="space-y-2">
              {[
                { label: "Newborn (1 day old)", days: 1 },
                { label: "1 month old", days: 30 },
                { label: "1 year old", days: 365 },
                { label: "18 years old", days: 6570 },
                { label: "65 years old", days: 23725 },
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const date = new Date();
                    date.setDate(date.getDate() - example.days);
                    setBirthDate(date.toISOString().split("T")[0]);
                  }}
                  className="w-full text-left p-2 text-sm text-gray-300 hover:bg-gray-900 rounded"
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
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Age Calculation
              </h4>
              {age && (
                <button
                  onClick={copyAge}
                  className="btn-secondary flex items-center space-x-2"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              )}
            </div>

            {age ? (
              <div className="space-y-6">
                {/* Main Age Display */}
                <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
                  <div className="text-4xl font-bold text-white mb-2">
                    {age.years}
                  </div>
                  <div className="text-lg text-blue-100">
                    Years, {age.months} months, {age.days} days
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      {age.totalDays}
                    </div>
                    <div className="text-sm text-gray-300">Total Days</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      {age.totalWeeks}
                    </div>
                    <div className="text-sm text-gray-300">Total Weeks</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      {age.totalMonths}
                    </div>
                    <div className="text-sm text-gray-300">Total Months</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">
                      {age.years}
                    </div>
                    <div className="text-sm text-gray-300">Years</div>
                  </div>
                </div>

                {/* Next Birthday */}
                <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
                  <h5 className="font-medium text-yellow-200 mb-2">
                    Next Birthday
                  </h5>
                  <div className="text-sm text-yellow-300">
                    <div>Date: {age.nextBirthday.date}</div>
                    <div>Days until: {age.nextBirthday.daysUntil}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Enter birth date to calculate age</p>
              </div>
            )}
          </div>

          {/* Age Milestones */}
          {age && (
            <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
              <h4 className="text-lg font-semibold text-white mb-4">
                Age Milestones
              </h4>
              <div className="space-y-2">
                {[
                  { age: 0, label: "Birth" },
                  { age: 1, label: "First birthday" },
                  { age: 5, label: "Kindergarten age" },
                  { age: 13, label: "Teenager" },
                  { age: 16, label: "Can drive (US)" },
                  { age: 18, label: "Adult (US)" },
                  { age: 21, label: "Legal drinking age (US)" },
                  { age: 25, label: "Rent a car (US)" },
                  { age: 30, label: "Thirty" },
                  { age: 40, label: "Forty" },
                  { age: 50, label: "Fifty" },
                  { age: 65, label: "Retirement age (US)" },
                  { age: 100, label: "Centenarian" },
                ].map((milestone, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-2 rounded ${
                      age.years >= milestone.age
                        ? "bg-green-900 text-green-200"
                        : "bg-gray-900 text-gray-300"
                    }`}
                  >
                    <span className="text-sm">{milestone.label}</span>
                    <span className="text-sm font-medium">
                      {milestone.age} years
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
