const API_URL = "https://v2.api.noroff.dev/rainy-days";

let allProducts = [];
let allFemaleProducts = [];
let allFemaleProductsOnSale = [];
let allFemaleFavoriteProducts = [];

async function fetchProducts(url) {
    const loaderWrapper = document.querySelector(".loader-wrapper");
    loaderWrapper.style.display = "flex";

    const loader = document.querySelector(".loader");
    loader.style.display = "block";

    try {
        const response = await fetch(url);
        if (!response.ok) { throw new Error('Could not fetch products ' + response.statusText); }
        const json = await response.json();
        allProducts = json.data;
        filterFemaleProducts();
    } catch (error) {
        console.error('Fetch error:', error.message);
    } finally {
        loader.style.display = "none";
        loaderWrapper.style.display = "none";

    }
}

function filterFemaleProducts() {
    allFemaleProducts = allProducts.filter(item => item.gender === "Female");
    allFemaleProductsOnSale = allFemaleProducts.filter(item => item.onSale === true);
    allFemaleFavoriteProducts = allFemaleProducts.filter(item => item.favorite === true);
    displayProducts(allFemaleProducts);
    displayProductsOnSale(allFemaleProductsOnSale);
    displayFavoriteProducts(allFemaleFavoriteProducts);
}

function createProductCardSmall(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card', 'product-card--small');

    productCard.addEventListener("click", function () {
        window.location.href = `../html/productpage.html?id=${product.id}`
    });

    const cardImage = document.createElement('img');
    cardImage.classList.add('product-card__image');
    cardImage.src = product.image.url;
    cardImage.alt = product.image.alt;

    const cardHeading = document.createElement('h3');
    cardHeading.classList.add('product-card__heading');
    cardHeading.textContent = product.title;

    const cardText = document.createElement('p');
    cardText.classList.add('product-card__text');
    cardText.textContent = product.description;

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('product-card__price')
    cardPrice.textContent = `$${product.price}`;

    productCard.appendChild(cardImage);
    productCard.appendChild(cardHeading);
    productCard.appendChild(cardText);
    productCard.appendChild(cardPrice);

    return productCard;
}

function displayProductsOnSale(products) {
    const jacketsOnSale = document.querySelector(".jackets__onsale");
    jacketsOnSale.innerHTML = "";


    products.forEach(product => {
        const productCard = createProductCardSmall(product);
        jacketsOnSale.appendChild(productCard);
    })
}

function displayFavoriteProducts(products) {
    const jacketsFavorites = document.querySelector(".jackets__favorites");
    jacketsFavorites.innerHTML = "";

    if (products.length === 0) {
        const noFavoritesHeading = document.querySelector(".jackets__heading--favorites");
        noFavoritesHeading.remove();
        const noFavorites = document.querySelector(".jackets__favorites");
        noFavorites.remove();
        const noDevider = document.querySelector(".between-favorites-all");
        noDevider.remove();
    }

    else {
        products.forEach(product => {
            const productCard = createProductCardSmall(product);
            jacketsFavorites.appendChild(productCard);
        })
    }
}

function displayProducts(products) {
    const allJackets = document.querySelector(".jackets__all");
    allJackets.innerHTML = "";

    const sortButtons = document.createElement("div");
    sortButtons.classList.add("jackets__sort-buttons");

    const sortByPriceButton = document.createElement('button');
    sortByPriceButton.addEventListener("click", sortByPrice);
    sortByPriceButton.classList.add("cta-btn", "jackets__sort-button");
    sortByPriceButton.textContent = "Sort by price";

    allJackets.appendChild(sortButtons);
    sortButtons.appendChild(sortByPriceButton);

    products.forEach(product => {
        const productCard = createProductCardSmall(product);
        allJackets.appendChild(productCard);
    })
}

function sortByPrice() {
    const sortedProducts = allFemaleProducts.sort((a, b) => a.price - b.price);
    displayProducts(sortedProducts);
}


fetchProducts(API_URL);
