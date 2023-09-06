//Variaveis globais
let modalCount = 1;
let modalKey = 0;
let cart = [];
let cliente;
let objectCupom = [];
let objectService = [];
let objectCart = {
    cupom: '',
    observacao: '',
    servico: 0,
    pagamento:'',
};

let pizzaJson;

//Atalhos para facilitar
const ce = (e) => document.createElement(e);
const qs = (e) => document.querySelector(e);
const qsa = (e) => document.querySelectorAll(e);
const cl = (e) => console.log(e);
const rs = (e) => e?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });



$.ajax({
    type: "GET",
    url: "forma_pagamento/listarPagamento",
    success: function (data) {
        pagamento = data;
        data.forEach(function (item) {
            $('#pagamento-input').append($('<option>', {
                value: item.id,
                text: `${item.nome}`,
                datainfo: item
            }));
        });
    },
    error: function (xhr, status, error) {
        console.error(error);
    }
});


$.ajax({
    type: "GET",
    url: "/servicos/listarServicos",
    success: function (data) {
        objectService = data;
        data.forEach(function (item) {
            $('#servico-input').append($('<option>', {
                value: item.id,
                text: `${item.nome} - ${rs(item.preco)}`,
                datainfo: item
            }));
        });
    },
    error: function (xhr, status, error) {
        console.error(error);
    }
});

$.ajax({
    type: "GET",
    url: "/produtos/listarProdutos",
    success: function (data) {
        handleJsonResponse(data);
    },
    error: function (xhr, status, error) {
        console.error(error);
    }
});



//Listagem das pizzas
function handleJsonResponse(responseText) {
    pizzaJson = responseText;

    pizzaJson.map(async (pizza, index) => {

        //Copiar ou clonar a classe .pizza-item
        //Node significa elementos HTML ou arvore Dom
        //O true faz com que clone tudo que tem dentro de determinado lugar
        let pizzaItem = qs('.models .pizza-item').cloneNode(true);

        //Adicionar um atributo em algum determinado elemento no html
        //Adicionar o atributo "data-key" linkando com a index no elemento ".pizza-item"
        pizzaItem.setAttribute('data-key', index);

        //Preencher as informaçoes de cada .pizza-item
        // pizzaItem.querySelector('.pizza-item--img img').src = pizza.img; //Consegue-se usar a class e a tag num mesmo querySelector
        pizzaItem.querySelector('.pizza-item--img img').src = `data:image/png;base64,${pizza.imagem}`;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = rs(pizza.preco);
        pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.nome;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.descricao;

        //Abrir o Modal
        pizzaItem.querySelector('a').addEventListener('click', (e) => {

            //Cancelar o evento original (recarregar a pagina)
            e.preventDefault();

            //Identificar a pizza clicada
            let key = e.target.closest(".pizza-item").getAttribute("data-key");
            const pizzaKey = pizzaJson[key];
            modalCount = 1;
            modalKey = key;

            //Passar as informaçoes para o modal
            qs(".pizzaBig img").src = `data:image/png;base64,${pizzaKey.imagem}`;
            qs(".pizzaInfo h1").innerHTML = pizzaKey.nome;
            qs(".pizzaInfo--desc").innerHTML = pizzaKey.descricao;
            qs(".pizzaInfo--actualPrice").innerHTML = rs(pizzaKey.preco);
            qs(".pizzaInfo--qt").innerHTML = modalCount;
            qsa(".pizzaInfo--size").forEach((size) => {
                size.addEventListener('click', () => {
                    // Remover a classe 'selected' de todos os tamanhos
                    qsa(".pizzaInfo--size").forEach((s) => {
                        s.classList.remove("selected");
                    });

                    // Adicionar a classe 'selected' apenas ao tamanho clicado
                    size.classList.add("selected");

                    // Definir a opção selecionada no atributo 'data-key' da pizza
                    const selectedOption = size.getAttribute('data-key');
                    qs(".pizzaInfo--size.selected").setAttribute('data-selected', selectedOption);
                });
            });




            //Animaçao para o surgimento do modal
            qs('.pizzaWindowArea').style.opacity = 0;
            qs('.pizzaWindowArea').style.display = 'flex';
            setTimeout(() => {

                qs('.pizzaWindowArea').style.opacity = 1;

            }, 200)
        })

        //Colar a classe .pizza-item em .pizza-area
        //O append cola tudo de uma vez
        //innerHTML cola um por um
        qs('.pizza-area').append(pizzaItem);

    });
}
//---Eventos do Modal---//

/* FECHAR MODAL */
const closeModal = () => {

    qs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        qs('.pizzaWindowArea').style.display = "none";
    }, 500);

}
qsa(".pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton").forEach((item) => {

    item.addEventListener('click', closeModal);
});

