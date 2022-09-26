import { getPokemonName } from "./suggest.js";
import { showPokemonInfo } from "./modal.js";

// TARJETAS DE LOS POKEMON.

const pokedex = document.getElementById("pokedex");
const submit = document.getElementById("submit");
const reset = document.getElementById("back-btn");

// colores para los tipos de cada pokemon
export const colors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#781848",
  bug: "#A2FAA3",
  fairy: "#fc58cc",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#6F6F6F",
  default: "#2A1A1F",
};

export const main_types = Object.keys(colors);
// console.log(main_types);

// fetching de la api de pokemon por id
export const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json().catch((err) => notFoundError(err));

  // console.log(pokemon);
  createCard(pokemon);
  // showPokemonInfo(pokemon);
};

// en caso de que la request falle, se monstrara este modelo de error.
const notFoundError = (err) => {
  removeErrorCards();
  err = `Este pokemon no esta registrado...`;
  const errorElement = document.createElement("div");
  errorElement.classList.add("pokemonError");
  backtoTop.classList.add('active');
  backtoTop.innerHTML = `<i class="fas fa-arrow-left"></i>`;

  const errorInnerHTML = `
    <div class="img-container">
        <img src="images/errorPokemon.png"/>
    </div>
    <h3 class="name">${err}</h3>`;

  errorElement.innerHTML = errorInnerHTML;
  pokedex.appendChild(errorElement);

  window.removeEventListener('scroll', handleButton);
  resetButton();
};

// observeLastToLoad.observe(document.querySelector('.pokemon:last-child'))

const pokemonLimit = 152;
//Numero de pokemon que seran mostrados, limitado a la primera genracion.
const fetchPokemon = async () => {
  for (let i = 1; i <= pokemonLimit; i++) {
    await getPokemon(i);
    getPokemonName(i);
  }
};

fetchPokemon();

// esta funcion eliminara todos los elementos en pantalla de los pokemon.
const removePokemons = () => {
  const pokeElements = document.getElementsByClassName("pokemon");
  let removablePokemons = [];
  for (let i = 0; i < pokeElements.length; i++) {
    const element = pokeElements[i];
    removablePokemons = [...removablePokemons, element];
  }
  removablePokemons.forEach((remPoke) => remPoke.remove());
};

// funcion que remueve las cartas de errores generadas con anterioridad.
const removeErrorCards = () => {
    const pokeElements = document.getElementsByClassName("pokemonError");
    let removablePokemons = [];
    for (let i = 0; i < pokeElements.length; i++) {
      const element = pokeElements[i];
      removablePokemons = [...removablePokemons, element];
    }
    removablePokemons.forEach((remPoke) => remPoke.remove());
  };

// evento maneja lo que este en el input de texto
submit.addEventListener("click", (e) => {
  
  e.preventDefault();
  const input = document.getElementById("search-poke").value;
  removePokemons();
  removeErrorCards();
      fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`)
      .then((data) => data.json())
      .then((response) => createCard(response)) 
      .catch ((err) => notFoundError(err)); 
      backtoTop.classList.add('active');
      backtoTop.innerHTML = `<i class="fas fa-arrow-left"></i>`; 
      window.removeEventListener('scroll', handleButton); 
      resetButton();
})

const observer = new IntersectionObserver((entries) => {
  entries.forEach(
    (entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    }
  )
});

// funcion de creacion de la tarjeta de cada pokemon
export function createCard(pokemon) {
  const pokeCard = document.querySelectorAll(".pokemon");
  const pokeElement = document.createElement("div");
  pokeElement.classList.add("pokemon");

  const type = pokemon.types.map((el) => el.type.name);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const type_color = pokemon.types[0].type.name;
  const index = pokemon.id.toString().padStart(3, "0");
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index}.png`;
  const bgColor = colors[type_color];

  pokeElement.style.background = bgColor;

  const pokeInnerHTML = `
    <div class="img-container">
    <img loading="lazy" src="${image}"/>
    </div>
    <div class="info-container" id="info">
    <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
    <h3 class="name">${name}</h3>
    <span class="type">Type: ${type.slice(0, 1).toString()}</span>
    <span class="type">${type.slice(1, 2).toString()}</span>
    </div>
    
    `;
  pokeElement.innerHTML = pokeInnerHTML;
  pokedex.appendChild(pokeElement);
  pokeCard.forEach((card) => {
    observer.observe(card);
  });
  observer.observe(document.querySelector('.pokemon'))

  pokeElement.addEventListener("click", () => showPokemonInfo(pokemon));
}

//funcion para cambiar el comportamiento del boton de regresar al inicio.
const resetButton = () => {
  reset.addEventListener("click", () => {
    location.reload();
  });
};

// boton para regresar al principio de la pagina.
const backtoTop = document.querySelector(".back-btn");

function handleButton () {
    window.scrollY > 300
    ? backtoTop.classList.add("active")
    : backtoTop.classList.remove("active");
}

window.addEventListener("scroll", handleButton);
