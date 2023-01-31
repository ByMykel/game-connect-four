<script setup lang="ts">
import TurnBackgroundRed from "./svg/TurnBackgroundRed.vue";
import TurnBackgroundYellow from "./svg/TurnBackgroundYellow.vue";

import { defineProps } from "vue";

const props = defineProps<{
  player: number;
  timerCount: number;
  gameIsOver: boolean;
  winnerName: string;
  restart: () => void;
}>();
</script>

<template>
  <div
    class="h-20 w-[335px] sm:w-[632px] z-20 absolute bottom-[-4rem] sm:-bottom-14 flex justify-center"
  >
    <div v-if="!gameIsOver" class="relative flex justify-center">
      <span class="absolute top-14 text-6xl text-white font-bold"
        >{{ timerCount }}s</span
      >
      <TurnBackgroundRed v-if="player === 1" />
      <TurnBackgroundYellow v-else />
    </div>
    <div
      v-else
      class="bg-white rounded-md shadow border-black border-2 p-4 px-5 sm:px-10 h-[8rem] sm:h-[9rem] text-center"
    >
      <div class="uppercase">
        {{ winnerName }}
      </div>
      <div class="uppercase text-3xl sm:text-5xl">wins</div>

      <button
        class="rounded-full bg-blue-600 hover:bg-blue-500 mt-2 py-1 px-4 text-white"
        type="button"
        @click="restart()"
      >
        PLAY AGAIN
      </button>
    </div>
  </div>
</template>
