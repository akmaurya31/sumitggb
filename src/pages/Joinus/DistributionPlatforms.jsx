import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './DistributionPlatforms.css'; // Import your custom styles
import a1 from "assets/images/fmcg_logo/1.png";
import a2 from "assets/images/fmcg_logo/2.png";
import a3 from "assets/images/fmcg_logo/3.png";
import a4 from "assets/images/fmcg_logo/4.png";
import a5 from "assets/images/fmcg_logo/5.png";
import a6 from "assets/images/fmcg_logo/6.png";
import a7 from "assets/images/fmcg_logo/7.png";
import a8 from "assets/images/fmcg_logo/8.png";
import a9 from "assets/images/fmcg_logo/9.png";

const DistributionPlatforms = () => {
  const [height, setHeight] = useState('auto'); // Default height or desired initial value

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // Adding a custom class for the slick list
    className: 'custom-slick-list'
  };

  // const platforms = [
  //   { src: 'assets/images/fmcg_logo/1.png', alt: 'Platform 1' },
  //   { src: 'assets/images/fmcg_logo/2.png', alt: 'Platform 2' },
  //   { src: 'assets/images/fmcg_logo/3.png', alt: 'Platform 2' },
  //   { src: 'assets/images/fmcg_logo/4.png', alt: 'Platform 4' },
  //   { src: 'assets/images/fmcg_logo/5.png', alt: 'Platform 5' },
  //   { src: 'assets/images/fmcg_logo/6.png', alt: 'Platform 6' },
  //   { src: 'assets/images/fmcg_logo/7.png', alt: 'Platform 7' },
  //   { src: 'assets/images/fmcg_logo/8.png', alt: 'Platform 8' },
  // ];
 
  const platforms = [
    { src: a1, alt: 'Platform 1' },
    { src: a2, alt: 'Platform 2' },
    { src: a3, alt: 'Platform 2' },
    { src: a4, alt: 'Platform 4' },
    { src: a5, alt: 'Platform 5' },
    { src: a6, alt: 'Platform 6' },
    { src: a7, alt: 'Platform 7' },
    { src: a8, alt: 'Platform 8' },
    { src: a9, alt: 'Platform 9' },
  ];

  return (
    <section className="distribution-platforms mb-5 ">
      <div className="container dist">
        <h2 className="mb-5 headm">OUR BRANDS</h2>
        <Slider {...settings1} style={{ height: height }}>
          {platforms.map((platform, index) => (
            <div key={index} className="item">
              <div className="mb-4 text-center">
                <div className="distribution-logo">
                  <img src={platform.src} className="img-fluid" alt={platform.alt} loading="lazy" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default DistributionPlatforms;
