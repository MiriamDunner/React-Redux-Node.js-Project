import { useState, useRef } from 'react';

function ZoomableImage({ src, alt }) {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef();

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      style={{
  position: 'relative',
  width: '100%',
  height: 'auto',
  aspectRatio: '4 / 3', 
  maxWidth: '100%',
  cursor: 'zoom-in',
  overflow: 'hidden',
}}

      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
      
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
      {showZoom && (
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            backgroundImage: `url(${src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '200%', 
            backgroundPosition: `${position.x}% ${position.y}%`,
            pointerEvents: 'none', 
            border: '2px solid rgba(0,0,0,0.1)',
          }}
        />
      )}
    </div>
  );
}
export default ZoomableImage;