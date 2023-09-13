let totalComDesconto = 0;
var pedido;

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

        let idDiv = ce('div'); // Crie um elemento div
        idDiv.classList.add('item--id'); // Adicione classes, se necessário
        idDiv.innerHTML = `ID: ${element.Id}`; // Defina o conteúdo do elemento para exibir o ID
        itemInfoDiv.appendChild(idDiv); // Adicione o elemento à div de informações do item



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

        var formaPagamentoId = $("#pagamento-input").val();

        var itensDoPedido = [];

        $(".items-area .item").each(function () {
            var precoStr = $(this).find('.item--price').text();
            var quantidadeStr = $(this).find('.item--qtd').text();

            // Aqui você obtém o texto do elemento que contém o ID do produto
            var idText = $(this).find('.item--id').text();

            // Use uma expressão regular para extrair apenas o número
            var produtoIdMatch = idText.match(/\d+/);

            if (produtoIdMatch) {
                var produtoId = produtoIdMatch[0]; // Agora, produtoId contém apenas o número
            } else {
                // Lida com o caso em que o ID não foi encontrado
                console.error("ID do produto não encontrado.");
                return; // Pule esta iteração do loop
            }

            // Verifique se os valores de preco, quantidade e produtoId são válidos
            var preco = parseFloat(precoStr.replace('R$', '').replace(',', '.'));
            var quantidade = parseInt(quantidadeStr);

            if (!isNaN(preco) && !isNaN(quantidade) && produtoId) {
                var item = {
                    preco: preco,
                    quantidade: quantidade,
                    pedido_id: null, // Você precisará definir o ID do pedido posteriormente
                    produto_id: produtoId, // Agora, produtoId contém apenas o número
                    tamanho: $(this).find('.item--tamn').text(),
                };

                itensDoPedido.push(item);
            }
        });

        // Exibe os itens do pedido no console
        console.log("Itens do Pedido:", itensDoPedido);

        // Agora, você pode usar a lista 'itensDoPedido' para criar o pedido
        var pedido = {
            status: "preparando",
            total: totalComDesconto,
            cliente_id: cliente.id,
            cupom_id: objectCart.cupom ? objectCart.cupom.id : null,
            forma_pagamento_id: formaPagamentoId,
            funcionario_id: funcionarioId,
            servico_id: objectCart.servico,
            descricao: objectCart.observacao,
            data: new Date(),
            itens: itensDoPedido  
        };

        console.log("Pedido criado:", pedido);

        $.ajax({
            type: "POST",
            url: "/pedido/salvar", // Verifique se a URL está correta
            contentType: "application/json",
            data: JSON.stringify(pedido),
            success: function (data) {
                console.log("Pedido criado com sucesso:", data);
                // Defina 'dadosProntos' como true após enviar a solicitação
                dadosProntos = true;
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Erro ao criar o pedido:", textStatus, errorThrown);
            }
        });

       
    });

    // Outro código...
});
