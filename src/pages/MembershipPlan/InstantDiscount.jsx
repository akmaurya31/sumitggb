import {CardMember} from "components/Cards";
import { FaCheck } from "react-icons/fa6";
const InstantDiscount = () => {
  return (
    <>
      {/* <LandingPageHeader /> */}
      <div className="main pages">
        <div className="">
          <div
            style={{
              background: "linear-gradient(180deg,#F8CB46 0,#318616 100%)",
            }}
          >
            <div className="container-fluid">
              <div className="flex items-center" style={{ padding: "40px" }}>
                <div className="col-lg-6 col-md-6  col-sm-12">
                  <h2
                    className="text-white"
                    style={{ fontSize: 60, textAlign: "center" }}
                  >
                    Instant wish Basket Discount
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
                      Instant wish Basket Discount
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
                    <span>Discount(10%)</span> 2 Rs
                  </div>
                  =
                  <div className="flex flex-col ">
                    <span>Net Price</span> 18 Rs
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
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "4vh" }}></div>

      <div className="container-fluid" style={{ maxWidth: 1100, margin: "0px auto" }}>
        <h3>उदाहरण</h3>
        <div className="grid grid-cols-12 gap-4 py-6">

          <div className="col-span-4">
            <CardMember className="p-6">
            <div className="flex justify-between">
              <h4>टाटा नमक MRP</h4>
              <h4>20 Rs</h4>
            </div>
            <div className="flex justify-between">
              <h6>Discount 10%</h6>
              <h6>2 Rs</h6>
            </div>
            <div className="flex justify-between">
              <h6>Net Price </h6>
              <h6>18 Rs</h6>
            </div>
            </CardMember>
          </div>
          <div className="col-span-8">
          <CardMember className="p-6">
              {[
                "Instant wish Basket में ग्राहक को तुरन्त छूट मिल जाता है",
                "Discount के बाद ग्राहक को शेष राशि देना होगा |",
                "Instant wish Basket में हर प्रोडक्ट पर अलग-अलग Discount मिलता है जो Product खरीदते समय ग्राहक को मिल जाता है |",
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
    </>
  );
};

export default InstantDiscount;
