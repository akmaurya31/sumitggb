import React from "react";

import { useNavigate, Link } from "react-router-dom";

import { Button, Img, Input, List, Text } from "components";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import about1 from "../../styles/imgs/page/about-1.png";
import about2 from "../../styles/imgs/page/about-1.png";
import about3 from "../../styles/imgs/page/about-1.png";
import about4 from "../../styles/imgs/page/about-1.png";
import about5 from "../../styles/imgs/page/about-5.png";
import about6 from "../../styles/imgs/page/about-6.png";
import about8 from "../../styles/imgs/page/about-8.png";
import about11 from "../../styles/imgs/page/about11.PNG";
import about22 from "../../styles/imgs/page/about22.PNG";
import about33 from "../../styles/imgs/page/about33.webp";
import md_sandeep from "../../styles/imgs/page/md_sandeep.PNG";
// import iconUser from "../../styles/imgs/theme/icons/icon-user.svg";
import iconFacebookBrand from "../../styles/imgs/theme/icons/icon-facebook-brand.svg";
import iconTwitterBrand from "../../styles/imgs/theme/icons/icon-twitter-brand.svg";
import iconInstagramBrand from "../../styles/imgs/theme/icons/icon-instagram-brand.svg";
import iconPinterestWhite from "../../styles/imgs/theme/icons/icon-pinterest-white.svg";
import iconYoutubeBrand from "../../styles/imgs/theme/icons/icon-youtube-brand.svg";
import Breadcrumb from "components/Breadcrumb";
import { RoundedCorner } from "@mui/icons-material";

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
      <main className="main pages">
        <div className="container-fluid">
          <Breadcrumb activepage={"About us"} />
        </div> 
        <div className="page-content ">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <section className="row mb-50  align-items-start text-justify">
                  <div className="col-lg-8  align-items-center">
                    <div className="pl-25">
                      <h2 className="mb-30">
                        Welcome to Ghar Ghar Bazaar
                      </h2>
                      <p className="text-lg text-gray-800">
                        <span className="font-semibold text-orange-700">GHAR GHAR BAZAAR</span> (A Unit of DRV Ghar Ghar Bazar Pvt. Ltd.) भारत की अग्रणी खुदरा श्रृंखलाओं में से एक है।
                        हमारे पास <span className="font-bold">उपभोक्ता उत्पादों</span> और <span className="font-bold">जीवनशैली श्रेणियों</span> में अनुभव है। हम अपने ग्राहकों को <span className="font-bold text-orange-600">किफायती दरों</span> पर सेवाएं देते हैं। 
                      </p>
                      <p className="text-lg text-gray-800">
                        <span className="font-bold text-orange-700">घर-घर बाज़ार</span> भारत में तेजी से बढ़ता मल्टीब्रांड सुपरमार्केट है। उपभोक्ता हमारी साइट को ऑनलाइन या ऐप के माध्यम से एक्सेस कर सकते हैं।
                      </p>

                      <h3 className="text-2xl font-bold text-orange-600 mb-4">कंपनी की प्रमुख विशेषताएं:</h3>
                      <ul className="list-disc pl-6 text-gray-800 space-y-2">
                        <li><span className="font-semibold">किफायती दरों</span> पर उत्पादों की उपलब्धता</li>
                        <li>उपभोक्ता उत्पादों को <span className="font-semibold">प्राकृतिक स्थिति</span> में रखने की नीति</li>
                        <li>2018 में शुरू किया गया व्यवसाय, लेकिन संस्थापक के पास 15 वर्षों का अनुभव</li>
                      </ul>


                      <h3 className="text-2xl font-bold text-orange-600 mb-4">प्रिय सहकर्ताओं,</h3>
                      <p className="text-gray-800 leading-relaxed">
                      <span className="font-semibold">डीआरवी घर घर बाजार</span> का उद्देश्य ग्राहकों को <span className="text-green-600 font-bold">सस्ती दरों पर बेहतरीन गुणवत्ता</span> के उत्पाद उपलब्ध कराना है। हमारी कंपनी समाज की बुनियादी आवश्यकताओं, जैसे <span className="font-semibold">रोटी, कपड़ा, और मकान</span> को पूरा करने के लिए प्रयासरत है।
                      </p>
                      <p className="text-gray-800 leading-relaxed">
                      कंपनी के साथ जुड़ने वाले लोगों को भी लाभ पहुँचाना हमारा मुख्य उद्देश्य है। हम <span className="font-bold">सशक्त इन्फ्रास्ट्रक्चर</span> बनाने और अर्जित लाभ को अधिकतम रूप से उपभोक्ताओं तक पहुँचाने के लिए प्रतिबद्ध हैं।
                      </p>
                      <p className="text-gray-800 font-bold italic mt-4">"आपका सहयोग हमारी सफलता की कुंजी है।"</p>

                    
                    </div>
                  </div>

                  <div className="col-lg-4 align-items-start">
                    <Img src={md_sandeep} alt="" style={{ border: '2px solid', borderRadius: '2px' }}  />
                    <p className="bg-yellow-100  p-4 border-l-4 border-gray-300 italic first-letter:text-4xl first-letter:font-bold"> संदीप श्रीवास्तव जी को साकेत यूनिवर्सिटी से बी. कॉम. की डी. श्री. प्राप्त है।
                      रियल स्टेल और रिटेल सेक्टर में 15 वर्षों से अधिक का अनुभव प्राप्त है। विगत
                      15 वर्षों में कई प्रोजेक्ट सफलतापूर्वक किए हैं।</p>

                  </div>
                </section>


                <section className="row">
                  <div className="col-lg-6 align-items-start">
                    <Img src={about11} alt="" style={{ border: '2px solid', borderRadius: '2px' }}  />
                  </div>
                  <div className="col-lg-6 align-items-start">
                      <p className="mb-25 text-justify">
                        Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.)
                        is new in its business with vast experience on a similar
                        line. Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt.
                        Ltd.) is the fast-growing online grocery supermarket in
                        the north of India. Our concise company policy is to
                        deliver its services on doorsteps at a comparably lower
                        rate with respect to the open market, Deliver on time,
                        and commodities being in their natural condition.
                        Consumers can access the site online or through an app
                        on their mobile phones.
                      </p>
                      <p className="mb-50">
                        This E-Commerce company was launched in the year 2019.
                        GHARGHARBAZAAR was founded by Pradeep Srivastava, A
                        dynamic and energetic personality having vast experience
                        in e-commerce business and raised from ground in light
                        of the perspective business. Ghargharbazaar (A Unit Of
                        DRV Ghar Ghar Bazar Pvt. Ltd.) headquartered in Lucknow
                        and have firm decision to expand its business from here
                        to every corner of India and would deliver its services
                        to various cities in India in coming future.
                      </p>                      
                   </div>
                 
                    <div className=""><p className="bg-gray-100 p-4 border-l-4 border-gray-300 italic first-letter:text-4xl first-letter:font-bold">
                    <strong>“Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.)”</strong> was launched at a time when India's busy 
                    workforce in cities was finding it difficult to allocate time to buy groceries and home essentials. 
                    <strong>“Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.)”</strong> gives them the flexibility to place 
                    their order any time and get the things delivered at their preferred timing.
                    <strong>“Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.)”</strong> offers Groceries and Food supplies in various 
                    categories such as Fruits & Vegetables, Food Grains, Oil, Spices, Bakery items, Beverages, Branded Foods, Personal Care 
                    products, Household supplies, Eggs, Meat, Fish, etc. 
                    <strong>“Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.)”</strong> currently offers more than 10,000 products 
                    across various categories and features more than 500 brands in its catalogue. 
                    <strong>“Ghargharbazaar (A Unit Of DRV Ghar Ghar Bazar Pvt. Ltd.)”</strong> comes with the promise of lowest rates and 
                    prompt delivery services.
                  </p>
                  </div>
                </section>


                <section className="text-center mb-50">
                  <h2
                    className="title style-3 mb-40"
                    style={{ fontSize: "40px" }}
                  >
                    History
                  </h2>
                  <p>
                    Though Ghargharbazaar (A Unit Of Guruvardaan Consumer
                    Products Pvt. Ltd.) has started the business in 2019 its
                    idea of customer services and best price availability is as
                    much old as the experience of its founder. It is about 25
                    years of group experience of its founder. Outputs during
                    this time span given by its founder prove that he has always
                    established a mindset of customer services with the lowest
                    profitability. Branding, sales, and being stayed in a
                    competitive market is his additional quality. His previous
                    business did quite well and served in-country. The company
                    currently have well-equipped office and delivery facility to
                    serve our customers well.
                  </p>
                </section>
                <section className="row align-items-center mb-50">
                  <div className="row mb-50 align-items-center">
                    <div className="col-lg-7 pr-30">
                      <Img
                        src={about33}
                        alt=""
                        className="mb-md-3 mb-lg-0 mb-sm-4"
                      />
                    </div>
                    <div className="col-lg-5">

                  <p className="">  
                      अब हमारी बारी
                      GHAR GHAR BAZAAR PVT LTD
                      घर घर बाजार क्या है ? घर घर बाजार एक सुपर मेगा मार्ट है।
                      घर घर बाजार अन्य सुपर मेगा मार्ट से कैसे अलग है। </p>


                    <p class="bg-yellow-100 p-4 font-bold">
                      आधुनिक दुनिया में नई-नई तकनीकों का आगमन हो रहा है, स्टोर का रूपांतरण हो रहा है। एक छत के नीचे सभी प्रोडक्ट उपलब्ध होते हैं और ग्राहकों को अनेक सुविधाएं और बम्पर छूट प्राप्त होती हैं। इस प्रकार, हर कंपनी अपने स्टोर खोल रही है और ग्राहकों को आकर्षित करने का प्रयास कर रही है। FMCG सेक्टर एक बड़ा अवसर प्रस्तुत करता है, और भारत की शीर्ष 10 कंपनियां इस सेक्टर में मजबूती से काम कर रही हैं।
                    </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          {/* <section className="container mb-50 d-none d-md-block">
            <div className="row about-count">
              <div className="col-lg-1-5 col-md-6 text-center mb-lg-0 mb-md-5">
                <h1 className="heading-1">
                  <span className="count">12</span>+
                </h1>
                <h4>Glorious years</h4>
              </div>
              <div className="col-lg-1-5 col-md-6 text-center">
                <h1 className="heading-1">
                  <span className="count">36</span>+
                </h1>
                <h4>Happy clients</h4>
              </div>
              <div className="col-lg-1-5 col-md-6 text-center">
                <h1 className="heading-1">
                  <span className="count">58</span>+
                </h1>
                <h4>Projects complete</h4>
              </div>
              <div className="col-lg-1-5 col-md-6 text-center">
                <h1 className="heading-1">
                  <span className="count">24</span>+
                </h1>
                <h4>Team advisor</h4>
              </div>
              <div className="col-lg-1-5 text-center d-none d-lg-block">
                <h1 className="heading-1">
                  <span className="count">26</span>+
                </h1>
                <h4>Products Sale</h4>
              </div>
            </div>
          </section> */}
          {/* <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <section className="mb-50">
                  <h2
                    className="title style-3 mb-40 text-center"
                    style={{ fontSize: "40px" }}
                  >
                    Our Team
                  </h2>
                  <div className="row">
                    <div className="col-lg-4 mb-lg-0 mb-md-5 mb-sm-5">
                      <h6
                        className="mb-5 text-brand"
                        style={{ fontSize: "16px" }}
                      >
                        Our Team
                      </h6>
                      <h1 className="mb-30" style={{ fontSize: "48px" }}>
                        Meet Our Expert Team
                      </h1>
                    </div>
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="team-card">
                            <Img src={about6} alt="" />
                            <div className="content text-center">
                              <h4 className="mb-5" style={{ fontSize: "24px" }}>
                                H. Merinda
                              </h4>
                              <span>CEO & Co-Founder</span>
                              <div className="social-network mt-20">
                                <Link to="#">
                                  <Img src={iconFacebookBrand} alt="" />
                                </Link>
                                <Link to="#">
                                  <Img src={iconTwitterBrand} alt="" />
                                </Link>
                                <Link to="#">
                                  <Img src={iconInstagramBrand} alt="" />
                                </Link>
                                <Link to="#">
                                  <Img src={iconYoutubeBrand} alt="" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="team-card">
                            <Img src={about8} alt="" />
                            <div className="content text-center">
                              <h4 className="mb-5" style={{ fontSize: "24px" }}>
                                Dilan Specter
                              </h4>
                              <span>Head Engineer</span>
                              <div className="social-network mt-20">
                                <Link to="#">
                                  <Img src={iconFacebookBrand} alt="" />
                                </Link>
                                <Link to="#">
                                  <Img src={iconTwitterBrand} alt="" />
                                </Link>
                                <Link to="#">
                                  <Img src={iconInstagramBrand} alt="" />
                                </Link>
                                <Link to="#">
                                  <Img src={iconYoutubeBrand} alt="" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div> */}
        </div>
      </main>
      <LandingPageFooter classNameName="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
    </>
  );
};

export default AboutUsPage;
