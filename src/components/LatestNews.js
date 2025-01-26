import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCalendar } from '@fortawesome/free-solid-svg-icons';
import '../CSS/LatestNews.css';

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      const response = await fetch('http://localhost:5046/api/news?limit=3');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNews(data);
    } catch (err) {
      setError('Failed to load latest news');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="news-loading">Loading latest news...</div>;
  if (error) return <div className="news-error">{error}</div>;

  return (
    <section className="latest-news-section">
      <div className="news-header">
        <h2>Latest News</h2>
        <Link to="/news" className="view-all-link">
          View All News <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      <div className="news-grid">
        {news.map((item, index) => (
          <Link 
            to={`/news/${item.id}`} 
            key={item.id} 
            className={`news-card ${index === 0 ? 'featured' : ''}`}
          >
            <div className="news-image">
              <img src={item.imageUrl} alt={item.title} />
              <div className="news-overlay">
                <div className="news-category">{item.category}</div>
                <div className="news-date">
                  <FontAwesomeIcon icon={faCalendar} />
                  {new Date(item.publishDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="news-content">
              <h3>{item.title}</h3>
              <p>{item.content.substring(0, 150)}...</p>
              <div className="news-meta">
                <span className="read-more">
                  Read Full Article <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="news-cta">
        <Link to="/news" className="explore-news-button">
          Explore More News <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </section>
  );
};

export default LatestNews; 