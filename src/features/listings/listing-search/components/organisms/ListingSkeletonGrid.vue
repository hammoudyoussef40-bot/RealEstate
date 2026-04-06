<template>
  <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
    <div v-for="index in 6" :key="index" class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4">
      <BaseSkeleton class-name="aspect-[4/3] w-full rounded-[1.5rem]" />
      <div class="mt-4 space-y-3">
        <BaseSkeleton class-name="h-6 w-2/3" />
        <BaseSkeleton class-name="h-4 w-1/3" />
        <BaseSkeleton class-name="h-8 w-1/2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSkeleton from '@/shared/components/atoms/BaseSkeleton.vue'
</script>
