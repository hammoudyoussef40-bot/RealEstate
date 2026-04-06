import type { Directive } from 'vue'

export const lazyDirective: Directive<HTMLImageElement, string> = {
  mounted(element, binding) {
    const source = binding.value

    if (!source) {
      return
    }

    const loadImage = () => {
      element.src = source
      element.classList.remove('opacity-0')
      observer?.disconnect()
    }

    let observer: IntersectionObserver | undefined

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage()
          }
        })
      })

      observer.observe(element)
      return
    }

    loadImage()
  }
}
