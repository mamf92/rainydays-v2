function getPurchasedItems() {
    let purchasedItems = sessionStorage.getItem("purchasedItems");
    purchasedItems = purchasedItems ? JSON.parse(purchasedItems) : [];

    const products = purchasedItems;
    displayPurchasedItems(products);
}

function createPurchasedItems(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card-confirmation');
    ;

    const cardHeading = document.createElement('h2');
    cardHeading.classList.add('product-card-confirmation__heading');
    cardHeading.textContent = product.title;
    cardHeading.addEventListener("click", function () {
        let basePath = window.location.hostname === "mamf92.github.io"
            ? "/rainydays-v2"
            : "";
        window.location.href = `${basePath}/html/productpage.html?id=${product.id}`;
    });

    const cardImage = document.createElement('img');
    cardImage.classList.add('product-card-confirmation__image');
    cardImage.src = product.image.url;
    cardImage.alt = product.image.alt;
    cardImage.addEventListener("click", function () {
        let basePath = window.location.hostname === "mamf92.github.io"
            ? "/rainydays-v2"
            : "";
        window.location.href = `${basePath}/html/productpage.html?id=${product.id}`;
    });

    const cardQuantity = document.createElement('p');
    cardQuantity.classList.add('product-card-confirmation__quantity');
    cardQuantity.textContent = `x ${product.quantity
        }`;

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('product-card-confirmation__price')
    cardPrice.textContent = `$${product.price * product.quantity}`;

    productCard.appendChild(cardImage);
    productCard.appendChild(cardHeading);
    productCard.appendChild(cardQuantity);
    productCard.appendChild(cardPrice);

    return productCard;
}

function displayPurchasedItems(product) {
    const confirmationPage = document.querySelector(".confirmation");

    const purchasedItemsSection = document.createElement('section');
    purchasedItemsSection.classList.add('confirmation__order');

    const orderHeading = document.createElement('h1');
    orderHeading.classList.add('confirmation__order-heading');
    orderHeading.textContent = "Your order has been placed! 🎉";

    const totalOrderPriceHeading = document.createElement('h2');
    totalOrderPriceHeading.classList.add('confirmation__total-order-price-heading');
    totalOrderPriceHeading.textContent = "Total order price: ";

    const totalOrderPrice = document.createElement('h2');
    totalOrderPrice.classList.add('confirmation__total-order-price');
    totalOrderPrice.textContent = `$${calculateTotalPrice(product)}`;

    confirmationPage.prepend(purchasedItemsSection);
    purchasedItemsSection.appendChild(orderHeading);

    product.forEach(product => {
        const productCard = createPurchasedItems(product);
        purchasedItemsSection.appendChild(productCard);
    });

    purchasedItemsSection.appendChild(totalOrderPriceHeading);
    purchasedItemsSection.appendChild(totalOrderPrice);

    return purchasedItemsSection;
}

function calculateTotalPrice(products) {
    let purchasedItems = sessionStorage.getItem("purchasedItems");
    purchasedItems = purchasedItems ? JSON.parse(purchasedItems) : [];

    let totalPrice = 0;

    products.forEach(product => {
        totalPrice += product.price * product.quantity;
    });

    const formattedPrice = totalPrice.toFixed(2);
    return formattedPrice;
}


getPurchasedItems();