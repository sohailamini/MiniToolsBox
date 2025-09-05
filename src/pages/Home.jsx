import React from "react";
import { Link } from "react-router-dom";
import { tools, categories } from "../data/tools";
import { handleSmoothNavigation } from "../utils/smoothScroll";
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
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20"
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mini Tools Box
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              A comprehensive collection of powerful, free online tools designed
              to streamline your daily tasks and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/all-tools"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Tools
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <button className="border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Why Choose Our Tools?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Lightning Fast
              </h3>
              <p className="text-gray-300">
                All tools are optimized for speed and performance, delivering
                instant results.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Secure & Private
              </h3>
              <p className="text-gray-300">
                Your data is processed locally and never stored on our servers.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Easy to Use
              </h3>
              <p className="text-gray-300">
                Intuitive interfaces designed for both beginners and
                professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Our Tool Collection
          </h2>

          {categoryNames.map((categoryName) => {
            const categoryTools = tools.filter(
              (tool) => tool.category === categoryName
            );
            return (
              <div key={categoryName} className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">
                      {categories[categoryName].icon}
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {categoryName}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {categories[categoryName].description}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/category/${categoryName
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    View All →
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryTools.slice(0, 4).map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.id}`}
                      className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-600"
                    >
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                        {tool.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {tool.description}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {tool.subcategory}
                      </div>
                      <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300">
                        Use Tool
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
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
        className="py-16 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start using our tools today and experience the difference they can
            make in your daily workflow.
          </p>
          <Link
            to="/all-tools"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
