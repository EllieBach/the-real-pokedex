import axios from "axios";

interface Pokemon {
  name: string;
  spriteUrl: string;
  types: string[];
  health: number;
  defense: number;
  attack: number;
  specialAttack: number;
  specialDefense: number;
  description: string;
}

const baseURL = 'https://pokeapi.co/api/v2/';

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get(url);
    return response.data as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {} as T;
  }
}

async function getTotalPokemonCount(): Promise<number> {
  const response = await fetchData<{ count: number }>(`${baseURL}pokemon-species?limit=1`);
  return response.count || 0;
}

async function getAllPokemon(): Promise<string[]> {
  const totalPokemonCount = await getTotalPokemonCount();
  const response = await fetchData<{ results: { name: string }[] }>(`${baseURL}pokemon?limit=${totalPokemonCount}`);
  return response.results.map(pokemon => pokemon.name);
}

async function getPokemonSprite(pokemonName: string): Promise<string> {
  const response = await fetchData<{ sprites: { front_default: string } }>(`${baseURL}pokemon/${pokemonName}`);
  return response.sprites.front_default || '';
}

async function getPokemonType(pokemonName: string): Promise<string[]> {
  const response = await fetchData<{ types: { type: { name: string } }[] }>(`${baseURL}pokemon/${pokemonName}`);
  return response.types.map(type => type.type.name);
}
async function getPokemonDescription(pokemonName: string): Promise<string | null> {
  try {
    const response = await axios.get(`${baseURL}pokemon-species/${pokemonName.toLowerCase()}`);
    const speciesData = response.data;

    const englishText = speciesData.flavor_text_entries.find(
      (entry: { language: { name: string }; flavor_text: string }) =>
        entry.language.name === 'en'
    );

    if (englishText) {
      const description = englishText.flavor_text;
      console.log(`Description for ${pokemonName}:`, description);
      return description;
    } else {
      console.error(`No English description found for ${pokemonName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching description for ${pokemonName}:`, error);
    return null;
  }
}
async function fetchPokemonInfo(pokemonName: string): Promise<Pokemon> {
  try {
    const description = await getPokemonDescription(pokemonName);
    const rawData = await fetchData<any>(`${baseURL}pokemon/${pokemonName}`);
   

    return {
      ...parsePokemonInfo(rawData, description),
      description: description || 'No description available',
    };
  } catch (error) {
    console.error(`Error fetching Pokemon information: ${error}`);
    throw error;
    
  }
}

function parsePokemonInfo(rawData: any, description: string | null): Pokemon {
  return {
    name: rawData.name,
    spriteUrl: rawData.sprites.front_default,
    types: rawData.types.map((type: any) => type.type.name),
    health: rawData.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
    defense: rawData.stats.find((stat: any) => stat.stat.name === 'defense').base_stat,
    attack: rawData.stats.find((stat: any) => stat.stat.name === 'attack').base_stat,
    specialAttack: rawData.stats.find((stat: any) => stat.stat.name === 'special-attack').base_stat,
    specialDefense: rawData.stats.find((stat: any) => stat.stat.name === 'special-defense').base_stat,
    description: description || 'No description available',
    
  };
}

export {
  getTotalPokemonCount,
  getAllPokemon,
  getPokemonSprite,
  getPokemonType,
  fetchPokemonInfo,
};


