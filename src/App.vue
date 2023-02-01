<script setup lang="ts">
import Board from "./components/Board.vue";
import BoardFooter from "./components/BoardFooter.vue";
import Column from "./components/Column.vue";
import Coin from "./components/Coin.vue";
import Logo from "./components/svg/Logo.vue";

import { useGame } from "./composables/useGame";

const {
  currentPlayer,
  board,
  winnerName,
  addCoin,
  timerCount,
  gameIsOver,
  restart,
} = useGame();

const rowColorClasses = (col: number) => {
  if (gameIsOver.value) return "";

  const classes: { [key: string]: string } = {
    // red
    "red-1": "group-hover:[&:nth-child(1)]:bg-red-500 rounded-full",
    "red-2": "group-hover:[&:nth-child(2)]:bg-red-500 rounded-full",
    "red-3": "group-hover:[&:nth-child(3)]:bg-red-500 rounded-full",
    "red-4": "group-hover:[&:nth-child(4)]:bg-red-500 rounded-full",
    "red-5": "group-hover:[&:nth-child(5)]:bg-red-500 rounded-full",
    "red-6": "group-hover:[&:nth-child(6)]:bg-red-500 rounded-full",
    // yellow
    "yellow-1": "group-hover:[&:nth-child(1)]:bg-yellow-500 rounded-full",
    "yellow-2": "group-hover:[&:nth-child(2)]:bg-yellow-500 rounded-full",
    "yellow-3": "group-hover:[&:nth-child(3)]:bg-yellow-500 rounded-full",
    "yellow-4": "group-hover:[&:nth-child(4)]:bg-yellow-500 rounded-full",
    "yellow-5": "group-hover:[&:nth-child(5)]:bg-yellow-500 rounded-full",
    "yellow-6": "group-hover:[&:nth-child(6)]:bg-yellow-500 rounded-full",
  };

  const firstEmpty = board.value[col].findIndex((row) => row === 0) + 1;
  const player = currentPlayer.value === 1 ? "red" : "yellow";

  return classes[`${player}-${firstEmpty}`];
};
</script>

<template>
  <div class="flex flex-col items-center relative">
    <header class="m-2 p-4 w-[335px] sm:w-[632px] flex justify-between">
      <Logo class="h-10 w-10" />

      <div class="flex items-center">
        <button
          class="rounded-full bg-blue-700/70 hover:bg-blue-500/70 py-1 px-4 text-white text-sm"
          type="button"
          @click="restart()"
        >
          PLAY AGAIN
        </button>
      </div>
    </header>
    <div
      class="w-[335px] h-[310px] lg:w-full sm:w-[632px] sm:h-[584px] flex flex-wrap lg:flex-nowrap justify-center"
    >
      <!-- <div class="bg-red-500 w-2/4 lg:w-auto">player 1</div> -->
      <Board class="order-last lg:order-none">
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
      <!-- <div class="bg-yellow-500 w-2/4 lg:w-auto">player 2</div> -->
    </div>
    <BoardFooter
      :player="currentPlayer"
      :timerCount="timerCount"
      :gameIsOver="gameIsOver"
    />
  </div>
</template>
