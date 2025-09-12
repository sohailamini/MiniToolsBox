import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  handleSmoothNavigation,
  navigateToHome,
  scrollToTop,
} from "../utils/smoothScroll";
import { Zap, Menu, X, ChevronDown, Star, Github, ArrowUp } from "lucide-react";
import { tools, categories } from "../data/tools";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categoryNames = Object.keys(categories);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={navigateToHome}
            className="flex items-center space-x-2 group"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              Mini Tools Box
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <button
              onClick={(e) => handleSmoothNavigation(e, "hero")}
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              Home
            </button>
            <button
              onClick={(e) => handleSmoothNavigation(e, "features")}
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              Features
            </button>
            <button
              onClick={(e) => handleSmoothNavigation(e, "tools")}
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              Tools
            </button>

            {/* Categories - Hidden on smaller screens */}
            <div className="hidden xl:flex items-center space-x-4">
              {categoryNames.slice(0, 3).map((categoryName) => (
                <Link
                  key={categoryName}
                  to={`/category/${categoryName
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors text-sm"
                  title={categories[categoryName].description}
                >
                  <span>{categoryName}</span>
                </Link>
              ))}
            </div>

            <Link
              to="/all-tools"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm xl:text-base"
            >
              All Tools
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <button className="text-gray-300 hover:text-white transition-colors">
              <a
                className="flex items-center space-x-1"
                href="https://github.com/sohailamini/MiniToolsBox"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="h-4 w-4" />
                <span className="hidden xl:inline text-sm">Star on GitHub</span>
              </a>
            </button>

            <Link to="/all-tools">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 xl:px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 text-sm xl:text-base">
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
          <div className="lg:hidden border-t border-gray-700 py-4 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={(e) => {
                  handleSmoothNavigation(e, "hero");
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors font-medium py-3 px-4 text-left rounded-lg hover:bg-gray-700"
              >
                Home
              </button>
              <button
                onClick={(e) => {
                  handleSmoothNavigation(e, "features");
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors font-medium py-3 px-4 text-left rounded-lg hover:bg-gray-700"
              >
                Features
              </button>
              <button
                onClick={(e) => {
                  handleSmoothNavigation(e, "tools");
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors font-medium py-3 px-4 text-left rounded-lg hover:bg-gray-700"
              >
                Tools
              </button>

              <Link
                to="/all-tools"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-300 hover:text-white transition-colors font-medium py-3 px-4 text-left rounded-lg hover:bg-gray-700"
              >
                All Tools
              </Link>

              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide px-4">
                  Categories
                </h3>
                <div className="space-y-1">
                  {categoryNames.map((categoryName) => (
                    <Link
                      key={categoryName}
                      to={`/category/${categoryName
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">
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

              <div className="pt-4 border-t border-gray-700 space-y-2">
                <a
                  href="https://github.com/sohailamini/MiniToolsBox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors py-3 px-4 rounded-lg hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Github className="h-4 w-4" />
                  <span className="text-sm">Star on GitHub</span>
                </a>
                <Link
                  to="/all-tools"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 text-center"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
