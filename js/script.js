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


    return {
        add: add,
        getAll: getAll
    };
}) ();


pokemonRepository.getAll().forEach(element => {
    document.write(element.name + " (height: " + element.height + ")");
    if (element.height > 0.7) {
        document.write(" - Wow, that's big!");
    }
    document.write("<BR>" + "<BR>");
});