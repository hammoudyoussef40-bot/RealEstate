<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  Bath,
  BedDouble,
  Building2,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Menu,
  MoveRight,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  X
} from 'lucide-vue-next'

type Property = {
  id: number
  title: string
  address: string
  city: string
  type: 'Villa' | 'Penthouse' | 'Apartment' | 'Townhouse'
  price: number
  beds: number
  baths: number
  sqft: number
  image: string
  isNew: boolean
}

type Testimonial = {
  id: number
  name: string
  role: string
  quote: string
}

const properties = ref<Property[]>([
  {
    id: 1,
    title: 'Oceanfront Glass Villa',
    address: '18 Shoreline Crest',
    city: 'Malibu, CA',
    type: 'Villa',
    price: 12800000,
    beds: 5,
    baths: 6,
    sqft: 5240,
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    isNew: true
  },
  {
    id: 2,
    title: 'Skyline Reserve Penthouse',
    address: '400 Park Avenue',
    city: 'New York, NY',
    type: 'Penthouse',
    price: 9450000,
    beds: 4,
    baths: 4,
    sqft: 3380,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    isNew: true
  },
  {
    id: 3,
    title: 'Garden Court Residence',
    address: '77 Magnolia Lane',
    city: 'Austin, TX',
    type: 'Townhouse',
    price: 2140000,
    beds: 3,
    baths: 3,
    sqft: 2460,
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    isNew: false
  },
  {
    id: 4,
    title: 'Harbor View Apartment',
    address: '9 Pier House Boulevard',
    city: 'Miami, FL',
    type: 'Apartment',
    price: 1795000,
    beds: 2,
    baths: 2,
    sqft: 1540,
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    isNew: true
  },
  {
    id: 5,
    title: 'Stonewood Family Estate',
    address: '615 Westridge Drive',
    city: 'Denver, CO',
    type: 'Villa',
    price: 3650000,
    beds: 5,
    baths: 5,
    sqft: 4180,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    isNew: false
  },
  {
    id: 6,
    title: 'Parkside Modern Loft',
    address: '52 Elm Terrace',
    city: 'Chicago, IL',
    type: 'Apartment',
    price: 1325000,
    beds: 2,
    baths: 2,
    sqft: 1320,
    image:
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
    isNew: false
  }
])

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Nadia Farah',
    role: 'Home Buyer',
    quote:
      'Hammoud Estates made a complex move feel structured and calm. Every shortlist felt intentional, and every recommendation matched our priorities.'
  },
  {
    id: 2,
    name: 'Youssef Alamin',
    role: 'Property Investor',
    quote:
      'The team understands presentation, pricing, and timing. We listed with confidence and closed above expectations without the usual friction.'
  },
  {
    id: 3,
    name: 'Layla Haddad',
    role: 'Seller',
    quote:
      'From staging guidance to negotiations, the process felt premium from start to finish. It was measured, informed, and genuinely professional.'
  }
]

const whyChooseUs = [
  {
    title: 'Curated Inventory',
    copy: 'A tighter portfolio of quality homes, selected for design, location, and long-term value.',
    icon: Building2
  },
  {
    title: 'Market-Led Advice',
    copy: 'We combine pricing discipline with neighborhood insight to guide strong, defensible decisions.',
    icon: TrendingUp
  },
  {
    title: 'Trusted Representation',
    copy: 'Discreet communication, meticulous process management, and negotiation that protects your position.',
    icon: ShieldCheck
  }
]

const favoriteIds = ref<number[]>([])
const location = ref('')
const propertyType = ref('Any Type')
const priceRange = ref('Any Price')
const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const currentTestimonial = ref(0)

const filteredProperties = computed(() => {
  return properties.value.filter((property) => {
    const matchesLocation =
      !location.value ||
      `${property.address} ${property.city} ${property.title}`
        .toLowerCase()
        .includes(location.value.toLowerCase())

    const matchesType =
      propertyType.value === 'Any Type' || property.type === propertyType.value

    const matchesPrice =
      priceRange.value === 'Any Price' ||
      (priceRange.value === 'Under $2M' && property.price < 2000000) ||
      (priceRange.value === '$2M - $5M' &&
        property.price >= 2000000 &&
        property.price <= 5000000) ||
      (priceRange.value === '$5M+' && property.price > 5000000)

    return matchesLocation && matchesType && matchesPrice
  })
})

