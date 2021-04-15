
const menuContainer = document.querySelector('.section-center');
const buttonsContainer = document.querySelector('.btn-container');
const searchInput = document.querySelector('.search-input');
const maxPriceInput = document.querySelector('.max-price');
const minPriceInput = document.querySelector('.min-price');

let menu = [];

// Made "categories" variable global to be able to use it everywhere.
let categories = ['all'];

// Keeping api url in separate variable is good practice.
let url = 'https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json';

// "getData" function is responsible only for fetching data and putting the data into "menu" variable.
const getData = async () => {
    const response = await fetch(url);
    data = await response.json();
    menu = data;
}

// "getCategories" function finds all possible categories and saves them in separete array.
const setCategories = () => {
    menu.forEach(item => {
        if (!categories.includes(item.category)) {
            categories.push(item.category);
        }
    })
}

// adding all event listeners inside one function.
const addAllEventListeners = () => {
    maxPriceInput.addEventListener('change', handleSetPrice);
    minPriceInput.addEventListener('change', handleSetPrice);
    buttonsContainer.addEventListener('click', handleFilter);
    searchInput.addEventListener('keyup', handleSearch);
    maxPriceInput.addEventListener('change', handleSetPrice);
    minPriceInput.addEventListener('change', handleSetPrice);
}

// "renderMenu" function only renders menu with foods.
const renderMenu = data => {
    if (data.length == 0) {
        menuContainer.innerHTML = `<h3>Nothing found</h3>`
    }
    else {
        menuContainer.innerHTML = '';
        for(let item of data){
            menuContainer.innerHTML += 
            `<article class="menu-item">
                <img src="${item.img}" class="photo" alt="${item.title}" />
                <div class="item-info">
                    <header>
                    <h4>${item.title}</h4>
                    <h4 class="price">${item.price}</h4>
                    </header>
                    <p class="item-text">${item.desc}</p>
                </div>
                <br>
                <div>
                <button class="add-to-cart">Add To Cart</button>
                </div>
            </article>`;
        }
    }
}


// "renderButtons" function only renders buttons.
const renderButtons = () => {
    categories.forEach(category => {
        buttonsContainer.innerHTML += `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`
    })
    buttonsContainer.firstElementChild.classList.add('filter-active');
}


const handleFilter = event => {  // Changed the name of function because function should describe an action;
    if (event.target.matches('.filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.classList.remove('filter-active');
        })
        event.target.classList.add('filter-active'); // setting active class;

        let filterBy = event.target.dataset.id;

        if (filterBy === categories[0]) {
            renderMenu(menu);
        }
        else {
            let filteredMenu = menu.filter(menuItem=> menuItem.category === filterBy);
            renderMenu(filteredMenu);
        }
    }
}


const handleSearch = event => {
	if (event.target.matches('.search-input')) {
        event.preventDefault()
        let keyword = searchInput.value.toLowerCase();
        let selectedCategory = document.querySelector('.filter-active').dataset.id;
        let filteredMenu;

        if ( selectedCategory === categories[0]) {
            filteredMenu = menu.filter(item => {
                return item.title.includes(keyword);
            })
        }
        else {
            filteredMenu = menu.filter(item => {
                return item.category === selectedCategory && item.title.includes(keyword);
             })
        }
		renderMenu(filteredMenu);
	}
}

    const handleSetPrice = event => {
        if (event.target.matches('.min-price') || event.target.matches('.max-price')) {
            let minPrice = minPriceInput.value || 0;
            let maxPrice = maxPriceInput.value || Infinity;
            let filteredMenu = menu.filter(menuItem => {
                return menuItem.price > minPrice && menuItem.price < maxPrice;
            })
            renderMenu(filteredMenu);
        }
    }

    // add to shopping cart
const cartButton = document.querySelector('.cart-btn');
const addToCartBtn = document.querySelector('.add-to-cart');
const cartContainer = document.querySelector('.cart-container');

// cartButton.addEventListener('click',handleToggle)
// let cartContainerIsVisible = false;
// const handleToggle = event => {
//     if(event.target.matches(cartButton)){

//     }
    
// }
// const renderCartContainer = () => {

// }




const startApp = async () => {
    await getData();
    setCategories();
    renderMenu(menu);
    renderButtons();
    addAllEventListeners();
}
startApp();

