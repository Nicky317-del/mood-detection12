import React, { useState, useEffect } from "react";
import SongList from "../components/SongList";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>❤️ Favorite Songs</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet 😕</p>
      ) : (
        <SongList songs={favorites} />
      )}
    </div>
  );
};

export default Favorites;