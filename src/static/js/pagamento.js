let servicoForm = document.getElementById("servico-form");
let pagamentoForm = document.getElementById("pagamento-form");
let tabela = document.getElementById("tabela");

let servicos = [];
let subtotal = 0;
let total = 0;

servicoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let nome = document.getElementById("servico-nome").value;
  let descricao = document.getElementById("servico-descricao").value;
  let valor = parseFloat(document.getElementById("servico-valor").value);

  if (nome && descricao && valor) {
    let servico = {
      nome: nome,
      descricao: descricao,
      valor: valor.toFixed(2),
    };
    servicos.push(servico);

    addServicoToTable(servico);
    updateSubtotal();
    servicoForm.reset();
  } else {
    alert("Por favor, preencha todos os campos do formulário de serviço.");
  }
});

pagamentoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let tipoPagamento = document.getElementById("tipo-pagamento").value;
  let descricao = document.getElementById("pagamento-descricao").value;
  let cupom = document.getElementById("pagamento-cupom").value;
  let valor = parseFloat(document.getElementById("pagamento-valor").value);

  if (tipoPagamento && descricao && valor) {
    let pagamento = {
      tipoPagamento: tipoPagamento,
      descricao: descricao,
      cupom: cupom,
      valor: valor.toFixed(2),
    };

    addPagamentoToTable(pagamento);
    pagamentoForm.reset();
  } else {
    alert(
      "Por favor, preencha todos os campos do formulário de pagamento, exceto o campo 'Cupom'."
    );
  }
});

function addServicoToTable(servico) {
  let row = tabela.insertRow(-1);
  let nomeCell = row.insertCell(0);
  let descricaoCell = row.insertCell(1);
  let valorCell = row.insertCell(2);

  nomeCell.innerHTML = servico.nome;
  descricaoCell.innerHTML = servico.descricao;
  valorCell.innerHTML = servico.valor;

  subtotal += parseFloat(servico.valor);
}

function addPagamentoToTable(pagamento) {
  let row = tabela.insertRow(-1);
  let tipoPagamentoCell = row.insertCell(0);
  let descricaoCell = row.insertCell(1);
  let cupomCell = row.insertCell(2);
  let valorCell = row.insertCell(3);

  tipoPagamentoCell.innerHTML = pagamento.tipoPagamento;
  descricaoCell.innerHTML = pagamento.descricao;
  cupomCell.innerHTML = pagamento.cupom || "";
  valorCell.innerHTML = pagamento.valor;

  total = subtotal - parseFloat(pagamento.valor);
  updateTotal();
}

function updateSubtotal() {
  document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);
}

function updateTotal() {
  document.getElementById("total").innerHTML = total.toFixed(2);
}
