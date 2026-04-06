<template>
  <article
    class="group overflow-hidden rounded-[2rem] border bg-white transition hover:-translate-y-1 hover:border-gold-600/70 hover:shadow-panel"
    :class="highlighted ? 'border-gold-600 shadow-panel' : 'border-slate-200/80'"
    @mouseenter="$emit('hover', listing.id)"
    @mouseleave="$emit('hover', null)"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
      <img
        v-lazy="listing.image"
        :alt="listing.title"
        class="h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-105"
      />
      <div class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
        {{ listing.propertyType }}
      </div>
    </div>

    <div class="space-y-4 p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-xl font-semibold text-slate-950">{{ listing.title }}</h3>
          <p class="mt-1 text-sm text-slate-500">{{ listing.city }}</p>
        </div>
        <button
          class="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:border-gold-600 hover:text-gold-600"
          type="button"
          @click="$emit('toggleSaved', listing.id)"
        >
          <Heart class="h-4 w-4" />
        </button>
      </div>

      <p class="font-display text-3xl text-slate-950">${{ listing.price.toLocaleString() }}</p>

      <div class="grid grid-cols-3 gap-3 text-sm text-slate-600">
        <div class="rounded-2xl bg-slate-50 px-3 py-3">{{ listing.beds }} Beds</div>
        <div class="rounded-2xl bg-slate-50 px-3 py-3">{{ listing.baths }} Baths</div>
        <div class="rounded-2xl bg-slate-50 px-3 py-3">{{ listing.sqft.toLocaleString() }} Sqft</div>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="amenity in listing.amenities"
          :key="amenity"
          class="rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-600"
        >
          {{ amenity }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import type { Listing } from '@/shared/types/listing'

defineProps<{
  highlighted?: boolean
  listing: Listing
}>()

defineEmits<{
  hover: [value: string | null]
  toggleSaved: [value: string]
}>()
</script>
