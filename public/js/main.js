/* Hailey Device Repair - main.js
   - Mobile menu toggle
   - Smooth scroll for in-page anchors
   - FAQ accordion
   - Subtle reveal-on-scroll animations
   - Contact form: build a mailto with the message content (no backend)
*/

(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  // Mobile menu
  const menuBtn = $('#menuBtn');
  const mobilePanel = $('#mobilePanel');
  if (menuBtn && mobilePanel){
    menuBtn.addEventListener('click', () => {
      const open = mobilePanel.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    // close after click
    $$('#mobilePanel a').forEach(a => a.addEventListener('click', () => {
      mobilePanel.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }));
  }

  // Smooth scroll for anchors (better control than CSS when fixed header)
  function scrollToHash(hash){
    if (!hash) return;
    const id = hash.replace('#','');
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector('.site-header');
    const offset = header ? header.getBoundingClientRect().height + 10 : 10;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    // allow just "#" to do nothing
    if (!href || href === '#') return;
    e.preventDefault();
    scrollToHash(href);
    history.pushState(null, '', href);
  });

  // On load if hash present
  if (location.hash){
    // wait for layout
    window.setTimeout(() => scrollToHash(location.hash), 50);
  }

  // Reveal on scroll
  const revealEls = $$('.reveal');
  if (revealEls.length){
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced){
      revealEls.forEach(el => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(el => io.observe(el));
    }
  }

  // FAQ accordion
  $$('.faq-item').forEach((item) => {
    const btn = $('.faq-button', item);
    const panel = $('.faq-panel', item);
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      // optional: close others
      $$('.faq-item[data-open="true"]').forEach(other => {
        if (other !== item) other.setAttribute('data-open','false');
      });
      item.setAttribute('data-open', String(!isOpen));
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Contact form -> mailto builder (static site)
  const form = $('#contactForm');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = $('#name')?.value?.trim() || '';
      const email = $('#email')?.value?.trim() || '';
      const phone = $('#phone')?.value?.trim() || '';
      const device = $('#device')?.value?.trim() || '';
      const message = $('#message')?.value?.trim() || '';

      const subject = `Repair Request: ${device || 'Device'} - ${name || 'Customer'}`;
      const bodyLines = [
        'New repair request from haileyrepair.com',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Device type: ${device}`,
        '',
        'Message:',
        message,
        '',
        '—',
        'Submitted from the Hailey Device Repair contact form.'
      ];
      const body = bodyLines.join('\n');

      // Prefer mailto (no external dependency). If user has no mail client, they can copy the text.
      const to = form.getAttribute('data-to') || 'samuel@haileyrepair.com';
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      const fallback = $('#formFallback');
      if (fallback){
        const pre = $('#formFallback pre');
        if (pre) pre.textContent = body;
        fallback.hidden = false;
      }

      window.location.href = mailto;
    });

    const copyBtn = $('#copyMessageBtn');
    if (copyBtn){
      copyBtn.addEventListener('click', async () => {
        const pre = document.querySelector('#formFallback pre');
        if (!pre) return;
        try{
          await navigator.clipboard.writeText(pre.textContent);
          copyBtn.textContent = 'Copied';
          setTimeout(() => copyBtn.textContent = 'Copy message', 1400);
        } catch(err){
          copyBtn.textContent = 'Copy failed';
          setTimeout(() => copyBtn.textContent = 'Copy message', 1400);
        }
      });
    }
  }
})();
