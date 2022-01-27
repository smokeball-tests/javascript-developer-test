const { httpGet } = require('./mock-http-interface');

const ARNIE_QUOTE_KEY = 'Arnie Quote';
const FAILURE_KEY = 'FAILURE';

const combineResults = (items) => {
  return Object.assign.apply(null, [{}, ...items]);
};

const sortResult = (result) => {
  return Object.keys(result)
    .sort()
    .reduce((obj, key) => {
      obj[key] = result[key];
      return obj;
    }, {});
};

const getRequest = async (url) => {
  let result = {};
  const response = await httpGet(url);
  switch (response.status) {
    case 200:
      result[`${ARNIE_QUOTE_KEY}`] = JSON.parse(response.body).message;
      break;
    case 500:
      result[`${FAILURE_KEY}`] = JSON.parse(response.body).message;
      break;
    default:
      result = null;
  }
  return { [`${url}`]: result };
};

const getArnieQuotes = async (urls) => {
  // TODO: Implement this function.
  // return results;

  const requestResult = await Promise.all([
    ...urls.map(async (url) => {
      return await getRequest(url);
    }),
  ]).then(combineResults);

  return Object.values(sortResult(requestResult));
};

module.exports = {
  getArnieQuotes,
};
