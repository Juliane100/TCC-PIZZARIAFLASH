document.getElementById("btn btn-outline-secondary").addEventListener("click", function() {
  var nomeCliente = document.getElementById("buscar-clientes").value;
  var dialogo = document.createElement("dialog");
  dialogo.setAttribute("id", "dialogo-clientes");
  dialogo.style.width = "90%";
  dialogo.style.height = "80%";
  dialogo.innerHTML = "<iframe src='cliente.html?selecionar=true&nome=" + nomeCliente + "'></iframe>";
  document.body.appendChild(dialogo);
  dialogo.showModal();
  var botaoFechar = document.createElement("button");
  botaoFechar.innerHTML = "Fechar";
  botaoFechar.addEventListener("click", function() {
    dialogo.close();
  });
  dialogo.appendChild(botaoFechar);
  dialogo.addEventListener("close", function() {
    document.body.removeChild(dialogo);
  });
});

function selecionarCliente(nomeCliente) {
  // Seu código para selecionar um cliente aqui
}

const btnValidar = document.getElementById('btn-validar');
const inputCupom = document.getElementById('cupom');
const divStatusCupom = document.getElementById('cupom-status');

btnValidar.addEventListener('click', function() {
  const codigoCupom = inputCupom.value;

  // Aqui você pode adicionar a lógica para verificar o código do cupom no sistema
  // e retornar um resultado (por exemplo, um objeto com informações sobre o cupom)

  // Exemplo:
  if (codigoCupom === 'cupom243') {
    const resultado = {
      sucesso: true,
      mensagem: 'Cupom válido'
    };
    exibirResultadoCupom(resultado);
  } else {
    const resultado = {
      sucesso: false,
      mensagem: 'Cupom inválido'
    };
    exibirResultadoCupom(resultado);
  }
});

function exibirResultadoCupom(resultado) {
  divStatusCupom.innerHTML = resultado.mensagem;
  divStatusCupom.classList.remove('sucesso', 'erro');
  if (resultado.sucesso) {
    divStatusCupom.classList.add('sucesso');
  } else {
    divStatusCupom.classList.add('erro');
  }
}