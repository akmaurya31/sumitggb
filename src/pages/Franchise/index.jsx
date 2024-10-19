import React from "react";

import { Button, Img, List, Text } from "components";
import LandingPageHeader from "components/LandingPageHeader";
import LandingPageFooter from "components/LandingPageFooter";
import partner from '../../styles/imgs/images/partner.png';
import partnerExpress from '../../styles/imgs/images/partner-express.webp';
import partnerLocal from '../../styles/imgs/images/partner-local.webp';


const FranchisePage = () => {
    return (
        <>
            <LandingPageHeader />
            <main className="main pages">
                <div className="container-fluid mt-2">
                    <div style={{background: "linear-gradient(180deg,#F8CB46 0,#318616 100%)",height:"500px"}}>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 col-md-12  col-sm-12 justify-content-center">
                                <Img src={partner} />
                            </div>
                        </div>
                        <h2 className="text-white text-center">Shape the future of instant commerce</h2>
                    </div>
                    <div className="justify-content-center" style={{padding:"100px",fontWeight:"600"}}>
                        <h2>Come build with us</h2>
                        <p className="mt-2" style={{color:"#000"}}>We believe that our tech stack and operational backbone can empower thousands of local entrepreneurs to serve the needs of millions of Indians. Our vision of a marketplace where anyone can open their storefront on Blinkit, will enable us to deliver anything from groceries, to medicines, to beauty and health care products or even electronic items within minutes. For this we are looking for passionate entrepreneurs who want an opportunity to join the instant-commerce revolution in India. If this is exciting partner with us!</p>
                    </div>

                    <div className="row" style={{background:"linear-gradient(180deg,#F8CB46 0%,#318616 100%)",color:"#fff",height:"287px",margin:"0px 20px 0px 20px"}}>
                        <div className="col-lg-8">

                        </div>
                        <div className="col-lg-4 ">
                            <Img src={partnerExpress} width="327px" />
                        </div>
                    </div>


                    <div className="row p-3">
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="card text-left rounded" style={{background:"linear-gradient(180deg,#F8CB46 0%,#318616 100%)",color:"#fff"}}>
                                <Img src={partnerLocal} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-white">Card title</h5>
                                    <p className="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="card text-left rounded" style={{background:"linear-gradient(180deg,#F8CB46 0%,#318616 100%)",color:"#fff"}}>
                                <Img src={partnerLocal} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-white">Card title</h5>
                                    <p className="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="card text-left rounded" style={{background: "linear-gradient(180deg,#F8CB46 0%,#318616 100%)",color:"#fff"}}>
                                <Img src={partnerLocal} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-white">Card title</h5>
                                    <p className="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="card text-left rounded" style={{background: "linear-gradient(180deg,#F8CB46 0%,#318616 100%)",color:"#fff"}}>
                                <Img src={partnerLocal} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-white">Card title</h5>
                                    <p className="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{backgroundImage:"url(assets/imgs/partner-form.png)",backgroundSize:"cover",height:"500px"}}>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="text-center" style={{paddingTop:"200px"}}>
                                <h2>Got a cool brand and want to list it on <span style={{}}>Ghar Ghar Baazar</span>?</h2>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div style={{margin:"40px"}}>
                                <form>
                                    <div className="row prt-form" style={{backgroundColor:"#fff",borderRadius:"10px",margin:"30px",padding:"20px"}}>
                                        <div className="col-lg-12 form-group">
                                            <input className="from-control" placeholder="Name" />
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <input className="from-control" placeholder="Phone Number" />
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <input className="from-control" placeholder="E-mail Id" />
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <input className="from-control" placeholder="City" />
                                        </div>
                                        <div className="col-lg-12 form-group">
                                            <input className="from-control" placeholder="State" />
                                        </div>
                                        <button className="btn" style={{background:"#000"}}>
                                            Contact me
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{padding:"50px"}}>
                        <div className="col-lg-12">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Accordion Item #1
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Accordion Item #2
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Accordion Item #3
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <LandingPageFooter />
        </>
    );
};

export default FranchisePage;
