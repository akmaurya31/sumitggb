import React from "react";

import { Button, Img, Input, Line, List, Text } from "components";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import contact2 from "../../styles/imgs/page/contact-2.png";
import { Link } from "react-router-dom";
import "./Contact.scss";
import Breadcrumb from "components/Breadcrumb";
import { useSelector } from "react-redux";

const ContactPagePage = () => {
  const address = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );

  // console.log("address", address)
  return (
    <>
      <LandingPageHeader />
      <main className="main pages">
        <div className="container-fluid">
          <Breadcrumb activepage={"Contact Us"} />
        </div>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <section className="row align-items-end mb-50">
                  <div className="col-lg-12 mb-lg-0 mb-md-5 mb-sm-5">
                    <h4
                      className="mb-20 text-brand"
                      style={{ fontSize: "24px" }}
                    >
                      How can help you ?
                    </h4>
                    <h1 className="mb-30" style={{ fontSize: "40px" }}>
                      Let us know how we can help you
                    </h1>
                    <p className="">
  <span className="font-bold text-blue-600">Ghar Ghar Bazaar</span> (A Unit Of Guruvardaan Consumer Products Pvt. Ltd.) is new in its business with vast experience on a similar line. 
  <span className="font-bold text-blue-600">Ghar Ghar Bazaar</span> (A Unit Of Guruvardaan Consumer Products Pvt. Ltd.) is the fast-growing online grocery supermarket in the north of India. Our concise company policy is to deliver its services on doorsteps at a comparably lower rate with respect to the open market, deliver on time, and commodities being in their natural condition. Consumers can access the site online or through an app on their mobile phones.
  <br /><br />
  This E-Commerce company was launched in the year <span className="font-bold text-red-500">2019</span>. <span className="font-bold text-blue-600">Ghar Ghar Bazaar</span> was founded by <span className="font-bold text-green-600">Pradeep Srivastava</span>, a dynamic and energetic personality having vast experience in e-commerce business and raised from ground in light of the perspective business. <span className="font-bold text-blue-600">Ghar Ghar Bazaar</span> (A Unit Of Guruvardaan Consumer Products Pvt. Ltd.) headquartered in Lucknow and have a firm decision to expand its business from here to every corner of India and would deliver its services to various cities in India in the coming future.
  <br /><br />
  <span className="font-bold text-blue-600">Ghar Ghar Bazaar</span> (A Unit Of Guruvardaan Consumer Products Pvt. Ltd.) was launched at a time when India’s busy workforce in cities was finding it difficult to allocate time to buy groceries and home essentials. <span className="font-bold text-blue-600">Ghar Ghar Bazaar</span> giving them the flexibility to place their order any time and get the things delivered at their preferred timing. 
  <br /><br />
  <span className="bg-yellow-200 px-1">Ghar Ghar Bazaar offers Groceries and Food supplies in various categories</span> such as Fruits &amp; Vegetables, Food Grains, Oil, Spices, Bakery items, Beverages, Branded Foods, Personal Care products, Household supplies, Eggs, Meat, Fish, etc. 
  <br /><br />
  <span className="font-bold text-blue-600">Ghar Ghar Bazaar</span> currently offers more than <span className="bg-yellow-200 px-1">10,000 products</span> across various categories and features more than <span className="bg-yellow-200 px-1">500 brands</span> in its catalogue. <span className="font-bold text-blue-600">Ghar Ghar Bazaar</span> comes with the promise of lowest rates and prompt delivery services.
</p>

                  </div>
                  {/* <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-6 mb-4">
                        <h5 className="mb-20" style={{ fontSize: "20px" }}>01. Visit Feedback</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                      </div>
                      <div className="col-lg-6 mb-4">
                        <h5 className="mb-20" style={{ fontSize: "20px" }}>02. Employer Services</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                      </div>
                      <div className="col-lg-6 mb-lg-0 mb-4">
                        <h5 className="mb-20 text-brand" style={{ fontSize: "20px" }}>03. Billing Inquiries</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                      </div>
                      <div className="col-lg-6">
                        <h5 className="mb-20" style={{ fontSize: "20px" }}>04.General Inquiries</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                      </div>
                    </div>
                  </div> */}
                </section>
              </div>
            </div>
          </div>
          <section className="container-fluid mb-50 d-none 11d-md-block">
            <div className="border-radius-15 overflow-hidden">
              <div id="map-panes" className="leaflet-map"></div>
            </div>
          </section>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <section className="mb-20">
                  <div className="row">
                    {address &&
                      address.map((db, index) => (
                        <div className="col-md-4 mb-4 ">
                          <h4
                            className="mb-15 text-brand"
                            style={{ fontSize: "24px" }}
                          >
                            {db.name}
                          </h4>
                          <p className="mb-1">{db.address}</p>
                          <abbr title="Phone">Phone:</abbr> {db.contact}
                          <br />
                        </div>
                      ))}

                    {/* <div className="col-md-4 mb-4 mb-md-0">
                      <h4 className="mb-15 text-brand" style={{ fontSize: "24px" }}>Studio</h4>
                      205 North Michigan Avenue, Suite 810<br />
                      Chicago, 60601, USA<br />
                      <abbr title="Phone">Phone:</abbr> (123) 456-7890<br />
                      <abbr title="Email">Email: </abbr><Link to="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="25464a4b514446516560534457440b464a48">[email&#160;protected]</Link><br />
                      <Link to='' className="btn btn-sm font-weight-bold mt-20 border-radius-5 btn-shadow-brand hover-up"><i className="fi-rs-marker mr-5"></i>View map</Link>
                    </div>
                    <div className="col-md-4">
                      <h4 className="mb-15 text-brand" style={{ fontSize: "24px" }}>Shop</h4>
                      205 North Michigan Avenue, Suite 810<br />
                      Chicago, 60601, USA<br />
                      <abbr title="Phone">Phone:</abbr> (123) 456-7890<br />
                      <abbr title="Email">Email: </abbr><Link to="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="d5b6babba1b4b6a19590a3b4a7b4fbb6bab8">[email&#160;protected]</Link><br />
                      <Link to='' className="btn btn-sm font-weight-bold mt-20 border-radius-5 btn-shadow-brand hover-up"><i className="fi-rs-marker mr-5"></i>View map</Link>
                    </div> */}
                  </div>
                  {/* <div className="row">
                    <div className="col-xl-8">
                      <div className="contact-from-area padding-20-row-col">
                        <h5 className="text-brand mb-10" style={{fontSize: "20px"}}>Contact form</h5>
                        <h2 className="mb-10" style={{fontSize: "40px"}}>Drop Us a Line</h2>
                        <p className="text-muted mb-30 font-sm">Your email address will not be published. Required fields are marked *</p>
                        <form className="contact-form-style mt-30" id="contact-form" action="#" method="post">
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input name="name" placeholder="First Name" type="text" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input name="email" placeholder="Your Email" type="email" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input name="telephone" placeholder="Your Phone" type="tel" />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="input-style mb-20">
                                <input name="subject" placeholder="Subject" type="text" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="textarea-style mb-30">
                                <textarea name="message" placeholder="Message"></textarea>
                              </div>
                              <Button className="submit submit-auto-width" type="submit">Send message</Button>
                            </div>
                          </div>
                        </form>
                        <p className="form-messege"></p>
                      </div>
                    </div>
                    <div className="col-lg-4 pl-50 d-lg-block d-none">
                      <Img className="border-radius-15 mt-50" src={contact2} alt="" />
                    </div>
                  </div> */}
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingPageFooter />
    </>
  );
};

export default ContactPagePage;
