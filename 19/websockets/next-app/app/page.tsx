"use client";

import React from "react";
import useSocket from "./hooks/useSocket";

const HomePage = () => {
	const { socket, messages } = useSocket("ws://localhost:8080");

	return (
		<div>
			<h1>WebSocket Connection</h1>
			<div>
				<h2>Messages</h2>
				<ul>
					{messages.map((message, index) => (
						<li key={index}>{message}</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default HomePage;
