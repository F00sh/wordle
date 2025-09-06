<script setup lang="ts">
defineProps<{
  show: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}>()
const emit = defineEmits<{ (e: 'confirm'): void; (e: 'cancel'): void }>()

function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) emit('cancel')
}
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" @click="onBackdrop">
        <div class="w-full max-w-sm bg-tile rounded-lg border border-gray-700 shadow-xl p-4 sm:p-6 text-gray-100">
          <div class="text-center">
            <h2 class="text-xl font-bold mb-2">{{ title || 'Are you sure?' }}</h2>
            <p class="text-sm text-gray-300 mb-6">{{ message || 'This action cannot be undone.' }}</p>
            <div class="flex gap-2 justify-center">
              <button class="px-4 py-2 rounded bg-absent text-white" @click="$emit('cancel')">{{ cancelText || 'Cancel' }}</button>
              <button class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold" @click="$emit('confirm')">{{ confirmText || 'Confirm' }}</button>
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

