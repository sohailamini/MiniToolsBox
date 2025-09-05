import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleSmoothNavigation } from "../utils/smoothScroll";
import { Zap, Menu, X, ChevronDown, Star, Github } from "lucide-react";
import { tools, categories } from "../data/tools";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  const categoryNames = Object.keys(categories);

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={(e) => handleSmoothNavigation(e, "hero")}
            className="flex items-center space-x-2 group"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              Mini Tools Box
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <button
              onClick={(e) => handleSmoothNavigation(e, "hero")}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={(e) => handleSmoothNavigation(e, "features")}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={(e) => handleSmoothNavigation(e, "tools")}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Tools
            </button>

            {/* Categories */}
            <div className="flex items-center space-x-4">
              {categoryNames.map((categoryName) => (
                <Link
                  key={categoryName}
                  to={`/category/${categoryName
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm"
                  title={categories[categoryName].description}
                >
                  <span className="hidden xl:inline">{categoryName}</span>
                </Link>
              ))}
            </div>

            <Link
              to="/all-tools"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              All Tools
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <a
                className="flex items-center space-x-1"
                href="https://github.com/sohailamini/MiniToolsBox"
                target="_blank"
              >
                <Star className="h-4 w-4" />
                <span className="text-sm">Star on GitHub</span>
              </a>
            </button>

            <Link to="/all-tools">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 py-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={(e) => {
                  handleSmoothNavigation(e, "hero");
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 text-left"
              >
                Home
              </button>
              <button
                onClick={(e) => {
                  handleSmoothNavigation(e, "features");
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 text-left"
              >
                Features
              </button>
              <button
                onClick={(e) => {
                  handleSmoothNavigation(e, "tools");
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors font-medium py-2 text-left"
              >
                Tools
              </button>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categoryNames.map((categoryName) => (
                    <Link
                      key={categoryName}
                      to={`/category/${categoryName
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors py-3 px-3 rounded hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-2xl">
                        {categories[categoryName].icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {categoryName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {categories[categoryName].description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors py-2">
                  <Github className="h-4 w-4" />
                  <span className="text-sm">Star on GitHub</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
