const proxEventos = document.querySelector('#prox-eventos');
const btnReserva = document.querySelector('#btn-reserva');
const nomePessoa = document.querySelector('#nome-pessoa');
const emailPessoa = document.querySelector('#email-pessoa');

function reservarIngresso (idEvento){
    const reserva = {
        owner_name: nomePessoa.value,
        owner_email: emailPessoa.value,
        number_tickets: 1,
        event_id: idEvento,
    };

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserva),
    };

    fetch('https://xp41-soundgarden-api.herokuapp.com/bookings', options)
        .then((resposta) => {
            return resposta.json();
        })
        .then((reserva) => {
            alert(`Parabéns ${reserva.owner_name} sua reserva foi efetuada!`);
            window.location.replace('index.html');
        })
        .catch((erro) => {
            console.log(erro);
        })
}

function setId (idEvento){
    btnReserva.setAttribute('onclick', `reservarIngresso("${idEvento}")`);
}

function mostrarEventos (evento){
    for (index = 0; index < 3; index++){
        const dataEvento = new Date(evento[index].scheduled);

        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const button = document.createElement('button');
        const cardHeader = document.createElement('div');
        const cardBody = document.createElement('div');
        const cardFooter = document.createElement('div');

        article.classList.add('evento', 'card', 'text-center','p-4', 'p-sm-5', 'm-3', 'w-auto');
        button.classList.add('btn', 'btn-primary');
        cardHeader.classList.add('card-header', 'bg-white', 'border-0', 'p-0', 'm-0');
        cardBody.classList.add('card-body');
        cardFooter.classList.add('card-footer', 'bg-white', 'border-0', 'p-0', 'm-0');
        h4.classList.add('card-title');
        p.classList.add('card-text');

        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-reserva');
        button.setAttribute('onclick', `setId("${evento[index]._id}")`);

        h2.innerText = `${evento[index].name} - ${dataEvento.getDate()}/${dataEvento.getMonth()}/${dataEvento.getFullYear()}`;
        h4.innerText = evento[index].attractions.join(',');
        p.innerText = evento[index].description;
        button.innerText = 'reservar ingresso';

        proxEventos.appendChild(article);
        article.appendChild(cardHeader);
        article.appendChild(cardBody);
        article.appendChild(cardFooter);
        cardHeader.appendChild(h2);
        cardBody.appendChild(h4);
        cardBody.appendChild(p);
        cardFooter.appendChild(button);
    }
}

fetch('https://xp41-soundgarden-api.herokuapp.com/events', {method: 'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((evento) => {
        mostrarEventos(evento);
    })
    .catch((erro) => {
        console.log(erro);
    })