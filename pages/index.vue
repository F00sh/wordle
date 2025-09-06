<script setup lang="ts">
// Landing screen with mode selection
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 py-10">
    <div class="w-full max-w-md text-center">
      <h1 class="text-3xl font-extrabold mb-2">Wordle</h1>
      <p class="text-gray-300 mb-8">Choose a mode to start playing.</p>

      <div class="space-y-4">
        <NuxtLink
          to="/game?mode=easy"
          class="block w-full bg-correct hover:bg-green-600 text-white font-semibold py-3 rounded-md"
        >
          Easy Mode
        </NuxtLink>

        <NuxtLink
          to="/game?mode=pro"
          class="block w-full bg-present hover:bg-yellow-600 text-white font-semibold py-3 rounded-md"
        >
          Pro Mode (3 min timer)
        </NuxtLink>
      </div>

      <p class="mt-8 text-xs text-gray-400">
        Mobile‑first. Use on‑screen or physical keyboard.
      </p>
    </div>
  </div>
</template>

