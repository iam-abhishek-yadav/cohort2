import { Client } from "pg";

const client = new Client({
	connectionString: "postgresql://postgres:mysecretpassword@localhost/postgres",
});

async function createAddressTable() {
	await client.connect();
	const result = await client.query(`
        CREATE TABLE addresses (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          city VARCHAR(100) NOT NULL,
          country VARCHAR(100) NOT NULL,
          street VARCHAR(255) NOT NULL,
          pincode VARCHAR(20),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
	console.log(result);
}

createAddressTable();
