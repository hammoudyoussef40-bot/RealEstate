import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const savedListingIds = ref<string[]>([])

  function toggleSavedListing(id: string) {
    if (savedListingIds.value.includes(id)) {
      savedListingIds.value = savedListingIds.value.filter((item) => item !== id)
      return
    }

    savedListingIds.value = [...savedListingIds.value, id]
  }

  return {
    savedListingIds,
    toggleSavedListing
  }
})
