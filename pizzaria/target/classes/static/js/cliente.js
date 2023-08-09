// Exibir ou ocultar o formulário de cadastro ao clicar no botão
const btnCadastrar = document.getElementById('btn-cadastrar');
const formCadastro = document.getElementById('form-cadastro');

btnCadastrar.addEventListener('click', () => {
    formCadastro.style.display = formCadastro.style.display === 'none' ? 'block' : 'none';
});