let testimonialTimer: number | undefined

const handleScroll = () => {
  scrolled.value = window.scrollY > 24
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)

const toggleFavorite = (id: number) => {
  favoriteIds.value = favoriteIds.value.includes(id)
    ? favoriteIds.value.filter((favoriteId) => favoriteId !== id)
    : [...favoriteIds.value, id]
}

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
}

const previousTestimonial = () => {
  currentTestimonial.value =
    currentTestimonial.value === 0
      ? testimonials.length - 1
      : currentTestimonial.value - 1
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  testimonialTimer = window.setInterval(nextTestimonial, 6000)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  if (testimonialTimer) {
    window.clearInterval(testimonialTimer)
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header
      :class="[
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur'
          : 'bg-transparent'
      ]"
    >
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <a href="#" class="flex min-w-0 items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-sm font-semibold tracking-[0.25em] text-slate-900"
          >
            HE
          </div>
          <div class="min-w-0">
            <p class="truncate font-display text-base font-semibold tracking-[0.08em] text-slate-950 sm:text-lg">
              Hammoud Estates
            </p>
            <p class="truncate text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:text-xs sm:tracking-[0.28em]">
              Luxury Residential
            </p>
          </div>
        </a>

        <div class="hidden items-center gap-8 lg:flex">
          <a href="#featured" class="text-sm font-medium text-slate-700 transition hover:text-slate-950">
            Featured
          </a>
          <a href="#services" class="text-sm font-medium text-slate-700 transition hover:text-slate-950">
            Why Us
          </a>
          <a
            href="#testimonials"
            class="text-sm font-medium text-slate-700 transition hover:text-slate-950"
          >
            Testimonials
          </a>
          <a
            href="#footer"
            class="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            List a Property
          </a>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 lg:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Menu v-if="!mobileMenuOpen" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </nav>

      <div v-if="mobileMenuOpen" class="border-t border-slate-200 bg-white lg:hidden">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6">
          <a href="#featured" class="text-sm font-medium text-slate-700" @click="mobileMenuOpen = false">
            Featured
          </a>
          <a href="#services" class="text-sm font-medium text-slate-700" @click="mobileMenuOpen = false">
            Why Us
          </a>
          <a
            href="#testimonials"
            class="text-sm font-medium text-slate-700"
            @click="mobileMenuOpen = false"
          >
            Testimonials
          </a>
          <a
            href="#footer"
            class="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            @click="mobileMenuOpen = false"
          >
            List a Property
          </a>
        </div>
      </div>
    </header>

    <main>
      <section class="relative isolate overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury architectural residence"
          class="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/55" />

        <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div class="grid items-end gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,520px)]">
            <div class="max-w-3xl">
              <p class="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-slate-200 sm:mb-6 sm:text-sm sm:tracking-[0.34em]">
                Refined Homes. Serious Representation.
              </p>
              <h1 class="font-display text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Modern real estate marketing built for exceptional properties.
              </h1>
              <p class="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
                Hammoud Estates pairs elevated presentation with practical market strategy, helping
                buyers and sellers move with clarity in the most competitive neighborhoods.
              </p>

              <div class="mt-8 flex flex-col gap-4 text-sm text-slate-200 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <div class="flex items-center gap-2">
                  <Star class="h-4 w-4 text-amber-300" />
                  <span>4.9 average client rating</span>
                </div>
                <div class="flex items-center gap-2">
                  <ShieldCheck class="h-4 w-4 text-amber-300" />
                  <span>Discreet, full-service guidance</span>
                </div>
              </div>
            </div>

            <div class="rounded-[28px] bg-white p-5 shadow-2xl shadow-black/20 sm:p-6">
              <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Property Search
              </p>
              <h2 class="mt-3 text-xl font-semibold text-slate-950 sm:text-2xl">
                Start with the right shortlist
              </h2>

              <div class="mt-6 grid gap-4">
                <label class="grid gap-2">
                  <span class="text-sm font-medium text-slate-700">Location</span>
                  <div class="relative">
                    <MapPin class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      v-model="location"
                      type="text"
                      placeholder="City, neighborhood, or address"
                      class="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-950 focus:bg-white"
                    />
                  </div>
                </label>

                <div class="grid gap-4 sm:grid-cols-2">
                  <label class="grid gap-2">
                    <span class="text-sm font-medium text-slate-700">Property Type</span>
                    <select
                      v-model="propertyType"
                      class="h-12 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-950 focus:bg-white"
                    >
                      <option>Any Type</option>
                      <option>Villa</option>
                      <option>Penthouse</option>
                      <option>Apartment</option>
                      <option>Townhouse</option>
                    </select>
                  </label>

                  <label class="grid gap-2">
                    <span class="text-sm font-medium text-slate-700">Price Range</span>
                    <select
                      v-model="priceRange"
                      class="h-12 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-slate-950 focus:bg-white"
                    >
                      <option>Any Price</option>
                      <option>Under $2M</option>
                      <option>$2M - $5M</option>
                      <option>$5M+</option>
                    </select>
                  </label>
                </div>

                <button
                  type="button"
                  class="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Explore Listings
                  <MoveRight class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="border-b border-slate-200 bg-white">
        <div
          class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 text-center sm:grid-cols-3 sm:px-6 lg:px-8"
        >
          <div>
            <p class="text-3xl font-semibold text-slate-950">250+</p>
            <p class="mt-2 text-sm text-slate-600">Curated luxury transactions closed</p>
          </div>
          <div>
            <p class="text-3xl font-semibold text-slate-950">$840M</p>
            <p class="mt-2 text-sm text-slate-600">Represented in combined property value</p>
          </div>
          <div>
            <p class="text-3xl font-semibold text-slate-950">18 days</p>
            <p class="mt-2 text-sm text-slate-600">Average time to qualified offer on premium listings</p>
          </div>
        </div>
      </section>

      <section id="featured" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Featured Listings
            </p>
            <h2 class="mt-3 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
              Signature homes for buyers who value precision and design
            </h2>
          </div>
          <p class="max-w-xl text-sm leading-7 text-slate-600">
            Browse a selection of active properties matched against your search criteria in real
            time.
          </p>
        </div>

        <div v-if="filteredProperties.length" class="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="property in filteredProperties"
            :key="property.id"
            class="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div class="relative aspect-video overflow-hidden">
              <img
                :src="property.image"
                :alt="property.title"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span
                v-if="property.isNew"
                class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950"
              >
                New
              </span>
              <button
                type="button"
                :aria-label="`Toggle favorite for ${property.title}`"
                class="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/90 text-slate-900 backdrop-blur transition hover:scale-105"
                @click="toggleFavorite(property.id)"
              >
                <Heart
                  class="h-5 w-5"
                  :class="favoriteIds.includes(property.id) ? 'fill-slate-950 text-slate-950' : 'text-slate-700'"
                />
              </button>
            </div>

            <div class="p-5 sm:p-6">
              <div class="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
                <div class="min-w-0">
                  <p class="text-xl font-semibold text-slate-950 sm:text-2xl">
                    {{ formatPrice(property.price) }}
                  </p>
                  <h3 class="mt-3 text-lg font-semibold text-slate-900 sm:text-xl">
                    {{ property.title }}
                  </h3>
                </div>
                <span
                  class="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500"
                >
                  {{ property.type }}
                </span>
              </div>

              <div class="mt-4 flex items-start gap-2 text-sm text-slate-500">
                <MapPin class="mt-0.5 h-4 w-4 shrink-0" />
                <span class="min-w-0">{{ property.address }}, {{ property.city }}</span>
              </div>

              <div class="mt-6 grid grid-cols-1 gap-3 border-t border-slate-200 pt-5 text-sm text-slate-600 min-[460px]:grid-cols-3">
                <div class="flex items-center gap-2">
                  <BedDouble class="h-4 w-4 text-slate-900" />
                  <span>{{ property.beds }} Beds</span>
                </div>
                <div class="flex items-center gap-2">
                  <Bath class="h-4 w-4 text-slate-900" />
                  <span>{{ property.baths }} Baths</span>
                </div>
                <div class="flex items-center gap-2">
                  <Ruler class="h-4 w-4 text-slate-900" />
                  <span>{{ property.sqft.toLocaleString() }} Sqft</span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div
          v-else
          class="mt-12 rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center sm:py-16"
        >
          <Sparkles class="mx-auto h-10 w-10 text-slate-400" />
          <h3 class="mt-4 text-2xl font-semibold text-slate-950">No properties found</h3>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            Try widening your search by selecting another property type, adjusting the price range,
            or searching for a broader location.
          </p>
        </div>
      </section>

      <section id="services" class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Why Choose Us
            </p>
            <h2 class="mt-3 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
              Service designed around trust, clarity, and measurable outcomes
            </h2>
          </div>

          <div class="mt-12 grid gap-6 lg:grid-cols-3">
            <article
              v-for="item in whyChooseUs"
              :key="item.title"
              class="rounded-[28px] border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg sm:p-8"
            >
              <div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white">
                <component :is="item.icon" class="h-5 w-5" />
              </div>
              <h3 class="mt-6 text-xl font-semibold text-slate-950">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                {{ item.copy }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="testimonials" class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div class="max-w-2xl">
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
              Client Stories
            </p>
            <h2 class="mt-3 font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
              Professional guidance that clients remember for the right reasons
            </h2>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition hover:border-slate-950"
              @click="previousTestimonial"
            >
              <ChevronLeft class="h-5 w-5" />
            </button>
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition hover:border-slate-950"
              @click="nextTestimonial"
            >
              <ChevronRight class="h-5 w-5" />
            </button>
          </div>
        </div>

        <div class="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <article class="rounded-[32px] bg-slate-950 p-6 text-white shadow-xl sm:p-10">
            <div class="flex gap-1 text-amber-300">
              <Star v-for="star in 5" :key="star" class="h-5 w-5 fill-current" />
            </div>
            <p class="mt-6 text-xl leading-8 text-slate-100 sm:mt-8 sm:text-2xl sm:leading-10">
              "{{ testimonials[currentTestimonial].quote }}"
            </p>
            <div class="mt-10">
              <p class="text-lg font-semibold">{{ testimonials[currentTestimonial].name }}</p>
              <p class="mt-1 text-sm uppercase tracking-[0.2em] text-slate-400">
                {{ testimonials[currentTestimonial].role }}
              </p>
            </div>
          </article>

          <div class="grid gap-4">
            <button
              v-for="(item, index) in testimonials"
              :key="item.id"
              type="button"
              class="rounded-[24px] border p-5 text-left transition-all duration-300 sm:p-6"
              :class="
                index === currentTestimonial
                  ? 'border-slate-950 bg-white shadow-lg'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
              "
              @click="currentTestimonial = index"
            >
              <p class="text-lg font-semibold text-slate-950">{{ item.name }}</p>
              <p class="mt-1 text-xs uppercase tracking-[0.22em] text-slate-500">{{ item.role }}</p>
              <p class="mt-4 text-sm leading-7 text-slate-600">
                {{ item.quote }}
              </p>
            </button>
          </div>
        </div>
      </section>
    </main>

    <footer id="footer" class="border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p class="font-display text-2xl font-semibold text-slate-950">Hammoud Estates</p>
            <p class="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              High-trust brokerage representation for buyers, sellers, and investors across premium
              residential markets.
            </p>
          </div>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Company</p>
            <ul class="mt-5 space-y-3 text-sm text-slate-600">
              <li><a href="#featured" class="transition hover:text-slate-950">Featured Listings</a></li>
              <li><a href="#services" class="transition hover:text-slate-950">Why Choose Us</a></li>
              <li><a href="#testimonials" class="transition hover:text-slate-950">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <ul class="mt-5 space-y-3 text-sm text-slate-600">
              <li class="break-all">hammoudyoussef@hammoudestates.com</li>
              <li>+961 3721834</li>
              <li>Lebanon, Saida</li>
            </ul>
          </div>

          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Newsletter</p>
            <p class="mt-5 text-sm leading-7 text-slate-600">
              Receive select market updates and new listing alerts from the team.
            </p>
            <div class="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Email address"
                class="h-12 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-slate-950 focus:bg-white"
              />
              <button
                type="button"
                class="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div
          class="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between"
        >
          <p>&copy; 2026 Hammoud Estates. All rights reserved.</p>
          <p>Developed by Youssef Hammoud</p>
        </div>
      </div>
    </footer>
  </div>
</template>
