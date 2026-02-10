import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | Hailey Device Repair',
  description: 'Frequently asked questions about phone, laptop, and tablet repair in Hailey, Idaho—pricing ranges, turnaround time, parts, water damage, and warranty.',
}

const faqs = [
  {
    q: "How much does phone screen repair cost?",
    a: "Most phone screen repairs fall in the $50–$200 range. The exact quote depends on the device model and what we find during diagnosis."
  },
  {
    q: "How long does a typical repair take?",
    a: "Most repairs are completed in 1–2 days once parts arrive. We order parts on demand for your specific device (shipping is often another 1–2 days). You're welcome to leave your device with us while we wait on parts."
  },
  {
    q: "Do you use original (OEM) parts?",
    a: "Yes. We source OEM or OEM-equivalent parts whenever possible."
  },
  {
    q: "Is it worth repairing my old phone or laptop?",
    a: "It depends on the device condition and repair cost versus value. We provide an honest assessment so you can decide what makes sense."
  },
  {
    q: "Do you fix water-damaged devices?",
    a: "We can assess water damage and, when possible, attempt repair or data recovery. Results vary based on severity and timing. Water-damaged devices are excluded from our standard warranty."
  },
  {
    q: "What devices do you repair?",
    a: "We repair common consumer electronics including phones, laptops, tablets, and accessories."
  },
  {
    q: "Do you offer a warranty on repairs?",
    a: "Yes—60 days on parts and labor for most repairs. Water-damaged devices are excluded."
  },
  {
    q: "How do I schedule a repair?",
    a: "Use the contact page or message directly by phone or email. We'll reply with next steps and options."
  },
  {
    q: "Where are you located?",
    a: "We are based in Hailey, Idaho and serve the Wood River Valley including Ketchum, Sun Valley, and Bellevue."
  },
  {
    q: "Do I need to back up my data first?",
    a: "Backing up is recommended when possible. If backup isn't possible or data recovery is your priority, let us know upfront so we can discuss options."
  }
]

export default function FAQ() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="kicker reveal">Common questions, clear answers</span>
          <h1 className="reveal">Frequently Asked Questions</h1>
          <p className="reveal">Everything you need to know about repairs, pricing, parts, and what to expect.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <article key={i} className="card faq-item reveal">
                <h2 style={{margin: '0 0 0.5rem', fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)'}}>{faq.q}</h2>
                <p style={{margin: 0, color: 'var(--muted)'}}>{faq.a}</p>
              </article>
            ))}
          </div>

          <div className="hero-actions reveal" style={{marginTop: '2rem'}}>
            <Link className="btn btn-primary" href="/contact">Still have questions? Contact us</Link>
            <Link className="btn" href="/chat">Try our Tech Help bot</Link>
          </div>
        </div>
      </section>
    </>
  )
}
