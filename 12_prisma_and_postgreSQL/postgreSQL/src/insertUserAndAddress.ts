import { Client } from "pg";

const client = new Client({
	connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres",
});

async function insertUserAndAddress(
	username: string,
	email: string,
	password: string,
	city: string,
	country: string,
	street: string,
	pincode: string
) {
	try {
		await client.connect();

		await client.query("BEGIN");
		const userRes = await client.query(
			`
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id;
        `,
			[username, email, password]
		);
		const userId = userRes.rows[0].id;
		await client.query(
			`
            INSERT INTO addresses (user_id, city, country, street, pincode)
            VALUES ($1, $2, $3, $4, $5);
        `,
			[userId, city, country, street, pincode]
		);

		await client.query("COMMIT");

		console.log("User and address inserted successfully");
	} catch (err) {
		await client.query("ROLLBACK");
		console.error("Error during transaction, rolled back.", err);
		throw err;
	} finally {
		await client.end();
	}
}

insertUserAndAddress(
	"abhishek",
	"email@gmail.com",
	"secretpassword",
	"state",
	"cntry",
	"street",
	"code"
);
