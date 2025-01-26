import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../CSS/News.css';

// Import news images
import news1 from '../images/Gallery/1-12-2024/Picture/468863381_563786129734244_1178466087813228077_n.jpg';
import news2 from '../images/Gallery/Tất Niên 2023/DSC_0001.jpg';
import news3 from '../images/Gallery/Tất Niên 2023/DSC_0002.jpg';
import news4 from '../images/Gallery/Tất Niên 2023/DSC_0003.jpg';
import news5 from '../images/Gallery/Tất Niên 2023/DSC_0006.jpg';
import news6 from '../images/Gallery/Tất Niên 2023/DSC_0007.jpg';
import news7 from '../images/Gallery/Tất Niên 2023/DSC_0008.jpg';
import news8 from '../images/Gallery/Tất Niên 2023/DSC_0009.jpg';
import news9 from '../images/Gallery/Tất Niên 2023/DSC_0010.jpg';
import news10 from '../images/Gallery/Tất Niên 2023/DSC_0012.jpg';
import news11 from '../images/Gallery/Tất Niên 2023/DSC_0014.jpg';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [visibleNews, setVisibleNews] = useState(6); // Initial number of visible news
  const newsPerLoad = 6; // Number of news to load each time

  const categories = [
    { id: 'all', name: 'All News' },
    { id: 'football', name: 'Football' },
    { id: 'club', name: 'Club' },
    { id: 'academy', name: 'Academy' },
    { id: 'foundation', name: 'Foundation' }
  ];

  const newsArticles = [
    {
      id: 1,
      category: 'football',
      title: 'FC ESCUELA Triumphs in Season Opener with 3-1 Victory',
      summary: 'Spectacular performance marks a strong start to the new season with goals from our star forwards',
      image: news1,
      date: '2024-02-15',
      views: '2.5K',
      featured: true,
      videoUrl: null
    },
    {
      id: 2,
      category: 'club',
      title: 'Year-End Celebration: FC ESCUELA Honors Outstanding Achievements',
      summary: 'Club celebrates remarkable milestones and recognizes exceptional performances at annual gala',
      image: news2,
      date: '2024-02-14',
      views: '1.8K',
      featured: true,
      videoUrl: 'https://youtube.com/watch?v=...'
    },
    {
      id: 3,
      category: 'academy',
      title: 'Youth Development Program Shows Promising Results',
      summary: 'Academy graduates demonstrate exceptional skills in recent tournament',
      image: news3,
      date: '2024-02-13',
      views: '1.2K',
      videoUrl: null
    },
    {
      id: 4,
      category: 'foundation',
      title: 'Community Impact: FC ESCUELA Foundation Launches New Initiative',
      summary: 'New program aims to provide football training to underprivileged youth',
      image: news4,
      date: '2024-02-12',
      views: '956',
      videoUrl: null
    },
    {
      id: 5,
      category: 'football',
      title: 'Team Strategy Session: Preparing for Upcoming Challenges',
      summary: 'Coach outlines tactical approach for crucial matches ahead',
      image: news5,
      date: '2024-02-11',
      views: '1.5K',
      videoUrl: null
    },
    {
      id: 6,
      category: 'club',
      title: 'FC ESCUELA Announces Partnership with Major Sponsor',
      summary: 'Strategic collaboration set to enhance club facilities and youth programs',
      image: news6,
      date: '2024-02-10',
      views: '2.1K',
      videoUrl: null
    },
    {
      id: 7,
      category: 'academy',
      title: 'Academy Teams Shine in Regional Tournament',
      summary: 'U-17 and U-19 squads secure impressive victories against top competitors',
      image: news7,
      date: '2024-02-09',
      views: '876',
      videoUrl: null
    },
    {
      id: 8,
      category: 'foundation',
      title: 'Charity Match Raises Funds for Local Community',
      summary: 'Stars and legends come together for a noble cause',
      image: news8,
      date: '2024-02-08',
      views: '1.3K',
      videoUrl: null
    },
    {
      id: 9,
      category: 'football',
      title: 'Training Ground Update: New Facilities Unveiled',
      summary: 'State-of-the-art equipment and facilities now available for player development',
      image: news9,
      date: '2024-02-07',
      views: '1.7K',
      videoUrl: 'https://youtube.com/watch?v=...'
    },
    {
      id: 10,
      category: 'club',
      title: 'FC ESCUELA Celebrates Lunar New Year with Special Event',
      summary: 'Players and staff participate in traditional celebrations and community activities',
      image: news10,
      date: '2024-02-06',
      views: '2.3K',
      videoUrl: null
    },
    {
      id: 11,
      category: 'academy',
      title: 'Next Generation: Rising Stars to Watch',
      summary: 'Spotlight on promising young talents making waves in the academy',
      image: news11,
      date: '2024-02-05',
      views: '1.1K',
      videoUrl: null
    },
    {
      id: 12,
      category: 'foundation',
      title: 'Football for All: Inclusive Sports Program Launch',
      summary: 'New initiative focuses on making football accessible to differently-abled youth',
      image: news6,
      date: '2024-02-04',
      views: '945',
      videoUrl: 'https://youtube.com/watch?v=...'
    }
  ];

  const filteredNews = selectedCategory === 'all'
    ? newsArticles
    : newsArticles.filter(article => article.category === selectedCategory);

  // Get featured news
  const featuredNews = newsArticles.filter(article => article.featured);
  
  // Get non-featured filtered news
  const nonFeaturedFilteredNews = filteredNews.filter(article => !article.featured);
  
  // Calculate if there are more news to load
  const hasMore = visibleNews < nonFeaturedFilteredNews.length;

  const handleLoadMore = () => {
    setVisibleNews(prev => Math.min(prev + newsPerLoad, nonFeaturedFilteredNews.length));
  };

  // Reset visible news when category changes
  React.useEffect(() => {
    setVisibleNews(6);
  }, [selectedCategory]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="news-page">
      {/* Hero Section */}
      <div className="news-hero">
        <div className="hero-content">
          <h1>Latest News</h1>
        </div>
      </div>

      {/* Categories Navigation */}
      <nav className="news-nav">
        {categories.map(category => (
          <button
            key={category.id}
            className={`nav-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </nav>

      {/* Featured News Slider */}
      <div className="featured-slider">
        {featuredNews.map(article => (
          <Link to={`/news/${article.id}`} key={article.id} className="featured-slide">
            <div className="featured-image">
              <img src={article.image} alt={article.title} />
              {article.videoUrl && (
                <div className="video-indicator">
                  <FontAwesomeIcon icon="play-circle" />
                </div>
              )}
            </div>
            <div className="featured-content">
              <div className="article-meta">
                <span className="category">{categories.find(cat => cat.id === article.category)?.name}</span>
                <span className="date">{formatDate(article.date)}</span>
                <span className="views"><FontAwesomeIcon icon="eye" /> {article.views}</span>
              </div>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* News Grid */}
      <div className="news-grid">
        {nonFeaturedFilteredNews
          .slice(0, visibleNews)
          .map(article => (
            <Link to={`/news/${article.id}`} key={article.id} className="news-card">
              <div className="card-image">
                <img src={article.image} alt={article.title} />
                {article.videoUrl && (
                  <div className="video-indicator">
                    <FontAwesomeIcon icon="play-circle" />
                  </div>
                )}
              </div>
              <div className="card-content">
                <div className="article-meta">
                  <span className="category">{categories.find(cat => cat.id === article.category)?.name}</span>
                  <span className="date">{formatDate(article.date)}</span>
                  <span className="views"><FontAwesomeIcon icon="eye" /> {article.views}</span>
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
              </div>
            </Link>
          ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="load-more">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More News <FontAwesomeIcon icon="chevron-down" />
          </button>
        </div>
      )}

      {/* No Results Message */}
      {nonFeaturedFilteredNews.length === 0 && (
        <div className="no-results">
          <p>No news articles found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default News; 