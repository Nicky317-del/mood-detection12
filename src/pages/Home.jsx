import React, { useState, useEffect } from "react";
import SongList from "../components/SongList";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [input, setInput] = useState("");

  const fetchSongs = async (term) => {
    try {
      let query = term.toLowerCase();

      if (query.includes("happy")) query = "bollywood happy songs";
      else if (query.includes("sad")) query = "arijit singh sad songs";
      else if (query.includes("love")) query = "bollywood romantic songs";

      const res = await fetch(
        `https://itunes.apple.com/search?term=${query}&limit=20&media=music`
      );

      const data = await res.json();
      const results = Array.isArray(data.results)
        ? data.results
        : [];

      setSongs(results);

      localStorage.setItem("lastSongs", JSON.stringify(results));
      localStorage.setItem("lastSearch", term);
    } catch {
      console.log("Error fetching songs");
    }
  };

  // ⚡ Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) fetchSongs(input);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  // Load saved
  useEffect(() => {
    try {
      const savedSongs = localStorage.getItem("lastSongs");
      const savedInput = localStorage.getItem("lastSearch");

      if (savedSongs) {
        setSongs(JSON.parse(savedSongs));
      } else {
        fetchSongs("top songs");
      }

      if (savedInput) setInput(savedInput);
    } catch {
      fetchSongs("top songs");
    }
  }, []);

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
      <h1>🎧 Mini Spotify</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter mood..."
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "6px"
        }}
      />

      <SongList songs={songs} />
    </div>
  );
};

export default Home;