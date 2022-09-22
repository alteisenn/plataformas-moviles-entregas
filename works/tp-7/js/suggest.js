let search = document.getElementById('search-poke');
const autoList =  document.getElementById('list'); 
const pokeNames = [];


export const getPokemonName =  (id) => {
    // se hace fetch de la api nuevamente para obtener los nombres de los pokemon, y hacerles push a un array vacio.
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {
        pokeNames.push(data.name.toString())
        // console.log(pokeNames);
    })
    .catch(err => console.log(err));
    return pokeNames;
}

search.addEventListener('input', (e) =>{
    // evento que registra que el input de la barra de texto
    let namesArray = []; // variable para introducir los nombres filtrados

    if(e.target.value){
        namesArray = pokeNames.filter(name => 
            name.toLowerCase().includes(e.target.value));
            namesArray = namesArray.map(name => `<li>${name}</li>`)
            // se filtran los nombres del array pokeNames que coincidan con los valores actuales del input de texto
    }

    showPokemonName(namesArray);
});

function showPokemonName(namesArray) {
    // funcion que valida que el texto exista y por lo tanto se deba mostrar dentro  de la lista
    if(namesArray === undefined){
        namesArray = [];
    }
    const html = !namesArray.length ? '' : namesArray.join(' ');
    autoList.innerHTML = html;
    
}


  autoList.addEventListener("click", (e) => {
      //evento click que va a psar el valor de la lista al input
    if (e.target && e.target.nodeName == "LI") {
 
      search.value = e.target.innerHTML;
      showPokemonName();
      //se vuelve a pasar esta funcion con argumento vacio para hacer desaparecer las listas al dar click.
    }
  });