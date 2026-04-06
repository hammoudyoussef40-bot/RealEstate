import { storeToRefs } from 'pinia'
import { useFiltersStore } from '@/stores/filters/useFiltersStore'

export function useListingFilters() {
  const filtersStore = useFiltersStore()
  const { filters } = storeToRefs(filtersStore)

  return {
    filters,
    resetFilters: filtersStore.resetFilters,
    toggleAmenity: filtersStore.toggleAmenity,
    togglePropertyType: filtersStore.togglePropertyType
  }
}
