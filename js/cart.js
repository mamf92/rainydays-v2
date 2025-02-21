// const API_URL = "https://v2.api.noroff.dev/rainy-days";

function getItemsInCart() {
    let cart = sessionStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    if (cart.length === 0) {
        displayEmptyCart();
    } else {
        const products = cart;
        displayCart(products);
    }
}

function createProductCardCart(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card-cart');
    ;

    const cardHeading = document.createElement('h2');
    cardHeading.classList.add('product-card-cart__heading');
    cardHeading.textContent = product.title;
    cardHeading.addEventListener("click", function () {
        window.location.href = `../html/productpage.html?id=${product.id}`
    })

    const cardImage = document.createElement('img');
    cardImage.classList.add('product-card-cart__image');
    cardImage.src = product.image.url;
    cardImage.alt = product.image.alt;
    cardImage.addEventListener("click", function () {
        window.location.href = `../html/productpage.html?id=${product.id}`
    })

    const cardQuantity = document.createElement('p');
    cardQuantity.classList.add('product-card-cart__quantity');
    cardQuantity.textContent = `x ${product.quantity
        }`;

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('product-card-cart__price')
    cardPrice.textContent = `$${product.price * product.quantity}`;

    productCard.appendChild(cardImage);
    productCard.appendChild(cardHeading);
    productCard.appendChild(cardQuantity);
    productCard.appendChild(cardPrice);

    return productCard;
}

function displayCart(product) {
    const cart = document.querySelector(".cart");
    const cartSection = document.createElement('section');
    cartSection.classList.add('cart-content');

    const cartHeading = document.createElement('h1');
    cartHeading.classList.add('cart-content__heading');
    cartHeading.textContent = "Your cart:";


    const totalPriceHeading = document.createElement('h2');
    totalPriceHeading.classList.add('cart-content__total-heading');
    totalPriceHeading.textContent = "Total price: ";

    const totalPrice = document.createElement('h2');
    totalPrice.classList.add('cart-content__total-price');
    totalPrice.textContent = `$${calculateTotalPrice(product)}`;

    cart.prepend(cartSection);
    cartSection.appendChild(cartHeading);

    product.forEach(product => {
        const productCard = createProductCardCart(product);
        cartSection.appendChild(productCard);
    });
    cartSection.appendChild(totalPriceHeading);
    cartSection.appendChild(totalPrice);

    return cartSection;
}

function calculateTotalPrice(products) {
    let cart = sessionStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.price * product.quantity;
    });

    const formattedPrice = totalPrice.toFixed(2);
    return formattedPrice;
}

function displayEmptyCart() {
    emptyCart = document.querySelector(".cart");
    emptyCartSection = document.createElement('section');
    emptyCartSection.classList.add('cart-content');

    noBuyBtn = document.querySelector(".cart__cta.buy-btn");
    noBuyBtn.remove();

    const cartHeading = document.createElement('h1');
    cartHeading.classList.add('cart-content__heading');
    cartHeading.textContent = "Your cart is empty 😢";


    cart.prepend(cartSection);
    cartSection.appendChild(cartHeading);

    return cartSection;
}


function buyItems() {
    let cart = sessionStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, quantity: 1 });
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
    sessionStorage.getItem("cart");
    console.log(cart);
}

getItemsInCart();