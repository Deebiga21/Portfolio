import { useRef, useState } from 'react'
import { gsap, useGSAP, goTo } from '../lib/motion'
import Wave from './Wave'
import { profile, contactSticker } from '../data'

export default function Contact() {
  const root = useRef(null)
  const [copied, setCopied] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [sending, setSending] = useState(false)
  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%' } })
    tl.from('.ct-card', { y: 80, scale: 0.94, opacity: 0, duration: 1.1 })
      .from('.ct-sticker', { yPercent: 40, rotate: 10, opacity: 0, duration: 1.1, ease: 'back.out(1.5)' }, 0.25)
      .from('.ct-bubble', { scale: 0, duration: 0.7, ease: 'back.out(3)' }, 0.9)
      .from('.ct-copy > *', { y: 30, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.3)
    gsap.to('.ct-sticker', { rotate: 2, duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 100%' })
  }, { scope: root })
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }
  const sendMessage = async (event) => {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    setSending(true)
    setFormStatus('Sending your message…')
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      email: String(data.get('email') || '').trim(),
      _replyto: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
      _subject: `Portfolio message from ${String(data.get('name') || '').trim()}`,
    }
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'The message could not be sent.')
      }
      form.reset()
      setFormStatus('Message submitted. The first submission requires a one-time activation from Deebiga’s inbox; after activation, messages will be forwarded there.')
    } catch (error) {
      setFormStatus(`${error.message || 'Could not send your message.'} Please try again or email ${profile.email} directly.`)
    } finally {
      setSending(false)
    }
  }
  return (
    <section className="contact section tint" id="contact" ref={root}>
      <Wave flip />
      <div className="wrap">
        <div className="ct-card">
          <div className="ct-copy">
            <span className="pill pill-light">Contact</span>
            <h2 className="h2">Let’s be<br />friends!</h2>
            <p>Hiring, collaborating or just want to say hi? My inbox is always open, and I usually reply within a day.</p>
            <div className="ct-mail">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button onClick={copy}>{copied ? 'Copied ✓' : 'Copy'}</button>
            </div>
            <div className="ct-phone"><span>CALL OR TEXT</span><a href={profile.phoneLink}>{profile.phone}</a></div>
            <div className="ct-links">
              <a className="btn btn-white" href={`mailto:${profile.email}?subject=Hi%20${encodeURIComponent(profile.name)}!`}>Send an email ✉</a>
              <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <div className="ct-media">
            <span className="ct-bubble hand">say hi! 👋</span>
            <img className="ct-sticker" src={contactSticker} alt={`${profile.full} portrait`} loading="lazy" />
          </div>
        </div>
        <div className="ct-form-panel">
          <div className="ct-form-intro">
            <span className="pill">Get in touch</span>
            <h3>Send Deebiga a message</h3>
            <p>Share your name and a number where she can reach you.</p>
          </div>
          <form className="ct-form" onSubmit={sendMessage}>
            <input className="ct-honeypot" name="_honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
            <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required /></label>
            <label className="ct-form-wide">Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            <label className="ct-form-wide">Message<textarea name="message" rows="5" placeholder="What would you like to talk about?" required /></label>
            <div className="ct-form-submit"><button className="btn btn-coral" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <span>→</span></button><p className="ct-form-note">Messages are delivered by FormSubmit. Its first-use activation link will arrive at Deebiga’s email.</p></div>
            <p className="ct-form-status" role="status" aria-live="polite">{formStatus}</p>
          </form>
        </div>
        <footer className="foot">
          <span>© {new Date().getFullYear()} {profile.full}</span>
          <button onClick={() => goTo('#top')}>Back to top ↑</button>
        </footer>
      </div>
    </section>
  )
}
