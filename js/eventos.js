const nome = document.querySelector('#nome');
const poster = 'URL_DA_IMAGEM';
const atracoes = document.querySelector('#atracoes');
const descricao = document.querySelector('#descricao');
const data = document.querySelector('#data');
const lotacao = document.querySelector('#lotacao');
const form = document.querySelector('form');

// Ao clicar cria elemento novo
form.addEventListener('submit', (evento) => {
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
    poster: 'url da imagem',
    attractions: arrayAtracoes,
    description: descricao.value,
    scheduled: dataConvertida,
    number_tickets: lotacao.value,
    };
  
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(objeto),
    };

  fetch('https://xp41-soundgarden-api.herokuapp.com/events', options)
  .then(dados => {
    return dados.json();
  })
  .then(objeto => {
    console.log(objeto);
  })
  .catch(e => {
    console.log(e);
  });
})