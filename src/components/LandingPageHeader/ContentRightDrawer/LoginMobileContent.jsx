import { Img } from "components";
import { useEffect, useState, useRef } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import logo from "../../../styles/imgs/logo/logo.png";
import { useForm } from "react-hook-form";
import { LoginWithOtpPost, LoginOtpVerifyPost } from "Actions/loginotp/action";

import { useDispatch, useSelector } from "react-redux";
import "./LoginMobileContent.scss";
import ms from "../../../assets/images/mobile/mobileloginslider.jpg";
import { Link } from "react-router-dom";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import { ClipLoader } from "react-spinners";

export const LoginMobileContent = (props) => {
  const { open, toggleDrawer, setOpenRightDrawer, openRightDrawer } = { ...props };
  const inputRefs = useRef(null);
  // const MobileNoInputRefs = useRef(null);
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [currentOtpIndex, setCurrentOtpIndex] = useState(0);
  const [contact, setUsername] = useState("");
  const [time, setTime] = useState(0);
  const [isValidcontact, setIsValidcontact] = useState(false);
  const [isClose, setClose] = useState(false);

  const dispatch = useDispatch();
  const { result, error, loading } = useSelector(
    (state) => state.LoginOtpReducer
  );
  const { verify_result, verify_error, verify_loading } = useSelector(
    (state) => state.LoginOtpVerifyReducer
  );
  // console.log("verify_loading", verify_loading);
  const {
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the timer every second
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  // useEffect(() => {
  //   if(open){
  //     MobileNoInputRefs.current.focus();
  //   }
  // }, [open]);

  const handleContinue = () => {
    // console.log(error);
    if (error) {
      console.log("API Error" + error);
    } else {
      setIsValidcontact(true);
      countDown();
    }
  };
  const onSubmit = async (data) => {
    if (data.contact && data.otp) {
      data.active_firebaseId = "";
      data.referrer_id = "";
      dispatch(LoginOtpVerifyPost("api/VerifyOTP", data));
    } else {
      console.log("Mobile and Otp is required");
    }
  };
  const countDown = () => {
    if (contact) {
      setTime(10);
      dispatch(LoginWithOtpPost("api/LoginOTP", { contact: contact }));
    } else {
      // setError({contact:{message:"Mobile No is required"}});
      alert("Mobile No is required");
    }
  };

  // const handleOtpChange = (e,index) => {
  const handleOtpChange = (e) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    if (value) {
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        setActiveOtpIndex(currentOtpIndex + 1);
        setOtp(newOtp);
        var finalOtp = newOtp.join("").toString();
        if (finalOtp.length == 6) {
          // submit form
          var data = {};
          data.contact = contact;
          data.otp = finalOtp;
          onSubmit(data);
        }
      } else {
        console.log("value is not numeric");
      }
    } else {
      setActiveOtpIndex(currentOtpIndex - 1);
      setOtp(newOtp);
    }
  };
  useEffect(() => {
    if (verify_result?.message === "Success") {
      toggleDrawer("right", false);
    }
  }, [verify_result]);

  useEffect(() => {
    if (verify_result?.message === "Success") {
      toggleDrawer("right", false);
    }
  }, [verify_result]);

  useEffect(() => {
    inputRefs.current?.focus();
  }, [activeOtpIndex]);
  const handleChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length == 10) {
      setButtonEnable(true);
    } else {
      setButtonEnable(false);
    }
  };
  const handleKeyDown = (e, index) => {
    setCurrentOtpIndex(index);
    if (e.key === "Backspace") {
      setActiveOtpIndex(index - 1);
    }
  };

  const imgSlider = [
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
    ms,
  ];
useEffect(()=> {
  setTimeout(() => {
    setClose(false)
  }, 500);
},[openRightDrawer])

const CloseDrawer = () => {
  setClose(true);
  setTimeout(() => {
    setOpenRightDrawer(false)
  }, 200);
};  

  return (
    <div className={"login-drawer"}>
        <WestRoundedIcon
          // onClick={toggleDrawer("right", false)}
          onClick={CloseDrawer}
          className="close-btn 11login-close"
        />


      {isClose == false && (
        <div className="marquee ">
          <div className="marquee-content">
            {imgSlider.map((i, key) => (
              <div className="marquee-item">
                <img src={i} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="login-section flex flex-col gap-2">
        <div className="flex justify-center flex-col items-center gap-2">
          {isValidcontact == false ? (
            <>
              <div className="logo">
                <Img src={logo} />
              </div>
              <div className="flex justify-center flex-col items-center gap-1">
                <span className="login-head">India's last minute app</span>
                <span className="login-sub-title">Log in or Sign up</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <strong>OTP Verification</strong>
              </div>
              <strong>
                <hr />
              </strong>
              <div className="flex justify-center flex-col items-center gap-1">
                <span className="login-sub-title">
                  We have sent a verification code to
                </span>
                <span className="login-head">+91-{contact}</span>
              </div>
            </>
          )}
        </div>
        <form>
          {isValidcontact == false ? (
            <>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <div className="form-group flex gap-1 items-center">
                    <input
                      pattern="[0-9]*"
                      inputMode="numeric"
                      type="text"
                      {...register("contact", {
                        required: "Mobile No is required",
                        maxLength: { value: 15, message: "Max Length is 15" },
                        minLength: { value: 10, message: "Min Length is 10" },
                      })}
                      value={contact}
                      onChange={handleChange}
                      placeholder="Mobile No"
                      // ref={open ? MobileNoInputRefs : null}
                    />
                  </div>
                  <div className="flex item-center justify-between">
                    {errors.contact && (
                      <p style={{ fontSize: 11, color: "red" }}>
                        {errors.contact.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                {isButtonEnable ? (
                  <button
                    type="button"
                    className="login-button"
                    onClick={() => handleContinue()}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    className="login-button"
                    style={{ backgroundColor: "gray", cursor: "none" }}
                    onClick={() => handleContinue()}
                    disabled={true}
                  >
                    Continue
                  </button>
                )}

                <label></label>
              </div>
            </>
          ) : (
            <>
              <div className="form-group flex justify-center items-center gap-1">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={otp[index]}
                    style={{ width: "48px" }}
                    onChange={handleOtpChange}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={index === activeOtpIndex ? inputRefs : null}
                  />
                ))}
                {verify_loading && (
                  <div>
                    <ClipLoader size={19} color="#0c831f" />
                  </div>
                )}

                {errors.otp && (
                  <p style={{ fontSize: 11, color: "red" }}>
                    {errors.otp.message}
                  </p>
                )}
                {verify_result?.message == "Error" && (
                  <p>{verify_result.err}</p>
                )}
              </div>

              <div className="flex justify-center flex-col items-center gap-1">
                {time == 0 ? (
                  <label
                    htmlFor="generate_otp"
                    onClick={() => countDown()}
                    className="otp-label mt-3 "
                  >
                    resend otp
                  </label>
                ) : (
                  <label className="otp-label mt-3 ">00:{time}</label>
                )}
              </div>
            </>
          )}
        </form>

        <div className="footer-text">
          <span>
            By continuing, you agree to our <Link to="#">Terms of service</Link>{" "}
            & <Link to="#">Privacy policy</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
