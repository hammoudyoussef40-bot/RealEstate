<template>
  <aside class="luxury-panel p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">Filters</p>
        <h2 class="mt-2 font-display text-3xl text-slate-950">Refine Search</h2>
      </div>
      <button class="text-sm font-semibold text-slate-500" type="button" @click="$emit('reset')">
        Reset
      </button>
    </div>

    <div class="mt-6 space-y-8">
      <div class="space-y-3">
        <label class="text-sm font-semibold text-slate-700">Location or keyword</label>
        <input
          :value="search"
          class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-gold-600"
          placeholder="Malibu, penthouse, ocean..."
          type="text"
          @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-700">Price Range</h3>
        <PriceRangeSlider
          :max-value="maxPrice"
          :min-value="minPrice"
          @update:max-value="$emit('update:maxPrice', $event)"
          @update:min-value="$emit('update:minPrice', $event)"
        />
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-700">Property Type</h3>
        <div class="flex flex-wrap gap-3">
          <FilterChip
            v-for="type in propertyTypes"
            :key="type"
            :active="selectedPropertyTypes.includes(type)"
            :label="type"
            @click="$emit('toggle:propertyType', type)"
          />
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-semibold text-slate-700">Must-Haves</h3>
        <div class="flex flex-wrap gap-3">
          <FilterChip
            v-for="amenity in amenities"
            :key="amenity"
            :active="selectedAmenities.includes(amenity)"
            :label="amenity"
            @click="$emit('toggle:amenity', amenity)"
          />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Amenity, PropertyType } from '@/shared/types/listing'
import FilterChip from '@/features/listings/listing-search/components/atoms/FilterChip.vue'
import PriceRangeSlider from '@/features/listings/listing-search/components/molecules/PriceRangeSlider.vue'

defineProps<{
  amenities: Amenity[]
  maxPrice: number
  minPrice: number
  propertyTypes: PropertyType[]
  search: string
  selectedAmenities: Amenity[]
  selectedPropertyTypes: PropertyType[]
}>()

defineEmits<{
  reset: []
  'toggle:amenity': [value: Amenity]
  'toggle:propertyType': [value: PropertyType]
  'update:maxPrice': [value: number]
  'update:minPrice': [value: number]
  'update:search': [value: string]
}>()
</script>
