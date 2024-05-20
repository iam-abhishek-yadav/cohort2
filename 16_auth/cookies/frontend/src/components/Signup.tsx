import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
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
						await axios.post(`${BACKEND_URL}/signup`, {
							username,
							password,
						});
						navigate("/signin");
					} catch (error) {
						console.error();
					}
				}}>
				Submit
			</button>
		</div>
	);
};
