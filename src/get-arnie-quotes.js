const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const results = [];
  const getArnieQuote = async (url) => {
    const { status, body } = await httpGet(url);
    const message = JSON.parse(body).message;

    if (status === 200) {
      pushObjectToArray({
        array: results,
        key: 'Arnie Quote',
        value: message,
      });
    } else {
      pushObjectToArray({
        array: results,
        key: 'FAILURE',
        value: message,
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

function pushObjectToArray({ array, key, value }) {
  array.push({
    [key]: value,
  });
}

module.exports = {
  getArnieQuotes,
};
