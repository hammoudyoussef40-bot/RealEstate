<template>
  <button
    type="button"
    class="rounded-full border px-4 py-2 text-sm font-semibold transition"
    :class="
      active
        ? 'border-gold-600 bg-gold-600 text-white'
        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
    "
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  active?: boolean
  label: string
}>()
</script>
