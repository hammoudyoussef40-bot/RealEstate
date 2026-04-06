<template>
  <ListingMapPanel :highlighted-id="highlightedId" :listings="filteredListings" />
</template>

<script setup lang="ts">
import ListingMapPanel from '@/features/listings/listing-search/components/organisms/ListingMapPanel.vue'
import { useListingSearch } from '@/features/listings/listing-search/composables/useListingSearch'

const { filteredListings, highlightedId } = useListingSearch()
</script>
