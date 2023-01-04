"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        let url;
        const random_Joke = Math.random() < 0.5;
        if (random_Joke == true) {
            url = new URL('https://icanhazdadjoke.com/');
        }
        else {
            url = new URL('https://api.chucknorris.io/jokes/random');
        }
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => response.json());
        // waits until the request completes...
        console.log(response);
        let joke_DOM = document.getElementById("joke");
        if (random_Joke == true) {
            joke_DOM.textContent = ' " ' + response.joke + ' " ';
        }
        else {
            joke_DOM.textContent = ' " ' + response.value + ' " ';
        }
        return response;
    });
}
fetchJoke();
const arrayScores = [];
function voteJoke(vote) {
    const joke_now = document.getElementById("joke");
    const result = {
        joke: joke_now.textContent,
        score: vote,
        date: new Date().toISOString()
    };
    arrayScores.push(result);
}
function fetchTiempo(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then(response => response.json());
        // waits until the request completes...
        console.log(response);
        let temperatura_DOM = document.getElementById("temperatura_api");
        temperatura_DOM.textContent = response.prediccion.dia[0].temperatura.minima;
        let icon_DOM = document.getElementById("api_icon");
        icon_DOM.setAttribute('data-icon', response.prediccion.dia[0].estado_cielo[2]);
        return response;
    });
}
let url_tiempo = new URL('https://www.el-tiempo.net/api/json/v1/provincias/08/municipios/08019/weather');
fetchTiempo(url_tiempo).catch(error => { console.error(error); });
