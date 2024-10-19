import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const GoogleMap = ({ setGmapData, handleReadOnlyChange, setFormVisible  }) => {
  const mapRef = useRef(null); // Reference to the map div
  const inputRef = useRef(null); // Reference to the input field
  const [address, setAddress] = useState('');
  const [map, setMap] = useState(null); // Store the map instance
  const API_KEY = 'AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU';

  useEffect(() => {
    // Function to load the Google Maps script asynchronously
    const loadGoogleMapsScript = (callback) => {
      if (window.google && window.google.maps) {
        // Google Maps script is already loaded
        callback();
      } else {
        const existingScript = document.getElementById('google-maps-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.id = 'google-maps-script';
          script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU&libraries=places';
          script.async = true;
          script.defer = true;
          document.body.appendChild(script);
          script.addEventListener('load', callback);
        } else {
          // Script is already being loaded, wait for it to load
          existingScript.addEventListener('load', callback);
        }
      }
    };

    const initMap = () => {
      // Check if the browser supports geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Create the map centered at the user's current location
            const mapInstance = new window.google.maps.Map(mapRef.current, {
              zoom: 14,
              center: userLocation,
              scrollwheel: false,
            });
            setMap(mapInstance);

            // Create a marker at the user's current location (optional)
            new window.google.maps.Marker({
              position: userLocation,
              map: mapInstance,
            });

            // Update the coordinates of the map's center when the map is dragged or zoomed
            window.google.maps.event.addListener(mapInstance, 'center_changed', function () {
              const center = mapInstance.getCenter();
              updateFixedMarkerCoordinates(center.lat(), center.lng());
            });

            // Initialize the autocomplete feature
            if (window.google && window.google.maps) {
              const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
              autocomplete.bindTo('bounds', mapInstance);

              autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) {
                  // User entered the name of a Place that was not suggested and pressed Enter
                  alert('No details available for input: \'' + place.name + '\'' );
                  return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                  mapInstance.fitBounds(place.geometry.viewport);
                } else {
                  mapInstance.setCenter(place.geometry.location);
                  mapInstance.setZoom(17); // Why 17? Because it looks good.
                }
                new window.google.maps.Marker({
                  position: place.geometry.location,
                  map: mapInstance,
                });
              });
            }
          },
          () => {
            // Handle error (user denied location or error occurred)
            alert('Error: Unable to access your location.');
          }
        );
      } else {
        // Handle case where browser doesn't support geolocation
        alert('Geolocation is not supported by your browser.');
      }
    };

    const updateFixedMarkerCoordinates1 = (lat, lng) => {
      // You can also update UI elements or perform other actions here
    };

    const updateFixedMarkerCoordinates = async (lat, lng) => {
      try {
        // Construct the reverse geocoding API URL
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

        
        // Make the API request
        const response = await axios.get(url);
        
        
        if (response.data.status === 'OK') {
          // Extract the formatted address from the response
          const address = response.data.results[0]?.formatted_address || 'Address not found';
          setAddress(address);     
          setGmapData({address,lat,lng});
          // setData(address);
          // handleReadOnlyChange(true);
          // setFormVisible(true);
          
          // Update UI elements or perform other actions here
          // Example: setAddress(address);
        } else {
          console.error('Geocoding error:', response.data.status);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };


    // Load the Google Maps script asynchronously and initialize the map
    loadGoogleMapsScript(initMap);

    // Cleanup function to remove the script tag if the component unmounts
    return () => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="relative">
      {/* Input field for autocomplete */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter a location"
        value={address}
        className="absolute top-2 left-2 z-10 w-72 p-2 border border-gray-300 rounded"
        onChange={handleChange} 
      />
      {/* Map container */}
      <div id="map" ref={mapRef} className="h-[700px] w-full"></div>

      {/* Fixed marker element */}
      <div
        id="fixed-marker"
        className="absolute top-1/2 left-1/2 w-8 h-8 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
      >
        <div className="w-4 h-4 bg-white rounded-full"></div>
      </div>

    </div>
  );
};

export default GoogleMap;
