<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  row: number;
}>();

const cellColor = (row: number): string => {
  if (row === 1 || row === 2) return "bg-red-500";
  if (row === -1 || row === -2) return "bg-yellow-500";
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