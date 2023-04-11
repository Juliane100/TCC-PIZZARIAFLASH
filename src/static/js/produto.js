cl = console.log;

// C >> creat
// R >> Read
// U >> Update
// D >> Delete

const produtoForm = document.getElementById('produtoForm');
const prodInfo = document.getElementById('prodInfo');
const nome = document.getElementById('nome');
const descrição = document.getElementById('descrição');
const valor = document.getElementById('valor');
const updateBtn = document.getElementById('updateBtn');
const submitBtn = document.getElementById('submitBtn');

let prodArray = []
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getLocalData = () => {
    return JSON.parse(localStorage.getItem('prodArray'))
}
const OnEditHandler = (ele) => {
    // cl('Edit is Working', ele);
    // let getEditId = ele.dataset.id;
    let getEditId = ele.getAttribute('data-id');
    // cl(getEditId)
    localStorage.setItem('setEditId', getEditId);
    let arr = getLocalData();
    // cl(arr);

    let getObj = arr.find(ele => ele.id === getEditId);
    //cl(getObj);
    nome.value = getObj.nome;
    descrição.value = getObj.descrição;
    valor.value = getObj.valor;
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}

const OnDeleteHandler = (ele) => {
    cl('Delete is working', ele);
    let getDeleteId = ele.dataset.id;
    cl(getDeleteId);
    let getData = getLocalData();
    prodArray = getData.filter(ele => ele.id !== getDeleteId);
    alert("Are you Sure to Delete");
    templating(prodArray);
    localStorage.setItem('prodArray', JSON.stringify(prodArray))
}

const templating = (arr) => {
    let result = '';
    arr.forEach((element, i) => {
        result += `
        <tr>
        <td>${element.nome}</td>
        <td>${element.descrição}</td>
        <td>${element.valor}</td>
        <td class='text-center'><button class="fa-solid fa-pen-to-square" data-id="${element.id}" onclick = 'OnEditHandler(this)'></button>
        <button class="fa-solid fa-trash-can" data-id="${element.id}" onclick = 'OnDeleteHandler(this)'></button></td>
        </tr>
        `
    });
    prodInfo.innerHTML = result;
};


function onProdInfoSubmit(event) {
    event.preventDefault();
    cl(event);
    let obj = {
        nome: nome.value,
        descrição: descrição.value,
        valor: valor.value,
        id: uuidv4(),
    };
    prodArray.push(obj)
    localStorage.setItem('prodArray', JSON.stringify(prodArray));
    cl(prodArray);
    // document.getElementById('studentForm').reset()
    templating(prodArray)
    event.target.reset()
};

const onProdInfoUpdate = () => {
    // cl('Update 123');
    let UpdateObj = {
		nome: nome.value,
        descrição: descrição.value,
        valor: valor.value,
    };
    let arr = getLocalData();
    let getUpdateId = localStorage.getItem('setEditId');
    arr.forEach(ele => {
        if (ele.id === getUpdateId) {
            ele.nome = nome.value,
                ele.descrição = descrição.value,      
            ele.valor = valor.value
        }
    })
    templating(arr);
    localStorage.setItem('prodArray', JSON.stringify(arr));
    cl(UpdateObj);
    produtoForm.reset();
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}

if (localStorage.getItem('prodArray')) {
    prodArray = getLocalData();  //getting data from local storage
    templating(prodArray)
}

// let editBtns = document.querySelectorAll('.btnedit')
// cl(editBtns)       >>// on fly element cant get from here..bcoz it will not supported by all browser

produtoForm.addEventListener('submit', onProdInfoSubmit);
updateBtn.addEventListener('click', onProdInfoUpdate)