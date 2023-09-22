window.addEventListener('scroll', function () {
    var cartContainer = document.querySelector('.cart-container');
    var cart = document.getElementById('cart');
    var cartHeight = cart?.offsetHeight;
    var windowHeight = window.innerHeight;
    var scrollPosition = window.pageYOffset;

    if (scrollPosition + windowHeight >= cartContainer.offsetTop + cartHeight) {
        cart?.classList.add('cart-fixed');
    } else {
        cart?.classList.remove('cart-fixed');
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

                var cupomInputValue = $('#cupomInput').val();

                $.ajax({
                    type: "GET",
                    url: `cupons/verificarCupom/${cupomInputValue}`,
                    success: function (data) {
                        if (data) {
                            if (data.status === "ativo" || data.status === "Ativo" || data.status === "ATIVO") {
                                objectCart.cupom = data;

                                $('.saida').html(`Cupom ${data.nome} válido!`);
                                qs('.desconto span:last-child').innerHTML = data.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                                var total = qs('.total span:last-child').innerHTML;
                                total = +Number(total.replace(/[^0-9\.]+/g, "")) / 100;

                                qs('.total span:last-child').innerHTML = (total - data.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                            } else {
                                // Cupom está desativado
                                $('.saida').html('Cupom indisponível!');
                                qs('.desconto span:last-child').innerHTML = '0'.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                                qs('.total span:last-child').innerHTML = qs('.subtotal span:last-child').innerHTML;
                            }
                        } else {
                            // Cupom não encontrado
                            $('.saida').html('Cupom não encontrado!');
                        }
                    },
                    error: function (xhr, status, error) {
                        // Erro ao verificar o cupom
                        $('.saida').html(`Erro ao verificar o cupom!`);
                        qs('.desconto span:last-child').innerHTML = '0'.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                        qs('.total span:last-child').innerHTML = qs('.subtotal span:last-child').innerHTML;

                    }


                });

            }

        }, DURACAO_DIGITACAO);

    });

});

