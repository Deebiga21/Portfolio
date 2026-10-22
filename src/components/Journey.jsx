import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/motion'
import { journey, profile } from '../data'
import { Squiggle } from './Bits'

/**
 * A scrapbook map: a winding road links each chapter, it draws itself as you
 * scroll, and a little avatar travels along it.
 */
export default function Journey() {
  const root = useRef(null)
  const list = useRef(null)
  const road = useRef(null)
  const trail = useRef(null)
  const walker = useRef(null)
  const [d, setD] = useState('')
  const [box, setBox] = useState({ w: 0, h: 0 })

  // build the road. Desktop: it passes through each portrait's and card's inner
  // corners (zig-zagging across the gap), with the dot in the middle.
  // Mobile: a gentle wave through the dots on the left.
  useEffect(() => {
    const build = () => {
      const L = list.current
      if (!L) return
      const W = L.offsetWidth, H = L.offsetHeight
      const items = [...L.querySelectorAll('.jr-item')]
      const mobile = innerWidth < 760
      let pts = []
      if (mobile) {
        items.forEach((it) => {
          const dot = it.querySelector('.jr-dot')
          dot.style.left = ''; dot.style.top = ''
          pts.push([it.offsetLeft + dot.offsetLeft + dot.offsetWidth / 2, it.offsetTop + dot.offsetTop + dot.offsetHeight / 2])
        })
      } else {
        // corner of an element (layout box, rotated by its CSS --r)
        const corner = (el, item, sx, sy, inset) => {
          const w = el.offsetWidth, h = el.offsetHeight
          const cx = item.offsetLeft + el.offsetLeft + w / 2
          const cy = item.offsetTop + el.offsetTop + h / 2
          const r = (parseFloat(getComputedStyle(el).getPropertyValue('--r')) || 0) * Math.PI / 180
          const dx = sx * (w / 2 - inset), dy = sy * (h / 2 - inset)
          return [cx + dx * Math.cos(r) - dy * Math.sin(r), cy + dx * Math.sin(r) + dy * Math.cos(r)]
        }
        items.forEach((it) => {
          const flip = it.classList.contains('flip')
          const left = it.querySelector(flip ? '.jr-card' : '.polaroid')
          const right = it.querySelector(flip ? '.polaroid' : '.jr-card')
          const a = corner(left, it, 1, -1, left.classList.contains('jr-card') ? 7 : 0)   // inner top corner of the left piece
          const b = corner(right, it, -1, 1, right.classList.contains('jr-card') ? 7 : 0) // inner bottom corner of the right piece
          const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
          pts.push(a, m, b)
          const dot = it.querySelector('.jr-dot')
          dot.style.left = `${m[0] - it.offsetLeft}px`
          dot.style.top = `${m[1] - it.offsetTop}px`
        })
      }
      if (!pts.length) return
      pts = [[pts[0][0], 0], ...pts, [pts[pts.length - 1][0], H]]
      // Catmull-Rom → smooth cubic Béziers through every point
      let path = `M ${pts[0][0]} ${pts[0][1]} `
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2
        const t = 0.5 / 3
        path += `C ${p1[0] + (p2[0] - p0[0]) * t} ${p1[1] + (p2[1] - p0[1]) * t}, ${p2[0] - (p3[0] - p1[0]) * t} ${p2[1] - (p3[1] - p1[1]) * t}, ${p2[0]} ${p2[1]} `
      }
      setBox({ w: W, h: H })
      setD(path)
    }
    build()
    const ro = new ResizeObserver(build)
    ro.observe(list.current)
    addEventListener('load', build)
    return () => { ro.disconnect(); removeEventListener('load', build) }
  }, [])

  // draw the road + move the avatar with scroll
  useEffect(() => {
    if (!d) return
    const path = trail.current
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    const st = ScrollTrigger.create({
      trigger: list.current, start: 'top 65%', end: 'bottom 65%', scrub: 0.4,
      onUpdate: (s) => {
        path.style.strokeDashoffset = `${len * (1 - s.progress)}`
        const pt = path.getPointAtLength(len * s.progress)
        walker.current.style.transform = `translate(${pt.x}px, ${pt.y}px)`
      },
    })
    path.style.strokeDashoffset = `${len}`
    const p0 = path.getPointAtLength(0)
    walker.current.style.transform = `translate(${p0.x}px, ${p0.y}px)`
    ScrollTrigger.refresh()
    return () => st.kill()
  }, [d])

  useGSAP(() => {
    gsap.to('.jr-title .squiggle path', { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: '.jr-title', start: 'top 80%' } })
    gsap.utils.toArray('.jr-item', root.current).forEach((it, i) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: it, start: 'top 78%' } })
      tl.from(it.querySelector('.polaroid'), { y: 60, rotate: i % 2 ? 14 : -14, scale: 0.8, opacity: 0, duration: 1.1, ease: 'back.out(1.6)' })
        .from(it.querySelector('.jr-card'), { x: i % 2 ? -50 : 50, opacity: 0, duration: 1 }, 0.15)
        .from(it.querySelector('.jr-dot'), { scale: 0, duration: 0.6, ease: 'back.out(3)' }, 0.1)
    })
  }, { scope: root })

  return (
    <section className="journey section" id="journey" ref={root}>
      <div className="wrap">
        <div className="sec-head center">
          <span className="pill">My journey</span>
          <h2 className="h2 jr-title">The story <span className="hl">so far<Squiggle /></span></h2>
          <p className="hand sec-note">follow the road ↓</p>
        </div>
        <ol className="jr-list" ref={list}>
          <svg className="jr-map" width={box.w} height={box.h} viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} aria-hidden="true">
            <path ref={road} d={d} className="jr-road" />
            <path ref={trail} d={d} className="jr-trail" />
          </svg>
          <span className="jr-walker" ref={walker} aria-hidden="true"><img src={profile.avatar} alt="" /></span>
          {journey.map((j, i) => (
            <li className={`jr-item ${i % 2 ? 'flip' : ''}`} key={j.title}>
              <figure className="polaroid" style={{ '--r': `${i % 2 ? 4 : -4}deg` }}>
                <span className="tape" />
                <img src={j.photo} alt="" loading="lazy" />
                <figcaption className="hand">{j.note}</figcaption>
              </figure>
              <span className="jr-dot" />
              <div className="jr-card">
                <span className="jr-year hand">{j.year}</span>
                <h3>{j.title}</h3>
                <span className="jr-org">{j.org}</span>
                <p>{j.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
