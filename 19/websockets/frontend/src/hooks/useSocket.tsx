import { useEffect, useState } from "react";

function useSocket(url: string) {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		const newSocket = new WebSocket(url);

		newSocket.onopen = () => {
			console.log("Connection established");
			newSocket.send("Hello server");
		};

		newSocket.onmessage = (message) => {
			console.log("Message received:", message.data);
			setMessages((prevMessages) => [...prevMessages, message.data]);
		};

		setSocket(newSocket);

		return () => {
			newSocket.close();
		};
	}, [url]);

	return { socket, messages };
}

export default useSocket;
