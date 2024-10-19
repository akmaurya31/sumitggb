import { fetchAllAddressData } from "Actions/address/action";
import { updateMembershipPost } from "Actions/loginotp/action";
import { fetchMembershipData } from "Actions/membership/action";
import AlertModal from "components/Alert";
import AlertModal2 from "components/Alert/alert2";
import Membership from "components/Membership";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import "./MemberShipPlans.scss"

const MembershipPlans = (props) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertmembership, setAlertmembership] = useState(false);
  const [isMemberConfrm, setConfrm] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [changeData, setChange] = useState();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const profile_data = useSelector(
    (state) => state.LoginOtpVerifyReducer.profile
  );
  const currentmembership = useSelector(
    (state) => state.LoginOtpVerifyReducer?.currentmembership
  );
  const msg = useSelector((state) => state.LoginOtpVerifyReducer?.msg);

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
      dispatch(fetchAllAddressData(token, "customer-address"));
    }
  }, [isTokenExpired, token, token_date]);
  //   const updateprofile = useSelector(
  //     (state) => state?.UpdateProfileReducer?.updateprofile
  //   );
  const membershipdata = useSelector(
    (state) => state?.MembershipReducer?.membershipData?.data
  );

  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      // console.log(token_date < currentTimestamp);
      setIsTokenExpired(token_date < currentTimestamp);
      dispatch(fetchMembershipData(token, "membership-plans"));
    }
  }, [token]);
  // console.log("userDetails",userDetails);
  //       if(userDetails.name==''){
  //         navigate("/");
  //       }
  // const changeMembership = useSelector(
  //   (state) => state?.ChangeMembershipReducer?.changemembership
  // );
  const openModal = (data) => {
    setConfrm(true);
    setChange(data);
  };
  const onMembershipClick = async () => {
    await setLoading(true);
    await setAlertmembership(false);
    if (changeData) {
      if (token === undefined && token_date === undefined) {
        setIsTokenExpired(true);
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        setIsTokenExpired(token_date < currentTimestamp);
        await dispatch(
          updateMembershipPost(token, "api/change-membership", changeData)
        );
        await setLoading(false);
        await setConfrm(false);
        await setAlertmembership(true);
      }
    } else {
      alert("try after sometime");
    }
  };

  return (
    <>
      <div className="card-body">
        <div className="row">
          {alertmembership ? (
            <>
              <AlertModal
                is_show={alertmembership}
                data={currentmembership}
                Msg={msg}
              />
            </>
          ) : null}
          <div className="sm:grid-cols-2 sm:gap-2 member-grid ">
            {membershipdata?.map((membership, index) => {
              return (
                <div
                  style={{
                    marginBottom: "5px",
                    minHeight: "19rem",
                  }}
                  className={
                    membership.idmembership_plan ==
                    currentmembership?.idmembership_plan
                      ? " d-md-none d-lg-flex active"
                      : "d-md-none d-lg-flex member-card-animation"
                  }
                  key={index}
                >
                  <div
                    style={{
                      // padding: "15px",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#ffffff",
                      width: "100%",
                      height: "100%",
                      backgroundColor: 'rgb(233, 240, 223)'
                    }}
                    className={
                      membership.idmembership_plan ==
                      currentmembership?.idmembership_plan
                        ? "membership-list member-card-active banner-img mb-sm-0 relative wow animate__animated animate__fadeInUp sm:p-[10px] p-3 "
                        : "member-card banner-img mb-sm-0 relative wow animate__animated animate__fadeInUp sm:p-[10px] p-3"
                    }
                    data-wow-delay=".4s"
                  >
                    <>
                      <Membership data={membership} />
                    </>
                    <div
                      className="banner-text"
                      style={{
                        top: "90%",
                        right: 6,
                        padding: 0,
                        width: "97%",
                        left: 11,
                      }}
                    >
                      {membership.idmembership_plan ==
                      currentmembership?.idmembership_plan ? (
                        <button
                          href="#"
                          className="active btn btn-xs member-button"
                          style={{
                            width: "90%",
                            justifyContent: "center",
                          }}
                          disabled
                        >
                          Active
                        </button>
                      ) : (
                        <a
                          href="#"
                          onClick={() =>
                            openModal({
                              idmembership_plan: membership.idmembership_plan,
                              membership_name: membership.name,
                            })
                          }
                          className="btn btn-xs member-button"
                        >
                          {currentmembership?.idmembership_plan >
                          membership.idmembership_plan
                            ? "Subscribe"
                            : "Subscribe"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
                <button className="button-upgrade flex items-center justify-center" onClick={onMembershipClick}>
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

export default MembershipPlans;
