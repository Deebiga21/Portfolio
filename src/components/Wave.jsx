/** Curved section edge. Place inside a section; it sits on the top border and
    is filled with that section's background colour, so the edge reads as a wave. */
export default function Wave({ flip = false }) {
  return (
    <svg className={`wave ${flip ? 'flip' : ''}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 120 L0 64 C 180 10, 360 6, 540 40 S 900 112, 1080 76 S 1340 14, 1440 40 L1440 120 Z" />
    </svg>
  )
}
