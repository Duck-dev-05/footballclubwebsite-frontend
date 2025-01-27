import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faCalendar, faTrophy, faTicket } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Fixtures.css';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([
    {
      id: 1,
      type: "LEAGUE MATCH",
      homeTeam: "FC ESCUELA3",
      awayTeam: "CITY FC1",
      venue: "VSHome Stadium",
      status: "Completed",
      date: "1/15/2024",
      score: {
        home: 3,
        away: 1
      },
      goals: [
        {
          team: "home",
          player: "John Smith",
          time: "23'",
          assist: "Mike Johnson"
        },
        {
          team: "away",
          player: "Tom Wilson",
          time: "45'",
          assist: "James Brown"
        },
        {
          team: "home",
          player: "Mike Johnson",
          time: "67'",
          assist: "John Smith"
        },
        {
          team: "home",
          player: "Alex Davis",
          time: "89'",
          assist: "John Smith"
        }
      ]
    },
    {
      id: 2,
      type: "CUP MATCH",
      homeTeam: "UNITED FC2",
      awayTeam: "FC ESCUELA2",
      venue: "VSAway Stadium",
      status: "Completed",
      date: "1/22/2024"
    },
    {
      id: 3,
      type: "LEAGUE MATCH",
      homeTeam: "FC ESCUELA",
      awayTeam: "ROVERS FC",
      venue: "VSHome Stadium",
      status: "Upcoming",
      date: "2/1/2024"
    }
  ]);

  return (
    <div className="fixtures-container">
      <div className="fixtures-list">
        {fixtures.map((fixture) => (
          <div key={fixture.id} className="fixture-card">
            <div className="fixture-header">
              <span className="competition">{fixture.type}</span>
              <div className="fixture-date">{fixture.date}</div>
            </div>
            
            <div className="fixture-teams">
              <div className="team home">
                <span className="team-name">{fixture.homeTeam}</span>
              </div>
              
              {fixture.status === "Completed" ? (
                <div className="score-section">
                  <span className="score completed">
                    {fixture.score.home} - {fixture.score.away}
                  </span>
                </div>
              ) : (
                <span className="vs-text">VS</span>
              )}
              
              <div className="team away">
                <span className="team-name">{fixture.awayTeam}</span>
              </div>
            </div>

            {fixture.status === "Completed" && fixture.goals && (
              <div className="goals-section">
                {fixture.goals.map((goal, index) => (
                  <div key={index} className="goal-detail">
                    <div className="goal-scorer">
                      <span>{goal.player}</span>
                      {goal.assist && (
                        <span className="assist">
                          (assist: {goal.assist})
                        </span>
                      )}
                    </div>
                    <span className="goal-time">{goal.time}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="fixture-footer">
              <div className="venue">{fixture.venue}</div>
              <span className={`match-status ${fixture.status.toLowerCase()}`}>
                {fixture.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fixtures; 