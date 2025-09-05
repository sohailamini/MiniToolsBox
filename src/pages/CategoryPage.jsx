import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { tools, categories } from "../data/tools";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Safety check for categoryName
  if (!categoryName) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Loading...</h1>
          <p className="text-gray-400 mb-8">
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The requested category could not be found.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Home className="inline-block mr-2 h-5 w-5" />
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
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-600"></div>
              <div className="flex items-center space-x-3">
                <span className="text-4xl">{category.icon}</span>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {decodedCategoryName}
                  </h1>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </div>
            </div>
            <Link
              to="/"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              All Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Category Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Subcategories */}
          {Object.entries(toolsBySubcategory).map(
            ([subcategory, subcategoryTools]) => (
              <div key={subcategory} className="mb-12">
                <div className="flex items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">
                    {subcategory}
                  </h2>
                  <div className="ml-4 h-px bg-gray-700 flex-1"></div>
                  <span className="text-gray-400 text-sm ml-4">
                    {subcategoryTools.length} tool
                    {subcategoryTools.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {subcategoryTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.id}`}
                      className="group bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-700 hover:border-gray-600"
                    >
                      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                        {tool.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        {tool.description}
                      </p>
                      <div className="mt-4 flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300">
                        Use Tool
                        <ArrowLeft className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform rotate-180" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          )}

          {/* All Tools in Category */}
          <div className="mt-12 bg-gray-800 rounded-lg p-8 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              All {decodedCategoryName} Tools
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryTools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tool/${tool.id}`}
                  className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition-colors group"
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                      {tool.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {tool.subcategory}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
