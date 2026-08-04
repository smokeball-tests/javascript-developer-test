const { httpGet } = require('./mock-http-interface');

/**
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) => {
  // Run all requests in parallel to keep things fast.
  return Promise.all(
    urls.map(async (url) => {
      const response = await httpGet(url);
      const { message } = JSON.parse(response.body);
  // Return the message in the correct format based on the response status.
      return response.status === 200
        ? { 'Arnie Quote': message }
        : { 'FAILURE': message };
    })
  );
};

module.exports = {
  getArnieQuotes,
};