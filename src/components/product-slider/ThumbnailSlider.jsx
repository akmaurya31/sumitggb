import { useState } from "react";
import ReactImageZoom from "react-image-zoom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ImageSlider.css";

const ThumbnailSlider = ({images}) => {
  // const images = [
  //   { id: 1, src: product2_1, zoomSrc: product2_1 },
  

  //   // Add more images with their corresponding large versions
  // ];
  const [activeImage, setActiveImage] = useState(images[0]);
  const [Myindex, setIndex] = useState(0);

  const handleImageChange = (image, index) => {
    setActiveImage(image);
    setIndex(index);
  };

  // console.log("activeImage",activeImage)
  const thumbnailSettings = {
    responsive: {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: images?.length > 1 ? 7 : 1,
      },
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: images?.length > 1 ? 7 : 1, },
      // tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
      // mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    },
    arrows: true, // Show arrows for navigation
    renderButtonGroupOutside: true, // Render the button group outside the carousel
  };

  return (
    <>
      <div className="image-slider flex flex-col">
        <div className="main-image">
          <ReactImageZoom
            width={400}
            height={400}
            zoomWidth={500}
            zoomHeight={500}
            scale={1.8}
            img={activeImage.src}
          />
        </div>
      </div>
      {/* <div className="thumbnail-images flex flex-row gap-1">
        {images.map((image, index) => (
          <div key={image.id}>
            <img
              src={image.src}
              alt={`Image ${image.id}`}
              onClick={() => handleImageChange(image, index)}
              style={{
                border: index === Myindex ? "1px solid #0c831f" : "unset",
                width: 73,
                borderRadius: 10,
              }}
            />
          </div>
        ))}
      </div> */}
      <div style={{ maxWidth: 550, margin: "0px auto" }}>
        <Carousel {...thumbnailSettings}>
          {images.length>1 && images.map((image, index) => (
            <div key={image.id}>
              <img
                src={image.src}
                alt={`Image ${image.id}`}
                onClick={() => handleImageChange(image, index)}
                style={{
                  border: index === Myindex ? "1px solid #0c831f" : "unset",
                  width: 80,
                  borderRadius: 10,
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ThumbnailSlider;
