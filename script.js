// --- Banner close ---
const topBanner = document.getElementById('topBanner');
const closeBanner = document.getElementById('closeBanner');
closeBanner.addEventListener('click', () => {
  if (topBanner) topBanner.style.display = 'none';
});

// --- Mobile menu toggle ---
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
mobileMenuToggle.addEventListener('click', () => {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('hidden');
});

// --- Sticky navbar minor opacity change on scroll ---
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (!navbar) return;
  if (y > 50) {
    navbar.style.background = 'rgba(0,0,0,0.98)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = 'rgba(0,0,0,0.95)';
    navbar.style.backdropFilter = 'blur(6px)';
  }
  lastScrollY = y;
});

// --- Marquee pause on hover ---
const marquee = document.getElementById('marquee');
if (marquee) {
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}

// --- Newsletter toggles & submission ---
let devNewsletter = true;
let productNewsletter = false;

const devToggle = document.getElementById('devToggle');
const productToggle = document.getElementById('productToggle');
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const newsletterMessage = document.getElementById('newsletterMessage');

if (devToggle) {
  devToggle.addEventListener('click', () => {
    devNewsletter = !devNewsletter;
    devToggle.classList.toggle('purple-on', devNewsletter);
    devToggle.setAttribute('aria-pressed', String(!!devNewsletter));
  });
}
// product toggle
if (productToggle) {
  productToggle.addEventListener('click', () => {
    productNewsletter = !productNewsletter;
    productToggle.classList.toggle('purple-on', productNewsletter);
    productToggle.setAttribute('aria-pressed', String(!!productNewsletter));
  });
}

// simple email regex
function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const email = emailInput.value.trim();

    if (!email) {
      newsletterMessage.textContent = '⚠ Please enter your email.';
      newsletterMessage.style.color = 'tomato';
      return;
    }
    if (!isValidEmail(email)) {
      newsletterMessage.textContent = '⚠ Please enter a valid email address.';
      newsletterMessage.style.color = 'tomato';
      return;
    }
    if (!devNewsletter && !productNewsletter) {
      newsletterMessage.textContent = '⚠ Please select at least one newsletter.';
      newsletterMessage.style.color = 'tomato';
      return;
    }

    // simulate success
    newsletterMessage.textContent = `✅ Successfully subscribed with ${email}`;
    newsletterMessage.style.color = 'lightgreen';
    emailInput.value = '';
  });
}

// --- Fusion quick demo button (non-AI, placeholder) ---
const fusionInput = document.getElementById('fusionInput');
const fusionRun = document.getElementById('fusionRun');
if (fusionRun && fusionInput) {
  fusionRun.addEventListener('click', () => {
    const q = fusionInput.value.trim();
    if (!q) {
      alert('Please enter a prompt for Fusion (demo).');
      return;
    }
    // for a static demo we just show an alert — replace with real integration
    alert('Fusion demo: received prompt — "' + q + '". (This is a static demo.)');
    fusionInput.value = '';
  });
}
