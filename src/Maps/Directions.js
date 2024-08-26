// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Directions = () => {
//   const [routeData, setRouteData] = useState(null);
//   const [placesData, setPlacesData] = useState(null);
//   const apiKey = 'AIzaSyALsQw8m8XlCfbhB5zanyEkpSaqqTg0cDE';

//   useEffect(() => {
//     const fetchDirections = async () => {
//       try {
//         // Make a request to your server endpoint for directions
//         const response = await fetch('/directions');

//         if (!response.ok) {
//           throw new Error('Failed to fetch directions');
//         }

//         const data = await response.json();

//         // Set the route data state
//         setRouteData(data);
//       } catch (error) {
//         console.error('Error fetching directions:', error);
//       }
//     };

//     const fetchPlaces = async () => {
//       try {
//         const requestBody = {
//           query: 'restaurants in New York', // Example query
//           // Add other parameters as needed
//         };

//         const response = await axios.post(
//           `https://places.googleapis.com/v1/places:newyork?key=${apiKey}`,
//           requestBody,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         if (response.status !== 200) {
//           throw new Error('Failed to fetch places');
//         }

//         const data = response.data;

//         // Set the places data state
//         setPlacesData(data);
//       } catch (error) {
//         console.error('Error fetching places:', error);
//       }
//     };

//     // Fetch directions and places when the component mounts
//     fetchDirections();
//     fetchPlaces();
//   }, []);

//   return (
//     <div>
//       {routeData ? (
//         <div>
//           <p>Route Distance: {routeData.routes[0].legs[0].distance.text}</p>
//           <p>Route Duration: {routeData.routes[0].legs[0].duration.text}</p>
//         </div>
//       ) : (
//         <p>Loading route data...</p>
//       )}
//       {placesData ? (
//         <div>
//           {/* Render places data here */}
//           <p>Places Results:</p>
//           <ul>
//             {placesData.results.map((place, index) => (
//               <li key={index}>{place.name}</li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>Loading places data...</p>
//       )}
//     </div>
//   );
// };

// export default Directions;
