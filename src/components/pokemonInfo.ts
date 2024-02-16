// Import necessary modules
import { fetchPokemonInfo } from '../api/pokeApi';
import { getTypeColor } from '../utility';
import '../styles/_pokemonInfo.scss';
import { searchMenu } from './searchMenu';

// Main app element
const app = document.querySelector<HTMLDivElement>("#app")!;

// Type icons mapping
const typeIcons: Record<string, string> = {
    normal: '/normal.svg',
    fire: '/fire.svg',
    water: '/water.svg',
    electric: '/electric.svg',
    grass: '/grass.svg',
    ice: '/ice.svg',
    fighting: '/fighting.svg',
    poison: '/poison.svg',
    ground: '/ground.svg',
    flying: '/flying.svg',
    psychic: '/psychic.svg',
    bug: '/bug.svg',
    rock: '/rock.svg',
    ghost: '/ghost.svg',
    dragon: '/dragon.svg',
    dark: '/dark.svg',
    steel: '/steel.svg',
    fairy: '/fairy.svg',
};

// Pokémon info function
export function pokemonInfo() {
    // Create the main Pokémon info container
    const pokemonInfoCont: HTMLDivElement = document.createElement("div");
    const pokNav: HTMLElement = document.createElement('nav')
    pokNav.classList.add('pokNav')
    pokemonInfoCont.classList.add("pokemon-info-cont");

    // Create the back button
    const backButton: HTMLImageElement = document.createElement("img");
    backButton.src = "/left-arrow.svg";
    backButton.alt = "Back";
    backButton.classList.add("back-button");
    backButton.addEventListener('click', navigateBackToSearchMenu);

    // Create the Pokémon container
    const pokemonCont: HTMLDivElement = document.createElement("div");
    pokemonCont.classList.add("pokemon-cont");

    // Display Pokémon name
    const pokemonName: HTMLParagraphElement = document.createElement("p");
    pokemonName.id = "pokemonName";  // Set an ID for easy access
    pokemonCont.appendChild(pokemonName);

    // Display Pokémon sprite
    const spriteCont: HTMLDivElement = document.createElement("div");
    spriteCont.classList.add("spriteCont");
    const sprite: HTMLImageElement = document.createElement("img");
    sprite.id = "pokemonSprite";  // Set an ID for easy access
    sprite.classList.add("pokemon-sprite");
    spriteCont.appendChild(sprite);
    pokemonCont.appendChild(spriteCont);

    // Display Pokémon types
    const pokemonTypeCont: HTMLDivElement = document.createElement("div");
    pokemonTypeCont.classList.add("pokemon-type-cont");

    // Display Pokémon stats
    const pokemonInfoDiv: HTMLDivElement = document.createElement("div");
    pokemonInfoDiv.classList.add("pokemon-info");

    // Add elements to the main container
    pokemonInfoCont.append(backButton, pokemonCont);

    // Function to display Pokémon info
    function displayPokemonInfo(pokemonInfo: any) {
        // Clear previous content
        pokemonCont.innerHTML = '';
        pokemonTypeCont.innerHTML = ''; // Clear types before adding new ones

        // Set Pokémon name
        pokemonName.innerText = ` ${pokemonInfo.name}`;

        // Set Pokémon description
        const description: HTMLParagraphElement = document.createElement("p");
        description.innerText = `Description: ${pokemonInfo.description}`;
        pokemonCont.appendChild(description);

        // Set Pokémon sprite
        sprite.src = pokemonInfo.spriteUrl;
        sprite.alt = `${pokemonInfo.name} sprite`;

        // Add your logic for displaying types with SVG icons
        const types: string[] = pokemonInfo.types || [];
        const spriteContStyle: CSSStyleDeclaration = spriteCont.style;

        if (types.length === 1) {
            // If there is only one type, set a solid background color
            spriteContStyle.backgroundColor = getTypeColor(types[0]);

            // Display type with icon
            displayType(types[0]);
        } else if (types.length > 1) {
            // If there are multiple types, create a gradient background
            const gradient = `linear-gradient(to right, ${types.map(type => getTypeColor(type)).join(', ')})`;
            spriteContStyle.background = gradient;

            // Display each type with icon
            types.forEach(type => displayType(type));
        }

        // Set Pokémon stats
        const health: HTMLElement = document.createElement("p");
        health.innerText = `HP: ${pokemonInfo.health}`;
        const defense: HTMLElement = document.createElement("p");
        defense.innerText = `Defense: ${pokemonInfo.defense}`;
        const attack: HTMLElement = document.createElement("p");
        attack.innerText = `Attack: ${pokemonInfo.attack}`;
        const specialAttack: HTMLElement = document.createElement("p");
        specialAttack.innerText = `Special Attack: ${pokemonInfo.specialAttack}`;
        const specialDefense: HTMLElement = document.createElement("p");
        specialDefense.innerText = `Special Defense: ${pokemonInfo.specialDefense}`;

        pokemonInfoDiv.append(description, health, defense, attack, specialAttack, specialDefense);
        spriteCont.append(pokemonName)
        pokNav.append(backButton)
        pokemonCont.append(pokNav, spriteCont, pokemonTypeCont, pokemonInfoDiv);
        app.append(pokemonInfoCont);
    }

    function displayType(type: string) {
        const typeElement: HTMLDivElement = document.createElement("div");
        typeElement.classList.add("type");
        typeElement.innerText = type;

        // Set background color based on type
        typeElement.style.backgroundColor = getTypeColor(type);

        // Set SVG icon based on type
        const typeIcon: HTMLImageElement = document.createElement("img");
        typeIcon.src = typeIcons[type] || '/default.svg';
        typeElement.appendChild(typeIcon);
        pokemonTypeCont.appendChild(typeElement);
    }

    function navigateBackToSearchMenu() {
        // Remove the entire Pokémon info container
        pokemonInfoCont.remove();

        // Call your function to display the search menu
        searchMenu();
    }

    // Return the display function for external use
    return displayPokemonInfo;
}
    