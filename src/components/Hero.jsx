import { useRef } from 'react'
import { gsap, useGSAP, goTo } from '../lib/motion'
import { profile, heroCounts, lookFrames } from '../data'
import LookAt from './LookAt'
import { Squiggle, Arrow, Spark } from './Bits'

export default function Hero({ ready }) {
  const root = useRef(null)

  useGSAP(() => {
    if (!ready) return
    const tl = gsap.timeline()
    tl.from('.hr-hello', { y: 20, opacity: 0, duration: 0.8 })
      .from('.hr-name .ch', { yPercent: 110, rotate: 8, stagger: 0.05, duration: 1.1 }, 0.1)
      .to('.hr-name .squiggle path', { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0.6)
      .from('.hr-sub, .hr-counts, .hr-ctas', { y: 30, opacity: 0, stagger: 0.1, duration: 1 }, 0.4)
      .from('.hr-blob', { scale: 0.6, opacity: 0, duration: 1.4, ease: 'elastic.out(1, 0.7)' }, 0.1)
      .from('.hr-person', { yPercent: 30, opacity: 0, duration: 1.2, ease: 'back.out(1.4)' }, 0.3)
      .from('.hr-note', { opacity: 0, x: -10, duration: 0.6 }, 1.6)
      .to('.hr-note .hand-arrow path', { strokeDashoffset: 0, duration: 0.8, stagger: 0.3, ease: 'power2.inOut' }, 1.6)
  }, { scope: root, dependencies: [ready] })

  useGSAP(() => {
    gsap.to('.hr-visual', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
  }, { scope: root })

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hr-grid">
        <div className="hr-copy">
          <p className="hr-hello hand">Hi there, I’m <span aria-hidden="true">👋</span></p>
          <h1 className="hr-name">
            <span className="hr-name-text">{profile.name.split('').map((c, i) => <span className="ch-mask" key={i}><span className="ch">{c}</span></span>)}</span>
            <Squiggle />
          </h1>
          <p className="hr-sub">
            <b>{profile.role}</b> <Spark /> {profile.intro}
          </p>
          <ul className="hr-counts" aria-label="Highlights">
            {heroCounts.map((c) => <li key={c.label}><b>{c.value}</b><span>{c.label}</span></li>)}
          </ul>
          <div className="hr-ctas">
            <button className="btn btn-coral" onClick={() => goTo('#work')}>See my work <span>→</span></button>
            {profile.resume
              ? <a className="btn btn-line" href={profile.resume} target="_blank" rel="noreferrer">Résumé ↓</a>
              : <button className="btn btn-line" onClick={() => goTo('#contact')}>Message me</button>}
          </div>
        </div>

        <div className="hr-visual">
          <div className="hr-blob" />
          <LookAt from={lookFrames.from} to={lookFrames.to} className="hr-person" label={profile.full} />
          <div className="hr-note hand">
            move your cursor,<br />I’ll look at it!
            <Arrow />
          </div>
        </div>
      </div>
    </section>
  )
}
