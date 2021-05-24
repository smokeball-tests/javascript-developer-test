const { httpGet } = require('./mock-http-interface');

const SUCCESS_KEY = "Arnie Quote";
const FAILURE_KEY = "FAILURE";

const getArnieQuotes = (urls) => {
  return Promise.all(urls.map(url => {
    // Execute a HTTP GET
    return httpGet(url).then(data => {
      try {
        // If the HTTP status code of the response is 200, push an object to the results array with a single key `"Arnie Quote"` and the HTTP response body's `message` property as the key's associated value.
        if (JSON.parse(data.status) === 200) {
          return { [SUCCESS_KEY]: JSON.parse(data.body).message }
          // If the HTTP status code of the response is not 200, push an object to the results array with a single key`"FAILURE"` and the HTTP response body's `message` property as the key's associated value.
        } else {
          return { [FAILURE_KEY]: JSON.parse(data.body).message }
        }
      } catch(err) {
        throw Error("Some fatal error")
      }
    });
  }));
};


module.exports = {
  getArnieQuotes,
};
