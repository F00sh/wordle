let ctx: AudioContext | null = null

function ensureCtx() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = (window.AudioContext || (window as any).webkitAudioContext)
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') {
    ctx.resume?.().catch(() => {})
  }
  return ctx
}

function tone(freq: number, durationMs: number, type: OscillatorType = 'sine', gain = 0.05) {
  const c = ensureCtx()
  if (!c) return
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  g.gain.value = gain
  osc.connect(g).connect(c.destination)
  const now = c.currentTime
  // short envelope to avoid clicks
  g.gain.setValueAtTime(0, now)
  g.gain.linearRampToValueAtTime(gain, now + 0.005)
  g.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000)
  osc.start(now)
  osc.stop(now + durationMs / 1000 + 0.01)
}

function chord(freqs: number[], durationMs: number, type: OscillatorType = 'sine', gain = 0.04) {
  const c = ensureCtx()
  if (!c) return
  const now = c.currentTime
  const g = c.createGain()
  g.gain.value = gain
  g.connect(c.destination)
  g.gain.setValueAtTime(0, now)
  g.gain.linearRampToValueAtTime(gain, now + 0.01)
  g.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000)
  const oscs: OscillatorNode[] = []
  for (const f of freqs) {
    const o = c.createOscillator()
    o.type = type
    o.frequency.value = f
    o.connect(g)
    o.start(now)
    o.stop(now + durationMs / 1000 + 0.02)
    oscs.push(o)
  }
}

export function useSounds() {
  const canVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'
  const vibrate = (pattern: number | number[]) => {
    try { if (canVibrate) navigator.vibrate(pattern as any) } catch {}
  }
  function click() {
    // short high tick
    tone(1400, 35, 'triangle', 0.03)
    vibrate(8)
  }
  function backspace() {
    tone(220, 45, 'square', 0.03)
    vibrate(10)
  }
  function error() {
    tone(160, 120, 'sawtooth', 0.05)
    setTimeout(() => tone(120, 120, 'sawtooth', 0.05), 120)
    vibrate([20, 40, 20])
  }
  function win() {
    // simple upbeat arpeggio C-E-G-C
    const seq = [523.25, 659.25, 783.99, 1046.5]
    seq.forEach((f, i) => setTimeout(() => tone(f, 140, 'sine', 0.06), i * 120))
    vibrate([15, 25, 15, 25, 20])
  }
  function lose() {
    // descending tones
    const seq = [440, 349.23, 261.63]
    seq.forEach((f, i) => setTimeout(() => tone(f, 180, 'triangle', 0.06), i * 170))
    vibrate([40, 40, 40])
  }
  function dangerTick() {
    tone(900, 120, 'square', 0.05)
    vibrate(20)
  }
  return { click, backspace, error, win, lose, dangerTick }
}
