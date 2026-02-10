import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Hailey Device Repair',
  description: 'Learn about Hailey Device Repair—consumer electronics repair in Hailey, Idaho. Screen repairs, batteries, charging ports, data recovery, and more.',
}

export default function About() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="kicker reveal">Repairs for the devices you rely on</span>
          <h1 className="reveal">About</h1>
          <p className="reveal">Honest assessments and quality repairs for common consumer electronics—phones, laptops, tablets, and accessories.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <article className="card callout reveal">
              <h2 style={{margin: '0 0 0.6rem', color: 'rgba(255,255,255,0.95)'}}>What we do</h2>
              <p>Our focus is repairs for common consumer electronics, phones, laptops, tablets, etc… Battery replacements, screen repairs, charging port repairs and much more. We also provide data recovery services, general IT support, or accessory installation. Feel free to contact us with any questions about our service or your devices.</p>
            </article>

            <aside className="card hero-card reveal" aria-label="Contact details">
              <h2>Contact</h2>
              <p>Reach out with your device model and what's happening—diagnostics come first.</p>
              <div className="meta">
                <div className="meta-row"><strong>Email</strong><span><a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a></span></div>
                <div className="meta-row"><strong>Phone</strong><span><a href="tel:+12084503730">(208) 450-3730</a></span></div>
                <div className="meta-row"><strong>Hours</strong><span>Open 7 days/week</span></div>
                <div className="meta-row"><strong>Location</strong><span>Hailey, Idaho</span></div>
              </div>
              <div className="hero-actions" style={{marginTop: '1rem'}}>
                <Link className="btn btn-primary" href="/contact">Contact form</Link>
                <Link className="btn" href="/faq">FAQ</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>What you can expect</h2>
            <p>A practical process focused on repair quality, longevity, and a clear explanation of options.</p>
          </div>

          <div className="grid-3">
            <article className="card step reveal">
              <div className="num" aria-hidden="true">✓</div>
              <h3>Transparent quotes</h3>
              <p>Clear diagnosis and pricing before work begins. No surprises.</p>
            </article>
            <article className="card step reveal">
              <div className="num" aria-hidden="true">✓</div>
              <h3>Quality parts</h3>
              <p>OEM or OEM-equivalent parts whenever possible for proper fit and function.</p>
            </article>
            <article className="card step reveal">
              <div className="num" aria-hidden="true">✓</div>
              <h3>Respect for your data</h3>
              <p>Care, discretion, and clear communication—especially when data recovery is the goal.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
