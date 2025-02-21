const API_URL = "https://v2.api.noroff.dev/rainy-days";

let allProducts = [];

async function fetchProducts(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) { throw new Error('Could not fetch products ' + response.statusText); }
        const json = await response.json();
        allProducts = json.data;
        displayProducts(allProducts);
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

function createProductCardSmall(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card', 'product-card--small');

    productCard.addEventListener("click", function () {
        let basePath = window.location.hostname === "mamf92.github.io"
            ? "/rainydays-v2"
            : "";
        window.location.href = `${basePath}/html/productpage.html?id=${product.id}`;
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

function displayProducts(products) {
    const presentationSection = document.querySelector(".presentation__products");
    presentationSection.innerHTML = "";

    const sortButtons = document.createElement("div");
    sortButtons.classList.add("presentation__sort-buttons");

    const sortByPriceButton = document.createElement('button');
    sortByPriceButton.addEventListener("click", sortByPrice);
    sortByPriceButton.classList.add("cta-btn", "presentation__sort-button");
    sortByPriceButton.textContent = "Sort by price";

    const filterMaleProducts = document.createElement('button');
    filterMaleProducts.addEventListener("click", filterMaleItems);
    filterMaleProducts.classList.add("cta-btn", "presentation__sort-button");
    filterMaleProducts.textContent = "Men's products";

    const filterFemaleProducts = document.createElement('button');
    filterFemaleProducts.addEventListener("click", filterFemaleItems);
    filterFemaleProducts.classList.add("cta-btn", "presentation__sort-button");
    filterFemaleProducts.textContent = "Women's products";

    presentationSection.appendChild(sortButtons);
    sortButtons.appendChild(sortByPriceButton);
    sortButtons.appendChild(filterMaleProducts);
    sortButtons.appendChild(filterFemaleProducts);

    products.forEach(product => {
        const productCard = createProductCardSmall(product);
        presentationSection.appendChild(productCard);
    })
}

function sortByPrice() {
    const sortedProducts = allProducts.sort((a, b) => a.price - b.price);
    console.log(sortedProducts);
    displayProducts(sortedProducts);
}

function filterMaleItems() {
    const filteredMaleProducts = allProducts.filter(item => item.gender === "Male");
    displayProducts(filteredMaleProducts);
}

function filterFemaleItems() {
    const filteredFemaleProducts = allProducts.filter(item => item.gender === "Female");
    displayProducts(filteredFemaleProducts);
}

fetchProducts(API_URL);





