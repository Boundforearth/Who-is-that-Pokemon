
let pokemonRepository = (function() {
  let pokemonList = [
  {
    name: "Clefairy",
    types: ["Fairy"],
    baseStats: {
      hp: 70,
      attack: 45,
      defense: 48,
      speed: 35,
      spAtk: 60,
      spDef: 65
    },
    height: 0.6,
    weight: 7.5
  },
  {
    name: "Ghastly",
    types: ["Ghost", "Poison"],
    baseStats: {
      hp: 30,
      attack: 35,
      defense: 30,
      speed: 80,
      spAtk: 100,
      spDef: 35
    },
    height: 1.3,
    weight: 0.1
  },
  {
    name: "Porygon",
    types: ["Normal"],
    baseStats: {
      hp: 65,
      attack: 60,
      defense: 70,
      speed: 40,
      spAtk: 85,
      spDef: 75
    },
    height: 0.8,
    weight: 36.5
  }
];

  //function used to display all aspects of a Pokemon.  To but entered into a forEach loop.
  function displayPokemon(pokemon) {
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
  
    document.write(`<h3 class="${type1}">${name}: <br></h3>`);

    //Determine whether one or two types, then print text accordingly
    if (pokemon.types.length === 2) {
      document.write(`Types - ${type1}, ${type2} <br>`)
    }
    else {
      document.write(`Type - ${type1} <br>`)
    }

    //Add a special comment about the Pokemon's height.  1.2+ is large, .7- is small
    //<p> tag added to create more white space between the height and the comment
    if (height > 1.2){
      document.write(`Height - ${height}  <p class="size-comment">Wow, that's big!</p> <br>`)
    }
    else if (height > .7) {
      document.write(`Height - ${height}  <p class="size-comment">I'd say that's about average size.</p> <br>`)
    }
    else {
      document.write(`Height - ${height}  <p class="size-comment">That's a really small Pokemon!</p> <br>`)
    }

    //prints weight and base stats. div added to provide spacing on the left margin
    document.write(` Weight - ${weight} <br>
      Base Stats: <br>
      <div class="base-stats">HP - ${hp} <br>
      Attack - ${attack} <br>
      Defense - ${defense} <br>
      Speed - ${speed} <br>
      Special Attack - ${spAtk} <br>
      Special Defense - ${spDef} <br><br>
      </div>` );
  }

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add
  }
})();



