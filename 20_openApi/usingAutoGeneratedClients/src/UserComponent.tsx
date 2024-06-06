import React, { useEffect, useState } from "react";
import { DefaultService, OpenAPI } from "../generated";

OpenAPI.BASE = "http://localhost:8787";

interface UserComponentProps {
	userId: string;
}

const UserComponent: React.FC<UserComponentProps> = ({ userId }) => {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		async function fetchUser() {
			try {
				const userData = await DefaultService.getUsers(userId);
				setUser(userData);
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		}

		fetchUser();
	}, [userId]);

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>{user.name}</h1>
			<p>Age: {user.age}</p>
		</div>
	);
};

export default UserComponent;
