import React from "react";
import { Link } from "react-router-dom";
// import { Button, Img, List, Text } from "components";
import LandingPageHeader from "components/LandingPageHeader";
import LandingPageFooter from "components/LandingPageFooter";
import Breadcrumb from "components/Breadcrumb";

import RefundContent from "./refundcontent.json";
import { useSelector } from "react-redux";

const RefundPage = () => {
  const dashboardData = useSelector(
    (state) => state?.DashboardReducer?.dashboardData?.data
  );


  const RefundTableData = [
    {
      type: "Refund",
      time_period_for_return: "1 Day",
      products: "Dairy Products",
    },
    {
      type: "Refund",
      time_period_for_return: "1 Day",
      products: "Eggs / Fruits / Vegetables",
    },
    {
      type: "Refund",
      time_period_for_return: "3 Day",
      products: "Non Food Products",
    },
    {
      type: "Refund",
      time_period_for_return: "3 Day",
      products: "Packaged Food Products",
    },
    {
      type: "Exchange",
      time_period_for_return: "14 Day",
      products: "Ladies Apparel",
    },
    {
      type: "Exchange",
      time_period_for_return: "14 Day",
      products: "Kids Apparel",
    },
    {
      type: "Exchange",
      time_period_for_return: "14 Day",
      products: "Men's Apparel",
    },
    {
      type: "Exchange",
      time_period_for_return: "14 Day",
      products: "Footwear",
    },
    {
      type: "Refund",
      time_period_for_return: "14 Day",
      products: "Kitchen Items",
    },
    {
      type: "Refund",
      time_period_for_return: "14 Day",
      products: "Wrong Product",
    },
    {
      type: "Refund",
      time_period_for_return: "14 Day",
      products: "Wrong Offer Applied",
    },
    {
      type: "Refund",
      time_period_for_return: "14 Day",
      products: "Defected or Damage",
    },
  ];

  const returnvalue = (type) => {
    if (type == "RET") {
      return "Return";
    }
    if (type == "EXCH") return "Exchange";
  };

  return (
    <>
      <LandingPageHeader />
      <main className="main pages">
        <div className="container-fluid">
          <Breadcrumb activepage={"Refund And Cancellation"} />
        </div>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                      <div className="single-header style-2">
                        <h2 style={{ fontSize: "26px", fontWeight: 600 }}>
                          GHAR GHAR BAZAAR CANCELLATION, RETURN AND REFUND
                          POLICY
                        </h2>
                        {/* <div className="entry-meta meta-1 meta-3 font-xs mt-15 mb-15">
                          <span className="post-by">
                            By <Link to="/">Ghar Ghar Bazaar</Link>
                          </span>
                        </div> */}
                      </div>
                      <div className="single-content mb-50">
                        {RefundContent &&
                          RefundContent.map((db, index) => {
                            // console.log("db", db.content)
                            return (
                              <ul
                                className="	cursor-default"
                                style={{ listStyle: "none", paddingLeft: 0 }}
                              >
                                <li className="cursor-default ">
                                  <span className="font-semibold">
                                    {db.id}. {db.title}
                                  </span>
                                  <ul
                                    className="list-decimal sm:pl-5 mt-2"
                                    style={{ listStyle: "none" }}
                                  >
                                    {db.content !== undefined &&
                                      db?.content.map((el, index) => (
                                        <li className="cursor-default flex gap-[5px]">
                                          <span>
                                            {db.id}.{index + 1}
                                          </span>{" "}
                                          <p className="mb-0">{el.desc}</p>
                                        </li>
                                      ))}
                                  </ul>
                                </li>
                              </ul>
                            );
                          })}
                        <div className="pl-[40px]">
                          <p className="mb-3">
                            For any feedback, concern or query, you may please
                            reach out to us on the below contact details:
                          </p>
                          <p className="mb-3">
                            Write to us on: customercare@ghargharbazaar.com
                          </p>
                          <p className="mb-3">Call us at: +91 9129730666</p>
                        </div>
                        {/* <p>
                          You can now cancel an order when it is in
                          packed/shipped status, as long as the cancel option is
                          available on Ghargharbazaar App/Website. This includes
                          items purchased on sale also. Any amount paid will be
                          credited into the same payment mode using which the
                          payment was made.
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-10 col-lg-12 m-auto">
                <div className="flex flex-col">
                  <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                          <thead>
                            <tr>
                              {[
                                { title: "Type", col: 3 },
                                { title: "Time Period for Return", col: 4 },
                                { title: "Category", col: 5 },
                              ].map((db) => (
                                <th
                                  scope="col"
                                  className="px-3 py-3 text-sm font-semibold text-gray-600 uppercase text-center"
                                >
                                  {db.title}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {dashboardData &&
                              dashboardData?.menuList.map((db, key) => (
                                <tr className="odd:bg-white even:bg-gray-100">
                                  <td className="px-3 py-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {returnvalue(db.return_type)}
                                  </td>
                                  <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {db?.return_duration > 0
                                      ? db?.return_duration + " Day"
                                      : db.return_type == "EXCH"
                                      ? "No Exchange"
                                      : "No Return"}
                                  </td>
                                  <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {db.name}
                                  </td>
                                </tr>
                              ))}
                            {/* {RefundTableData.map((db, key) => (
                              <tr className="odd:bg-white even:bg-gray-100">
                                <td className="px-3 py-3 text-center whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{db.type}</td>
                                <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{db.time_period_for_return}</td>
                                <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{db.products}</td>
                              </tr>
                            ))} */}
                          </tbody>
                        </table>
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

export default RefundPage;
