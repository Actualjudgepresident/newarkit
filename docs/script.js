document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert('Registration successful!');
    window.location.hash = '#login';
  } else {
    const { message } = await res.json();
    alert('Error: ' + message);
  }
});

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch('http://localhost:3000/login', {
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
    const { message } = await res.json();
    alert('Error: ' + message);
  }
});
