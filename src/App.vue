<script setup lang="ts">
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
  <div class="flex items-end justify-center">
    <div class="relative max-w-2xl w-full h-full aspect-square">
      <div>
        <img
          class="absolute bottom-2 pointer-events-none w-full -z-0"
          src="https://raw.githubusercontent.com/MLongobardi/FEM-connect-four-game/0ff779419634695aabcddf4339e79963dcd21615/static/images/board-layer-black-large.svg"
        />
        <img
          class="absolute bottom-[14px] pointer-events-none z-20 w-full"
          src="https://raw.githubusercontent.com/MLongobardi/FEM-connect-four-game/0ff779419634695aabcddf4339e79963dcd21615/static/images/board-layer-white-large.svg"
        />
      </div>

      <div
        class="
          grid grid-cols-7
          p-2
          sm:p-4
          gap-[8px]
          sm:gap-[10px]
          w-full
          h-full
          z-10
          pt-[28px]
          pb-[51px]
          sm:pb-[65px] sm:pt-[53px]
        "
      >
        <div
          v-for="(col, indexCol) in board"
          :key="`col-${indexCol}`"
          class="flex flex-col-reverse gap-[12px] group relative z-10"
          @click="addCoin(indexCol)"
        >
          <div
            v-for="(row, indexRow) in col"
            :key="`row-${indexRow * indexCol}`"
            class="w-full h-full"
            :class="rowColor(indexCol)"
          >
            <Transition name="bounce">
              <div
                v-if="row !== 0"
                class="
                  flex
                  items-center
                  justify-center
                  w-full
                  h-full
                  rounded-full
                "
                :class="cellColor(row)"
              >
                <svg
                  v-if="row === 2 || row === -2"
                  width="24px"
                  height="24px"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="#000000"
                >
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="#fff"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
            </Transition>
          </div>
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