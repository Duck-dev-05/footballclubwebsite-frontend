import React from "react";
import '../CSS/WelcomeSection.css';

const WelcomeSection = () => {
    return (
        <section className="welcome-section">
            <div className="hero-overlay"></div>
            <div className="welcome-content">
                <h1>Welcome to FC ESCUELA</h1>
                <p>Experience the Excellence of Football</p>
                <div className="cta-buttons">
                    <a href="/fixtures" className="cta-button primary">Latest Matches</a>
                    <a href="/news" className="cta-button secondary">Club News</a>
                </div>
            </div>
            <div className="news-strip">
                <div className="news-container">
                    <div className="news-item">
                        <span className="news-category">Latest</span>
                        <p>Upcoming Match: FC ESCUELA vs City FC</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;