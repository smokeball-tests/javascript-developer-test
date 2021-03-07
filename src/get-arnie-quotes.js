const { httpGet } = require("./mock-http-interface");

const isValidHttpUrl = (urlString) => {
  let url;

  if (!isString(urlString)) return false;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

const isString = (value) => {
  return typeof value === "string" || value instanceof String;
};

const getArnieQuotes = async (urls) => {
  // the results storage initialised
  const arnieResults = [];

  // Promises to manage
  const allPromises = [];

  // validate input data type and content
  if (!urls || !Array.isArray([urls]) || urls.length === 0) {
    console.error(
      "The input data (urls) is either undefined, not an array or is empty"
    );
  } else {
    // iterate thru the urls array and save response resuls in results array,

    urls.forEach(async (url) => {
      // check if array item is actually a well formed url
      if (isValidHttpUrl(url)) {
        // all good, make the call and store promise, we need them all first
        allPromises.push(httpGet(url));
      } else {
        console.error(
          `The url: ${url} -> is not a string or is not a well formed url string`
        );
      }
    });

    // now wait for all promises to resolve so you have all the reuslts
    const promiseResults = await Promise.allSettled(allPromises);

    promiseResults.forEach(async (promiseResult) => {
      const parsedBody = JSON.parse(promiseResult.value.body);
      // check the result and create result object
      if (promiseResult.value.status === 200) {
        // all good
        arnieResult = { "Arnie Quote": parsedBody.message };
      } else {
        // not so good
        arnieResult = { FAILURE: parsedBody.message };
      }
      arnieResults.push(arnieResult);
    });
  }

  return arnieResults;
};

module.exports = {
  getArnieQuotes,
};
