'use strict';

const urlPrefix = `http://www.smokeballdev.com`;

const urlToResponseLookup = {
  [`${urlPrefix}/url1`]: 'Get to the chopper',
  [`${urlPrefix}/url2`]: 'MY NAME IS NOT QUAID',
  [`${urlPrefix}/url3`]: `What's wrong with Wolfie?`,
};

const slowHttpRequestMockP = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const responseData = urlToResponseLookup[url];
    if (responseData) {
      resolve(responseData);
    } else {
      reject(new Error('Your request has been terminated'));
    }
  }, 200);
});

const getUrlP = async (url) => {
  try {
    const message = await slowHttpRequestMockP(url);
    return { status: 200, body: JSON.stringify({ message }) };
  } 
  catch (err) {
    return { status: 500, body: JSON.stringify({ message: err.message }) };
  }
};

module.exports = {
  getUrlP,
};
