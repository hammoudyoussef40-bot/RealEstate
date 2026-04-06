import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useListingsStore } from '@/stores/listings/useListingsStore'

export function useListingSearch() {
  const listingsStore = useListingsStore()
  const { filteredListings, highlightedId, isLoading } = storeToRefs(listingsStore)

  onMounted(() => {
    if (!listingsStore.listings.length) {
      void listingsStore.loadListings()
    }
  })

  return {
    filteredListings,
    highlightedId,
    isLoading,
    setHighlightedListing: listingsStore.setHighlightedListing
  }
}
