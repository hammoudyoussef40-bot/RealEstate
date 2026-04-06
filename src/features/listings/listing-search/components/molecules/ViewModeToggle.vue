<template>
  <div class="inline-flex rounded-full border border-slate-200 bg-white p-1">
    <button
      v-for="mode in modes"
      :key="mode.value"
      type="button"
      class="rounded-full px-4 py-2 text-sm font-semibold transition"
      :class="
        currentMode === mode.value
          ? 'bg-slate-950 text-white'
          : 'text-slate-600 hover:text-slate-950'
      "
      @click="$emit('update:mode', mode.value)"
    >
      {{ mode.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentMode: 'list' | 'map'
}>()

defineEmits<{
  'update:mode': [value: 'list' | 'map']
}>()

const modes = [
  { label: 'List', value: 'list' },
  { label: 'Map', value: 'map' }
] as const
</script>
