
const btnBuscarCliente = document.getElementById('btn-buscar-cliente');

$(document).ready(function () {
    var currentStep = 1;
    var totalSteps = 3;

    $('.btn-next').click(function () {
        if (currentStep < totalSteps) {
            $('#step' + currentStep).hide();
            currentStep++;
            $('#step' + currentStep).show();
            updateProgressBar();
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
                $("#resultadoBusca").html(data);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
});