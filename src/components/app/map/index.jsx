import PropTypes from "prop-types";
import React from "react";
import { mapKey } from "@/constants/api";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const Map = ({ location }) => {
  const lat = parseFloat(location.split(",")[0]);
  const lng = parseFloat(location.split(",")[1]);

  return (
    <LoadScript googleMapsApiKey={mapKey}>
      <GoogleMap
        className='rounded-lg'
        mapContainerStyle={{ width: "100%", height: "350px" }}
        center={{ lat, lng }}
        zoom={16}>
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </LoadScript>
  );
};

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  location: PropTypes.string,
};

export default Map;
