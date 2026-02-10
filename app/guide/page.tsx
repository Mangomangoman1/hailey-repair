import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Repair Guide | Hailey Device Repair',
  description: 'A practical guide to understanding device repairs—when to repair, what to expect, and how to prepare your device.',
}

export default function Guide() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="kicker reveal">Knowledge for device owners</span>
          <h1 className="reveal">Repair Guide</h1>
          <p className="reveal">A practical guide to understanding device repairs—when to repair, what to expect, and how to prepare your device.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>Before Bringing Your Device In</h2>
            <p>A few quick steps to prepare for a smooth repair experience.</p>
          </div>

          <div className="grid-2">
            <article className="card step reveal">
              <div className="num" aria-hidden="true">1</div>
              <h3>Back up your data</h3>
              <p>If possible, back up your photos, contacts, and important files before any repair. iCloud, Google Drive, or a computer backup all work.</p>
            </article>

            <article className="card step reveal">
              <div className="num" aria-hidden="true">2</div>
              <h3>Know your device model</h3>
              <p>Check Settings → About on your phone, or look up your laptop model number. This helps us quote accurately and order the right parts.</p>
            </article>

            <article className="card step reveal">
              <div className="num" aria-hidden="true">3</div>
              <h3>Note any prior repairs</h3>
              <p>Let us know if the device has been repaired before. Prior repairs can affect warranty and sometimes complicate new repairs.</p>
            </article>

            <article className="card step reveal">
              <div className="num" aria-hidden="true">4</div>
              <h3>Disable Find My / Activation Lock</h3>
              <p>For certain repairs, you may need to disable Find My iPhone/Device. We'll let you know if this applies to your repair.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>When Is Repair Worth It?</h2>
            <p>Honest factors to consider before committing to a repair.</p>
          </div>

          <div className="grid-2">
            <article className="card callout reveal">
              <h3 style={{margin: '0 0 0.5rem', color: 'var(--cyan-2)'}}>✓ Repair usually makes sense when:</h3>
              <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)'}}>
                <li>Repair cost is less than 50% of device replacement value</li>
                <li>Device is less than 3-4 years old</li>
                <li>Single issue (screen, battery, port)</li>
                <li>No water damage or prior failed repairs</li>
                <li>Important data needs recovery first</li>
              </ul>
            </article>

            <article className="card callout reveal">
              <h3 style={{margin: '0 0 0.5rem', color: 'var(--muted)'}}>✗ Consider replacement when:</h3>
              <ul style={{margin: 0, paddingLeft: '1.2rem', color: 'var(--muted)'}}>
                <li>Multiple issues (screen + battery + port)</li>
                <li>Repair cost approaches device value</li>
                <li>Device is 5+ years old</li>
                <li>Severe water damage or corrosion</li>
                <li>Prior repairs have failed repeatedly</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title reveal">
            <h2>Need Help Deciding?</h2>
            <p>Not sure if your device is worth repairing? We'll give you an honest assessment.</p>
          </div>
          <div className="hero-actions reveal">
            <Link className="btn btn-primary" href="/contact">Get a free diagnosis</Link>
            <Link className="btn" href="/chat">Chat with our Tech Helper</Link>
            <a className="btn" href="tel:+12084503730">Call us</a>
          </div>
        </div>
      </section>
    </>
  )
}
