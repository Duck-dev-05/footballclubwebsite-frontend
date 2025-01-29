import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';
import '../CSS/News.css';

const News = ({ isAdmin }) => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "FC ESCUELA Dominates Local Derby with 5-1 Victory",
      subtitle: "Spectacular performance from our forwards leads to commanding win",
      date: "2024-01-20",
      category: "Match Report",
      image: teamPhoto,
      content: "An outstanding display of attacking football...",
      featured: true
    },
    {
      id: 2,
      title: "Youth Academy Produces Three New First Team Players",
      subtitle: "Local talents make the step up to senior football",
      date: "2024-01-18",
      category: "Academy",
      image: teamPhoto,
      content: "FC ESCUELA's commitment to youth development...",
      featured: false
    },
    {
      id: 3,
      title: "New Training Facility Construction Begins",
      subtitle: "State-of-the-art complex to be completed by 2025",
      date: "2024-01-15",
      category: "Club News",
      image: teamPhoto,
      content: "The club's future home takes shape...",
      featured: true
    }
  ]);

  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Match Report', 'Club News', 'Academy', 'Interviews'];

  const filteredNews = activeCategory === 'All' 
    ? news 
    : news.filter(item => item.category === activeCategory);

  const featuredNews = news.filter(item => item.featured);

  return (
    <div className="news-container">
      {/* Hero Section */}
      <div className="news-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${teamPhoto})` }}>
        <h1>Latest News</h1>
        <p>Stay updated with FC ESCUELA</p>
      </div>

      {/* Featured News Slider */}
      <div className="featured-news">
        <div className="featured-slider">
          {featuredNews.map(item => (
            <div key={item.id} className="featured-item">
              <div className="featured-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="featured-content">
                <span className="category">{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.subtitle}</p>
                <Link to={`/news/${item.id}`} className="read-more">
                  Read More <FontAwesomeIcon icon="arrow-right" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Categories */}
      <div className="news-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="news-grid">
        {filteredNews.map(item => (
          <div key={item.id} className="news-card">
            <div className="news-image">
              <img src={item.image} alt={item.title} />
              <span className="category-tag">{item.category}</span>
            </div>
            <div className="news-content">
              <div className="news-meta">
                <span className="date">
                  <FontAwesomeIcon icon="calendar" /> {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <Link to={`/news/${item.id}`} className="read-more">
                Read More <FontAwesomeIcon icon="arrow-right" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="admin-controls">
          <button className="add-news-btn">
            <FontAwesomeIcon icon="plus" /> Add News
          </button>
        </div>
      )}
    </div>
  );
};

export default News; 