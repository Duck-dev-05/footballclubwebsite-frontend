import React, { useState } from 'react';
import { teamPhoto } from '../images';
import '../CSS/Fixtures.css';

const Fixtures = ({ isAdmin }) => {
  const [fixtures, setFixtures] = useState([
    {
      id: 1,
      date: "2024-01-15",
      competition: "League Match",
      homeTeam: "FC ESCUELA",
      awayTeam: "City FC",
      homeScore: 3,
      awayScore: 1,
      status: "Completed",
      venue: "Home Stadium"
    },
    {
      id: 2,
      date: "2024-01-22",
      competition: "Cup Match",
      homeTeam: "United FC",
      awayTeam: "FC ESCUELA",
      homeScore: 2,
      awayScore: 2,
      status: "Completed",
      venue: "Away Stadium"
    },
    {
      id: 3,
      date: "2024-02-01",
      competition: "League Match",
      homeTeam: "FC ESCUELA",
      awayTeam: "Rovers FC",
      homeScore: null,
      awayScore: null,
      status: "Upcoming",
      venue: "Home Stadium"
    }
  ]);

  const [editingFixture, setEditingFixture] = useState(null);
  const [tempScores, setTempScores] = useState({ home: '', away: '' });

  const handleEdit = (fixture) => {
    if (!isAdmin) return;
    setEditingFixture(fixture.id);
    setTempScores({
      home: fixture.homeScore || '',
      away: fixture.awayScore || ''
    });
  };

  const handleSave = (fixtureId) => {
    if (!isAdmin) return;
    setFixtures(fixtures.map(fixture => {
      if (fixture.id === fixtureId) {
        return {
          ...fixture,
          homeScore: parseInt(tempScores.home) || 0,
          awayScore: parseInt(tempScores.away) || 0,
          status: 'Completed'
        };
      }
      return fixture;
    }));
    setEditingFixture(null);
  };

  const handleCancel = () => {
    setEditingFixture(null);
    setTempScores({ home: '', away: '' });
  };

  return (
    <div className="fixtures-container">
      <div className="fixtures-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${teamPhoto})` }}>
        <h1>Fixtures & Results</h1>
      </div>
      
      <div className="fixtures-content">
        <div className="fixtures-list">
          {fixtures.map((fixture) => (
            <div key={fixture.id} className="fixture-card">
              <div className="fixture-header">
                <span className="competition">{fixture.competition}</span>
                <span className="date">{new Date(fixture.date).toLocaleDateString()}</span>
              </div>
              
              <div className="fixture-main">
                <div className="team home-team">
                  <span className="team-name">{fixture.homeTeam}</span>
                  {editingFixture === fixture.id ? (
                    <input
                      type="number"
                      value={tempScores.home}
                      onChange={(e) => setTempScores({ ...tempScores, home: e.target.value })}
                      className="score-input"
                      min="0"
                    />
                  ) : (
                    <span className="score">{fixture.homeScore ?? '-'}</span>
                  )}
                </div>
                
                <div className="fixture-center">
                  <span className="vs">VS</span>
                  <span className="venue">{fixture.venue}</span>
                  {isAdmin && fixture.status !== 'Upcoming' && (
                    <div className="admin-controls">
                      {editingFixture === fixture.id ? (
                        <>
                          <button onClick={() => handleSave(fixture.id)} className="save-btn">
                            Save
                          </button>
                          <button onClick={handleCancel} className="cancel-btn">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button onClick={() => handleEdit(fixture)} className="edit-btn">
                          Edit Score
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="team away-team">
                  <span className="team-name">{fixture.awayTeam}</span>
                  {editingFixture === fixture.id ? (
                    <input
                      type="number"
                      value={tempScores.away}
                      onChange={(e) => setTempScores({ ...tempScores, away: e.target.value })}
                      className="score-input"
                      min="0"
                    />
                  ) : (
                    <span className="score">{fixture.awayScore ?? '-'}</span>
                  )}
                </div>
              </div>

              <div className="fixture-footer">
                <span className={`status ${fixture.status.toLowerCase()}`}>
                  {fixture.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Fixtures;