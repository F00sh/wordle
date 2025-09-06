<script setup lang="ts">
import WordleBoard from '@/components/WordleBoard.vue'
import WordleKeyboard from '@/components/WordleKeyboard.vue'
import ResultModal from '@/components/ResultModal.vue'
import { useWordle } from '@/composables/useWordle'

const { state, inputLetter, backspace, submit, reset } = useWordle()

function onKey(key: string) {
  if (key === 'ENTER') return submit()
  if (key === '⌫') return backspace()
  inputLetter(key)
}
</script>

<template>
  <div class="flex flex-col items-center px-4 pt-6 safe-bottom">
    <header class="w-full max-w-xl flex items-center justify-between mb-4">
      <h1 class="text-xl sm:text-2xl font-extrabold tracking-wide">Wordle</h1>
      <button class="text-sm bg-absent hover:bg-gray-600 px-3 py-1.5 rounded" @click="reset()">New</button>
    </header>

    <main class="w-full flex flex-col gap-4 items-center">
      <WordleBoard :board="state.board" :current-row="state.currentRow" />

      <transition name="fade">
        <div v-if="state.message" class="fixed top-4 left-1/2 -translate-x-1/2 bg-tile text-white px-4 py-2 rounded shadow">
          {{ state.message }}
        </div>
      </transition>

      <ResultModal
        :show="state.status !== 'playing'"
        :status="state.status as any"
        :answer="state.answer"
        @again="reset()"
        @close="reset(false)"
      />

      <WordleKeyboard :key-state="state.keyboard" @key="onKey" />
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
