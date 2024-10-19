// import LandingPageHeader from "components/LandingPageHeader";
// import React from "react";
// import plot1 from "../../styles/imgs/page/plot1.png";
// import plot2 from "../../styles/imgs/page/plot2.png";
// import plot3 from "../../styles/imgs/page/plot3.jpg";
// import icon1 from "../../styles/imgs/page/icon1.png";
// import icon2 from "../../styles/imgs/page/icon2.png";
// import icon3 from "../../styles/imgs/page/icon3.png";
// // import icon4 from "../../styles/imgs/page/icon4.png";
// import icon5 from "../../styles/imgs/page/icon5.png";
// import icon6 from "../../styles/imgs/page/icon6.png";
// import backgroundimg2 from "../../styles/imgs/page/backgroundimg2.jpg";
// import bck3 from "../../styles/imgs/page/bck3.jpg";
// import bck6 from "../../styles/imgs/page/bck6.jpg";
// import bck5 from "../../styles/imgs/page/bck5.jpg";
// import gif from "../../styles/imgs/page/gif.gif";
// import gif2 from "../../styles/imgs/page/gif2.gif";
// import gif3 from "../../styles/imgs/page/gif3.gif";
// import gif4 from "../../styles/imgs/page/gif4.gif";
// import gif6 from "../../styles/imgs/page/gif6.gif";
// import gif5 from "../../styles/imgs/page/gif5.gif";
// import cr from "../../styles/imgs/page/cr.jpg";
// import cr2 from "../../styles/imgs/page/cr2.jpg";
// import { Opacity } from "@mui/icons-material";
// import grocery_animation from "../../assets/video/grocery-animation_2.mp4";
// import background from "../../assets/video/background.mp4";
// import { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import LandingPageFooter from "components/LandingPageFooter";


// const InstantDiscountMembership = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//   };
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);

