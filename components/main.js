const API_URL = "https://v2.api.noroff.dev/rainy-days";

async function fetchProducts(url) {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) { throw new Error('Could not fetch products ' + response.statusText); }
        const json = await response.json();
        const products = json.data;

        displayProducts(products);
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

function createProductCardSmall(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card', 'product-card--small');

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
    const presentationSection = document.querySelector(".presentation");

    products.forEach(product => {
        const productCard = createProductCardSmall(product);
        presentationSection.appendChild(productCard);
    })
}

fetchProducts(API_URL);
