import { GameManager } from "./GameManager";
import { startLogger } from "./logger";

startLogger();

setInterval(() => {
	GameManager.getInstance().addGame({
		id: Math.random().toString(),
		whitePlayer: "player1",
		blackPlayer: "player2",
		moves: [],
	});
}, 5000);
