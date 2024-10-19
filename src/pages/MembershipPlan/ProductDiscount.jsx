import { CardMember } from "components/Cards";
import { FaCheck } from "react-icons/fa6";
const ProductDiscount = () => {
  return (
    <>
      {/* <LandingPageHeader /> */}
      <main className="main pages pt-0">
        <div
          style={{
            background: "linear-gradient(180deg,#F8CB46 0,#318616 100%)",
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6  col-sm-12 flex justify-center items-center">
                <h2
                  className="text-white"
                  style={{ fontSize: 60, textAlign: "center" }}
                >
                  Product Cashback
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
                    Product Cashback
                  </h4>
                  <p>membership related query</p>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group mb-3 ">
                      <input
                        className="from-control input-sm"
                        placeholder="Name"
                      />
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group mb-3">
                      <input
                        className="from-control input-sm"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-sm-12 form-group mb-3 ">
                      <select className="form-control input-sm">
                        <option>City</option>
                        <option>Pune</option>
                        <option>Kanpur</option>
                      </select>
                    </div>
                    <div className="col-lg-6 col-sm-12 form-group mb-3">
                      <input
                        className="from-control input-sm"
                        placeholder="Phone"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 form-group mb-3">
                      <textarea
                        className="from-control input-sm"
                        placeholder="Query"
                        rows={1}
                        cols={1}
                        style={{ minHeight: 120 }}
                      />
                    </div>
                  </div>
                  <div className="row mt-1">
                    <button className="btn text-white bg-black">
                      Contact me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-fluid"
          style={{ maxWidth: 1100, margin: "0px auto" }}
        >
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
                  <span>Discount(15%)</span> 3 Rs
                </div>
                =
                <div className="flex flex-col ">
                  <span>Net Price</span> 17 Rs
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
                  empower thousands of local entrepreneurs to serve the needs of
                  millions of Indians
                </div>
                <div
                  className="flex items-start gap-2"
                  style={{ fontSize: 16 }}
                >
                  <FaCheck style={{ color: "#253D4E" }} />
                  We believe that our tech stack and operational backbone can
                  empower thousands of local entrepreneurs to serve the needs of
                  millions of Indians
                </div>
                <div
                  className="flex items-start gap-2"
                  style={{ fontSize: 16 }}
                >
                  <FaCheck style={{ color: "#253D4E" }} />
                  We believe that our tech stack and operational backbone can
                  empower thousands of local entrepreneurs to serve the needs of
                  millions of Indians
                </div>
                <div
                  className="flex items-start gap-2"
                  style={{ fontSize: 16 }}
                >
                  <FaCheck style={{ color: "#253D4E" }} />
                  We believe that our tech stack and operational backbone can
                  empower thousands of local entrepreneurs to serve the needs of
                  millions of Indians
                </div>
                <div
                  className="flex items-start gap-2"
                  style={{ fontSize: 16 }}
                >
                  <FaCheck style={{ color: "#253D4E" }} />
                  We believe that our tech stack and operational backbone can
                  empower thousands of local entrepreneurs to serve the needs of
                  millions of Indians
                </div>
              </div>
            </div>
            <div className="mt-8 Landing-border gap-3 flex flex-col">
              <h3 style={{ color: "rgb(49, 134, 22)", fontSize: 27 }}>
                Available Brands
              </h3>
              <div className="flex gap-3 items-center flex-wrap">
                <div className="brand-chip">LG</div>
                <div className="brand-chip">Samsung</div>
                <div className="brand-chip">Sony</div>
                <div className="brand-chip">Panasonic</div>
                <div className="brand-chip">Bajaj</div>
                <div className="brand-chip">Tota</div>
                <div className="brand-chip">LG</div>
                <div className="brand-chip">Samsung</div>
                <div className="brand-chip">Sony</div>
                <div className="brand-chip">Panasonic</div>
                <div className="brand-chip">Bajaj</div>
                <div className="brand-chip">Tota</div>
              </div>
            </div>
            <div className="mt-8 Landing-border gap-3 flex flex-col">
              <h3 style={{ color: "rgb(49, 134, 22)", fontSize: 27 }}>
                Available Products
              </h3>
              <div className="flex gap-3 items-center flex-wrap">
                <div className="brand-chip">T.V</div>
                <div className="brand-chip">Refrigerator</div>
                <div className="brand-chip">Washing Machine</div>
                <div className="brand-chip">Mixi</div>
                <div className="brand-chip">Bajaj</div>
                <div className="brand-chip">AC</div>

                <div className="brand-chip">T.V</div>
                <div className="brand-chip">Refrigerator</div>
                <div className="brand-chip">Washing Machine</div>
                <div className="brand-chip">Mixi</div>
                <div className="brand-chip">Bajaj</div>
                <div className="brand-chip">AC</div>
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
                  <h6>Discount 15%</h6>
                  <h6>3 Rs</h6>
                </div>
                <div className="flex justify-between">
                  <h6>Net Price </h6>
                  <h6>17 Rs</h6>
                </div>
              </CardMember>
            </div>
            <div className="col-span-8">
              <CardMember className="p-6">
                {[
                  "Product wish Basket में ग्राहक को Ewallet Account में जमा हो जाती है |",
                  "ग्राहक को प्रोडक्ट का Basic Price देना होगा बिना Discount के |",
                  "ग्राहक अपने Ewallet Account से मनचाहे ब्राण्ड का मनचाहा इलेक्ट्रानिक्स प्रोडक्ट ले सकता है |",
                  "इलेक्ट्रानिक प्रोडक्ट 1000 रुपये 200000 (दो लाख रुपये) तक उपलब्ध है जिसकी लिस्ट नीचे दी गयी है ",

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

        <div className="container-fluid"  style={{ maxWidth: 1100, margin: "0px auto" }}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'Brand', desc: 'LG, Samsung, Sony, Panasonic, Bajaj, Tota' },
              { title: 'Product', desc: 'T.V, Refrigerator, Washing Machine, Mixi, AC' },
            ].map((db) => (
              <div className="mb-3 w-full shadow-sm p-2 px-3">
                <h4 className="text-green-600 mb-1 font-semibold">{db.title}</h4>
                <h6 className="mb-0 text-lg">{db.desc}</h6>
              </div>
            ))}
          </div>
        </div>



      </main>
      <div style={{ width: "100%", height: "4vh" }}></div>
    </>
  );
};

export default ProductDiscount;
