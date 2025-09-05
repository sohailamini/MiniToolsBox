import React, { useState } from "react";
import { RefreshCw, Copy, Heart } from "lucide-react";

const QuoteGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
    },
    {
      text: "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon",
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
      author: "Roy T. Bennett",
    },
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      text: "The only impossible journey is the one you never begin.",
      author: "Tony Robbins",
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
  ];

  const generateQuote = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
      setIsLoading(false);
    }, 500);
  };

  const copyQuote = () => {
    if (currentQuote) {
      navigator.clipboard.writeText(
        `"${currentQuote.text}" - ${currentQuote.author}`
      );
    }
  };

  const toggleFavorite = () => {
    if (currentQuote) {
      const isFavorite = favorites.some(
        (fav) => fav.text === currentQuote.text
      );
      if (isFavorite) {
        setFavorites(favorites.filter((fav) => fav.text !== currentQuote.text));
      } else {
        setFavorites([...favorites, currentQuote]);
      }
    }
  };

  const isFavorite =
    currentQuote && favorites.some((fav) => fav.text === currentQuote.text);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Random Quote Generator
        </h3>
        <p className="text-gray-300">
          Get inspired with motivational quotes from famous personalities
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-6">
        {currentQuote ? (
          <div className="text-center">
            <blockquote className="text-xl text-white mb-6 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <cite className="text-lg text-blue-400 font-medium">
              — {currentQuote.author}
            </cite>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <p className="text-lg">Click "Generate Quote" to get started!</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={generateQuote}
          disabled={isLoading}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span>{isLoading ? "Generating..." : "Generate Quote"}</span>
        </button>

        {currentQuote && (
          <>
            <button
              onClick={copyQuote}
              className="btn-secondary flex items-center space-x-2"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </button>

            <button
              onClick={toggleFavorite}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isFavorite
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-300"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
              />
              <span>{isFavorite ? "Favorited" : "Add to Favorites"}</span>
            </button>
          </>
        )}
      </div>

      {favorites.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Your Favorite Quotes
          </h4>
          <div className="space-y-3">
            {favorites.map((quote, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <p className="text-white mb-2">"{quote.text}"</p>
                <p className="text-sm text-blue-400">— {quote.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteGenerator;
