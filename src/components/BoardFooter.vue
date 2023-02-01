<script setup lang="ts">
import TurnBackgroundRed from "./svg/TurnBackgroundRed.vue";
import TurnBackgroundYellow from "./svg/TurnBackgroundYellow.vue";

import { RED_PLAYER } from "../constants";
import { defineProps } from "vue";

const props = defineProps<{
  player: number;
  timerCount: number;
  gameIsOver: boolean;
}>();
</script>

<template>
  <div
    class="h-20 w-[335px] sm:w-[632px] z-20 absolute bottom-[-4rem] sm:-bottom-14 flex justify-center"
  >
    <Transition name="footer">
      <div v-if="!gameIsOver" class="relative flex justify-center">
        <span class="absolute top-14 text-6xl text-white font-bold"
          >{{ timerCount }}s</span
        >
        <TurnBackgroundRed v-if="player === RED_PLAYER" />
        <TurnBackgroundYellow v-else />
      </div>
    </Transition>
  </div>
</template>

<style>
.footer-enter-active {
  animation: footer-in 0.2s;
}

.footer-leave-active {
  animation: footer-in 0.2s reverse;
}

@keyframes footer-in {
  0% {
    transform: translateY(120px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
