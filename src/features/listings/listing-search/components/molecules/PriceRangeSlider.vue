<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between text-sm text-slate-600">
      <span>${{ minValue.toLocaleString() }}</span>
      <span>${{ maxValue.toLocaleString() }}</span>
    </div>
    <div class="grid gap-3">
      <input
        :value="minValue"
        class="accent-gold-600"
        max="5000000"
        min="400000"
        step="50000"
        type="range"
        @input="$emit('update:minValue', Number(($event.target as HTMLInputElement).value))"
      />
      <input
        :value="maxValue"
        class="accent-gold-600"
        max="5000000"
        min="400000"
        step="50000"
        type="range"
        @input="$emit('update:maxValue', Number(($event.target as HTMLInputElement).value))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  maxValue: number
  minValue: number
}>()

defineEmits<{
  'update:maxValue': [value: number]
  'update:minValue': [value: number]
}>()
</script>
