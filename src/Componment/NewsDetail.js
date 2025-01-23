import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';
import '../CSS/NewsDetail.css';

const NewsDetail = ({ isAdmin }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNews, setEditedNews] = useState(null);

  // Simulated news data - replace with API call
  useEffect(() => {
    // Mock news data
    const mockNews = {
      id: parseInt(id),
      title: "FC ESCUELA Dominates Local Derby with 5-1 Victory",
      subtitle: "Spectacular performance from our forwards leads to commanding win",
      date: "2024-01-20",
      category: "Match Report",
      image: teamPhoto,
      content: `
        <p>In a thrilling display of attacking football, FC ESCUELA secured a commanding 5-1 victory against their local rivals. The match, played at a packed home stadium, showcased the team's tactical superiority and individual brilliance.</p>

        <h3>First Half Dominance</h3>
        <p>From the opening whistle, FC ESCUELA demonstrated their intent with high-pressing football and fluid attacking movements. The breakthrough came in the 15th minute when our striker converted a brilliant team move.</p>

        <h3>Key Highlights</h3>
        <ul>
          <li>Hat-trick from our star forward</li>
          <li>Two assists from midfield maestro</li>
          <li>Outstanding defensive performance</li>
          <li>Record attendance at the stadium</li>
        </ul>

        <h3>Manager's Comments</h3>
        <p>"This performance shows the progress we've made as a team. The players executed our game plan perfectly, and the support from our fans was incredible," said head coach after the match.</p>

        <h3>Looking Ahead</h3>
        <p>This victory puts FC ESCUELA in a strong position in the league table. The team will look to maintain this momentum in their upcoming fixtures.</p>
      `,
      author: "John Smith",
      relatedTags: ["Match Day", "Victory", "Local Derby", "Team Performance"],
      socialShares: {
        facebook: 245,
        twitter: 189,
        instagram: 312
      }
    };

    setNews(mockNews);
    setEditedNews(mockNews);
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Here you would make an API call to update the news
    setNews(editedNews);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedNews(news);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      // Here you would make an API call to delete the news
      navigate('/news');
    }
  };

  if (!news) return <div className="loading">Loading...</div>;

  return (
    <div className="news-detail-container">
      {/* Hero Section */}
      <div 
        className="news-detail-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${news.image})` }}
      >
        <div className="hero-content">
          <span className="category">{news.category}</span>
          {isEditing ? (
            <input
              type="text"
              value={editedNews.title}
              onChange={(e) => setEditedNews({...editedNews, title: e.target.value})}
              className="edit-title"
            />
          ) : (
            <h1>{news.title}</h1>
          )}
          <div className="meta-info">
            <span><FontAwesomeIcon icon="calendar" /> {new Date(news.date).toLocaleDateString()}</span>
            <span><FontAwesomeIcon icon="user" /> {news.author}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="news-detail-content">
        <div className="content-wrapper">
          {/* Admin Controls */}
          {isAdmin && (
            <div className="admin-controls">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="save-btn">
                    <FontAwesomeIcon icon="save" /> Save
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    <FontAwesomeIcon icon="times" /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleEdit} className="edit-btn">
                    <FontAwesomeIcon icon="edit" /> Edit
                  </button>
                  <button onClick={handleDelete} className="delete-btn">
                    <FontAwesomeIcon icon="trash" /> Delete
                  </button>
                </>
              )}
            </div>
          )}

          {/* Article Content */}
          {isEditing ? (
            <textarea
              value={editedNews.content}
              onChange={(e) => setEditedNews({...editedNews, content: e.target.value})}
              className="edit-content"
            />
          ) : (
            <div className="article-content" dangerouslySetInnerHTML={{ __html: news.content }} />
          )}

          {/* Tags */}
          <div className="tags-section">
            <h3>Related Tags</h3>
            <div className="tags">
              {news.relatedTags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Social Share */}
          <div className="social-share">
            <h3>Share This Article</h3>
            <div className="share-buttons">
              <button className="share-btn facebook">
                <FontAwesomeIcon icon={['fab', 'facebook']} />
                <span>{news.socialShares.facebook}</span>
              </button>
              <button className="share-btn twitter">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
                <span>{news.socialShares.twitter}</span>
              </button>
              <button className="share-btn instagram">
                <FontAwesomeIcon icon={['fab', 'instagram']} />
                <span>{news.socialShares.instagram}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 