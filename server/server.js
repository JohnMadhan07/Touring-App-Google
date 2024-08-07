// const express = require('express');
// const request = require('request');
// const app = express();

// let cachedRouteData = null;

// // Endpoint to fetch directions with caching
// app.get('/directions', async (req, res) => {
//   try {
//     if (cachedRouteData) {
//       // Serve cached data if available
//       res.json(cachedRouteData);
//     } else {
//       // Fetch data from Google Maps Directions API using request
//       request.get({
//         url: 'https://maps.googleapis.com/maps/api/directions/json',
//         qs: {
//           origin: 'Chicago,IL',
//           destination: 'Los+Angeles,CA',
//           key: 'AIzaSyALsQw8m8XlCfbhB5zanyEkpSaqqTg0cDE'
//         },
//         json: true
//       }, (error, response, body) => {
//         if (error) {
//           throw new Error('Failed to fetch directions');
//         }
        
//         if (response.statusCode !== 200) {
//           throw new Error('Failed to fetch directions');
//         }

//         // Cache the data
//         cachedRouteData = body;

//         // Return data to client
//         res.json(body);
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching directions:', error);
//     res.status(500).json({ error: 'Failed to fetch directions' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const request = require('request');
const app = express();

let cachedRouteData = null;
let cacheTimestamp = null;
const CACHE_DURATION_MS = 5 * 1000; // Cache duration set to 5 seconds

// Function to check if the cache is still valid
const isCacheValid = () => {
  if (!cacheTimestamp) return false;
  return (Date.now() - cacheTimestamp) < CACHE_DURATION_MS;
};

// Endpoint to fetch directions with caching
app.get('/directions', async (req, res) => {
  try {
    if (cachedRouteData && isCacheValid()) {
      console.log('Serving cached data');
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Do not cache
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.json(cachedRouteData);
    } else {
      console.log('Fetching new data from Google Maps Directions API');
      request.get({
        url: 'https://maps.googleapis.com/maps/api/directions/json',
        qs: {
          origin: 'Chicago,IL',
          destination: 'Los+Angeles,CA',
          key: 'AIzaSyALsQw8m8XlCfbhB5zanyEkpSaqqTg0cDE'
        },
        json: true
      }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.error('Error fetching directions:', error || body);
          res.status(500).json({ error: 'Failed to fetch directions' });
          return;
        }

        // Cache the data
        cachedRouteData = body;
        cacheTimestamp = Date.now();
        console.log('Fetched and cached new data');

        // Set cache-control headers
        res.set({
          'Cache-Control': 'no-cache, no-store, must-revalidate', // Do not cache
          'Pragma': 'no-cache',
          'Expires': '0'
        });

        // Return data to client
        res.json(body);
      });
    }
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

