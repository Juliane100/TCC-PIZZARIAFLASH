

/// Lista dos produtos
function listarDetalhes(cart, objectCart, cliente) {
    const itemsArea = document.querySelector('.items-area'); // Elemento que irá conter todos os produtos

    itemsArea.childNodes.forEach(e => e.remove());

    cart.forEach(element => {
        let item = document.createElement('div');
        item.classList.add('object', 'item'); // Adicione as classes .object e .item ao elemento criado

        // Crie elementos para cada informação do produto
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('item--img');
        let img = document.createElement('img');
        img.src = `data:image/png;base64,${element.Imagem}`;
        imgDiv.appendChild(img);
        item.appendChild(imgDiv);

        let itemInfoDiv = document.createElement('div');
        itemInfoDiv.classList.add('item--info');

        let nameDiv = document.createElement('div');
        nameDiv.classList.add('item--name');
        nameDiv.innerHTML = element.Nome;
        itemInfoDiv.appendChild(nameDiv);

        let tamnDiv = document.createElement('div');
        tamnDiv.classList.add('item--tamn');
        const tamanhoFormatado = element.Tamanho === 0.5 ? "Metade" : "Inteira";
        tamnDiv.innerHTML = tamanhoFormatado;
        itemInfoDiv.appendChild(tamnDiv);

        let qtdDiv = document.createElement('div');
        qtdDiv.classList.add('item--qtd');
        qtdDiv.innerHTML = element.Quantidade;
        itemInfoDiv.appendChild(qtdDiv);

        let priceDiv = document.createElement('div');
        priceDiv.classList.add('item--price');
        priceDiv.innerHTML = element.Preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        itemInfoDiv.appendChild(priceDiv);

        item.appendChild(itemInfoDiv);

        let trashDiv = document.createElement('div');
        trashDiv.classList.add('item--trash');
        // Você pode adicionar o botão de remoção aqui
        item.appendChild(trashDiv);

        itemsArea.appendChild(item);


    });

    const valorTotal = cart.reduce(calculate, 0);
    document.querySelector('.cupom').innerHTML = `${objectCart.cupom}`;
    document.querySelector('.preco-servico').innerHTML = `${objectCart.servico}`;
    document.querySelector('.preco-servico').innerHTML = `${objectCart.servico}`;
    document.querySelector('.subTotal').innerHTML = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.querySelector('.subTotal').innerHTML = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.querySelector('.total').innerHTML = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    function calculate(total, item) {
        return total + (item.Preco * item.Quantidade);
    }
}


