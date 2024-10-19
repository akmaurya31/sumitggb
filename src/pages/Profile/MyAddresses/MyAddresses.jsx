import { useDispatch, useSelector } from "react-redux";
import { AddressModel } from "../AddressModel";
import CardTitle from "../CardTitle";
import "./MyAddresses.scss";
import { useEffect, useState } from "react";
import { fetchAllAddressData } from "Actions/address/action";
import { useLocation } from "react-router-dom";
import VerifiedIcon from '@mui/icons-material/Verified';

const MyAddresses = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const token_date = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.expires_at
  );
  const AddressData = useSelector(
    (state) => state?.AddressReducer?.addressData?.data
  );
  const copiedData =AddressData&&AddressData?.length>0&& [...AddressData];
  const AddressDataReverse = copiedData?.reverse();

  useEffect(() => {
    if (location.pathname === "/profile/address") {
      if (token === undefined && token_date === undefined) {
        setIsTokenExpired(true);
      } else {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        setIsTokenExpired(token_date < currentTimestamp);
        dispatch(fetchAllAddressData(token, "customer-address"));
      }
    }
  }, [isTokenExpired, token, token_date, location.pathname]);



  return (
    <div className="card">
      <div className="flex justify-between items-center border-b-[2px] border-solid border-[#00000018] mb-3">
        <CardTitle title="My Addresses" />
        {/* this is for add more address */}
        <AddressModel />
      </div>
      {AddressDataReverse && AddressDataReverse.length > 0 ? (
        <div className="11container-fluid">
          <>
            {AddressDataReverse?.map((address) => {
              return (
                <>
                  {/* <div className="col-md-12">
                  <div className="row" style={{ borderTop: "1px solid #eee" }}>
                    <div className="col-sm-10 col-md-10">
                      <div className="card-body" style={{ fontSize: "14px" }}>
                        <strong>{address.tag}</strong>
                        <br />
                        <address>
                          {address.name}, {address.address}, {address.landmark},{" "}
                          {address.pincode}
                          <br />
                          {address.phone}
                        </address>
                      </div>
                    </div>
                    <div className="col-sm-2 col-md-2" style={{ marginTop: "30px" }}>
                      <AddressModel address={address} />
                    </div>
                  </div>
                </div> */}
                  <div className={`grid grid-cols-12 border-b-[1px] border-solid border-[#00000049] p-2   
                  ${address?.is_default === 1 && 'bg-green-50'}`}>
                    <div className="col-span-10">
                      <strong title="Default Address">{address.tag} {address?.is_default === 1 && <VerifiedIcon className=" " style={{ fill: 'green', width: 18 }} />}</strong>
                      <br />
                      <address className="mb-0">
                        {address.name}, {address.address}, {address.landmark},{" "}
                        {address.pincode}
                        <br />
                        {address.phone}
                      </address>
                    </div>
                    <div className="col-span-2 flex justify-end flex-col items-end">
                      <AddressModel address={address} />
                      {/* <div>{address?.is_default === 1 && "Default"}</div> */}
                    </div>
                  </div>
                </>
              );
            })}
          </>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-12" style={{ textAlign: "center" }}>
            <h5>You have no saved addresses</h5>
            <p>Tell us where you want your orders delivered</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddresses;
