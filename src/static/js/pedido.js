function ocultarImagem(imagem) {
    imagem.classList.add('oculta');
  }
  
  function mostrarImagem(imagem) {
    imagem.classList.remove('oculta');
  }
  
  var imagens = document.querySelectorAll('.imagem');
  
  imagens[1].addEventListener('click', function() {
    if (imagens[0].classList.contains('oculta')) {
      mostrarImagem(imagens[0]);
      ocultarImagem(imagens[1]);
    } else {
      ocultarImagem(imagens[0]);
      mostrarImagem(imagens[1]);
    }
  });
  
  imagens[0].addEventListener('click', function() {
    if (imagens[1].classList.contains('oculta')) {
      mostrarImagem(imagens[1]);
      ocultarImagem(imagens[0]);
    } else {
      ocultarImagem(imagens[1]);
      mostrarImagem(imagens[0]);
    }
  });
  