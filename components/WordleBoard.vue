<script setup lang="ts">
import type { RowResult } from '@/composables/useWordle'

defineProps<{ board: RowResult[]; currentRow: number }>()
</script>

<template>
  <div class="grid grid-rows-5 gap-2 w-full max-w-xs sm:max-w-sm mx-auto">
    <div v-for="(row, rIdx) in board" :key="rIdx" class="grid grid-cols-5 gap-2">
      <div
        v-for="(cell, cIdx) in row.letters"
        :key="cIdx"
        class="aspect-square flex items-center justify-center rounded select-none font-bold text-xl sm:text-2xl uppercase transition-colors duration-200 border border-gray-700"
        :class="{
          'bg-tile text-white': cell.state === 'empty' || cell.state === 'tbd',
          'bg-absent text-white': cell.state === 'absent',
          'bg-present text-white': cell.state === 'present',
          'bg-correct text-white': cell.state === 'correct',
        }"
      >
        {{ cell.letter }}
      </div>
    </div>
  </div>
</template>

