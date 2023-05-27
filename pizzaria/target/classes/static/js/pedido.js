// seleciona os elementos do DOM
const steps = document.querySelectorAll('.step');
const progressBar = document.querySelector('.progress-bar');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

// define a etapa atual como 0
let currentStep = 0;

// adiciona event listeners aos botões
prevButton.addEventListener('click', prevStep);
nextButton.addEventListener('click', nextStep);

// atualiza os botões de navegação
updateButtons();

updateSteps();

function prevStep() {
  // atualiza a etapa atual
  currentStep--;

  // atualiza a visualização das etapas
  updateSteps();

  // atualiza os botões de navegação
  updateButtons();
}

function nextStep() {
  // atualiza a etapa atual
  currentStep++;

  // atualiza a visualização das etapas
  updateSteps();

  // atualiza os botões de navegação
  updateButtons();
}

function updateSteps() {
  // atualiza a classe ativa das etapas
  steps.forEach((step, index) => {
    const stepClass = `step-${index + 1}`;
    if (index === currentStep) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  // atualiza a barra de progresso
  const progress = ((currentStep == 0 ? 0.05 : currentStep) / (steps.length)) * 100;
  progressBar.style.width = progress + '%';
}

function updateButtons() {
  // desativa o botão "Anterior" na primeira etapa
  if (currentStep === 0) {
    prevButton.classList.add('disabled');
  } else {
    prevButton.classList.remove('disabled');
  }

  // atualiza o texto do botão "Próximo" na última etapa
  if (currentStep === steps.length - 1) {
    nextButton.innerHTML = 'Finalizar';
  } else {
    nextButton.innerHTML = 'Próximo';
  }

  // desativa o botão "Próximo" na última etapa
  if (currentStep === steps.length - 1) {
    nextButton.classList.add('disabled');
  } else {
    nextButton.classList.remove('disabled');
  }
}

// Seleciona o formulário do passo 1
const step1Form = document.querySelector('#step1-form');

// Adiciona um listener para o submit do formulário
step1Form.addEventListener('submit', function (event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Seleciona os valores dos inputs do formulário
  const clientName = document.querySelector('#client-name').value;
  const deliveryTime = document.querySelector('#delivery-time').value;
  const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;

  // Exibe os valores selecionados no console
  console.log('Nome do Cliente:', clientName);
  console.log('Data e Hora:', deliveryTime);
  console.log('Retirada ou Entrega:', deliveryOption);

  // Ativa o próximo passo
  activateStep(2);
});

//Agora o buscar dados clientes

const searchButton = document.querySelector('#search-button');
const submitButton = document.querySelector('#submit-button');
const clientNameInput = document.querySelector('#client-name');
const clientPhoneInput = document.querySelector('#client-phone');

// searchButton.addEventListener('click', buscarCliente);

function buscarCliente(event) {
  event.preventDefault();

  const telefone = clientPhoneInput.value;

  // faça uma requisição para o servidor para buscar o cliente pelo telefone
  fetch(`url_do_servidor/buscarCliente?telefone=${telefone}`)
    .then(response => response.json())
    .then(cliente => {
      if (cliente) {
        // se o cliente for encontrado, preencha o nome e continue com o pedido
        clientNameInput.value = cliente.nome;
        continuarPedido();
      } else {
        // se o cliente não for encontrado, exiba um alerta e peça o nome para cadastrar um novo cliente
        const nome = prompt('Cliente não encontrado. Por favor, insira o nome do cliente:');
        if (nome) {
          cadastrarNovoCliente(nome, telefone);
        }
      }
    });
}

function cadastrarNovoCliente(nome, telefone) {
  // faça uma requisição POST para o servidor para cadastrar o novo cliente
  fetch('url_do_servidor/cadastrarCliente', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, telefone })
  })
    .then(response => response.json())
    .then(data => {
      // se o cadastro for bem-sucedido, preencha o nome e continue com o pedido
      clientNameInput.value = nome;
      continuarPedido();
    })
    .catch(error => {
      // se o cadastro falhar, exiba um alerta com o erro
      alert(`Ocorreu um erro ao cadastrar o cliente: ${error.message}`);
    });
}

function continuarPedido() {
  // implemente aqui a lógica para continuar com o pedido
  console.log('Pedido continuado!');
}

