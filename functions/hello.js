const fetch = require("node-fetch")

exports.handler = async event => {
	const subject = event.queryStringParameters.name || 'World'
	console.log({wow: process.env.WOW})
	if (event.queryStringParameters.name === "bla") {
		await fetch("https://api.github.com/repos/pvinis/batler/dispatches", {
			method: "POST",
			headers: {
				"Authorization": `token ${process.env.GITHUB_TOKEN}`,
			},
			body: JSON.stringify({
				"event_type": "expo_build_done",
			})
		})
	}
	return {
	  statusCode: 200,
	  body: `Hello ${subject}!`,

	}
}
