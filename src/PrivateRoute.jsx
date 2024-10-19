import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component }) => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  useEffect(() => {
    if (token === undefined && token_date === undefined) {
      setIsTokenExpired(true);
    } else {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      setIsTokenExpired(token_date < currentTimestamp);
    }
  }, [isTokenExpired, token, token_date]);

  return isTokenExpired ? <Navigate to="/" /> : <Component token={token} />;
};

export default PrivateRoute;
