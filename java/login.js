function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Comprobar las credenciales (puedes personalizar esta lógica según tus necesidades)
    if (username === 'usuario' && password === 'contraseña') {
      showProductList();
    } else {
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  }

  function showProductList() {
    const loginForm = document.getElementById('loginForm');
    const productList = document.getElementById('ProductList');

    const productsUL = document.getElementById('ProductList');


    // Ocultar el formulario de inicio de sesión y mostrar la lista de productos
    loginForm.style.display = 'none';
    productList.style.display = 'block';
  }
