const { httpGet } = require('./mock-http-interface')

const errorMessage = { FAILURE: 'Unable to retrieve result message' }

const mapResponseToArnieQuote = (result) => {
	const { status, body } = result?.value ?? {}
	const parsedBody = body && JSON.parse(body)

	if (!parsedBody || !parsedBody.message) return errorMessage

	const resultKey = status === 200 ? 'Arnie Quote' : 'FAILURE'

	return { [resultKey]: parsedBody.message }
}

const getArnieQuotes = async (urls) => {
	const results = await Promise.allSettled(urls.map(httpGet))

	return results.map(mapResponseToArnieQuote)
}

module.exports = {
	getArnieQuotes,
}
