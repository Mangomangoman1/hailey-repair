import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phone & Laptop Repair Hailey ID | Hailey Device Repair',
  description: 'Hailey Device Repair provides honest phone, laptop, and tablet repairs in Hailey, Idaho and the Wood River Valley. Clear diagnostics, quality parts, and hassle-free hand-off.',
  metadataBase: new URL('https://haileyrepair.com'),
  openGraph: {
    type: 'website',
    siteName: 'Hailey Device Repair',
    title: 'Honest Repairs Done Right The First Time | Hailey Device Repair',
    description: 'Phone, laptop, and tablet repair in Hailey, ID serving the Wood River Valley.',
  },
  icons: {
    icon: [
      { url: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
  themeColor: '#0a1628',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* cache-bust stylesheet so nav pill changes propagate immediately */}
        <link rel="stylesheet" href="/css/style.css?v=2026-02-11" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Hailey Device Repair",
              "url": "https://haileyrepair.com/",
              "telephone": "+1-208-450-3730",
              "email": "samuel@haileyrepair.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Hailey",
                "addressRegion": "ID",
                "postalCode": "83333",
                "addressCountry": "US"
              },
              "areaServed": [
                {"@type": "City", "name": "Hailey"},
                {"@type": "City", "name": "Ketchum"},
                {"@type": "City", "name": "Sun Valley"},
                {"@type": "City", "name": "Bellevue"}
              ],
              "openingHoursSpecification": [
                {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "09:00", "closes": "18:00"}
              ]
            })
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>

        <header className="site-header">
          <div className="container header-inner">
            <div className="brand">
              <Link href="/" aria-label="Hailey Device Repair home">
                <img className="brand-logo" src="/assets/logo-transparent.png" alt="Hailey Device Repair logo" />
                <span>HAILEY DEVICE REPAIR</span>
              </Link>
              <small>Phone • Laptop • Tablet Repair — Wood River Valley</small>
            </div>

            <nav className="nav" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/guide">Repair Guide</Link>
              <Link className="nav-pill" href="/chat">Tech Helper</Link>
            </nav>

            <div className="header-cta">
              <a className="btn" href="tel:+12084503730">Call (208) 450-3730</a>
            </div>
          </div>
        </header>

        <main id="main">
          {children}
        </main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <h3>Hailey Device Repair</h3>
              <p>Locally owned electronics repair in Hailey, Idaho—serving the Wood River Valley with honesty, discretion, and quality workmanship.</p>
              <div className="badges" style={{marginTop: '0.75rem'}}>
                <span className="badge">Open 7 days/week</span>
                <span className="badge">Hailey, ID</span>
              </div>
            </div>
            <div>
              <h3>Contact</h3>
              <p><a href="mailto:samuel@haileyrepair.com">samuel@haileyrepair.com</a><br />
                 <a href="tel:+12084503730">(208) 450-3730</a></p>
            </div>
            <div>
              <h3>Service Area</h3>
              <p>Hailey • Ketchum • Sun Valley • Bellevue<br />Wood River Valley, Idaho</p>
            </div>
          </div>

          <div className="container footer-bottom">
            <span>© {new Date().getFullYear()} Hailey Device Repair. All rights reserved.</span>
            <span><Link href="/faq">FAQ</Link> • <Link href="/contact">Contact</Link> • <Link href="/about">About</Link></span>
          </div>
        </footer>
      </body>
    </html>
  )
}
