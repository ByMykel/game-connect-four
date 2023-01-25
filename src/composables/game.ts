import { computed, ref } from "vue";

export function useGame() {
  const currentPlayer = ref(1);
  const board = ref([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ]);

  // 1 = red, -1 = yellow
  const player = ref(1);

  const winner = computed(() => {
    // check horizontal
    for (let i = 0; i < board.value.length - 4; i++) {
      for (let j = 0; j < board.value[i].length; j++) {
        if (board.value[i][j] === board.value[i + 1][j] && board.value[i][j] === board.value[i + 2][j] && board.value[i][j] === board.value[i + 3][j] && board.value[i][j] !== 0) {
          return {
            winner: [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]],
            player: board.value[i][j],
            type: 1
          };
        }
      }
    }

    // check vertical
    for (let i = 0; i < board.value.length; i++) {
      for (let j = 0; j < board.value[i].length - 4; j++) {
        if (board.value[i][j] === board.value[i][j + 1] && board.value[i][j] === board.value[i][j + 2] && board.value[i][j] === board.value[i][j + 3] && board.value[i][j] !== 0) {
          return {
            winner: [[j, i], [j + 1, i], [j + 2, i], [j + 3, i]],
            player: board.value[i][j],
            type: 2
          };
        }
      }
    }

    // check diagonal
    for (let i = 0; i < board.value.length - 4; i++) {
      for (let j = 0; j < board.value[i].length - 4; j++) {
        if (board.value[i][j] === board.value[i + 1][j + 1] && board.value[i][j] === board.value[i + 2][j + 2] && board.value[i][j] === board.value[i + 3][j + 3] && board.value[i][j] !== 0) {
          return {
            winner: [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]],
            player: board.value[i][j],
            type: 3
          };
        }
      }
    }

    // check diagonal
    for (let i = 0; i < board.value.length - 4; i++) {
      for (let j = 3; j < board.value[i].length; j++) {
        if (board.value[i][j] === board.value[i + 1][j - 1] && board.value[i][j] === board.value[i + 2][j - 2] && board.value[i][j] === board.value[i + 3][j - 3] && board.value[i][j] !== 0) {
          return {
            winner: [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]],
            player: board.value[i][j],
            type: 4
          };
        }
      }
    }

    // check diagonal (other direction)
    for (let i = 3; i < board.value.length; i++) {
      for (let j = 0; j < board.value[i].length - 4; j++) {

        if (board.value[i][j] === board.value[i - 1][j + 1] && board.value[i][j] === board.value[i - 2][j + 2] && board.value[i][j] === board.value[i - 3][j + 3] && board.value[i][j] !== 0) {
          return {
            winner: [[i, j], [i - 1, j + 1], [i - 2, j + 2], [i - 3, j + 3]],
            player: board.value[i][j],
            type: 5
          };
        }
      }
    }

    // check diagonal (other direction)
    for (let i = 3; i < board.value.length; i++) {
      for (let j = 3; j < board.value[i].length; j++) {
        if (board.value[i][j] === board.value[i - 1][j - 1] && board.value[i][j] === board.value[i - 2][j - 2] && board.value[i][j] === board.value[i - 3][j - 3] && board.value[i][j] !== 0) {
          return {
            winner: [[i, j], [i - 1, j - 1], [i - 2, j - 2], [i - 3, j - 3]],
            player: board.value[i][j],
            type: 6
          };
        }
      }
    }

    return false;
  });

  const addCoin = (indexCol: number): void => {
    const col = board.value[indexCol];
    const indexRow = col.findIndex((row) => row === 0);
    if (indexRow === -1) return;
    col[indexRow] = currentPlayer.value;
  
    if (winner.value !== false) {
      const newValue = winner.value.player * 2;
  
      winner.value.winner.forEach((row) => {
        board.value[row[1]][row[0]] = newValue;
      });
  
      alert(`Player ${currentPlayer.value === 1 ? "red" : "yellow"} wins!`);
  
      setTimeout(() => {
        board.value = board.value.map((col) => col.map(() => 0));
      }, 200)
  
      return;
    }
  
    currentPlayer.value = currentPlayer.value === 1 ? -1 : 1;
  };

  return {
    currentPlayer,
    board,
    winner,
    addCoin,
  }
}