import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ToolPage from "./pages/ToolPage";
import CategoryPage from "./pages/CategoryPage";
import AllTools from "./components/AllTools";
import { tools, categories } from "./data/tools";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-tools" element={<AllTools />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/tool/:toolId" element={<ToolPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
