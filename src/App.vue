<script setup lang="ts">
import Board from "./components/Board.vue";
import Column from "./components/Column.vue";
import Coin from "./components/Coin.vue";

import { useGame } from "./composables/useGame";

const { currentPlayer, board, winner, addCoin } = useGame();

const rowColorClasses = (col: number) => {
  const classes = {
    red: {
      "1": "group-hover:[&:nth-child(1)]:bg-red-500 rounded-full",
      "2": "group-hover:[&:nth-child(2)]:bg-red-500 rounded-full",
      "3": "group-hover:[&:nth-child(3)]:bg-red-500 rounded-full",
      "4": "group-hover:[&:nth-child(4)]:bg-red-500 rounded-full",
      "5": "group-hover:[&:nth-child(5)]:bg-red-500 rounded-full",
      "6": "group-hover:[&:nth-child(6)]:bg-red-500 rounded-full",
    },
    yellow: {
      "1": "group-hover:[&:nth-child(1)]:bg-yellow-500 rounded-full",
      "2": "group-hover:[&:nth-child(2)]:bg-yellow-500 rounded-full",
      "3": "group-hover:[&:nth-child(3)]:bg-yellow-500 rounded-full",
      "4": "group-hover:[&:nth-child(4)]:bg-yellow-500 rounded-full",
      "5": "group-hover:[&:nth-child(5)]:bg-yellow-500 rounded-full",
      "6": "group-hover:[&:nth-child(6)]:bg-yellow-500 rounded-full",
    },
  };

  const firstEmpty = board.value[col].findIndex((row) => row === 0) + 1;
  const player = currentPlayer.value === 1 ? "red" : "yellow";

  return classes[player][firstEmpty];
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
          :class="rowColorClasses(indexCol)"
        ></Coin>
      </Column>
    </Board>
  </div>
</template>
