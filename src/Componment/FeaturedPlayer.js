import React from "react";
import "../CSS/FeaturedPlayer.css";

const FeaturedPlayer = () => {
    return (
        <section className="Featured-players">
            <h2>Featured Player</h2>
            <div className="players-container">
        <div className="player-card">
          <h3>Player 1</h3>
          <p>Forward</p>
        </div>
        <div className="player-card">
          <h3>Player 2</h3>
          <p>Midfielder</p>
        </div>
        <div className="player-card">
          <h3>Player 3</h3>
          <p>Defender</p>
        </div>
      </div>
        </section>
    );
};

export default FeaturedPlayer;