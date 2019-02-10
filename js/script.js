const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

let programWrapper = (() => {
    let repository = [];

    function getAll() {
        return repository;
    }
    
    function add(item) {
        repository.push(item);
    }    
    
    function addListItem(item, index) {
        // Creates and appends the list item
        let $newListItem = document.createElement('li');
        let $appendNewListItem = document.querySelector('.item-list');
        $newListItem.setAttribute('class', 'item-list__item');
        $appendNewListItem.appendChild($newListItem);
        
        // Creates and appends the button to the newly created list item
        let $newButtonInsideListItem = document.createElement('button');
        $newButtonInsideListItem.setAttribute('class', 'item-list__item__button');
        $newButtonInsideListItem.setAttribute('id', String(index));
        let $appendNewButtonInsideListItem = document.querySelector('.item-list__item:last-child');
        $newButtonInsideListItem.innerText = item['name'];
        $appendNewButtonInsideListItem.appendChild($newButtonInsideListItem);
        
        // Adds event listener to the list item
        $newButtonInsideListItem.addEventListener('click', element =>{
            let $clickedButton = element.target;
            showDetails($clickedButton.id);
        });
    }
    
    function makeRequest(url, callback) {
        let request = new XMLHttpRequest();
    
        request.addEventListener('load', resolve);
        request.addEventListener('error', reject);
    
        request.open('GET', url);
        request.send();
    

        function reject() {
            console.log('The request failed (maybe you are offline?)');
        }

        function resolve(e) {
            let xhr = e.target;
            callback(xhr.responseText);
        }
    }

    function loadList(responseFromAPI) {
        // Gets only Name and URL from the API
        JSON.parse(responseFromAPI).results.forEach(item => {
            let data = {
                name: item.name,
                detailsUrl: item.url
            };
            // Adds the retrieved data to the Repository
            add(data);
        });
        
        // Populates the DOM with the loaded list
        getAll().forEach((item, index) => {
            addListItem(item, index);
        });
    }

    function loadDetails(responseFromAPI) {
        let details = JSON.parse(responseFromAPI);
        // id is the same as position in array(index) + 1
        let item = getAll()[details.id - 1];
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
        console.log(item);
    }
    

    function showDetails(item) {
        var requestUrl = getAll()[item].detailsUrl;
        makeRequest(requestUrl, loadDetails);
    }

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        makeRequest: makeRequest
    };
}) ();


programWrapper.makeRequest(apiUrl, programWrapper.loadList);
