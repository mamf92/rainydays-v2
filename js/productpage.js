const API_URL = "https://v2.api.noroff.dev/rainy-days";

let currentProduct = [];

async function fetchProductWithParam(url) {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    const id = urlParam.get("id");
    try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) {
            throw new Error(`Could not fetch product: ${id}, ${response.statusText}
            `);
        }
        const json = await response.json();
        const product = json.data;
        currentProduct = product;
        displayProduct(product);
    } catch (error) {
        console.error('Fetch error:', error.message);
    } finally {
        loader.style.display = "none";
    }
}

fetchProductWithParam(API_URL)

function createProductPage(product) {
    const productPage = document.createElement('section');
    productPage.classList.add('product-page__product');

    const productImage = document.createElement('img');
    productImage.classList.add('product-page__product__image');
    productImage.src = product.image.url;
    productImage.alt = product.image.alt;

    const productHeading = document.createElement('h1');
    productHeading.classList.add('product-page__product__h1');
    productHeading.textContent = product.title;

    const productText = document.createElement('p');
    productText.classList.add('product-page__product__p');
    productText.textContent = product.description;

    const productPrice = document.createElement('h2');
    productPrice.classList.add('product-page__product__price')
    productPrice.textContent = `$${product.price}`;

    const productAddToCartLink = document.createElement('a');
    productAddToCartLink.classList.add("product-page__product__cta", "cta-btn", "cta-btn--green", "cta-btn--large")
    productAddToCartLink.textContent = "Add jacket to cart";
    productAddToCartLink.addEventListener("click", addToCart);

    productPage.appendChild(productImage);
    productPage.appendChild(productHeading);
    productPage.appendChild(productText);
    productPage.appendChild(productPrice);
    productPage.appendChild(productAddToCartLink);

    return productPage;
}

function displayProduct(product) {
    const productPage = document.querySelector(".product-page");

    const productPageContent = createProductPage(product);
    productPage.appendChild(productPageContent);
}

function addToCart() {
    let cart = sessionStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    const currentProductID = currentProduct.id;
    const existingItem = cart.find(item => item.id === currentProductID);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        currentProduct.quantity = 1;
        cart.push(currentProduct);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.getItem("cart");
    updateCartButtons();
}

function updateCartButtons() {
    productAddToCartLink = document.querySelector(".product-page__product__cta");
    productAddToCartLink.removeEventListener("click", addToCart);
    productAddToCartLink.textContent = "Added to cart";
    productAddToCartLink.style.backgroundColor = "grey";
    productAddToCartLink.style.boxShadow = "none";
    const goToCartButton = document.createElement('a');
    goToCartButton.classList.add("product-page__product__goto-cart", "cta-btn", "cta-btn--green", "cta-btn--large")
    goToCartButton.textContent = "Go to cart";
    goToCartButton.href = "../html/cart.html";
    productPage = document.querySelector(".product-page__product");
    productPage.appendChild(goToCartButton);
}