const todosEventos = document.querySelector('#todos-eventos');

function mostrarEventos (eventos){
    eventos.forEach((evento) => {
        const dataEvento = new Date(evento.scheduled);

        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const a = document.createElement('a');

        article.classList.add('evento', 'card', 'p-5', 'm-3');
        a.classList.add('btn', 'btn-primary');

        a.setAttribute('href', `reservas.html?id=${evento._id}`);

        h2.innerText = `${evento.name} - ${dataEvento.getDate()}/${dataEvento.getMonth()}/${dataEvento.getFullYear()}`;
        h4.innerText = evento.attractions.join(',');
        p.innerText = evento.description;
        a.innerText = 'reservar ingresso';

        todosEventos.appendChild(article);
        article.appendChild(h2);
        article.appendChild(h4);
        article.appendChild(p);
        article.appendChild(a);
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