let alertas = JSON.parse(localStorage.getItem('alertas')) || [];

function cadastrarAlerta() {
  const produtoId = document.getElementById('produtoId').value;
  const valorDesejado = parseFloat(document.getElementById('valorDesejado').value);
  const acao = document.getElementById('acao').value;
  const erro = document.getElementById('erro');

  erro.textContent = '';

  if (!produtoId || isNaN(valorDesejado)) {
    erro.textContent = 'Preencha todos os campos corretamente.';
    return;
  }

  if (alertas.some(a => a.produtoId === produtoId)) {
    erro.textContent = 'Já existe um alerta para esse produto.';
    return;
  }

  const novoAlerta = { produtoId, valorDesejado, acao };
  alertas.push(novoAlerta);
  localStorage.setItem('alertas', JSON.stringify(alertas));

  document.getElementById('produtoId').value = '';
  document.getElementById('valorDesejado').value = '';
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById('listaAlertas');
  lista.innerHTML = '';

  alertas.forEach(async alerta => {
    const res = await fetch(`https://api-odinline.odiloncorrea.com/produto/${alerta.produtoId}`);
    const produto = await res.json();

    const li = document.createElement('li');
    li.textContent = `${produto.descricao} - Atual: R$ ${produto.valor} | Desejado: R$ ${alerta.valorDesejado.toFixed(2)} | Ação: ${alerta.acao}`;
    lista.appendChild(li);

    verificarAlerta(alerta, produto);
  });
}

function verificarAlerta(alerta, produto) {
  const valorAtual = parseFloat(produto.valor);

  if (valorAtual <= alerta.valorDesejado) {
    if (alerta.acao === 'notificar') {
      alert(`🔔 Alerta: ${produto.descricao} chegou a R$ ${valorAtual}`);
      document.getElementById('alertaAudio').play();
    } else if (alerta.acao === 'comprar') {
      const compras = JSON.parse(localStorage.getItem('compras')) || [];
      compras.push({ produtoId: alerta.produtoId, valor: valorAtual });
      localStorage.setItem('compras', JSON.stringify(compras));
      alert(`🛒 Compra registrada: ${produto.descricao} por R$ ${valorAtual}`);
    }

    // Remover alerta
    alertas = alertas.filter(a => a.produtoId !== alerta.produtoId);
    localStorage.setItem('alertas', JSON.stringify(alertas));
    atualizarLista();
  }
}

setInterval(atualizarLista, 10000); // Verifica a cada 10 segundos
atualizarLista();
