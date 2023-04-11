cl = console.log;

// C >> creat
// R >> Read
// U >> Update
// D >> Delete

const cupomForm = document.getElementById('cupomForm');
const cpmInfo = document.getElementById('cpmInfo');
const numero = document.getElementById('numero');
const gerado = document.getElementById('gerado');
const validado = document.getElementById('validado');
const valor = document.getElementById('valor');
const updateBtn = document.getElementById('updateBtn');
const submitBtn = document.getElementById('submitBtn');

let cpmArray = []
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getLocalData = () => {
    return JSON.parse(localStorage.getItem('cpmArray'))
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
    gerado.value = getObj.gerado;
    validado.value = getObj.validado;
    valor.value = getObj.valor;
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}

const OnDeleteHandler = (ele) => {
    cl('Delete is working', ele);
    let getDeleteId = ele.dataset.id;
    cl(getDeleteId);
    let getData = getLocalData();
    cpmArray = getData.filter(ele => ele.id !== getDeleteId);
    alert("Are you Sure to Delete");
    templating(cpmArray);
    localStorage.setItem('cpmArray', JSON.stringify(cpmArray))
}

const templating = (arr) => {
    let result = '';
    arr.forEach((element, i) => {
        result += `
        <tr>
        <td>${element.numero}</td>
        <td>${element.gerado}</td>
        <td>${element.validade}</td>
        <td>${element.valor}</td>
        <td class='text-center'><button class="fa-solid fa-pen-to-square" data-id="${element.id}" onclick = 'OnEditHandler(this)'></button>
        <button class="fa-solid fa-trash-can" data-id="${element.id}" onclick = 'OnDeleteHandler(this)'></button></td>
        </tr>
        `
    });
    cpmInfo.innerHTML = result;
};


function onCpmInfoSubmit(event) {
    event.preventDefault();
    cl(event);
    let obj = {
        nome: nome.value,
       gerado: gerado.value,
       validado: validado.value,
        valor: valor.value,
        id: uuidv4(),
    };
    cpmArray.push(obj)
    localStorage.setItem('cpmArray', JSON.stringify(cpmArray));
    cl(cpmArray);
    // document.getElementById('studentForm').reset()
    templating(cpmArray)
    event.target.reset()
};

const onCpmInfoUpdate = () => {
    // cl('Update 123');
    let UpdateObj = {
		nome: nome.value,
       gerado: gerado.value,
       validado: validado.value,
        valor: valor.value,
    };
    let arr = getLocalData();
    let getUpdateId = localStorage.getItem('setEditId');
    arr.forEach(ele => {
        if (ele.id === getUpdateId) {
            ele.nome=nome.value,
            ele.gerado= gerado.value,
            ele.validado= validado.value,
            ele.valor= valor.value
        }
    })
    templating(arr);
    localStorage.setItem('cpmArray', JSON.stringify(arr));
    cl(UpdateObj);
    cupomForm.reset();
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}

if (localStorage.getItem('cpmArray')) {
    cpmArray = getLocalData();  //getting data from local storage
    templating(cpmArray)
}

// let editBtns = document.querySelectorAll('.btnedit')
// cl(editBtns)       >>// on fly element cant get from here..bcoz it will not supported by all browser

cupomForm.addEventListener('submit', onCpmInfoSubmit);
updateBtn.addEventListener('click', onCpmInfoUpdate)