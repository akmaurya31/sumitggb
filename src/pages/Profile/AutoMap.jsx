import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  LoadScript,
  GoogleMap,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import { fetchWarehouse } from "Actions/warehouse/action";
import { useDispatch, useSelector } from "react-redux";
// import { storeLocation } from "Actions/location/action";
import "./Profile.scss"

const AutoMap = ({ setData, handleReadOnlyChange, setFormVisible  }) => { //handleReadOnlyChange is made for form readonly set to ture or false in addressMOdel.jsx
  const { register, errors } = useForm(); 
  const autoCompleteRef = React.useRef(null);
  // const [coords, setCoords] = useState({ latt: 0, lang: 0 });
  const [currentPosition, setCurrentPosition] = useState({ lat: 26.850000, lng: 80.949997});
  const [currentZoom, setCurrentZoom] = useState(20);
  const [isLocation, setLoc] = useState(false);
  
  const [inputValue, setInputValue] = useState(""); // New state for input value
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token
  );
  const id = useSelector(
    (state) => state.WarehouseReducer?.warehouseData
  );
  const dispatch = useDispatch();
  const onPlaceChanged = async () => {
    if (autoCompleteRef.current !== null) {
      const place = autoCompleteRef.current.getPlace();
      if (!place.place_id) {                           //condition when user enter value in adress form in location input
        // Handle the case where the user manually inputs a place
        setData(place);
        handleReadOnlyChange(true); // or handle accordingly
      } else {
        setData(place);
        setFormVisible(true);
        handleReadOnlyChange(false);
        setInputValue(place.formatted_address);//input marker dragged value
      }
      // console.log("place",place)
      // setData(place);

      await setCurrentPosition({
        ...currentPosition,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
     
      setCurrentZoom(15);
      // await dispatch(
      //   fetchWarehouse(
      //     token,
      //     place.geometry.location.lat(),
      //     place.geometry.location.lng()
      //   )
      // );
      setLoc(true);

      // dispatch(storeLocation(place?.name));
    }
  };
  useEffect(() => {
    if ((id&&id.length==0)&& isLocation) {
      setLoc(false);
    } else {
    }
  }, [isLocation, id]);

  const handleDragEnd = async (event) => {    //function maded for marker draggable in google maps
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCurrentPosition(newPosition);
    await getAddress(newPosition); // Get address for new position after  dragged
  };

  const getAddress = async (position) => { //this function help us to show the newposition in the input field
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: position }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          setInputValue(results[0].formatted_address);
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const defaultMapConfig = {
    zoomControl: false, // Hide zoom in/out buttons
    mapTypeControlOptions: {
      mapTypeIds: [""], // Show only satellite view
    },
    gestureHandling: "greedy",
    options: {
      fullscreenControl: false,
    },
    mapContainerStyle: {
      height: "100%",
      width: "100%",
    },
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU"
      libraries={["places"]}
      loadingElement={<div className="pt-2 px-2">Loading Google Maps3...</div>} 
    >
      <style>    
        {`
          .custom-placeholder::placeholder {
            color: red;
            font-weight: bold;
          }
        `}
      </style>
      <div className="map-autocomplte">
        <Autocomplete
          onLoad={(autocomplete) => (autoCompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter a location first"
            className="form-control custom-placeholder"
            style={{ border: "2px solid black", height: 43, outline: "none" }}
            value={inputValue} // Bind input value to state
            onChange={(e) => setInputValue(e.target.value)} // Update state on change
          />
        </Autocomplete>
      </div>
      <GoogleMap
        {...defaultMapConfig}
        defaultCenter={{ lat: 0, lng: 0 }}
        center={currentPosition}
        zoom={currentZoom}
      >
        <Marker position={currentPosition} draggable={true} onDragEnd={handleDragEnd} />
      </GoogleMap>
    </LoadScript>
  );
};

export default AutoMap;