//   const [fadeIn, setFadeIn] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY || window.pageYOffset;
//       const threshold = window.innerHeight * 0.8; // Adjust as needed
//       if (scrollY > threshold) {
//         setFadeIn(true);
//         window.removeEventListener("scroll", handleScroll);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//       setIsSmallMobile(window.innerWidth <= 480);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setFadeIn(true);
//     }, 1000); // Adjust the delay as needed
//     return () => clearTimeout(timer);
//   }, []);
//   const styles = {
//     fadeInText: {
//       opacity: fadeIn ? 1 : 0,
//       transition: "opacity 2s ease-in-out",
//     },
//     container: {
//       fontFamily: "Arial, sans-serif",
//       color: "#333",
//       lineHeight: "1.6",
//       padding: "20px",
//       position: "relative",
//       overflow: "hidden",
//     },
//     videoBackground: {
//       position: "absolute",
//       top: "0",
//       left: "0",
//       width: "100%",
//       height: "100%",
//       objectFit: "cover",
//       zIndex: "-1",
//     },
//     overlay: {
//       position: "absolute",
//       top: "0",
//       left: "0",
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       zIndex: "0",
//     },
//     header: {
//       textAlign: "center",
//       color: "#fff",
//       padding: isMobile ? "10px 0" : "20px 0",
//     },
//     title: {
//       fontSize: isSmallMobile ? "1.5em" : isMobile ? "2em" : "2.5em",
//       margin: "0",
//     },
//     timeline: {
//       position: "relative",
//       margin: "40px 0",
//       padding: "0 20px",
//     },
//     timelineItem: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       marginBottom: "40px",
//       position: "relative",
//     },
//     timelineContent: {
//       display: "flex",
//       flexDirection: isMobile ? "column" : "row-reverse",
//       alignItems: "center",
//       padding: "20px",
//       borderRadius: "80px 50px",
//       boxShadow: 'rgba(0, 0, 0, 0.1) -20px 19px 20px 20px',
//       zIndex: "1",
//       textAlign: isMobile ? "center" : "left",
//     },
//     timelineContent2: {
//       display: "flex",
//       flexDirection: isMobile ? "column" : "row",
//       alignItems: "center",
//       backgroundImage: `url(${bck5})`,
//       padding: "20px",
//       borderRadius: "50px 150px",
//       boxShadow: 'rgba(0, 0, 0, 0.1) 19px 20px 20px 20px',
//       zIndex: "1",
//       textAlign: isMobile ? "center" : "left",
//     },
//     timelineHeaderText: {
//       textAlign: "end",
//     },
//     timelineImage: {
//       width: isMobile? "60%" :"25%",
//       height: "15%",
//       marginBottom: isMobile ? "10px" : "0",
//       marginRight: isMobile ? "0" : "20px",
//     },
//     timelineText: {
//       flex: 1,
//     },
//     timelineLine: {
//       position: "absolute",
//       left: "calc(50% - 1px)",
//       top: "0",
//       width: "2px",
//       height: "100%",
//       backgroundColor: "#ff7e5f",
//       zIndex: "0",
//     },
//     timelineCircle: {
//       width: "20px",
//       height: "20px",
//       backgroundColor: "#ff7e5f",
//       borderRadius: "50%",
//       position: "absolute",
//       left: "calc(50% - 10px)",
//       top: "0",
//       zIndex: "1",
//     },
//     section: {
//       display: "flex",
//       flexDirection: isMobile ? "column" : "row",
//       alignItems: "center",
//       justifyContent: "center",
//       margin: "40px 0",
//       padding: isMobile ? "10px" : "20px",
//       borderRadius: "10px",
//       boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
//       flexWrap: "wrap",
//     },
//     sectionTitle: {
//       fontSize: isSmallMobile ? "1.2em" : isMobile ? "1.5em" : "3em",
//       color: "white",
//       marginBottom: "20px",
//       width: "100%",
//       textAlign: "center",
//       fontWeight: "400",
//     },
//     text: {
//       flex: 1,
//       marginBottom: "20px",
//       padding: isMobile ? "10px" : "20px",
//       borderRadius: "10px",
//     },
//     image: {
//       flex: 1,
//       width: "100%",
//       borderRadius: "10px",
//       marginBottom: "20px",
//     },
//     buttonContainer: {
//       textAlign: "center",
//       margin: "40px 0",
//     },
//     button: {
//       backgroundColor: "#ff7e5f",
//       color: "#fff",
//       border: "none",
//       borderRadius: "5px",
//       padding: isSmallMobile ? "8px 16px" : isMobile ? "10px 20px" : "15px 30px",
//       fontSize: isSmallMobile ? "0.9em" : isMobile ? "1em" : "1.1em",
//       cursor: "pointer",
//       transition: "background 0.3s, transform 0.3s",
//     },
//     buttonHover: {
//       backgroundColor: "#feb47b",
//     },
//     sectionLeft: {
//       flexDirection: "row-reverse",
//     },
//     carousel: {
//       width: "80%",
//       margin: "0 auto",
//       padding: "20px",
//       background: "black",
//       borderRadius: "10px",
//       boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
//       position: "relative",
//       overflow: "hidden",
//     },
//     carouselImage: {
//       width: "100%",
//       height: "100%",
//       borderRadius: "10px",
//     },
//     iconSection: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//       gap: "20px",
//       justifyItems: "center",
//       alignItems: "center",
//       padding: "20px 0",
//       textAlign: "center",
//     },
//     icon: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     iconImage: {
//       width: isSmallMobile ? "100px" : "160px",
//       height: isSmallMobile ? "100px" : "160px",
//       marginBottom: "10px",
//     },
//     iconText: {
//       fontSize: isSmallMobile ? "0.8em" : "1em",
//     },
//   };


//   return (
//     <>
//       <LandingPageHeader />
//       <div className="mb-50" style={styles.container}>
//         <video style={styles.videoBackground} autoPlay loop muted>
//           <source src={background} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div style={styles.overlay}></div>

//         <header style={styles.header}>
//           <h1 style={styles.title}>Instant Discount Membership</h1>
//         </header>

