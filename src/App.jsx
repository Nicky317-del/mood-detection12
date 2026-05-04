import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import "./styles.css";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div>
      {/* 🌗 Toggle */}
      <button
        onClick={() => setDark(!dark)}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "6px 10px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {dark ? "🌙 Dark" : "☀️ Light"}
      </button>

      <Home />
    </div>
  );
}

export default App;