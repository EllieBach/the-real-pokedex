import { fetchPokemonInfo } from '../api/pokeApi';
import { pokemonInfo } from './pokemonInfo';

export function searchMenu() {
  const app = document.querySelector<HTMLDivElement>("#app")!;

  const searchMenucont: HTMLDivElement = document.createElement('div');
  searchMenucont.classList.add('searchMenucont');

  const screen: HTMLDivElement = document.createElement('div');
  screen.classList.add('screen');

  const wrap: HTMLDivElement = document.createElement('div');
  wrap.classList.add('wrap');

  const searchTitle: HTMLHeadingElement = document.createElement('h1');
  searchTitle.classList.add('searchTitle');
  searchTitle.innerText = 'What Pokémon are you searching for?';
  const search: HTMLInputElement = document.createElement('input');
  search.id = 'searchInput'; 
  search.placeholder = 'Enter Pokémon name';

  const searchButton: HTMLButtonElement = document.createElement('button');
  searchButton.classList.add('searchButton');
  searchButton.addEventListener('click', handleSearch);

  const errorWrap: HTMLDivElement = document.createElement('div');
  errorWrap.classList.add('errorWrap');
  const errorText: HTMLParagraphElement = document.createElement('p');
  errorText.classList.add('error-text');
  errorText.style.display = 'none'; //hide error text
const pikaError: HTMLImageElement = document.createElement('img');
pikaError.classList.add('pikaError');
pikaError.src = "/surprised-pikachu-meme.svg";
pikaError.alt = "Pikachu surprised face";
pikaError.style.display = 'none';  //hide pikachu



function handleSearch() {
    const searchTerm = search.value.trim().toLowerCase();

    if (searchTerm !== '') {
        

        fetchPokemonInfo(searchTerm)
            .then(pokemonInfoData => {
               
                errorText.style.display = 'none';
                pikaError.style.display = 'none';

               
                app.innerHTML = "";
                pokemonInfo()(pokemonInfoData); 
            })
            .catch(error => {
               
                errorText.innerText = 'Pokemon not found. Please try again.';
                errorText.style.display = 'block';
                pikaError.style.display = 'block';

                console.error('Error fetching Pokemon information:', error);
            })
            .finally(() => {
              
            });
    }
}


  
  wrap.append( search, searchButton );
  errorWrap.append(errorText, pikaError)
  searchMenucont.append(searchTitle,wrap, errorWrap);
  screen.append(searchMenucont)
  app.append(searchMenucont);
}
