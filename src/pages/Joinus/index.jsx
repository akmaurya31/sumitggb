import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
 
import LandingPageHeader from "components/LandingPageHeader";
import React, { useState,useEffect } from "react";
import icon5x from "../../styles/imgs/page/icon5.png";
import icon5 from "../../styles/imgs/page/step_1.webp";
import icon5_2 from "../../styles/imgs/page/step_2.webp";
import icon5_3 from "../../styles/imgs/page/step_3.webp";
import imagegallery from "../../styles/imgs/page/image-gallery.webp";
import interview from "../../styles/imgs/page/interview.webp";
import lounge from "../../styles/imgs/page/lounge.webp";
import books from "../../styles/imgs/page/books.webp";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faAngleRight, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';



import icon6 from "../../styles/imgs/page/icon6.png";
import sl from "../../styles/imgs/page/sl.png";
import sl2 from "../../styles/imgs/page/sl2.png";
import sl3 from "../../styles/imgs/page/sl3.png";
import sl4 from "../../styles/imgs/page/sl4.png";
import bck5 from "../../styles/imgs/page/bck5.jpg";
import gif from "../../styles/imgs/page/gif.gif";
import gif2 from "../../styles/imgs/page/gif2.gif";
import gif3 from "../../styles/imgs/page/gif3.gif";
import gif4 from "../../styles/imgs/page/gif4.gif";
import gif6 from "../../styles/imgs/page/gif6.gif";
import gif5 from "../../styles/imgs/page/gif5.gif";
import cr from "../../styles/imgs/page/cr.jpg";
import ads1 from "../../styles/imgs/page/sandeep.PNG";
 

import "./PricingTable.css";
import "./for_writers_style.css";
import './StoreType.css'; 
import './BureauBanner.css';
import './jform.css';
// import './inline.css';
import LandingPageFooter from "components/LandingPageFooter";
import ModalComponent from "./ModalComponent";
import DistributionPlatforms from "./DistributionPlatforms";

import { height } from "@mui/system";
 
import { Container, Tabs, Tab, Nav, Row, Col, Form,Card, Button,Modal  } from 'react-bootstrap';
import SignupForm from "./SignupForm";
 
 


