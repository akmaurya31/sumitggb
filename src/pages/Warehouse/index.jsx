import React, { useEffect, useState } from 'react';

import { Img } from "components";
import LandingPageHeader from "components/LandingPageHeader";
import LandingPageFooter from "components/LandingPageFooter";

import warehouse from "../../styles/imgs/images/warehouse.webp";
import partner_express from "../../styles/imgs/images/partner-express.webp";
import partner_local from "../../styles/imgs/images/partner-local.webp";

import { connect } from 'react-redux';
// import { fetchData , postData} from '../../Actions/actions';

const WarehousePage = (props,{}) => {
    // const WarehousePage = () => {
    // useEffect(() => {
    //     fetchData('your-endpoint');
    //   }, [fetchData]);

    return (
        <>
            <LandingPageHeader />
            {/* {error && <p>Error: {error.message}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
            <main className="main pages">
                <div className="Warehouse container mt-2">
                    <div style={{ background: "linear-gradient(180deg,#F8CB46 0,#318616 100%)", height: "500px" }}>
                        <div className="row" style={{ padding: "40px" }}>
                            <div className="col-lg-6 col-md-6  col-sm-12">
                                <Img src={warehouse} style={{ maxWidth: '78%' }} />
                                <h2 className="text-white text-center" style={{ fontSize: "22px" }}>Warehouse partner</h2>
                            </div>
                            <div className="col-lg-6 col-md-6  col-sm-12  ">
                                <div className=" prt-form" style={{ backgroundColor: "#fff", borderRadius: "10px", margin: "20px", padding: "25px" }}>
                                    <h4 style={{ fontSize: "24px", fontWeight: "inherit" }}>Come bring orders to life</h4>
                                    <p>Earn more with a job in our warehouse</p>
                                    <div className="row">
                                        <div className="col-lg-6 form-group ">
                                            <input className="from-control input-sm" placeholder="Name" />
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <input className="from-control input-sm" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 form-group ">
                                            <select className="form-control input-sm">
                                                <option>City</option>
                                                <option>Pune</option>
                                                <option>Kanpur</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-6 form-group">
                                            <input className="from-control input-sm" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 form-group ">
                                            <select className="form-control input-sm">
                                                <option>Highest Qualification</option>
                                                <option>Pune</option>
                                                <option>Kanpur</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <button className="btn" style={{ background: "#000" }}>
                                            Contact me
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="justify-content-center" style={{ padding: "100px", fontWeight: "600" }}>
                        <h2 style={{ fontSize: "40px" }}>Join India’s most loved grocery shopping platform</h2>
                        <p className="mt-2" style={{ color: "#000" }}>Become a warehouse partner and get best in class pay, plus benefits like nutritious meals, transportation facility, provident fund – in addition to salary, medical insurance coverage and 14 days paid leaves for Covid!</p>
                    </div>

                    <div className="row" style={{ background: "linear-gradient(180deg,#F8CB46 0%,#318616 100%)", color: "#fff", height: "287px", margin: "0px 20px 0px 20px" }}>
                        <div className="col-lg-8">

                        </div>
                        <div className="col-lg-4 ">
                            <img src={partner_express} width="327px" />
                        </div>
                    </div>


                    <div className="row p-3">
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="card text-left rounded" style={{ background: "linear-gradient(180deg,#F8CB46 0%,#318616 100%)", color: "#fff" }}>
                                <img src={partner_local} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-white" style={{ fontSize: "20px" }}>Card title</h5>
                                    <p className="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="card text-left rounded" style={{ background: "linear-gradient(180deg,#F8CB46 0%,#318616 100%)", color: "#fff" }}>
                                <img src={partner_local} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-white" style={{ fontSize: "20px" }}>Card title</h5>
                                    <p className="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="card text-left rounded" style={{ background: "linear-gradient(180deg,#F8CB46 0%,#318616 100%)", color: "#fff" }}>
                                <img src={partner_local} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-white" style={{ fontSize: "20px" }}>Card title</h5>
                                    <p className="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6">
                            <div className="card text-left rounded" style={{ background: "linear-gradient(180deg,#F8CB46 0%,#318616 100%)", color: "#fff" }}>
                                <img src={partner_local} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title text-white" style={{ fontSize: "20px" }}>Card title</h5>
                                    <p className="card-text text-white">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ padding: "50px" }}>
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
                    <div className="row p-5">
                        <div className="col-lg-12 pb-3">
                            <h4 className="pb-2" style={{ fontSize: "24px", fontWeight: "600" }}>#1 instant delivery service in India</h4>
                            <p>Shop on the go and get anything delivered in minutes. Buy everything from groceries to fresh fruits & vegetables, cakes and bakery items, to meats & seafood, cosmetics, mobiles & accessories, electronics, baby care products and much more. We get it delivered at your doorstep in the fastest and the safest way possible.</p>
                        </div>
                        <div className="col-lg-12 pb-3" style={{ fontSize: "24px", fontWeight: "600" }}>
                            <h4 className="pb-2">#1 instant delivery service in India</h4>
                            <p>Shop on the go and get anything delivered in minutes. Buy everything from groceries to fresh fruits & vegetables, cakes and bakery items, to meats & seafood, cosmetics, mobiles & accessories, electronics, baby care products and much more. We get it delivered at your doorstep in the fastest and the safest way possible.</p>
                        </div>
                        <div className="col-lg-12 pb-3" style={{ fontSize: "24px", fontWeight: "600" }}>
                            <h4 className="pb-2">#1 instant delivery service in India</h4>
                            <p>Shop on the go and get anything delivered in minutes. Buy everything from groceries to fresh fruits & vegetables, cakes and bakery items, to meats & seafood, cosmetics, mobiles & accessories, electronics, baby care products and much more. We get it delivered at your doorstep in the fastest and the safest way possible.</p>
                        </div>
                    </div>
                </div>
            </main>
            <LandingPageFooter />
        </>
    );
};
// const mapStateToProps = (state) => ({
//     count: state.count,
//     data: state.data,
//     loading: state.loading,
//     error: state.error,
//   });
  
//   const mapDispatchToProps = {
//     fetchData,
//   };
// export default connect(mapStateToProps, mapDispatchToProps)(WarehousePage);
export default WarehousePage;