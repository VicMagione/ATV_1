function configurar() {
    //O código a seguir verifica a existência da chave 'usuarios' no localStorage. 
    //Caso não exista, o código cria um vetor vazio e o armazena no localStorage.
    if (!localStorage.usuarios) {
        let usuarios = [];
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    if (localStorage.usuarioAutenticado) {
        localStorage.removeItem("usuarioAutenticado")
    }
}

function cadastrar() {
    //recupera o vetor de registros na memória secundária
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));

    let usuario = new Usuario();
    usuario.login = document.getElementById("loginCadastro").value;
    usuario.senha = document.getElementById("senhaCadastro").value;

    if(usuarios.some(u => u.login == usuario.login)){
        alert('O login informado já foi cadastrado');
    }else{
        usuarios.push(usuario);

        //armazena o vetor na memória secundária
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
        alert('Cadastro realizado com sucesso');
    
        //redireciona para a página da tabela
        window.location.href = "exercicio02Formulario.html";
    }
}

function autenticar() {
    //recupera o vetor de registros na memória secundária
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));

    let usuario = new Usuario();
    usuario.login = document.getElementById("loginAutenticar").value;
    usuario.senha = document.getElementById("senhaAutenticar").value;

    if(usuarios.some(u => u.login == usuario.login && u.senha == usuario.senha)){
        localStorage.setItem("usuarioAutenticado", JSON.stringify(usuario));
        window.location.href = "exercicio02Tabela.html";
       
    }else{
        alert("Login ou senha incorretos.");
        window.location.href = "exercicio02Formulario.html";
    }
}