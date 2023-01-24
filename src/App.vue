<script setup lang="ts">
import { ref } from "vue";

const board = ref([
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]);

const currentPlayer = ref(1);

const checkGame = (): Boolean => {
  // check columns
  for (let i = 0; i < board.value.length; i++) {
    let count = 0;

    for (let j of board.value[i]) {
      count += j;
    }

    if (count === 4 || count === -4) {
      return true;
    }
  }

  // check rows
  for (let i = 0; i < board.value[0].length; i++) {
    let count = 0;

    for (let j = 0; j < board.value.length; j++) {
      count += board.value[j][i];
    }

    if (count === 4 || count === -4) {
      return true;
    }
  }

  // check diagonals
  for (let i = 0; i < board.value.length; i++) {
    let count = 0;

    for (let j = 0; j < board.value[0].length; j++) {
      if (i + j < board.value.length) {
        count += board.value[i + j][j];
      }
    }

    if (count === 4 || count === -4) {
      return true;
    }
  }

  for (let i = 0; i < board.value.length; i++) {
    let count = 0;

    for (let j = 0; j < board.value[0].length; j++) {
      if (i - j >= 0) {
        count += board.value[i - j][j];
      }
    }

    if (count === 4 || count === -4) {
      return true;
    }
  }

  return false;
};

const addCoin = (indexCol: number) => {
  const col = board.value[indexCol];
  const indexRow = col.findIndex((row) => row === 0);
  if (indexRow === -1) return;
  col[indexRow] = currentPlayer.value;

  if (checkGame()) {
    setTimeout(() => {
      alert(`Player ${currentPlayer.value === 1 ? 'red' : 'yellow'} wins!`);
      board.value = board.value.map((col) => col.map(() => 0));
    }, 100);

    return;
  }

  currentPlayer.value = currentPlayer.value === 1 ? -1 : 1;
};

const cellColor = (row: number) => {
  if (row === 1) return "bg-red-500";
  if (row === -1) return "bg-yellow-500";
};
</script>

<template>
  <div class="h-screen bg-indigo-500 flex items-end justify-center">
    <div class="flex flex-row items-center justify-center gap-[18px]">
      <div class="absolute bottom-10 pointer-events-none z-10">
        <img src="https://raw.githubusercontent.com/MLongobardi/FEM-connect-four-game/0ff779419634695aabcddf4339e79963dcd21615/static/images/board-layer-black-large.svg" alt="">
      </div>
      <div class="absolute bottom-12 pointer-events-none z-10">
        <img src="https://raw.githubusercontent.com/MLongobardi/FEM-connect-four-game/0ff779419634695aabcddf4339e79963dcd21615/static/images/board-layer-white-large.svg" alt="">
      </div>
      <div
        v-for="(col, indexCol) in board"
        :key="`col-${indexCol}`"
        class="flex flex-col-reverse items-center justify-center gap-[18px] group mb-[84px] sm:mb-24"
        @click="addCoin(indexCol)"
      >
        <div
          v-for="(row, indexRow) in col"
          :key="`row-${indexRow * indexCol}`"
          class="w-10 h-10 sm:w-[70px] sm:h-[70px] group-hover:bg-indigo-700"
        >
          <Transition name="bounce">
            <div
              v-if="row !== 0"
              class="flex items-center justify-center w-full h-full rounded-full"
              :class="cellColor(row)"
            ></div>
          </Transition>
        </div>
      </div>
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
  100% {
    transform: translateY(0);
  }
}
</style>