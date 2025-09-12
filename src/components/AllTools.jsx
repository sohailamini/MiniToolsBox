import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Filter } from "lucide-react";
import { tools, categories } from "../data/tools";
import { handleToolNavigation } from "../utils/smoothScroll";

const AllTools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  // Filter and sort tools
  const filteredTools = tools
    .filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "subcategory":
          return a.subcategory.localeCompare(b.subcategory);
        default:
          return 0;
      }
    });

  const categoryNames = ["All", ...Object.keys(categories)];

  return (
    <div className="min-h-screen bg-gray-900 py-3 sm:py-4 md:py-6 lg:py-8">
      <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4">
            All Tools
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 max-w-4xl mx-auto px-2 sm:px-4">
            Discover our complete collection of powerful, free online tools
            designed to streamline your daily tasks and boost productivity.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-gray-800 rounded-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-gray-700">
          <div className="space-y-3 sm:space-y-4">
            {/* Search Bar */}
            <div className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Filter Controls Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Category Filter */}
              <div className="w-full">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm sm:text-base"
                  >
                    {categoryNames.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sort */}
              <div className="w-full">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-sm sm:text-base"
                >
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                  <option value="subcategory">Sort by Type</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              Showing {filteredTools.length} of {tools.length} tools
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={(e) => handleToolNavigation(e, tool.id)}
              className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-600 min-h-[200px] sm:min-h-[220px] md:min-h-[240px] flex flex-col w-full text-left"
            >
              {/* Tool Icon */}
              <div className="text-center mb-2 sm:mb-3 md:mb-4 flex-shrink-0">
                <div className="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-200">
                  {tool.icon}
                </div>
              </div>

              {/* Tool Info */}
              <div className="text-center flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                    {tool.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 group-hover:text-gray-300 transition-colors line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Category Badge */}
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full whitespace-nowrap">
                    {tool.category}
                  </span>
                  <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full whitespace-nowrap">
                    {tool.subcategory}
                  </span>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-center text-blue-400 text-xs sm:text-sm font-medium group-hover:text-blue-300 mt-auto">
                  Use Tool
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-8 sm:py-12 md:py-16">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
              🔍
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-3">
              No tools found
            </h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base max-w-md mx-auto">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 bg-gray-800 rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 border border-gray-700">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 text-center">
            Tool Collection Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 mb-1 sm:mb-2">
                {tools.length}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Total Tools
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400 mb-1 sm:mb-2">
                {Object.keys(categories).length}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 mb-1 sm:mb-2">
                {[...new Set(tools.map((t) => t.subcategory))].length}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">Tool Types</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-1 sm:mb-2">
                100%
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Free to Use
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTools;
