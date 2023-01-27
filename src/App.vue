<script setup lang="ts">
import Board from "./components/Board.vue";
import Column from "./components/Column.vue";
import Coin from "./components/Coin.vue";

import { useGame } from "./composables/useGame";

const { currentPlayer, board, winner, addCoin } = useGame();

const rowColor = (col: number) => {
  const firstEmpty = board.value[col].findIndex((row) => row === 0) + 1;
  const player = currentPlayer.value === 1 ? "red" : "yellow";

  return `coin-row-${player}-${firstEmpty}`;
};
</script>

<template>
  <div class="flex flex-col items-center">
    <header
      class="h-20 bg-indigo-300 m-2 rounded-md p-4 w-56 flex items-center justify-center"
    >
      placeholder
    </header>
    <Board>
      <Column
        v-for="(col, indexCol) in board"
        :key="`col-${indexCol}`"
        @click="addCoin(indexCol)"
      >
        <Coin
          v-for="(row, indexRow) in col"
          :key="`row-${indexRow * indexCol}`"
          :row="row"
          :class="rowColor(indexCol)"
        ></Coin>
      </Column>
    </Board>
  </div>
</template>