const Landwishbasket = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
  const [key, setKey] = useState('paperback');
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = window.innerHeight * 0.8; // Adjust as needed
      if (scrollY > threshold) {
        setFadeIn(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);
  const backgroundStyle = {
    backgroundImage: isSmallMobile ? `url(${sl4})` : isMobile ? `url(${cr})` : `url(${sl2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: isSmallMobile ? "260px" : isMobile? "230px" : "500px",
  };
  const styles = {
    fadeInText: {
      opacity: fadeIn ? 1 : 0,
      transition: "opacity 2s ease-in-out",
    },
    container: {
      fontFamily: "Arial, sans-serif",
      color: "#333",
      lineHeight: "1.6",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },
    videoBackground: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      // backgroundImage: `url(${cr})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      // objectFit: "cover",
      zIndex: "-1",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      // backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "0",
    },
    header: {
      textAlign: "center",
      color: "#fff",
      padding: isMobile ? "10px 0" : "20px 0",
    },
    title: {
      fontSize: isSmallMobile ? "1.5em" : isMobile ? "2em" : "2.5em",
      margin: "0",
    },
    timeline: {
      position: "relative",
      margin: "40px 0",
      padding: "0 20px",
    },
    timelineItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "40px",
      position: "relative",
    },
    timelineContent: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row-reverse",
      alignItems: "center",
      padding: "20px",
      borderRadius: "80px 50px",
      boxShadow: 'rgba(0, 0, 0, 0.1) -20px 19px 20px 20px',
      zIndex: "1",
      textAlign: isMobile ? "center" : "left",
    },
    timelineContent2: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      backgroundImage: `url(${bck5})`,
      padding: "20px",
      borderRadius: "50px 150px",
      boxShadow: 'rgba(0, 0, 0, 0.1) 19px 20px 20px 20px',
      zIndex: "1",
      textAlign: isMobile ? "center" : "left",
    },
    timelineHeaderText: {
      textAlign: "end",
    },
    timelineImage: {
      width: isMobile? "60%" :"25%",
      height: "15%",
      marginBottom: isMobile ? "10px" : "0",
      marginRight: isMobile ? "0" : "20px",
    },
    timelineText: {
      flex: 1,
    },
    timelineLine: {
      position: "absolute",
      left: "calc(50% - 1px)",
      top: "0",
      width: "2px",
      height: "100%",
      backgroundColor: "#ff7e5f",
      zIndex: "0",
    },
    section: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "center",
      margin: "40px 0",
      padding: isMobile ? "10px" : "20px",
      borderRadius: "10px",
      // boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
      flexWrap: "wrap",
    },
    sectionTitle: {
      fontSize: isSmallMobile ? "1.2em" : isMobile ? "1.5em" : "3em",
      color: "black",
      marginBottom: "20px",
      width: "100%",
      textAlign: "center",
      fontWeight: "700",
    },
    text: {
      flex: 1,
      marginBottom: "20px",
      padding: isMobile ? "10px" : "20px",
      borderRadius: "10px",
    },
    image: {
      flex: 1,
      width: "100%",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    buttonContainer: {
      textAlign: "center",
      margin: "40px 0",
    },
    button: {
      backgroundColor: "#ff7e5f",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: isSmallMobile ? "8px 16px" : isMobile ? "10px 20px" : "15px 30px",
      fontSize: isSmallMobile ? "0.9em" : isMobile ? "1em" : "1.1em",
      cursor: "pointer",
      transition: "background 0.3s, transform 0.3s",
    },
    buttonHover: {
      backgroundColor: "#feb47b",
    },
    sectionLeft: {
      flexDirection: "row-reverse",
    },
    carousel: {
      width: "90%",
      margin: "0 auto",
      padding: "20px",
      background: "#ffffff",
      borderRadius: "10px",
      // boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      position: "relative",
      overflow: "hidden",
    },
    carouselImage: {
      width: "100%",
      height: "100%",
      borderRadius: "10px",
      objectFit: "cover",
    },
    carouselDots: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
    carouselDot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: "#ddd",
      margin: "0 5px",
      cursor: "pointer",
    },
    carouselDotActive: {
      backgroundColor: "#ff7e5f",
    },
    iconSection: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px",
      justifyItems: "center",
      alignItems: "center",
      padding: "20px 0",
      textAlign: "center",
    },
    icon: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    iconImage: {
      width: isSmallMobile ? "100px" : "160px",
      height: isSmallMobile ? "100px" : "160px",
      marginBottom: "10px",
    },
    iconText: {
      fontSize: isSmallMobile ? "0.8em" : "1em",
    },
    headingStyle: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 900,
      fontSize: '2.5rem',
      marginBottom: '2rem',
      color: '#333',
    },    
  };


  const styles2 = {
    section: {
      padding: '20px 0',
      color: '#fff',
    },
    container: {
      maxWidth: '1200px',
    },
    blackBg: {
      background: '#f96426',
      borderRadius: '15px',
      padding: '32px 30px',
    },
    heading: {
      fontSize: '42px',
      lineHeight: '55px',
      color: '#fff',
    },
    contentParagraph: {
      color: '#fff',
      margin: '20px 0',
      marginRight: '0',
      lineHeight: '32px',
      fontSize: '18px',
    },
    imgBox: {
      background: '#001C5F',
      boxShadow: '0px 4px 4px rgba(0, 7, 26, 0.1)',
      padding: '0',
      textAlign: 'center',
      borderRadius: '10px',
      marginBottom: '30px',
    },
    btnPrimary: {
      // Style for .btn.btn-primary
      backgroundColor: '#007bff', // Example color
      color: '#fff',
      padding: '10px 20px',
      textDecoration: 'none',
      borderRadius: '5px',
      display: 'inline-block',
    },
    btnPrimaryMobile: {
      // Style for .btn.btn-primary.mobile
      backgroundColor: '#007bff', // Example color
      color: '#fff',
      padding: '10px 20px',
      textDecoration: 'none',
      borderRadius: '5px',
      display: 'block',
      margin: '0 auto',
    },
  };

  const styles3 = {
    visionWr: {
      padding: '60px 0px',
      margin: '0px',
      background: '#F5F9FF',
    },
    container: {
      width: '100%',
      margin: '0 auto',
      padding: '0 15px',
    },
    row: {
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '-15px',
      marginLeft: '-15px',
    },
    col: {
      paddingRight: '15px',
      paddingLeft: '15px',
      marginBottom: '20px',
    },
    content: {
      padding: '15px',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    h2: {
      fontSize: '42px',
      color: '#032C8D',
    },
    p: {
      fontSize: '16px',
      color: '#333',
    },
    visionBox: {
      padding: '15px',
      textAlign: 'center',
      background: '#032C8D',
      boxShadow: '0px 4px 4px rgba(0, 7, 26, 0.1)',
      backdropFilter: 'blur(100px)',
      borderRadius: '10px',
      minHeight: '220px',
      marginBottom: '20px',
      color: '#fff',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
  };


  const styles4 = {
    singlelineform: {
      backgroundColor: '#000', // black-bg equivalent
      padding: '20px',
      borderRadius: '10px',
      color: '#fff',
    },
    title: {
      color: '#fff',
      fontSize: '56px',
      fontWeight: '800',
      margin: '0px',
      fontFamily: 'Roboto, sans-serif',
      lineHeight: 'normal',
    },
    subTitle: {
      color: '#fff',
      fontFamily: 'Heebo',
      fontSize: '16px',
      fontWeight: '400',
    },
    hometextbox: {
      marginRight: '20px',
      minWidth: '96%',
      fontSize: '13px',
      verticalAlign: 'middle',
      borderRadius: '5px',
      boxShadow: 'none',
      border: '1px solid #fff',
      padding: '8px 28px 8px 15px',
      height: '51px',
    },
    formGroup: {
      marginBottom: '1rem'
    }
  };
  const handleClick = () => {
    window.open('#', '_blank');
  };
    useEffect(() => {
      const handleScroll = () => {
        const currentPos = window.scrollY;
        const wellBottom = document.querySelector('.wellbottom');
        if (wellBottom) {
          const navWrap = wellBottom.offsetTop - 105;
          const mobileLinks = document.querySelectorAll('.singlelineform.mobile a');
          if (navWrap <= currentPos) {
            mobileLinks.forEach(link => (link.style.display = 'block'));
          } else {
            mobileLinks.forEach(link => (link.style.display = 'none'));
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
 
  const VisionBox = ({ src, alt, text }) => (
    <div style={styles3.visionBox}>
      <img
        src={src}
        alt={alt}
        onError={(e) => { e.target.onerror = null; e.target.src = src.replace('.webp', '.png'); }}
        style={styles3.img}
      />
      <h4>{text}</h4>
    </div>
  );

  return (
    <>
    <div><LandingPageHeader/></div>
 
     <section className="banner for_writers_banner     mt-[104px]" >
     <img
        src={require('../../assets/images/header_banner_new.webp')}
        className="web mt-[2.5rem] sm:mt-[8.5rem]"
        alt="Banner"
      />
      {/* <img
        src={require('../../assets/images/header_banner_new_mobile.webp')}
        className="mobile"
        alt="Banner"
      /> */}
      <div className="container new_design   mt-[1.0rem] sm:mt-16  ">
        <div className="banner_content -mt-[10px] sm:mt-[101px]"> 
          <h1 className="MT35">Grow with GharGharBazaar </h1>
           
      <SignupForm/>


          <ul className="d-flex">
            <li className="flex-fill"><i className="fas fa-check-circle"></i> Store Owner</li>
            <li className="flex-fill"><i className="fas fa-check-circle"></i> Hassle-Free</li>
            <li className="flex-fill"><i className="fas fa-check-circle"></i> 100% Rights</li>
            <li className="flex-fill"><i className="fas fa-check-circle"></i> Instant Bonus</li>
          </ul>


         

        </div>
      </div>
    </section>





 
        <section className="py-6 ">
            <div className="container">
                <h1>Co-Partner क्या है ?</h1>
                <div className="row align-items-center py-5">
                    
          <div className="col-md-12 mt-smc-2 ">
              <div className="klf-caption mLR20">
                <h2>Co-Partner को "SILENT Partner" भी कहा जाता है </h2>
                <p className="mb-4">
                DRV घर घर बाजार कंपनी द्वारा पूरे भारत में SUPER MEGA MART खोला जा रहा है और स्टोर खोलने के लिए कंपनी Co-Partner बना रही है | Co-Partner बनने के लिए 1 लाख से लेकर 1 करोड़ रूपये स्टोर में निवेश कर सकते है | Co-Partner को कुछ अधिकार दिए गये हैं जैसे डेली सेल देखना और अपनी डेली इनकम देखना लेकिन, Co-Partner स्टोर के ऑपरेशन कोई हस्तक्षेप नहीं कर सकता है Co-Partner बनकर 100% सुरक्षित तरीके से बिज़नेस कर सकते है, Co-Partner को 100% सुरक्षित लाभ होगा प्लान में इन्वेस्टमेंट करने के लिए तथा Co-Partner बनने के लिए अभी संपर्क करें
                </p>
              </div>
            <div>
              <div className="row mLR20">
                <div className="col-md-3 pb-3">
                  <a
                    href="#"
                    className="ba"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default link behavior
                      e.stopPropagation(); // Stops the event from propagating
                    }}
                  >
                    <span>
                      <div className="klf-link d-flex klf-icon_box align-items-stretch">
                        <img
                          src={books}
                          className="img-fluid"
                          loading="lazy"
                          alt="Book Stall"  
                        />
                        <p className="align-self-center">100% सुरक्षित </p>
                      </div>
                    </span>
                  </a>
                </div>
                <div className="col-md-3 pb-3">
                  <a
                    href="#"
                    className="ba"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default link behavior
                      e.stopPropagation(); // Stops the event from propagating
                    }}
                  >
                    <span>
                      <div className="klf-link d-flex">
                        <img
                          src={imagegallery}
                          className="img-fluid"
                          loading="lazy"
                          alt="GGB Lounge"
                        />
                        <p>पूरे भारत में</p>
                      </div>
                    </span>
                  </a>
                </div>

                <div className="col-md-3 pb-3">
                  <a
                    href="#"
                    className="ba"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default link behavior
                      e.stopPropagation(); // Stops the event from propagating
                    }}
                  >
                    <span>
                      <div className="klf-link d-flex">
                        <img
                          src={interview}
                          className="img-fluid"
                          loading="lazy"
                          alt="GGB Lounge"
                        />
                        <p>डेली इनकम </p>
                      </div>
                    </span>
                  </a>
                </div>

                <div className="col-md-3 pb-3">
                  <a
                    href="#"
                    className="ba"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default link behavior
                      e.stopPropagation(); // Stops the event from propagating
                    }}
                  >
                    <span>
                      <div className="klf-link d-flex">
                        <img
                          src={lounge}
                          className="img-fluid"
                          loading="lazy"
                          alt="GGB Lounge"
                        />
                        <p>1 लाख to 1 करोड़ </p>
                      </div>
                    </span>
                  </a>
                </div>



 
              </div>
            </div>
          </div>

