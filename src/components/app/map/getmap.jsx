import { mapKey } from "@/constants/api";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";

const MapWithLocation = ({
  onGetLocation,
  width = "100%",
  height = "400px",
  className = "py-3",
}) => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const containerStyle = {
    width,
    height,
  };

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const locate = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            map?.panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            onGetLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className={className}>
      <LoadScript googleMapsApiKey={mapKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || { lat: 11.5564, lng: 104.9282 }}
          zoom={currentLocation ? 15 : 10}
          onLoad={onMapLoad}
          onClick={(event) => {
            console.log(
              "Map clicked at:",
              event.latLng.lat(),
              event.latLng.lng()
            );
          }}>
          {currentLocation && <Marker position={currentLocation} />}

          <button
            onClick={locate}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "10px",
              backgroundColor: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
            }}>
            Get Current Location
          </button>
          {error && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                backgroundColor: "white",
                color: "red",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                zIndex: 10,
              }}>
              {error}
            </div>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

MapWithLocation.propTypes = {
  onGetLocation: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default MapWithLocation;

// import { mapKey } from "@/constants/api";
// import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
// import React, { useState, useCallback } from "react";

// const containerStyle = {
//   width: "100%",
//   height: "400px",
// };

// const MapWithCopy = () => {
//   const [clickPosition, setClickPosition] = useState(null);
//   const [copySuccess, setCopySuccess] = useState(false);

//   const onMapClick = useCallback((event) => {
//     setClickPosition({
//       lat: event.latLng.lat(),
//       lng: event.latLng.lng(),
//     });
//     setCopySuccess(false); // Reset success message on new click
//   }, []);

//   const handleCopyClick = () => {
//     if (clickPosition) {
//       const coordinatesText = `${clickPosition.lat.toFixed(
//         6
//       )}, ${clickPosition.lng.toFixed(6)}`;
//       navigator.clipboard
//         .writeText(coordinatesText)
//         .then(() => {
//           setCopySuccess(true);
//           setTimeout(() => setCopySuccess(false), 2000); // Show success message for 2 seconds
//         })
//         .catch((err) => {
//           console.error("Failed to copy:", err);
//           // Optionally show an error message to the user
//         });
//     }
//   };

//   return (
//     <LoadScript googleMapsApiKey={mapKey}>
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={{ lat: 11.5564, lng: 104.9282 }} // Default center (Phnom Penh, Cambodia)
//         zoom={10}
//         onClick={onMapClick}>
//         {clickPosition && <Marker position={clickPosition} />}

//         {clickPosition && (
//           <div
//             style={{
//               position: "absolute",
//               bottom: "20px",
//               left: "20px",
//               backgroundColor: "white",
//               padding: "10px",
//               borderRadius: "5px",
//               boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//               zIndex: 1,
//             }}>
//             <span>
//               Lat: {clickPosition.lat.toFixed(6)}, Lng:{" "}
//               {clickPosition.lng.toFixed(6)}
//             </span>
//             <button
//               onClick={handleCopyClick}
//               style={{
//                 marginLeft: "10px",
//                 padding: "5px 10px",
//                 borderRadius: "3px",
//                 border: "1px solid #ccc",
//                 cursor: "pointer",
//               }}>
//               Copy
//             </button>
//             {copySuccess && (
//               <span style={{ marginLeft: "10px", color: "green" }}>
//                 Copied!
//               </span>
//             )}
//           </div>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapWithCopy;
