import './styles/_colors.scss';
import './styles/_fonts.scss';
import './styles/_loadingscreen.scss';
import './styles/_pokemonInfo.scss';
import './styles/_search.scss';
import './styles/_mixins.scss';
import './styles/style.scss'
import { startLoading } from './components/loadingScreen';
import { getAllPokemon, getTotalPokemonCount } from './api/pokeApi';

async function main() {
  startLoading();

  // Fetch total number of Pokémon
  const totalPokemonCount = await getTotalPokemonCount();
  console.log(`Total number of Pokémon: ${totalPokemonCount}`);

  // Fetch and log the names of all Pokémon
  try {
    const allPokemonNames = await getAllPokemon();
    console.log('List of Pokémon:', allPokemonNames);
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
  }
}

main();