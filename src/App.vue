<script setup lang="ts">
import Column from "./components/Column.vue";
import Coin from "./components/Coin.vue";
import { useGame } from "./composables/game";

const { currentPlayer, board, winner, addCoin } = useGame();

const cellColor = (row: number): string => {
  if (row === 1 || row === 2) return "bg-red-500";
  if (row === -1 || row === -2) return "bg-yellow-500";
  return "";
};

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
    <div class="w-[335px] h-[310px] sm:w-[632px] sm:h-[584px] relative">
      <img
        class="absolute top-0 pointer-events-none"
        src="https://raw.githubusercontent.com/MLongobardi/FEM-connect-four-game/0ff779419634695aabcddf4339e79963dcd21615/static/images/board-layer-black-large.svg"
      />
      <div
        class="absolute p-[10px] pb-7 sm:p-4 sm:pb-14 grid grid-cols-7 gap-[11px] sm:gap-[16px] w-full h-full"
      >
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
      </div>
      <img
        class="absolute top-0 pointer-events-none z-10"
        src="https://raw.githubusercontent.com/MLongobardi/FEM-connect-four-game/0ff779419634695aabcddf4339e79963dcd21615/static/images/board-layer-white-large.svg"
      />
    </div>
  </div>
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-in 2s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-1000px);
  }
  50% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-50px);
  }
  /* 95% {
    transform: translateY(-10px);
  } */
  100% {
    transform: translateY(0);
  }
}
</style>
