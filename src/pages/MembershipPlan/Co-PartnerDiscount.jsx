import LandingPageHeader from "components/LandingPageHeader";
import React from "react";
import plot1 from "../../styles/imgs/page/plot1.png";
import plot2 from "../../styles/imgs/page/plot2.png";
import plot3 from "../../styles/imgs/page/plot3.jpg";
import icon1 from "../../styles/imgs/page/icon1.png";
import icon2 from "../../styles/imgs/page/icon2.png";
import icon3 from "../../styles/imgs/page/icon3.png";
import { Opacity } from "@mui/icons-material";
import grocery_animation from "../../assets/video/grocery-animation_2.mp4";
// import background from "../../assets/video/background.mp4";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingPageFooter from "components/LandingPageFooter";


const InstantDiscountMembership = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

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
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);
  const styles = {
    fadeInText: {
      opacity: fadeIn ? 1 : 0,
      transition: "opacity 2s ease-in-out",
    },
    container: {
      fontFamily: "Arial, sans-serif",
      color: "#333",
      lineHeight: "1.6",
      // backgroundColor: '#4158D0',
      // backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
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
      objectFit: "cover",
      zIndex: "-1",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "0",
    },
    header: {
      textAlign: "center",
      color: "#fff",
      padding: "20px 0",
    },
    title: {
      fontSize: "2.5em",
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
      flexDirection: "row-reverse",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: "1",
    },
    timelineContent2: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      zIndex: "1",
    },
    timelineHeaderText: {
      textAlign: "end",
    },
    timelineImage: {
      width: "25%",
      height: "15%",
      marginRight: "20px",
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
    timelineCircle: {
      width: "20px",
      height: "20px",
      backgroundColor: "#ff7e5f",
      borderRadius: "50%",
      position: "absolute",
      left: "calc(50% - 10px)",
      top: "0",
      zIndex: "1",
    },
    section: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin: "40px 0",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 8px 12px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s",
      flexWrap: "wrap",
    },
    sectionTitle: {
      fontSize: "3em",
      color: "rgb(148 140 138)",
      marginBottom: "20px",
      width: "100%",
      textAlign: "center",
      fontWeight: "400",
    },
    text: {
      flex: 1,
      marginBottom: "20px",
      padding: "20px",
      borderRadius: "10px",
      // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    image: {
      flex: 1,
      width: "100%",
      borderRadius: "10px",
      marginBottom: "20px",
      transition: "transform 0.3s",
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
      padding: "15px 30px",
      fontSize: "1.1em",
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
      width: "80%",
      margin: "0 auto",
      padding: "20px",
      background: "black",
      borderRadius: "10px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      position: "relative",
      overflow: "hidden",
    },
    carouselImage: {
      width: "100%",
      height: "auto",
      borderRadius: "10px",
    },
    "@media (max-width: 768px)": {
      header: {
        padding: "10px 0",
      },
      title: {
        fontSize: "2em",
      },
      timelineContent: {
        flexDirection: "column",
        textAlign: "center",
      },
      timelineImage: {
        marginBottom: "10px",
      },
      section: {
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      },
      sectionTitle: {
        fontSize: "1.5em",
      },
      text: {
        padding: "10px",
      },
      image: {
        margin: "0 0 20px 0",
      },
      button: {
        padding: "10px 20px",
        fontSize: "1em",
      },
    },
    "@media (max-width: 480px)": {
      title: {
        fontSize: "1.5em",
      },
      sectionTitle: {
        fontSize: "1.2em",
      },
      button: {
        padding: "8px 16px",
        fontSize: "0.9em",
      },
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
      width: "50px",
      height: "50px",
      marginBottom: "10px",
    },
    iconTitle: {
      fontSize: "1.2em",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    iconText: {
      fontSize: "1em",
      color: "#555",
    },
  };

  return (
    <>
      <LandingPageHeader />
      <div className="mb-50" style={styles.container}>
        <video style={styles.videoBackground} autoPlay loop muted>
          {/* <source src={background} type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>
        <div style={styles.overlay}></div>

        <header style={styles.header}>
          <h1 style={styles.title}>Instant Discount Membership</h1>
        </header>

        <section style={{ ...styles.section, ...styles.sectionLeft }}>
          <h2 style={styles.sectionTitle}>Why Join Us?</h2>
          <img
            // src={plot1}
            alt="Why Join Us"
            style={styles.image}
          />
          <div>
            <p style={styles.text}>
              <b
                style={{
                  fontSize: "40px",
                  color: "white",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                Welcome Ghargharbazaar Instant Discount Membership Page
              </b>
            </p>
            <br />
          </div>
          <span>
            <p>
              <b>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Inventore, quos.
              </b>
            </p>
          </span>
        </section>
      </div>
      <h2 style={{...styles.sectionTitle, ...styles.fadeInText } }>Icon Section Heading</h2>
      <section className="mb-50" style={styles.iconSection}>
        <div style={styles.icon}>
          {/* <img src={icon1} alt="Complete" style={styles.iconImage} /> */}
          <div style={styles.iconTitle}>Complete</div>
          <div style={styles.iconText}>
            All your records in one place - guaranteed
          </div>
        </div>
        <div style={styles.icon}>
          {/* <img src={icon2} alt="Organized" style={styles.iconImage} /> */}
          <div style={styles.iconTitle}>Organized</div>
          <div style={styles.iconText}>
            Arranged in a timeline that makes sense
          </div>
        </div>
        <div style={styles.icon}>
          {/* <img src={icon3} alt="Yours" style={styles.iconImage} /> */}
          <div style={styles.iconTitle}>Yours</div>
          <div style={styles.iconText}>
            You are in control. It's your data to have, share and give - on your
            terms.
          </div>
        </div>
      </section>
      <div style={styles.timelineContainer}>
        <div className="mb-40" style={styles.timelineSection}>
          <div style={styles.timelineCircle}></div>
          <h2
            style={{ ...styles.timelineHeader, ...styles.timelineHeaderText, ...styles.fadeInText, color:"rgb(148 140 138)"}}
          >
           <span><b> Meet your Personal Health timeline</b></span>
          </h2>

          <div style={styles.timelineContent}>
            <img
              // src={icon1}
              alt="Personal Health"
              style={styles.timelineImage}
            />
            <div style={styles.timelineText}>
              <p style={{fontSize:'1.2em', fontStyle:'italic'}}>
                
                "Our membership program offers an array of unparalleled benefits
                designed to enhance your shopping experience. As a member,
                you'll enjoy instant cashback deposited directly into your
                wallet with every purchase through our Product Wish Basket
                feature. Not only do you receive regular discounts on products,
                but you also earn additional cashback on top of these discounts.
                This cashback can be conveniently redeemed from your E-Wallet,
                granting you the freedom to choose from a wide selection of
                electronic products ranging from renowned brands like LG,
                Samsung, Panasonic, Bajaj, Tata, Sony, and more. Whether you're
                in the market for a new TV, refrigerator, washing machine,
                mixer, or AC, our membership ensures that you have access to
                exclusive offers, flexible payment options, extended warranty
                coverage, and dedicated support, making your shopping journey
                seamless and rewarding."
              </p>
            </div>
          </div>
        </div>

        <div className="mb-40" style={styles.timelineSection}>
          <div style={styles.timelineCircle}></div>
          <h2 style={{...styles.timelineHeader, ...styles.fadeInText, color:"rgb(148 140 138)"}}>
            Keep doctors and loved ones in the loop
          </h2>
          <div style={styles.timelineContent2}>
            {/* <img src={icon2} alt="Doctors" style={styles.timelineImage} /> */}
            <div style={styles.timelineText}>
              <p>
                "Joining our Product Wish Basket membership program opens the
                door to a world of exclusive benefits and rewards. As a member,
                you'll enjoy instant cashback deposited directly into your
                wallet with every purchase, in addition to regular discounts on
                a wide range of top brands and products, including LG, Samsung,
                Panasonic, Bajaj, Tata, and Sony. But that's not all - after
                availing of your regular or instant discount, you'll still
                receive cashback on your purchase, ensuring you save even more.
                This cashback is conveniently stored in your E-Wallet, allowing
                you to effortlessly redeem it for electronic products ranging
                from 1000 rupees to 2 lakhs. With our membership, you not only
                shop smarter but also gain access to a host of perks designed to
                enhance your shopping experience and reward your loyalty."
              </p>
            </div>
          </div>
        </div>

        <div className="mb-40" style={styles.timelineSection}>
          <div style={styles.timelineCircle}></div>
          <h2
            style={{ ...styles.timelineHeader, ...styles.timelineHeaderText ,...styles.fadeInText, color:"rgb(148 140 138)"}}
          >
            Meet your Personal Health timeline
          </h2>
          <div style={styles.timelineContent}>
            <img
              // src={icon3}
              alt="Stay Up to Date"
              style={styles.timelineImage}
            />
            <div style={styles.timelineText}>
              <p>
                {" "}
                "Our membership program offers an array of unparalleled benefits
                designed to enhance your shopping experience. As a member,
                you'll enjoy instant cashback deposited directly into your
                wallet with every purchase through our Product Wish Basket
                feature. Not only do you receive regular discounts on products,
                but you also earn additional cashback on top of these discounts.
                This cashback can be conveniently redeemed from your E-Wallet,
                granting you the freedom to choose from a wide selection of
                electronic products ranging from renowned brands like LG,
                Samsung, Panasonic, Bajaj, Tata, Sony, and more. Whether you're
                in the market for a new TV, refrigerator, washing machine,
                mixer, or AC, our membership ensures that you have access to
                exclusive offers, flexible payment options, extended warranty
                coverage, and dedicated support, making your shopping journey
                seamless and rewarding."
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Full Timeline Section */}
      <section style={{ ...styles.section }}>
        <h2 style={{...styles.sectionTitle, ...styles.fadeInText,}}>Full Timeline</h2>
        <div style={styles.timelineContainer}>
          <div style={styles.timelineSection}>
            <div style={styles.timelineCircle}></div>
            <div style={styles.timelineContent}>
              {/* <img src={icon1} alt="Complete" style={styles.timelineImage} /> */}
              <div style={styles.timelineText}>
                <h3>Step 1: Complete</h3>
                <p>All your records in one place - guaranteed</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
                  hic ea, animi rerum exercitationem alias. Fuga ex ratione
                  necessitatibus obcaecati vel temporibus illo tempora ad dolor
                  impedit cupiditate pariatur quidem repellendus officiis fugiat
                  minima iusto doloremque velit, possimus praesentium
                  consequuntur hic distinctio labore mollitia. Necessitatibus ex
                  iusto provident ad asperiores.
                </p>
              </div>
            </div>
          </div>
          <div style={styles.timelineSection}>
            <div style={styles.timelineCircle}></div>
            <div style={styles.timelineContent}>
              {/* <img src={icon2} alt="Organized" style={styles.timelineImage} /> */}
              <div style={styles.timelineText}>
                <h3>Step 2: Organized</h3>
                <p>Arranged in a timeline that makes sense</p>
              </div>
            </div>
          </div>
          <div style={styles.timelineSection}>
            <div style={styles.timelineCircle}></div>
            <div style={styles.timelineContent}>
              {/* <img src={icon3} alt="Yours" style={styles.timelineImage} /> */}
              <div style={styles.timelineText}>
                <h3>Step 3: Yours</h3>
                <p>
                  You are in control. It's your data to have, share and give -
                  on your terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mb-40" style={styles.carousel}>
          <Slider {...settings}>
            <div>
              <img src={plot1} alt="Slide 1" style={styles.carouselImage} />
            </div>
            <div>
              <img src={plot2} alt="Slide 2" style={styles.carouselImage} />
            </div>
            <div>
              <img src={plot3} alt="Slide 3" style={styles.carouselImage} />
            </div>
          </Slider>
        </div>
      {/* </div> */}
      <LandingPageFooter/>
    </>
  );
};

export default InstantDiscountMembership;
