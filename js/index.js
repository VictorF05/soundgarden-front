const proxEventos = document.querySelector('#prox-eventos');

function mostrarEventos (evento){
    for (index = 0; index < 3; index++){
        const dataEvento = new Date(evento[index].scheduled);

        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const a = document.createElement('a');

        article.classList.add('evento', 'p-5', 'm-3');
        a.classList.add('btn', 'btn-primary');

        a.setAttribute('href', `reservas.html?id=${evento[index]._id}`)

        h2.innerText = `${evento[index].name} - ${dataEvento.getDate()}/${dataEvento.getMonth()}/${dataEvento.getFullYear()}`;
        h4.innerText = evento[index].attractions.join(',');
        p.innerText = evento[index].description;
        a.innerText = 'reservar ingresso'

        proxEventos.appendChild(article);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(p);
        article.appendChild(a);
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