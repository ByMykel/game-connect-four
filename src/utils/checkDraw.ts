import { checkWinner } from "./checkWinner";

export const checkDraw = (board: number[][]): boolean => {
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] === 0) {
				return false;
			}
		}
	}

	return checkWinner(board) === null;
}