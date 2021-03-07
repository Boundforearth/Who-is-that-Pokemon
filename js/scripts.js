
let pokemonRepository = (function() {
  //static list of Pokemon objects 
  let pokemonList = [
  {
    name: "Clefairy",
    types: ["Fairy"],
    height: 0.6,
    weight: 7.5,
    baseStats: {
      hp: 70,
      attack: 45,
      defense: 48,
      speed: 35,
      spAtk: 60,
      spDef: 65
    }
  },
  {
    name: "Ghastly",
    types: ["Ghost", "Poison"],
    height: 1.3,
    weight: 0.1,
    baseStats: {
      hp: 30,
      attack: 35,
      defense: 30,
      speed: 80,
      spAtk: 100,
      spDef: 35
    }
  },
  {
    name: "Porygon",
    types: ["Normal"],
    height: 0.8,
    weight: 36.5,
    baseStats: {
      hp: 65,
      attack: 60,
      defense: 70,
      speed: 40,
      spAtk: 85,
      spDef: 75
    }
  }
];

// function to give access to the pokemonList outside of this IIFE
  function getAll() {
    return pokemonList;
  }

  //function to add additional Pokemon to the pokemon list
  function add(pokemon) {

    //Checks if input is an object
    if(typeof(pokemon) !== "object") {
      return alert("Please write a Pokemon as an object");
    }

    //sorts and turns array content into strings to check validity of keys.
    else if (Object.keys(pokemon).sort().join(" ") !== Object.keys(pokemonList[0]).sort().join(" ")) {
      return alert("Please enter a valid Pokemon (name, types, height, weight, baseStats)");
    }

    // check that proper keys have been used for all the base stats
    else if (Object.keys(pokemon.baseStats).sort().join(" ") !== Object.keys(pokemonList[0].baseStats).sort().join(" "))  {
      return alert("Please enter valid base stats (hp, attack, defense, speed, spAtk, spDef)")
    }

    else {pokemonList.push(pokemon)};
  }
  


  function findPokemon(pokemon) {
    let foundPokemon = pokemonList.filter(function(element){
      return element.name.toUpperCase() === pokemon.toUpperCase()
    });
    return foundPokemon;
    }

  function addListItem(pokemon) {
    //varuables for pokemon object
    let name = pokemon.name;
    let type1 = pokemon.types[0];
    let type2 = pokemon.types[1];
    let height = pokemon.height;
    let weight = pokemon.weight
    let hp = pokemon.baseStats.hp
    let attack = pokemon.baseStats.attack
    let defense = pokemon.baseStats.defense
    let speed = pokemon.baseStats.speed
    let spAtk = pokemon.baseStats.spAtk
    let spDef = pokemon.baseStats.spDef
  
    //create the list of Pokemon
    let list = document.querySelector('ul');
    let listItem = document.createElement('li');
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = name;
    pokemonButton.classList.add("button")
    listItem.appendChild(pokemonButton);
    list.appendChild(listItem);
    
  }

  //some future unknown use
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  //return the functions to give access to them
  return {
    getAll: getAll,
    add: add,
    findPokemon: findPokemon,
    addListItem: addListItem
  };
}());


pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
