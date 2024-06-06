"use client";

import { useState } from "react";

export default function Home() {
	const [response, setResponse] = useState(null);

	const handleClick = async () => {
		try {
			const res = await fetch("/api/user");
			const data = await res.json();
			setResponse(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<button onClick={handleClick}>Call Backend API</button>
			{response && (
				<div>
					<p>Response from backend:</p>
					<pre>{JSON.stringify(response, null, 2)}</pre>
				</div>
			)}
		</main>
	);
}
