'use client';

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

// Définir une icône personnalisée pour le marqueur
const markerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const PropertyMap = ({ property }) => {
  const [position, setPosition] = useState(null); 
  const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;

  useEffect(() => {
    const geocodeService = L.Control.Geocoder.nominatim();
    geocodeService.geocode(address, (results) => {
      if (results && results.length > 0) {
        const { lat, lng } = results[0].center;
        setPosition([lat, lng]);
      } else {
        console.error("Geocoding failed for the address:", address);
      }
    });
  }, [address]);

  return (
    <MapContainer
      center={position || [0, 0]} 
      zoom={position ? 13 : 2} 
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {position && (
        <Marker position={position} icon={markerIcon}>
          <Popup>{address}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default PropertyMap;
