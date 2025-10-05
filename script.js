document.getElementById('year').textContent = new Date().getFullYear();

const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const expanded = nav?.getAttribute('data-open') === 'true';
  if (expanded) {
    nav?.setAttribute('data-open', 'false');
    nav?.classList.remove('open');
  } else {
    nav?.setAttribute('data-open', 'true');
    nav?.classList.add('open');
  }
});

// Header shadow on scroll
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 4) header?.classList.add('is-scrolled');
  else header?.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// FAQs toggle
document.querySelectorAll('.faq-item').forEach((item) => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q?.addEventListener('click', () => {
    const expanded = q.getAttribute('aria-expanded') === 'true';
    q.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    if (expanded) a?.setAttribute('hidden', ''); else a?.removeAttribute('hidden');
  });
});

// Screens gallery controls
const track = document.querySelector('.screens-track');
const prev = document.querySelector('.screens-nav.prev');
const next = document.querySelector('.screens-nav.next');
const dots = document.querySelectorAll('.screens-dots .dot');

function getActiveIndex() {
  if (!track) return 0;
  const slideWidth = track.getBoundingClientRect().width;
  const idx = Math.round(track.scrollLeft / slideWidth);
  return Math.max(0, Math.min(dots.length - 1, idx));
}

function goTo(index) {
  if (!track) return;
  const slideWidth = track.getBoundingClientRect().width;
  const left = index * slideWidth;
  track.scrollTo({ left, behavior: 'smooth' });
  dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
}

prev?.addEventListener('click', () => {
  const idx = Math.max(0, getActiveIndex() - 1);
  goTo(idx);
});
next?.addEventListener('click', () => {
  const idx = Math.min(dots.length - 1, getActiveIndex() + 1);
  goTo(idx);
});
dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

// Keep dots in sync when user swipes
track?.addEventListener('scroll', () => {
  const idx = getActiveIndex();
  dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
});


