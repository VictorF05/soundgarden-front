const todosEventos = document.querySelector('#todos-eventos');
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
            window.location.replace('eventos.html');
        })
        .catch((erro) => {
            console.log(erro);
        })
}

function setId (idEvento){
    btnReserva.setAttribute('onclick', `reservarIngresso("${idEvento}")`);
}

function mostrarEventos (eventos){
    eventos.forEach((evento) => {
        const dataEvento = new Date(evento.scheduled);

        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const button = document.createElement('button');

        article.classList.add('evento', 'card', 'p-5', 'm-3');
        button.classList.add('btn', 'btn-primary');

        button.setAttribute('type', 'button');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal-reserva');
        button.setAttribute('onclick', `setId("${evento._id}")`);

        h2.innerText = `${evento.name} - ${dataEvento.getDate()}/${dataEvento.getMonth()}/${dataEvento.getFullYear()}`;
        h4.innerText = evento.attractions.join(',');
        p.innerText = evento.description;
        button.innerText = 'reservar ingresso';

        todosEventos.appendChild(article);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(p);
        article.appendChild(button);
    });
}

fetch('https://xp41-soundgarden-api.herokuapp.com/events/', {method: 'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((eventos) => {
        mostrarEventos(eventos);
    })
    .catch((erro) => {
        console.log(erro);
    })