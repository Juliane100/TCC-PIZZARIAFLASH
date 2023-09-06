window.addEventListener('scroll', function () {
    var cartContainer = document.querySelector('.cart-container');
    var cart = document.getElementById('cart');
    var cartHeight = cart.offsetHeight;
    var windowHeight = window.innerHeight;
    var scrollPosition = window.pageYOffset;

    if (scrollPosition + windowHeight >= cartContainer.offsetTop + cartHeight) {
        cart.classList.add('cart-fixed');
    } else {
        cart.classList.remove('cart-fixed');
    }
});


$(document).ready(function () {

    var DURACAO_DIGITACAO = 400,
        digitando = false,
        tempoUltimaDigitacao;

    $('#cupomInput').on('input', function () {

        if (!digitando) {
            digitando = true;
            $('.saida').html('procurando...');
        }

        tempoUltimaDigitacao = (new Date()).getTime();

        setTimeout(function () {

            var digitacaoTempo = (new Date()).getTime();
            var diferencaTempo = digitacaoTempo - tempoUltimaDigitacao;

            if (diferencaTempo >= DURACAO_DIGITACAO && digitando) {
                digitando = false;
                
                
                $.ajax({
                    type: "GET",
                    url: `cupons/verificarCupom/${$('#cupomInput').val()}`,
                    success: function (data) {
                        $('.saida').html(`Cupom ${data.nome} Valido!`);
                        qs('.desconto span:last-child').innerHTML = data.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                        var total = qs('.total span:last-child').innerHTML;
                        total = +Number(total.replace(/[^0-9\.]+/g,""))/100;

                        qs('.total span:last-child').innerHTML = (total - data.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });;
                    },
                    error: function (xhr, status, error) {
                        $('.saida').html(`Cupom invalido!`);
                        qs('.desconto span:last-child').innerHTML = '0'.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                        
                        qs('.total span:last-child').innerHTML = qs('.subtotal span:last-child').innerHTML;
                    
                    }

                    
                });
                //$('.saida').html('Cupom invalido!');
                //objectCart.cupom = $('#cupomInput').val();
                //aqui você pode chamar a função ajax
            }

        }, DURACAO_DIGITACAO);

    });

});