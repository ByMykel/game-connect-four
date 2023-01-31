<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  row: number;
}>();

const cellColor = (row: number): string => {
  if (row === 1 || row === 2) return "bg-gradient-to-r from-red-400 to-red-600";
  if (row === -1 || row === -2) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
  return "";
};
</script>

<template>
  <div class="w-full h-full">
    <Transition name="bounce">
      <div
        v-if="row !== 0"
        class="flex items-center justify-center w-[37px] h-[37px] sm:w-[72px] sm:h-[72px] rounded-full"
        :class="cellColor(row)"
      >
        <svg
          v-if="row === 2 || row === -2"
          class="pb-[4px] pr-[2px] sm:p-0"
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
</template>

<style>
.bounce-enter-active {
  animation: bounce-in 0.8s;
}

.bounce-leave-active {
  animation: bounce-out 0.5s reverse;
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
  62% {
    transform: translateY(0);
  }
  65% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateY(-1000px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
