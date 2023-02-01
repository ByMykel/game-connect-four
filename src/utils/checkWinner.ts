import { Winner } from '../types';

const areAllEqual = (...items: number[]) => items[0] !== 0 && items.every(item => item === items[0]);

export const checkWinner = (board: number[][]): Winner | null => {
	// Check horizontal
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < board[i].length - 3; j++) {
			if (
				areAllEqual(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])
			) {
				return {
					coins: [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]],
					winner: board[i][j],
					type: 'horizontal',
				};
			}
		}
	}

	// Check vertical
	for (let i = 0; i < board.length - 3; i++) {
		for (let j = 0; j < board[i].length; j++) {
			if (
				areAllEqual(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])
			) {
				return {
					coins: [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]],
					winner: board[i][j],
					type: 'vertical',
				};
			}
		}
	}

	// Check diagonal to the right
	for (let i = 0; i < board.length - 3; i++) {
		for (let j = 0; j < board[i].length - 3; j++) {
			if (
				areAllEqual(board[i][j], board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3])
			) {
				return {
					coins: [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]],
					winner: board[i][j],
					type: 'diagonal-right',
				};
			}
		}
	}

	// Check diagonal to the left
	for (let i = 0; i < board.length - 3; i++) {
		for (let j = 3; j < board[i].length; j++) {
			if (

				areAllEqual(board[i][j], board[i + 1][j - 1], board[i + 2][j - 2], board[i + 3][j - 3])
			) {
				return {
					coins: [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]],
					winner: board[i][j],
					type: 'diagonal-left',
				};
			}
		}
	}

	return null;
};