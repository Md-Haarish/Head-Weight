const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
 
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  }, 60);
});
 
function attachCursorHover() {
  document.querySelectorAll('a, button, .cat-card, .product-card, .acc-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover');    cursorRing.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorRing.classList.remove('hover'); });
  });
}
 
/* ── PRODUCT DATA ───────────────────────────────────────────── */
const products = [
  {
    id: 1, name: 'Stealth X Pro', category: 'Full Face',
    price: 4999, oldPrice: 6499, emoji: '⛑️', badge: 'hot',
    features: ['DOT Certified', 'Anti-Fog', 'Dual Visor'], rating: 4.8, reviews: 312
  },
  {
    id: 2, name: 'Bluetooth Rider V2', category: 'Smart',
    price: 8999, oldPrice: null, emoji: '🪖', badge: 'new',
    features: ['BT 5.3', 'Voice AI', '18hr Battery'], rating: 4.9, reviews: 156
  },
  {
    id: 3, name: 'Urban Glide Half', category: 'Half Face',
    price: 1999, oldPrice: 2499, emoji: '🪖', badge: 'sale',
    features: ['Lightweight', 'ABS Shell', 'Ventilated'], rating: 4.5, reviews: 489
  },
  {
    id: 4, name: 'TrailBlazer XT', category: 'Full Face',
    price: 6499, oldPrice: null, emoji: '⛑️', badge: 'tech',
    features: ['Fiberglass', 'EPS Liner', 'Wide Visor'], rating: 4.7, reviews: 203
  },
  {
    id: 5, name: 'NavRide Smart', category: 'Smart',
    price: 11499, oldPrice: 13999, emoji: '⛑️', badge: 'new',
    features: ['GPS Nav', 'HUD Lens', 'BT Mesh'], rating: 5.0, reviews: 87
  },
  {
    id: 6, name: 'OpenRoad Classic', category: 'Half Face',
    price: 1499, oldPrice: null, emoji: '🪖', badge: null,
    features: ['Classic Look', 'Removable Visor'], rating: 4.3, reviews: 621
  },
  {
    id: 7, name: 'Carbon Ghost', category: 'Full Face',
    price: 9999, oldPrice: 12499, emoji: '⛑️', badge: 'hot',
    features: ['Carbon Fiber', 'Aero Shape', 'Pinlock'], rating: 4.9, reviews: 144
  },
  {
    id: 8, name: 'Commute Pro BT', category: 'Smart',
    price: 6999, oldPrice: null, emoji: '🪖', badge: 'tech',
    features: ['BT 5.0', 'Wind Shield', 'Intercom'], rating: 4.6, reviews: 278
  },
];
 
/* ── ACCESSORIES DATA ───────────────────────────────────────── */
const accessories = [
  { name: 'Pro GPS Phone Mount',    price: 799,  emoji: '📱', desc: '360° rotation, vibration-dampened, fits all handle bars up to 35mm.' },
  { name: 'Bluetooth Intercom Kit', price: 2499, emoji: '📡', desc: 'Mesh network for 8 riders, 1.5km range, noise cancellation built-in.' },
  { name: 'Anti-Fog Visor Shield',  price: 499,  emoji: '🔭', desc: 'Pinlock-compatible, 100% UV400, scratch resistant nano-coating.' },
  { name: 'Action Cam Chin Mount',  price: 649,  emoji: '🎥', desc: 'Universal GoPro mount, aerodynamic design, tool-free install.' },
  { name: 'Helmet Carry Bag',       price: 349,  emoji: '🎒', desc: 'Premium EVA shell case with padding, fits all helmet sizes.' },
  { name: 'LED Safety Tail Light',  price: 449,  emoji: '💡', desc: 'Magnetic attach, 5 flash modes, waterproof, 12hr battery life.' },
];
 
/* ── CART STATE ─────────────────────────────────────────────── */
let cart          = [];
let currentFilter = 'all';
 
/* ── RENDER PRODUCTS ────────────────────────────────────────── */
function renderProducts(filter) {
  const grid     = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
 
  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal">
      <div class="product-image">
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge.toUpperCase()}</span>` : ''}
        <button class="wishlist-btn" onclick="toggleWishlist(this)" title="Wishlist">♡</button>
        <span style="position:relative;z-index:1">${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-features">
          ${p.features.map(f => `<span class="feature-chip">${f}</span>`).join('')}
        </div>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 ? '½' : ''}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-bottom">
          <div class="product-price">
            ${p.oldPrice ? `<span class="old">₹${p.oldPrice.toLocaleString()}</span>` : ''}
            ₹${p.price.toLocaleString()}
          </div>
          <button class="add-cart" onclick="addToCart({name:'${p.name}',price:${p.price},emoji:'${p.emoji}'})">+ Cart</button>
        </div>
      </div>
    </div>
  `).join('');
 
  observeReveal();
  attachCursorHover();
}
 
/* ── RENDER ACCESSORIES ─────────────────────────────────────── */
function renderAccessories() {
  const grid = document.getElementById('accessoriesGrid');
 
  grid.innerHTML = accessories.map(a => `
    <div class="acc-card reveal">
      <div class="acc-img">${a.emoji}</div>
      <div class="acc-info">
        <div class="acc-name">${a.name}</div>
        <div class="acc-desc">${a.desc}</div>
        <div class="acc-bottom">
          <div class="acc-price">₹${a.price.toLocaleString()}</div>
          <button class="add-cart" onclick="addToCart({name:'${a.name}',price:${a.price},emoji:'${a.emoji}'})">+ Cart</button>
        </div>
      </div>
    </div>
  `).join('');
 
  observeReveal();
  attachCursorHover();
}
 
/* ── FILTER TABS ────────────────────────────────────────────── */
function setFilter(el, filter) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  currentFilter = filter;
  renderProducts(filter);
}
 
function filterProducts(cat) {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    if (cat === 'Accessories') {
      document.getElementById('accessories').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(t => {
      t.classList.remove('active');
      if (t.textContent.trim() === cat) t.classList.add('active');
    });
    renderProducts(cat);
  }, 300);
}
 
/* ── CART ───────────────────────────────────────────────────── */
function addToCart(item) {
  const existing = cart.find(c => c.name === item.name);
  if (existing) { existing.qty++; }
  else { cart.push({ ...item, qty: 1 }); }
  updateCart();
  showToast(`${item.emoji} ${item.name} added to cart!`);
}
 
function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
 
  const body  = document.getElementById('cartBody');
  const foot  = document.getElementById('cartFoot');
  const empty = document.getElementById('cartEmpty');
 
  if (cart.length === 0) {
    empty.style.display = 'block';
    foot.style.display  = 'none';
  } else {
    empty.style.display = 'none';
    foot.style.display  = 'block';
 
    body.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
            <button class="cart-remove" onclick="removeItem(${idx})">✕ Remove</button>
          </div>
        </div>
      </div>
    `).join('') + `<div id="cartEmpty" style="display:none"></div>`;
 
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    document.getElementById('cartTotal').textContent = `₹${total.toLocaleString()}`;
  }
}
 
function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCart();
}
 
function removeItem(idx) {
  cart.splice(idx, 1);
  updateCart();
}
 
function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}
 
function checkout() {
  showToast('🎉 Redirecting to secure checkout...');
  setTimeout(() => toggleCart(), 1200);
}
 
/* ── WISHLIST ───────────────────────────────────────────────── */
function toggleWishlist(btn) {
  btn.classList.toggle('active');
  btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
  if (btn.classList.contains('active')) showToast('❤️ Added to wishlist!');
}
 
/* ── TOAST ──────────────────────────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
 
/* ── NEWSLETTER ─────────────────────────────────────────────── */
function subscribe() {
  const email = document.getElementById('emailInput').value;
  if (email && email.includes('@')) {
    showToast('🎉 Subscribed! Welcome to the Head-Weight family.');
    document.getElementById('emailInput').value = '';
  } else {
    showToast('⚠️ Please enter a valid email address.');
  }
}
 
/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function observeReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
 
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}
 
/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  renderAccessories();
  observeReveal();
  attachCursorHover();
});