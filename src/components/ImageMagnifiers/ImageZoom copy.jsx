import React, { useEffect, useRef } from 'react';

const ImageZoom = ({image}) => {
  const imgRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const preview = previewRef.current;

    const calculateRatio = (value) => preview.offsetWidth / value;
    const x = calculateRatio(100);
    const y = calculateRatio(100);

    const setBackgroundProperties = (posX, posY) => {
      preview.style.backgroundImage = `url(${img.src})`;
      preview.style.backgroundSize = `${img.width * x}px ${img.height * y}px`;
      preview.style.backgroundPosition = `-${posX * x}px -${posY * y}px`;
    };

    const handleMouseMove = (e) => {
      const rect = img.getBoundingClientRect();
      const posX = e.clientX - rect.left;
      const posY = e.clientY - rect.top;
      setBackgroundProperties(posX, posY);
    };

    const handleMouseOut = () => {
      preview.style.backgroundImage = 'none';
    };

    img.addEventListener('mousemove', handleMouseMove);
    img.addEventListener('mouseout', handleMouseOut);

    return () => {
      img.removeEventListener('mousemove', handleMouseMove);
      img.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div>
      <img id="image" ref={imgRef} src={image} alt="Image" />
      <div className="zoom-preview" ref={previewRef}></div>
    </div>
  );
};

export default ImageZoom;
