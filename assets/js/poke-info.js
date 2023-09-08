const backButton = document.getElementById('goBack');
const pokemonDisplay = document.getElementById('pokemon-display');

function getPokemonNameFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('name');
}

function displayPokemon(pokemon) {

    const pokemonView = document.createElement('div');
    pokemonView.innerHTML = `
    <div class="pokemon-view ${pokemon.type}">
                <span class="name">${pokemon.name}</span>
                <span class="number">${pokemon.number}</span>
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
            <div class="pokemon-data">
                <span>Weight: ${pokemon.weight}</span>
                <span>Height: ${pokemon.height}</span>
            </div>
            `;

    pokemonDisplay.appendChild(pokemonView);
}

const pokeName = getPokemonNameFromURL();

const pokemon = pokeApi.getPokemonDetailByName(pokeName)
    .then(pokemon => {
        displayPokemon(pokemon);
    });


backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});