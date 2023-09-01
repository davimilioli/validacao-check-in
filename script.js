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

function validationArrival() {
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

addNumbers();

function validateNight() {
    const numberNight = document.querySelector('#numero-noites');
    const nightValue = numberNight.options[numberNight.selectedIndex].value;
    return nightValue;
}

function validateGuests() {
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
    //const select = form.querySelectorAll('select');
    limparForm.addEventListener('click', () => {
        const inputs = form.querySelectorAll('input');
        const message = form.querySelector('textarea')

        inputs.forEach((item) => {
            item.value = '';
            message.value = '';
        })
    });
}

clear()

function saveForm() {
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
    const valores = {};

    if (vName) {
        valores.nome = vName;
    }

    if (vSexo) {
        valores.sexo = vSexo.charAt(0).toUpperCase() + vSexo.slice(1);
    }

    if (vDate) {
        valores.data = vDate;
    }

    if (vEmail) {
        valores.email = vEmail;
    }

    if (vNight) {
        valores.noite = vNight;
    }

    if (vGuests) {
        valores.convidados = vGuests;
    }

    if (vEstimated) {
        valores.estimated = vEstimated;
    }

    if (vMessage) {
        valores.mensagem = vMessage;
    }

    if (vNewsLetter) {
        valores.newsletter = vNewsLetter;
    }

    if (vArrival) {
        valores.chegada = vArrival;
    }

    const validates = (vName && vSexo && vDate && vEmail && vNight && vGuests && vEstimated && vArrival);
    console.log(vEstimated)
    return {
        valores: valores,
        validates: validates ? true : false,
    }
}

const salvar = document.querySelector('#salvar');
salvar.addEventListener('click', () => {
    if (saveForm().validates) {
        openModal();
    }
})

function openModal() {
    const modal = document.querySelector('#modal');
    modal.classList.add('active');

    const dateForm = saveForm().valores;

    const total = dateForm.estimated.noite[0] + dateForm.estimated.hospede[0];

    const contentModal = `    
    <form action="/action_page.php" method="post">        
        <div>
            Nome: <input type="text" name="nome" value="${dateForm.nome}">
            Sexo: <input type="text" name="sexo" value="${dateForm.sexo}">
            Idade: <input type="text" name="idade" value="${dateForm.data}">
            Email: <input type="text" name="email" value="${dateForm.email}">
            Data de chegada: <input type="text" name="chegada" value="${dateForm.chegada}">
            Numero de Noites: <input type="text" name="noite" value="${dateForm.noite}">
            Numero de Hospedes: <input type="text" name="convidados" value="${dateForm.convidados}">
            Mensagem: <input type="text" name="mensagem" value="${dateForm.mensagem ? dateForm.mensagem : ''}">
            Total Estimado: <input type="text" name="total" value="${total}">
            Aceito receber noticias: <input type="text" name="newsletter" value="${dateForm.newsletter}">
        </div>
        <div>
            <button id="enviarForm" type="submit">Confirmar</button>
            <button id="editForm" type="button">Editar dados</button>
        </div>
    </form>
    `;

    modal.innerHTML = contentModal;
    const editForm = document.querySelector('#editForm');
    editForm.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}
