const form = document.querySelector('form');
const forgotPasswordLink = document.querySelector('.forgot-password');
const forgotPasswordForm = document.querySelector('.forgot-password-form');
const backToLoginLink = document.querySelector('.back-to-login');

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

// lista de usuários cadastrados
const users = [
  { username: 'admin', password: '123456', type: 'adm', name: 'Conta adm teste' },
  { username: 'funcionario', password: '123456', type: 'funcionario', name: 'Conta funcionario teste' },
];

function setStorage(login){
  localStorage.setItem('login', JSON.stringify(login));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // busca pelo usuário na lista de usuários cadastrados
  const user = users.find((u) => u.username === username && u.password === password);

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
