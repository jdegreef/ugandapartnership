// Progressive enhancements. The site works without JavaScript.
document.documentElement.classList.add('js');

// Header shadow on scroll
const header = document.querySelector('[data-header]');
const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile navigation
const toggle = document.querySelector('[data-nav-toggle]');
const navList = document.querySelector('[data-nav]');
if (toggle && navList) {
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    navList.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
  navList.addEventListener('click', (e) => e.target.closest('a') && setOpen(false));
}

// Filter chips (stories + gallery)
document.querySelectorAll('[data-filter-group]').forEach((group) => {
  const target = document.querySelector(`[data-filter-target="${group.dataset.filterGroup}"]`);
  if (!target) return;
  group.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const f = btn.dataset.filter;
    group.querySelectorAll('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    target.querySelectorAll('[data-category]').forEach((item) => {
      item.hidden = f !== 'all' && !item.dataset.category.split(' ').includes(f);
    });
  });
});

// Gallery lightbox
const gallery = document.querySelector('[data-lightbox]');
const dialog = document.querySelector('[data-lightbox-dialog]');
if (gallery && dialog && typeof dialog.showModal === 'function') {
  const lbImg = dialog.querySelector('[data-lb-img]');
  const lbCap = dialog.querySelector('[data-lb-caption]');
  let current = 0;
  const visible = () => [...gallery.querySelectorAll('li:not([hidden]) .gallery-item')];
  const show = (btn) => {
    const img = btn.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
    current = visible().indexOf(btn);
  };
  const step = (d) => {
    const items = visible();
    show(items[(current + d + items.length) % items.length]);
  };
  gallery.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-item');
    if (!btn) return;
    show(btn);
    dialog.showModal();
  });
  dialog.querySelector('[data-lb-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lb-prev]').addEventListener('click', () => step(-1));
  dialog.querySelector('[data-lb-next]').addEventListener('click', () => step(1));
  dialog.addEventListener('click', (e) => e.target === dialog && dialog.close());
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}

// Contact form: preselect topic from ?topic=, validate, and submit
const form = document.querySelector('[data-contact-form]');
if (form) {
  const topic = new URLSearchParams(location.search).get('topic');
  const select = form.querySelector('#topic');
  if (topic && select.querySelector(`option[value="${CSS.escape(topic)}"]`)) select.value = topic;

  const status = form.querySelector('[data-form-status]');
  const say = (msg, ok) => {
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'ok' : 'err');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstInvalid = null;
    form.querySelectorAll('[required]').forEach((f) => {
      const bad = !f.value.trim() || (f.type === 'email' && !f.checkValidity());
      f.setAttribute('aria-invalid', String(bad));
      if (bad && !firstInvalid) firstInvalid = f;
    });
    if (firstInvalid) {
      say('Please fill in your name, a valid email and a message.', false);
      firstInvalid.focus();
      return;
    }
    const data = new FormData(form);
    if (data.get('_gotcha')) return; // spam bot

    // No endpoint configured: fall back to the visitor's email app.
    if (!form.action || form.getAttribute('action') === null) {
      const to = form.dataset.email;
      if (!to) {
        say('Our contact form is being set up. Please try again soon.', false);
        return;
      }
      const subject = `Website inquiry (${select.options[select.selectedIndex].text}) from ${data.get('name')}`;
      location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(data.get('message') + '\n\n— ' + data.get('name') + ' (' + data.get('email') + ')')}`;
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    say('Sending…', true);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      say('Thank you! Your message has been sent — we’ll be in touch soon.', true);
    } catch {
      say('Sorry, something went wrong sending your message. Please try again.', false);
    } finally {
      btn.disabled = false;
    }
  });
}

// Gentle reveal-on-scroll for cards and sections
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const els = document.querySelectorAll('.story-card, .partner-card, .way, .person, .mv-card, .timeline li, .gallery li');
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      }
    }),
    { rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((el) => {
    el.classList.add('reveal');
    io.observe(el);
  });
}