{/* 
  <div className="col-md-2">
  <div className="h5" style={{ color: '#66e74f' }}>अन्य व्यवसाय</div>
  <div className="row bookfooter">
 
      <ul>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> कैपिटल : हाँ</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> बिजनेस चुनाव  : हाँ</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> स्थान चुनाव  : हाँ</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> समय  : हाँ </a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> अनुभव  : हाँ</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> रिस्क  : हाँ </a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> अनुभव : हाँ</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> सेल/परचेज : हाँ</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> मालिक : हाँ</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> लाभ  : हाँ</a></li>
      </ul>
 
   
  </div>
</div>


<div className="col-md-2">
  <div className="h5" style={{ color: '#66e74f' }}>घर घर बाजार</div>
  <div className="row">
 
      <ul> 
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> कैपिटल  : ना के बराबर</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> बिजनेस चुनाव  : नहीं</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> स्थान चुनाव  : नहीं</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> समय  : नहीं</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> अनुभव : नहीं</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> रिस्क  : नहीं</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> अनुभव  : नहीं</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> सेल/परचेज : नहीं</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> मालिक  : हाँ</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faAngleRight} /> लाभ  :  हाँ</a></li>
      </ul>
  
   
  </div>
</div> */}


                
                </div>
            </div>
        </section>
 
 
        <div className="bg-[#225d99]">
          <section className="container footer-section    " style={{ backgroundColor: '#225d99', color: 'white',   }}>
              <footer>
                  <div className=" flex sm:p-4 sm:flex-col md:flex-row gap-2 pt-4 mx-auto  ">
                          <div className="mb-3 sm:w-[100%] w-[25%]">
                              <p style={{ textAlign: 'justify', fontFamily: 'Raleway', color: '#fff' }}>
                              बिजनेस अवसर और चैलेंज :
                              हम और आप सब EXTRA INCOME  करना चाहते हैं | उसके लिए अक्सर हम बिज़नेस करना चाहते हैं | लेकिन बिज़नेस में INCOME तो बहुत है लेकिन उसके अपने चैलेंजेस भी बहुत हैं लेकिन DRV घर घर बाजार से जुड़ कर 100% प्रतिशत INCOME कर सकते हैं और चैलेंजेस 100% प्रतिशत खत्म |
                                आइये जानते है कैसे ?
                              </p>
                              <div className="social pb-sm-4" style={{ display: 'flex', gap: '10px' }}>
                                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                                      <FontAwesomeIcon icon={faFacebookF} />
                                  </a>
                                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                                      <FontAwesomeIcon icon={faTwitter} />
                                  </a>
                                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                                      <FontAwesomeIcon icon={faInstagram} />
                                  </a>
                                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                                      <FontAwesomeIcon icon={faLinkedinIn} />
                                  </a>
                                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                                      <FontAwesomeIcon icon={faYoutube} />
                                  </a>
                                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                                      <FontAwesomeIcon icon={faEnvelope} />
                                  </a>
                              </div>
                          </div>
                          <div className="mb-3  sm:w-[100%] md:w-[35%]">
                            <div className="grid grid-cols-2">
                                <ul className=" " style={{ color: '#fff' }}>
                                  <li><div className="h5 mb-2" style={{ color: '#66e74f' }}>अन्य व्यवसाय</div> </li>
                                  <li className="mt-4"><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> कैपिटल : हाँ</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> बिजनेस चुनाव  : हाँ</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> स्थान चुनाव  : हाँ</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> समय  : हाँ </a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> अनुभव  : हाँ</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> रिस्क  : हाँ </a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> अनुभव : हाँ</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> सेल/परचेज : हाँ</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> मालिक : हाँ</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> लाभ  : हाँ</a></li>
                                </ul>
                                <ul> 
                                  <li><div className="h5  mb-2" style={{ color: '#66e74f' }}>घर घर बाजार</div> </li>
                                  <li  className="mt-4"><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> कैपिटल  : ना के बराबर</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> बिजनेस चुनाव  : नहीं</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> स्थान चुनाव  : नहीं</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> समय  : नहीं</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> अनुभव : नहीं</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> रिस्क  : नहीं</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> अनुभव  : नहीं</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> सेल/परचेज : नहीं</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> मालिक  : हाँ</a></li>
                                  <li><a href="#" style={{ color: '#fff' }}><FontAwesomeIcon icon={faAngleRight} /> लाभ  :  हाँ</a></li>
                                </ul>
                            </div>     
                          </div>     
                          <SignupForm/>
                  </div>
              </footer>
          </section>
        </div>
 

 
    <section className="py-5">
      <div className="container px-lg-0">
        <div className="row align-items-stretch">
         
         
          <div className="col-md-9 mt-smc-2">
            <div className="klf-caption mLR20">
              <h3>Our Misison</h3>
              <p>संदीप श्रीवास्तव जी को साकेत यूनिवर्सिटी से बी.कॉम. की डी. ग्री. प्राप्त है। रियल स्टेल और रिटेल सेक्टर में 15 वर्षों से अधिक का अनुभव प्राप्त है। विगत 15 वर्षों में कई प्रोजेक्ट सफलतापूर्वक किए हैं।</p>
              <p className="mb-4">

              संदेश
              प्रिय सहकर्ताओं,
              डी.आर.वी घर घर बाजार मल्टी ब्रांड रिटेल कम्पनियों के क्षेत्र में काम करने वाली भारत की अग्रणी कम्पनियों में से एक है जिसका पहला उद्देश्य ग्राहकों को सबसे अच्छी क्वालिटी सबसे सस्ते दामों में सामान उपलब्ध कराना है। यह दुनिया की एकमात्र ऐसी कम्पनी है जो कि ग्राहकों को अच्छी दरों में सामान तो उपलब्ध कराती है साथ ही उनके सपनों को पूरा करने में मदद भी करती है 

              हमारी कम्पनी समाज में लोगों की रोटी, कपड़ा और मकान जैसी बुनियादी जरूरतों को पूरा करना अपना कर्त्तव्य समझती है। उसके लिए निरंतर प्रयासरत है घर घर बाजार उसी श्रृखंला में एक मजबूत प्रयास है घर घर बाजार से जुड़कर आप अपनी बुनियादी जरूरतों को पूरा कर सकते हैं वो भी बिना एक भी पैसा लगाए।

              कम्पनी के इस उद्देश्य को पूरा करने के लिए जो भी लोग जुड़ते हैं कम्पनी उनको भी अच्छा लाभ प्रदान करने के लिए प्रायसरत रहती है कम्पनी का मूलभूत उद्देश्य यही है कि लोगों को जोड़कर एक मजबूत इन्फ्रास्ट्रक्चर का निर्माण करना तथा उससे अर्जित होने वाले अधिकतम से अधिकतम लाभ को ग्राहकों और लोगों तक पहुँचाना है।

              हम आप सभी का साथ और समर्थन महत्वपूर्ण मानते हैं। आपके साथ हमेशा एक सफल और प्रगतिशील साथी के रूप में काम करने का अवसर प्राप्त करके हमें गर्व की अनुभूति होती है।

              धन्यवाद!

              “ऊपर बताए गए सभी उद्देश्यों को पूरा करने के लिए आपका सहयोग अत्यंत आवश्यक है।”
                
              </p>
            </div>
            <div>
              <div className="row mLR20">
                <div className="col-md-3 pb-3">
                  <a
                    href="#"
                    className="ba"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default link behavior
                      e.stopPropagation(); // Stops the event from propagating
                    }}
                  >
                    <span>
                      <div className="klf-link d-flex klf-icon_box align-items-stretch ">
                        <img
                          src={books}
                          className="img-fluid"
                          loading="lazy"
                          alt="Book Stall"
                        />
                        <p className="align-self-center">15 वर्षों से अधिक </p>
                      </div>
                    </span>
                  </a>
                </div>
                <div className="col-md-3 pb-3">
                  <a
                    href="#"
                    className="ba"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default link behavior
                      e.stopPropagation(); // Stops the event from propagating
                    }}
                  >
                    <span>
                      <div className="klf-link d-flex">
                        <img
                          src={lounge}
                          className="img-fluid"
                          loading="lazy"
                          alt="GGB Lounge"
                        />
                        <p>मल्टी ब्रांड रिटेल </p>
                      </div>
                    </span>
                  </a>
                </div>
                <div className="col-md-3">
                  <a
                    href="#"
                    className="ba"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default link behavior
                      e.stopPropagation(); // Stops the event from propagating
                    }}
                  >
                    <span>
                      <div className="klf-link d-flex">
                        <img
                          src={interview}
                          className="img-fluid"
                          loading="lazy"
                          alt="KLF Sessions"
                        />
                        <p>मजबूत इन्फ्रास्ट्रक्चर</p>
                      </div>
                    </span>
                  </a>
                </div>
                <div className="col-md-3 mt-2">
                  <a
                    href="#"
                    className="ba"
                    onClick={(e) => {
                      e.preventDefault(); // Prevents the default link behavior
                      e.stopPropagation(); // Stops the event from propagating
                    }}
                  >
                    <span>
                      <div className="klf-link d-flex">
                        <img
                          src={imagegallery}
                          className="img-fluid"
                          loading="lazy"
                          alt="Gallery"
                        />
                        <p>ग्राहकों  को लाभ </p>
                      </div>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-2 align-self-center mt-2">
            <img
              src={ads1}
              alt=""
              className="img-fluid klf-img"
              loading="lazy"
            />

