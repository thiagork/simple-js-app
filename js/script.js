var programWrapper = (function () {
    var repository = [];
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    
    function getAll () {
        return repository;
    }
    
    
    function add (item) {
        repository.push(item);
    }    
    
    function addListItem (item, index) {
        // Creates and appends the list item
        var $newListItem = document.createElement("li");
        var $appendNewListItem = document.querySelector(".item-list");
        $newListItem.setAttribute("class", "item-list__item");
        $appendNewListItem.appendChild($newListItem);
        
        // Creates and appends the button to the newly created list item
        var $newButtonInsideListItem = document.createElement("button");
        $newButtonInsideListItem.setAttribute("class", "item-list__item__button");
        $newButtonInsideListItem.setAttribute("id", String(index));
        var $appendNewButtonInsideListItem = document.querySelector(".item-list__item:last-child");
        $newButtonInsideListItem.innerText = item["name"];
        $appendNewButtonInsideListItem.appendChild($newButtonInsideListItem);
        
        // Adds event listener to the list item
        $newButtonInsideListItem.addEventListener("click", element =>{
            var $clickedButton = element.target;
            showDetails($clickedButton.id);
        });
    }
    
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                var data = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(data);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }    
    
    
    function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = Object.keys(details.types);
        }).catch(function (e) {
            console.error(e);
        });
    }
    
    
    function showDetails(item) {
        programWrapper.loadDetails(repository[item]).then(function () {
            console.log(repository[item]);   
        });
    }
    
    
    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        // search: search,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
}) ();


programWrapper.loadList().then(function() {
    // Now the data is loaded!
    programWrapper.getAll().forEach(function(item, index){
        programWrapper.addListItem(item, index);
    });});