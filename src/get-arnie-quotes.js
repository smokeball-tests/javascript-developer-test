const { httpGet } = require("./mock-http-interface");

/**
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) => {
  const quotes = await Promise.all(
    // map over the urls and make a request to each url
    urls.map(async (url) => {
      const response = await httpGet(url);
      // parse the response body
      const { message } = JSON.parse(response.body);
      // return the response body if the status is 200, otherwise return the failure message
      return response.status === 200
        ? { "Arnie Quote": message }
        : { FAILURE: message };
    }),
  );
  return quotes;
};

module.exports = {
  getArnieQuotes,
};
