const { httpGet } = require("./mock-http-interface");

const SUCCESS_KEY = "Arnie Quote";
const FAILURE_KEY = "FAILURE";
const FAILURE_CODE = 500;

const parseBodyMsg = (body) => {
  try {
    return JSON.parse(body).message ?? "";
  } catch (error) {
    return "";
  }
};

const getArnieQuotes = async (urls) => {
  const responses = await Promise.all(urls.map((url) => httpGet(url)));

  const results = responses.map(({ status, body }) => ({
    [status === FAILURE_CODE ? FAILURE_KEY : SUCCESS_KEY]: parseBodyMsg(body),
  }));

  return results;
};

module.exports = {
  getArnieQuotes,
};
