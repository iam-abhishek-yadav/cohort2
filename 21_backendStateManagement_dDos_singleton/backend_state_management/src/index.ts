import { games } from "./store";
import { startLogger } from "./logger";

startLogger();

function addGame(whitePlayer: string, blackPlayer: string) {
	games.push({
		whitePlayer,
		blackPlayer,
		moves: [],
	});
}

setInterval(() => {
	addGame("player1", "player2");
}, 5000);
