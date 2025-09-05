import React, { useState } from "react";
import { Copy, CheckCircle, FileText, Eye, Code } from "lucide-react";

const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [viewMode, setViewMode] = useState("split"); // 'split', 'markdown', 'preview'
  const [copied, setCopied] = useState(false);

  const convertMarkdownToHtml = (md) => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

    // Bold and Italic
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    html = html.replace(/__(.*?)__/gim, "<strong>$1</strong>");
    html = html.replace(/_(.*?)_/gim, "<em>$1</em>");

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>");
    html = html.replace(/`(.*?)`/gim, "<code>$1</code>");

    // Links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Images
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/gim,
      '<img src="$2" alt="$1" />'
    );

    // Lists
    html = html.replace(/^\* (.*$)/gim, "<li>$1</li>");
    html = html.replace(/^- (.*$)/gim, "<li>$1</li>");
    html = html.replace(/^(\d+)\. (.*$)/gim, "<li>$2</li>");

    // Wrap consecutive list items in ul/ol
    html = html.replace(/(<li>.*<\/li>)/gims, (match) => {
      const lines = match.split("\n");
      const listItems = lines.filter((line) => line.trim().startsWith("<li>"));
      if (listItems.length > 0) {
        return `<ul>${listItems.join("")}</ul>`;
      }
      return match;
    });

    // Line breaks
    html = html.replace(/\n\n/gim, "</p><p>");
    html = html.replace(/\n/gim, "<br>");

    // Wrap in paragraphs
    html = "<p>" + html + "</p>";

    // Clean up empty paragraphs
    html = html.replace(/<p><\/p>/gim, "");
    html = html.replace(/<p><br><\/p>/gim, "");

    return html;
  };

  const handleMarkdownChange = (value) => {
    setMarkdown(value);
    const convertedHtml = convertMarkdownToHtml(value);
    setHtml(convertedHtml);
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const loadExample = () => {
    const example = `# Markdown Preview

This is a **Markdown** preview tool that converts Markdown to HTML.

## Features

- Real-time preview
- HTML conversion
- Copy to clipboard
- Multiple view modes

### Code Example

Here's some \`inline code\` and a code block:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Links and Images

- [Visit our website](https://example.com)
- ![Sample Image](https://via.placeholder.com/150)

### Text Formatting

- **Bold text**
- *Italic text*
- ~~Strikethrough~~ (not supported in basic version)

> This is a blockquote

---

**Enjoy using the Markdown Preview tool!**`;

    handleMarkdownChange(example);
  };

  const clearAll = () => {
    setMarkdown("");
    setHtml("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Markdown Preview
        </h3>
        <p className="text-gray-300">
          Convert Markdown to HTML with real-time preview
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-700 rounded-lg p-1">
          {[
            { key: "split", label: "Split View", icon: Eye },
            { key: "markdown", label: "Markdown", icon: FileText },
            { key: "preview", label: "Preview", icon: Code },
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                viewMode === mode.key
                  ? "bg-gray-800 text-white shadow-sm"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <mode.icon className="h-4 w-4" />
              <span>{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Markdown Input */}
        {(viewMode === "split" || viewMode === "markdown") && (
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Markdown
              </h4>
              <div className="flex space-x-2">
                <button onClick={loadExample} className="btn-secondary text-sm">
                  Load Example
                </button>
                <button onClick={clearAll} className="btn-secondary text-sm">
                  Clear
                </button>
              </div>
            </div>

            <textarea
              value={markdown}
              onChange={(e) => handleMarkdownChange(e.target.value)}
              className="w-full h-96 p-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none font-mono text-sm"
              placeholder="Enter your Markdown here..."
            />
          </div>
        )}

        {/* HTML Preview */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Preview
              </h4>
              <button
                onClick={copyHtml}
                disabled={!html}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span>{copied ? "Copied!" : "Copy HTML"}</span>
              </button>
            </div>

            <div className="h-96 overflow-y-auto border border-gray-600 rounded-lg p-4 prose max-w-none">
              {html ? (
                <div dangerouslySetInnerHTML={{ __html: html }} />
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Markdown Cheat Sheet */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Markdown Cheat Sheet
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h5 className="font-medium text-white mb-2">Headers</h5>
            <div className="space-y-1 text-sm font-mono text-gray-300">
              <div># H1</div>
              <div>## H2</div>
              <div>### H3</div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Text Formatting</h5>
            <div className="space-y-1 text-sm font-mono text-gray-300">
              <div>**bold**</div>
              <div>*italic*</div>
              <div>`code`</div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Lists</h5>
            <div className="space-y-1 text-sm font-mono text-gray-300">
              <div>- item</div>
              <div>1. item</div>
              <div>* item</div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Links & Images</h5>
            <div className="space-y-1 text-sm font-mono text-gray-300">
              <div>[text](url)</div>
              <div>![alt](url)</div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Code Blocks</h5>
            <div className="space-y-1 text-sm font-mono text-gray-300">
              <div>```code```</div>
              <div> indented</div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-white mb-2">Other</h5>
            <div className="space-y-1 text-sm font-mono text-gray-300">
              <div>&gt; quote</div>
              <div>---</div>
              <div>---</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreview;


