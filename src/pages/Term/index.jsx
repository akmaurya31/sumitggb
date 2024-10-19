import React from "react";
// import { useNavigate,Link } from "react-router-dom";
import { Link } from "react-router-dom";
// import { Button, Img, List, Text } from "components";
import LandingPageHeader from "components/LandingPageHeader";
import LandingPageFooter from "components/LandingPageFooter";
import Breadcrumb from "components/Breadcrumb";

const TermPage = () => {
  return (
    <>
      <LandingPageHeader />
      <main className="main pages ">
        <div className="container-fluid">
          <Breadcrumb activepage={"Terms and conditions"} />
        </div>
        <div className="page-content sm:pt-5 pt-11">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                      <div className="single-header style-2 ">
                        <h2
                          className="mb-8 leading-9"
                          style={{ fontSize: "40px", fontWeight: 600 }}
                        >
                          Terms and conditions
                        </h2>
                        <p className="text-sm mb-12">
                          Last updated on May 9, 2023
                        </p>
                        <div className="entry-meta meta-1 meta-3 font-xs mt-15 mb-15">
                          <span className="post-by">
                            By <Link to="/">Ghar Ghar Bazaar</Link>
                          </span>
                        </div>
                      </div>
                      <div className="single-content mb-50">
                        {/* <h4 style={{fontWeight:600}}>Terms & Conditions</h4>
                                                <p>Terms & Conditions</p> */}
                        <ol>
                          <li className="cursor-default">
                            Please check all items and cash along with offers
                            (if any) before leaving the delivery person. No
                            complaints will be entertained on later stages.
                          </li>
                          <li className="cursor-default">
                            Exchange would be entertained within 72 hours from
                            the date of billing along with bill. (No cash
                            refund).
                          </li>
                          <li className="cursor-default">
                            Toys, Gifts, Cosmetics & Undergarments will not be
                            exchangeable.
                          </li>
                          <li className="cursor-default">
                            Seasonal items are neither exchangeable nor
                            returnable.
                          </li>
                          <li className="cursor-default">
                            All disputes are subject to Lucknow Jurisdiction.
                          </li>
                          <li className="cursor-default">
                            Rules can be changed without any prior information.
                          </li>
                          <li className="cursor-default">
                            {" "}
                            For any suggestion or complaint please contact on
                            customer care No. +91- 7311187711
                          </li>
                          <li className="cursor-default">
                            For any online order booked the delivery charges
                            would be Rs 40/- up to single purchase of Rs 500/-.
                            No delivery charges for single purchase more than Rs
                            500/-.
                          </li>
                          <li className="cursor-default">
                            {" "}
                            If order dispatched from warehouse for delivery then
                            order cannot be cancelled, and company will add
                            booking cancellation charges Rs. 50/- from next
                            order.
                          </li>
                        </ol>
                      </div>
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

export default TermPage;
