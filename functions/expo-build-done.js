exports.handler = async event => {
	console.log("WOW")
	console.log({event})

	const subject = event.queryStringParameters.name || 'World'
// status == finished | errored

	return {
	  statusCode: 200,
	  body: `Hell ${subject}!`,
	}
 }
