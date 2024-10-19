import React, { useEffect, useRef } from 'react';

const GoogleMapsSearchBox = () => {
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  let autocomplete;

  useEffect(() => {
    // Load Google Maps Places Autocomplete
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCC3PEezROCu62VElmRZOzDOVGPTMh2rdU&libraries=places`;
        script.async = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
      } else {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      if (window.google && window.google.maps) {
        // Initialize autocomplete using the input ref
        autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
        autocomplete.addListener('place_changed', onPlaceChanged);
      }
    };

    const onPlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        alert('No details available for input: "' + place.name + '"');
        return;
      }

      // Clear previous results
      resultsRef.current.innerHTML = '';

      // Create a new list item with the place info
      const li = document.createElement('li');
      li.className = 'p-3 bg-gray-100 mt-2 cursor-pointer';
      li.textContent = place.formatted_address || place.name;
      resultsRef.current.appendChild(li);

      // Handle click event on result item
      li.onclick = () => {
        alert('You selected: ' + (place.formatted_address || place.name));
      };
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Google Maps Search Box</h3>
      
      <input
        ref={inputRef}
        type="text"
        placeholder="Search delivery location..."
        className="w-full p-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      
      <ul ref={resultsRef} className="list-none p-0 mt-4"></ul>
    </div>
  );
};

export default GoogleMapsSearchBox;
