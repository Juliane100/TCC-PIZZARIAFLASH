

/// Lista dos produtos
function listarDetalhes(cart, objectService, objectCart, cliente) {
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
    qs('.total').innerHTML = rs((valorTotal + serviceItem.preco) - objectCart.cupom.preco);

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


