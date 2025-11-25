const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
    const result = await Promise.all(urls.map(url => httpGet(url)));

    return result.map(res => {
        const { message } = JSON.parse(res.body);

        return res.status === 200
            ? { 'Arnie Quote': message }
            : { FAILURE: message };
    });
};

module.exports = {
  getArnieQuotes,
};
