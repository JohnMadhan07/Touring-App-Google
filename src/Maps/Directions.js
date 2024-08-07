import React, { useState, useEffect } from 'react';

const Directions = () => {
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchDirections = async () => {
      try {
        // Make a request to your server endpoint
        const response = await fetch('/directions');

        if (!response.ok) {
          throw new Error('Failed to fetch directions');
        }

        const data = await response.json();

        // Set the route data state
        setRouteData(data);
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    };

    // Fetch directions when the component mounts
    fetchDirections();
  }, []);

  return (
    <div>
      {routeData ? (
        <div>
          {/* Render route data here */}
          <p>Route Distance: {routeData.routes[0].legs[0].distance.text}</p>
          <p>Route Duration: {routeData.routes[0].legs[0].duration.text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Directions;
