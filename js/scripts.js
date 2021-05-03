
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=493';

  //function to add additional Pokemon to the pokemon list
  function add(pokemon) {

    //Checks if input is an object
    if(typeof(pokemon) !== "object") {
      return alert("Please write a Pokemon as an object");
     }
    else {pokemonList.push(pokemon)};
     }

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

  let modalContainer = document.querySelector(".modal");

  /*Function to set all data for modal, including functions to select the previous pokemon and the next pokemon.
  The hide modal function is still here as it provides a way to remove the event listeners from the previous and 
  next pokemon functions.  Bootstrap takes care of actually hiding the modals.
  */
  function showModal(title, number, image, height, weight, hp, attack, defense, spAtk, spDef, speed ,type1, type2) {

    // Select the previous and next buttons
    let nextPokemon = document.querySelector(".next-pokemon");
    let previousPokemon = document.querySelector(".previous-pokemon");
    
    //function to add Event listener to previous pokemon button, then remove once triggered
    function previousPkmn() {
      wantedIndexNumber = number - 2;
      if(wantedIndexNumber < 0) {
        return;
      }
      wantedIndex = pokemonList[wantedIndexNumber];
      showDetails(wantedIndex);
      wantedIndex = "";
      removeListeners();
    }
    
    previousPokemon.addEventListener("click", previousPkmn);
    
    //function to add Event listener to next pokemon button, then remove once triggered
    function nextPkmn() {
      wantedIndexNumber = number;
      if(wantedIndexNumber > 492) {
        return;
      }
      wantedIndex = pokemonList[wantedIndexNumber];
      showDetails(wantedIndex);
      wantedIndex = "";
      removeListeners();
      }
        nextPokemon.addEventListener("click", nextPkmn)


    //Add the Pokemons number
    let pokemonNumber = document.querySelector(".pokemon-number")
    pokemonNumber.innerText = ""
    pokemonNumber.innerText = "#" + number

    //Clear previous title, set new title
    let modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = ""
    capitalizedLetter = title.charAt(0).toUpperCase();
    modalTitle.innerText = capitalizedLetter + title.slice(1);

    //empty modal body HTML
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = ''

    //append an image to the body first
    let imageUrl = document.createElement('img');
    imageUrl.classList.add('pokemon-image');
    imageUrl.src = image;

    //element for content
    let pokemonContent = document.createElement('div');
    pokemonContent.classList.add('pokemon-content');
    let informationSetOne = document.createElement('div');
    let informationSetTwo = document.createElement('div');
    let typeOneElement = document.createElement('p');
    typeOneElement.innerText = 'Type 1: ' + type1;

    //set color for type1
    chooseButtonClass(type1, typeOneElement);
    let typeTwoElement = document.createElement('p');
    typeTwoElement.innerText = 'Type 2: '+ type2;

    //set color for type2
    chooseButtonClass(type2, typeTwoElement);
    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight: ' + weight + "kg";
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + height + "m";
    let statsList = document.createElement('ul');
    let hpElement = document.createElement('li');
    hpElement.innerText = 'HP: ' + hp;
    let attackElement = document.createElement('li');
    attackElement.innerText = 'Attack: ' + attack;
    let defenseElement = document.createElement('li');
    defenseElement.innerText = 'Defense: ' + defense;
    let spAtkElement = document.createElement('li');
    spAtkElement.innerText = 'SpAtk: ' + spAtk;
    let spDefElement = document.createElement('li');
    spDefElement.innerText = 'SpDef: ' + spDef;
    let speedElement = document.createElement('li');
    speedElement.innerText = 'speed: ' + speed;

    //append all created items
    modalBody.appendChild(imageUrl);
    modalBody.appendChild(pokemonContent);
    pokemonContent.appendChild(informationSetOne);
    informationSetOne.appendChild(typeOneElement);
    if(type2) {
      informationSetOne.appendChild(typeTwoElement);
    }
    informationSetOne.appendChild(weightElement);
    informationSetOne.appendChild(heightElement);
    pokemonContent.appendChild(informationSetTwo);
    informationSetTwo.appendChild(statsList);
    statsList.appendChild(hpElement);
    statsList.appendChild(attackElement);
    statsList.appendChild(defenseElement);
    statsList.appendChild(spAtkElement);
    statsList.appendChild(spDefElement);
    statsList.appendChild(speedElement);

    //Basically a function to remove event listeners at this point
    function removeListeners () {
      nextPokemon.removeEventListener("click", nextPkmn);
      previousPokemon.removeEventListener("click", previousPkmn);
    }

    //select close button
    let closeButton = document.querySelector(".close-button-one");
    closeButton.addEventListener('click', removeListeners);

    let closeButtonTwo = document.querySelector(".close-button-two");
    closeButtonTwo.addEventListener('click', removeListeners);


    window.addEventListener('keydown', function(e) {
      if(e.key === 'Escape'){
        removeListeners();
      }
    })
  
    modalContainer.addEventListener('click', function(e) {
      let target = e.target;
      if(target === modalContainer) {
        removeListeners();
      }
    })

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

  //Search for pokemon by name in a serach bar
  let searchInput = document.querySelector("#search-pokemon")
  searchInput.addEventListener("input", function() {
    let inputValue = searchInput.value;
    let displayedPokemon = document.querySelectorAll(".listButton");
    displayedPokemon.forEach(function(button) {
      let text = button.innerText.toUpperCase();
      if(text.startsWith(inputValue.toUpperCase())) {
        button.style.display='';
      }
      else{
        button.style.display="none";
      }
      }
    )
  })

  //function to load the specific details for a given pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      //List of details for each Pokemon I want to provide
      item.id = details.id
      item.height = (details.height)/10;  
      item.imageUrl = details.sprites.front_default;
      item.hp = details.stats[0].base_stat;
      item.attack = details.stats[1].base_stat;
      item.defense = details.stats[2].base_stat;
      item.spAtk = details.stats[3].base_stat;
      item.spDef = details.stats[4].base_stat;
      item.speed = details.stats[5].base_stat;
      item.weight = (details.weight)/10;
      item.type1 = details.types[0].type.name;
      //determine if there are two types
      if (details.types[1]) {
      item.type2 = details.types[1].type.name;
      }
    }).catch(function (e) {
      console.log(e);
    })
  }

  //sets color around types of Pokemon
  function chooseButtonClass (type, element) {
    let newClass;
    let typeArray = ["bug","dark","dragon","electric","fairy","fighting","fire","flying"
    ,"ghost","grass","ground","ice","normal","poison", "psychic", "rock", "steel", "water"];
    for(let i = 0; i < typeArray.length; i++) {
      if(type === typeArray[i]) {
        newClass = type + "Button";
        break;
      }
    }
    element.classList.add(newClass);
    element.classList.add("allType");
  }

  // function to give access to the pokemonList outside of this IIFE
  function getAll() {
    return pokemonList;
  }

  //function to add event listener to pokemon buttons
  //"showDetails" function is wrapped in another function to prevent being called immediately
  function addListener(element, object) {
    element.addEventListener("click", function() {
      showDetails(object);
    })};
  
  //log a pokemon to the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
    showModal(pokemon.name, pokemon.id, pokemon.imageUrl , pokemon.height, pokemon.weight, pokemon.hp, pokemon.attack, pokemon.defense, 
      pokemon.spAtk, pokemon.spDef, pokemon.speed, pokemon.type1, pokemon.type2);
    console.log(pokemon);
  })}

  function addListItem(pokemon) {
    //assign a name to each list item
    let name = pokemon.name;
  
    //create the list of Pokemon
    let  list = document.querySelector('.pokemon-list');
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = name;
    pokemonButton.setAttribute("type", "button");
    pokemonButton.setAttribute("data-bs-toggle", "modal");
    pokemonButton.setAttribute("data-bs-target", ".pokemonModal");
    let index = pokemonList.indexOf(pokemon);
    if(index < 151) {
      pokemonButton.classList.add("button1");
    } else if(index > 150 && index <= 250) {
      pokemonButton.classList.add("button2");
    } else if(index > 250 && index <= 385) {
      pokemonButton.classList.add("button3");
    } else if(index > 385) {
      pokemonButton.classList.add("button4");
    } 
    pokemonButton.classList.add("col");
    pokemonButton.classList.add("listButton");
    pokemonButton.classList.add("button");
    pokemonButton.classList.add("hidden");
    list.appendChild(pokemonButton);
    addListener(pokemonButton, pokemon);
  }

  //return the functions to give access to them
  return {
    getAll: getAll,
    add: add,
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
