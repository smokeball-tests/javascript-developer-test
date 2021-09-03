const { httpGet } = require('./mock-http-interface');

const SUCCESS_KEY = "Arnie Quote";
const FAILED_KEY = "FAILURE";

const createHttpPromise = async (url) => {
  return await httpGet(url).then(({ body, status }) => {
    const message = JSON.parse(body).message;
    return status === 200 ? { [SUCCESS_KEY]: message } : { [FAILED_KEY]: message };
  });
}

const getArnieQuotes = async (urls) => {
  const res = await Promise.all(urls.map(url => createHttpPromise(url)));
  return res;
};

module.exports = {
  getArnieQuotes,
};
