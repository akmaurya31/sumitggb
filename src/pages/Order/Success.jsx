import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Order.scss"
import Breadcrumb from "components/Breadcrumb";

const OrderSucess = () => {
  const { message, order_status ,order_result} = useSelector(state => state.Order);

  // const location = useLocation();
  // const { message, status } = { ...location };
  // console.log({message, status});
  return (
    <>
      <LandingPageHeader />

      <main
        className="checkout-page main lg:mt-24 lg:mx-20 mb-30"
        // style={{ marginTop: "1.2rem" }}
      >
         <div className="container-fluid">
          <Breadcrumb activepage={message} />
        </div>

        <div className="container-fluid mb-10 mt-10">
          <div className=" flex justify-center w-full">
            <div
              className="card-item flex flex-col gap-4 items-center justify-center order-shadow"
              style={{ maxWidth: 600 }}
            >
              {order_status ? <CheckCircleOutlineOutlinedIcon
                style={{ fontSize: 115, color: "rgb(12, 131, 31)" }}
              /> :
                <HighlightOffIcon style={{ fontSize: 115, color: "red" }} />}
              <div className="flex flex-col gap-2 text center">
                {order_status ? <><span style={{ fontSize: 25 }} className="text-center">
                  Thakyou for ordering
                </span>
                  <span className="text-center">
                    {message}
                  </span></> : <span className="text-center">
                  {message}
                </span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Link to={`/order-detail/${order_result?.idcustomer_order}`}>
                  <button className="order-btn">View My order</button>
                </Link>
                <Link to="/">
                  <button className="order-btn">Continue Shopping</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingPageFooter />
    </>
  );
};
export default OrderSucess;
