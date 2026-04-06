<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Discover</p>
        <h2 class="mt-2 font-display text-4xl text-slate-950">Curated Listings</h2>
      </div>
      <p class="text-sm text-slate-500">{{ listings.length }} properties match your search.</p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <ListingCard
        v-for="listing in listings"
        :key="listing.id"
        :highlighted="highlightedId === listing.id"
        :listing="listing"
        @hover="$emit('hover', $event)"
        @toggle-saved="$emit('toggleSaved', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Listing } from '@/shared/types/listing'
import ListingCard from '@/features/listings/listing-search/components/organisms/ListingCard.vue'

defineProps<{
  highlightedId: string | null
  listings: Listing[]
}>()

defineEmits<{
  hover: [value: string | null]
  toggleSaved: [value: string]
}>()
</script>
