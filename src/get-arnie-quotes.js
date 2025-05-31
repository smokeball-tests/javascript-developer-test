const { httpGet } = require('./mock-http-interface');

async function mapUrlToQuote(url) {
  const httpResponse = await httpGet(url);
  const responseBody = JSON.parse(httpResponse.body);

  return httpResponse.status === 200
    ? { 'Arnie Quote': responseBody.message }
    : { 'FAILURE': responseBody.message };
}

const getArnieQuotes = async (urls) => {
  const arnieQuotes = await Promise.all(urls.map(mapUrlToQuote));
  return arnieQuotes;
};

module.exports = {
  getArnieQuotes,
};
