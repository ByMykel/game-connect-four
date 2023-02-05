<script setup lang="ts">
import { RED_PLAYER } from "../constants";
import { defineProps } from "vue";

const props = defineProps<{
  player: number;
  timerCount: number;
  gameIsOver: boolean;
}>();
</script>

<template>
  <div class="w-[335px] sm:w-[632px] z-20 flex justify-center mt-4">
    <Transition name="footer">
      <div
        v-if="!gameIsOver"
        class="w-full grid grid-cols-2 gap-2 items-center"
      >
        <div
          class="bg-stone-100 rounded-xl p-3 shadow-sm border border-stone-200"
        >
          <p class="font-semibold text-md">PLAYER</p>
          <p>
            <span
              class="h-3 w-3 inline-flex rounded-full"
              :class="[player === RED_PLAYER ? 'bg-red-500' : 'bg-yellow-500']"
            ></span>
            {{ player === RED_PLAYER ? "RED" : "YELLOW" }}
          </p>
        </div>
        <div
          class="bg-stone-100 rounded-xl p-3 shadow-sm border border-stone-200"
        >
          <p class="font-semibold text-md">TIME</p>
          <p>{{ timerCount }}s</p>
        </div>
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
