
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

  let modalContainer = document.querySelector('#modal-container');
  function showModal(title, image, weight, height, hp, attack, defense, spAtk, spDef, speed ,type1, type2) {
    //Clear previous content
    modalContainer.innerHTML = ''

    modalContainer.classList.add('is-visible');

    let modal = document.createElement('div');
    modal.classList.add('modal');


    //create a close button
    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', hideModal);

    let imageUrl = document.createElement('img');
    imageUrl.classList.add('pokemon-image');
    imageUrl.src = image;
    //create a title element
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

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
    weightElement.innerText = 'Weight: ' + weight;
    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + height;
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
    modal.appendChild(closeButton);
    modal.appendChild(titleElement);
    modal.appendChild(imageUrl);
    modal.appendChild(pokemonContent);
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
    modalContainer.appendChild(modal);
  }

  function hideModal () {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  })

  modalContainer.addEventListener('click', function(e) {
    let target = e.target;
    if(target === modalContainer) {
      hideModal();
    }
  })

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
      item.height = details.height;
      item.imageUrl = details.sprites.front_default;
      item.hp = details.stats[0].base_stat;
      item.attack = details.stats[1].base_stat;
      item.defense = details.stats[2].base_stat;
      item.spAtk = details.stats[3].base_stat;
      item.spDef = details.stats[4].base_stat;
      item.speed = details.stats[5].base_stat;
      item.weight = details.weight;
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

  //function to add additional Pokemon to the pokemon list
  function add(pokemon) {

    //Checks if input is an object
    if(typeof(pokemon) !== "object") {
      return alert("Please write a Pokemon as an object");
    }
    else {pokemonList.push(pokemon)};
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
    showModal(pokemon.name, pokemon.imageUrl , pokemon.height, pokemon.weight, pokemon.hp, pokemon.attack, pokemon.defense, 
      pokemon.spAtk, pokemon.spDef, pokemon.speed, pokemon.type1, pokemon.type2);
    console.log(pokemon);
  })}

  function addListItem(pokemon) {
    //assign a name to each list item
    let name = pokemon.name;
  
    //create the list of Pokemon
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add("listButton")
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = name;
    if(pokemonList.indexOf(pokemon) < 151) {
      pokemonButton.classList.add("button1");
    } else if(pokemonList.indexOf(pokemon) > 150 && pokemonList.indexOf(pokemon) <= 250) {
      pokemonButton.classList.add("button2");
    } else if(pokemonList.indexOf(pokemon) > 250 && pokemonList.indexOf(pokemon) <= 385) {
      pokemonButton.classList.add("button3");
    } else if(pokemonList.indexOf(pokemon) > 385) {
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
