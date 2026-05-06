const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  return Promise.all(urls.map(async (url) => {
    const { status, body } = await httpGet(url);
    const { message } = JSON.parse(body);

    if (status !== 200) {
      return { 'FAILURE': message };
    }

    return { 'Arnie Quote': message };
  }));
};

module.exports = {
  getArnieQuotes,
};
