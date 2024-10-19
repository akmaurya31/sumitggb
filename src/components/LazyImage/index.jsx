import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyImage = ({ src, alt, height, width }) => (
    <div>
        <LazyLoadImage
            alt={alt}
            height={height}
            src={src} // use normal <img> attributes as props
            width={width} />
        {/* <span>{image.caption}</span> */}
    </div>
);

export default LazyImage;