<div className="waviy">
            <span className="color-yellow" style={{ '--i': 1 }}>G</span>
            <span className="color-yellow" style={{ '--i': 2 }}>H</span>
            <span className="color-yellow" style={{ '--i': 3 }}>A</span>
            <span className="color-yellow" style={{ '--i': 4 }}>R</span>

            <span className="color-yellow" style={{ '--i': 5 }}>R</span>

            <span className="color-yellow" style={{ '--i': 6 }}>G</span>
            <span className="color-yellow" style={{ '--i': 7 }}>H</span>
            <span className="color-yellow" style={{ '--i': 8 }}>A</span>
            <span className="color-yellow" style={{ '--i': 9 }}>R</span>


            <span style={{ '--i': 10 }}></span>
            <span style={{ '--i': 11 }}>B</span>
            <span style={{ '--i': 12 }}>A</span>
            <span style={{ '--i': 13 }}>Z</span>
            <span style={{ '--i': 14 }}>A</span>
            <span style={{ '--i': 15 }}>A</span>
            <span style={{ '--i': 16 }}>A</span>
            <span style={{ '--i': 17 }}>R</span>
         
        </div>
          </div>
        </div>
      </div>
    </section>



 
        <section className="bg-light-blue py-4">
            <div className="container">
                <h2 className="headm">INVESTMENT BENEFITS</h2>
                  
                <div className="row py-5 mLR20">
                    <div className="col-md-12">
                        <div className="main-timeline">
                            <div className="timeline">
                                <a href="#" className="timeline-content tc-1">
                                    <div className="timeline-icon"><i className="fa fa-indian-rupee-sign img"></i></div>
                                    <h3 className="title">Nivesh/Investment</h3>
                                    <p className="description">
                                    1 Lakh se 1 Crore (1 लाख से 1 करोड़)  
                                    </p>
                                </a>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content tc-2">
                                    <div className="timeline-icon"><i className="fa fa-file-signature img"></i></div>
                                    <h3 className="title">Aapki Income</h3>
                                    <p className="description">
                                    Store ki daily sale ka 2% se 10% share (स्टोर की दैनिक बिक्री का 2% से 10% हिस्सा)<span className="text-red-c">Read
                                            more</span>
                                    </p>
                                </a>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content tc-3">
                                    <div className="timeline-icon"><i className="fa fa-check-double img"></i></div>
                                    <h3 className="title">Tracking of Income</h3>
                                    <p className="description">
                                    GGB app mei daily tracking of earnings ( GGB ऐप में दैनिक आय का ट्रैकिंग )<br /><span className="text-red-c">Read
                                            more</span>
                                    </p>
                                </a>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content tc-4">
                                    <div className="timeline-icon"><i className="fa-solid fa-stapler img"></i></div>
                                    <h3 className="title">Safety Net</h3>
                                    <p className="description">
                                    Investment ke barabar value ka plot allotment (निवेश के बराबर मूल्य का प्लॉट आवंटन ) 
                                    </p>
                                </a>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content tc-1">
                                    <div className="timeline-icon"><i className="fa-solid fa-business-time img"></i></div>
                                    <h3 className="title">Co-Partner Branding</h3>
                                    <p className="description">
                                    GGB Store aur GGB website pe branding ( GGB स्टोर और GGB वेबसाइट पर ब्रांडिंग) <span className="text-red-c">Read
                                            more</span>
                                    </p>
                                </a>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content tc-2">
                                    <div className="timeline-icon"><i className="fas fa-tasks img"></i></div>
                                    <h3 className="title">Waiting period</h3>
                                    <p className="description">
                                        Max 6 months waiting period till the store opens (स्टोर खुलने तक अधिकतम 6 महीने की प्रतीक्षा अवधि)<span className="text-red-c">Read more</span>
                                    </p>
                                </a>
                            </div>
                            <div className="timeline">
                                <a href="#" className="timeline-content tc-3">
                                    <div className="timeline-icon"><i className="fa-solid fa-landmark img"></i></div>
                                    <h3 className="title">Waiting period Income</h3>
                                    <p className="description">
                                    In GGB, 2% of invested amount monthly after 30 days 
                                    (30 दिनों के बाद निवेशित राशि का 2% मासिक)
                                    <span className="text-red-c">Read
                                            more</span>
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Co-Partner Investment Plan
      </h1>

      <p className="mb-4 text-gray-700">
        Co-Partner बनने के लिए आपको{" "}
        <span className="bg-yellow-200 font-semibold">1 लाख से 1 करोड़</span> तक
        निवेश करना होगा। कंपनी आपके निवेश से स्टोर खोलेगी, और{" "}
        <span className="bg-yellow-200 font-semibold">आप Co-Partner</span>{" "}
        होंगे। प्रत्येक Co-Partner को ऐप मिलेगा जिससे वे स्टोर की दैनिक बिक्री
        देख सकते हैं।
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mb-3">प्रमुख बिंदु:</h2>

      <ol className="list-decimal list-inside space-y-4 text-gray-700">
        <li>
          <span className="font-semibold">Co-Partner की Branding और Details:</span>
          <ul className="ml-5 mt-2 list-disc list-inside">
            <li>
              प्रत्येक Co-Partner के नाम से स्टोर की{" "}
              <span className="bg-blue-100 font-semibold">ब्रांडिंग</span> की
              जाएगी।
            </li>
            <li>जानकारी वेबसाइट पर अपडेट की जाएगी।</li>
          </ul>
        </li>

        <li>
          <span className="font-semibold">मासिक इनकम:</span>
          <p className="ml-5 mt-2">
            Co-Partner बनने के{" "}
            <span className="bg-yellow-200 font-semibold">30 दिन बाद</span> हर
            महीने निवेश का{" "}
            <span className="bg-yellow-200 font-semibold">2%</span> दिया जाएगा,
            जो{" "}
            <span className="bg-yellow-200 font-semibold">6 महीनों</span> तक
            मिलेगा।
          </p>
        </li>

        <li>
          <span className="font-semibold">लाभ का हिस्सा:</span>
          <p className="ml-5 mt-2">
            स्टोर ओपन होने के बाद, स्टोर की बिक्री का{" "}
            <span className="bg-yellow-200 font-semibold">2% से 10%</span> तक
            लाभ मिलेगा।
          </p>
        </li>

        <li>
          <span className="font-semibold">Security Plot और Agreement:</span>
          <ul className="ml-5 mt-2 list-disc list-inside">
            <li>
              कंपनी एक{" "}
              <span className="bg-blue-100 font-semibold">प्लॉट की रजिस्ट्री</span>{" "}
              करेगी जो निवेश के लिए सुरक्षा के तौर पर होगा।
            </li>
            <li>
              अगर लाभ नहीं मिला, तो प्लॉट Co-Partner का हो जाएगा, या कंपनी शेष
              लाभ का भुगतान करेगी।
            </li>
            <li>
              प्लॉट लखनऊ, मोहनलालगंज में है, जिसका{" "}
              <span className="bg-yellow-200 font-semibold">
                रेट 1200 रुपये प्रति वर्गफुट
              </span>{" "}
              है और साइज{" "}
              <span className="bg-yellow-200 font-semibold">1000 वर्गफुट</span>{" "}
              है।
            </li>
          </ul>
        </li>
      </ol>

      <p className="mt-6 text-gray-800">
        इस योजना के तहत आपकी राशि सुरक्षित रहेगी और आपको नियमित आय और लाभ का
        हिस्सा मिलेगा।
      </p>
    </div>

     
      <div className="mb-40" style={styles.carousel}>
          <Slider {...settings}>
            <div>
              <img src={sl3} alt="Slide 1" style={styles.carouselImage} />
            </div>
            <div>
              <img src={sl} alt="Slide 2" style={styles.carouselImage} />
            </div>
            {/* <div>
              <img src={sl2} alt="Slide 3" style={styles.carouselImage} />
            </div> */}
          </Slider>
        </div>
      {/* </div> */}


      
 
      <div className="container">
          <div className="row bg-packages">
            <div id="Paperback" className="pricing-table">
            <div className="pricing-card">
                <h3 className="pricing-card-header"> 1 Lakh (1 Point)</h3>
                <ul className="feature-list">
                    <li className="package-title">₹1 Lakh Investment + GST</li>
                    <li>2% ROI for first 6 months</li>
                    <li>200 Per day profit after 6 months</li>
                    <li className="package-title">Monthly approx profit 6000</li>
                    <li>Yearly approx profit 72000</li>
                    <li className="package-title">Profit in 5 years - 360000</li>
                    <li>Minimum Guarantee - 2 Lakh</li>
                </ul>
          </div>

            <div className="pricing-card">
                <h3 className="pricing-card-header">5 Lakh (5 Point)</h3>
                <div className="price">₹5 Lakh Investment + GST</div>
                <ul className="feature-list">
                <li> 2% ROI for first 6 months</li>
                <li>1000 Per day profit after 6 months</li>
                <li>Monthly approx profit 30000</li>
                <li>Yearly approx profit 360000</li>
                <li>Profit in 5 years - 1800000</li>
                <li>Minimum Guarantee - 10 Lakh</li>
                </ul>
            </div>

            <div className="pricing-card">
                <h3 className="pricing-card-header">10 Lakh (10 Point)</h3>
                <div className="price">₹10 Lakh Investment + GST</div>
                <ul className="feature-list">
                <li> 2% ROI for first 6 months</li>
                <li> 2000 Per day profit after 6 months</li>
                <li> Monthly approx profit 60000</li>
                <li> Yearly approx profit 720000</li>
                <li> Profit in 5 years - 3600000</li>
                <li> Minimum Guarantee - 20 Lakh</li>
                </ul>
            </div>

            </div>  
            <div id="Paperback" className="pricing-table">
            <div className="pricing-card">
                <h3 className="pricing-card-header">25 Lakh (25 Point)</h3>
                <div className="price">₹25 Lakh Investment + GST</div>
                <ul className="feature-list">
                <li> 2% ROI for first 6 months</li>
                <li> 5000 Per day profit after 6 months</li>
                <li> Monthly approx profit 150000</li>
                <li> Yearly approx profit 1800000</li>
                <li> Profit in 5 years - 9000000</li>
                <li> Minimum Guarantee - 50 Lakh</li>
                </ul>
            </div>

            <div className="pricing-card">
                <h3 className="pricing-card-header">50 Lakh (50 Point)</h3>
                <div className="price">₹50 Lakh Investment + GST</div>
                <ul className="feature-list">
                <li> 2% ROI for first 6 months</li>
                <li> 10000 Per day profit after 6 months</li>
                <li> Monthly approx profit 300000</li>
                <li> Yearly approx profit 3600000</li>
                <li> Profit in 5 years - 18000000</li>
                <li> Minimum Guarantee - 1 Crore</li>
                </ul>
            </div>


            <div className="pricing-card">
                <h3 className="pricing-card-header">1 Crore (100 Point)</h3>
                <div className="price">₹1 Crore Investment + GST</div>
                <ul className="feature-list">
                <li> 2% ROI for first 6 months </li>
                <li> 20000 Per day profit after 6 months</li>
                <li> Monthly approx profit 600000</li>
                <li> Yearly approx profit 7200000</li>
                <li> Profit in 5 years - 36000000</li>
                <li> Minimum Guarantee - 2 Crore</li>
                </ul>
            </div>


        </div>
        </div></div> 
  
  
        <section className="page-section bg-light" id="team">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">🏪 Our Store Type</h2>
          <h3 className="section-subheading text-muted"> 1️⃣ 1 Point = 💰1 Lakh</h3>
        </div>
        <div className="row row1">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Store Amount</th>
                <th scope="col">Point</th>
                <th scope="col">Site (Sq. Ft.)</th>
                <th scope="col">Minimum Daily Sale</th>
                <th scope="col">Categories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>25 Lakh</td>
                <td>25</td>
                <td>2000-2500</td>
                <td>1 Lakh</td>
                <td>Grocery/Garments</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>50 Lakh</td>
                <td>50</td>
                <td>4000-5000</td>
                <td>2 Lakh</td>
                <td>Grocery + Home Appliances</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>1 Crore</td>
                <td>100</td>
                <td>5000-10000</td>
                <td>4 Lakh</td>
                <td>Grocery + Home Appliances + Garments</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>2 Crore - 5 Crore</td>
                <td>200 - 500</td>
                <td>15000-30000</td>
                <td>8 Lakh - 40 Lakh</td>
                <td>All Categories</td>
              </tr>
            </tbody>
          </table>
        </div>

      <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <p className="large text-muted"></p>
            <p>
            🏬 एक स्टोर खुलने में जितने पॉइंट होंगे उतने ही  <strong> Co-Partner</strong> बन सकते है.
            </p>
            <p>
            💼 "एक Co-Partner में मल्टीपल पॉइंट का निवेश कर सकता है।"
            </p>
          </div>
      </div>
     </div>
    </section>


    <div className="flex flex-col items-center">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-yellow-500 text-white p-4 rounded-lg shadow-lg uppercase tracking-wide">
        Store Plan
    </h1>

    <div className="flex justify-between w-full max-w-5xl mt-8 space-x-4">

        {/* Easy Connect Store */}
        <div className="w-1/2 bg-white p-8 border border-gray-200 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
                Easy Connect Store
            </h2>
            <p className="mt-4 text-xl"><strong>💼 Investment:</strong> <span className="text-gray-700">25 लाख</span></p>
            <p className="text-xl"><strong>📊 एवरेज स्टोर सेल:</strong> <span className="text-gray-700">1 लाख</span></p>
            <p className="text-xl"><strong>💹 स्टोर प्रॉफिट:</strong> <span className="text-gray-700">2% to 10%</span></p>
            <p className="text-xl"><strong>📈 एवरेज प्रॉफिट:</strong> <span className="text-gray-700">5%</span></p>
            <p className="text-xl font-semibold text-green-600 mt-4"><strong>💸 Per Day Income:</strong> 5000 ₹</p>
            <p className="text-lg mt-4"><strong>🗓️ मंथली इनकम  5000 x 30:</strong> 1.5 लाख</p>
            <p className="text-lg"><strong>📅 वार्षिक इनकम 150000 x 12:</strong> 18 लाख</p>
            <p className="text-lg"><strong>📆 5 वर्ष इनकम 1800000 x 5 :</strong> 90 लाख</p>
        </div>

        {/* Premium Store */}
        <div className="w-1/2 bg-white p-8 border border-gray-200 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
                Premium Store
            </h2>
            <p className="mt-4 text-xl"><strong>💼 Investment:</strong> <span className="text-gray-700">50 लाख</span></p>
            <p className="text-xl"><strong>📊 एवरेज स्टोर सेल:</strong> <span className="text-gray-700">2 लाख</span></p>
            <p className="text-xl"><strong>💹 स्टोर प्रॉफिट:</strong> <span className="text-gray-700">2% to 10%</span></p>
            <p className="text-xl"><strong>📈 एवरेज प्रॉफिट:</strong> <span className="text-gray-700">5%</span></p>
            <p className="text-xl font-semibold text-green-600 mt-4"><strong>💸 Per Day Income:</strong> 10000 ₹</p>
            <p className="text-lg mt-4"><strong>🗓️ मंथली इनकम 10000 x 30:</strong> 3 लाख</p>
            <p className="text-lg"><strong>📅 वार्षिक इनकम 300000 x 12:</strong> 36 लाख</p>
            <p className="text-lg"><strong>📆 5 वर्ष इनकम 3600000 x 5:</strong> 1.80 करोड़</p>
        </div>
    </div>

    <p className="mt-6 text-xl text-red-600 text-center font-semibold border-t-2 border-red-600 pt-4">
        ⚠️ यह इनकम स्टोर की SALE पर निर्भरित है, सेल कम और ज्यादा भी हो सकती है
    </p>
</div>

  

     <div className="singlelineform black-bg">
      <Container className="text-center">
        <Row>
          <Col lg={6} md={6} sm={12} className="text-left">
            <div className="well_text">
              <p className="title">Ready to start <br /> your Journey?</p>
              <span className="sub_title">We help grow your their store.</span>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <div className="mLR20"><SignupForm/></div>
          </Col>
        </Row>
      </Container>
    </div>

  

    {/* <div>
      <Button onClick={handleShow}>Open Modal</Button>
      <ModalComponent show={showModal} handleClose={handleClose} title="My Modal">
        <p>This is the content inside the modal.</p>
      </ModalComponent>
    </div> */}

     <div className="mLR20" > <DistributionPlatforms/></div>
      
      <LandingPageFooter/>
      <ModalComponent/>
    </>
  );
};

export default Landwishbasket;
