const backendUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${backendUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert('Registration successful!');
        window.location.hash = '#login';
      } else {
        const result = await res.json();
        alert('Error: ' + (result.message || 'Registration failed'));
      }
    } catch (err) {
      alert('Server error: ' + err.message);
    }
  });

  document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        alert('Login successful');
        window.location.hash = '#products';
      } else {
        const result = await res.json();
        alert('Error: ' + (result.message || 'Login failed'));
      }
    } catch (err) {
      alert('Server error: ' + err.message);
    }
  });
});
