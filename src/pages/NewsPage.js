import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/NewsPage.css';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const fetchNews = async () => {
    try {
      const response = await fetch(`http://localhost:5046/api/news?page=${currentPage}&pageSize=9`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNews(data.items);
      setTotalPages(Math.ceil(data.totalCount / 9));
    } catch (err) {
      setError('Failed to load news');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="news-loading">Loading news...</div>;
  if (error) return <div className="news-error">{error}</div>;

  return (
    <div className="news-page">
      <div className="news-page-header">
        <h1>Latest Football News</h1>
        <p>Stay updated with the latest news and updates from our club</p>
      </div>

      <div className="news-page-grid">
        {news.map((item) => (
          <div key={item.id} className="news-page-card">
            <div className="news-page-image">
              <img src={item.imageUrl} alt={item.title} />
              <div className="news-page-category">{item.category}</div>
            </div>
            <div className="news-page-content">
              <h3>{item.title}</h3>
              <p>{item.content.substring(0, 150)}...</p>
              <div className="news-page-meta">
                <span className="news-page-date">
                  {new Date(item.publishDate).toLocaleDateString()}
                </span>
                <Link to={`/news/${item.id}`} className="read-more">
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsPage; 