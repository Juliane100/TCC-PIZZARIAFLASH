cl = console.log;

// C >> creat
// R >> Read
// U >> Update
// D >> Delete

const clienteForm = document.getElementById('clienteForm');
const clieInfo = document.getElementById('clieInfo');
const nome = document.getElementById('nome');
const telefone = document.getElementById('telefone');
const email = document.getElementById('email');
const datanascimento = document.getElementById('datanascimento');
const cep = document.getElementById('cep');
const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const numero = document.getElementById('numero');
const complemento = document.getElementById('complemento');
const CliStatus = document.getElementById('CliStatus');
const updateBtn = document.getElementById('updateBtn');
const submitBtn = document.getElementById('submitBtn');

let clieArray = []
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getLocalData = () => {
    return JSON.parse(localStorage.getItem('clieArray'))
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
	telefone.value = getObj.telefone;
	email.value = getObj.email;
	datanascimento.value = getObj.datanascimento;
	cep.value = getObj.cep;
	logradouro.value = getObj.logradouro;
	bairro.value = getObj.bairro;
	cidade.value = getObj.cidade;
	numero.value = getObj.numero;
	complemento.value = getObj.complemento;
    CliStatus.value = getObj.CliStatus;
    
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}

const OnDeleteHandler = (ele) => {
    cl('Delete is working', ele);
    let getDeleteId = ele.dataset.id;
    cl(getDeleteId);
    let getData = getLocalData();
    clieArray = getData.filter(ele => ele.id !== getDeleteId);
    alert("Você deletou esse item!");
    templating(clieArray);
    localStorage.setItem('cliArray', JSON.stringify(clieArray))
}
const templating = (arr) => {
    let result = '';
    arr.forEach((element, i) => {
        result += `
        <tr>
		<td>${element.nome}</td>
		<td>${element.telefone}</td>
		<td>${element.cep}</td>
		<td>${element.numero}</td>
        <td>${element.CliStatus}</td>
		<td class='text-center'><button class="fa-solid fa-pen-to-square" data-id="${element.id}" onclick = 'OnEditHandler(this)'></button>
        <button class="fa-solid fa-trash-can" data-id="${element.id}" onclick = 'OnDeleteHandler(this)'></button></td>
        </tr>
        `
    });
    clieInfo.innerHTML = result;
};


function onClieInfoSubmit(event) {
    event.preventDefault();
    cl(event);
    let obj = {
		nome: nome.value,
		telefone: telefone.value,
		email: email.value,
		datanascimento: datanascimento.value,
		cep: cep.value,
		logradouro: logradouro.value,
		bairro: bairro.value,
		cidade: cidade.value,
		numero: numero.value,
		complemento: complemento.value,
        CliStatus: CliStatus.value,
		id: uuidv4(),
    };
    clieArray.push(obj)
    localStorage.setItem('clieArray', JSON.stringify(clieArray));
    cl(clieArray);
    // document.getElementById('studentForm').reset()
    templating(clieArray)
    event.target.reset()
};

const onClieInfoUpdate = () => {
    // cl('Update 123');
    let UpdateObj = {
		nome: nome.value,
		telefone: telefone.value,
		email: email.value,
		datanascimento: datanascimento.value,
		cep: cep.value,
		logradouro: logradouro.value,
		bairro: bairro.value,
		cidade: cidade.value,
		numero: numero.value,
		complemento: complemento.value,
        CliStatus: CliStatus.value,

        
    };
    let arr = getLocalData();
    let getUpdateId = localStorage.getItem('setEditId');
    arr.forEach(ele => {
        if (ele.id === getUpdateId) {
			ele.nome = nome.value,
			ele.telefone = telefone.value,
			ele.email = email.value,
			ele.datanascimento = datanascimento.value,
			ele.cep = cep.value,
			ele.logradouro = logradouro.value,
			ele.bairro = bairro.value,
			ele.cidade = cidade.value,
			ele.numero = numero.value,
			ele.complemento = complemento.value,
            ele.CliStatus = CliStatus.value 
		}
    })
    templating(arr);
    localStorage.setItem('clieArray', JSON.stringify(arr));
    cl(UpdateObj);
    clienteForm.reset();
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}

if (localStorage.getItem('clieArray')) {
    clieArray = getLocalData();  //getting data from local storage
    templating(clieArray)
}

// let editBtns = document.querySelectorAll('.btnedit')
// cl(editBtns)       >>// on fly element cant get from here..bcoz it will not supported by all browser

clienteForm.addEventListener('submit', onClieInfoSubmit);
updateBtn.addEventListener('click', onClieInfoUpdate)