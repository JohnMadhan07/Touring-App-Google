import React, { useState, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import './Maps.css';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = { width: '50vw', height: '50vh' };
const defaultCenter = { lat: 52.2593, lng: -7.1101 };

const SearchMap = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchDuration, setSearchDuration] = useState(null); 
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);
  const searchStartTime = useRef(null); // Ref to track the start time

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const handlePlaceChanged = () => {
    if (!searchStartTime.current) {
      searchStartTime.current = performance.now();
    }

    const places = searchBoxRef.current.getPlaces();
    if (places.length === 0) return;

    const place = places[0];
    const location = place.geometry.location;

    setSelectedPlace({
      name: place.name,
      position: { lat: location.lat(), lng: location.lng() },
    });

    // Center the map to the selected place
    if (mapRef.current) {
      mapRef.current.panTo({ lat: location.lat(), lng: location.lng() });
      mapRef.current.setZoom(15); 
    }


    const endTime = performance.now();
    const durationInSeconds = (endTime - searchStartTime.current) / 1000;
    setSearchDuration(durationInSeconds);

    // Reset the start time after capturing the duration
    searchStartTime.current = null;
  };

  if (!isLoaded) return <div>Loading maps...</div>;
  if (loadError) return <div>Error loading maps</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={defaultCenter}
        onLoad={(map) => (mapRef.current = map)}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter a location"
            className="search-box"
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '240px',
              height: '32px',
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px',
              top: '10px',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchStartTime.current = performance.now();
              }
            }}
          />
        </StandaloneSearchBox>

        {selectedPlace && <Marker position={selectedPlace.position} />}
      </GoogleMap>

      {searchDuration !== null && (
        <div className="search-duration">
          Search completed in {searchDuration.toFixed(2)} seconds
        </div>
      )}
    </div>
  );
};

export default SearchMap;
