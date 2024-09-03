const express = require('express');
const request = require('request');
const app = express();
const apiKey = ''; 

let cachedRouteData = null;
let cacheTimestamp = null;
const CACHE_DURATION_MS = 5 * 1000; 
// Function to check if the cache is still valid
const isCacheValid = () => {
  if (!cacheTimestamp) return false;
  return (Date.now() - cacheTimestamp) < CACHE_DURATION_MS;
};


app.get('/directions', async (req, res) => {
  const startTime = Date.now(); // Record start time
  
  try {
    if (cachedRouteData && isCacheValid()) {
      console.log('Serving cached data');
      
      
      const responseTime = Date.now() - startTime;
      console.log(`Response time (cached): ${responseTime} ms`);
      
      // Return cached data
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.json(formatResponse(cachedRouteData));
    } else {
      console.log('Fetching new data from Google Maps Directions API');
      
      request.get({
        url: 'https://maps.googleapis.com/maps/api/directions/json',
        qs: {
          origin: 'Chicago,IL',
          destination: 'Los+Angeles,CA',
          key: apiKey
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


        const responseTime = Date.now() - startTime;
        console.log(`Response time (non-cached): ${responseTime} ms`);

        // Return new data
        res.set({
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        });
        res.json(formatResponse(body));
      });
    }
  } catch (error) {
    console.error('Error fetching directions:', error);
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
});

const formatResponse = (data) => {
  if (data.status !== 'OK' || !data.routes || data.routes.length === 0) {
    return { error: 'No routes found or an error occurred.' };
  }

  const route = data.routes[0];
  const leg = route.legs[0];

  return {
    start_address: leg.start_address,
    end_address: leg.end_address,
    distance: leg.distance.text,
    duration: leg.duration.text,
    steps: leg.steps.map((step, index) => ({
      step_number: index + 1,
      instruction: step.html_instructions.replace(/<[^>]+>/g, ''), // Remove HTML tags
      distance: step.distance.text,
      duration: step.duration.text
    }))
  };
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

