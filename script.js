let currentIndex = 1; // ID inicial del Pokémon (PokéAPI usa IDs numéricos)

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        const pokemon = await response.json();
        return {
            name: pokemon.name,
            gender: "Desconocido", // La API no proporciona género directamente
            nature: "Desconocida", // Naturaleza no disponible en este endpoint
            ability: pokemon.abilities[0]?.ability.name || "Ninguna",
            type: pokemon.types.map(typeInfo => typeInfo.type.name).join(", "),
            image: pokemon.sprites.front_default || "https://via.placeholder.com/150"
        };
    } catch (error) {
        console.error(error);
        return null; // Retorna null si no se puede obtener el Pokémon
    }
}

async function loadPokemon(index) {
    const pokemon = await fetchPokemon(index);
    if (pokemon) {
        document.getElementById('pokemon-name').textContent = pokemon.name;
        document.getElementById('pokemon-gender').textContent = pokemon.gender;
        document.getElementById('pokemon-nature').textContent = pokemon.nature;
        document.getElementById('pokemon-ability').textContent = pokemon.ability;
        document.getElementById('pokemon-type').textContent = pokemon.type;
        document.getElementById('pokemon-image').src = pokemon.image;
    } else {
        document.getElementById('pokemon-name').textContent = "Pokémon no encontrado";
        document.getElementById('pokemon-image').src = "https://via.placeholder.com/150";
    }
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex++;
    loadPokemon(currentIndex);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentIndex > 1) currentIndex--;
    loadPokemon(currentIndex);
});

// Cargar el primer Pokémon al iniciar
loadPokemon(currentIndex);