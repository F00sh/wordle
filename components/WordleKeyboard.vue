<script setup lang="ts">
const props = defineProps<{ keyState: Record<string, 'absent' | 'present' | 'correct'> }>()
const emit = defineEmits<{ (e: 'key', value: string): void }>()

const rows = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  ['ENTER', ...'ZXCVBNM'.split(''), '⌫']
]

function onPress(key: string) {
  emit('key', key)
}
</script>

<template>
  <div class="w-full max-w-xl mx-auto mt-4 sm:mt-6 select-none">
    <div class="flex flex-col gap-2">
      <div v-for="(row, idx) in rows" :key="idx" class="flex gap-1 justify-center">
        <button
          v-for="key in row"
          :key="key"
          class="px-2 sm:px-3 py-2 sm:py-3 rounded font-semibold text-xs sm:text-sm uppercase flex-1 basis-0"
          :class="[
            key.length > 1 ? 'flex-[1.5]' : '',
            props.keyState[key]?.toString() === 'correct' ? 'bg-correct text-white' :
            props.keyState[key]?.toString() === 'present' ? 'bg-present text-white' :
            props.keyState[key]?.toString() === 'absent' ? 'bg-absent text-white' : 'bg-tile text-gray-100',
          ]"
          @click="onPress(key)"
        >
          {{ key }}
        </button>
      </div>
    </div>
  </div>
</template>

