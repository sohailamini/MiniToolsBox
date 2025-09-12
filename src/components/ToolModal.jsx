import React from "react";
import { X } from "lucide-react";
import ToolRenderer from "./ToolRenderer";

const ToolModal = ({ tool, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{tool.icon}</span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{tool.name}</h2>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <ToolRenderer tool={tool} />
        </div>
      </div>
    </div>
  );
};

export default ToolModal;




