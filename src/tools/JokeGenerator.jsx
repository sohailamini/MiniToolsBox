import React, { useState } from "react";
import {
  RefreshCw,
  Copy,
  Heart,
  Laugh,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const JokeGenerator = () => {
  const [currentJoke, setCurrentJoke] = useState(null);
  const [jokeType, setJokeType] = useState("random");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(null);
  const [copied, setCopied] = useState(false);

  const jokes = {
    general: [
      {
        setup: "Why don't scientists trust atoms?",
        punchline: "Because they make up everything!",
      },
      {
        setup: "Why did the scarecrow win an award?",
        punchline: "He was outstanding in his field!",
      },
      {
        setup: "Why don't eggs tell jokes?",
        punchline: "They'd crack each other up!",
      },
      {
        setup: "What do you call a fake noodle?",
        punchline: "An impasta!",
      },
      {
        setup: "Why did the math book look so sad?",
        punchline: "Because it had too many problems!",
      },
    ],
    programming: [
      {
        setup: "Why do programmers prefer dark mode?",
        punchline: "Because light attracts bugs!",
      },
      {
        setup: "How many programmers does it take to change a light bulb?",
        punchline: "None, that's a hardware problem!",
      },
      {
        setup: "Why do Java developers wear glasses?",
        punchline: "Because they can't C#!",
      },
      {
        setup: "What's a programmer's favorite hangout place?",
        punchline: "The Foo Bar!",
      },
      {
        setup: "Why did the programmer quit his job?",
        punchline: "He didn't get arrays!",
      },
    ],
    dad: [
      {
        setup: "I'm reading a book about anti-gravity.",
        punchline: "It's impossible to put down!",
      },
      {
        setup: "Why don't scientists trust stairs?",
        punchline: "Because they're always up to something!",
      },
      {
        setup: "What do you call a bear with no teeth?",
        punchline: "A gummy bear!",
      },
      {
        setup: "Why don't skeletons fight each other?",
        punchline: "They don't have the guts!",
      },
      {
        setup: "What do you call a fish wearing a crown?",
        punchline: "A king fish!",
      },
    ],
    puns: [
      {
        setup: "I told my wife she was drawing her eyebrows too high.",
        punchline: "She looked surprised!",
      },
      {
        setup: "Why don't oysters donate to charity?",
        punchline: "Because they are shellfish!",
      },
      {
        setup: "What do you call a dinosaur that crashes his car?",
        punchline: "Tyrannosaurus Wrecks!",
      },
      {
        setup: "Why did the bicycle fall over?",
        punchline: "It was two tired!",
      },
      {
        setup: "What do you call a cow with no legs?",
        punchline: "Ground beef!",
      },
    ],
  };

  const generateJoke = () => {
    setIsLoading(true);
    setRating(null);

    setTimeout(() => {
      let selectedJokes = jokes[jokeType] || jokes.general;
      if (jokeType === "random") {
        const allJokes = Object.values(jokes).flat();
        selectedJokes = allJokes;
      }

      const randomJoke =
        selectedJokes[Math.floor(Math.random() * selectedJokes.length)];
      setCurrentJoke(randomJoke);
      setIsLoading(false);
    }, 800);
  };

  const copyJoke = async () => {
    if (currentJoke) {
      const jokeText = `${currentJoke.setup}\n\n${currentJoke.punchline}`;
      try {
        await navigator.clipboard.writeText(jokeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy joke:", err);
      }
    }
  };

  const toggleFavorite = () => {
    if (currentJoke) {
      const jokeKey = `${currentJoke.setup}-${currentJoke.punchline}`;
      const isFavorite = favorites.some(
        (fav) => `${fav.setup}-${fav.punchline}` === jokeKey
      );

      if (isFavorite) {
        setFavorites(
          favorites.filter((fav) => `${fav.setup}-${fav.punchline}` !== jokeKey)
        );
      } else {
        setFavorites([...favorites, currentJoke]);
      }
    }
  };

  const rateJoke = (ratingValue) => {
    setRating(ratingValue);
  };

  const isFavorite =
    currentJoke &&
    favorites.some(
      (fav) =>
        fav.setup === currentJoke.setup &&
        fav.punchline === currentJoke.punchline
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Joke Generator
        </h3>
        <p className="text-gray-300">
          Get random jokes to brighten your day and share the laughter
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8 mb-6">
        {currentJoke ? (
          <div className="text-center">
            <div className="mb-6">
              <p className="text-xl text-white mb-4 leading-relaxed">
                {currentJoke.setup}
              </p>
              <div className="text-2xl font-bold text-blue-400 mb-6">
                {currentJoke.punchline}
              </div>
            </div>

            {/* Rating */}
            <div className="flex justify-center space-x-2 mb-6">
              <button
                onClick={() => rateJoke("like")}
                className={`p-2 rounded-full transition-colors ${
                  rating === "like"
                    ? "bg-green-100 text-green-600"
                    : "text-gray-400 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                <ThumbsUp className="h-5 w-5" />
              </button>
              <button
                onClick={() => rateJoke("dislike")}
                className={`p-2 rounded-full transition-colors ${
                  rating === "dislike"
                    ? "bg-red-100 text-red-600"
                    : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <ThumbsDown className="h-5 w-5" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={copyJoke}
                className="btn-secondary flex items-center space-x-2"
              >
                {copied ? (
                  <Laugh className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? "Copied!" : "Copy Joke"}</span>
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
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-12">
            <Laugh className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">Click "Generate Joke" to get started!</p>
          </div>
        )}
      </div>

      {/* Joke Type Selection */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">Joke Type</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { value: "random", label: "Random", icon: "🎲" },
            { value: "general", label: "General", icon: "😄" },
            { value: "programming", label: "Programming", icon: "💻" },
            { value: "dad", label: "Dad Jokes", icon: "👨" },
            { value: "puns", label: "Puns", icon: "🎭" },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => setJokeType(type.value)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                jokeType === type.value
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-700 hover:border-gray-600 text-gray-300"
              }`}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className="text-sm font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center mb-8">
        <button
          onClick={generateJoke}
          disabled={isLoading}
          className="btn-primary flex items-center space-x-2 mx-auto disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          <span>{isLoading ? "Generating..." : "Generate Joke"}</span>
        </button>
      </div>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Your Favorite Jokes
          </h4>
          <div className="space-y-4">
            {favorites.map((joke, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-lg">
                <p className="text-white mb-2 font-medium">{joke.setup}</p>
                <p className="text-blue-400 font-medium">{joke.punchline}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Premium Features */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
        <h4 className="text-lg font-semibold text-purple-900 mb-2">
          Premium Features
        </h4>
        <ul className="text-sm text-purple-700 space-y-1 mb-4">
          <li>• Unlimited joke generation</li>
          <li>• Custom joke categories</li>
          <li>• Joke sharing with friends</li>
          <li>• Daily joke notifications</li>
        </ul>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
};

export default JokeGenerator;


