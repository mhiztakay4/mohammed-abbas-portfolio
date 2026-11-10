/* Mohammed Abbas Portfolio interactions */
const menuButton = document.getElementById('menu');
const nav = document.getElementById('nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    menuButton.textContent = isOpen ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    menuButton.textContent = '☰';
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.1 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add('visible'));

// Project category filters.
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-grid .project');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
  });
}));

// Inquiry form opens WhatsApp with a prepared message. No data is stored.
const inquiryForm = document.getElementById('inquiryForm');
if (inquiryForm) inquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;
  const data = new FormData(inquiryForm);
  const message = [
    'Hello Mohammed, I would like to make a project enquiry.',
    '', `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Service: ${data.get('type')}`,
    `Budget: ${data.get('budget')}`,
    '', `Project details: ${data.get('message')}`
  ].join('\n');
  const status = document.getElementById('formStatus');
  if (status) status.textContent = 'Opening WhatsApp with your project enquiry…';
  window.open(`https://wa.me/2348132707897?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
