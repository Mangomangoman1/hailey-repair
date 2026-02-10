'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Repair request from ${formData.name}`
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Device: ${formData.device}

Message:
${formData.message}`
    
    window.location.href = `mailto:samuel@haileyrepair.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <header className="page-header">
        <div className="container">
          <span className="kicker reveal">Open 7 days a week</span>
          <h1 className="reveal">Contact</h1>
          <p className="reveal">We are open 7 days a week, leave your information below and we'll get back to you as soon as possible or send us a message directly!</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            <section className="card form reveal" aria-label="Contact form">
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text" 
                      autoComplete="name" 
                      placeholder="Your name" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      autoComplete="email" 
                      placeholder="you@example.com" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      autoComplete="tel" 
                      placeholder="(208) 555-0123" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="device">Device type</label>
                    <select 
                      id="device" 
                      name="device" 
                      required
                      value={formData.device}
                      onChange={(e) => setFormData({...formData, device: e.target.value})}
                    >
                      <option value="" disabled>Select a device</option>
                      <option>Phone</option>
                      <option>Laptop</option>
                      <option>Tablet</option>
                      <option>Accessory</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div style={{marginTop: '0.9rem'}}>
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us the model (e.g., iPhone 13), what happened, and what you need (repair, data recovery, etc.)." 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button className="btn btn-primary" type="submit">Send request</button>
                  <a className="btn" href="tel:+12084503730">Call instead</a>
                  <a className="btn" href="mailto:samuel@haileyrepair.com">Email instead</a>
                </div>

                <p className="form-note">This form opens your email client with a pre-filled message (no data is stored on the website).</p>
              </form>
            </section>

            <aside className="card hero-card reveal" aria-label="Direct contact">
              <h2>Direct contact</h2>
              <p>If you prefer, contact us directly—especially for urgent issues, data recovery, or if you're unsure whether a repair is worth it.</p>
              <div className="meta">
                <div className="meta-row"><strong>Email</strong><span><a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a></span></div>
                <div className="meta-row"><strong>Phone</strong><span><a href="tel:+12084503730">(208) 450-3730</a></span></div>
                <div className="meta-row"><strong>Hours</strong><span>Open 7 days/week</span></div>
                <div className="meta-row"><strong>Location</strong><span>Hailey, Idaho</span></div>
              </div>

              <div className="card" style={{marginTop: '1rem', padding: '1rem', background: 'rgba(0,188,212,0.06)', borderColor: 'rgba(0,188,212,0.20)'}}>
                <h2 style={{margin: '0 0 0.4rem', fontSize: '1.05rem'}}>Tip for faster quotes</h2>
                <p style={{margin: 0, color: 'var(--muted)'}}>Include your device model, whether it powers on, and any prior repair attempts. If data recovery is the goal, mention that upfront.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
