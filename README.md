# Smokeball JavaScript Coding Challenge

## System Requirements

The coding challenge requires the following to be installed on your development machine;
* [nodejs](https://nodejs.org/en/download/) version 10 or above.
* A [git](https://git-scm.com/downloads) client.

## Installation

1. Fork the `javascript-developer-test` repository to your personal github account.
2. Clone the `javascript-developer-test` repository from your personal github account onto your development machine.
3. Open a terminal and `cd` into the root directory of the `javascript-developer-test` repository.
4. Execute `npm install` in the terminal.

## Challenge Instructions

Your challenge is to implement the `getArnieQuotes()` function, which is exported from `./src/get-arnie-quotes.js`.

The `getArnieQuotes()` function accepts an array of strings, with each string containing a URL. 

The unit tests in `./src/get-arnie-quotes.test.js` will provide pre-defined URLs to the function and test your function's implementation. To run the unit tests, execute `npm test` in the terminal.

The goal is to write an implementation of `getArnieQuotes()` that passes all unit tests.

To pass the unit tests, `getArnieQuotes()` must perform the following each URL passed in;

1. Perform a HTTP GET on the URL
2. If the HTTP status code of the response is 200, push an object to the results array with a single key `"Arnie Quote"` and the HTTP response body's `message` property as the key's associated value.
3. If the HTTP status code of the response is not 200, push an object to the results array with a single key `"FAILURE"` and the HTTP response body's `message` property as the key's associated value.

Finally, the `getArnieQuotes()` function must return the overall results array.

Note that in this challenge, the HTTP calls are mocked. You *must* use the provided `httpGet` function to perform your HTTP requests.

## Tips
* Only modify the `get-arnie-quotes.js` file.
* You may introduce additional internal functions in `get-arnie-quotes.js`
* Exploring all of the code files may provide useful hints.
* We are most impressed with readable code that works.

## Submission

Once all unit tests pass, push your code upstream then send us the link to the github repo with your solution.

## Docs

### `getArnieQuotes(urls)`

```jsdoc
Executes a HTTP GET request on each of the URLs, transforms each of the HTTP responses according to the challenge instructions and returns the results.

@param {string[]} urls The urls to be requested
@return {Promise} A promise which resolves to a results array. 

An example results array:

[
  { 'Arnie Quote': 'Some cool quote' },
  { 'FAILURE: 'Your request has been terminated' },
]
```

### `httpGet(url)`

```jsdoc
Executes a faked HTTP GET request on the passed URL.

@param {string} url The url upon which to perform a HTTP GET
@return {Promise} A promise which resolves to a HTTP response. 

An example HTTP response:

{
  status: 200,
  body: "{ 'message': 'Some cool arnie quote' }" // JSON string
}

```
