import { fetchLocationDistasnce, storeLocation } from "Actions/location/action";
import { fetchWarehouse } from "Actions/warehouse/action";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import "./LandingPageHeader.scss";

const LocationComponent = ({ setLocation, setNotFound, setMobileLoading }) => {
  const [isLoading, setLoading] = useState(false);
  
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const location2 = useSelector((state) => state.LocationReducer);  


  const dispatch = useDispatch();

  const getCurrentLocation = async () => {
     setLoading(true);
    // setLoadingLocation(true);
    setMobileLoading(true);
    if (navigator.geolocation) {
      await navigator.permissions
        .query({ name: "geolocation" })
        .then(async function (result) {
          // console.log(result);
          if (result.state === "granted") {
            await getLocation();
          } else if (result.state === "prompt") {
             await getLocation();
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        // if (accuracy && accuracy < 500) {
        //navigator.geolocation.clearWatch(watchId);
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU`
          );

          if (response.ok) {
            dispatch(fetchWarehouse(token, latitude, longitude));
            dispatch(fetchLocationDistasnce(latitude, longitude));
            // await setOpen(false)
             setLoading(false);
            // setLoadingLocation(false);
            setTimeout(() => {
              setMobileLoading(false);
            }, 1500);
            await setNotFound(true);
            const data = await response.json();
            const address = data.results[0].formatted_address;
            setLocation(address);
            dispatch(storeLocation(address));
          } else {
            console.error("Failed to fetch address");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
        // } else {
        //   getLocation();
        // }
      },
      (error) => {
        console.error("Error getting current location:", error);
        // getLocation();
      },
      {
        enableHighAccuracy: true,
      }
    );
  };


  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 768px)").matches);
  // console.log(isMobile,"isMobileisMobileisMobile")

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 

  return (

    <>
      <div className={`ml-${location2.location?.length > 0 ? 5 : 12}`}>
        {isLoading && !isMobile ? 
          <div
            style={{ fontSize: 11 }}
            className="flex items-center gap-2 pt-2 "
          >
            <BeatLoader color="green" size={5} />
            Preparing your experience...
          </div>
         : 
         <>
         
          <button onClick={getCurrentLocation} 
          className="text-sm sm:hidden py-2 my-2 px-2 rounded text-white border border-transparent  cursor-pointer transition-all duration-300 tracking-wide  " style={{"background-color": "#0c831f", whiteSpace: "nowrap" }}>
              Detect my location  
            </button>
          </>

        }
      </div>

      {/* view in mobile */}
      <div className="mobile-view">
        <div
          onClick={getCurrentLocation}
          className=" current_location flex"
        >
          <MyLocationOutlinedIcon />
          Use current location
        </div>
      </div>
    </>
  );
};

export default LocationComponent;
