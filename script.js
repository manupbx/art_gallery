// ===== DOM Elements =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const searchInput = document.getElementById('searchInput');
const items = document.querySelectorAll('.item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.getElementById('closeLightbox');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// ===== Theme Toggle =====
themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  themeToggle.textContent = body.classList.contains('light-mode') ? '🌙' : '🌓';
});

// ===== Search Filter =====
searchInput?.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  items.forEach(item => {
    const caption = item.dataset.caption.toLowerCase();
    item.style.display = caption.includes(query) ? 'block' : 'none';
  });
});

// ===== Lightbox Gallery Viewer =====
let currentIndex = 0;

function openLightbox(index) {
  const item = items[index];
  lightboxImg.src = item.querySelector('img').src;
  lightboxCaption.textContent = item.dataset.caption;
  currentIndex = index;
  lightbox.style.display = 'flex';
}

items.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

closeLightbox?.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});

prevBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  openLightbox(currentIndex);
});

nextBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % items.length;
  openLightbox(currentIndex);
});

// ===== Upload Preview =====
imageInput?.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (file) {
    imagePreview.src = URL.createObjectURL(file);
    imagePreview.style.display = 'block';
  }
});

// ===== Mobile Menu Toggle =====
menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// ===== Close menu when clicking a link =====
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== Animate on Scroll (fade in) =====
const animateOnScroll = () => {
  document.querySelectorAll('.item, .about-section, .upload-section').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
};

// Set initial state for animation
document.querySelectorAll('.item, .about-section, .upload-section').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);