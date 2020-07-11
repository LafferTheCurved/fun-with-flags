class Country{
    constructor(codigo, nombre){
        this.codigo = codigo;
        this.nombre = nombre;
    }

    getLink(){
        return `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${this.codigo}.png`;
    }

    getNombre(){
        return this.nombre;
    }

}

let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;

// PAISES
argentina = new Country("ar", "Argentina");
brasil = new Country("br", "Brasil");
chile = new Country("cl", "Chile");
uruguay = new Country("uy", "Uruguay");
paraguay = new Country("py", "Paraguay");
bolivia = new Country("bo", "Bolivia");
colombia = new Country("co", "Colombia");
ecuador = new Country("ec", "Ecuador");
guyana = new Country("gy", "Guyana");
peru = new Country("pe", "Peru");
surinam = new Country("sr", "Surinam");
venezuela = new Country("ve", "Venezuela");
antiguaYBarbuda = new Country("ag", "Antigua y Barbuda");
trinidadYTobago = new Country("tt", "Trinidad y Tobago");
panama = new Country("pa", "Panama");

// DOM
let bandera = document.querySelector(".bandera");
let listaDeBotones = document.querySelectorAll("button");
let contadorCorrectas = document.querySelector(".correctas");
let contadorIncorrectas = document.querySelector(".incorrectas");


const paisesCopia = [argentina, brasil, chile, uruguay, paraguay, bolivia, colombia, ecuador, guyana, peru, surinam, venezuela, antiguaYBarbuda, trinidadYTobago, panama];

let respuestaCorrecta;
let index = 0;

// FUNCIONES
function cambiarBandera(pais){
    bandera.innerHTML = `<img src="${pais.getLink()}" alt=""></img>`;
}

function shuffle(array){
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function generarOpciones(array){
    array = shuffle(array);
    return array.slice(0,4);
}

function generarRespuesta(){
    return Math.floor(Math.random()*3);
}

function cambiarOpciones(opciones) {
   for(let i = 0; i < listaDeBotones.length; i++){
       listaDeBotones[i].textContent = opciones[i].nombre;
   }
}

function cambiarBanderaYOpciones(paises, respuesta){
    opciones = generarOpciones(paises);
    cambiarOpciones(opciones);
    cambiarBandera(opciones[respuesta]);
}

function eliminarEventListeners(){
    listaDeBotones.forEach(boton => {
        boton.removeEventListener("click", eventListener);
        
    });
}

function generarEventListeners(respuesta){
    listaDeBotones.forEach(boton => {
        boton.addEventListener("click", eventListener);
        index += 1;
    });
}

function eventListener(e){
    if(e.target.textContent === listaDeBotones[respuestaCorrecta].textContent){
        e.target.style.backgroundColor = "green";
        respuestasCorrectas += 1;
        contadorCorrectas.textContent = parseInt(respuestasCorrectas);
    }else{
        e.target.style.backgroundColor = "red";
        listaDeBotones[respuestaCorrecta].style.backgroundColor = "green";
        respuestasIncorrectas += 1;
        contadorIncorrectas.textContent = parseInt(respuestasIncorrectas);
    }
    eliminarEventListeners();

    setTimeout(function () {
        nuevaPregunta();
    }, 750);
}

function nuevaPregunta(){
    paises = paisesCopia;
    listaDeBotones.forEach(boton => {
        boton.style.backgroundColor = "#5f5f5f";
    });
    respuestaCorrecta = generarRespuesta();
    cambiarBanderaYOpciones(paises, respuestaCorrecta);
    generarEventListeners(respuestaCorrecta);
}

function main(){
    nuevaPregunta();
}

main();

/* function generarEventListeners(respuesta){
    let index = 0;
    listaDeBotones.forEach(boton => {
        boton.addEventListener("click", () => {
            if(listaDeBotones[respuesta].textContent === boton.textContent){
                //boton.style.backgroundColor = "green";
                respuestasCorrectas += 1;
                contadorCorrectas.textContent = parseInt(respuestasCorrectas);
                //pointerEvents();
                nuevaPregunta();
            }else{
                //boton.style.backgroundColor = "red";
                //listaDeBotones[respuesta].style.backgroundColor = "green";
                respuestasIncorrectas += 1;
                contadorIncorrectas.textContent = parseInt(respuestasIncorrectas);
                //pointerEvents();
                nuevaPregunta();
            }
        });
        index += 1;
    });
} */
