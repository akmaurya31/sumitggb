import React from "react";

import { Button, Img, Input, Line, List, Text } from "components";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import contact2 from "../../styles/imgs/page/contact-2.png";
import { Link } from "react-router-dom";
import Breadcrumb from "components/Breadcrumb";

const DisclaimerPage = () => {
  return (
    <>
      <LandingPageHeader />
      <main className="main pages">
        <div className="container-fluid">
          <Breadcrumb activepage={"Shipping Discliamer"} />
        </div>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                      <div className="single-header style-2">
                        <h2 style={{ fontSize: "40px", fontWeight: "700" }}>
                          SHIPPING DISCLIAMER
                        </h2>
                        <div className="entry-meta meta-1 meta-3 font-xs mt-15 mb-15">
                          <span className="post-by">
                            By{" "}
                            <Link to="#" style={{ color: "#0c831f" }}>
                              Ghar Ghar Bazaar
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="single-content mb-50">
                      <p className="">
  We strive to deliver products purchased from <span className="font-bold text-blue-600">Ghargharbazaar</span> in excellent condition and in the fastest time possible. A shipping charge will be applicable according to <span className="font-bold text-blue-600">Ghargharbazaar shipping policies</span>.
  <br /><br />
  If the order is <span className="font-bold text-red-500">cancelled, lost, or un-delivered</span> to your preferred location, we will refund the complete order amount including any shipping charges, if paid online.
  <br /><br />
  If you return an order delivered to you, <span className="bg-yellow-200 px-1">order shipping charges will not be refunded</span>. However, if you self-ship your returns, we will reimburse self-shipment charges based on <span className="font-bold text-blue-600">Dadanani's Returns Policy</span>.
  <br /><br />
  <p className="italic">*Order value is calculated after applying <span className="font-bold text-blue-600">discounts/VAT/GST</span> or any other applicable charges.</p>
</p>

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

export default DisclaimerPage;
