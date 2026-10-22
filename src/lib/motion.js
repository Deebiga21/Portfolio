import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Draggable } from 'gsap/Draggable'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, useGSAP)
gsap.defaults({ ease: 'power4.out', duration: 1 })

export let lenis = null
export function startScroll() {
  if (lenis) return
  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
  lenis = new Lenis({ lerp: 0.1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  lenis.stop()
}
export function goTo(target) {
  if (lenis) lenis.scrollTo(target, { offset: -30, duration: 1.4 })
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}
export { gsap, ScrollTrigger, SplitText, Draggable, useGSAP }
