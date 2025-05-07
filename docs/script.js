const backendUrl = 'http://localhost:3000';

function detectCardType(number) {
  const regexMap = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MasterCard: /^5[1-5][0-9]{14}$/,
    AmEx: /^3[47][0-9]{13}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
  };
  for (const card in regexMap) {
    if (regexMap[card].test(number)) return card;
  }
  return "Unknown";
}

document.addEventListener('DOMContentLoaded', () => {
  updateVisibleSection();
  window.addEventListener('hashchange', updateVisibleSection);

  const cardInput = document.querySelector('input[name="creditCard"]');
  if (cardInput) {
    cardInput.addEventListener('input', function () {
      const type = detectCardType(this.value);
      document.getElementById('cardTypeDisplay').textContent = `Card Type: ${type}`;
    });
  }

  document.getElementById('registerForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.cardType = detectCardType(data.creditCard);
    try {
      const res = await fetch(`${backendUrl}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message || 'Registration successful!');
        window.location.hash = '#login';
      } else {
        alert('Error: ' + (result.message || 'Registration failed'));
      }
    } catch (err) {
      alert('Server error: ' + err.message);
    }
  });

  document.getElementById('loginForm')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(`${backendUrl}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        localStorage.setItem('token', result.token || '');
        alert(result.message || 'Login successful!');
        window.location.hash = '#products';
      } else {
        alert('Error: ' + (result.message || 'Login failed'));
      }
    } catch (err) {
      alert('Server error: ' + err.message);
    }
  });

  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    alert('Proceeding to checkout...');
  });
});

function updateVisibleSection() {
  const sections = {
    products: document.getElementById("products"),
    login: document.getElementById("login"),
    register: document.getElementById("register"),
    basket: document.getElementById("basket"),
  };

  const hash = location.hash.slice(1) || 'products';
  Object.values(sections).forEach(sec => sec?.classList.remove('active'));

  if (sections[hash]) {
    sections[hash].classList.add('active');
    if (hash === 'products') loadProducts();
    if (hash === 'basket') updateBasketUI();
  }
}

function loadProducts() {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';

  const products = [
    { id: 1, name: 'Lenovo Legion 5', brand: 'Lenovo', price: 1200, type: 'Gaming Laptop', image: 'https://via.placeholder.com/150?text=Lenovo+Legion+5' },
    { id: 2, name: 'ASUS ROG Strix', brand: 'ASUS', price: 1350, type: 'Gaming Laptop', image: 'https://via.placeholder.com/150?text=ASUS+ROG+Strix' },
    { id: 3, name: 'Logitech MX Master 3', brand: 'Logitech', price: 99, type: 'Wireless Mouse', image: 'https://via.placeholder.com/150?text=Logitech+MX+Master+3' },
    { id: 4, name: 'Razer Viper', brand: 'Razer', price: 79, type: 'Wireless Mouse', image: 'https://via.placeholder.com/150?text=Razer+Viper' },
    { id: 5, name: 'LG UltraFine 4K', brand: 'LG', price: 450, type: '4K Monitor', image: 'https://via.placeholder.com/150?text=LG+UltraFine+4K' },
    { id: 6, name: 'Dell Ultrasharp 4K', brand: 'Dell', price: 500, type: '4K Monitor', image: 'https://via.placeholder.com/150?text=Dell+Ultrasharp+4K' }
  ];

  products.forEach(product => {
    const div = document.createElement('div');
    div.style.border = '1px solid #ccc';
    div.style.padding = '15px';
    div.style.marginBottom = '15px';
    div.style.borderRadius = '8px';
    div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    div.style.backgroundColor = '#fff';

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:150px; height:auto; margin-bottom:10px;" />
      <h3>${product.name}</h3>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Type:</strong> ${product.type}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <button onclick="addToBasket(${product.id}, '${product.name}', ${product.price})">Add to Basket</button>
    `;

    productList.appendChild(div);
  });
}

function addToBasket(id, name, price) {
  price = Number(price); // Ensure it's numeric
  let basket = JSON.parse(localStorage.getItem('basket')) || [];
  const existing = basket.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    basket.push({ id, name, price, quantity: 1 });
  }
  localStorage.setItem('basket', JSON.stringify(basket));
  updateBasketUI();
}

function removeFromBasket(index) {
  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  basket.splice(index, 1);
  localStorage.setItem('basket', JSON.stringify(basket));
  updateBasketUI();
}

function updateQuantity(index, value) {
  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  const qty = parseInt(value);
  if (!isNaN(qty) && qty > 0) {
    basket[index].quantity = qty;
    localStorage.setItem('basket', JSON.stringify(basket));
    updateBasketUI();
  }
}

function updateBasketUI() {
  const basketItems = document.getElementById('basketItems');
  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  basketItems.innerHTML = '';

  if (basket.length === 0) {
    basketItems.innerHTML = '<p>Your basket is empty.</p>';
    return;
  }

  let total = 0;
  basket.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.style.border = '1px solid #ccc';
    wrapper.style.padding = '10px';
    wrapper.style.marginBottom = '10px';

    total += Number(item.price) * Number(item.quantity);

    wrapper.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Price: $${item.price}</p>
      <label>Quantity:
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)" />
      </label>
      <br/>
      <button onclick="removeFromBasket(${index})">Remove</button>
    `;
    basketItems.appendChild(wrapper);
  });

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  totalDiv.style.marginTop = '10px';
  basketItems.appendChild(totalDiv);
}
