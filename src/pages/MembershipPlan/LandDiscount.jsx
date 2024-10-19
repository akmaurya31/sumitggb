import { FaCheck } from "react-icons/fa6";
import Dimond from "assets/images/dimond.png";
import Gold from "assets/images/gold2.png";
import Silver from "assets/images/silver1.png";
import { Img } from "components";
import { CardMember } from "components/Cards";
const LandDiscount = () => {
  return (
    <>
      {/* <LandingPageHeader /> */}
      <main className="main pages">
        <div className="">
          <div
            style={{
              background: "linear-gradient(180deg,#F8CB46 0,#318616 100%)",
            }}
          >
            <div className="container">
              <div className="flex items-center" style={{ padding: "40px" }}>
                <div className="col-lg-6 col-md-6  col-sm-12">
                  <h2
                    className="text-white"
                    style={{ fontSize: 60, textAlign: "center" }}
                  >
                    Land wish Basket Discount
                  </h2>
                </div>
                <div className="col-lg-6 col-md-6  col-sm-12  ">
                  <div
                    className=" prt-form"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                      margin: "20px",
                      padding: "25px",
                    }}
                  >
                    <h4 style={{ fontSize: "24px", fontWeight: "inherit" }}>
                      Land wish Basket Discount
                    </h4>
                    <p>membership related query</p>
                    <div className="flex gap-2 mb-3">
                      <div className="col-lg-6 form-group ">
                        <input
                          className="from-control input-sm"
                          placeholder="Name"
                        />
                      </div>
                      <div className="col-lg-6 form-group">
                        <input
                          className="from-control input-sm"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div className="col-lg-6 form-group ">
                        <select className="form-control input-sm">
                          <option>City</option>
                          <option>Pune</option>
                          <option>Kanpur</option>
                        </select>
                      </div>
                      <div className="col-lg-6 form-group">
                        <input
                          className="from-control input-sm"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <div>
                      <textarea
                        className="from-control input-sm"
                        placeholder="Query"
                        rows={1}
                        cols={1}
                        style={{ minHeight: 120 }}
                      />
                    </div>
                    <div className="row mt-1">
                      <button className="btn" style={{ background: "#000" }}>
                        Contact me
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "3rem",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              color: "rgb(49, 134, 22)",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
            }}
          >
            <marquee>
              {" "}
              We believe that our tech stack and operational backbone can
              empower thousands of local entrepreneurs to serve the needs of
              millions of Indians
            </marquee>
          </div>
          <div className="" style={{ maxWidth: 1100, margin: "0px auto" }}>
            <div>
              <div className="mt-8 Landing-border gap-2 flex flex-col">
                <h3 style={{ color: "rgb(49, 134, 22)", fontSize: 27 }}>
                  Example
                </h3>
                <div className="flex gap-3 items-center">
                  <div className="flex flex-col ">
                    <span>Tata Namak(MRP)</span>20 Rs
                  </div>
                  -
                  <div className="flex flex-col ">
                    <span>Discount(15%)</span> 4 Rs
                  </div>
                  =
                  <div className="flex flex-col ">
                    <span>Net Price</span> 16 Rs
                  </div>
                </div>
              </div>
              <div className="flex flex-col  gap-2 Landing-border">
                <h3 style={{ color: "rgb(49, 134, 22)", fontSize: 27 }}>
                  Come with benifits
                </h3>
                <div className="flex flex-col pl-1 mt-2">
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                </div>
              </div>
              <div
                className="mt-8 Landing-border gap-4 flex flex-col"
                style={{ paddingLeft: 10 }}
              >
                <h3
                  style={{
                    color: "rgb(49, 134, 22)",
                    fontSize: 27,
                    textTransform: "capitalize",
                  }}
                >
                  PURCHASING CAPACITY CATEGORY WISE
                </h3>
                <div className="grid-table mt-5">
                  <div className="cat-table">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="cat-chip">Diamond</div>
                    </div>
                    <div className="text-sm text-center">
                      <div
                        className="flex gap-3"
                        style={{
                          borderTop: "1px solid",
                          borderBottom: "1px solid",
                        }}
                      >
                        <div style={{ width: 30 }}>S.N.</div>
                        <div style={{ width: 115 }}>Category</div>
                        <div style={{ width: 55 }}>Daily</div>
                        <div style={{ width: 55 }}>Monthly</div>
                      </div>
                      <div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>1</div>
                          <div style={{ width: 115 }}>Vegetables</div>
                          <div style={{ width: 55 }}>100</div>
                          <div style={{ width: 55 }}>3000</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>2</div>
                          <div style={{ width: 115 }}>FMCG</div>
                          <div style={{ width: 55 }}>200</div>
                          <div style={{ width: 55 }}>6000</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>3</div>
                          <div style={{ width: 115 }}>Dairy Product</div>
                          <div style={{ width: 55 }}>100</div>
                          <div style={{ width: 55 }}>3000</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>4</div>
                          <div style={{ width: 115 }}>Fruits & Dry Fruits</div>
                          <div style={{ width: 55 }}>100</div>
                          <div style={{ width: 55 }}>3000</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>5</div>
                          <div style={{ width: 115 }}>Medicine</div>
                          <div style={{ width: 55 }}>100</div>
                          <div style={{ width: 55 }}>3000</div>
                        </div>
                        <div
                          className="flex gap-3 font-normal "
                          style={{
                            borderTop: "1px solid",
                            borderBottom: "1px solid",
                          }}
                        >
                          <div style={{ width: 231, fontWeight: 700 }}>
                            Total
                          </div>
                          <div style={{ width: 55, fontWeight: 700 }}>
                            18000
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col mt-2">
                        <span>Average Discount 30%</span>
                        <span>5400 Rs</span>
                      </div>
                    </div>
                  </div>
                  <div className="cat-table">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="cat-chip">Gold</div>
                    </div>
                    <div className="text-sm text-center">
                      <div
                        className="flex gap-3"
                        style={{
                          borderTop: "1px solid",
                          borderBottom: "1px solid",
                        }}
                      >
                        <div style={{ width: 30 }}>S.N.</div>
                        <div style={{ width: 115 }}>Category</div>
                        <div style={{ width: 55 }}>Daily</div>
                        <div style={{ width: 55 }}>Monthly</div>
                      </div>
                      <div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>1</div>
                          <div style={{ width: 115 }}>Vegetables</div>
                          <div style={{ width: 55 }}>100</div>
                          <div style={{ width: 55 }}>3000</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>2</div>
                          <div style={{ width: 115 }}>FMCG</div>
                          <div style={{ width: 55 }}>150</div>
                          <div style={{ width: 55 }}>4500</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>3</div>
                          <div style={{ width: 115 }}>Dairy Product</div>
                          <div style={{ width: 55 }}>75</div>
                          <div style={{ width: 55 }}>2250</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>4</div>
                          <div style={{ width: 115 }}>Fruits & Dry Fruits</div>
                          <div style={{ width: 55 }}>75</div>
                          <div style={{ width: 55 }}>2250</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>5</div>
                          <div style={{ width: 115 }}>Medicine</div>
                          <div style={{ width: 55 }}>100</div>
                          <div style={{ width: 55 }}>3000</div>
                        </div>
                        <div
                          className="flex gap-3 font-normal "
                          style={{
                            borderTop: "1px solid",
                            borderBottom: "1px solid",
                          }}
                        >
                          <div style={{ width: 231, fontWeight: 700 }}>
                            Total
                          </div>
                          <div style={{ width: 55, fontWeight: 700 }}>
                            15000
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col mt-2">
                        <span>Average Discount 30%</span>
                        <span>4500 Rs</span>
                      </div>
                    </div>
                  </div>
                  <div className="cat-table">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div className="cat-chip">Silver</div>
                    </div>
                    <div className="text-sm text-center">
                      <div
                        className="flex gap-3"
                        style={{
                          borderTop: "1px solid",
                          borderBottom: "1px solid",
                        }}
                      >
                        <div style={{ width: 30 }}>S.N.</div>
                        <div style={{ width: 115 }}>Category</div>
                        <div style={{ width: 55 }}>Daily</div>
                        <div style={{ width: 55 }}>Monthly</div>
                      </div>
                      <div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>1</div>
                          <div style={{ width: 115 }}>Vegetables</div>
                          <div style={{ width: 55 }}>100</div>
                          <div style={{ width: 55 }}>3000</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>2</div>
                          <div style={{ width: 115 }}>FMCG</div>
                          <div style={{ width: 55 }}>100</div>
                          <div style={{ width: 55 }}>3000</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>3</div>
                          <div style={{ width: 115 }}>Dairy Product</div>
                          <div style={{ width: 55 }}>70</div>
                          <div style={{ width: 55 }}>2100</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>4</div>
                          <div style={{ width: 115 }}>Fruits & Dry Fruits</div>
                          <div style={{ width: 55 }}>70</div>
                          <div style={{ width: 55 }}>2100</div>
                        </div>
                        <div className="flex gap-3 font-normal">
                          <div style={{ width: 30 }}>5</div>
                          <div style={{ width: 115 }}>Medicine</div>
                          <div style={{ width: 55 }}>70</div>
                          <div style={{ width: 55 }}>2100</div>
                        </div>
                        <div
                          className="flex gap-3 font-normal "
                          style={{
                            borderTop: "1px solid",
                            borderBottom: "1px solid",
                          }}
                        >
                          <div style={{ width: 231, fontWeight: 700 }}>
                            Total
                          </div>
                          <div style={{ width: 55, fontWeight: 700 }}>
                            12300
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col mt-2">
                        <span>Average Discount 30%</span>
                        <span>3690 Rs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mt-8 Landing-border gap-4 flex flex-col"
              style={{ paddingLeft: 10 }}
            >
              <h3
                style={{
                  color: "rgb(49, 134, 22)",
                  fontSize: 27,
                  textTransform: "capitalize",
                }}
              >
                Plot Details
              </h3>
              <div className="grid-table mt-5">
                <div className="cat-table">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="cat-chip">Place</div>
                  </div>
                  <div className="text-sm text-center">
                    <div className="flex flex-col mt-2">
                      C-37, Sector -F, Parag Chauraha, near PNB ATM, LDA Colony,
                      Lucknow, 226012
                    </div>
                  </div>
                </div>
                <div className="cat-table">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="cat-chip">Rate</div>
                  </div>
                  <div className="text-sm text-center">
                    <div className="flex flex-col mt-2">
                      <span>
                        {" "}
                        Normal Plot - 1000 <br />
                        PLC Plot - 1100
                      </span>
                    </div>
                  </div>
                </div>
                <div className="cat-table">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="cat-chip">Plot Size</div>
                  </div>
                  <div className="text-sm text-center">
                    <div className="flex flex-col mt-2">
                      500, 800, 1000, 1250, 1500, 2000
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2" style={{ fontSize: 16 }}>
                <FaCheck style={{ color: "#253D4E" }} />
                We believe that our tech stack and operational backbone can
                empower thousands of local entrepreneurs to serve the needs of
                millions of Indians
              </div>
            </div>
            <div
              className="mt-8 Landing-border gap-4 flex flex-col"
              style={{ paddingLeft: 10 }}
            >
              <h3
                style={{
                  color: "rgb(49, 134, 22)",
                  fontSize: 27,
                  textTransform: "capitalize",
                }}
              >
                DIAMOND CUSTOMER
              </h3>
              <div className=" mt-5">
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Img src={Dimond} />
                  </div>
                  <div
                    style={{ maxWidth: 322, margin: "0px auto" }}
                    className="Landing-border mt-3"
                  >
                    <div className="flex w-full">
                      <span style={{ width: 235 }}>800x1000</span>
                      <span style={{ width: 50 }}>=</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                        800000
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>8 Year EMI </span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>96</span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>EMI Every Month</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                        8334
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>Ewallet Discount</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                        5400
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>Balance</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                        2934
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mt-8 Landing-border gap-4 flex flex-col"
              style={{ paddingLeft: 10 }}
            >
              <h3
                style={{
                  color: "rgb(49, 134, 22)",
                  fontSize: 27,
                  textTransform: "capitalize",
                }}
              >
                GOLD CUSTOMER
              </h3>
              <div className=" mt-5">
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Img src={Gold} style={{width:'70%'}}/>
                  </div>
                  <div
                    style={{ maxWidth: 322, margin: "0px auto" }}
                    className="Landing-border mt-3"
                  >
                    <div className="flex w-full">
                      <span style={{ width: 235 }}>500x1000 </span>
                      <span style={{ width: 50 }}>=</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                      500000
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>8 Year EMI </span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>96</span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>EMI Every Month</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                      5209
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>Aprox Ewallet Discount</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                      4500  
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>Balance</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                        709
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mt-8 Landing-border gap-4 flex flex-col"
              style={{ paddingLeft: 10 }}
            >
              <h3
                style={{
                  color: "rgb(49, 134, 22)",
                  fontSize: 27,
                  textTransform: "capitalize",
                }}
              >
                SILVER CUSTOMER
              </h3>
              <div className=" mt-5">
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Img src={Silver} style={{width:'50%'}}/>
                  </div>
                  <div
                    style={{ maxWidth: 322, margin: "0px auto" }}
                    className="Landing-border mt-3"
                  >
                    <div className="flex w-full">
                      <span style={{ width: 235 }}>500x1000 </span>
                      <span style={{ width: 50 }}>=</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                      500000
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>8 Year EMI </span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>96</span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>EMI Every Month</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                      5209
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>Aprox Ewallet Discount</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                      3690  
                      </span>
                    </div>
                    <div className="flex  w-full">
                      <span style={{ width: 235 }}>Balance</span>
                      <span style={{ width: 50 }}>-</span>
                      <span style={{ width: 63, textAlign: "right" }}>
                        1519
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col  gap-2 Landing-border">
                <h3 style={{ color: "rgb(49, 134, 22)", fontSize: 27 }}>
                 Important Note
                </h3>
                <div className="flex flex-col pl-1 mt-2">
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                  <div
                    className="flex items-start gap-2"
                    style={{ fontSize: 16 }}
                  >
                    <FaCheck style={{ color: "#253D4E" }} />
                    We believe that our tech stack and operational backbone can
                    empower thousands of local entrepreneurs to serve the needs
                    of millions of Indians
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="container-fluid"  style={{ maxWidth: 1100, margin: "0px auto" }}>
          <h3>उदाहरण</h3>
          <div className="grid grid-cols-12 gap-4 py-6">

            <div className="col-span-4">
              <CardMember className="p-6">
                <div className="flex justify-between">
                  <h4>टाटा नमक MRP</h4>
                  <h4>20 Rs</h4>
                </div>
                <div className="flex justify-between">
                  <h6>Discount 20%</h6>
                  <h6>4 Rs</h6>
                </div>
                <div className="flex justify-between">
                  <h6>Net Price </h6>
                  <h6>16 Rs</h6>
                </div>
              </CardMember>
            </div>
            <div className="col-span-8">
              <CardMember className="p-6">
                {[
                  "Land wish Basket Discount ",
                  "",
                  "",
                  "",
                 

                ].map((db) => (
                  <div className="flex items-start gap-2">
                    <div className="w-5">
                      <FaCheck style={{ color: "#253D4E" }} />
                    </div>
                    <h6>{db}</h6>
                  </div>
                ))}
              </CardMember>
            </div>
          </div>
        </div>


      </main>
      <div style={{ width: "100%", height: "4vh" }}></div>
    </>
  );
};

export default LandDiscount;
