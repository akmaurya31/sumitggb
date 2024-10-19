import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationDistasnce, storeLocation } from "Actions/location/action";
import { fetchWarehouse } from "Actions/warehouse/action";

const MobileAutoComplete = ({setLocation}) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const autoCompleteRef = React.useRef(null);
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  
  const dispatch = useDispatch();
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = async() => {
    if (autocomplete !== null) {
      const place = await autocomplete.getPlaces()[0]; // Use getPlaces() instead of getPlace()
      console.log(place);
      await dispatch(
        fetchWarehouse(
          token,
          place?.geometry?.location?.lat(),
          place?.geometry?.location?.lng()
        )
      );
      await dispatch(
        fetchLocationDistasnce(
          place?.geometry?.location?.lat(),
          place?.geometry?.location?.lng()
        )
      );
      // await setLoc(true);
       await setLocation(place?.name);
      await dispatch(storeLocation(place?.name));
      if (
        place?.geometry?.location?.lat() &&
        place?.geometry?.location?.lng()
      ) {
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU"
      libraries={["places"]}
      loadingElement={<div className="pt-2 px-2">Loading Google Maps2...</div>} 
    >
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Enter a location5"
          className="form-control"
          style={{ border: "1px solid #f0e9ff", height: 43 }}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default MobileAutoComplete;
