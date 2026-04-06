import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { FilterState, Amenity, PropertyType } from '@/shared/types/listing'

const defaultFilters = (): FilterState => ({
  search: '',
  minPrice: 400000,
  maxPrice: 5000000,
  propertyTypes: [],
  amenities: []
})

export const useFiltersStore = defineStore('filters', () => {
  const filters = reactive<FilterState>(defaultFilters())

  function togglePropertyType(value: PropertyType) {
    const currentIndex = filters.propertyTypes.indexOf(value)

    if (currentIndex >= 0) {
      filters.propertyTypes.splice(currentIndex, 1)
      return
    }

    filters.propertyTypes.push(value)
  }

  function toggleAmenity(value: Amenity) {
    const currentIndex = filters.amenities.indexOf(value)

    if (currentIndex >= 0) {
      filters.amenities.splice(currentIndex, 1)
      return
    }

    filters.amenities.push(value)
  }

  function resetFilters() {
    Object.assign(filters, defaultFilters())
  }

  return {
    filters,
    resetFilters,
    toggleAmenity,
    togglePropertyType
  }
})
