const tabela = document.querySelector('tbody');

function mostrarEventos (eventos){
    eventos.forEach((evento, index) => {
        const dataEvento = new Date(evento.scheduled);
        const trLinha = document.createElement('tr');
        const thIndex = document.createElement('th');
        const tdData = document.createElement('td');
        const tdName = document.createElement('td');
        const tdAtracoes = document.createElement('td');
        const tdBotoes = document.createElement('td');
        const btnReserva = document.createElement('a');
        const btnEditar = document.createElement('a');
        const btnExcluir = document.createElement('a');

        thIndex.setAttribute('scope', 'row');
        thIndex.innerText = index + 1;

        tdData.innerText = `${dataEvento.getDate()}/${dataEvento.getMonth()}/${dataEvento.getFullYear()} ${dataEvento.getHours()}:${dataEvento.getMinutes()}`

        tdName.innerText = evento.name;

        tdAtracoes.innerText = evento.attractions.join(',');

        thIndex.classList.add('d-none', 'd-xl-table-cell');
        tdData.classList.add('d-none', 'd-sm-table-cell');
        tdAtracoes.classList.add('d-none', 'd-xl-table-cell');

        btnReserva.setAttribute('href', `reservas.html?id=${evento._id}`);
        btnReserva.classList.add('btn', 'btn-dark');
        btnReserva.innerText = 'reservas';

        btnEditar.setAttribute('href', `editar-evento.html?id=${evento._id}`);
        btnEditar.classList.add('btn', 'btn-secondary');
        btnEditar.innerText = 'editar';

        btnExcluir.setAttribute('href', `excluir-evento.html?id=${evento._id}`);
        btnExcluir.classList.add('btn', 'btn-danger');
        btnExcluir.innerText = 'excluir';

        tabela.appendChild(trLinha);
        trLinha.appendChild(thIndex);
        trLinha.appendChild(tdData);
        trLinha.appendChild(tdName);
        trLinha.appendChild(tdAtracoes);
        trLinha.appendChild(tdBotoes);
        tdBotoes.appendChild(btnReserva);
        tdBotoes.appendChild(btnEditar);
        tdBotoes.appendChild(btnExcluir);
    })
}

fetch('https://xp41-soundgarden-api.herokuapp.com/events', {method: 'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((eventos) => {
        mostrarEventos(eventos);
    })
    .catch((erro) => {
        console.log(erro);
    })