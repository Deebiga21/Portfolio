import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'

const BASE = import.meta.env.BASE_URL

/**
 * The cut-out turns to look toward the visitor's cursor (it stays still until
 * the cursor moves). Frames [from..to] map to how far left the cursor is.
 */
export default function LookAt({ from, to, src, className = "", label = "Portrait" }) {
  const cv = useRef(null)
  const imgs = useRef([])
  const st = useRef({ cur: 0, target: 0, drawn: -1 })

  useEffect(() => {
    const dir = innerWidth < 820 ? 'sm' : 'lg'
    if (src) {
      const im = new Image()
      im.src = BASE + src
      im.onload = () => { st.current.drawn = -1 }
      imgs.current[0] = im
    } else {
      for (let i = from; i <= to; i++) {
        const im = new Image()
        im.src = `${BASE}img/stickers/${dir}/f${String(i).padStart(3, '0')}.webp`
        im.onload = () => { st.current.drawn = -1 }
        imgs.current[i - from] = im
      }
    }
    const c = cv.current
    const dpr = Math.min(devicePixelRatio || 1, 2)
    const ro = new ResizeObserver(() => { c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr; st.current.drawn = -1 })
    ro.observe(c)
    const move = (e) => {
      const r = c.getBoundingClientRect()
      const cx = r.left + r.width / 2
      // cursor to her left (screen-left) → she turns to look at it
      st.current.target = Math.min(1, Math.max(0, (cx - e.clientX) / (r.width * 1.1)))
    }
    const leave = () => { st.current.target = 0 }
    addEventListener('pointermove', move)
    document.addEventListener('pointerleave', leave)
    const tick = () => {
      const s = st.current
      s.cur += (s.target - s.cur) * 0.08
      const n = to - from
      const idx = Math.round(s.cur * n)
      const renderKey = src ? Math.round(s.cur * 100) : idx
      if (renderKey === s.drawn) return
      let im = imgs.current[src ? 0 : idx]
      if (!im?.complete || !im.naturalWidth) im = imgs.current.find((x) => x?.complete && x.naturalWidth)
      if (!im) return
      s.drawn = renderKey
      const ctx = c.getContext('2d')
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      const k = Math.min(c.width / im.naturalWidth, c.height / im.naturalHeight)
      const w = im.naturalWidth * k, h = im.naturalHeight * k
      ctx.clearRect(0, 0, c.width, c.height)
      if (src) {
        // Keep the pointer-follow movement with the supplied still portrait.
        const shiftX = (0.5 - s.cur) * c.width * 0.055
        const shiftY = (0.5 - s.cur) * c.height * 0.012
        const tilt = (0.5 - s.cur) * 0.018
        ctx.translate(c.width / 2 + shiftX, c.height / 2 + shiftY)
        ctx.rotate(tilt)
        ctx.drawImage(im, -w / 2, c.height / 2 - h, w, h)
      } else {
        ctx.drawImage(im, (c.width - w) / 2, c.height - h, w, h)
      }
    }
    gsap.ticker.add(tick)
    return () => { gsap.ticker.remove(tick); ro.disconnect(); removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave) }
  }, [from, to, src])

  return <canvas ref={cv} className={className} aria-label={label} role="img" />
}
