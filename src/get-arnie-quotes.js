const { httpGet } = require('./mock-http-interface');

const SUCESS_RES_KEY = "Arnie Quote";
const FAILURE_RES_KEY= "FAILURE"
const TIMEOUT_MS = 400;

const httpGetWithTimeout = (url, timeout = TIMEOUT_MS) => {
  return Promise.race([
    httpGet(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ]);
};

const getArnieQuotes = async (urls) => {
  const requests = urls.map(async (url) => {
    try {
      const response = await httpGetWithTimeout(url);
      const data = JSON.parse(response.body);

      if (response.status === 200) {
        return { [SUCESS_RES_KEY]: data.message };
      } else {
        return { [FAILURE_RES_KEY]: data.message };
      }
    } catch (error) {
      return { FAILURE: error.message || error };
    }
  });

  // Global timeout for the entire operation
  const result = await Promise.race([
    Promise.allSettled(requests).then(res =>
      res.map(r => r.value)
    ),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Overall timeout > 400ms')), TIMEOUT_MS))
  ]);

  return result;
};


module.exports = {
  getArnieQuotes,
};
