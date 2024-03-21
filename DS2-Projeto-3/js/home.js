'use strict'

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
    mudarTema.classList.toggle('sol')
    main_conta.classList.toggle('dark-main-container')
    texto.classList.toggle('inputFraseOriginalDark')
    traducao.classList.toggle('traducaoDark')
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
}

botao.addEventListener("click", () => {
    if (texto.value) {
        traducaoAPI();
    } else {
        traducao.value = "";
    }
});

mudarTema.addEventListener('click', mudarTemaDarkPage)