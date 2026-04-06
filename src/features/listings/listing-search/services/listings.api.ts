import type { Listing } from '@/shared/types/listing'

const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Cliffside Glass Villa',
    price: 2450000,
    city: 'Malibu',
    beds: 4,
    baths: 3,
    sqft: 3800,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    propertyType: 'Villa',
    amenities: ['Pool', 'Ocean View', 'Smart Home'],
    coordinates: { lat: 34.0259, lng: -118.7798 }
  },
  {
    id: '2',
    title: 'Downtown Sky Penthouse',
    price: 1895000,
    city: 'Los Angeles',
    beds: 3,
    baths: 2,
    sqft: 2400,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    propertyType: 'Penthouse',
    amenities: ['Gym', 'Smart Home', 'Gated'],
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: '3',
    title: 'Marina Modern Condo',
    price: 965000,
    city: 'San Diego',
    beds: 2,
    baths: 2,
    sqft: 1540,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    propertyType: 'Condo',
    amenities: ['Pool', 'Gym'],
    coordinates: { lat: 32.7157, lng: -117.1611 }
  },
  {
    id: '4',
    title: 'Architectural Townhome',
    price: 1280000,
    city: 'Santa Monica',
    beds: 3,
    baths: 3,
    sqft: 2100,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    propertyType: 'Townhome',
    amenities: ['Smart Home', 'Gated'],
    coordinates: { lat: 34.0195, lng: -118.4912 }
  }
]

export async function fetchListings(): Promise<Listing[]> {
  await new Promise((resolve) => window.setTimeout(resolve, 700))
  return mockListings
}
