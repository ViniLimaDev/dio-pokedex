
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');
const maxRecords = 151;
const limit = 5;
let offset = 0;

function loadPokemonItems(offset, limit) {

    pokeApi.getPokemons(offset, limit)
    .then(pokemons => {
        pokemons.forEach(pokemon => {
            const listItem = document.createElement('li');
            listItem.id = pokemon.name;
            listItem.className = `pokemon ${pokemon.type}`;
            listItem.innerHTML =  `
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                    
                </div>
            `;

            listItem.addEventListener('click', () => {
                window.location.href = `pokemon-info.html?name=${pokemon.name}`;
            })

            pokemonList.appendChild(listItem);
        });
    })
}




loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const recordsNextPage = offset + limit;

    if (recordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }
    else{
        loadPokemonItems(offset, limit);
    }

})