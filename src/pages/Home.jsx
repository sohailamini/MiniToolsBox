import React from "react";
import { Link } from "react-router-dom";
import { tools, categories } from "../data/tools";
import {
  handleSmoothNavigation,
  handleToolNavigation,
} from "../utils/smoothScroll";
import {
  ArrowRight,
  Zap,
  Shield,
  Palette,
  Calculator,
  Code,
  FileText,
  Wrench,
} from "lucide-react";

const Home = () => {
  const categoryNames = Object.keys(categories);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Mini Tools Box
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
              A comprehensive collection of powerful, free online tools designed
              to streamline your daily tasks and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                to="/all-tools"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Explore Tools
                <ArrowRight className="inline-block ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <button className="w-full sm:w-auto border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
            Why Choose Our Tools?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-gray-700 rounded-lg">
              <div className="bg-blue-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
                Lightning Fast
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                All tools are optimized for speed and performance, delivering
                instant results.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gray-700 rounded-lg">
              <div className="bg-green-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
                Secure & Private
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Your data is processed locally and never stored on our servers.
              </p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gray-700 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="bg-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-white">
                Easy to Use
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Intuitive interfaces designed for both beginners and
                professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-12 sm:py-16 lg:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
            Our Tool Collection
          </h2>

          {categoryNames.map((categoryName) => {
            const categoryTools = tools.filter(
              (tool) => tool.category === categoryName
            );
            return (
              <div
                key={categoryName}
                className="mb-8 sm:mb-12"
                data-category={categoryName}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <div className="flex items-center">
                    <span className="text-2xl sm:text-3xl mr-3">
                      {categories[categoryName].icon}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        {categoryName}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {categories[categoryName].description}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/category/${categoryName
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium self-start sm:self-auto"
                  >
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {categoryTools.slice(0, 4).map((tool) => (
                    <button
                      key={tool.id}
                      onClick={(e) => handleToolNavigation(e, tool.id)}
                      className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-4 sm:p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-600 w-full text-left"
                    >
                      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200">
                        {tool.icon}
                      </div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {tool.name}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors line-clamp-2">
                        {tool.description}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {tool.subcategory}
                      </div>
                      <div className="mt-3 sm:mt-4 flex items-center text-blue-400 text-xs sm:text-sm font-medium group-hover:text-blue-300">
                        Use Tool
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Start using our tools today and experience the difference they can
            make in your daily workflow.
          </p>
          <Link
            to="/all-tools"
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