//         <section style={{ ...styles.section, ...styles.sectionLeft }}>
//           <h2 style={styles.sectionTitle}>Why Join Us?</h2>
//           <img
//             // src={plot1}
//             alt="Why Join Us"
//             style={styles.image}
//           />
//           <div>
//             <p style={styles.text}>
//               <b
//                 style={{
//                   fontSize: "40px",
//                   color: "white",
//                   textAlign: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 Welcome Ghargharbazaar Instant Discount Membership Page
//               </b>
//             </p>
//             <br />
//           </div>
//           <span>
//             <p>
//               <b>
//                 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                 Inventore, quos.
//               </b>
//             </p>
//           </span>
//         </section>
//       </div>
//       <h2 style={{...styles.sectionTitle, ...styles.fadeInText } }>Icon Section Heading</h2>
//       <section className="mb-50" style={styles.iconSection}>
//         <div style={styles.icon}>
//           <img src={gif6} alt="Complete" style={styles.iconImage} />
//           <div style={styles.iconTitle}>Complete</div>
//           <div style={styles.iconText}>
//             All your records in one place - guaranteed
//           </div>
//         </div>
//         <div style={styles.icon}>
//           <img src={gif3} alt="Organized" style={styles.iconImage} />
//           <div style={styles.iconTitle}>Organized</div>
//           <div style={styles.iconText}>
//             Arranged in a timeline that makes sense
//           </div>
//         </div>
//         <div style={styles.icon}>
//           <img src={gif4} alt="Yours" style={styles.iconImage} />
//           <div style={styles.iconTitle}>Yours</div>
//           <div style={styles.iconText}>
//             You are in control. It's your data to have, share and give - on your
//             terms.
//           </div>
//         </div>
//       </section>
//       <div style={{...styles.timelineContainer, margin:"10px 15px 10px 15px"}}>
//         <div className="mb-40" style={styles.timelineSection}>
//           <div style={styles.timelineCircle}></div>
//           <h2
//             style={{ ...styles.timelineHeader, ...styles.timelineHeaderText, ...styles.fadeInText, color:"rgb(148 140 138)"}}
//           >
//            {/* <span><b> Meet your Personal Health timeline</b></span> */}
//           </h2>

//           <div style={styles.timelineContent}>
//             <img
//               src={gif2}
//               alt="Personal Health"
//               style={styles.timelineImage}
//             />
//             <div style={styles.timelineText}>
//               <p style={{fontSize:'1.2em', fontStyle:'italic'}}>
//                 <h3 style={{color:'black', fontFamily:'sans-serif',}}><b>THIS IS AN INSTANT DISCOUNT MEMBERSHIP</b></h3>
//                 Under the Instant Discount program, customers receive
//                       immediate discounts at the time of purchase, and the
//                       remaining balance is paid after the discount is applied.
//                       Each product has a different Instant Discount, which is
//                       applied at the time of purchase. Other membership benefits
//                       include exclusive offers, member-only sales, and early
//                       access to new products and sales. Reward points are earned
//                       on every purchase and can be redeemed for cashback or
//                       other benefits on future purchases. Membership holders
//                       receive personalized services and dedicated customer
//                       support. Higher levels of membership offer more benefits
//                       with increased purchases. Additional discounts and gifts
//                       are available on special occasions. Special promotions
//                       include extra discounts during festive seasons and flash
//                       sales.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mb-40" style={styles.timelineSection}>
//           <div style={styles.timelineCircle}></div>
//           {/* <h2 style={{...styles.timelineHeader, ...styles.fadeInText, color:"rgb(148 140 138)"}}>
//             Keep doctors and loved ones in the loop
//           </h2> */}
//           <div style={styles.timelineContent2}>
//             {/* <img src={icon6} alt="Doctors" style={styles.timelineImage} /> */}
//             <div style={styles.timelineText}>
//             <h2 className="mb-20" style={{ fontStyle:"italic" }}>
//                        <b>HOW IT'S WORKS:</b>
//                       </h2>

//                       <p>
//                         <span style={{ marginBottom: "8px", display: "block" }}>
//                           <b>Instant Wish Basket:</b>Members receive immediate
//                           discounts on selected products.
//                         </span>
//                         <br />
//                         <span style={{ marginBottom: "8px", display: "block" }}>
//                           <b>Post-Discount Payment:</b>Pay the remaining amount
//                           after the discount is applied.
//                         </span>
//                         <br />
//                         <span style={{ marginBottom: "8px", display: "block" }}>
//                           <b>Varied Discounts:</b>Different products may have
//                           different discount rates, which are applied at the
//                           time of purchase.
//                         </span>
//                         <br />
//                         <span style={{ marginBottom: "8px", display: "block" }}>
//                           <b>Membership Selection:</b>Choose the membership that
//                           best suits your needs.
//                         </span>
//                         <br />
//                         <span style={{ marginBottom: "8px", display: "block" }}>
//                           <b>E-wallet Benefits:</b>Discounts are credited to
//                           your e-wallet, allowing for additional savings on
//                           future purchases.
//                         </span>
//                         <br />
//                         <span style={{ marginBottom: "8px", display: "block" }}>
//                           <b></b>Join the Ghar Ghar Bazaar Network today and
//                           start saving on your everyday essentials!
//                         </span>
//                         <br />
//                       </p>
//             </div>
//           </div>
//         </div>

