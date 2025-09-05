import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Filter } from "lucide-react";
import { tools, categories } from "../data/tools";

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
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">All Tools</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our complete collection of powerful, free online tools
            designed to streamline your daily tasks and boost productivity.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border px-16 border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 ">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
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
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="subcategory">Sort by Type</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredTools.length} of {tools.length} tools
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              to={`/tool/${tool.id}`}
              className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-600"
            >
              {/* Tool Icon */}
              <div className="text-center mb-4">
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {tool.icon}
                </div>
              </div>

              {/* Tool Info */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {tool.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3 group-hover:text-gray-300 transition-colors line-clamp-2">
                  {tool.description}
                </p>

                {/* Category Badge */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                  <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">
                    {tool.subcategory}
                  </span>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-center text-blue-400 text-sm font-medium group-hover:text-blue-300">
                  Use Tool
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No tools found
            </h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Tool Collection Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {tools.length}
              </div>
              <div className="text-gray-400 text-sm">Total Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {Object.keys(categories).length}
              </div>
              <div className="text-gray-400 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {[...new Set(tools.map((t) => t.subcategory))].length}
              </div>
              <div className="text-gray-400 text-sm">Tool Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                100%
              </div>
              <div className="text-gray-400 text-sm">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTools;
