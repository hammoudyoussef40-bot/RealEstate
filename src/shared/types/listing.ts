export interface Listing {
  id: string
  title: string
  price: number
  city: string
  beds: number
  baths: number
  sqft: number
  image: string
  propertyType: PropertyType
  amenities: Amenity[]
  coordinates: {
    lat: number
    lng: number
  }
}

export type PropertyType = 'Villa' | 'Condo' | 'Townhome' | 'Penthouse'

export type Amenity = 'Pool' | 'Gym' | 'Ocean View' | 'Smart Home' | 'Gated'

export interface FilterState {
  search: string
  minPrice: number
  maxPrice: number
  propertyTypes: PropertyType[]
  amenities: Amenity[]
}
