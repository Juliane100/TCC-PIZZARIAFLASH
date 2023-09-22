
const btnBuscarCliente = document.getElementById('btn-buscar-cliente');


$(document).ready(function () {
    var currentStep = 1;
    var totalSteps = 3;

    $('.btn-next').click(function () {

        let tamanhoTotalPizzas = cart.reduce((a, b) => a + b.Tamanho, 0);

        if (!Number.isInteger(tamanhoTotalPizzas)) {
            alert('Pedido incompleto');
            return;
        }

        if (cart?.length == 0) {
            alert('Faça o pedido');
            return;
        }

        if (currentStep == 2 && (cliente == null || cliente == undefined)) {
            alert('Selecione o cliente');
            return;
        }

        if (currentStep < totalSteps) {
            $('#step' + currentStep).hide();
            currentStep++;
            $('#step' + currentStep).show();
            updateProgressBar();
        }

        if (currentStep == 3) {

            objectCart.observacao = $('#observacao').val();
            objectCart.servico = qs('#servico-input').value;

            listarDetalhes(cart, objectService, objectCart, cliente);
        }
    });

    $('.btn-previous').click(function () {
        if (currentStep > 1) {
            $('#step' + currentStep).hide();
            currentStep--;
            $('#step' + currentStep).show();
            updateProgressBar();
        }
    });

    function updateProgressBar() {
        var progress = Math.ceil((currentStep / totalSteps) * 100);
        $('.progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);

        if (currentStep == 3)
            $('#cart-item-total').hide();
        else
            $('#cart-item-total').show();
    }

    updateProgressBar();

});

btnBuscarCliente.addEventListener('click', () => {
    var telefone = $("#campo-cliente").val();

    if (telefone)
        $.ajax({
            type: "GET",
            url: "/clientes/buscar?telefone=" + telefone,
            success: function (data) {
                $("#resultadoBusca").html(data.replace('Editar Cliente', ''));
                document.querySelector('.button-editar-cliente').disabled = true;
            },
            error: function (xhr, status, error) {
                console.error(error);
                alert('Cliente não cadastrado');
            }
        });
});

