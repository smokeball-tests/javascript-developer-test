const { getArnieQuotes } = require('./get-arnie-quotes');

const urls = [
  'http://www.smokeballdev.com/arnie0',
  'http://www.smokeballdev.com/arnie1',
  'http://www.smokeballdev.com/arnie2',
  'http://www.smokeballdev.com/arnie3',
];

test('expect no throws', () => {
  expect.assertions(1);
  expect(async () => await getArnieQuotes(urls)).not.toThrow(); 
});

test('responses to be correct', async () => {
  expect.assertions(5);

  const results = await getArnieQuotes(urls);
  
  expect(results.length).toBe(4);

  expect(results[0]).toEqual({ 'Arnie Quote': 'Get to the chopper' });
  expect(results[1]).toEqual({ 'Arnie Quote': 'MY NAME IS NOT QUAID' });
  expect(results[2]).toEqual({ 'Arnie Quote': `What's wrong with Wolfie?` });
  expect(results[3]).toEqual({ 'FAILURE': 'Your request has been terminated' });
});

test('code to be executed in less than 400ms', async () => {
  expect.assertions(2);

  const startTime = process.hrtime();
  await getArnieQuotes(urls);
  const [ seconds, nanos ] = process.hrtime(startTime);
  
  expect(seconds).toBe(0);
  expect(nanos / 1000 / 1000).toBeLessThan(400);
});

// Some additional test scenarios not covered by original tests

test('handles empty array input', async () => {
  expect.assertions(1);
  
  const results = await getArnieQuotes([]);
  expect(results).toEqual([]);
});

test('handles single URL input', async () => {
  expect.assertions(1);
  
  const results = await getArnieQuotes(['http://www.smokeballdev.com/arnie0']);
  expect(results).toEqual([{ 'Arnie Quote': 'Get to the chopper' }]);
});

test('handles large number of URLs', async () => {
  expect.assertions(2);
  
  const largeUrls = Array.from({ length: 10 }, (_, i) => `http://www.smokeballdev.com/arnie${i % 4}`);
  
  const startTime = process.hrtime();
  const results = await getArnieQuotes(largeUrls);
  const [ seconds, nanos ] = process.hrtime(startTime);
  
  expect(results.length).toBe(10);
  expect(nanos / 1000 / 1000).toBeLessThan(400);
  // Since we're processing all URLs in parallel, the time should still be fast
});

test('handles malformed URLs gracefully', async () => {
  expect.assertions(4);
  
  const malformedUrls = ['not-a-url', 'http://invalid', 'ftp://wrong-protocol'];
  
  const results = await getArnieQuotes(malformedUrls);
  
  // Should return 3 results
  expect(results.length).toBe(3);
  
  // All results should be FAILURE objects
  expect(results[0]).toEqual({ 'FAILURE': 'Your request has been terminated' });
  expect(results[1]).toEqual({ 'FAILURE': 'Your request has been terminated' });
  expect(results[2]).toEqual({ 'FAILURE': 'Your request has been terminated' });
});

test('maintains order of results', async () => {
  expect.assertions(3);
  
  const orderedUrls = [
    'http://www.smokeballdev.com/arnie0',
    'http://www.smokeballdev.com/arnie1',
    'http://www.smokeballdev.com/arnie2'
  ];
  
  const results = await getArnieQuotes(orderedUrls);
  
  // Results should maintain the same order as input URLs
  expect(results[0]).toEqual({ 'Arnie Quote': 'Get to the chopper' });
  expect(results[1]).toEqual({ 'Arnie Quote': 'MY NAME IS NOT QUAID' });
  expect(results[2]).toEqual({ 'Arnie Quote': `What's wrong with Wolfie?` });
});

test('handles concurrent calls', async () => {
  expect.assertions(3);
  
  const startTime = process.hrtime();
  
  // Make multiple concurrent calls
  const promises = [
    getArnieQuotes(urls),
    getArnieQuotes(urls),
    getArnieQuotes(urls)
  ];
  
  const allResults = await Promise.all(promises);
  const [ nanos ] = process.hrtime(startTime);
  
  expect(allResults).toHaveLength(3);
  expect(allResults[0]).toEqual(allResults[1]); // Results should be consistent
  expect(nanos / 1000 / 1000).toBeLessThan(400); // Should be fast even with concurrent calls
});
