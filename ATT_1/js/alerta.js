function atualizarLista() {
  let alertas = JSON.parse(localStorage.getItem('alertas')) || [];

  const lista = document.getElementById('listaAlertas');
  lista.innerHTML = '';

  console.log(alertas)

  alertas.forEach(async alerta => {
    console.log(alerta)
    const res = await fetch(`https://api-odinline.odiloncorrea.com/produto/${alerta.produtoId}`);
    const produto = await res.json();

    const li = document.createElement('li');
    li.textContent = `${produto.descricao} - Atual: R$ ${produto.valor} | Desejado: R$ ${alerta.valorDesejado.toFixed(2)} | Ação: ${alerta.acao}`;
    lista.appendChild(li);

    
  verificarAlerta(alerta, produto);
  });
}

function cadastrarAlerta() {
  debugger
  let alertas = JSON.parse(localStorage.getItem('alertas')) || [];
  const produtoId = document.getElementById('selectProduto').value;
  const valorDesejado = parseFloat(document.getElementById('valorDesejado').value);
  const acao = document.getElementById('acao').value;
  const erro = document.getElementById('erro');

  erro.textContent = '';

  if (!produtoId) {
    erro.textContent = 'Selecione um produto.';
    return;
  }

  if (alertas.some(a => a.produtoId === produtoId)) {
    erro.textContent = 'Já existe um alerta para esse produto.';
    return;
  }

  const novoAlerta = { produtoId, valorDesejado, acao };
  alertas.push(novoAlerta);
  localStorage.setItem('alertas', JSON.stringify(alertas));

  document.getElementById('selectProduto').value = '';
  document.getElementById('valorDesejado').value = '';
  atualizarLista();
}



async function carregarProdutos() {
  const usuario = JSON.parse(localStorage.getItem('usuarioAutenticado'));
  if (!usuario || !usuario.chave) return;

  try {
    const res = await fetch(`https://api-odinline.odiloncorrea.com/produto/${usuario.chave}/usuario`);
    const produtos = await res.json();

    const select = document.getElementById('selectProduto');
    produtos.forEach(produto => {
      const option = document.createElement('option');
      option.value = produto.id;
      option.textContent = `${produto.descricao} - R$ ${produto.valor}`;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Erro ao carregar produtos:', err);
  }
}

// Chamar a função ao carregar a página
window.addEventListener('DOMContentLoaded', carregarProdutos);


function verificarAlerta(alerta, produto) {
  const valorAtual = parseFloat(produto.valor);

  if (valorAtual <= alerta.valorDesejado) {
    if (alerta.acao === 'notificar') {
      alert(`🔔 Alerta: ${produto.descricao} chegou a R$ ${valorAtual}`);
      document.getElementById('alertaAudio')?.play();
    } else if (alerta.acao === 'comprar') {
      const compras = JSON.parse(localStorage.getItem('compras')) || [];
      compras.push({ produtoId: alerta.produtoId, valor: valorAtual });
      localStorage.setItem('compras', JSON.stringify(compras));
      alert(`🛒 Compra registrada: ${produto.descricao} por R$ ${valorAtual}`);
    }

    // 💡 Recarrega e filtra alertas
    let alertas = JSON.parse(localStorage.getItem('alertas')) || [];
    alertas = alertas.filter(a => a.produtoId !== alerta.produtoId);
    localStorage.setItem('alertas', JSON.stringify(alertas));

    atualizarLista();
  }
}
setInterval(atualizarLista, 10000); // Verifica a cada 10 segundos
atualizarLista();


