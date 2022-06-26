const nome = document.querySelector('#nome');
const banner = document.querySelector('#banner');
const atracoes = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const lotacao = document.querySelector('#lotacao');
const form = document.querySelector('form');
const searchQueryParams = window.location.search.split('=');
const idEvento = searchQueryParams[1];

// Função que preenche os campos com as informações do evento
function preencherCampos (evento){
    const dataEvento = new Date(evento.scheduled);

    nome.value = evento.name;
    banner.value = evento.poster;
    atracoes.value = evento.attractions.join(',');
    descricao.value = evento.description;
    data.value = `${dataEvento.getDate()}/${dataEvento.getMonth()}/${dataEvento.getFullYear()} ${dataEvento.getHours()}:${dataEvento.getMinutes()}`
    lotacao.value = evento.number_tickets;
}

const options = {
    method: 'GET',
    headers: {},
}

// Buscando o evento pelo id extraído da URL
fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${idEvento}`, options)
    .then((resposta) => {
        return resposta.json();
    })
    .then((evento) => {
        preencherCampos(evento);
    })
    .catch((erro) => {
        console.log(erro)
    })

// Função de enviar edições
function enviarEdicoes(evento){
    evento.preventDefault();
  
    function conversorData (textoData){ 
        let dataComponentes = textoData.split(' ');
        let dataPartes = dataComponentes[0].split("/");
        let tempoPartes = dataComponentes[1].split(":");
        return(new Date(dataPartes[2], (dataPartes[1] - 1), dataPartes[0], tempoPartes[0], tempoPartes[1]));
    };
  
    function criandoArrayAtracoes (texto){
        return texto.split(",");
    };
  
    let dataConvertida = conversorData(data.value);
    let arrayAtracoes = criandoArrayAtracoes(atracoes.value);
  
    const objeto = {
        name: nome.value,
        poster: banner.value,
        attractions: arrayAtracoes,
        description: descricao.value,
        scheduled: dataConvertida,
        number_tickets: lotacao.value,
    };
    
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objeto),
    };
  
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${idEvento}`, options)
        .then((dados) => {
            return dados.json();
        })
        .then((objeto) => {
            alert(`Evento ${objeto.name} editado com sucesso!`);
            window.location.replace('admin.html');
        })
        .catch((erro) => {
            console.log(erro);
        });
} 
  
  // Chama a função de enviar edições ao clicar em enviar
  form.addEventListener('submit', enviarEdicoes);