const registerBtn = document.getElementById("register-link");
const backToLoginBtn = document.querySelectorAll(".back-to-login");
const forgotPasswordBtn = document.querySelector(".forgot-password");
const forgotPasswordForm = document.querySelector(".forgot-password-form");
const loginForm = document.querySelector("form");
const registerForm = document.querySelector(".register-form");
const form = document.getElementById("login-form");

// Esconde os formulários de registro e recuperação de senha
registerForm.style.display = "none";
forgotPasswordForm.style.display = "none";

// Adiciona o evento de clique para mostrar o formulário de registro
registerBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

// Adiciona o evento de clique para voltar ao formulário de login
backToLoginBtn.forEach(function (button) {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    forgotPasswordForm.style.display = "none";
  });
});

// Adiciona o evento de clique para mostrar o formulário de recuperação de senha
forgotPasswordBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loginForm.style.display = "none";
  forgotPasswordForm.style.display = "block";
});

// lista de usuários cadastrados
const users = [
  { username: 'Juliane', password: '123456', type: 'adm', name: 'Juliane' },
  { username: 'funcionario', password: '123456', type: 'funcionario', name: 'Conta funcionario teste' },
];

function setStorage(login){
  localStorage.setItem('login', JSON.stringify(login));
}

// Mostra o formulário de "esqueci a senha" quando o link é clicado
$('.forgot-password').click(function(e) {
  e.preventDefault();
  $('form').hide();
  $('.forgot-password-form').show();
});

// Volta para o formulário de login quando o link é clicado
$('.back-to-login').click(function(e) {
  e.preventDefault();
  $('form').show();
  $('.forgot-password-form').hide();
});

// Envia um email para o endereço fornecido no formulário de "esqueci a senha"
$('.forgot-password-form').submit(function(e) {
  e.preventDefault();
  const email = $('#forgot-password-email').val();
  // Aqui você pode adicionar a lógica para enviar o email com o link para redefinir a senha
  // Depois de enviar o email, você pode exibir uma mensagem para o usuário informando que o link foi enviado com sucesso
});

// Trata o envio do formulário de login
$('form').submit(function(event) {
  event.preventDefault();

  const username = $('#username').val();
  const password = $('#password').val();

  // Busca pelo usuário na lista de usuários cadastrados
  let user;
  users.forEach((u) => {
    if (u.username === username && u.password === password) {
      user = u;
    }
  });
  
  if (user) {
    if (user.type === 'adm') {
      alert('Login realizado com sucesso como ADM!');
      // window.location.href = "adm.html";
    } else {
      alert('Login realizado com sucesso como funcionário!');
      // window.location.href = "home.html";
    }

    window.location.href = "home.html";
    setStorage(user);
  } else {
    alert('Nome de usuário ou senha incorretos. Tente novamente.');
  }
});
