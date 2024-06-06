import { Client } from "pg";

const client = new Client({
	connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres",
});

async function dropTable() {
	await client.connect();
	const result = await client.query(`
        DROP TABLE users
    `);
	console.log(result);
}

dropTable();
