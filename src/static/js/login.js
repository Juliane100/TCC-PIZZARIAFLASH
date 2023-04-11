const form = document.querySelector('form');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const forgotPasswordForm = document.getElementById('forgot-password-form');
const backToLoginLink = document.getElementById('back-to-login-link');

// mostra o formulário de "esqueci a senha" quando o link é clicado
forgotPasswordLink.addEventListener('click', e => {
  e.preventDefault();
  form.style.display = 'none';
  forgotPasswordForm.style.display = 'block';
});

// volta para o formulário de login quando o link é clicado
backToLoginLink.addEventListener('click', e => {
  e.preventDefault();
  form.style.display = 'block';
  forgotPasswordForm.style.display = 'none';
});

// envia um email para o endereço fornecido no formulário de "esqueci a senha"
forgotPasswordForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('forgot-password-email').value;
  // aqui você pode adicionar a lógica para enviar o email com o link para redefinir a senha
  // depois de enviar o email, você pode exibir uma mensagem para o usuário informando que o link foi enviado com sucesso
});




form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === 'pizzaria@exemplo.com' && password === '123456') {
    alert('Login realizado com sucesso!');
    // aqui você pode redirecionar o usuário para a página principal da pizzaria ou fazer outras ações que desejar

    window.location.href = "adm.html";

  } else {
    alert('Email ou senha incorretos. Tente novamente.');
  }
});
