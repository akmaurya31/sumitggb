import { Img } from "components";
import { useEffect, useState, useRef } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import logo from "../../styles/imgs/logo/logo.png";
import { useForm } from "react-hook-form";
import { LoginWithOtpPost, LoginOtpVerifyPost } from "Actions/loginotp/action";

import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa6";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export const LoginModel = (props) => {
  const { open, onCloseModal } = { ...props };
  const inputRefs = useRef(null);
  // const MobileNoInputRefs = useRef(null);
  const [isButtonEnable, setButtonEnable] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [currentOtpIndex, setCurrentOtpIndex] = useState(0);
  const [contact, setUsername] = useState("");
  const [time, setTime] = useState(0);
  const [isValidcontact, setIsValidcontact] = useState(false);

  const dispatch = useDispatch();
  const { result, error, loading } = useSelector(
    (state) => state.LoginOtpReducer
  );
  const { verify_result, verify_error, verify_loading } = useSelector(
    (state) => state.LoginOtpVerifyReducer
  );
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

  useEffect(() => {
    if (verify_result && verify_result.message == "Success") {
      onCloseModal(true);
    }
  }, [result, error, loading, verify_result, verify_error, verify_loading]);

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
  return (
    <>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="flex flex-col gap-4 relative">
          {isValidcontact && (
            <div className="absolute" style={{ top: -10 }}>
              <IconButton onClick={() => setIsValidcontact(false)}>
                <FaArrowLeft style={{ color: "black", fontSize: 23 }} />
              </IconButton>
            </div>
          )}

          <div className="flex justify-center flex-col items-center gap-2">
            {isValidcontact == false ? (
              <>
                <div style={{ width: 145 }}>
                  <Img src={logo} />
                </div>
                <div className="flex justify-center flex-col items-center gap-1">
                  <span className="login-head"> सोच बदलो दुकान बदलो</span>
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
                        // defaultValue={""}
                        onChange={handleChange}
                        placeholder="Mobile No"
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
                <div className="block text-center mb-2">
                  {errors.otp && (
                    <p className="text-red-500 text-sm">
                      {errors.otp.message}
                    </p>
                  )}
                  {verify_result?.message == "Error" && (
                    <p className="text-red-500 text-sm">{verify_result.err}</p>
                  )}
                </div>
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
                </div>

                <div className="flex justify-center flex-col items-center gap-1">
                  {time == 0 ? (
                    <label
                      htmlFor="generate_otp"
                      onClick={() => countDown()}
                      className="otp-label mt-3 mb-5"
                    >
                      resend otp
                    </label>
                  ) : (
                    <label className="otp-label mt-3 mb-5">00:{time}</label>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
        <div>
          <span className="text-center font-normal m-10">
            By continuing, you agree to our <Link to="/term" className="text-green-600">Terms of service</Link> &{" "}
            <Link to="/privacypolicy" className="text-green-600">Privacy policy</Link>
          </span>
        </div>
      </Modal>
    </>
  );
};
