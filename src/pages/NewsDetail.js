import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';

const NewsDetail = () => {
  const { id } = useParams();
  
  // Use the id parameter to fetch news data
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(`http://localhost:5046/api/news/${id}`);
        const data = await response.json();
        // Handle the data
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    if (id) {
      fetchNewsData();
    }
  }, [id]);

  // In a real app, fetch the news data based on id
  const newsItem = {
    id: 1,
    category: "Match Report",
    title: "FC ESCUELA 3-1: Victory in League Match",
    date: "2024-01-20",
    image: teamPhoto,
    content: `In an exciting match at Dong My Stadium, FC ESCUELA secured a convincing 3-1 victory 
    in their latest league fixture. The team showed exceptional performance throughout the game, 
    demonstrating their tactical prowess and team spirit.

    The first half saw FC ESCUELA take an early lead through a brilliant strike in the 15th minute. 
    The team maintained their momentum, adding another goal before halftime. While the opposition 
    managed to pull one back early in the second half, FC ESCUELA sealed the victory with a third 
    goal in the closing minutes.

    This victory marks an important milestone in our season campaign, keeping us firmly in contention 
    for the league title. The team's dedication and hard work continue to pay off on the field.

    Match Highlights:
    • 15' - Opening goal
    • 42' - Second goal
    • 58' - Opposition goal
    • 85' - Final goal

    The team will now focus on preparing for our next fixture, looking to maintain this winning momentum.`
  };

  return (
    <div className="news-detail">
      <div className="news-detail-header">
        <img src={newsItem.image} alt={newsItem.title} />
      </div>
      <div className="news-detail-content">
        <span className="news-category">{newsItem.category}</span>
        <h1>{newsItem.title}</h1>
        <span className="news-date">
          <FontAwesomeIcon icon="calendar" /> {newsItem.date}
        </span>
        <div className="news-content">
          {newsItem.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 