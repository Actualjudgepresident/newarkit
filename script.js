document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});


function loadProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    const products = [
        { id: 1, name: 'Gaming Laptop', price: 1000 },
        { id: 2, name: 'Wireless Mouse', price: 25 },
        { id: 3, name: '4K Monitor', price: 350 }
    ];

    products.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
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

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = this.name.value;
    const email = this.email.value;
    const password = this.password.value;
    const address = this.address.value;
    const creditCard = this.creditCard.value;

    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, address, creditCard })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            localStorage.setItem('userEmail', email);
            window.location.hash = '#products';
            loadProducts();
        } else {
            alert(data.error || 'Registration failed.');
        }
    } catch (err) {
        alert('Error during registration');
    }
});

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('userEmail', email);
            window.location.hash = '#products';
            loadProducts();
        } else {
            alert(data.error || 'Login failed.');
        }
    } catch (err) {
        alert('Error during login');
    }
});

updateBasketUI();
