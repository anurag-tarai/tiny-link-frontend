import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Navbar is now globally visible */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<StatsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
