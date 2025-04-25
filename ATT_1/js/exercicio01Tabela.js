function exibirTabela() {
	var tabela = document.getElementById("tabela");
	apagarLinhas(tabela);

	//recupera o vetor na memória secundária
	var contas = JSON.parse(localStorage.getItem('contas'));

	contas.forEach(conta => {
		adicionarLinha(tabela, conta)
	});
}

function adicionarLinha(tabela, conta) {
	// Seleciona o corpo da tabela 
	var tbody = tabela.querySelector("tbody");

	// Cria uma nova linha
	var novaLinha = document.createElement("tr");

	// Cria e adiciona na nova linha as células com os valores
	var colunaNumero = document.createElement("td");
	colunaNumero.textContent = conta.numero;
	novaLinha.appendChild(colunaNumero);

	var colunaNome = document.createElement("td");
	colunaNome.textContent = conta.nome;
	novaLinha.appendChild(colunaNome);

	var colunaSaldo = document.createElement("td");
	colunaSaldo.textContent = conta.saldo;
	novaLinha.appendChild(colunaSaldo);

	// Adiciona a nova linha ao tbody
	tbody.appendChild(novaLinha);
}

function apagarLinhas(tabela) {
	// Seleciona o corpo da tabela 
	var corpoTabela = tabela.querySelector("tbody");

	// Enquanto houver linhas no corpo da tabela, remove a primeira
	while (corpoTabela.rows.length > 0) {
		corpoTabela.deleteRow(0);
	}
}

function confirmar() {
	var tabela = document.getElementById("tabela");
	

	//recupera o vetor na memória secundária
	var contas = JSON.parse(localStorage.getItem('contas'));

	var numero = parseInt(document.getElementById("numero").value);
	var valor = parseInt(document.getElementById("valor").value);
	var operacao = parseInt(document.getElementById("operacao").value);

	if(contas.some(c => c.numero == numero)){

		let posicao = contas.findIndex(c => c.numero == numero);
		if(operacao == 1){
			contas[posicao].saldo = contas[posicao].saldo - valor;
		}else{
			contas[posicao].saldo = contas[posicao].saldo + valor;
		}

		localStorage.setItem('contas', JSON.stringify(contas));
		apagarLinhas(tabela);

		contas.forEach(conta => {
			adicionarLinha(tabela, conta)
		});
		
       
    }else{	
		alert('O número informado não foi cadastrado');
	}
}
