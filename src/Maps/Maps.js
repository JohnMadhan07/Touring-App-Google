import React from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import "./Maps.css";

const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
};
const center = {
  lat: 52.2593, 
  lng: -7.1101, 
};
const libraries = ['places'];
const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyALsQw8m8XlCfbhB5zanyEkpSaqqTg0cDE',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;
