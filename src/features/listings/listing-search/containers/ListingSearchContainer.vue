<template>
  <div class="app-shell min-h-screen">
    <section class="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
      <div class="luxury-panel overflow-hidden bg-slate-950 px-6 py-8 text-white sm:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.35em] text-gold-600">Estate Atlas</p>
        <div class="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl">
            <h1 class="font-display text-5xl leading-none sm:text-6xl">
              Search exceptional homes with speed, clarity, and intent.
            </h1>
            <p class="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
              A modern listing search experience optimized for luxury discovery, mobile responsiveness,
              and SEO-ready architecture.
            </p>
          </div>
          <ViewModeToggle :current-mode="uiStore.viewMode" @update:mode="uiStore.setViewMode" />
        </div>
      </div>

      <div class="mt-8 grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
        <FilterSidebar
          :amenities="mustHaveAmenities"
          :max-price="filters.maxPrice"
          :min-price="filters.minPrice"
          :property-types="propertyTypes"
          :search="filters.search"
          :selected-amenities="filters.amenities"
          :selected-property-types="filters.propertyTypes"
          @reset="resetFilters"
          @toggle:amenity="toggleAmenity"
          @toggle:property-type="togglePropertyType"
          @update:max-price="filters.maxPrice = Math.max($event, filters.minPrice)"
          @update:min-price="filters.minPrice = Math.min($event, filters.maxPrice)"
          @update:search="filters.search = $event"
        />

        <div class="space-y-8">
          <ListingMapContainer v-if="uiStore.viewMode === 'map'" />
          <ListingResultsContainer />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import FilterSidebar from '@/features/listings/listing-search/components/organisms/FilterSidebar.vue'
import ViewModeToggle from '@/features/listings/listing-search/components/molecules/ViewModeToggle.vue'
import { mustHaveAmenities, propertyTypes } from '@/features/listings/listing-search/constants/filters'
import ListingMapContainer from '@/features/listings/listing-search/containers/ListingMapContainer.vue'
import ListingResultsContainer from '@/features/listings/listing-search/containers/ListingResultsContainer.vue'
import { useListingFilters } from '@/features/listings/listing-search/composables/useListingFilters'
import { useListingSearchUiStore } from '@/features/listings/listing-search/stores/useListingSearchUiStore'

const uiStore = useListingSearchUiStore()
const { filters, resetFilters, toggleAmenity, togglePropertyType } = useListingFilters()
</script>
