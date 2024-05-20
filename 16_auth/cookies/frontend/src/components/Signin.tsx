import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	return (
		<div>
			<input
				onChange={(e) => {
					setUsername(e.target.value);
				}}
				type='text'
				placeholder='username'
			/>
			<input
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				type='password'
				placeholder='password'
			/>
			<button
				onClick={async () => {
					try {
						await axios.post(
							`${BACKEND_URL}/signin`,
							{
								username,
								password,
							},
							{
								withCredentials: true,
							}
						);
						navigate("/user");
					} catch (error) {
						console.error();
					}
				}}>
				Submit
			</button>
		</div>
	);
};
