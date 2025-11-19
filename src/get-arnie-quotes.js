const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // Execute all HTTP requests in parallel for performance
  const promises = urls.map(async (url) => {
    const response = await httpGet(url);
    const { message } = JSON.parse(response.body);
    
    // Return success or failure object based on status code
    if (response.status === 200) {
      return { 'Arnie Quote': message };
    } else {
      return { 'FAILURE': message };
    }
  });

  return Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
