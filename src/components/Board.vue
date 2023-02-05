<script setup lang="ts">
import BoardFrontLarge from "./svg/BoardFrontLarge.vue";
import BoardFrontSmall from "./svg/BoardFrontSmall.vue";

import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();

const boardSvgClasses = "absolute top-0 pointer-events-none";
</script>

<template>
  <div class="w-[335px] h-[310px] sm:w-[632px] sm:h-[584px] relative">
    <div
      class="absolute p-[10px] pb-7 sm:p-4 sm:pb-14 grid grid-cols-7 gap-[12px] sm:gap-[16px] w-full h-full"
    >
      <slot></slot>
    </div>
    <BoardFrontLarge v-if="width > 640" class="z-10" :class="boardSvgClasses" />
    <BoardFrontSmall v-else class="z-10" :class="boardSvgClasses" />
    <div class="bg-stone-100 w-full h-full rounded-[3rem]"></div>
  </div>
</template>
