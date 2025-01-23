import React from "react";
import { teamPhoto } from '../images';
import "../CSS/FeaturedPlayer.css";

const FeaturedPlayer = () => {
    const players = [
        {
            name: "Player One",
            position: "Forward",
            number: "10"
        },
        {
            name: "Player Two",
            position: "Midfielder",
            number: "8"
        },
        {
            name: "Player Three",
            position: "Defender",
            number: "4"
        }
    ];

    return (
        <section className="featured-players">
            <h2>Featured Players</h2>
            <div className="players-container">
                {players.map((player, index) => (
                    <div key={index} className="player-card">
                        <div className="player-image" 
                             style={{
                                 backgroundImage: `url(${teamPhoto})`,
                                 backgroundPosition: `${index * 33}% center`
                             }}>
                            <div className="player-number">{player.number}</div>
                        </div>
                        <div className="player-info">
                            <h3>{player.name}</h3>
                            <p>{player.position}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedPlayer;