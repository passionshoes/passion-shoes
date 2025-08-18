// === Mobile drawer ===
(function () {
  const burger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.close-drawer');
  const backdrop = document.querySelector('.backdrop');

  if (!burger) return;

  const open = () => {
    drawer.classList.add('open');
    burger.classList.add('active');
    backdrop.hidden = false;
    requestAnimationFrame(() => backdrop.classList.add('show'));
    document.body.classList.add('lock');
    burger.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    drawer.classList.remove('open');
    burger.classList.remove('active');
    backdrop.classList.remove('show');
    document.body.classList.remove('lock');
    burger.setAttribute('aria-expanded', 'false');
    setTimeout(() => (backdrop.hidden = true), 300);
  };

  burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });
})();

// === Search overlay ===
(function () {
  const btn = document.querySelector('.search-btn');
  const overlay = document.querySelector('.search-overlay');
  const closeBtn = document.querySelector('.close-search');
  if (!btn || !overlay) return;

  btn.addEventListener('click', () => {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('show'));
    document.body.classList.add('lock');
  });

  const close = () => {
    overlay.classList.remove('show');
    document.body.classList.remove('lock');
    setTimeout(() => overlay.hidden = true, 300);
  };

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('show')) close(); });
})();

// === Auto-hide header on scroll ===
(function () {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 80) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScroll = current;
  });
})();
// Simple Filter & Sort (Shop Page)
document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("filter");
  const sort = document.getElementById("sort");

  if (filter && sort) {
    filter.addEventListener("change", () => {
      alert(`Filter applied: ${filter.value}`);
      // Replace this alert with Ecwid API calls if needed
    });

    sort.addEventListener("change", () => {
      alert(`Sorting by: ${sort.value}`);
      // Replace this alert with Ecwid API calls if needed
    });
  }
});
// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count badge
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}
updateCartCount();

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to cart!");
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Display cart on cart.html
function displayCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';
    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        container.appendChild(div);
    });

    // Add Checkout Button
    const checkoutBtn = document.createElement('button');
    checkoutBtn.textContent = "Continue to PayPal Checkout";
    checkoutBtn.onclick = paypalCheckout;
    container.appendChild(checkoutBtn);
}

// PayPal Checkout
function paypalCheckout() {
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&currency_code=USD&amount=${total}`;
    window.location.href = paypalUrl;
}

// Call displayCart on cart page
if (document.getElementById('cart-items')) {
    displayCart();
}
function displayCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; margin-top:50px;">
                <h2 style="font-size:2rem; font-weight:bold; color:#111;">Your cart is empty</h2>
                <p style="font-size:1rem; color:#555; margin-top:10px;">
                    Add something into your cart and it will show up here.
                </p>
            </div>
        `;
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        container.appendChild(div);
    });

    // Add Checkout Button
    const checkoutBtn = document.createElement('button');
    checkoutBtn.textContent = "Continue to PayPal Checkout";
    checkoutBtn.onclick = paypalCheckout;
    container.appendChild(checkoutBtn);
}



