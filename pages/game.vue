<script setup lang="ts">
import WordleBoard from '@/components/WordleBoard.vue'
import WordleKeyboard from '@/components/WordleKeyboard.vue'
import ResultModal from '@/components/ResultModal.vue'
import { useWordle } from '@/composables/useWordle'
import { useRoute, useRouter } from '#imports'
import { useSounds } from '@/composables/useSounds'

const route = useRoute()
const router = useRouter()
const mode = (route.query.mode as string) === 'pro' ? 'pro' : 'easy'
const isPro = mode === 'pro'
const sounds = useSounds()

const { state, inputLetter, backspace, submit, reset } = useWordle()

const remaining = ref(120) // seconds
let timerId: any = null

const dangerActive = computed(() => isPro && state.status === 'playing' && remaining.value <= 10 && remaining.value > 0)

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

function stopTimer() {
  if (timerId) { clearInterval(timerId); timerId = null }
}

function startTimer() {
  if (!isPro) return
  stopTimer()
  remaining.value = 120
  timerId = setInterval(() => {
    if (state.status !== 'playing') return
    remaining.value = Math.max(0, remaining.value - 1)
    if (remaining.value > 0 && remaining.value <= 10) {
      sounds.dangerTick?.()
    }
    if (remaining.value === 0 && state.status === 'playing') {
      // time up
      stopTimer()
      state.status = 'lost'
      state.message = "Time's up!"
      sounds.lose()
    }
  }, 1000)
}

function onKey(key: string) {
  if (key === 'ENTER') return submit()
  if (key === '⌫') return backspace()
  inputLetter(key)
}

watch(() => state.status, (s) => {
  if (s !== 'playing') stopTimer()
})

onMounted(() => {
  if (isPro) startTimer()
})

onBeforeUnmount(() => stopTimer())

function onNew() {
  reset()
  if (isPro) startTimer()
}
</script>

<template>
  <div class="flex flex-col items-center px-4 pt-6 safe-bottom">
    <header class="w-full max-w-xl flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <button class="text-sm bg-absent hover:bg-gray-600 px-2 py-1 rounded" @click="router.push({ path: '/', replace: true })">Menu</button>
        <h1 class="text-xl sm:text-2xl font-extrabold tracking-wide">Wordle</h1>
        <span v-if="isPro" class="ml-2 text-sm px-2 py-1 rounded bg-absent text-white">PRO</span>
      </div>
      <div class="flex items-center gap-3">
        <div
          v-if="isPro"
          class="text-lg font-mono tabular-nums px-2 py-1 rounded border"
          :class="dangerActive
            ? 'bg-red-600 text-white border-red-500 animate-pulse'
            : 'bg-tile text-gray-100 border-gray-700'"
        >
          {{ formatTime(remaining) }}
        </div>
        <button class="text-sm bg-correct hover:bg-green-600 px-3 py-1.5 rounded" @click="onNew()">New</button>
      </div>
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
        @again="onNew()"
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
