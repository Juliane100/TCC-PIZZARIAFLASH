cl = console.log;

// C >> creat
// R >> Read
// U >> Update
// D >> Delete

const cupomForm = document.getElementById('cupomForm');
const cupInfo = document.getElementById('cupInfo');
const numero = document.getElementById('numero');
const gerado = document.getElementById('gerado');
const validado = document.getElementById('validado')
const valor = document.getElementById('valor');
const updateBtn = document.getElementById('updateBtn');
const submitBtn = document.getElementById('submitBtn');

let cupArray = []
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getLocalData = () => {
    return JSON.parse(localStorage.getItem('cupArray'))
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
    numero.value = getObj.numero;
    gerado.value = getObj.gerado;
    validado.value = getObj.validado
    valor.value = getObj.valor;
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}

const OnDeleteHandler = (ele) => {
    cl('Delete is working', ele);
    let getDeleteId = ele.dataset.id;
    cl(getDeleteId);
    let getData = getLocalData();
    cupArray = getData.filter(ele => ele.id !== getDeleteId);
    alert("Are you Sure to Delete");
    templating(cupArray);
    localStorage.setItem('cupArray', JSON.stringify(cupArray))
}

const templating = (arr) => {
    let result = '';
    arr.forEach((element, i) => {
        result += `
        <tr>
        <td>${element.numero}</td>
        <td>${element.gerado}</td>
        <td>${element.validado}
        <td>${element.valor}</td>
        <td class='text-center'><button class="fa-solid fa-pen-to-square" data-id="${element.id}" onclick = 'OnEditHandler(this)'></button>
        <button class="fa-solid fa-trash-can" data-id="${element.id}" onclick = 'OnDeleteHandler(this)'></button></td>
        </tr>
        `
    });
    cupInfo.innerHTML = result;
};


function onCupInfoSubmit(event) {
    event.preventDefault();
    cl(event);
    let obj = {
        numero: numero.value,
        gerado: gerado.value,
        validado: validado.value,
        valor: valor.value,
        id: uuidv4(),
    };
    cupArray.push(obj)
    localStorage.setItem('cupArray', JSON.stringify(cupArray));
    cl(cupArray);
    // document.getElementById('studentForm').reset()
    templating(cupArray)
    event.target.reset()
};

const onCupInfoUpdate = () => {
    // cl('Update 123');
    let UpdateObj = {
		numero: numero.value,
        gerado: gerado.value,
        validado: validado.value,
        valor: valor.value
    };

    let arr = getLocalData();
    let getUpdateId = localStorage.getItem('setEditId');
    arr.forEach(ele => {
        if (ele.id === getUpdateId) {
        ele.numero = numero.value,
        ele.gerado = gerado.value,
        ele.validado = validado.value,      
        ele.valor = valor.value
        }
    })
    templating(arr);
    localStorage.setItem('cupArray', JSON.stringify(arr));
    cl(UpdateObj);
    cupomForm.reset();
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}

if (localStorage.getItem('cupArray')) {
    cupArray = getLocalData();  //getting data from local storage
    templating(cupArray)
}

// let editBtns = document.querySelectorAll('.btnedit')
// cl(editBtns)       >>// on fly element cant get from here..bcoz it will not supported by all browser

cupomForm.addEventListener('submit', onCupInfoSubmit);
updateBtn.addEventListener('click', onCupInfoUpdate)