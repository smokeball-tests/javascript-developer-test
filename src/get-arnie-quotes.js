const { httpGet } = require('./mock-http-interface');

const SUCCESS_KEY = 'Arnie Quote';
const ERROR_KEY = 'FAILURE';

/**
 * 
 * @param {{ status: string, value: {status: number, body: string}, reason: string }} A resolved promise object 
 * @returns {{['Arnie Quote' | 'FAILURE']: string}} the transformed object   
 */
const handleResponse = (responseObj) => {
  const { value } = responseObj;
  const { status, body } = value;

  const messageObj = JSON.parse(body);

  if (status === 200) {
    return {
      [SUCCESS_KEY]: messageObj.message
    };
  }

  return {
    [ERROR_KEY]: messageObj.message
  };
}

/**
 * @param {urls string[]} a list of urls
 * @returns {Promise{ ['Arnie Quote' | 'FAILURE']: string }[]} a result array
 */
const getArnieQuotes = async (urls) => {

  const requests = urls.map(url => httpGet(url));

  const responseObjs = await Promise.allSettled(requests);

  return responseObjs.map(handleResponse);
};

module.exports = {
  getArnieQuotes,
};
