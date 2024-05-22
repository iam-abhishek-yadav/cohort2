import { createClient } from "redis";

const client = createClient();

async function processSubmission(submission: string) {
	const { problemId, code, language } = JSON.parse(submission);
	console.log(`Processing submission for problemId ${problemId}...`);
	console.log(`Code: ${code}`);
	console.log(`Language: ${language}`);
	await new Promise((resolve) => setTimeout(resolve, 1000));
	console.log(`Finished processing submission for problemId ${problemId}.`);
	client.publish("problem_done", JSON.stringify({ problemId, status: "TLE" }));
}

async function startWorker() {
	try {
		await client.connect();
		console.log("Worker connected to Redis.");
		while (true) {
			try {
				const submission = await client.brPop("problems", 0);
				// @ts-ignore
				await processSubmission(submission.element);
			} catch (error) {
				console.error("Error processing submission:", error);
			}
		}
	} catch (error) {
		console.error("Failed to connect to Redis", error);
	}
}

startWorker();
