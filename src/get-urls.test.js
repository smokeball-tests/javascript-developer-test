const { getUrls } = require('./get-urls');

const urls = [
  'http://www.smokeballdev.com/url1',
  'http://www.smokeballdev.com/url2',
  'http://www.smokeballdev.com/url3',
  'http://www.smokeballdev.com/url4',
];

test('expect no throws', () => {
  expect.assertions(1);
  expect(async () => results = await getUrls(urls)).not.toThrow(); 
});

test('responses to be correct', async () => {
  expect.assertions(5);

  const results = await getUrls(urls);
  
  expect(results.length).toBe(4);

  expect(results[0]).toEqual({ 'Arnie Quote': 'Get to the chopper' });
  expect(results[1]).toEqual({ 'Arnie Quote': 'MY NAME IS NOT QUAID' });
  expect(results[2]).toEqual({ 'Arnie Quote': `What's wrong with Wolfie?` });
  expect(results[3]).toEqual({ 'FAILURE': 'Your request has been terminated' });
});

test('code to be executed in less than 400ms', async () => {
  expect.assertions(2);

  const startTime = process.hrtime();
  await getUrls(urls);
  const [ seconds, nanos ] = process.hrtime(startTime);
  
  expect(seconds).toBe(0);
  expect(nanos / 1000 / 1000).toBeLessThan(400);
});