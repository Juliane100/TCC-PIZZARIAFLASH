cl = console.log;

// C >> creat
// R >> Read
// U >> Update
// D >> Delete

const funcionarioForm = document.getElementById('funcionarioForm');
const funInfo = document.getElementById('funInfo');
const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const rg = document.getElementById('rg');
const datanascimento = document.getElementById('datanascimento');
const telefone = document.getElementById('telefone');
const email = document.getElementById('email');
const cep = document.getElementById('cep');
const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const numero = document.getElementById('numero');
const complemento = document.getElementById('complemento');
const cargo = document.getElementById('cargo');
const descricao = document.getElementById('descricao');
const updateBtn = document.getElementById('updateBtn');
const submitBtn = document.getElementById('submitBtn');

let funArray = []
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const getLocalData = () => {
    return JSON.parse(localStorage.getItem('funArray'))
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
	cpf.value = getObj.cpf
	rg.value = getObj.rg
	datanascimento.value = getObj.datanascimento;
	telefone.value = getObj.telefone;
	email.value = getObj.email;
	cep.value = getObj.cep;
	logradouro.value = getObj.logradouro;
	bairro.value = getObj.bairro;
	cidade.value = getObj.cidade;
	numero.value = getObj.numero;
	complemento.value = getObj.complemento;
	cargo.value = getObj.cargo;
	descricao.value = getObj.descricao;    
    submitBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}

const OnDeleteHandler = (ele) => {
    cl('Delete is working', ele);
    let getDeleteId = ele.dataset.id;
    cl(getDeleteId);
    let getData = getLocalData();
    funArray = getData.filter(ele => ele.id !== getDeleteId);
    alert("Você deletou esse item!");
    templating(funArray);
    localStorage.setItem('funArray', JSON.stringify(funArray))
}
const templating = (arr) => {
    let result = '';
    arr.forEach((element, i) => {
        result += `
        <tr>
		<td>${element.nome}</td>
		<td>${element.cpf}</td>
		<td>${element.telefone}</td>
		<td>${element.cargo}</td>
		<td class='text-center'><button class="fa-solid fa-pen-to-square" data-id="${element.id}" onclick = 'OnEditHandler(this)'></button>
        <button class="fa-solid fa-trash-can" data-id="${element.id}" onclick = 'OnDeleteHandler(this)'></button></td>
        </tr>
        `
    });
    funInfo.innerHTML = result;
};


function onFunInfoSubmit(event) {
    event.preventDefault();
    cl(event);
    let obj = {
		nome: nome.value,
		cpf: cpf.value,
		rg: rg.value,
		datanascimento: datanascimento.value,
		telefone: telefone.value,
		email: email.value,
		cep: cep.value,
		logradouro: logradouro.value,
		bairro: bairro.value,
		cidade: cidade.value,
		numero: numero.value,
		complemento: complemento.value,
		cargo: cargo.value,
		descricao: descricao.value, 
		id: uuidv4(),
    };
    funArray.push(obj)
    localStorage.setItem('funArray', JSON.stringify(funArray));
    cl(funArray);
    // document.getElementById('studentForm').reset()
    templating(funArray)
    event.target.reset()
};

const onFunInfoUpdate = () => {
    // cl('Update 123');
    let UpdateObj = {
		nome: nome.value,
		cpf: cpf.value,
		rg: rg.value,
		datanascimento: datanascimento.value,
		telefone: telefone.value,
		email: email.value,
		cep: cep.value,
		logradouro: logradouro.value,
		bairro: bairro.value,
		cidade: cidade.value,
		numero: numero.value,
		complemento: complemento.value,
		cargo: cargo.value,
		descricao: descricao.value,
        
    };
    let arr = getLocalData();
    let getUpdateId = localStorage.getItem('setEditId');
    arr.forEach(ele => {
        if (ele.id === getUpdateId) {
			ele.nome= nome.value,
			ele.cpf= cpf.value,
			ele.rg= rg.value,
			ele.datanascimento= datanascimento.value,
			ele.telefone= telefone.value,
			ele.email= email.value,
			ele.cep= cep.value,
			ele.logradouro= logradouro.value,
			ele.bairro= bairro.value,
			ele.cidade= cidade.value,
			ele.numero= numero.value,
			ele.complemento= complemento.value,
			ele.cargo= cargo.value,
			ele.descricao= descricao.value
		}
    })
    templating(arr);
    localStorage.setItem('funArray', JSON.stringify(arr));
    cl(UpdateObj);
    funcionarioForm.reset();
    submitBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}

if (localStorage.getItem('funArray')) {
    funArray = getLocalData();  //getting data from local storage
    templating(funArray)
}

// let editBtns = document.querySelectorAll('.btnedit')
// cl(editBtns)       >>// on fly element cant get from here..bcoz it will not supported by all browser

funcionarioForm.addEventListener('submit', onFunInfoSubmit);
updateBtn.addEventListener('click', onFunInfoUpdate)