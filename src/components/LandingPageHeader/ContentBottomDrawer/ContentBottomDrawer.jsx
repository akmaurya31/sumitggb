import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Img } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import NotFoundImage from "../../../assets/images/notFound.png";
import LocationComponent from "../LocationButton";
import MapWithAutocomplete from "../MapAutoComplete";
import "./ContentBottomDrawer.scss";
import MobileAutoComplete from "../MobileAutoComplete";

const ContentBottomDrawer = ({ toggleDrawer }) => {
  const [detectLocation, setDetectedLocation] = useState(false);

  const [location1, setLocation] = useState("location loading...");
  const [open, setOpen] = React.useState(false);
  const [isNotFound, setNotFound] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Location
  const [currentLocation, setCurrentLocation] = React.useState(null);

  const location = useSelector((state) => state.LocationReducer.location);
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const dispatch = useDispatch();

  const storeids = useSelector(
    (state) => state.WarehouseReducer?.warehouseData?.data
  );
  const [id, setStoreid] = useState(null);
  useEffect(() => {
    if (storeids?.length > 0) {
      let store_ids = storeids.sort(
        (a, b) => a.distance_in_m - b.distance_in_m
      );
      // console.log("store_ids", store_ids);
      setStoreid(store_ids[0]);
    } else {
      setStoreid(null);
      toggleDrawer(false);
    }
  }, [storeids]);
  useEffect(() => {
    if (id !== null) {
      toggleDrawer(false);
      setOpen(false);
      setNotFound(false);

      // toggleDrawer(false)
    }
  }, [id, location, location1]);
  useEffect(() => {
    if (location || location1) {
      toggleDrawer(false);
    }
  }, [location, location1]);

  return (
    <div
      className={`content-bottom-drawer ${
        toggleDrawer == false && "active"
      }`}
    >
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <BeatLoader color="rgb(38, 126, 62)" />
          <div className="flex justify-center text-base">
            Detecting current location...
          </div>
        </div>
      ) : (
        <>
          <CloseRoundedIcon
            className="close-btn "
            onClick={toggleDrawer(false)}
          />
          <h5 className="text-[14px] text-[#000] font-bold">Select your Location</h5>
          <div>

        {id == null && !isLoading && (
          <>
            <MapWithAutocomplete
                    setLocation={setLocation}
                    setNotFound={setNotFound}
                    setOpen={setOpen}
            />
        {/* <div className="flex flex-col items-center justify-center mt-4 relative">
          <div className="relative w-full mr-4">
            <i className="fas fa-search absolute left-2 top-1/2 -translate-y-1/2  text-gray-500"></i>
            <input
              type="text"
              placeholder="Enter a location4"
              className="pl-8 mr-4 fZCGlI"
            />
        </div> */}
        </>

      // </div>
      )}
         
            {/* <MobileAutoComplete setLocation={setLocation}/> */}
            <LocationComponent
              setDetectedLocation={setDetectedLocation}
              setLocation={setLocation}
              setOpen={setOpen}
              setNotFound={setNotFound}
              setMobileLoading={setLoading}
              setLoadingLocation={()=>{}}
            />
          </div>
          <div>
            {/* <MobileAutoComplete setLocation={setLocation}/> */}
          </div>
        </>
      )}
      
    </div>
  );
};

export default ContentBottomDrawer;
