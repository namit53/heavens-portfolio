/**
 * Heaven's Portfolio — Main JavaScript
 * Handles: navigation, counters, properties, blog, animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initCounters();
  initScrollAnimations();
  initDropdowns();
  initHeroSlideshow();

  // Page-specific initializations
  const page = detectPage();
  if (page === 'home') {
    loadHomeProperties();
    loadHomeBlog();
    initActionPanel();
  }
  if (page === 'properties') {
    loadAllProperties();
  }
  if (page === 'blog') {
    loadAllBlog();
  }
});

// ─── Hero Slideshow ───
let currentSlide = 0;
let slideTimer = null;

function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;
  slideTimer = setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 5000);
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove('active');
  dots[currentSlide]?.classList.remove('active');

  currentSlide = index;

  slides[currentSlide].classList.add('active');
  dots[currentSlide]?.classList.add('active');

  // Restart the timer on manual click
  clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, 5000);
}

// ─── Action Panel (BUY / SELL / RENT / LEASE) ───
function initActionPanel() {
  // Nothing needed on init — buttons trigger handleAction()
}

function handleAction(type) {
  const buyExpand = document.getElementById('buy-expand');
  const allBtns = ['btn-buy', 'btn-sell', 'btn-rent'];

  // Deactivate all buttons first
  allBtns.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  if (type === 'buy') {
    window.location.href = 'properties.html';
  } else if (type === 'sell') {
    if (buyExpand) buyExpand.classList.remove('open');
    window.location.href = 'sell.html';
  } else if (type === 'rent') {
    if (buyExpand) buyExpand.classList.remove('open');
    window.location.href = 'rent-lease.html?type=rent';
  }
}

function toggleBuyType(type) {
  document.getElementById('tog-residential').classList.toggle('active', type === 'residential');
  document.getElementById('tog-commercial').classList.toggle('active', type === 'commercial');
  const filtered = type === 'residential'
    ? allProperties.filter(p => p.category === 'Residential').slice(0, 3)
    : allProperties.filter(p => p.category === 'Commercial').slice(0, 3);
  renderPropertyCards(filtered, 'buy-properties-grid');
}

// ─── Detect current page ───
function detectPage() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('about')) return 'about';
  if (path.includes('properties')) return 'properties';
  if (path.includes('blog')) return 'blog';
  if (path.includes('contact')) return 'contact';
  if (path.includes('careers')) return 'careers';
  return 'home';
}

// ─── Sticky Header ───
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Mobile Menu ───
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

// ─── Dropdown Menus ───
function initDropdowns() {
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    // Desktop: hover
    dropdown.addEventListener('mouseenter', () => {
      dropdown.classList.add('open');
    });
    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('open');
    });

    // Mobile: tap the parent link to toggle dropdown
    const trigger = dropdown.querySelector('.nav-link');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        // Only intercept on mobile (hamburger visible)
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });
}

// ─── Counter Animation ───
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

// ─── Scroll Animations ───
function initScrollAnimations() {
  const animatedEls = document.querySelectorAll(
    '.service-card, .usp-card, .testimonial-card, .mvv-card, .benefit-card, .team-card, .stat-card, .about-content, .about-image-wrap, .story-content, .story-image'
  );
  if (animatedEls.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedEls.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}

// ─── Properties ───
let allProperties = [
  {
    "id": "prop-1",
    "title": "DLF The Camellias",
    "location": "Sector 42, Golf Course Road",
    "price": "₹70.0 Cr onwards",
    "category": "Residential",
    "tags": ["Ready to Move", "Ultra Luxury"],
    "beds": "4, 5, 6 BHK & Penthouses",
    "area": "7,196-16,500 sq.ft",
    "image": "images_properties/Dlf_Cammelias.webp"
  },
  {
    "id": "prop-2",
    "title": "DLF The Magnolias",
    "location": "Sector 42, Golf Course Road",
    "price": "₹40.0 Cr onwards",
    "category": "Residential",
    "tags": ["Ready to Move", "Ultra Luxury"],
    "beds": "4, 5 BHK & Penthouses",
    "area": "5,825-10,777 sq.ft",
    "image": "images_properties/dlf-the-magnolias.webp"
  },
  {
    "id": "prop-3",
    "title": "DLF The Aralias",
    "location": "Sector 42, Golf Course Road",
    "price": "₹30.0 Cr onwards",
    "category": "Residential",
    "tags": ["Ready to Move", "Ultra Luxury"],
    "beds": "4, 5 BHK & Penthouses",
    "area": "5,575-10,000 sq.ft",
    "image": "images_properties/DLF The Aralias.webp"
  },
  {
    "id": "prop-4",
    "title": "Ambience Caitriona",
    "location": "Sector 24, Ambience Island",
    "price": "₹19.9 Cr onwards",
    "category": "Residential",
    "tags": ["Ready to Move", "Ultra Luxury"],
    "beds": "4, 5, 5.5 BHK & Penthouses",
    "area": "6,700-11,825 sq.ft",
    "image": "images_properties/Ambience_Caitriona.jpg"
  },

  {
    "id": "prop-6",
    "title": "DLF The Crest",
    "location": "Sector 54, Golf Course Road",
    "price": "₹10.9 Cr onwards",
    "category": "Residential",
    "tags": ["Ready to Move", "Ultra Luxury"],
    "beds": "3, 4, 5 BHK & Penthouses",
    "area": "2,650-6,288 sq.ft",
    "image": "images_properties/DLF_TheCrestjpg.jpg"
  },
  {
    "id": "prop-8",
    "title": "Godrej Miraya",
    "location": "Sector 43, Golf Course Road",
    "price": "₹9.5 Cr onwards",
    "category": "Residential",
    "tags": ["New Launch", "Ultra Luxury"],
    "beds": "3, 4 BHK",
    "area": "2,711-4,577 sq.ft",
    "image": "images_properties/godrej_miraya.png"
  },
  {
    "id": "prop-9",
    "title": "Park View Apartments",
    "location": "Sector 48, Gurgaon",
    "price": "₹2.4 Cr onwards",
    "category": "Residential",
    "tags": ["Ready to Move"],
    "beds": "2-3 BHK",
    "area": "1200-1800 sq.ft",
    "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
  }
];

function loadHomeProperties() {
  renderPropertyCards(allProperties.slice(0, 6), 'home-properties-grid');
}

function loadAllProperties() {
  // Check URL params for pre-filter
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    const mapped = { residential: 'Residential', commercial: 'Commercial', plots: 'Plots' };
    const filterVal = mapped[cat.toLowerCase()] || 'All';
    // Set active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterVal);
    });
    const filtered = filterVal === 'All' ? allProperties : allProperties.filter(p => p.category === filterVal);
    renderPropertyCards(filtered, 'properties-grid');
  } else {
    renderPropertyCards(allProperties, 'properties-grid');
  }

  initPropertyFilters();
}

// \u2500\u2500\u2500 Active category filter state \u2500\u2500\u2500
let activeCategoryFilter = 'All';

function initPropertyFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategoryFilter = btn.dataset.filter;
      applyDropdownFilters();
    });
  });
}

function applyDropdownFilters() {
  const location = document.getElementById('filter-location')?.value || '';
  const price = document.getElementById('filter-price')?.value || '';

  let filtered = activeCategoryFilter === 'All'
    ? allProperties
    : allProperties.filter(p => p.category === activeCategoryFilter);

  if (location) {
    filtered = filtered.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
  }

  if (price) {
    filtered = filtered.filter(p => {
      const val = parseFloat(p.price.replace(/[^\d.]/g, ''));
      if (price === 'under2')  return val < 2;
      if (price === '2to5')    return val >= 2 && val <= 5;
      if (price === '5to10')   return val > 5 && val <= 10;
      if (price === 'above10') return val > 10;
      return true;
    });
  }

  renderPropertyCards(filtered, 'properties-grid');
}

function renderPropertyCards(properties, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  if (properties.length === 0) {
    container.innerHTML = '<div class="empty-state">No properties found in this category.</div>';
    return;
  }

  properties.forEach(prop => {
    const badges = (prop.tags || []).map(tag => {
      const cls = tag === 'Ultra Luxury' ? 'badge-ultra' : tag === 'Hot Deal' ? 'badge-success' : tag === 'New Launch' ? 'badge-gold' : 'badge-info';
      return `<span class="badge ${cls}">${tag}</span>`;
    }).join('');

    const card = document.createElement('div');
    card.className = 'property-card';
    card.innerHTML = `
      <div class="property-image">
        <a href="property-detail.html" style="display:block; height:100%;">
          <img src="${prop.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}" alt="${prop.title}" class="property-image-placeholder" style="object-fit: cover; width: 100%; height: 100%;">
        </a>
        <div class="property-badges">${badges}</div>
      </div>
      <div class="property-body">
        <span class="property-category">${prop.category}</span>
        <a href="property-detail.html" style="text-decoration:none; color:inherit;">
          <h3 class="property-title">${prop.title}</h3>
        </a>
        <div class="property-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${prop.location}
        </div>
        <div class="property-details">
          <span>${prop.beds}</span>
          <span>·</span>
          <span>${prop.area}</span>
        </div>
        <div class="property-footer">
          <span class="property-price">${prop.price}</span>
          <a href="property-detail.html" class="link-arrow">View Details →</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Re-init scroll animations for new cards
  container.querySelectorAll('.property-card').forEach(card => {
    card.classList.add('animate-on-scroll');
    setTimeout(() => card.classList.add('visible'), 100);
  });
}

function initPropertyFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter === 'All' ? allProperties : allProperties.filter(p => p.category === filter);
      renderPropertyCards(filtered, 'properties-grid');
    });
  });
}

// ─── Blog ───
let allBlogPosts = [
  {
    "id": "blog-1",
    "title": "Delhi NCR Real Estate Outlook 2026: Where Smart Money is Moving",
    "category": "Market Update",
    "date": "02 Jun 2026",
    "readTime": "8 min read",
    "excerpt": "A comprehensive analysis of emerging micro-markets, price trends, and regulatory changes shaping the Delhi NCR property landscape this year."
  },
  {
    "id": "blog-2",
    "title": "Commercial vs Residential Investments: A 2026 Comparison",
    "category": "Investment",
    "date": "28 May 2026",
    "readTime": "6 min read",
    "excerpt": "A data-driven guide comparing ROI, risk, and liquidity of commercial and residential properties in the current market."
  },
  {
    "id": "blog-3",
    "title": "5 Tips for Buying Your First Premium Villa",
    "category": "Guides",
    "date": "15 May 2026",
    "readTime": "4 min read",
    "excerpt": "Navigating the premium housing market can be tricky. Here's what first-time villa buyers need to know before signing."
  },
  {
    "id": "blog-4",
    "title": "RERA Updates: What Changed for Buyers in Q1 2026",
    "category": "Legal",
    "date": "01 May 2026",
    "readTime": "5 min read",
    "excerpt": "Key RERA amendments and their impact on homebuyers and developers — a simplified breakdown for non-legal readers."
  },
  {
    "id": "blog-5",
    "title": "NRI's Guide to Investing in Indian Real Estate",
    "category": "Investment",
    "date": "18 Apr 2026",
    "readTime": "7 min read",
    "excerpt": "From FEMA compliance to power of attorney — everything overseas Indians need to know about buying property in India."
  },
  {
    "id": "blog-6",
    "title": "The Dwarka Expressway Effect: Price Surge Analysis",
    "category": "Market Update",
    "date": "05 Apr 2026",
    "readTime": "5 min read",
    "excerpt": "How the completion of Dwarka Expressway is reshaping property prices in sectors 99-115 of Gurgaon."
  }
];

function loadHomeBlog() {
  renderBlogCards(allBlogPosts.slice(0, 3), 'home-blog-grid');
}

function loadAllBlog() {
  renderBlogCards(allBlogPosts, 'blog-grid');
}

function renderBlogCards(posts, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <div class="blog-card-image">
        <div class="property-image-placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        </div>
      </div>
      <div class="blog-card-body">
        <span class="badge badge-info">${post.category}</span>
        <h3 class="blog-card-title">${post.title}</h3>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <div class="blog-card-meta">
          <span>${post.date}</span>
          <span>·</span>
          <span>${post.readTime}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
