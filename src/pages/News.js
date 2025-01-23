import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';

const News = () => {
  const allNews = [
    {
      id: 1,
      category: "Match Report",
      title: "FC ESCUELA 3-1: Victory in League Match",
      date: "2024-01-20",
      image: teamPhoto,
      content: "Full match report content here..."
    },
    {
      id: 2,
      category: "Team News",
      title: "Player of the Month Announced",
      date: "2024-01-18",
      image: teamPhoto,
      content: "Player of the month details..."
    },
    {
      id: 3,
      category: "Latest",
      title: "Upcoming Match: FC ESCUELA vs City FC",
      date: "2024-01-15",
      image: teamPhoto,
      content: "Match preview content..."
    },
    // Add more news items
  ];

  return (
    <div className="news-page">
      <div className="news-page-header">
        <h1>Latest News</h1>
      </div>
      <div className="news-page-grid">
        {allNews.map((news) => (
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
    </div>
  );
};

export default News; 