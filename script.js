function initialized() {
    addNumbers();
/*     resultEstimated(); */
    addEventListener('change', resultEstimated);
    clear();


    /* console.log('script.js iniciado'); */
}

initialized()






const enviarForm = document.querySelector('#enviarForm');

console.log(confirForm)

form.addEventListener('submit', (e) => {
    e.preventDefault()
})

function validationName() {
    const nome = document.querySelector('#nome');
    let comSucesso = nome.value !== '' ? nome.value : '';
    return comSucesso;
}

function validationSex() {
    const sexo = document.querySelector('#sexo');
    const sexoValue = sexo.options[sexo.selectedIndex].value;
    return sexoValue;
}

function validationYear() {
    const idade = document.querySelector('#idade');
    const idadeValue = idade.value.slice(0, 4);
    const currentDate = new Date();
    const calculoAnos = parseInt(idadeValue) - currentDate.getFullYear();
    let comSucesso = Math.abs(calculoAnos);
    return comSucesso;
}

function validationEmail() {
    const email = document.querySelector('#email');
    const emailValue = email.value;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    let comSucesso = emailRegex.test(emailValue) ? email.value : false;
    return comSucesso;
}

function validationArrival(){
    const dataChegada = document.querySelector('#data-chegada');
    const dataValue = dataChegada.value;
    return dataValue;
}

function addNumbers() {
    const numbers = document.querySelectorAll('[data-numbers-option]')
    numbers.forEach((number) => {
        let numbersValue = parseInt(number.getAttribute('data-numbers-option'));
        if (typeof numbersValue !== 'string') {
            for (let i = 0; i < numbersValue; i++) {
                let createOptions = document.createElement('option');
                createOptions.value = i + 1;
                createOptions.textContent = i + 1;
                number.appendChild(createOptions)
            }
        }
    });

    return numbers;
}

function validateNight(){
    const numberNight = document.querySelector('#numero-noites');
    const nightValue = numberNight.options[numberNight.selectedIndex].value;
    return nightValue;
}

function validateGuests(){
    const numberGuests = document.querySelector('#numero-hospedes');
    const guestsValue = numberGuests.options[numberGuests.selectedIndex].value;
    return guestsValue;
}

function resultEstimated() {
    const totalEstimado = document.querySelector('#total-estimado');
    const noites = document.querySelector('#numero-noites');
    const hospedes = document.querySelector('#numero-hospedes');
    const noitesCount = noites.options[noites.selectedIndex].value;
    const hospedesCount = hospedes.options[hospedes.selectedIndex].value;


    const valorNoite = 1000 * noitesCount;
    const valorHospede = 500 * hospedesCount;

    const total = {
        noite: [valorNoite, noitesCount],
        hospede: [valorHospede, hospedesCount],
    };

    const srtNoite = total.noite[1] == 1 ? 'Noite' : 'Noites';
    const srtHospede = total.hospede[1] == 1 ? 'Hóspede' : 'Hóspedes';

    const template = `
        <div class="valor-total">
            <p>${srtNoite}: ${total.noite[1]}</p>
            <p>Valor: ${total.noite[0]}</p>
        </div>
        <div class="valor-total">
            <p>${srtHospede}: ${total.hospede[1]}</p>
            <p>Valor: ${total.hospede[0]}</p>
        </div>
    `

    totalEstimado.innerHTML = template;

    return total;
}

function message() {
    const message = document.querySelector('#mensagem');
    const messageValue = message.value;
    return messageValue;
}

function newsletter() {
    const newsLetter = document.querySelector('#newsletter');
    const check = newsLetter.checked ? 'Sim' : 'Não';
    return check;
}


function clear() {
    const form = document.querySelector('#form');
    const limparForm = document.querySelector('#limpar');
    const select = form.querySelectorAll('select');
    limparForm.addEventListener('click', () => {
        const inputs = form.querySelectorAll('input');
        const message = form.querySelector('textarea')

        inputs.forEach((item) => {
            item.value = '';
            message.value = '';
        })
    });
}

const salvar = document.querySelector('#salvar');
salvar.addEventListener('click', () => {
    saveForm()
})


function saveForm(){
    const vName = validationName();
    const vSexo = validationSex();
    const vDate = validationYear();
    const vEmail = validationEmail();
    const vNight = validateNight();
    const vGuests = validateGuests();
    const vEstimated = resultEstimated();
    const vMessage = message();
    const vNewsLetter = newsletter();
    const vArrival = validationArrival();
    if(vName && vSexo && vDate && vEmail && vNight && vGuests && vEstimated && vMessage && vNewsLetter && vArrival){
        console.log('sim');
    } else {
        console.log('Dados incorretos!!');
    }
}

function openModal(){
    const modal = document.querySelector('#modal');
}

openModal()
