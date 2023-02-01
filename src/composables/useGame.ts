import { computed, ref, onMounted, onUnmounted } from "vue";
import { RED_PLAYER, YELLOW_PLAYER, TIME_TO_PLAY } from "../constants";
import { Winner } from "../types";
import { checkWinner } from "../utils/checkWinner";

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