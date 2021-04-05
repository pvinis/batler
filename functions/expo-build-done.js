exports.handler = async event => {
	const subject = event.queryStringParameters.name || 'World'
	const {status} = event.body
	if (status === "finished") {
	}

	return { statusCode: 200 }
}
