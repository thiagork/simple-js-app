var pokemonRepository = (function () {
    var repository = [
        {name: "Pikachu", height: 0.4, types: ["electric"]}, 
        {name: "Charmander", height: 0.6, types: ["fire"]},
        {name: "Magikarp", height: '0.9', types: ["water"]}];
    

    function getAll () {
        return repository;
    }


    function add (pokemon) {
        repository.push(pokemon);
    }    


    function addListItem (pokemonName) {
        // Creates and appends the list item
        var $newListItem = document.createElement("li");
        var $appendNewListItem = document.querySelector(".pokemon-list");
        $newListItem.setAttribute("class", "pokemon-list__item");
        $appendNewListItem.appendChild($newListItem);

        // Creates and appends the button to the newly created list item
        var $newButtonInsideListItem = document.createElement("button");
        $newButtonInsideListItem.setAttribute("class", "pokemon-list__item__button");
        var $appendNewButtonInsideListItem = document.querySelector(".pokemon-list__item:last-child");
        $newButtonInsideListItem.innerText = pokemonName;
        $appendNewButtonInsideListItem.appendChild($newButtonInsideListItem);

        // Adds event listener to the list item
        $newButtonInsideListItem.addEventListener("click", element =>{
            var $clickedButton = element.target;
            showDetails($clickedButton.innerText)
        })
    }


    function showDetails(pokemonName) {
        
        var pokemon = repository.filter(element => {
            return element.name === pokemonName;
        });
        pokemon.map(element => {
            console.log(element);
        });
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
}) ();


pokemonRepository.getAll().forEach(element => {
    // Shows every pokemon inside repository in the app
    pokemonRepository.addListItem(element.name);
});