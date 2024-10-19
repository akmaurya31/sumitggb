import LandingPageHeader from "components/LandingPageHeader";
import React from "react";
import icon5 from "../../styles/imgs/page/icon5.png";
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
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingPageFooter from "components/LandingPageFooter";
import { height } from "@mui/system";

const Productwishbasket = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  

  const klfLinkStyle = {
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
    borderRadius: '5px',
    padding: '10px',
    transition: 'ease-in 0.5s'
  };

  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);

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
    bpoint: {
      marginRight: "8px",
      display: "flex",
      height: "66px",
      width: "66px",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9999px", // Fully rounded
      borderWidth: "5px",
      backgroundColor: "rgb(255 255 255)", // Ensure the color is parsed correctly in JS
      fontSize: "2.84375rem",
      fontWeight: "600",
      color: "rgb(0 0 0)", // Same for the text color
      boxShadow: "inset 0 5.5px 15.04px 0.96px rgba(3, 4, 4, 0.34), 1.94px 1.57px 0.76px 0.24px rgba(0, 2, 25, 0.15)", // Box shadow
    }


    
  };


  return (
    <>
      <div><LandingPageHeader/></div>
      <div className="mb-50" style={{...styles.container, ...backgroundStyle, width: "100%", marginTop:"100px"}}>
      </div>


      <div className="flex sm:flex-col md:flex-row justify-center items-center mx-auto  ">
        <div className="md:w-[25%] sm:w-[100%] mx-10"> <img src={gif2} alt="Complete"  className="w-[299px]" /></div>
        <div className="md:w-[75%] sm:w-[100%]">


        <div className="mt-10 p-6 bg-gradient-to-r from-pink-100 to-yellow-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        PRODUCT WISH BASKET / <span className="text-sm">प्रोडक्ट विश बास्केट</span> 🛒
      </h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        हमारा मेंबरशिप प्रोग्राम आपको ढेर सारे प्रोडक्ट्स पर एक्सक्लूसिव डिस्काउंट्स 🎉 देता है। मेंबर्स को कई कैटेगरी में बहुत अच्छी बचत 💸 मिलती है, जैसे <span className="font-semibold">FMCG</span> (Fast-Moving Consumer Goods) पर 5% से 20% तक का डिस्काउंट।
      </p>
      <p className="text-gray-700 mb-4 leading-relaxed">
        ताजे 🥬 और उच्च गुणवत्ता वाली सब्जियों पर भी 10% से 20% तक का डिस्काउंट मिलता है, जिससे आप हेल्दी खाना 🍽️ खाकर भी पैसे बचा सकते हैं।
      </p>
      <p className="text-gray-700 mb-4 leading-relaxed">
        अगर आप इलेक्ट्रॉनिक्स 💻 खरीदने का सोच रहे हैं, तो हमारी मेंबरशिप से आपको 10% से 20% तक का डिस्काउंट मिलेगा, जिससे आप लेटेस्ट टेक्नोलॉजी को और भी अफोर्डेबल बना सकते हैं।
      </p>
      <p className="text-gray-700 mb-4 leading-relaxed">
        इसके अलावा, बाकी सभी प्रोडक्ट कैटेगरीज 🛍️ पर भी मेंबरशिप के तहत 10% से 20% तक का डिस्काउंट मिलता है।
      </p>
      <p className="text-gray-700 mb-4 leading-relaxed font-semibold text-center">
        आज ही हमारी मेंबरशिप जॉइन करें और हर खरीदारी पर इन शानदार डील्स ✨ का फायदा उठाएं और अधिक से अधिक सेविंग्स करें! 🤑
      </p>

      
    <div className="mt-10 sm:p-1 md:p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Key Highlights 🌟:
      </h2>
      <ul className="list-none  p-2  space-y-4 text-gray-700">
        <li className="flex items-center">
          <span className="w-6 h-6 inline-block bg-green-500 text-white rounded-full flex justify-center items-center mr-3">
            ✓
          </span>
          <span>FMCG प्रोडक्ट्स पर 5% से 20% तक का डिस्काउंट 🛍️</span>
        </li>
        <li className="flex items-center">
          <span className="w-6 h-6 inline-block bg-green-500 text-white rounded-full flex justify-center items-center mr-3">
            ✓
          </span>
          <span>ताजे और उच्च गुणवत्ता वाली सब्जियों पर 10% से 20% डिस्काउंट 🥦</span>
        </li>
        <li className="flex items-center">
          <span className="w-6 h-6 inline-block bg-green-500 text-white rounded-full flex justify-center items-center mr-3">
            ✓
          </span>
          <span>इलेक्ट्रॉनिक्स पर 10% से 20% तक का डिस्काउंट 💻</span>
        </li>
        <li className="flex items-center">
          <span className="w-6 h-6 inline-block bg-green-500 text-white rounded-full flex justify-center items-center mr-3">
            ✓
          </span>
          <span>सभी अन्य प्रोडक्ट्स पर 10% से 20% डिस्काउंट 🎉</span>
        </li>
        <li className="flex items-center">
          <span className="w-6 h-6 inline-block bg-green-500 text-white rounded-full flex justify-center items-center mr-3">
            ✓
          </span>
          <span>हर खरीदारी पर शानदार कैशबैक 💸</span>
        </li>
      </ul>
    </div>
    </div>



       
        <div className="flex sm:flex-col md:flex-row gap-5 mx-4 mt-4">
          <div>
            <a href="#" className="relative cursor-pointer">
              <div className="flex items-stretch shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_1px_2px_rgba(0,0,0,0.24)] rounded-[5px] p-[10px] border border-[#194c7e] hover:border-red-500 transition-colors ease-in duration-500">
                <img src={gif4} alt="Complete" className="w-[99px] h-[99px]"  />
                <div className="flex flex-col items-center">
                  <p className="font-bold text-center mx-5">1000+ Brands</p>
                  <h5 className="text-lg font-semibold">We Have</h5>
                </div>
              </div>
            </a>
          </div>


          <div>
            <a href="#" className="relative cursor-pointer">
              <div className="flex items-stretch shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_1px_2px_rgba(0,0,0,0.24)] rounded-[5px] p-[10px] border border-[#194c7e] hover:border-red-500 transition-colors ease-in duration-500">
                <img src={gif3} alt="Complete" className="w-[99px] h-[99px]"/>
                <div className="flex flex-col items-center">
                  <p className="font-bold text-center mx-5">UPTO: 80%</p>
                  <h5 className="text-lg font-semibold">Discount</h5>
                </div>
              </div>
            </a>
          </div>

          <div>
            <a href="#" className="relative cursor-pointer">
              <div className="flex items-stretch shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_1px_2px_rgba(0,0,0,0.24)] rounded-[5px] p-[10px] border border-[#194c7e] hover:border-red-500 transition-colors ease-in duration-500">
                {/* <img src="/static/media/books.e7654b8042f9abdf306b.webp" className="w-[25px] h-[25px]" alt="Book Stall" /> */}
                <img src={gif6} alt="Complete" className="w-[99px] h-[99px]"  />
                <div className="flex flex-col items-center">
                  <p className="font-bold text-center mx-5">20000+ Customers</p>
                  <h5 className="text-lg font-semibold">Completed</h5>
                </div>
              </div>
            </a>
          </div>


        </div>

        </div>
      </div>


 
    



      <div style={{ textAlign: 'center', marginBottom:'20px' }}>
      <h2 className="mt-5 font-bold " style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#333' }}>
        Membership Advantages And Perks
      </h2>
      <div className="grid grid-cols-3 grid-rows-2  sm:grid-cols-1 w-[80%] mx-auto"  >
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto', }}>
            <img src={icon5} alt="Graphic Design" width="62" height="62" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Special Promotions:</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
          <span >
                      <b>Special Promotions:</b>Access to exclusive promotions
                      and limited-time offers available only to members.
                    </span>
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem',margin:'auto', }}>
            <img src={gif} alt="Web Design" width="62" height="62" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Early Access:</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
          <span >
                      <b>Early Access:</b>Be the first to know about new product
                      launches and special sales events.
                    </span>
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto',}}>
            <img src={gif4}  alt="Web Development" width="62" height="62" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Earn Points:</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
          <span >
                      <b>Earn Points:</b>Accumulate reward points with every
                      purchase, which can be redeemed for discounts on future
                      purchases.
                    </span>
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto', }}>
            <img src={gif}  alt="Brand Identity" width="62" height="62" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Bonus Points:</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
          <span >
                      <b>Bonus Points:</b> Earn bonus points during special
                      promotional periods.
                    </span>
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto', }}>
            <img src={gif3} alt="Business Analysis" width="62" height="62" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Membership Selection:</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
          <span >
                          <b>Membership Selection:</b>Choose the membership that
                          best suits your needs.
                        </span>
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto', }} >
            <img src={gif2}  alt="Digital Marketing" width="62" height="62" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>E-wallet Benefits:</h3>
          <p style={{ lineHeight: '1.6', color: '#555' }}>
          <span >
                          <b>E-wallet Benefits:</b>Discounts are credited to
                          your e-wallet, allowing for additional savings on
                          future purchases.
                        </span>
          </p>
        </div>
      </div>
    </div>

<div className="flex flex-row mx-auto  ">

<div className="mt-[62px] mx-auto relative">

<p class="text-[#454545] text-[1.604167rem] font-bold tracking-[0.02em] text-center">
                  HOW IT'S WORKS / कैसे काम करता है?
          </p>

  <ul className="list-none text-cyan-50">
    <li className="min-h-[52px] p-[6px_11px] relative rounded-[45.89px] bg-[#f36d46] flex items-center mb-[10px]">
      <div className="bpoint" style={{ border: "5px #fff solid" }}>
        1
      </div>
      {/* leading-[39.58333px] */}
      <p className="text-md  font-medium  text-cyan-50 ">
      <b>Instant Wish Basket:</b> Members receive immediate discounts on selected products.
      </p>
    </li>

    <li className="min-h-[52px] p-[6px_11px] relative rounded-[45.89px] bg-[#e0842a] flex items-center mb-[10px]">
      <div className="bpoint" style={{ border: "5px #fff solid" }}>
        2
      </div>
      <p className="text-md font-medium mt-[10px]  text-cyan-50">
      <b>Post-Discount Payment:</b> Pay the remaining amount after the discount is applied.
      </p>
    </li>

    <li className="min-h-[52px] p-[8px_11px_4px] relative rounded-[45.89px] bg-[#f36d46] flex items-center mb-[10px]">
      <div className="bpoint" style={{ border: "5px #fff solid" }}>
        3
      </div>
      <p className="text-md font-medium  text-cyan-50">
      <b>Varied Discounts:</b> Different products may have different discount rates, which are applied at the time of purchase. 
      </p>
    </li>

    <li className="min-h-[52px] p-[8px_11px_4px] relative rounded-[45.89px] bg-[#e0842a] flex items-center mb-[10px]">
      <div className="bpoint" style={{ border: "5px #fff solid" }}>
        4
      </div>
      <p className="text-md font-medium  text-cyan-50">
      <b>Membership Selection:</b> Choose the membership that best suits your needs.
      </p>
    </li>

    <li className="min-h-[52px] p-[8px_11px_4px] relative rounded-[45.89px] bg-[#f36d46] flex items-center mb-[10px]">
      <div className="bpoint" style={{ border: "5px #fff solid" }}>
        5
      </div>
      <p className="text-md font-medium  text-cyan-50">
      <b>E-wallet Benefits: </b>Discounts are credited to your e-wallet, allowing for additional savings on future purchases.
      </p>
    </li>

    <li className="min-h-[52px] p-[8px_11px_4px] relative rounded-[45.89px] bg-[#e0842a] flex items-center mb-[10px]">
      <div className="bpoint" style={{ border: "5px #fff solid" }}>
        6
      </div>
      <p className="text-md font-medium  text-cyan-50">
          Join the Ghar Ghar Bazaar Network today and start saving on your everyday essentials!
      </p>
    </li>
  </ul>
</div>

 

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
      <LandingPageFooter/>
    </>
  );
};

export default Productwishbasket;