//         <div className="mb-40" style={styles.timelineSection}>
//           <div style={styles.timelineCircle}></div>
//           {/* <h2
//             style={{ ...styles.timelineHeader, ...styles.timelineHeaderText ,...styles.fadeInText, color:"rgb(148 140 138)"}}
//           >
//             Meet your Personal Health timeline
//           </h2> */}
//           <div style={styles.timelineContent}>
//             <img
//               src={gif5}
//               alt="Stay Up to Date"
//               style={styles.timelineImage}
//             />
//             <div style={styles.timelineText}>
//             <h2
//                     className="mb-40"
//                     style={{ fontStyle:"italic" }}
//                   >
//                     <b>ADDITIONAL BENEFITS OF GHAR GHAR BAZAAR NETWORK MEMBERSHIP:</b>
//                   </h2>
//                   <p>
//                     <span style={{ marginBottom: "5px", display: "block" }}>
//                       <b>Exclusive Member Offers:</b>
//                     </span>
//                     <span style={{ marginBottom: "px", display: "block" }}>
//                       <b>Special Promotions:</b>Access to exclusive promotions
//                       and limited-time offers available only to members.
//                     </span>
//                     <span style={{ marginBottom: "px", display: "block" }}>
//                       <b>Early Access:</b>Be the first to know about new product
//                       launches and special sales events.
//                     </span>
//                     <span style={{ marginBottom: "px", display: "block" }}>
//                       <b>Earn Points:</b>Accumulate reward points with every
//                       purchase, which can be redeemed for discounts on future
//                       purchases.
//                     </span>
//                     <span style={{ marginBottom: "px", display: "block" }}>
//                       <b>Bonus Points:</b> Earn bonus points during special
//                       promotional periods.
//                     </span>
//                   </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//       <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#333' }}>
//         How I can help your next project
//       </h2>
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
//           gap: '2rem',
//         }}
//       >
//         <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto', }}>
//             {/* <img src={icon5} alt="Graphic Design" width="62" height="62" /> */}
//           </div>
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Graphic Design</h3>
//           <p style={{ lineHeight: '1.6', color: '#555' }}>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//           </p>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem',margin:'auto', }}>
//             <img src={gif} alt="Web Design" width="62" height="62" />
//           </div>
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Web Design</h3>
//           <p style={{ lineHeight: '1.6', color: '#555' }}>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//           </p>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto',}}>
//             <img src={gif4}  alt="Web Development" width="62" height="62" />
//           </div>
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Web Development</h3>
//           <p style={{ lineHeight: '1.6', color: '#555' }}>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//           </p>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto', }}>
//             <img src={gif}  alt="Brand Identity" width="62" height="62" />
//           </div>
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Brand Identity</h3>
//           <p style={{ lineHeight: '1.6', color: '#555' }}>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//           </p>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto', }}>
//             <img src={gif3} alt="Business Analysis" width="62" height="62" />
//           </div>
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Business Analysis</h3>
//           <p style={{ lineHeight: '1.6', color: '#555' }}>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//           </p>
//         </div>
//         <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#f0f0f0', marginBottom: '1rem', margin:'auto', }} >
//             <img src={gif2}  alt="Digital Marketing" width="62" height="62" />
//           </div>
//           <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>Digital Marketing</h3>
//           <p style={{ lineHeight: '1.6', color: '#555' }}>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//           </p>
//         </div>
//       </div>
//     </div>
//       <div className="mb-40" style={styles.carousel}>
//           <Slider {...settings}>
//             {/* <div>
//               <img src={plot1} alt="Slide 1" style={styles.carouselImage} />
//             </div> */}
//             <div>
//               <img src={cr} alt="Slide 2" style={styles.carouselImage} />
//             </div>
//             <div>
//               <img src={cr2} alt="Slide 3" style={styles.carouselImage} />
//             </div>
//           </Slider>
//         </div>
//       {/* </div> */}
//       <LandingPageFooter/>
//     </>
//   );
// };

// export default InstantDiscountMembership;
