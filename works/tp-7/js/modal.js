import { colors } from "./script.js";

const modalContainer = document.getElementById("modal-container");
const modal = document.querySelector('.modal');
const modalHeader = document.querySelector(".modal-header");
const typesContainer = document.querySelector(".types");
const btnClose = document.getElementById("btn-close");
const pokeImg = document.getElementById("modal-img");
const pokeName = document.getElementById("name");
const pokeStats = document.getElementById("modal-stats");

const renderTypes = (pokemon) => {
    typesContainer.innerHTML = "";
    pokemon.types.forEach((type) => {
        const typeElement = document.createElement("span");
        typeElement.style.backgroundColor = colors[type.type.name];
        typeElement.innerText = type.type.name;
        typesContainer.appendChild(typeElement);
    });
};

export function showPokemonInfo(pokemon) {
    pokeStats.innerHTML = "";
    modalContainer.classList.add("show");
    modal.classList.add("show");
    modalHeader.style.background = colors[pokemon.types[0].type.name];
    btnClose.style.background = colors[pokemon.types[0].type.name];
    pokeImg.setAttribute("src", `${pokemon.sprites["front_default"]}`);
    pokeName.innerText = pokemon.name;

    renderTypes(pokemon);

    pokemon.stats.forEach((stat) => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("p");
        const statElementAmount = document.createElement("span");

        statElementName.innerText = stat.stat.name;
        statElementAmount.innerText = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
    btnClose.addEventListener("click", () => {
        modalContainer.classList.remove("show");
        modal.classList.remove("show");
    });
}


