$(document).ready(function () {
    $('.ver-detalhes').on('click', function () {
        var pedidoId = $(this).data('id');
        $('.pedido-detalhes').hide();
        $('.pedido-detalhes[data-id="' + pedidoId + '"]').show();
        $('#detalhesModal').modal('show'); // Abrir a modal
    });
});
        