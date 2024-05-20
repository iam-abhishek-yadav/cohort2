import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const User = () => {
	const [userData, setUserData] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/user`, {
				withCredentials: true,
			})
			.then((res) => {
				setUserData(res.data);
			});
	}, []);

	return (
		<div>
			You're id is {userData?.userId}
			&nbsp; Your username is {userData?.username}
			<br />
			<br />
			<button
				onClick={() => {
					try {
						axios.post(
							`${BACKEND_URL}/logout`,
							{},
							{
								withCredentials: true,
							}
						);
						navigate("/signin");
					} catch (error) {
						console.error();
					}
				}}>
				Logout
			</button>
		</div>
	);
};
