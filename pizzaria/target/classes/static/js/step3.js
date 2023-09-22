let totalComDesconto = 0;

/// Lista dos produtos
function listarDetalhes(cart, objectService, objectCart, cliente,) {
    const itemsArea = qs('.items-area'); // Elemento que irá conter todos os produtos

    itemsArea.childNodes.forEach(e => e.remove());

    cart.forEach(element => {
        let item = ce('div');
        item.classList.add('object', 'item'); // Adicione as classes .object e .item ao elemento criado

        // Crie elementos para cada informação do produto
        let imgDiv = ce('div');
        imgDiv.classList.add('item--img');
        let img = ce('img');
        img.src = `data:image/png;base64,${element.Imagem}`;
        imgDiv.appendChild(img);
        item.appendChild(imgDiv);

        let itemInfoDiv = ce('div');
        itemInfoDiv.classList.add('item--info');

        let idDiv = ce('div');
        idDiv.classList.add('item--id');
        idDiv.innerHTML = `ID: ${element.Id}`;
        itemInfoDiv.appendChild(idDiv);
        idDiv.style.display = 'none';


        let nameDiv = ce('div');
        nameDiv.classList.add('item--name');
        nameDiv.innerHTML = element.Nome;
        itemInfoDiv.appendChild(nameDiv);

        let tamnDiv = ce('div');
        tamnDiv.classList.add('item--tamn');
        const tamanhoFormatado = element.Tamanho === 0.5 ? "Metade" : "Inteira";
        tamnDiv.innerHTML = tamanhoFormatado;
        itemInfoDiv.appendChild(tamnDiv);

        let qtdDiv = ce('div');
        qtdDiv.classList.add('item--qtd');
        qtdDiv.innerHTML = element.Quantidade;
        itemInfoDiv.appendChild(qtdDiv);

        let priceDiv = ce('div');
        priceDiv.classList.add('item--price');
        priceDiv.innerHTML = rs(element.Preco);
        itemInfoDiv.appendChild(priceDiv);

        item.appendChild(itemInfoDiv);

        let trashDiv = ce('div');
        trashDiv.classList.add('item--trash');
        item.appendChild(trashDiv);

        itemsArea.appendChild(item);
    });

    let serviceItem = objectService.find(x => x.id == objectCart.servico);

    qs('.cupom').innerHTML = `${rs(objectCart.cupom.preco)}`;
    qs('#descricao-final').innerHTML = `${objectCart.observacao}`;
    qs('.preco-servico').innerHTML = `${rs(serviceItem.preco)}`;

    const valorTotal = cart.reduce(calculate, 0);
    qs('.subTotal').innerHTML = rs(valorTotal);

    totalComDesconto = valorTotal;

    if (serviceItem) {
        totalComDesconto += serviceItem.preco;
    }

    if (objectCart.cupom && typeof objectCart.cupom.preco !== 'undefined') {
        totalComDesconto -= objectCart.cupom.preco;
    }

    qs('.total').innerHTML = 'R$ ' + totalComDesconto.toFixed(2);

    qs('#nome-cliente').innerHTML = cliente.nome;
    qs('#logradouro-cliente').innerHTML = cliente.logradouro;
    qs('#numresid-cliente').innerHTML = cliente.numresid;
    qs('#cep-cliente').innerHTML = cliente.cep;
    qs('#complemento-cliente').innerHTML = cliente.complemento;
    qs('#telefone-cliente').innerHTML = cliente.telefone;

    function calculate(total, item) {
        return total + (item.Preco * item.Quantidade);
    }
}


$(document).ready(function () {
    var funcionarioId = $("#funcionarioId").text();

    $("#finalizarPedidoBtn").click(function () {
        console.log("Botão 'Finalizar Pedido' clicado.");

        var funcionarioId = parseInt($("#funcionarioId").text(), 10);
        var formaPagamentoId = parseInt($("#pagamento-input").val(), 10);
        var servicoId = parseInt(objectCart.servico, 10);


        var itensDoPedido = [];

        // Itera sobre os itens do pedido na área de itens
        $(".items-area .item").each(function () {
            var precoStr = $(this).find('.item--price').text();
            var quantidadeStr = $(this).find('.item--qtd').text();

            // Obtém o texto do elemento que contém o ID do produto
            var idText = $(this).find('.item--id').text();

            // Use uma expressão regular para extrair apenas o número
            var produtoIdMatch = idText.match(/\d+/);

            if (produtoIdMatch) {
                var produtoId = produtoIdMatch[0];
            } else {
                // Lida com o caso em que o ID não foi encontrado
                console.error("ID do produto não encontrado.");
                return;
            }


            var preco = parseFloat(precoStr.replace('R$', '').replace(',', '.'));
            var quantidade = parseInt(quantidadeStr);

            if (!isNaN(preco) && !isNaN(quantidade) && produtoId) {
                var item = {
                    preco: preco,
                    quantidade: quantidade,
                    pedido_id: null,
                    produto_id: produtoId,
                    tamanho: $(this).find('.item--tamn').text(),
                };

                itensDoPedido.push(item);
            }
        });

        console.log("Itens do Pedido:", itensDoPedido);

        var pedido = {
            status: "Preparando",
            total: totalComDesconto,
            cliente_id: cliente.id,
            cupom_id: objectCart.cupom ? objectCart.cupom.id : null,
            forma_pagamento_id: formaPagamentoId,
            funcionario_id: funcionarioId,
            servico_id: servicoId,
            descricao: objectCart.observacao,
            data: new Date(),
            //itens: itensDoPedido,
        };

        console.log("Pedido a ser enviado:", pedido);

        $.ajax({
            type: "POST",
            url: "/pedido/salvar",
            contentType: "application/json",
            data: JSON.stringify(pedido),
            success: function (data) {
                console.log("Pedido criado com sucesso:", data);

                var pedidoId = data.id;
                console.log("ID do pedido obtido:", pedidoId);

                for (var i = 0; i < itensDoPedido.length; i++) {
                    itensDoPedido[i].pedido_id = pedidoId;
                }

                console.log("Itens do Pedido a serem enviados:", itensDoPedido);

                // Após criar o pedido com sucesso, crie os itens do pedido
                criarItensDoPedido(itensDoPedido);
            },

            error: function (xhr, textStatus, errorThrown) {
                console.error("Erro ao criar o pedido:", textStatus, errorThrown);
                alert("Erro ao criar o pedido. Por favor, tente novamente.");
            },
        });

        function criarItensDoPedido(itensDoPedido) {

            console.log(JSON.stringify(itensDoPedido));

            $.ajax({
                type: "POST",
                url: "/pedido/salvar/itens",
                contentType: "application/json",
                data: JSON.stringify(itensDoPedido),
                success: function (data) {
                    console.log("Itens do Pedido a serem enviados:", itensDoPedido);
                    window.location.href = "/pedido/listar";

                },
                error: function (xhr, textStatus, errorThrown) {
                    console.error("Erro ao criar o pedido:", textStatus, errorThrown);
                    alert("Erro ao criar o pedido. Por favor, tente novamente.");
                },
            });
        }

    });
});

