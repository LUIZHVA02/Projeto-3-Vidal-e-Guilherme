'use strict'

const body = document.getElementById("body")
const mudarTema = document.getElementById("mudarTema")
const main_container = document.getElementById("main-container")
const texto = document.getElementById("inputFraseOriginal")
const traducao = document.getElementById("traducao")
const creditoGUI = document.getElementById("creditoGUI")
const creditoVidal = document.getElementById("creditoVidal")

const microfone_in = document.getElementById("microfone_in");
const alto_falante_out = document.getElementById("alto_falante_out")
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
        let selected;
        if (select.className.includes("selectFrom") && country == "pt-BR") {
            selected = "selected";

        } else if (select.className.includes("selectTo") && country == "en-GB") {
            selected = "selected";
        }

        const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;

        select.insertAdjacentHTML("beforeend", option);
    }
});

function mudarTemaDarkPage() {
    body.classList.toggle('bodyDark')
    mudarTema.classList.toggle('sol')
    main_container.classList.toggle('dark-main-container')
    texto.classList.toggle('inputFraseOriginalDark')
    traducao.classList.toggle('traducaoDark')
    microfone_in.classList.toggle('microfone_in_dark')
    alto_falante_out.classList.toggle('alto_falante_out_dark')
    botao.classList.toggle('botaoDark')
    creditoGUI.classList.toggle('creditoGuiDark')
    creditoVidal.classList.toggle('creditoVidalDark')
}

function traducaoAPI() {
    if (texto.value.toLowerCase() == 'alice') {
        mudarTemaDarkPage()
    }
    
    fetch(
        `https://api.mymemory.translated.net/get?q=${texto.value}&langpair=${selects[0].value}|${selects[1].value}`
    )    
    .then((res) => res.json())
        .then((data) => {
            traducao.value = data.responseData.translatedText;
        });
    
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

    if(window.SpeechRecognition || window.
        webkitSpeechRecognition) {

            var SpeechRecognition = SpeechRecognition ||
            webkitSpeechRecognition;

            var recognition = new SpeechRecognition();

            microfone_in.addEventListener('click', function(e){
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

