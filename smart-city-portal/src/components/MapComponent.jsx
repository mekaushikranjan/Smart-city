import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../styles/MapComponent.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Default latitude (e.g., San Francisco)
  lng: -122.4194, // Default longitude (e.g., San Francisco)
};

const MyMapComponent = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("User location:", position); // Log user position
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Geolocation error:", error); // Log error
            setLocationError("Error getting location: " + error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLocationError("Geolocation is not supported by this browser.");
      }
    } catch (err) {
      console.error("Error in useEffect:", err);
      setLocationError("Error occurred while accessing geolocation.");
    }
  }, []);

  return (
    <div>
      {locationError && <div className="error-message">{locationError}</div>}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || center}
          zoom={10}
        >
          {userLocation && <Marker position={userLocation} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MyMapComponent;
