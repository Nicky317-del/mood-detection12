import React from "react";

const Dashboard = () => {
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Dashboard</h2>

      {history.length === 0 ? (
        <p>No previous moods found 😕</p>
      ) : (
        <>
          <p>Total moods: {history.length}</p>

          <ul>
            {history.map((m, i) => (
              <li key={i}>👉 {m}</li>
            ))}
          </ul>

          {/* 🗑️ OPTIONAL CLEAR BUTTON */}
          <button
            onClick={() => {
              localStorage.removeItem("moodHistory");
              window.location.reload();
            }}
          >
            Clear History
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;