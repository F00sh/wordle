<script setup lang="ts">
const props = defineProps<{ show: boolean; status: 'won' | 'lost'; answer: string }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'again'): void }>()

function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('close')
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" @click="onBackdrop">
        <div class="w-full max-w-sm bg-tile rounded-lg border border-gray-700 shadow-xl p-4 sm:p-6 text-gray-100">
          <div class="text-center">
            <h2 class="text-2xl font-bold mb-2" :class="status === 'won' ? 'text-correct' : 'text-absent'">
              {{ status === 'won' ? 'You Win!' : 'Better Luck Next Time' }}
            </h2>
            <p class="text-sm text-gray-300 mb-4">
              {{ status === 'won' ? 'Nice job guessing the word.' : 'No worries, try another round.' }}
            </p>
            <div class="text-sm mb-6">
              The word was <span class="font-extrabold uppercase">{{ answer }}</span>
            </div>
            <div class="flex gap-2 justify-center">
              <button class="px-4 py-2 rounded bg-correct text-white font-semibold" @click="$emit('again')">Play Again</button>
              <button class="px-4 py-2 rounded bg-absent text-white" @click="$emit('close')">Close</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
  
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

