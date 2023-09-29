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

                // Limpa a tabela de itens do pedido
                $('#itensPedidoModal tbody').empty();

                // Preenche a tabela de itens do pedido
                $.each(data.itensPedido, function (index, item) {
                    var row = '<tr>';
                    row += '<td>' + item.produto.nome + '</td>';
                    row += '<td>' + item.preco + '</td>';
                    row += '<td>' + item.quantidade + '</td>';
                    row += '<td>' + item.tamanho + '</td>';
                    row += '</tr>';
                    $('#itensPedidoModal tbody').append(row);
                });
            },
            error: function () {
                alert('Erro ao carregar os detalhes do pedido.');
            }
        });
    });
});
