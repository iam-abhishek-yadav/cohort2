import { Client } from "pg";

const client = new Client({
	connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres",
});

async function insertIntoUsers(
	username: string,
	password: string,
	email: string
) {
	await client.connect();
	const result = await client.query(
		`
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3)
    `,
		[username, password, email]
	);
	console.log(result);
}

insertIntoUsers("abhishek2", "1232", "email2@gmail.com");
