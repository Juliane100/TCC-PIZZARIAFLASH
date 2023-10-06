$(document).ready(function () {
    // Evento de clique no botão "Ver Detalhes"
    $('button[data-target="#pedidoModal"]').click(function () {
        // Limpa os campos da modal
        $('#nomeCliente').text('');
        $('#logradouroCliente').text('');
        $('#numresidCliente').text('');
        $('#nomeServico').text('');
        $('#formaPagamento').text('');
        $('#cupomUtilizado').text('');
        $('#descricao').text('');
        $('#data').text('');
        $('#status').text('');
        $('#total').text('');

        // Obtém o ID do pedido a partir do atributo data-id do botão
        var pedidoId = $(this).data('id');
        console.log("ID do Pedido:", pedidoId); // Verifica se o ID é capturado corretamente

        // Faz uma requisição AJAX para obter os detalhes do pedido
        $.ajax({
            url: '/pedido/listar/' + pedidoId, // Corrija a URL se necessário
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Preenche os campos da modal com os dados do pedido
                $('#nomeCliente').text(data.pedido.cliente.nome);
                $('#logradouroCliente').text(data.pedido.cliente.logradouro);
                $('#numresidCliente').text(data.pedido.cliente.numresid);
                $('#nomeServico').text(data.pedido.servico.nome);
                $('#formaPagamento').text(data.pedido.forma_pagamento.nome);
                $('#cupomUtilizado').text(data.pedido.cupom.preco);
                $('#descricao').text(data.pedido.descricao);
                $('#data').text(data.pedido.data);
                $('#status').text(data.pedido.status);
                $('#total').text(data.pedido.total);

                // Defina a variável itensHtml antes de usá-la
                var itensHtml = '';

                $.each(data.itensPedido, function (index, item) {
                    itensHtml += '<div class="mb-3">';
                    itensHtml += '<strong>Produto:</strong> ' + item.produto.nome + '<br>';
                    itensHtml += '<strong>Preço:</strong> ' + item.preco + '<br>';
                    itensHtml += '<strong>Quantidade:</strong> ' + item.quantidade + '<br>';
                    itensHtml += '<strong>Tamanho:</strong> ' + item.tamanho + '<br>';
                    itensHtml += '</div>';
                });
                $("#itensPedidoModal").html(itensHtml);
            },
            error: function () {
                alert('Erro ao carregar os detalhes dos itens do pedido.');
            }
        });
    });
});
