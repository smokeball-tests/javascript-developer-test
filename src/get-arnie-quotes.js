const { httpGet } = require('./mock-http-interface');

const responseTransformer = (response) => {
  const { status, body } = response;
  // Parse the body to get the message
  const { message } = JSON.parse(body);
  // If the status is 200, return an object with the quote
  if (status === 200) {
    return { 'Arnie Quote': message };
  }
  // otherwise return an object with the failure message
  return { 'FAILURE': message };
};

const getArnieQuotes = async (urls) => {
  // httpGet never rejects, so we dont need a try/catch
  const quotePromises = urls.map(async (url) => {
    const response = await httpGet(url)
    return responseTransformer(response);
  })

  return await Promise.all(quotePromises);
};

module.exports = {
  getArnieQuotes,
};
