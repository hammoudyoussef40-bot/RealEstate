<template>
  <div
    class="animate-pulse rounded-2xl bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200"
    :class="className"
  />
</template>

<script setup lang="ts">
defineProps<{
  className?: string
}>()
</script>
