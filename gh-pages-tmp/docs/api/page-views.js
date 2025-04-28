/**
 * Google Analytics Data API Proxy
 * 
 * This serverless function acts as a proxy to fetch page view data from Google Analytics.
 * It's designed to be deployed as a Netlify/Vercel/etc serverless function.
 */

// Import the Google Analytics Data API library
// In a real serverless function, you would use:
// const { BetaAnalyticsDataClient } = require('@google-analytics/data');
// For this example, we'll mock the GA Data API response

/**
 * Serverless function handler
 */
exports.handler = async function(event, context) {
  try {
    // Get the path parameter from the query string
    const url = new URL(event.rawUrl || `https://example.com${event.path}`);
    const path = url.searchParams.get('path');
    
    if (!path) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing path parameter' }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://vineethsai.com',
          'Access-Control-Allow-Methods': 'GET',
          'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
        }
      };
    }

    // In a real implementation, you would:
    // 1. Initialize the GA Data API client with service account credentials
    // 2. Make a runReport request to the GA Data API
    // 3. Format and return the response
    
    // For now, we'll return mock data
    const pageViews = await mockGADataRequest(path);
    
    // Return the successful response
    return {
      statusCode: 200,
      body: JSON.stringify({ pageViews }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://vineethsai.com',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    };
  } catch (error) {
    console.error('Error fetching GA data:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch view data' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://vineethsai.com',
        'Access-Control-Allow-Methods': 'GET'
      }
    };
  }
};

/**
 * Mock function to simulate fetching data from GA
 * In production, replace this with real GA Data API calls
 */
async function mockGADataRequest(path) {
  // For demonstration, return a random number influenced by the path
  // In reality, you'd call the GA Data API with proper authentication
  
  // Create a deterministic but seemingly random number based on the path
  const pathHash = path.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  // Generate a number between 50-500 that stays the same for a given path
  const baseViews = Math.abs(pathHash % 450) + 50;
  
  // Add a small random component to simulate view count increases
  const randomIncrement = Math.floor(Date.now() / 86400000) % 10; // Changes daily
  
  return baseViews + randomIncrement;
}

/*
 * To implement the real GA Data API, you would use code like this:
 * 
 * async function fetchGAData(path) {
 *   // Initialize GA Data API client with credentials
 *   const analyticsDataClient = new BetaAnalyticsDataClient({
 *     credentials: {
 *       client_email: process.env.GOOGLE_CLIENT_EMAIL,
 *       private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
 *     }
 *   });
 *   
 *   // Set your GA4 property ID
 *   const propertyId = process.env.GA_PROPERTY_ID;
 *   
 *   // Create the report request
 *   const [response] = await analyticsDataClient.runReport({
 *     property: `properties/${propertyId}`,
 *     dateRanges: [{ startDate: '2020-01-01', endDate: 'today' }],
 *     dimensions: [{ name: 'pagePath' }],
 *     metrics: [{ name: 'screenPageViews' }],
 *     dimensionFilter: {
 *       filter: {
 *         fieldName: 'pagePath',
 *         stringFilter: {
 *           matchType: 'EXACT',
 *           value: path
 *         }
 *       }
 *     }
 *   });
 *   
 *   // Process the response to get page views
 *   if (response && response.rows && response.rows.length > 0) {
 *     return parseInt(response.rows[0].metricValues[0].value, 10);
 *   }
 *   
 *   return 0; // Return 0 if no data found
 * }
 */ 