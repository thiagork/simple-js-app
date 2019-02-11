
let programWrapper = (() => {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let repository = [];


    // Runs the code
    main();


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
        // id is the same as position in array[index] + 1
        let item = getAll()[details.id - 1];
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
        item.weight = details.weight;
        return item;
    }

    function createModalWithDetails(responseFromAPI) {
        let item = loadDetails(responseFromAPI);
        
        showModal(item.name, `height: ${item.height}\n weight: ${item.weight}`);
        
        let $modalContainer = document.querySelector('.modal');
        
        let modalImg = document.createElement('div');
        modalImg.classList.add('modal-img');
        
        let img = document.createElement('img');
        img.setAttribute('src', `${item.imageUrl}`);
        img.setAttribute('alt', `an image of ${item.name}`);
        
        modalImg.appendChild(img);
        $modalContainer.appendChild(modalImg);
    }

    function showDetails(item) {
        let requestUrl = getAll()[item].detailsUrl;
        makeRequest(requestUrl, createModalWithDetails);
    }

    function showModal(title, text) {
        let $modalContainer = document.querySelector('#modal-container');
        $modalContainer.innerHTML = '';
        
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        $modalContainer.appendChild(modal);

        $modalContainer.classList.add('is-visible');
        
    }

    function hideModal(resolveOrReject=null) {
        let $modalContainer = document.querySelector('#modal-container');
        $modalContainer.classList.remove('is-visible');
        // If no arguments are passed, it does nothing (defaults to null).
        // Pass resolve() or reject() functions as arguments
        if (typeof(resolveOrReject) === 'function') {
            resolveOrReject();
        }
    }

    function showDialog(title, text, resolve, reject) {
        showModal(title, text);
        let modal = document.querySelector('.modal');
        
        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';
        confirmButton.addEventListener('click', () => {
            hideModal(resolve);
        });
    
        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';
        cancelButton.addEventListener('click', () => {
            hideModal(reject);
        });

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        confirmButton.focus();
    }

    function main () {
        // Populates the page with the items retrieved from API
        makeRequest(apiUrl, loadList);

        // Code for closing modals with 'Esc' or clicking outside the modal
        window.addEventListener('keydown', e => {
            let $modalContainer = document.querySelector('#modal-container');
            if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
                hideModal(true);
            }
        });

        window.addEventListener('click', e => {
            let target = e.target;
            let $modalContainer = document.querySelector('#modal-container');
            if (target === $modalContainer) {
                hideModal(true);
            }
        });
    }


    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        makeRequest: makeRequest,
        showModal: showModal,
        hideModal: hideModal,
        showDialog: showDialog,
        main: main
    };
}) ();
