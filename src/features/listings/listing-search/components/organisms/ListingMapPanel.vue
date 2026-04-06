<template>
  <section class="luxury-panel h-full min-h-[420px] overflow-hidden p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Map View</p>
        <h2 class="mt-2 font-display text-3xl text-slate-950">Property Presence</h2>
      </div>
      <MapPinned class="h-5 w-5 text-gold-600" />
    </div>

    <div class="relative mt-6 flex h-[340px] items-center justify-center overflow-hidden rounded-[2rem] bg-slate-950 text-white">
      <div class="absolute inset-0 bg-grid-fade bg-[length:32px_32px] opacity-20" />
      <div class="relative z-10 mx-auto grid w-full max-w-xl gap-3 px-6 text-center">
        <p class="text-sm uppercase tracking-[0.3em] text-gold-600">Leaflet / Mapbox Ready</p>
        <p class="font-display text-4xl">Interactive map shell is scaffolded.</p>
        <p class="text-sm text-slate-300">
          Hook map bounds, custom pins, and hover-to-highlight sync into this organism next.
        </p>
      </div>
      <div
        v-for="listing in listings"
        :key="listing.id"
        class="absolute h-4 w-4 rounded-full border-2 border-white bg-gold-600 shadow-lg transition"
        :class="highlightedId === listing.id ? 'scale-150' : 'scale-100 opacity-90'"
        :style="pinPosition(listing.id)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { MapPinned } from 'lucide-vue-next'
import type { Listing } from '@/shared/types/listing'

defineProps<{
  highlightedId: string | null
  listings: Listing[]
}>()

function pinPosition(id: string) {
  const coordinates: Record<string, { left: string; top: string }> = {
    '1': { left: '72%', top: '24%' },
    '2': { left: '52%', top: '44%' },
    '3': { left: '28%', top: '68%' },
    '4': { left: '46%', top: '34%' }
  }

  return coordinates[id] ?? { left: '50%', top: '50%' }
}
</script>
