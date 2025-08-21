const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // Processing all URLs in parallel results in better performance
  const promises = urls.map(async (url) => {
    try {
      const response = await httpGet(url);
      
      if (response.status === 200) {
        const body = JSON.parse(response.body);
        return { 'Arnie Quote': body.message };
      } else {
        const body = JSON.parse(response.body);
        return { 'FAILURE': body.message };
      }
    } catch (error) {
      // Handle any unexpected errors
      return { 'FAILURE': error.message };
    }
  });

  // Wait for all requests to complete and return results
  const results = await Promise.all(promises);
  return results;
};

module.exports = {
  getArnieQuotes,
};
