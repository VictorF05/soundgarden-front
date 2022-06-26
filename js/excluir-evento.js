const nome = document.querySelector('#nome');
const banner = document.querySelector('#banner');
const atracoes = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const lotacao = document.querySelector('#lotacao');
const form = document.querySelector('form');
const searchQueryParams = window.location.search.split('=');
const idEvento = searchQueryParams[1];

// Função que preenche os campos com as informações do evento e desabilita os campos
function preencherCampos (evento){
    const dataEvento = new Date(evento.scheduled);

    nome.value = evento.name;
    banner.value = evento.poster;
    atracoes.value = evento.attractions.join(',');
    descricao.value = evento.description;
    data.value = `${dataEvento.getDate()}/${dataEvento.getMonth()}/${dataEvento.getFullYear()} ${dataEvento.getHours()}:${dataEvento.getMinutes()}`
    lotacao.value = evento.number_tickets;

    nome.setAttribute('disabled', 'true');
    banner.setAttribute('disabled', 'true');
    atracoes.setAttribute('disabled', 'true');
    descricao.setAttribute('disabled', 'true');
    data.setAttribute('disabled', 'true');
    lotacao.setAttribute('disabled', 'true');
}

// Buscando o evento pelo id extraído da URL
fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${idEvento}`, {method: 'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((evento) => {
        preencherCampos(evento);
    })
    .catch((erro) => {
        console.log(erro)
    })

// Função de deletar evento
function deletarEvento(evento){
    evento.preventDefault();
  
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${idEvento}`, {method: 'DELETE'})
        .then(() => {
            alert(`O evento ${nome.value} foi deletado com sucesso!`);
            window.location.replace('admin.html');
        })
        .catch((erro) => {
            console.log(erro);
        })
} 

// Chama a função de enviar edições ao clicar em enviar
form.addEventListener('submit', deletarEvento);