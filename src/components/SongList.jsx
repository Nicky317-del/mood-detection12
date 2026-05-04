import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const SongList = ({ songs = [] }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  const playSong = (song) => {
    if (!song?.previewUrl) return;

    audioRef.current.pause();
    audioRef.current = new Audio(song.previewUrl);
    audioRef.current.play();

    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const stopSong = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentSong(null);
    setIsPlaying(false);
  };

  const toggleFavorite = (song) => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");

    const exists = favs.find((item) => item.trackId === song.trackId);

    if (exists) {
      favs = favs.filter((item) => item.trackId !== song.trackId);
    } else {
      favs.push(song);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    setFavorites(favs);
  };

  return (
    <div style={{ paddingBottom: "130px" }}>
      {/* 🎵 SONG GRID */}
      <div className="song-grid">
        {songs.map((song) => {
          const isFav = favorites.some(
            (item) => item.trackId === song.trackId
          );

          return (
            <motion.div
              className="song-card"
              key={song.trackId}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                loading="lazy"
                src={
                  song.artworkUrl100 ||
                  "https://via.placeholder.com/300"
                }
                alt=""
              />

              <h4>{song.trackName}</h4>
              <p>{song.artistName}</p>

              <div className="actions">
                <button onClick={() => playSong(song)}>▶</button>

                <button onClick={() => toggleFavorite(song)}>
                  {isFav ? "❤️" : "🤍"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🎧 PLAYER (CENTER CONTROLS) */}
      {currentSong && (
        <div className="player">
          
          {/* LEFT - SONG INFO */}
          <div className="player-left">
            🎵 {currentSong.trackName}
            <div style={{ fontSize: "12px", color: "#aaa" }}>
              {currentSong.artistName}
            </div>
          </div>

          {/* CENTER - CONTROLS */}
          <div className="player-center">
            {isPlaying ? (
              <button onClick={pauseSong}>⏸</button>
            ) : (
              <button onClick={() => playSong(currentSong)}>▶</button>
            )}

            <button onClick={stopSong}>⏹</button>
          </div>

          {/* RIGHT - EMPTY FOR BALANCE */}
          <div className="player-right"></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(SongList);