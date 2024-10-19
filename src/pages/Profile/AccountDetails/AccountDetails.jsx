import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { UpdateProfilePost } from "Actions/loginotp/action";
import { fetchMembershipData } from "Actions/membership/action";
import { Button } from "components";
import AlertModal from "components/Alert";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardTitle from "../CardTitle";
import "./AccountDetails.scss";
import DatePicker from "react-multi-date-picker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const AccountDetails = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [alert, setAlert] = useState(false);

  const { name } = useParams();
  const dispatch = useDispatch();
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
  const [gender, setGender] = useState(profile_data ? profile_data.gender : "");
  const [dateOfBirth, setDateOfBirth] = useState(
    profile_data ? profile_data.dob : new Date()
  );
  const [Age, setAge] = useState(profile_data ? profile_data.age : "");
  const [userDetails, setUserDetails] = useState({
    name: profile_data ? profile_data.name : "",
    contact: profile_data ? profile_data.contact : "",
    email: profile_data ? profile_data.email : "",
    gender: profile_data ? profile_data.gender : "",
    dob: profile_data ? profile_data?.dob : "",
    age: profile_data ? profile_data.age : "",
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

  const onSubmit = async (data) => {
    setAlert(false);
    if (
      data.contact ||
      data.email ||
      data.name ||
      data?.gender ||
      data?.dob ||
      data?.age
    ) {
      data.idmembership_plan = currentmembership.idmembership_plan;
      data.dob = new Date(dateOfBirth);
      if (token === undefined && token_date === undefined) {
        setIsTokenExpired(true);
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        // console.log(token_date < currentTimestamp);
        setIsTokenExpired(token_date < currentTimestamp);
        await dispatch(UpdateProfilePost(token, "api/update-profile", data));
        await setAlert(true);
      }
      await dispatch(UpdateProfilePost(token, "api/update-profile", data));
    } else {
      alert("Contact,Email and Name is required");
    }
  };

  useEffect(() => {
    var today = new Date();
    var birthDate = new Date(dateOfBirth); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    setAge(age_now);
  }, [dateOfBirth]);

  return (
    <div className="card account-details-style">
      <CardTitle title="Account Details" />

      <div className="card-body" style={{ paddingLeft: 0 }}>
        {alert ? (
          <>
            <AlertModal is_show={alert} Msg={msg} />
          </>
        ) : null}

        <form name="enq" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="form-group col-md-6">
              <label>
                Full Name <span className="required">*</span>
              </label>
              <input
                required=""
                className="form-control"
                type="text"
                {...register("name", {
                  required: "First Name is required",
                })}
                value={userDetails.name}
                onChange={(e) => setUserDetails(e.target.value)}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className="form-group col-md-6">
              <label>
                Contact No. <span className="required">*</span>
              </label>
              <input
                type="number"
                {...register("contact", {
                  required: "Mobile No is required",
                  maxLength: {
                    value: 15,
                    message: "Max Length is 15",
                  },
                  minLength: {
                    value: 10,
                    message: "Min Length is 10",
                  },
                })}
                value={userDetails.contact}
                onChange={(e) => setUserDetails(e.target.value)}
              />
              {errors.contact && <p>{errors.contact.message}</p>}
            </div>

            <div className="form-group col-md-12">
              <label>
                Email Address <span className="required">*</span>
              </label>
              <input
                required=""
                className="form-control"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                value={userDetails.email}
                onChange={(e) => setUserDetails(e.target.value)}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="form-group col-md-6 relative">
              <label>Gender</label>
              <select
                className="form-control"
                {...register("gender")}
                value={userDetails?.gender}
                onChange={(e) => setUserDetails(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div style={{ position: "absolute", right: 18, top: 37 }}>
                <KeyboardArrowDownIcon />
              </div>
              {errors.gender && <p>{errors.gender.message}</p>}
            </div>

            <div className="form-group col-md-6">
              <label>Select Dob</label>
              <div className="form-control relative">
                <DatePicker
                  value={dateOfBirth}
                  onChange={setDateOfBirth}
                  format="DD/MM/YYYY"
                  calendarPosition="left"
                  
                />
                <div className="absolute calender-icon">
                  <CalendarMonthIcon style={{fontSize:20}}/>
                </div>
              </div>

              {errors.dob && <p>{errors.dob.message}</p>}
            </div>
            <div className="form-group col-md-12">
              <label>Age</label>
              <input
                required=""
                className="form-control"
                type="text"
                {...register("age")}
                // value={userDetails.age || Age}
                value={Age ? Age : ""}
                // onChange={(e) => setUserDetails(e.target.value)}
                onChange={(e) => setAge(e.target.value)}
                disabled
              />
              {errors.age && <p>{errors.age.message}</p>}
            </div>
            <div className="col-md-12">
              <Button
                type="submit"
                className="btn btn-fill-out submit font-weight-bold"
                name="submit"
                value="Submit"
              >
                Save Change
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
