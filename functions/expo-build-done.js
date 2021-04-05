const fetch = require("node-fetch")
const crypto = require('crypto')


exports.handler = async event => {
	const expoSignature = event.headers['expo-signature']
	const hmac = crypto.createHmac('sha1', process.env.EXPO_WEBHOOK_SECRET)
	hmac.update(event.body)
	const hash = `sha1=${hmac.digest('hex')}`

	if (!safeCompare(expoSignature, hash)) {
		return {
			status: 500,
			body: "Signatures didn't match!",
		}
	}

	const {status} = event.body
	if (status === "finished") {
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

	return { statusCode: 200 }
}
