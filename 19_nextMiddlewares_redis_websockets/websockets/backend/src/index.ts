import express from "express";
import { WebSocketServer, WebSocket } from "ws";

const app = express();
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
	ws.on("error", console.error);

	ws.on("message", function message(data, isBinary) {
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});

	ws.send("Hello! Message From Server!!");
});
