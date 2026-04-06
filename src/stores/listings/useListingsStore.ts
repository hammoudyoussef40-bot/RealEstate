import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Listing } from '@/shared/types/listing'
import { fetchListings } from '@/features/listings/listing-search/services/listings.api'
import { useFiltersStore } from '@/stores/filters/useFiltersStore'

export const useListingsStore = defineStore('listings', () => {
  const listings = ref<Listing[]>([])
  const isLoading = ref(false)
  const highlightedId = ref<string | null>(null)
  const filtersStore = useFiltersStore()

  const filteredListings = computed(() =>
    listings.value.filter((listing) => {
      const matchesSearch =
        !filtersStore.filters.search ||
        `${listing.title} ${listing.city}`
          .toLowerCase()
          .includes(filtersStore.filters.search.toLowerCase())

      const matchesPrice =
        listing.price >= filtersStore.filters.minPrice &&
        listing.price <= filtersStore.filters.maxPrice

      const matchesType =
        !filtersStore.filters.propertyTypes.length ||
        filtersStore.filters.propertyTypes.includes(listing.propertyType)

      const matchesAmenities =
        !filtersStore.filters.amenities.length ||
        filtersStore.filters.amenities.every((amenity) => listing.amenities.includes(amenity))

      return matchesSearch && matchesPrice && matchesType && matchesAmenities
    })
  )

  async function loadListings() {
    isLoading.value = true

    try {
      listings.value = await fetchListings()
    } finally {
      isLoading.value = false
    }
  }

  function setHighlightedListing(id: string | null) {
    highlightedId.value = id
  }

  return {
    filteredListings,
    highlightedId,
    isLoading,
    listings,
    loadListings,
    setHighlightedListing
  }
})
