import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../CSS/Gallery.css';

// Import all images
import match1 from '../images/Gallery/1-12-2024/Picture/468863381_563786129734244_1178466087813228077_n.jpg';
import match2 from '../images/Gallery/1-12-2024/Picture/468863381_563786129734244_1178466087813228077_n.jpg';
import match3 from '../images/Gallery/Tất Niên 2023/DSC_0001.jpg';
import match4 from '../images/Gallery/Tất Niên 2023/DSC_0002.jpg';
import match5 from '../images/Gallery/Tất Niên 2023/DSC_0003.jpg';
import match6 from '../images/Gallery/Tất Niên 2023/DSC_0012.jpg';
import match7 from '../images/Gallery/Tất Niên 2023/DSC_0014.jpg';
import match8 from '../images/Gallery/Tất Niên 2023/DSC_0006.jpg';
import match9 from '../images/Gallery/Tất Niên 2023/DSC_0007.jpg';
import match10 from '../images/Gallery/Tất Niên 2023/DSC_0008.jpg';
import match11 from '../images/Gallery/Tất Niên 2023/DSC_0009.jpg';
import match12 from '../images/Gallery/Tất Niên 2023/DSC_0010.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'matches', name: 'Matches' },
    { id: 'training', name: 'Training' },
    { id: 'highlights', name: 'Highlights' }
  ];

  const galleryImages = [
    {
      id: 1,
      category: 'matches',
      src: match1,
      alt: 'Match Action',
      caption: 'Intense match moment at Dong My Stadium'
    },
    {
      id: 2,
      category: 'matches',
      src: match2,
      alt: 'Team Celebration',
      caption: 'Team celebration after scoring'
    },
    {
      id: 3,
      category: 'training',
      src: match3,
      alt: 'Training Session',
      caption: 'Players during training session'
    },
    {
      id: 4,
      category: 'highlights',
      src: match4,
      alt: 'Match Highlight',
      caption: 'Key moment from recent victory'
    },
    {
      id: 5,
      category: 'matches',
      src: match5,
      alt: 'Team Formation',
      caption: 'Team lineup before the match'
    },
    {
      id: 6,
      category: 'training',
      src: match6,
      alt: 'Practice Session',
      caption: 'Tactical training preparation'
    },
    {
      id: 7,
      category: 'highlights',
      src: match7,
      alt: 'Goal Celebration',
      caption: 'Celebrating a crucial goal'
    },
    {
      id: 8,
      category: 'matches',
      src: match8,
      alt: 'Match Action',
      caption: 'Defensive play in action'
    },
    {
      id: 9,
      category: 'training',
      src: match9,
      alt: 'Team Practice',
      caption: 'Team working on formations'
    },
    {
      id: 10,
      category: 'highlights',
      src: match10,
      alt: 'Victory Moment',
      caption: 'Championship winning moment'
    },
    {
      id: 11,
      category: 'matches',
      src: match11,
      alt: 'Team Spirit',
      caption: 'Team huddle before kickoff'
    },
    {
      id: 12,
      category: 'highlights',
      src: match12,
      alt: 'Match Highlight',
      caption: 'Spectacular save by our goalkeeper'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % galleryImages.length 
      : (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[newIndex]);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        case 'Escape':
          closeModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>FC ESCUELA Gallery</h1>
        <p>Capturing our moments of glory</p>
      </div>

      <div className="gallery-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map(image => (
          <div key={image.id} className="gallery-item" onClick={() => openModal(image)}>
            <img src={image.src} alt={image.alt} loading="lazy" />
            <div className="image-overlay">
              <span>{image.caption}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              <FontAwesomeIcon icon="times" />
            </button>
            <button className="nav-btn prev" onClick={() => navigateImage('prev')}>
              <FontAwesomeIcon icon="chevron-left" />
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <button className="nav-btn next" onClick={() => navigateImage('next')}>
              <FontAwesomeIcon icon="chevron-right" />
            </button>
            <div className="modal-caption">{selectedImage.caption}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 