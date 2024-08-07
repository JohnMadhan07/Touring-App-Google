import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import "./Maps.css";

const mapContainerStyle = {
  width: '50vw',
  height: '50vh',
};

const defaultCenter = {
  lat: 52.2593,
  lng: -7.1101,
};

const Map = () => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter); // Initially set to default center
  const [mapRenderStartTime, setMapRenderStartTime] = useState(null);
  const [actionStartTime, setActionStartTime] = useState(null);
  const [actionDuration, setActionDuration] = useState(null);
  const [mapRenderDuration, setMapRenderDuration] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyALsQw8m8XlCfbhB5zanyEkpSaqqTg0cDE',
    libraries: ['places'],
  });

  const onMapLoad = map => {
    setMap(map);
    // Record the start time of the initial map render
    setMapRenderStartTime(new Date());
  };

  const handlePanAndZoom = () => {
    const newPosition = { lat: 52.24619711998666, lng: -7.138704504048729 };
    if (map) {
      setActionStartTime(new Date());
      map.panTo(newPosition);
      map.setZoom(15);
      setMarkerPosition(newPosition);
    }
  };

  useEffect(() => {
    if (actionStartTime) {
      // Calculate the time taken for the action (panning and zooming)
      const currentTime = new Date();
      const elapsedTime = (currentTime - actionStartTime) / 1000; // Convert milliseconds to seconds
      setActionDuration(elapsedTime);
    }
  }, [actionStartTime]);

  useEffect(() => {
    if (mapRenderStartTime) {
      // Calculate the time taken for the initial map render
      const currentTime = new Date();
      const elapsedTime = (currentTime - mapRenderStartTime) / 1000; // Convert milliseconds to seconds
      setMapRenderDuration(elapsedTime);
    }
  }, [mapRenderStartTime]);

  useEffect(() => {
    if (loadError) {
      console.error('Error loading maps');
    }
  }, [loadError]);

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={defaultCenter}
        onLoad={onMapLoad}
      >
        {/* Marker for default center */}
        <Marker position={defaultCenter} />
        
        {/* Marker for panned location (if markerPosition is set) */}
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
      <button className="panzoom" onClick={handlePanAndZoom}>Pan and Zoom</button>
      {mapRenderDuration && <div>Map render duration: {mapRenderDuration} seconds</div>}
      {actionDuration && <div>Action duration: {actionDuration} seconds</div>}
    </div>
  );
};

export default Map;



