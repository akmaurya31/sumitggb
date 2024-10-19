import { Img } from "components";

import { Link } from "react-router-dom";
import vegicon from "../../styles/imgs/logo/vegicon.svg";
import ProductImage from "components/Product/ProductImage";
import "./ProductMembershipCard.scss";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ButtonLoader } from "components/Loader";
import AlertModal2 from "components/Alert/alert2";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const ProductMembershipCard = ({
  prd,
  idmembership_plan,
  item_id,
  token,
  isTokenExpired,
  quantity,
  addtocart,
  openModal,
  getMembership,
  toggleDrawerBottom,
  buttonLogin,
  isCartAdd
}) => {

  const [isMemberConfrm, setConfrm] = useState(false);
  const [isLoading, setLoading] = useState(false);

  //console.log(prd,"DDDD");
  
  
  const MemberCard = [
    // {
    //   id: 1,
    //   title: "Instant",
    //   urlkey: prd?.selected_batch?.copartner,
    //   instant: prd?.instant,
    //   membership_price: prd?.member_price[0]?.price,
    //   mrp: prd?.mrp,
    //   bg: "bg-orange-800",
    // },
    {
      id: 2,
      title: "Product",
      urlkey: prd?.selected_batch?.product,
      instant: prd?.instant,
      selling_price: prd?.selling_price,
      prodt_price: prd?.product,
      membership_price: prd?.member_price[1]?.price,
      mrp: prd?.mrp,
      bg: "bg-yellow-800",
    },
    {
      id: 3,
      title: "Land",
      urlkey: prd?.selected_batch?.land,
      instant: prd?.instant,
      selling_price: prd?.selling_price,
      prodt_price: prd?.land,
      membership_price: prd?.member_price[2]?.price,
      mrp: prd?.mrp,
      bg: "bg-green-800",
    },
    {
      id: 4,
      title: "Co-Partner",
      urlkey: prd?.selected_batch?.copartner,
      instant: prd?.instant,
      selling_price: prd?.selling_price,
      prodt_price: prd?.copartner,
      membership_price: prd?.member_price[3]?.price,
      mrp: prd?.mrp,
      bg: "bg-indigo-800",
    },
  ];


  
  
  return (
  <>
    <div className="product-membership-card bg-[#fff9dd]  rounded-xl 11mb-6 sm:pb-6">
      <div className="flex justify-between items-center 11mb-2 sm:mb-2 px-2 pt-2 shadow-sm">
       
        {toggleDrawerBottom !== undefined && (
          <CloseIcon
            className="mobile-view"
            onClick={toggleDrawerBottom(false)}
          />
        )}
      </div>
      
      <div className="grid sm:grid-cols-1 grid-cols-1 gap-2 sm:max-h-[84vh] overflow-y-auto h-[100%]">
        {MemberCard.map((db, index) => (
          <>
            <div className={`membership-new-card p-2 shadow-lg border  rounded-xl 
            ${idmembership_plan == db.id && " active-member-package " }`}
              >
               
                <>
                <div className="flex flex-auto ">
                 
                {idmembership_plan == db.id && (
                   <span className="bg-green-700 rounded-3xl text-white-A700 px-3 pt-2 text-[10px]  ">
                    Active  
                  </span>
                )}


                  <span className=" text-base text-green-700 py-1 text-[10px] w-fit  font-bold">
                    { db?.title} Wish Basket
                  </span>
                </div>

                <div className="mb-2">
                  <h4 className="sm:text-xs text-sm font-semibold mb-0 text-black">
                    <span className="sm:text-base text-md font-semibold text-black-600 px-1">
                      Upto 50% Instant Discount + Upto 20% Cashback
                    </span>
                  </h4>
                </div>

                <p className="text-sm font-semibold text-blue-600  mb-[0]">
                    {prd?.prod_name}
                </p>

                <div style={{ overflowX: 'auto' }}>
                  <table className="border border-black text-sm"  style={{ borderCollapse: 'collapse',border: "2px solid #000",width:"100%", }} >
                    <tr>
                      <td style={{ border: '1px solid black', padding: '8px' }}><b>MRP₹</b></td>
                      <td style={{ border: '1px solid black', padding: '8px' }}><b>Discount₹</b></td>
                      <td style={{ border: '1px solid black', padding: '8px' }}><b>Price₹</b></td>
                      <td style={{ border: '1px solid black', padding: '8px' }}><b>Cashback₹</b></td>
                    </tr>

                    <tr>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        <span className="text-blue-600 font-bold">{db?.mrp && db?.mrp.toFixed(2)}</span></td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        <span className="text-blue-600 font-bold">{(db?.mrp - db?.instant).toFixed(2)}
                             (
                              {
                                ((db?.mrp - db?.instant) / db?.mrp * 100).toFixed(2)
                              }
                              %)
                        
                        </span></td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        <span className="text-blue-600 font-bold">{db?.instant && db?.instant.toFixed(2)}</span></td>
                      <td style={{ border: '1px solid black', padding: '8px' }}>
                        <span className="text-blue-600 font-bold">
                      
                  
                    {db.id == 1 ? (
                          <>
                            
                          </>
                        ) : (
                          <>
                            {(db?.selling_price - db?.prodt_price).toFixed(2)}

                            ({ ((db?.selling_price - db?.prodt_price) / db?.selling_price * 100).toFixed(2) }%)
                        
                            
                          </>
                        )}
                        </span></td>
                    </tr>
                  </table>

                {idmembership_plan != db.id && (
                    <>
                      <span className="button change-plan text-decoration-none btn-sm change-plan-btn" onClick={() => openModal(db.id, db.title)}>  Subscribe</span>
                        </>
                )}
                 </div>
                </>
               
            </div>
           
 
          
          </>


          
        ))}




      </div>


    </div>



<AlertModal2
        isOpen={isMemberConfrm}
        onClose={() => setConfrm(false)}
        title={"Subscribe Membership"}
      >
        <div 
        style={{ width: 450, minHeight: 100, maxWidth: "100%"  }}>
          <div className="pt-3">
            <p className="text-md">
              Do You really want to subscribe your membership? New membership
              discounts will be applied on next orders,previous orders will be
              same as old membership
            </p>
            <div className="flex items-center justify-end gap-2">
              {/* <button className="button-normal">Cancel</button> */}
              {isLoading ? (
                <button className="button-upgrade flex items-center justify-center">
                  <BeatLoader size={7} color="rgb(49, 134, 22)"/>
                </button>
              ) : (
                <button className="button-upgrade flex items-center justify-center">
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
      </AlertModal2>

</>
  );
};

export default ProductMembershipCard;
