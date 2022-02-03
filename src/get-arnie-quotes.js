const { httpGet } = require("./mock-http-interface");

const parseResponses = (rawResponses) => {
  return rawResponses.map((resp) => {
    const resKey = resp.status === 200 ? `Arnie Quote` : `FAILURE`;
    const body = JSON.parse(resp.body);
    return { [resKey]: body.message };
  });
};

const getArnieQuotes = async (urls) => {
  const rawResp = await Promise.all(
    urls.map(async (url) => {
      const response = await httpGet(url);
      return response;
    })
  );
  return parseResponses(rawResp);
};

module.exports = {
  getArnieQuotes,
};
