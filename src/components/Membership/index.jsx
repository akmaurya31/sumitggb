// import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import "../MemberShipPlans/MemberShipPlans.scss"
const Membership = (props) => {
  // console.log("props.data", props);

  return (
    <>
      <div className="membershipdata" style={{ margin: "0" }}>
        {props.data.idmembership_plan == 1 && (
          <>
            <h4 className="member-headeing ">Instant Discount </h4>
            <div
              className="row"
              style={{ fontSize: "10px", color: "#000000", marginTop: "23px" }}
            >
              <div className="flex flex-col justify-center items-center gap-8 w-full">
                <div className="dis-label text center flex justify-center">
                  SAVE 10%
                </div>
                <div className="dis-example-label">
                  <div className="flex justify-between pl-2 pr-2">
                    <span>Tata Namak MRP</span>
                    <span>₹20</span>
                  </div>
                  <div className="flex justify-between pl-2 pr-2">
                    <span>
                      Discount <b>(10%)</b>
                    </span>
                    <span>₹2</span>
                  </div>
                  <div className="flex justify-between pl-2 pr-2">
                    <span>Net Price</span>
                    <span>₹18</span>
                  </div>

                </div>

              </div>
              {/* <Link to={'/instant-discount-plan'} style={{ marginTop: 6.5, textAlign: 'center', color: '#0C8324' }} className="font-semibold moreLink">MORE INFO</Link> */}
              {/* <div className="col-md-4">
                <div style={{ marginTop: "15px" }}>
                  {props.data.description}
                  <p></p>
                  <div>Discount : {props.data.commission}%</div>
                </div>
              </div> */}
            </div>
          </>
        )}
        {props.data.idmembership_plan == 2 && (
          <>
            <h4 className="member-headeing">Product Cashback</h4>
            <div
              className="row"
              style={{ fontSize: "10px", color: "#000000", marginTop: "23px" }}
            >
              <div className="flex flex-col justify-center items-center gap-8 w-full">
                <div className="dis-label text center flex justify-center">
                  SAVE 15%
                </div>
                <div className="dis-example-label">
                  <div className="flex justify-between pl-2 pr-2">
                    <span>Tata Namak MRP</span>
                    <span>₹20</span>
                  </div>
                  <div className="flex justify-between pl-2 pr-2">
                    <span>
                      Discount <b>(15%)</b>
                    </span>
                    <span>₹3</span>
                  </div>
                  <div className="flex justify-between pl-2 pr-2">
                    <span>Net Price</span>
                    <span>₹17</span>
                  </div>
                </div>
              </div>
              {/* <Link to={'/product-discount-plan'} style={{ marginTop: 6.5, textAlign: 'center', color: '#0C8324' }} className="font-semibold moreLink">MORE INFO</Link> */}
              {/* <div className="col-md-4">
               <div style={{ marginTop: "15px" }}>
                 {props.data.description}
                 <p></p>
                 <div>Discount : {props.data.commission}%</div>
               </div>
             </div> */}
            </div>
          </>

        )}

        {props.data.idmembership_plan == 3 && (
          <>
            <h4 className="member-headeing">Land Cashback</h4>
            <div
              className="row"
              style={{ fontSize: "10px", color: "#000000", marginTop: "23px" }}
            >
              <div className="flex flex-col justify-center items-center gap-8 w-full">
                <div className="dis-label text center flex justify-center">
                  SAVE 20%
                </div>
                <div className="dis-example-label">
                  <div className="flex justify-between pl-2 pr-2">
                    <span>Tata Namak MRP</span>
                    <span>₹20</span>
                  </div>
                  <div className="flex justify-between pl-2 pr-2">
                    <span>
                      Discount <b>(20%)</b>
                    </span>
                    <span>₹4</span>
                  </div>
                  <div className="flex justify-between pl-2 pr-2">
                    <span>Net Price</span>
                    <span>₹16</span>
                  </div>
                </div>
              </div>
              {/* <Link to={'/land-discount-plan'} style={{marginTop:6.5,textAlign:'center',color:'#0C8324'}} className="font-semibold moreLink">MORE INFO</Link> */}
              {/* <div className="col-md-4">
              <div style={{ marginTop: "15px" }}>
                {props.data.description}
                <p></p>
                <div>Discount : {props.data.commission}%</div>
              </div>
            </div> */}
            </div>
          </>

        )}

        {props.data.idmembership_plan == 4 && (
          <>
            <h4 className="member-headeing">Co-Partner Cashback</h4>
            <div
              className="row"
              style={{ fontSize: "10px", color: "#000000", marginTop: "23px" }}
            >
              <div className="flex flex-col justify-center items-center gap-8 w-full">
                <div className="dis-label text center flex justify-center">
                  SAVE 25%
                </div>
                <div className="dis-example-label">
                  <div className="flex justify-between pl-2 pr-2">
                    <span>Tata Namak MRP</span>
                    <span>₹20</span>
                  </div>
                  <div className="flex justify-between pl-2 pr-2">
                    <span>
                      Discount <b>(25%)</b>
                    </span>
                    <span>₹5</span>
                  </div>
                  <div className="flex justify-between pl-2 pr-2">
                    <span>Net Price</span>
                    <span>₹15</span>
                  </div>
                </div>
              </div>
              {/* <Link to={'/copartner-discount-plan'} style={{marginTop:6.5,textAlign:'center',color:'#0C8324'}} className="font-semibold moreLink">MORE INFO</Link> */}
              {/* <div className="col-md-4">
               <div style={{ marginTop: "15px" }}>
                 {props.data.description}
                 <p></p>
                 <div>Discount : {props.data.commission}%</div>
               </div>
             </div> */}
            </div>
          </>
        )}



      </div>
    </>
  );
};

export default Membership;
