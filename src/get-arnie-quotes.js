const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const results = [];
  const getArnieQuote = async (url) => {
    const { status, body } = await httpGet(url);
    const message = JSON.parse(body).message;

    if (status === 200) {
      results.push({
        'Arnie Quote': message,
      });
    } else {
      results.push({
        FAILURE: message,
      });
    }
  };

  await Promise.all(
    urls.map(async (url) => {
      return await getArnieQuote(url);
    }),
  );

  return results;
};

module.exports = {
  getArnieQuotes,
};
