import React, { useEffect, useState } from 'react';
export async function fetchPokemonDetails(url: string) {
    const response = await fetch(url);
    return await response.json();
}

// export async function fetchPokemonHabitat(url: string) {
//     const pokemonDetails = await fetchPokemonDetails(url);
//     return pokemonDetails.habitats.map((habitat: { habitat: { name: string } }) => habitat.name);
// }



export async function fetchTypesForPokemon(url: string) {
    const pokemonDetails = await fetchPokemonDetails(url);
    return pokemonDetails.types.map((type: { type: { name: string } }) => type.type.name);
}
