'use strict'

const body = document.getElementById("body")
const mudarTema = document.getElementById("mudarTema")
const main_conta = document.getElementById("main-container")
const texto = document.getElementById("inputFraseOriginal")
const traducao = document.getElementById("traducao")
const creditoGUI = document.getElementById("creditoGUI")
const creditoVidal = document.getElementById("creditoVidal")

const botao = document.getElementById("botao")
const selects = document.querySelectorAll("select")
const selectTo = document.getElementById("selectTo")
const selectFrom = document.getElementById("selectFrom")

const countries = {
    "en-GB": "Inglês",
    "pt-BR": "Português",
    "it-IT": "Italiano",
    "fr-FR": "Francês",
    "es-ES": "Espanhol"
};

selects.forEach((select) => {
    for (let country in countries) {
        const option = document.createElement('option')

        option.value = country
        option.textContent = countries[country];
        select.appendChild(option)
    }
});

function mudarTemaDarkPage() {
    body.classList.toggle('bodyDark')
    mudarTema.classList.toggle('sol')
    main_conta.classList.toggle('dark-main-container')
    texto.classList.toggle('inputFraseOriginalDark')
    traducao.classList.toggle('traducaoDark')
    botao.classList.toggle('botaoDark')
    creditoGUI.classList.toggle('creditoGuiDark')
    creditoVidal.classList.toggle('creditoVidalDark')
}

function traducaoAPI() {
    fetch(
        `https://api.mymemory.translated.net/get?q=${texto.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
        .then((res) => res.json())
        .then((data) => {
            traducao.value = data.responseData.translatedText;
        });
    if (traducao.value.toLowerCase() == 'alice') {
        mudarTemaDarkPage()
    }
}

mudarTema.addEventListener('click', mudarTemaDarkPage)

botao.addEventListener("click", () => {
    if (texto.value) {
        traducaoAPI()
    } else {
        traducao.value = "";
    }
});

window.addEventListener('DOMContentLoaded', function(e){
    var botaoEscutar = document.querySelector('#botaoEscutar');

    if(window.SpeechRecognition || window.
        webkitSpeechRecognition) {

            var SpeechRecognition = SpeechRecognition ||
            webkitSpeechRecognition;

            var recognition = new SpeechRecognition();

            botaoEscutar.addEventListener('click', function(e){
                recognition.start();

                recognition.addEventListener('result', (event) =>{
                    texto.value = event.results[0][0].transcript
                    traducaoAPI()
                })

            })
    }else{
        alert('O navegador não suporta esta funcionalidade!!');
    }
},false);