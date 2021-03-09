
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=493';
  //Load a list of Pokemon names from the pokeapi
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      //turn response into json
      return response.json();
    }).then(function (json) {
      //name of array provided by api is results
      json.results.forEach( function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        }
        //push pokemon provided by api into pokemonList
        add(pokemon);
      })
    }).catch(function(e) {
        console.error(e);
      } )
  }

  //function to display pokemon based on which generation is chosen
  function chooseList () {
    let array = ["1", "2", "3", "4"];
    for(let i = 0; i < 4; i++) {
      let genEvent = document.getElementById("gen" + array[i]);
      genEvent.addEventListener('click', function(){
        //first hide all results because previous choice is unknown
        let hide = document.querySelectorAll(".button");
        hide.forEach(function(element) {
          element.classList.add("hidden");
        })
        //unhide the selected Pokemon
        let unhide = document.querySelectorAll(".button" + array[i]);
        unhide.forEach(function(element) {
          element.classList.remove("hidden");
        })
      })
    }
  }

  //function to load the specific details for a given pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      //List of details for each Pokemon I want to provide
      item.height = details.height;
      item.imageUrl = details.sprites.front_default;
      item.hp = details.stats[0].base_stat;
      item.attack = details.stats[1].base_stat;
      item.defense = details.stats[2].base_stat;
      item.spAtk = details.stats[3].base_stat;
      item.spDef = details.stats[4].base_stat;
      item.speed = details.stats[5].base_stat;
      item.type1 = details.types[0].type.name;
      //determine if there are two types
      if (details.types[1]) {
      item.type2 = details.types[1].type.name;
      }

      item.weight = details.weight;
    }).catch(function (e) {
      console.log(e);
    })
  }

  //currently obsolete function that would have added a class to apply a background color based on type
  //Maybe usable later, so left in 
  function chooseButtonClass (type) {
    let newClass;
    switch (type) {
      case "bug":
        newClass = "bugButton";
        break;
      
      case "dark":
        newClass = "darkButton";
        break;

      case "dragon":
        newClass = "dragonButton";
        break;

      case "electric":
        newClass = "electricButton";
        break;
        
      case "fairy":
        newClass = "fairyButton";
        break;
  
      case "fighting":
        newClass = "fightingButton";
        break;

      case "fire":
        newClass = "fireButton";
        break;
          
      case "flying":
        newClass = "flyingButton";
        break;
    
      case "ghost":
        newClass = "ghostButton";
        break;

      case "grass":
        newClass = "grassButton";
        break;
      
      case "ground":
        newClass = "groundButton";
        break;

      case "ice":
        newClass = "iceButton";
        break;

      case "normal":
        newClass = "normalButton";
        break;
      
      case "poison":
        newClass = "poisonButton";
        break;

      case "psychic":
        newClass = "psychicButton";
        break;
      
      case "rock":
        newClass = "rockButton";
        break;
        
      case "steel":
        newClass = "steelButton";
        break;
  
      case "water":
        newClass = "waterButton";
        break;
    }
    return newClass
  }

  //function to select color of the button
  function getButtonColor (button, type) {
    button.classList.add(chooseButtonClass(type));
  }

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
    else {pokemonList.push(pokemon)};
    }

  /*  Maybe do something with this later
  function findPokemon() {
    let input = document.getElementById("searchPokemon").value;
    let foundPokemon = pokemonList.filter(function(element){
     return element.name.toUpperCase() === 
      input.toUpperCase()
    });
    return foundPokemon;
    } */

  //function to add event listener to pokemon buttons
  //"showDetails" function is wrapped in another function to prevent being called immediately
  function addListener(element, object) {
    element.addEventListener("click", function(event) {
      showDetails(object);
    });
  }
  
  //log a pokemon to the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
    console.log(pokemon)});
  }

  function addListItem(pokemon) {
    //assign a name to each list item
    let name = pokemon.name;
  
    //create the list of Pokemon
    let list = document.querySelector('ul');
    let listItem = document.createElement('li');
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = name;
    if(pokemonList.indexOf(pokemon) < 151) {
      pokemonButton.classList.add("button1");
    } else if(pokemonList.indexOf(pokemon) > 150 && pokemonList.indexOf(pokemon) <= 250) {
      pokemonButton.classList.add("button2");
    } else if(pokemonList.indexOf(pokemon) > 250 && pokemonList.indexOf(pokemon) <= 385) {
      pokemonButton.classList.add("button3");
    } else if(pokemonList.indexOf(pokemon) > 386) {
      pokemonButton.classList.add("button4");
    } 
    pokemonButton.classList.add("button");
    pokemonButton.classList.add("hidden");
    listItem.appendChild(pokemonButton);
    list.appendChild(listItem);
    addListener(pokemonButton, pokemon);
  }


  //return the functions to give access to them
  return {
    getAll: getAll,
    add: add,
    findPokemon: findPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    chooseList: chooseList
  };
}());

pokemonRepository.chooseList();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {pokemonRepository.addListItem(pokemon)})
});
