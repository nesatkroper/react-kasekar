import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PropTypes from "prop-types";

// Fix Leaflet icon issues
const initializeLeaflet = () => {
  // Only set the icons once
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
};

const AddressMap = ({ addresses, selectedAddressId }) => {
  // Initialize Leaflet icons
  useEffect(() => {
    initializeLeaflet();
  }, []);

  const validAddresses = addresses.filter(
    (addr) => addr.latitude !== null && addr.longitude !== null
  );

  if (validAddresses.length === 0) {
    return (
      <div className='h-full w-full flex items-center justify-center'>
        No valid coordinates found
      </div>
    );
  }

  const selectedAddress =
    validAddresses.find((addr) => addr.addressId === selectedAddressId) ||
    validAddresses[0];
  const center = [selectedAddress.latitude, selectedAddress.longitude];

  // Create a unique key for the MapContainer to force a complete re-render when the selected address changes
  // This prevents Leaflet marker cleanup issues
  const mapKey = `map-${selectedAddressId}`;

  return (
    <MapContainer
      key={mapKey}
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {validAddresses.map((address) => {
        // Create a custom icon for the selected marker
        const icon =
          address.addressId === selectedAddressId
            ? new L.Icon({
                iconUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
                iconRetinaUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
                shadowUrl:
                  "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
                className: "marker-selected",
              })
            : new L.Icon.Default();

        return (
          <Marker
            key={address.addressId}
            position={[address.latitude, address.longitude]}
            icon={icon}>
            <Popup>
              <div className='text-sm'>
                <p className='font-medium'>
                  {address.city?.name || "Unknown City"},{" "}
                  {address.state?.name || "Unknown State"}
                </p>
                <p className='text-muted-foreground'>
                  {address.latitude.toFixed(6)}, {address.longitude.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

AddressMap.propTypes = {
  addresses: PropTypes.array,
  selectedAddressId: PropTypes.string,
};

export default AddressMap;
