import React from "react";
import { Link } from "react-router-dom";
import {
  handleSmoothNavigation,
  navigateToHome,
  handleCategoryNavigation,
  handleToolNavigation,
} from "../utils/smoothScroll";
import {
  Zap,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ExternalLink,
  Code,
  Shield,
  Users,
} from "lucide-react";
import { tools, categories } from "../data/tools";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Get some popular tools for quick links
  const popularTools = tools.slice(0, 6);

  // Get categories for footer links
  const categoryNames = Object.keys(categories);

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <button
                onClick={navigateToHome}
                className="text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors cursor-pointer"
              >
                mini tools box
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              A comprehensive collection of powerful, free online tools designed
              to streamline your daily tasks and boost productivity.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@minitoolshub.com"
                className="text-gray-400 hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">Popular Tools</h4>
            <ul className="space-y-2">
              {popularTools.map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={(e) => handleToolNavigation(e, tool.id)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm group w-full text-left"
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <span className="group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <Link
              to="/all-tools"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium mt-3 group"
            >
              View All Tools
              <ExternalLink className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {categoryNames.map((category) => (
                <li key={category}>
                  <button
                    onClick={(e) => handleCategoryNavigation(e, category)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm group w-full text-left"
                  >
                    <span className="text-lg">{categories[category].icon}</span>
                    <span className="group-hover:text-blue-400 transition-colors">
                      {category}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={(e) => handleSmoothNavigation(e, "features")}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleSmoothNavigation(e, "tools")}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Our Tools
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleSmoothNavigation(e, "cta")}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Get Started
                </button>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-8 border border-gray-700">
          <h4 className="text-white font-semibold mb-4 text-center text-sm sm:text-base">
            Platform Statistics
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Code className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mr-2" />
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {tools.length}
                </span>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Free Tools</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mr-2" />
                <span className="text-xl sm:text-2xl font-bold text-white">
                  100%
                </span>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Secure & Private
              </div>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 mr-2" />
                <span className="text-xl sm:text-2xl font-bold text-white">
                  Free
                </span>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                No Sign-Up Needed
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 sm:p-6 mb-8">
          <div className="text-center">
            <h4 className="text-white font-semibold text-base sm:text-lg mb-2">
              Stay Updated
            </h4>
            <p className="text-blue-100 text-xs sm:text-sm mb-4">
              Get notified about new tools and updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm"
              />
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © {currentYear} mini tools box. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <button
                onClick={(e) => handleSmoothNavigation(e, "hero")}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={(e) => handleSmoothNavigation(e, "features")}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={(e) => handleSmoothNavigation(e, "tools")}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Tools
              </button>
              <div className="flex items-center space-x-1 text-gray-400">
                <span>Made with</span>
                <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                <span>
                  <a
                    href="https://sohailamini.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Sohail Amini
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
