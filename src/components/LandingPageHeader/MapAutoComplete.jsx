import React, { useEffect, useState, useRef } from "react"; // React ka magic, hooks ka combination
import { useDispatch, useSelector } from "react-redux"; // Redux se dispatch aur data uthaane ka kaam
import { fetchWarehouse } from "Actions/warehouse/action"; // Warehouse location nikalne wala action
import { fetchLocationDistasnce, storeLocation } from "Actions/location/action"; // Location distance aur store location ka action



// Yeh hai humara main MapWithAutocomplete component, jo location dhoondhne mein help karega 🗺️
const MapWithAutocomplete = ({ setLocation, setNotFound, isOut }) => {
  const [autocomplete, setAutocomplete] = useState(null); // Autocomplete feature ka state rakha gaya hai
  const token = useSelector(
    (state) => state.LoginOtpVerifyReducer.verify_result?.data?.access_token // Redux se token nikal rahe hain, jo zaroori hai API call ke liye
  );
  const dispatch = useDispatch(); // Action ko dispatch karne ke liye dispatch hook lagaya hai
  const inputRef = useRef(null); // Input field ko refer karne ke liye ref
  const searchBoxRef = useRef(null); // Google Maps SearchBox ko refer karne ke liye ref
  const [notFound, setNotFound2] = useState(false); // Location not found flag, jab kuch nahi milta 😟

  // Body ka class manage karne wala effect - Mobile Map aur normal view ke beech mein switch karega 🖼️
  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.add(isOut ? "mobileMap" : "myClass"); // Agar mobile view mein ho to mobileMap class lagao, warna myClass 😎
    return () => {
      bodyElement.classList.remove(isOut ? "mobileMap" : "myClass"); // Clean up karte waqt class hata dena
    };
  }, [isOut]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);

  // Google Maps script ko dynamic way mein load karte hain, jaise hi page load hota hai 📍
  useEffect(() => {
    //if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
     console.log("LLL3737 8")
     const script = document.createElement("script");
     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU&libraries=places`; // API key lagake Google Maps ki power leke aaye hain
     script.async = true; // Script ko async kar diya taki page ko block na kare 🚀
     // script.defer = true; 
     document.body.appendChild(script); // Document body mein script ko ghusa diya 📄
     script.onload = () => {
       if (window.google) {
         console.log("LLL3737 9")
         // Agar Google Maps load ho gaya to yeh sab magic hoga
         searchBoxRef.current = new window.google.maps.places.SearchBox(inputRef.current); // SearchBox ko input se bind kar diya hai 🔍
         searchBoxRef.current.addListener("places_changed", handlePlaceChanged); // Jab place change hoga, handlePlaceChanged function chalega
         // MutationObserver ka jadoo, yeh observe karega aur pac-container ke sath custom class lagayega 🧙‍♂️
         const observer = new MutationObserver((mutationsList) => {
           mutationsList.forEach((mutation) => {
             mutation.addedNodes.forEach((node) => {
               if (node.classList && node.classList.contains("pac-container")) {
                 node.classList.add("customavi-pac-container"); 
                 //node.classList.add("customavi-pac-container45");// Custom class lagaya gaya autocomplete dropdown par 🎨
               }
             });
           });
         });
         //dispatch(fetchWarehouse(token, latitude, longitude));
         observer.observe(document.body, { childList: true, subtree: true }); // Document body mein mutation observe karta rahega 🔭
       }
     };
    //  return () => {
    //    document.body.removeChild(script); // Clean up, bhai agar script load ho gaya to baad mein hata denge 🧹
    //  };
  //}
 }, []);


  // Yeh function tab chalega jab koi place select karega maps autocomplete se 📌
  const handlePlaceChanged = async () => {
    const places = searchBoxRef.current.getPlaces(); // Google Maps se places ka data le rahe hain
    if (!places || places.length === 0) {
      setNotFound(true); // Agar place nahi mila to not found message dikhao 😔
      return;
    }
    setNotFound(false); // Place mil gaya, not found flag ko hata diya ✅

    const place = places[0];
    const lat = place?.geometry?.location?.lat(); // Latitude nikaala jaa raha hai 🌍
    const lng = place?.geometry?.location?.lng(); // Longitude nikaala jaa raha hai 🌍

    if (lat && lng) {
      await dispatch(fetchWarehouse(token, lat, lng)); // Warehouse ka data dispatch kiya gaya API call ke through 🏬
      setLocation(place?.name); // Location ka naam set kar diya 🏙️
      await dispatch(storeLocation(place?.name)); // Location ko store bhi kar diya hai 🗄️
    }
  };

  // Input field mein jab koi key press karega to yeh function chalega 🎹
  const handleKeyPress = (event) => {
    // console.log("Key pressed:", event.key); // Debugging ke liye key press ka log daal diya
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search delivery location" // Delivery location ka search box 🚚
        className="form-control"
        ref={inputRef} // Input field ka ref set kar diya
        style={{ border: "1px solid #cccccc" }} // Styling ka jugaad, thoda decent border lagake
        onChange={() => setNotFound2(false)} // Jab user type kare to not found flag reset ho jaaye ✏️
        onKeyDown={handleKeyPress} // Jab key press ho to function chale
      />
      {notFound && <p>Location not found</p>} {/* Agar location nahi mili to yeh message show hoga 😓 */}
    </>
  );
};

export default MapWithAutocomplete;
