import React, { useState } from 'react';
import { teamPhoto } from '../images';
import '../CSS/Fixtures.css';

const Fixtures = ({ isAdmin }) => {
  const [fixtures, setFixtures] = useState([
    {
      id: 1,
      homeTeam: "FC ESCUELA",
      awayTeam: "City FC",
      date: "2024-02-15",
      time: "15:00",
      venue: "Home Stadium",
      competition: "League Match",
      homeScore: null,
      awayScore: null
    },
    {
      id: 2, 
      homeTeam: "United FC",
      awayTeam: "FC ESCUELA",
      date: "2024-02-22",
      time: "19:45",
      venue: "Away Stadium",
      competition: "Cup Match",
      homeScore: null,
      awayScore: null
    },
    {
      id: 3,
      homeTeam: "FC ESCUELA",
      awayTeam: "Athletic Club",
      date: "2024-03-01",
      time: "20:00",
      venue: "Home Stadium", 
      competition: "League Match",
      homeScore: null,
      awayScore: null
    }
  ]);

  const [editingId, setEditingId] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handleEditResult = (id) => {
    setEditingId(id);
  };

  const handleSaveResult = (id, homeScore, awayScore) => {
    setFixtures(fixtures.map(fixture => 
      fixture.id === id 
        ? { ...fixture, homeScore, awayScore }
        : fixture
    ));
    setEditingId(null);
  };

  return (
    <div className="fixtures-container">
      <div className="fixtures-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${teamPhoto})` }}>
        <h1>Upcoming Fixtures</h1>
      </div>
      
      <div className="fixtures-content">
        <div className="fixtures-list">
          {fixtures.map(fixture => (
            <div key={fixture.id} className="fixture-card">
              <div className="fixture-header">
                <div className="competition-badge">{fixture.competition}</div>
                <div className="fixture-date">{formatDate(fixture.date)}</div>
              </div>
              
              <div className="fixture-main">
                <div className="team home-team">
                  <span className="team-name">{fixture.homeTeam}</span>
                  {fixture.homeScore !== null && <span className="score">{fixture.homeScore}</span>}
                </div>
                
                <div className="fixture-center">
                  <div className="vs">VS</div>
                  <div className="match-time">{fixture.time}</div>
                </div>
                
                <div className="team away-team">
                  {fixture.awayScore !== null && <span className="score">{fixture.awayScore}</span>}
                  <span className="team-name">{fixture.awayTeam}</span>
                </div>
              </div>

              <div className="fixture-footer">
                <div className="venue">
                  <i className="fas fa-map-marker-alt"></i>
                  {fixture.venue}
                </div>
                
                {editingId === fixture.id ? (
                  <div className="score-editor">
                    <input 
                      type="number" 
                      defaultValue={fixture.homeScore || ''} 
                      min="0"
                      placeholder="Home"
                      id={`home-${fixture.id}`}
                    />
                    <span className="score-separator">-</span>
                    <input 
                      type="number" 
                      defaultValue={fixture.awayScore || ''} 
                      min="0"
                      placeholder="Away"
                      id={`away-${fixture.id}`}
                    />
                    <button 
                      className="save-button"
                      onClick={() => {
                        const homeScore = document.getElementById(`home-${fixture.id}`).value;
                        const awayScore = document.getElementById(`away-${fixture.id}`).value;
                        handleSaveResult(fixture.id, homeScore, awayScore);
                      }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  isAdmin && (
                    <button 
                      className="edit-button"
                      onClick={() => handleEditResult(fixture.id)}
                    >
                      Edit Result
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fixtures;