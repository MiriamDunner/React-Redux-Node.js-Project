import './HomePage.css';
import { useEffect, useState } from 'react';

function HomePage() {
  const images = [
    "/images/1.png", "/images/2.webp", "/images/3.webp", "/images/4.webp",
    "/images/5.webp", "/images/6.webp", "/images/7.webp", "/images/8.webp",
    "/images/9.webp", "/images/10.webp", "/images/11.webp", "/images/12.webp",
    "/images/13.webp"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-page">
      <div className="fade-slider">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={i === currentIndex ? 'active' : ''}
          />
        ))}
      </div>
        
    </div>
    
  );


}

export default HomePage;
