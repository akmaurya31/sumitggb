import { Link, useLocation } from "react-router-dom";
import CardTitle from "../CardTitle";
import "./Passbook.scss";
import { FaLock, FaWallet } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyOrderGet } from "Actions/myoder/action";
import AlertModal2 from "components/Alert/alert2";
import { updateMembershipPost } from "Actions/loginotp/action";
import { BeatLoader } from "react-spinners";
import AlertModal from "components/Alert";
import { Loader } from "components/Loader";
import { fetchPassbookData } from "Actions/passbook/action";
import moment from "moment";
import { NoDataFound } from "components/Cards";
import { FormatDateTime, TimeIn12HourFormat } from "components/DateTimeFormate";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { FaUnlock } from "react-icons/fa";
import BackslashIcon from './BackslashIcon';
import './styles.css';

const Passbook = ({ currentmembership }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isMemberConfrm, setConfrm] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [alertmembership, setAlertmembership] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const [memberData, setMemberData] = useState();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);

  const [sevw, setSevw] = useState('flex flex-col gap-2 w-full');
  const [sevw1, setSevw1] = useState('mt-16');
  
  useEffect(() => {
    if(isSmallMobile){
      setSevw('flex flex-col gap-2 w-full')
      setSevw1('mt-16')
    }else{
      setSevw('sm:grid-cols-2 sm:w-full flex gap-2 w-full')
      setSevw1('')
    }
  }, []);
   
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );

  const { passbook, passbook_loading } = useSelector(
    (state) => state?.PassbookReducer
  );
  const msg = useSelector((state) => state.LoginOtpVerifyReducer?.msg);
  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      setIsTokenExpired(token_date < currentTimestamp);
      dispatch(fetchPassbookData(token));
    }
  }, [isTokenExpired, token, token_date, location]);
  const checkSaveValue = (id, order, instant, product, land, copartner) => {
    if (id == 2) {
      return product;
    } else if (id == 3) {
      return land;
    } else if (id == 4) {
      return copartner;
    } else {
      if (id == 1) {
        return instant;
      } else {
        return 0;
      }
    }
  };
  const returnTransectionValue = (
    id,

    instant,
    product,
    land,
    copartner
  ) => {
    // console.log("id", id, "order", product, copartner, land);
    if (id == 2) {
      return {
        title: "Product Wish Basket Cashback Credit in your Wallet",
        price: product,
      };
    } else if (id == 3) {
      return {
        title: "Land Wish Basket Cashback Credit in your Wallet",
        price: land,
      };
    } else if (id == 4) {
      return {
        title: "Co-Partner Wish Basket Cashback Credit in your Wallet",
        price: copartner,
      };
    }
  };
  const pageSize = 5; // Number of orders per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastOrder = currentPage * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const reversedOrderData = passbook?.data?.data?.slice()?.reverse();
  const currentOrders = reversedOrderData?.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // console.log("reversedOrderData",reversedOrderData)
  // ============================

  // ============================

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (data) => {
    setConfrm(true);
    setMemberData(data);
  };
  const onMembershipClick = async () => {
    await setLoading(true);
    await setAlertmembership(false);
    if (memberData) {
      if (token === undefined && token_date === undefined) {
        setIsTokenExpired(true);
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        setIsTokenExpired(token_date < currentTimestamp);
        await dispatch(
          updateMembershipPost(token, "api/change-membership", memberData)
        );

        await setLoading(false);
        await setConfrm(false);
        await setAlertmembership(true);
        await dispatch(fetchPassbookData(token));
      }
    } else {
      alert("try after sometime");
    }
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        scroll: "smooth",
      });
    };

    scrollToTop();

    return () => { };
  }, [passbook_loading]);

  const { order_result, order_loading } = useSelector(
    (state) => state?.MyOrderListReducer
  );

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalPriceSum = 0;
    order_result?.data?.forEach((item) => {
      totalPriceSum += item.total_price;
    });
    setTotalPrice(totalPriceSum);
  }, [order_result?.data]);


  // const findPlanData = (passbook,currentmembership) => {
  //   console.log(passbook,"passbookpassbook")
  //   return passbook?.data.find(item => item.idmembership_plan === currentmembership);
  // };
  // console.log(findPlanData(),"findPlanDatafindPlanDatafindPlanData");

  const combinedTransactions = [
    ...(passbook?.data?.find(i => i.idmembership_plan === currentmembership?.idmembership_plan)?.transactions.map(transaction => ({
      ...transaction,
      flag: 'locked'  // Set flag to 'locked'
    })) || []),
    
    ...(passbook?.data?.find(i => i.idmembership_plan === 0 || i.idmembership_plan === null)?.transactions.map(transaction => ({
      ...transaction,
      flag: 'unlocked'  // Set flag to 'unlocked'
    })) || [])
  ];
  

  return (
    <div className="card passbookpage">
      {passbook_loading ? (
        <Loader />
      ) : (
        <>
          <CardTitle title="" />
          <div className="card-body">
            <div className=" grid grid-cols-12 gap-3 sm:relative sm:top-0  top-[127px] pt-1 pb-2 bg-white-A700 shadow-sm z-10">
              <div className="sm:col-span-12 col-span-8 flex items-end">
              <div className={sevw}>
                 
              <div className={`flex flex-col gap-2 items-center justify-start mb-0 w-full ${sevw1} bg-yellow-400 border p-6 rounded-xl`}>
                    <span className="text-[#000] text-xl font-bold mb-3">
                      CashBack Amount
                    </span>
                    <div className=" flex flex-col items-center mb-0">
                      
                      <div className="flex">
                    {/* First Column */}
                  <div className="flex flex-col items-center flex-1 mx-2 border rounded shadow-lg p-3 ">
                    <span className="font-bold text-3xl">
                      ₹{passbook?.data?.find(i => i.idmembership_plan === currentmembership.idmembership_plan)?.current_amount.toFixed(2)}
                    </span>
                    <span className="text-sm mt-0">Current</span>
                  </div>

              {/* Center Column  */}
              
              <span style={{fontSize:"65px"}}>/</span>

              {/* Third Column */}
              <div className="flex flex-col items-center flex-1 mx-2 border rounded shadow-lg p-3">
                <span className="font-bold text-3xl">
                  ₹{passbook?.data?.find(i => i.idmembership_plan ===  currentmembership.idmembership_plan)?.total_incurred.toFixed(2)}
                </span>
                <span className="text-sm mt-0">Total</span>
              </div>
            </div>

           
           <div className=" flex flex-auto mt-3 items-center justify-center"><FaWallet style={{ fontSize: 25 }} className="m-3" /><span>Locked</span></div> 
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-start mb-0 w-full bg-black border p-6 rounded-xl">
                    <span className="text-[#facc15] text-xl mb-3 font-bold">
                      Wallet Amount
                    </span>
                    <div className="text-[#facc15] flex flex-col items-center mb-0">
                   
            <div className="flex">
              {/* First Column */}
              <div className="flex flex-col items-center flex-1  mx-2 border rounded shadow-lg p-3">
                <span className="font-bold text-3xl">
                  ₹{passbook?.data?.find(i => i.idmembership_plan === 0 || i.idmembership_plan === null )?.current_amount.toFixed(2)}
                </span>
                <span className="text-sm mt-0">Current</span>
              </div>

              <span style={{fontSize:"65px",textColor:'white'}}>/</span>


              {/* Third Column */}
              <div className="flex flex-col items-center flex-1  mx-2 border rounded shadow-lg p-3">
                <span className="font-bold text-3xl">
                  ₹{passbook?.data?.find(i => i.idmembership_plan === 0 || i.idmembership_plan === null)?.total_incurred.toFixed(2)}
                </span>
                <span className="text-sm mt-0">Total</span>
              </div>
            </div>

            <div className=" flex flex-auto mt-3 items-center justify-center"><FaWallet style={{ fontSize: 25 }} className="m-3" /><span>Unlocked</span></div> 
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <div class="flex flex-col">
              <h5 class="text-lg font-semibold mb-2 mt-2">Membership Wish Cashback</h5>
              <div className="sm:col-span-12 col-span-12">
                <div className=" grid grid-cols-12 total_membership sm:mb-0 ">
                  <div className="item-discount sm:col-span-6 col-span-4 gap-[8px] sm:mb-2 flex flex-col justify-between">
                    <h5
                      className="sm:mx-"
                      style={{
                        fontWeight: "bold",
                        color:
                        currentmembership?.idmembership_plan == 2
                            ? "rgb(12, 131, 31)"
                            : "black",
                      }}
                    >
                      Wish Basket Product
                    </h5>
                    <div
                      className={
                        currentmembership?.idmembership_plan == 2
                          ? "box active"
                          : "box"
                      }
                    >

                    <h6 className="text-sm font-semibold mb-0">
                      ₹
                      {/* {passbook && Array.isArray(passbook.data)
                        ? (() => {
                            const plan = passbook.data.find(item => item.idmembership_plan === 2);
                            return plan ? Math.round(plan.total_incurred * 100) / 100 : '0.00';
                          })()
                        : '0.00'} */}

    {passbook && (passbook?.data?.find(i=>i.idmembership_plan==2)?.total_incurred || 0).toFixed(2)}

                    </h6>

                      {currentmembership?.idmembership_plan == 2 ? (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                            background: "#0C831F",
                            color: "white",
                          }}
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                          }}
                          onClick={() =>
                            openModal({
                              idmembership_plan: 2,
                              membership_name: "Product wish Basket Discount",
                            })
                          }
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="item-discount sm:col-span-6 col-span-4 gap-[8px] sm:mb-2 flex flex-col justify-between">
                    <h5
                      className="sm:mx-4 mx-[7px]"
                      style={{
                        fontWeight: "bold",
                        color:
                          passbook?.data?.memebership_id == 3
                            ? "rgb(12, 131, 31)"
                            : "black",
                      }}
                    >
                      Wish Basket Co-Partner
                    </h5>
                    <div
                      className={
                        passbook?.data?.memebership_id == 3
                          ? "box active"
                          : "box"
                      }
                    >

                      <h6 className="text-sm font-semibold mb-0">
                        ₹
                        {(passbook?.data?.find(i=>i.idmembership_plan==3)?.total_incurred||0)}
                      </h6>

                      {passbook?.data?.memebership_id == 3 ? (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                            background: "#0C831F",
                            color: "white",
                          }}
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className="box active mt-2"
                          style={{
                            paddingTop: 5,
                            paddingBottom: 5,
                            fontSize: 12,
                          }}
                          onClick={() =>
                            openModal({
                              idmembership_plan: 3,
                              membership_name: "Land wish Basket Discount",
                            })
                          }
                        >
                          Subscribe
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="item-discount sm:col-span-6 col-span-4 gap-[8px] sm:mb-2 flex flex-col justify-between">
                    <h5
                      className="sm:mx-"
                      style={{
                        fontWeight: "bold",
                        color:
                          passbook?.data?.memebership_id == 4
                            ? "rgb(12, 131, 31)"
                            : "black",
                      }}
                    >
                      Wish Basket Land
                    </h5>
                    <div
                      className={
                        currentmembership?.idmembership_plan == 4
                          ? "box active"
                          : "box"
                      }
                    >

                      <h6 className="text-sm font-semibold mb-0">
                        ₹
                        {(passbook?.data?.find(i=>i.idmembership_plan==4)?.total_incurred || 0)}
                      </h6>

                      <div>
                        {passbook?.data?.memebership_id == 4 ? (
                          <button
                            className="box active mt-2"
                            style={{
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: 12,
                              background: "#0C831F",
                              color: "white",
                            }}
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            className="box active mt-2"
                            style={{
                              paddingTop: 5,
                              paddingBottom: 5,
                              fontSize: 12,
                            }}
                            onClick={() =>
                              openModal({
                                idmembership_plan: 4,
                                membership_name:
                                  "Co-Partner Wish Basket Discount",
                              })
                            }
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div className="">
              <CardTitle title="Transactions" />

              <div className="transection-history tableview-parent mb-6">
                <div
                  className="order-detail flex flex-col gap-2 pl- pr-2"
                  style={{ maxHeight: 240 }}
                >
                  {passbook?.data?.find(i=>i.idmembership_plan===currentmembership?.idmembership_plan).length==0 ?(
                    <><NoDataFound title="Transaction Not Found" /></>
                  ) : (
                    <> 
                      {combinedTransactions.map((or, index) => {
                        return (
                          <>
                      <div class="flex">
                        <div class="w-[15%] flex items-center justify-center">
                          {or && or?.flag=='locked'?
                            <FaLock style={{ fontSize:50,color:'#170a5b'}} />
                            :
                            <FaUnlock style={{ fontSize:50,color:'#170a5b'}} />
                         }
                        </div>
                        <div class="w-[80%]  flex flex-col relative">  
                          <div class="flex flex-col m-2">
                          <h5 class="font-bold">Created ({or?.flag && or.flag.charAt(0).toUpperCase() + or.flag.slice(1).toLowerCase()})</h5>
                          <span>
                          {or?.updated_at 
                            ? new Date(or?.updated_at).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: false,  // Ensures 24-hour format
                              }).replace(',', '')
                            : ''}
                        </span>
                          <span>{or?.remark}</span>
                          </div>
                          <h4
                            className={`absolute top-2 right-2 font-bold ${or?.transaction_type === 'CR' ? 'text-green-900' : 'text-red-900'}`}
                          >
                            {or?.transaction_type === 'CR' ? '+' : '-'}₹{or?.amount}
                          </h4>  
                        </div>
                      </div>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <AlertModal2
        isOpen={isMemberConfrm}
        onClose={() => setConfrm(false)}
        title={"Subscribe Membership"}
      >
        <div style={{ width: 450, minHeight: 100 }}>
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
                  <BeatLoader size={7} color="rgb(49, 134, 22)" />
                </button>
              ) : (
                <button
                  className="button-upgrade flex items-center justify-center"
                  onClick={onMembershipClick}
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>
        </div>
      </AlertModal2>
      {alertmembership ? (
        <>
          <AlertModal
            is_show={alertmembership}
            data={currentmembership}
            Msg={msg}
          />
        </>
      ) : null}
    </div>
  );
};

export default Passbook;
