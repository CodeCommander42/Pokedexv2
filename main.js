const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const pokemonInfo = document.getElementById('pokemon-info');

searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) return;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (response.status !== 200) {
        pokemonInfo.innerHTML = 'Pokémon not found!';
        return;
    }

    const pokemon = await response.json();
    displayPokemonInfo(pokemon);
});

function displayPokemonInfo(pokemon) {
    const { name, id, sprites, types } = pokemon;
    const typeNames = types.map(typeObj => typeObj.type.name).join(', ');

    pokemonInfo.innerHTML = `
        <h2>${name.charAt(0).toUpperCase() + name.slice(1)} (ID: ${id})</h2>
        <img src="${sprites.front_default}" alt="${name}">
        <p>Type: ${typeNames}</p>
    `;
}
