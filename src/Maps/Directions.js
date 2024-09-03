import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import './Maps.css';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = { width: '50vw', height: '50vh' };
const defaultCenter = { lat: 52.2593, lng: -7.1101 };

const DirectionsMap = () => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [calculationTime, setCalculationTime] = useState(null);
  const [directionsRequest, setDirectionsRequest] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded && directionsRequest) {
      const startTime = new Date(); // Start timing

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(directionsRequest, (result, status) => {
        const endTime = new Date(); // End timing
        const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds

        if (status === 'OK') {
          setDirections(result);
          setCalculationTime(elapsedTime.toFixed(2)); // Save the elapsed time
          
          // Extracting distance from the response
          const route = result.routes[0];
          const leg = route.legs[0];
          setDistance(leg.distance.text); // e.g., "15.3 km"
        } else {
          console.error('Error fetching directions:', status);
        }
      });
    }
  }, [isLoaded, directionsRequest]);

  const handleCalculateRoute = () => {
    setDirectionsRequest({
      origin: { lat: 52.2593, lng: -7.1101 },
      destination: { lat: 53.3440956, lng: -6.2674862 },
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
  };

  if (!isLoaded) return <div>Loading maps</div>;
  if (loadError) return <div>Error loading maps</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
        <Marker position={{ lat: 53.3440956, lng: -6.2674862 }} />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <button id="direct" className="calculate-route" onClick={handleCalculateRoute}>Calculate Route</button>

      {/* Display the distance and route calculation time */}
      {distance && calculationTime && (
        <div>
          <p>Distance: {distance}</p>
          <p>Time to calculate route: {calculationTime} seconds</p>
        </div>
      )}
    </div>
  );
};
export default DirectionsMap;
