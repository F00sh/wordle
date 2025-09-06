<script setup lang="ts">
import WordleBoard from '@/components/WordleBoard.vue'
import WordleKeyboard from '@/components/WordleKeyboard.vue'
import ResultModal from '@/components/ResultModal.vue'
import { useWordle } from '@/composables/useWordle'
import { useRoute, useRouter } from '#imports'
import { useSounds } from '@/composables/useSounds'
import ConfirmModal from '@/components/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const mode = (route.query.mode as string) === 'pro' ? 'pro' : 'easy'
const isPro = mode === 'pro'
const sounds = useSounds()

const { state, inputLetter, backspace, submit, reset } = useWordle()

const remaining = ref(120) // seconds
let timerId: any = null

const showQuitConfirm = ref(false)
const showNewConfirm = ref(false)

const paused = computed(() => isPro && state.status === 'playing' && (showQuitConfirm.value || showNewConfirm.value))
const dangerActive = computed(() => isPro && state.status === 'playing' && !paused.value && remaining.value <= 10 && remaining.value > 0)

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

function stopTimer() {
  if (timerId) { clearInterval(timerId); timerId = null }
}

function startTimer(resetTime = true) {
  if (!isPro) return
  stopTimer()
  if (resetTime) remaining.value = 120
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

function pauseTimer() { if (isPro) stopTimer() }
function resumeTimer() { if (isPro && state.status === 'playing' && !timerId) startTimer(false) }

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

function onMenu() {
  pauseTimer()
  showQuitConfirm.value = true
}

function confirmQuit() {
  showQuitConfirm.value = false
  router.push({ path: '/', replace: true })
}

function cancelQuit() {
  showQuitConfirm.value = false
  resumeTimer()
}

function onNewClick() {
  pauseTimer()
  showNewConfirm.value = true
}

function confirmNew() {
  showNewConfirm.value = false
  onNew()
}

function cancelNew() {
  showNewConfirm.value = false
  resumeTimer()
}
</script>

<template>
  <div class="flex flex-col items-center px-4 pt-6 safe-bottom">
    <header class="w-full max-w-xl flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <button class="text-sm bg-absent hover:bg-gray-600 px-2 py-1 rounded" @click="onMenu">Menu</button>
        <h1 class="text-xl sm:text-2xl font-extrabold tracking-wide">Wordle</h1>
        <span v-if="isPro" class="ml-2 text-sm px-2 py-1 rounded bg-absent text-white">PRO</span>
      </div>
      <div class="flex items-center gap-3">
        <div v-if="isPro" class="relative">
          <div
            class="text-lg font-mono tabular-nums px-2 py-1 rounded border"
            :class="dangerActive
              ? 'bg-red-600 text-white border-red-500 animate-pulse'
              : 'bg-tile text-gray-100 border-gray-700'"
          >
            {{ formatTime(remaining) }}
          </div>
          <span
            v-if="paused"
            class="absolute -top-2 -right-2 text-[10px] sm:text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-100 border border-gray-600 uppercase tracking-wide"
          >Paused</span>
        </div>
        <button class="text-sm bg-correct hover:bg-green-600 px-3 py-1.5 rounded" @click="onNewClick">New</button>
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

      <ConfirmModal
        :show="showQuitConfirm"
        title="Quit to Menu?"
        message="Your current game will be lost."
        confirm-text="Quit"
        cancel-text="Stay"
        @confirm="confirmQuit"
        @cancel="cancelQuit"
      />

      <ConfirmModal
        :show="showNewConfirm"
        title="Start New Game?"
        message="Current progress will be lost."
        confirm-text="New Game"
        cancel-text="Cancel"
        @confirm="confirmNew"
        @cancel="cancelNew"
      />

      <WordleKeyboard :key-state="state.keyboard" @key="onKey" />
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
