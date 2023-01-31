import { computed, ref, onMounted, onUnmounted } from "vue";

const TIME_TO_PLAY = 30;
const RED_PLAYER = 1;
const YELLOW_PLAYER = -1;

type Winner = {
  coins: number[][];
  winner: number;
  type: string;
};

const areAllEqual = (...items: number[]) => items[0] !== 0 && items.every(item => item === items[0]);

export function useGame() {
  const currentPlayer = ref<number>(RED_PLAYER);
  const gameIsOver = ref<boolean>(false);
  const timerCount = ref<number>(TIME_TO_PLAY);
  const timer = ref(null as any);
  const board = ref<number[][]>([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);

  const winnerName = computed(() => {
    const winner = checkWinner(board.value);

    if (winner != null) {
      if (winner.winner > 0) return "Red player";
      if (winner.winner < 0) return "Yellow player";
    }

    return "";
  });

  const changePlayerTurn = (): void => {
    currentPlayer.value = currentPlayer.value === RED_PLAYER ? YELLOW_PLAYER : RED_PLAYER;
    timerCount.value = TIME_TO_PLAY;
  };

  const remarkWinner = (winner: Winner): void => {
    const newValue = winner.winner * 2;
    winner.coins.forEach(row => {
      board.value[row[0]][row[1]] = newValue;
    });
  };

  const clearBoard = async (): Promise<void> => {
    for (let i = 6; i >= 0; i--) {
      for (let j = 0; j < 6; j++) {
        board.value[i][j] = 0;
      }

      await new Promise(resolve => setTimeout(resolve, 150));
    }
  };

  const checkWinner = (board: number[][]): Winner | null => {
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

  const addCoin = (indexCol: number): void => {
    if (gameIsOver.value) return;

    const col = board.value[indexCol];

    // check if the column is full
    const indexRow = col.findIndex((row) => row === 0);
    if (indexRow === -1) return;

    // add coin
    col[indexRow] = currentPlayer.value;

    const winner = checkWinner(board.value);

    // check winner
    if (winner !== null) {
      stopTimer();
      gameIsOver.value = true;

      // replace the winner coins with the double value to highlight them
      remarkWinner(winner);

      return;
    }

    changePlayerTurn();
  };

  const startTimer = (): void => {
    timer.value = setInterval(() => {
      timerCount.value--;

      if (timerCount.value === 0) {
        changePlayerTurn();
      }
    }, 1000);
  };

  const stopTimer = (): void => {
    clearInterval(timer.value);
  };

  const restart = async (): Promise<void> => {
    gameIsOver.value = false;
    stopTimer();
    timerCount.value = TIME_TO_PLAY;
    currentPlayer.value = RED_PLAYER;
    await clearBoard();
    startTimer();
  };

  onMounted(() => {
    startTimer();
  });

  onUnmounted(() => {
    stopTimer();
  });

  return {
    currentPlayer,
    board,
    timerCount,
    gameIsOver,
    winnerName,
    addCoin,
    restart,
  }
}