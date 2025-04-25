function configurar() {
    //O código a seguir verifica a existência da chave 'pessoas' no localStorage. 
    //Caso não exista, o código cria um vetor vazio e o armazena no localStorage.
    if (!localStorage.contas) {
        let contas = [];
        localStorage.setItem('contas', JSON.stringify(contas));
    }
}

function cadastrar() {
    //recupera o vetor de registros na memória secundária
    let contas = JSON.parse(localStorage.getItem('contas'));

    let conta = new Conta();
    conta.numero = document.getElementById("numero").value;
    conta.nome = document.getElementById("nome").value;
    conta.saldo = 0;

    if(contas.some(c => c.numero == conta.numero)){
        alert('O número informado já foi cadastrado');
    }else{
        contas.push(conta);

        //armazena o vetor na memória secundária
        localStorage.setItem('contas', JSON.stringify(contas));
    
        alert('Cadastro realizado com sucesso');
    
        //redireciona para a página da tabela
        window.location.href = "exercicio01Tabela.html";
    }
}
