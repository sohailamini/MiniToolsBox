import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Home, ArrowRight } from "lucide-react";
import { tools, categories } from "../data/tools";
import { handleToolNavigation } from "../utils/smoothScroll";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Safety check for categoryName
  if (!categoryName) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Loading...
          </h1>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">
            Please wait while we load the category.
          </p>
        </div>
      </div>
    );
  }

  // Convert URL parameter back to original category name
  const decodedCategoryName = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const category = categories[decodedCategoryName];
  const categoryTools = tools.filter(
    (tool) => tool.category === decodedCategoryName
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">
            The requested category could not be found.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base inline-flex items-center"
          >
            <Home className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Group tools by subcategory
  const toolsBySubcategory = categoryTools.reduce((acc, tool) => {
    if (!acc[tool.subcategory]) {
      acc[tool.subcategory] = [];
    }
    acc[tool.subcategory].push(tool);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Category Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Back to Home
              </Link>
              <div className="hidden sm:block h-6 w-px bg-gray-600"></div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-2xl sm:text-3xl md:text-4xl">
                  {category.icon}
                </span>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {decodedCategoryName}
                  </h1>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/all-tools"
              className="flex items-center text-gray-400 hover:text-white transition-colors text-sm sm:text-base self-start sm:self-auto"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              All Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Category Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Subcategories */}
          {Object.entries(toolsBySubcategory).map(
            ([subcategory, subcategoryTools]) => (
              <div key={subcategory} className="mb-8 sm:mb-10 md:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                    {subcategory}
                  </h2>
                  <div className="hidden sm:block h-px bg-gray-700 flex-1"></div>
                  <span className="text-gray-400 text-xs sm:text-sm">
                    {subcategoryTools.length} tool
                    {subcategoryTools.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {subcategoryTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={(e) => handleToolNavigation(e, tool.id)}
                      className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-3 sm:p-4 md:p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-600 min-h-[180px] sm:min-h-[200px] md:min-h-[220px] flex flex-col w-full text-left"
                    >
                      <div className="text-center mb-2 sm:mb-3 md:mb-4 flex-shrink-0">
                        <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-200">
                          {tool.icon}
                        </div>
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 sm:mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                            {tool.name}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors line-clamp-2 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-3 md:mt-4 flex items-center justify-center text-blue-400 text-xs sm:text-sm font-medium group-hover:text-blue-300">
                          Use Tool
                          <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

          {/* All Tools in Category */}
          <div className="mt-8 sm:mt-10 md:mt-12 bg-gray-800 rounded-lg p-4 sm:p-6 md:p-8 border border-gray-700">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-3 sm:mb-4">
              All {decodedCategoryName} Tools
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {categoryTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={(e) => handleToolNavigation(e, tool.id)}
                  className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded hover:bg-gray-700 transition-colors group w-full text-left"
                >
                  <span className="text-lg sm:text-xl md:text-2xl flex-shrink-0">
                    {tool.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                      {tool.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {tool.subcategory}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
