interface User {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
}

function isLegal(user: User): boolean {
	return user.age > 18;
}
