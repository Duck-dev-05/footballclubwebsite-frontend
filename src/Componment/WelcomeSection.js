import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';
import NextEvents from './NextEvents';
import '../CSS/WelcomeSection.css';
import { faCalendarAlt, faUsers, faFutbol, faTrophy } from '@fortawesome/free-solid-svg-icons';

const WelcomeSection = () => {
    const latestNews = [
        {
            id: 1,
            category: "Match Report",
            title: "FC ESCUELA 3-1: Victory in League Match",
            date: "2024-01-20",
            image: teamPhoto
        },
        {
            id: 2,
            category: "Team News",
            title: "Player of the Month Announced",
            date: "2024-01-18",
            image: teamPhoto
        },
        {
            id: 3,
            category: "Latest",
            title: "Upcoming Match: FC ESCUELA vs City FC",
            date: "2024-01-15",
            image: teamPhoto
        }
    ];

    const upcomingMatches = [
        {
            id: 1,
            homeTeam: "FC ESCUELA",
            awayTeam: "City FC",
            date: "2024-02-01",
            time: "20:00",
            venue: "Home Stadium",
            competition: "League Match"
        },
        {
            id: 2,
            homeTeam: "United FC",
            awayTeam: "FC ESCUELA",
            date: "2024-02-08",
            time: "19:45",
            venue: "Away Stadium",
            competition: "Cup Match"
        }
    ];

    return (
        <div className="welcome-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>FC ESCUELA</h1>
                    <p>Experience Excellence in Football</p>
                    <div className="hero-buttons">
                        <Link to="/tickets" className="primary-btn">Buy Tickets</Link>
                        <Link to="/membership" className="secondary-btn">Join Us</Link>
                    </div>
                </div>
                <div className="hero-overlay"></div>
            </section>

            {/* Next Match Section */}
            <section className="next-match-section">
                <div className="next-match-container">
                    <div className="next-match-info">
                        <span className="match-label">Next Match</span>
                        <div className="teams">
                            <span className="team home">FC ESCUELA</span>
                            <span className="vs">VS</span>
                            <span className="team away">City FC</span>
                        </div>
                        <div className="match-details">
                            <span><FontAwesomeIcon icon="calendar" /> Feb 1, 2024</span>
                            <span><FontAwesomeIcon icon="clock" /> 20:00</span>
                            <span><FontAwesomeIcon icon="map-marker-alt" /> Home Stadium</span>
                        </div>
                        <Link to="/tickets" className="ticket-btn">Get Tickets</Link>
                    </div>
                </div>
            </section>

            {/* Next Events Section */}
            <NextEvents />

            {/* Latest News Section */}
            <section className="news-section">
                <div className="news-container">
                    <div className="news-header">
                        <h2 className="news-title">Latest News</h2>
                        <Link to="/news" className="view-all">View All News</Link>
                    </div>
                    <div className="news-grid">
                        {latestNews.slice(0, 3).map((news) => (
                            <Link to={`/news/${news.id}`} key={news.id} className="news-card">
                                <img src={news.image} alt={news.title} className="news-image" />
                                <div className="news-overlay">
                                    <span className="news-category">{news.category}</span>
                                    <h3 className="news-title">{news.title}</h3>
                                    <span className="news-date">
                                        <FontAwesomeIcon icon="calendar" /> {news.date}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="explore-more">
                        <Link to="/news" className="explore-btn">
                            Explore More News <FontAwesomeIcon icon="arrow-right" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Upcoming Matches */}
            <section className="upcoming-matches-section">
                <div className="section-title">
                    <h2>Upcoming Matches</h2>
                    <Link to="/fixtures" className="view-all-fixtures">View All Fixtures</Link>
                </div>
                <div className="matches-grid">
                    {upcomingMatches.map(match => (
                        <div key={match.id} className="match-card">
                            <span className="match-type">{match.competition}</span>
                            <div className="match-teams">
                                <span className="team-name">{match.homeTeam}</span>
                                <span className="vs-text">VS</span>
                                <span className="team-name">{match.awayTeam}</span>
                            </div>
                            <div className="match-info">
                                <span>
                                    <FontAwesomeIcon icon="calendar" /> {match.date}
                                </span>
                                <span>
                                    <FontAwesomeIcon icon="clock" /> {match.time}
                                </span>
                                <span>
                                    <FontAwesomeIcon icon="map-marker-alt" /> {match.venue}
                                </span>
                            </div>
                            <Link to="/tickets" className="buy-tickets">Buy Tickets</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Club Stats */}
            <section className="stats-section">
                <div className="stats-container">
                    <div className="stat-item">
                        <FontAwesomeIcon icon={faCalendarAlt} className="stat-icon" />
                        <span className="stat-number">2022</span>
                        <span className="stat-label">Founded</span>
                    </div>
                    <div className="stat-item">
                        <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        <span className="stat-number">20+</span>
                        <span className="stat-label">Players</span>
                    </div>
                    <div className="stat-item">
                        <FontAwesomeIcon icon={faFutbol} className="stat-icon" />
                        <span className="stat-number">10+</span>
                        <span className="stat-label">Matches</span>
                    </div>
                    <div className="stat-item">
                        <FontAwesomeIcon icon={faTrophy} className="stat-icon" />
                        <span className="stat-number">5+</span>
                        <span className="stat-label">Trophies</span>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Join FC ESCUELA Family</h2>
                    <p>Be part of something special. Support your local team.</p>
                    <div className="cta-buttons">
                        <Link to="/membership" className="cta-btn primary">Become a Member</Link>
                        <Link to="/contact" className="cta-btn secondary">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WelcomeSection;