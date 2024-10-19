import React, { useState } from 'react';
import './ImageMagnifiers.scss'; // Import CSS for styling

const ImageZoom = ({ smallImageSrc, largeImageSrc }) => {
  const [isMagnified, setIsMagnified] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const ratioX = width / 2;
    const ratioY = height / 2;

    setPosition({
      x: (x - ratioX) * -1,
      y: (y - ratioY) * -1
    });
  };

  const toggleMagnifier = () => {
    setIsMagnified(!isMagnified);
  };

  return (
    <div className="image-magnifier z-50" onMouseMove={handleMouseMove} onMouseLeave={() => setPosition({ x: 0, y: 0 })}>
      <div className="small-image-container">
        <img src={smallImageSrc} alt="Small Image" onClick={toggleMagnifier} />
      </div>
      {isMagnified && (
        <div className="large-image-container">
          <img src={largeImageSrc} alt="Large Image" style={{ transform: `translate(${position.x}px, ${position.y}px)` }} />
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
