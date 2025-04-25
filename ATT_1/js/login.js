async function autenticarUsuario() {
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;
    const erroDiv = document.getElementById('erro');
    erroDiv.textContent = '';
  
    try {
      const response = await fetch(`https://api-odinline.odiloncorrea.com/usuario/${login}/${senha}/autenticar`);
      if (!response.ok) throw new Error('Usuário ou senha inválidos');
  
      const usuario = await response.json();
      localStorage.setItem('usuario', JSON.stringify(usuario)); // Guarda os dados do usuário
      window.location.href = 'menu.html'; // Redireciona para a próxima página
    } catch (error) {
      erroDiv.textContent = error.message;
    }
  }
  