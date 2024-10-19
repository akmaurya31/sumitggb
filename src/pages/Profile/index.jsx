import { fetchAllAddressData } from "Actions/address/action";
import { UpdateProfilePost, logout } from "Actions/loginotp/action";
import { fetchMembershipData } from "Actions/membership/action";
import AlertModal2 from "components/Alert/alert2";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import MembershipPlans from "components/MemberShipPlans";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountDetails from "./AccountDetails/AccountDetails";
import CardTitle from "./CardTitle";
import Coupons from "./Coupons/Coupons";
import MyAddresses from "./MyAddresses/MyAddresses";
import Orders from "./Orders/Orders";
import Packages from "./Packages/Packages";
import Passbook from "./Passbook/Passbook";
import "./Profile.scss";
import { ProfileMenuLinks } from "./ProfileMenu";
import Breadcrumb from "components/Breadcrumb";

const ProfilePage = (props) => {

  const pathname = window.location.pathname;
  // console.log("path", path)
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [alert, setAlert] = useState(false);
  const [alertmembership, setAlertmembership] = useState(false);
  const [openModal, setOpenModal] = useState();
  const [modalObject, setmodalObject] = useState();
  const [isActive, setActive] = useState("/profile/account");
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const user_details = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.["user-details"]
  );
  const profile_data = useSelector(
    (state) => state.LoginOtpVerifyReducer.profile
  );
  const currentmembership = useSelector(
    (state) => state.LoginOtpVerifyReducer?.currentmembership
  );
  const { package_data, package_loading } = useSelector(
    (state) => state?.PackageReducer
  );
  const msg = useSelector((state) => state.LoginOtpVerifyReducer?.msg);

  const [userDetails, setUserDetails] = useState({
    name: profile_data ? profile_data.name : "",
    contact: profile_data ? profile_data.contact : "",
    email: profile_data ? profile_data.email : "",
  });

  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // console.log(token_date < currentTimestamp);
      setIsTokenExpired(token_date < currentTimestamp);
    }
  }, [isTokenExpired, token, token_date]);

  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      setIsTokenExpired(token_date < currentTimestamp);
      dispatch(fetchMembershipData(token, "membership-plans"));
    }
  }, []);

  const Navigate = (url) => {
    navigate(url);
    setActive(url);
  };
  const logoutUser = () => {
    dispatch(logout());
    setIsTokenExpired(true);
    navigate("/", { replace: true });
  };
  const checkSaveValue = (id, order, instant, product, land, copartner) => {
    if (id == 2) {
      return order - product;
    } else if (id == 3) {
      return order - land;
    } else if (id == 4) {
      return order - copartner;
    } else {
      if (id == 1) {
        return order - instant;
      } else {
        return 0;
      }
    }
  };
  const returnMembershipPlan = (id) => {
    if (id == 2) {
      return { name: "Product wish basket discount", discount: "15%" };
    } else if (id == 3) {
      return { name: "Land wish basket discount", discount: "20%" };
    } else if (id == 4) {
      return { name: "Co-Partners wish basket discount", discount: "25%" };
    } else {
      if (id == 1) {
        return { name: "Instent wish basket discount", discount: "10%" };
      } else {
        return 0;
      }
    }
  };



  return (
    <>
      <LandingPageHeader />
      <main
        className="main pages"
        // style={{ marginTop: "1rem" }}
      >
        <div className="container-fluid">
          <Breadcrumb activepage={isActive.slice(1)} />
        </div>
        <div className="container-fluid">
          <div className="page-content my-profile_rn grid grid-cols-12 gap-2">
            <div className="sm:col-span-12 md:col-span-12 col-span-3  px-0 desktop-view">
              <div className="dashboard-menu dashboard-menu2">
                <ul className="nav flex-column" role="tablist">
                  {ProfileMenuLinks.map((item, key) => (
                    <>
                      {item.name === "Logout" ? (
                        <li className="nav-item" key={key}>
                          <Link
                            className={`flex gap-2 nav-link ${
                              pathname == item.link && "active"
                            } `}
                            id={item.link}
                            data-bs-toggle="tab"
                            to={"/"}
                            role="tab"
                            aria-controls={item.link}
                            aria-selected="false"
                            onClick={logoutUser}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        </li>
                      ) : (
                        <li className="nav-item">
                          <Link
                            className={`flex gap-2 nav-link 
                              ${pathname == item.link && "active"}  `}
                            id={item.link}
                            data-bs-toggle="tab"
                            to={item.link}
                            role="tab"
                            aria-controls={item.link}
                            aria-selected="false"
                            onClick={() => Navigate(item.link)}
                          >
                            {/* <i className={item.icon}></i> */}
                            {item.icon}
                            {item.name}
                          </Link>
                        </li>
                      )}
                    </>
                  ))}
                </ul>
              </div>
            </div>
            <div className="sm:col-span-12 md:col-span-12 col-span-9  py-[12px] sm:px-[8px] px-[12px]">
              <div className="tab-content account dashboard-content">
                <div
                  className={`tab-pane fade  ${
                    name == "orders" && " active show"
                  } ${name == undefined && " active show"}`}
                  id="orders"
                  role="tabpanel"
                  aria-labelledby="orders-tab"
                >
                  <Orders />
                </div>

                {/* Packages  */}
                <div
                  className={`tab-pane fade  ${
                    name == "packages" && " active show"
                  }`}
                  id="packages"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  <Packages package_data={package_data} />
                </div>

                {/* My addresses */}
                <div
                  className={`tab-pane fade  ${
                    name == "address" && "active show"
                  }`}
                  id="address"
                  role="tabpanel"
                  aria-labelledby="address-tab"
                >
                  <MyAddresses />
                </div>

                {/* Membership */}
                <div
                  className={`tab-pane fade  ${
                    name == "membership" && "active show"
                  }`}
                  id="membership"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  <div className="card">
                    <CardTitle title="Membership" />

                    <MembershipPlans />
                  </div>
                </div>

                {/* Passbook */}
                <div
                  className={`tab-pane fade  ${
                    name == "passbook" && " active show"
                  }`}
                  id="passbook"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  <Passbook currentmembership={currentmembership} />
                </div>

                {/* Coupons */}
                <div
                  className={`tab-pane fade  ${
                    name == "coupons" && "active show"
                  }`}
                  id="coupons"
                  role="tabpanel"
                  aria-labelledby="dashboard-tab"
                >
                  <Coupons />
                </div>

                {/* Account Details */}
                <div
                  className={`tab-pane fade  ${
                    name == "account" && " active show"
                  }`}
                  id="account-detail"
                  role="tabpanel"
                  aria-labelledby="account-detail-tab"
                >
                  <AccountDetails />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AlertModal2
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title={"Order Detail"}
      >
        <div style={{ minWidth: 380, minHeight: 200 }}>
          <div className="">
            <div className="flex justify-start  items-start flex-col border-bottom-1">
              <div className="order-title">Order Inforamtion</div>
              <div className="w-full">
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Order No</span>
                  <span className="rigth-text-modal">
                    {modalObject?.idcustomer_order}
                  </span>
                </div>
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Order Date</span>
                  <span className="rigth-text-modal">
                    {modalObject?.updated_at}
                  </span>
                </div>
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Payment Type</span>
                  <span className="rigth-text-modal">
                    {modalObject?.pay_mode}
                  </span>
                </div>
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Total Quantity</span>
                  <span className="rigth-text-modal">
                    {modalObject?.total_quantity}
                  </span>
                </div>
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Total CGST</span>
                  <span className="rigth-text-modal">
                    {modalObject?.total_cgst.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Total SGST</span>
                  <span className="rigth-text-modal">
                    {modalObject?.total_sgst.toFixed(2)}
                  </span>
                </div>
                {/* <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Total Discount</span>
                  <span className="rigth-text-modal">
                    {modalObject?.total_discount}%
                  </span>
                </div> */}
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Total Price</span>
                  <span className="rigth-text-modal">
                    {modalObject?.total_price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {modalObject?.idmembership_plan !== null &&
              modalObject?.instant_discount != null && (
                <div className="flex justify-start  items-start flex-col border-bottom-1">
                  <div className="order-title">Membership Inforamtion</div>
                  <div className="w-full">
                    <div className="flex justify-between w-full mt-1">
                      <span className="left-text-modal">Membership Name</span>
                      <span className="rigth-text-modal">
                        {
                          returnMembershipPlan(modalObject?.idmembership_plan)
                            ?.name
                        }
                      </span>
                    </div>

                    <div className="flex justify-between w-full mt-1">
                      <span className="left-text-modal">
                        Membership Discount
                      </span>
                      <span className="rigth-text-modal">
                        {
                          returnMembershipPlan(modalObject?.idmembership_plan)
                            ?.discount
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}

            <div className="flex justify-start  items-start flex-col">
              <div className="order-title">Store Inforamtion</div>
              <div className="w-full">
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Name</span>
                  <span className="rigth-text-modal">{modalObject?.name}</span>
                </div>
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Email</span>
                  <span className="rigth-text-modal">{modalObject?.email}</span>
                </div>
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Contact No</span>
                  <span className="rigth-text-modal">
                    {modalObject?.contact}
                  </span>
                </div>
                <div className="flex justify-between w-full mt-1">
                  <span className="left-text-modal">Address</span>
                  <span className="rigth-text-modal">
                    {modalObject?.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AlertModal2>
      <LandingPageFooter />
    </>
  );
};

export default ProfilePage;