/* MODIFICAR O QUANTIDADE DE PIZZAS */
qs(".pizzaInfo--qtmenos").addEventListener('click', e => {
    e.preventDefault();
    if (modalCount > 1) {
        modalCount--;
        qs(".pizzaInfo--qt").innerHTML = modalCount;
    }
});

qs(".pizzaInfo--qtmais").addEventListener('click', e => {
    e.preventDefault();
    modalCount++;
    qs(".pizzaInfo--qt").innerHTML = modalCount;
});


/* MODIFICAR O TAMNHO DAS PIZZAS */
qsa(".pizzaInfo--size").forEach((size) => {
    size.addEventListener('click', () => {
        const selectedSize = qs(".pizzaInfo--size.selected");

        if (selectedSize) {
            selectedSize.classList.remove("selected");
        }

        size.classList.add("selected");

        // Definir a opção selecionada no atributo 'data-key' da pizza
        const selectedOption = size.getAttribute('data-key');
        size.setAttribute('data-selected', selectedOption);
    });
});


// Adicionar evento de clique para selecionar o tamanho
qsa(".pizzaInfo--size").forEach((size) => {
    size.addEventListener('click', () => {
        qsa(".pizzaInfo--size").forEach((s) => {
            s.classList.remove("selected");
        });
        size.classList.add("selected");
        const selectedOption = size.getAttribute('data-key');
        qs(".pizzaInfo--size.selected").setAttribute('data-selected', selectedOption);
    });
});

qs('.pizzaInfo--addButton').addEventListener('click', () => {
    const selectedOption = qs(".pizzaInfo--size.selected").getAttribute('data-key');

    if (!selectedOption) {
        alert("Selecione o tamanho da pizza.");
        return;
    }

    let size = parseFloat(selectedOption);
    let price = pizzaJson[modalKey].preco;

    if (size === 0.5) {
        price /= 2;
    }

    let sum = modalCount * price;

    if (Number.isInteger(modalCount)) {
        let Ident = pizzaJson[modalKey].id + "@" + size;
        let key = cart.findIndex((item) => item.Ident === Ident);

        if (key > -1) {
            const carKey = cart[key];
            carKey.Quantidade += modalCount;
        } else {
            cart.push({
                Id: pizzaJson[modalKey].id,
                Ident,
                Nome: pizzaJson[modalKey].nome,
                Tamanho: size,
                Quantidade: modalCount,
                Preco: price,
                Imagem: pizzaJson[modalKey].imagem
            });
        }

        updateCart();
        closeModal();
    } else {
        alert("Quantidade deve ser um número inteiro.");
    }
});

// ATUALIZAR AS INFORMAÇOES DO CARRINHO
function updateCart() {

    qs('.menu-openner span').innerHTML = cart.length;

    const carrinho = qs('.cart');
    carrinho.innerHTML = "";

    let subtotal = 0;
    let desconto = 0;
    let total = 0;
    let servico = 0;

    for (let i in cart) {
        let cartItem = qs('.models .cart--item').cloneNode(true);
        let pizzaSizeName = cart[i].Tamanho === 0.5 ? "Metade" : "Inteira";
        let pizzaName = `${cart[i].Nome} (${pizzaSizeName})`;
        carrinho.appendChild(cartItem);


        let pizzaItem = pizzaJson.find((item) => item.id == cart[i].Id);
        let pizzaPrice = cart[i].Tamanho === 0.5 ? pizzaItem.preco / 2 : pizzaItem.preco;
        let valorTotal = pizzaPrice * cart[i].Quantidade;

        cart[i].ValorTotal = valorTotal; // Atualiza o valor total no objeto cart

        subtotal += valorTotal;

        // Adicionar as informações no carrinho
        cartItem.querySelector('.cart--item img').src = `data:image/png;base64,${pizzaItem.imagem}`; // Use 'imagem' em vez de 'img'
        cartItem.querySelector('.cart--item .cart--item-nome').innerHTML = pizzaName;
        cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].Quantidade;

        cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
            cart[i].Quantidade > 1 ? cart[i].Quantidade-- : cart.splice(i, 1);
            updateCart();
        });
        cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
            cart[i].Quantidade++;
            updateCart();
        });


        carrinho.appendChild(cartItem);
    }

    desconto = qs('.desconto span:last-child').innerHTML;
    // servico = qs('.servico span:last-child').innerHTML;
    servico = qs('#servico-input').value;


    let serviceItem = objectService.find(x => x.id == servico);
    total = (subtotal + serviceItem.preco) - +Number(desconto.replace(/[^0-9\.]+/g, "")) / 100;

    qs('.subtotal span:last-child').innerHTML = rs(subtotal);
    qs('.total span:last-child').innerHTML = rs(total);

}



