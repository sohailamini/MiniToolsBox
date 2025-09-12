import React from "react";

const ToolGrid = ({ tools, onToolClick }) => {
  const categories = [...new Set(tools.map((tool) => tool.category))];

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools
              .filter((tool) => tool.category === category)
              .map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onToolClick(tool)}
                  className="tool-card cursor-pointer group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolGrid;




