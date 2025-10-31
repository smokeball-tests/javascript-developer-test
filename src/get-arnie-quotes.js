const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  try {
    const results = await Promise.all(urls.map(async (url) => {
      const res = await httpGet(url);
      return res.status === 200 ? { 'Arnie Quote': (JSON.parse(res.body)).message } : { 'FAILURE': 'Your request has been terminated' };
    }));
    return results;
  } catch (err) {
    throw new Error('Failed to fetch Arnie quotes');
  }
};

module.exports = {
  getArnieQuotes,
};
