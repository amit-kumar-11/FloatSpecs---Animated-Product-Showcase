// === Typing Animation ===
const typeText = (element, text, speed = 100) => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
};

document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.getElementById('typing-text');
  typingElement.setAttribute('aria-live', 'polite'); // Accessibility
  const text = 'Revolutionary technology meets elegant design. Experience the future of mobile innovation.';
  setTimeout(() => {
    typeText(typingElement, text, 50);
  }, 1000);
});

// === Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === Feature Observer + Animation ===
const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const type = entry.target.getAttribute('data-feature');
      if (type) triggerFeatureAnimation(type);
    }
  });
}, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.feature-item').forEach(item => {
  featureObserver.observe(item);
});

function triggerFeatureAnimation(type) {
  const animations = {
    camera: () => {
      ['.camera-lens', '.camera-flash', '.camera-focus-ring'].forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.style.animationPlayState = 'running';
      });
    },
    display: () => {
      const glow = document.querySelector('.display-glow');
      if (glow) glow.style.animationPlayState = 'running';
      document.querySelectorAll('.content-item').forEach(el => el.style.animationPlayState = 'running');
    },
    audio: () => {
      document.querySelectorAll('.wave').forEach(el => el.style.animationPlayState = 'running');
    },
    battery: () => {
      ['.battery-level', '.charging-bolt'].forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.style.animationPlayState = 'running';
      });
    }
  };
  if (animations[type]) animations[type]();
}

// === Color Switch + Ripple Effect ===
const colorButtons = document.querySelectorAll('.color-btn');
const colorProductImage = document.getElementById('color-product-image');
const productImage = document.getElementById('product-image');

const colorImages = {
  midnight: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
  ocean: 'https://images.pexels.com/photos/1034646/pexels-photo-1034646.jpeg?auto=compress&cs=tinysrgb&w=800',
  rose: 'https://images.pexels.com/photos/1191458/pexels-photo-1191458.jpeg?auto=compress&cs=tinysrgb&w=800',
  emerald: 'https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg?auto=compress&cs=tinysrgb&w=800',
  arctic: 'https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg?auto=compress&cs=tinysrgb&w=800'
};

// Preload images
Object.values(colorImages).forEach(src => {
  const img = new Image();
  img.src = src;
});

colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const color = button.getAttribute('data-color');
    colorButtons.forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    if (colorImages[color]) {
      colorProductImage.style.opacity = '0';
      productImage.style.opacity = '0';
      setTimeout(() => {
        colorProductImage.src = colorImages[color];
        productImage.src = colorImages[color];
        colorProductImage.style.opacity = '1';
        productImage.style.opacity = '1';
      }, 250);
    }

    // Ripple Effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// === Floating CTA Visibility ===
const floatingCta = document.getElementById('floating-cta');
const hero = document.getElementById('hero');

const floatingCtaObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      floatingCta.classList.remove('visible');
    } else {
      floatingCta.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

floatingCtaObserver.observe(hero);

// === Theme Toggle (Dark/Light Mode) ===
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  setTimeout(() => body.style.transition = '', 300);
});

// === Debounced Scroll Events ===
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    // Navbar effect
    const navbar = document.querySelector('.navbar');
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = window.scrollY > 100 ? 'blur(15px)' : 'blur(10px)';

    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      if (window.pageYOffset > window.innerHeight * 0.5) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
      }
    }
  }, 50);
});

// === requestAnimationFrame Parallax ===
let lastScrollY = 0;
function parallaxUpdate() {
  const elements = document.querySelectorAll('.hero-product');
  elements.forEach(el => {
    el.style.transform = `translateY(${lastScrollY * 0.5}px)`;
  });
  requestAnimationFrame(parallaxUpdate);
}
window.addEventListener('scroll', () => {
  lastScrollY = window.pageYOffset;
});
requestAnimationFrame(parallaxUpdate);

// === Button Ripple Effect ===
document.querySelectorAll('.cta-button, .floating-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// === Style Tag for Animations (Merged) ===
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes ripple {
    from { transform: scale(0); opacity: 1; }
    to { transform: scale(2); opacity: 0; }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleTag);

// === Specs Reveal ===
const specCards = document.querySelectorAll('.spec-card');
const specObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
      }, i * 200);
    }
  });
}, { threshold: 0.1 });

specCards.forEach(card => {
  card.style.transform = 'translateY(30px)';
  card.style.opacity = '0';
  card.style.transition = 'all 0.6s ease';
  specObserver.observe(card);
});

// === 3D Tilt Effect ===
document.querySelectorAll('.product-image, .color-product-image').forEach(image => {
  image.addEventListener('mousemove', (e) => {
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  image.addEventListener('mouseleave', () => {
    image.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  });
});

// === Page Loader ===
window.addEventListener('load', () => {
  const loader = document.createElement('div');
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
  `;
  const spinner = document.createElement('div');
  spinner.style.cssText = `
    width: 50px;
    height: 50px;
    border: 3px solid var(--border-color);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `;
  loader.appendChild(spinner);
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }, 1000);
});

// === Fallback for Old Browsers ===
if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.feature-item, .spec-card').forEach(el => {
    el.classList.add('visible');
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}

console.log('✅ Enhanced AeroPhone Pro Loaded!');
