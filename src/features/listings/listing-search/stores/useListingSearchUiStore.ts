import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useListingSearchUiStore = defineStore('listing-search-ui', () => {
  const viewMode = ref<'list' | 'map'>('list')

  function setViewMode(value: 'list' | 'map') {
    viewMode.value = value
  }

  return {
    setViewMode,
    viewMode
  }
})
