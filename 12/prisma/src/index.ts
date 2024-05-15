import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(
	username: string,
	password: string,
	firstName: string,
	lastName: string
) {
	const resp = await prisma.user.create({
		data: {
			username,
			password,
			firstName,
			lastName,
		},
	});
	console.log(resp);
}

insertUser("user", "pass", "first", "last");
