<template>
  <ListingSkeletonGrid v-if="isLoading" />
  <ListingGrid
    v-else
    :highlighted-id="highlightedId"
    :listings="filteredListings"
    @hover="setHighlightedListing"
    @toggle-saved="toggleSavedListing"
  />
</template>

<script setup lang="ts">
import ListingGrid from '@/features/listings/listing-search/components/organisms/ListingGrid.vue'
import ListingSkeletonGrid from '@/features/listings/listing-search/components/organisms/ListingSkeletonGrid.vue'
import { useListingSearch } from '@/features/listings/listing-search/composables/useListingSearch'
import { useUserStore } from '@/stores/user/useUserStore'

const { filteredListings, highlightedId, isLoading, setHighlightedListing } = useListingSearch()
const userStore = useUserStore()

function toggleSavedListing(id: string) {
  userStore.toggleSavedListing(id)
}
</script>
