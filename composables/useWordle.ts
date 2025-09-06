import { WORDS } from '@/data/words5'
import { useSounds } from '@/composables/useSounds'

export type LetterState = 'empty' | 'tbd' | 'absent' | 'present' | 'correct'

export interface Cell {
  letter: string
  state: LetterState
}

export interface RowResult {
  letters: Cell[]
}

export interface WordleState {
  board: RowResult[]
  currentRow: number
  currentCol: number
  answer: string
  keyboard: Record<string, Exclude<LetterState, 'empty' | 'tbd'>>
  status: 'playing' | 'won' | 'lost'
  message: string | null
}

const ROWS = 5
const COLS = 5

function pickRandomWord() {
  const idx = Math.floor(Math.random() * WORDS.length)
  return WORDS[idx].toUpperCase()
}

function evaluateGuess(guess: string, answer: string): LetterState[] {
  const res: LetterState[] = Array(COLS).fill('absent')
  const answerChars = answer.split('')
  const guessChars = guess.split('')

  const remaining: Record<string, number> = {}

  // First pass: correct positions
  for (let i = 0; i < COLS; i++) {
    if (guessChars[i] === answerChars[i]) {
      res[i] = 'correct'
    } else {
      const ch = answerChars[i]
      remaining[ch] = (remaining[ch] || 0) + 1
    }
  }

  // Second pass: present but misplaced
  for (let i = 0; i < COLS; i++) {
    if (res[i] === 'correct') continue
    const ch = guessChars[i]
    if (remaining[ch] > 0) {
      res[i] = 'present'
      remaining[ch]--
    } else {
      res[i] = 'absent'
    }
  }

  return res
}

function upgradeStatus(prev: Exclude<LetterState, 'empty' | 'tbd'>, next: Exclude<LetterState, 'empty' | 'tbd'>) {
  const rank: Record<string, number> = { absent: 0, present: 1, correct: 2 }
  return rank[next] > rank[prev] ? next : prev
}

export function useWordle() {
  const sounds = useSounds()
  const state = reactive<WordleState>({
    board: Array.from({ length: ROWS }, () => ({ letters: Array.from({ length: COLS }, () => ({ letter: '', state: 'empty' as LetterState })) })),
    currentRow: 0,
    currentCol: 0,
    answer: pickRandomWord(),
    keyboard: {},
    status: 'playing',
    message: null
  })

  const lettersOnly = (s: string) => s.replace(/[^A-Za-z]/g, '')

  function inputLetter(ch: string) {
    if (state.status !== 'playing') return
    if (state.currentCol >= COLS) return
    ch = lettersOnly(ch).toUpperCase()
    if (!ch) return
    const cell = state.board[state.currentRow].letters[state.currentCol]
    cell.letter = ch
    cell.state = 'tbd'
    state.currentCol++
    sounds.click()
  }

  function backspace() {
    if (state.status !== 'playing') return
    if (state.currentCol === 0) return
    state.currentCol--
    const cell = state.board[state.currentRow].letters[state.currentCol]
    cell.letter = ''
    cell.state = 'empty'
    sounds.backspace()
  }

  function submit() {
    if (state.status !== 'playing') return
    if (state.currentCol < COLS) { sounds.error(); return toast('Not enough letters') }
    const guess = state.board[state.currentRow].letters.map(c => c.letter).join('')
    if (!WORDS.includes(guess.toLowerCase())) {
      sounds.error()
      return toast('Not in word list')
    }

    const evaluation = evaluateGuess(guess, state.answer)
    for (let i = 0; i < COLS; i++) {
      state.board[state.currentRow].letters[i].state = evaluation[i]
      const ch = state.board[state.currentRow].letters[i].letter
      const next = evaluation[i] as Exclude<LetterState, 'empty' | 'tbd'>
      state.keyboard[ch] = state.keyboard[ch] ? upgradeStatus(state.keyboard[ch]!, next) : next
    }

    if (guess === state.answer) {
      state.status = 'won'
      sounds.win()
      return toast('Great! You guessed it!')
    }

    if (state.currentRow === ROWS - 1) {
      state.status = 'lost'
      sounds.lose()
      return toast(`The word was ${state.answer}`)
    }

    state.currentRow++
    state.currentCol = 0
  }

  function toast(msg: string) {
    state.message = msg
    setTimeout(() => {
      if (state.message === msg) state.message = null
    }, 1600)
  }

  function reset(randomize = true) {
    state.board = Array.from({ length: ROWS }, () => ({ letters: Array.from({ length: COLS }, () => ({ letter: '', state: 'empty' as LetterState })) }))
    state.currentRow = 0
    state.currentCol = 0
    state.answer = randomize ? pickRandomWord() : state.answer
    state.keyboard = {}
    state.status = 'playing'
    state.message = null
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') return submit()
    if (e.key === 'Backspace') return backspace()
    if (/^[a-zA-Z]$/.test(e.key)) return inputLetter(e.key)
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))

  return { state, inputLetter, backspace, submit, reset }
}
