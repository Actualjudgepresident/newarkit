document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  updateBasketUI();
});

function loadProducts() {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';

  const products = [
    {
      id: 1,
      name: 'Gaming Laptop',
      price: 1000,
      img: 'images/laptop.jpg'
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      price: 25,
      img: 'images/mouse.jpg'
    },
    {
      id: 3,
      name: '4K Monitor',
      price: 350,
      img: 'images/monitor.jpg'
    }
  ];

  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button onclick="addToBasket(${product.id}, '${product.name}', ${product.price})">Add to Basket</button>
    `;
    productList.appendChild(div);
  });
}

function addToBasket(id, name, price) {
  let basket = JSON.parse(localStorage.getItem('basket')) || [];
  basket.push({ id, name, price });
  localStorage.setItem('basket', JSON.stringify(basket));
  updateBasketUI();
}

function updateBasketUI() {
  const basketItems = document.getElementById('basketItems');
  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  basketItems.innerHTML = '';

  if (basket.length === 0) {
    basketItems.innerHTML = '<p>Your basket is empty.</p>';
    return;
  }

  basket.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} - $${item.price}`;
    basketItems.appendChild(div);
  });
}

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.email.value;
  alert('Registration successful (demo only)');
  localStorage.setItem('userEmail', email);
  window.location.hash = '#products';
  loadProducts();
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = this.email.value;
  alert('Login successful (demo only)');
  localStorage.setItem('userEmail', email);
  window.location.hash = '#products';
  loadProducts();
});
