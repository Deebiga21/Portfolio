import { useMemo } from 'react'

/* Soft illustrated project artwork in the peach palette. */
export default function Art({ kind }) {
  const cells = useMemo(() => Array.from({ length: 48 }, (_, i) => (Math.sin(i * 1.3) + Math.cos(i * 0.7) + 2) / 4), [])
  if (kind === 'gauge') {
    return (
      <div className="art art-gauge">
        <div className="art-doc">{[80, 64, 92, 58, 76, 88, 50].map((w, i) => <i key={i} style={{ width: `${w}%` }} className={i === 2 || i === 5 ? 'flag' : ''} />)}</div>
        <div className="art-ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" className="bg" /><circle cx="50" cy="50" r="40" className="fg" pathLength="100" /></svg><b>82</b><span>risk</span></div>
      </div>
    )
  }
  if (kind === 'heatmap') {
    return (
      <div className="art art-heat">
        <div className="art-grid">{cells.map((v, i) => <i key={i} style={{ '--v': v, animationDelay: `${(i % 8) * 0.18}s` }} />)}</div>
        <div className="art-pill">● live risk</div>
      </div>
    )
  }
  return (
    <div className="art art-outfit">
      <span className="art-chat">sangeet night, ₹5k, something bold?</span>
      <div className="art-looks">{[0, 1, 2].map((k) => <div key={k} className="art-look" style={{ '--k': k }}><i className="h" /><i className="t" /><i className="b" /></div>)}</div>
      <span className="art-chat me">✦ 3 looks ready!</span>
    </div>
  )
}
