cl = console.log;

const produtoForm = document.getElementById('produtoForm');
const prodInfo = document.getElementById('prodInfo');
const nome = document.getElementById('nome');
const descricao = document.getElementById('descricao');
const valor = document.getElementById('valor');
const Categoria = document.getElementById('Categoria');
const ProdStatus = document.getElementById('ProdStatus');
const updateBtn = document.getElementById('updateBtn');
const submitBtn = document.getElementById('submitBtn');

let prodArray = [];

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const getLocalData = () => {
  return JSON.parse(localStorage.getItem('prodArray'));
};

const OnEditHandler = (ele) => {
  let getEditId = ele.getAttribute('data-id');
  localStorage.setItem('setEditId', getEditId);
  let arr = getLocalData();
  let getObj = arr.find((ele) => ele.id === getEditId);

 
  nome.value = getObj.nome;
  descricao.value = getObj.descricao;
  valor.value = getObj.valor;
  Categoria.value = getObj.Categoria;
  ProdStatus.value = getObj.ProdStatus;

  submitBtn.classList.add('d-none');
  updateBtn.classList.remove('d-none');
};

const OnDeleteHandler = (ele) => {
  cl('Delete is working', ele);
  let getDeleteId = ele.dataset.id;
  cl(getDeleteId);
  let getData = getLocalData();
  prodArray = getData.filter((ele) => ele.id !== getDeleteId);
  alert('Você deletou esse item!');
  templating(prodArray);
  localStorage.setItem('prodArray', JSON.stringify(prodArray));
};

const templating = (arr) => {
  let result = '';
  arr.forEach((element, i) => {
    result += `
        <tr>
        <td>${element.nome}</td>
        <td>${element.descricao}</td>
        <td>${element.valor}</td>
        <td>${element.ProdStatus}</td>
        <td class='text-center'><button class="fa-solid fa-pen-to-square" data-id="${element.id}" onclick='OnEditHandler(this)'></button>
        <button class="fa-solid fa-trash-can" data-id="${element.id}" onclick='OnDeleteHandler(this)'></button></td>
        </tr>
        `;
  });
  prodInfo.innerHTML = result;
};

function onProdInfoSubmit(event) {
  event.preventDefault();
  cl(event);

  let obj = {
    
    nome: nome.value,
    descricao: descricao.value,
    valor: valor.value,
    Categoria: Categoria.value,
    ProdStatus: ProdStatus.value,
    id: uuidv4(),
  };

  prodArray.push(obj);
  localStorage.setItem('prodArray', JSON.stringify(prodArray));
  cl(prodArray);
  templating(prodArray);
  produtoForm.reset();
}

const onProdInfoUpdate = () => {
    let UpdateObj = {
      nome: nome.value,
      descricao: descricao.value,
      valor: valor.value,
      Categoria: Categoria.value,
      ProdStatus: ProdStatus.value,
    };
  
    let arr = getLocalData();
    let getUpdateId = localStorage.getItem('setEditId');
    arr.forEach((ele) => {
      if (ele.id === getUpdateId) {
        ele.nome = nome.value;
        ele.descricao = descricao.value;
        ele.valor = valor.value;
        ele.Categoria = Categoria.value;
        ele.ProdStatus = ProdStatus.value;
      }
    });
    templating(arr);
    localStorage.setItem('prodArray', JSON.stringify(arr));
    cl(UpdateObj);
    produtoForm.reset();
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
  };

  if (localStorage.getItem('prodArray')) {
    prodArray = getLocalData();
    templating(prodArray);
    }
    
    produtoForm.addEventListener('submit', onProdInfoSubmit);
    updateBtn.addEventListener('click', onProdInfoUpdate);
  