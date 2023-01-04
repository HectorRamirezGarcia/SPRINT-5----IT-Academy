
async function fetchJoke() {
  let url:URL;
  const random_Joke = Math.random() < 0.5;
  if(random_Joke == true){
    url = new URL('https://icanhazdadjoke.com/');
  }else{
    url = new URL('https://api.chucknorris.io/jokes/random');
  }
  const response = await fetch(url, {
    method: 'GET',
		headers: {
      'Accept': 'application/json',
		},
  }).then(response => response.json());
  // waits until the request completes...
  console.log(response);
  let joke_DOM = document.getElementById("joke") as HTMLElement;
  if(random_Joke == true){
    joke_DOM.textContent = ' " '+response.joke+' " ';
  }else{
    joke_DOM.textContent = ' " '+response.value+' " ';
  }
  
  return response;
}

fetchJoke();

const arrayScores: { joke: string | null; score: number; date: string; }[] = [];

function voteJoke(vote: number){
  const joke_now = document.getElementById("joke") as HTMLElement;
  const result = {
    joke: joke_now.textContent,
    score: vote,
    date: new Date().toISOString()
  }
  arrayScores.push(result);
}


async function fetchTiempo(url: URL) {
  const response = await fetch(url, {
    method: 'GET',
		headers: {
      'Accept': 'application/json',
		},
  }).then(response => response.json());
  // waits until the request completes...
  console.log(response);

  let temperatura_DOM = document.getElementById("temperatura_api") as HTMLElement;
  temperatura_DOM.textContent = response.prediccion.dia[0].temperatura.minima;

  let icon_DOM = document.getElementById("api_icon") as HTMLElement;
  icon_DOM.setAttribute('data-icon', response.prediccion.dia[0].estado_cielo[2]);
  return response;
}

let url_tiempo = new URL('https://www.el-tiempo.net/api/json/v1/provincias/08/municipios/08019/weather');

fetchTiempo(url_tiempo).catch(error =>{console.error(error)});