const tabela = document.querySelector('tbody');
const nomeEvento = document.querySelector('#evento-name')
const searchQueryParams = window.location.search.split('=');
const idEvento = searchQueryParams[1];

function mostrarReservas (reservas){
    reservas.forEach((reserva, index) => {
        nomeEvento.innerText = reserva.event.name;

        const trLinha = document.createElement('tr');
        const thIndex = document.createElement('th');
        const tdName = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdQuantidade = document.createElement('td');

        thIndex.setAttribute('scope', 'row');
        thIndex.innerText = index + 1;

        thIndex.classList.add('d-none', 'd-xl-table-cell');

        tdName.innerText = reserva.owner_name;
        tdEmail.innerText = reserva.owner_email;
        tdQuantidade.innerText = reserva.number_tickets;

        tabela.appendChild(trLinha);
        trLinha.appendChild(thIndex);
        trLinha.appendChild(tdName);
        trLinha.appendChild(tdEmail);
        trLinha.appendChild(tdQuantidade);
    })
}

fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings/event/${idEvento}`, {method: 'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((reservas) => {
        mostrarReservas(reservas);
    })
    .catch((erro) => {
        console.log(erro);
    })