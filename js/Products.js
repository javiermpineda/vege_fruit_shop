
var productsData = [
    {
        "id": 1,
        "name": "Bell Pepper",
        "price": 80.00,
        "imageURL": "images/product-1.jpg",
        "category": "Vegetable",
        "discount": 10
    },
    {
        "id": 2,
        "name": "Strawberry",
        "price": 10.00,
        "imageURL": "images/product-2.jpg",
        "category": "Fruit",
        "discount": 0
    },
    {
        "id": 3,
        "name": "Green Beans",
        "price": 120.00,
        "imageURL": "images/product-3.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 4,
        "name": "Purple Cabbage",
        "price": 120.00,
        "imageURL": "images/product-4.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 5,
        "name": "Tomato",
        "price": 80.00,
        "imageURL": "images/product-5.jpg",
        "category": "Vegetable",
        "discount": 50
    },
    {
        "id": 6,
        "name": "Broccoli",
        "price": 120.00,
        "imageURL": "images/product-6.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 7,
        "name": "Carrots",
        "price": 120.00,
        "imageURL": "images/product-7.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 8,
        "name": "Fruit Juice",
        "price": 120.00,
        "imageURL": "images/product-8.jpg",
        "category": "Juice",
        "discount": 15
    },
    {
        "id": 9,
        "name": "Onion",
        "price": 80.00,
        "imageURL": "images/product-9.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 10,
        "name": "Apple",
        "price": 120.00,
        "imageURL": "images/product-10.jpg",
        "category": "Fruit",
        "discount": 0
    },
    {
        "id": 11,
        "name": "Garlic",
        "price": 120.00,
        "imageURL": "images/product-11.jpg",
        "category": "Vegetable",
        "discount": 75
    },
    {
        "id": 12,
        "name": "Chilli",
        "price": 120.00,
        "imageURL": "images/product-12.jpg",
        "category": "Vegetable",
        "discount": 30
    }
]

var cart =[];


function startCart(){

    $("a").click(function(event) {
    event.preventDefault();
    // Get the href attribute of the clicked element
    // Check if href does not contain ".html"
    const href = $(this).attr("href");
        if (href.includes(".html")&&cart.length>0) {
            const myArrayJSON = JSON.stringify(cart);
            const queryString = `?data=${encodeURIComponent(myArrayJSON)}`;
            window.location.href = href+queryString ;
        }
    });
    $(".add-to-cart").click(function(event) {
        event.preventDefault(); // Prevent the default behavior (page reload)
        const productId = $(this).data("product-id");
        cart.push(productId);
        $('.cart-count').text(`[${cart.length}]`);
        console.log(cart);
    });
    //console.log("Currently my cart has "+ cart.length>0?cart.length:0+" items.");
}


// Assuming you have an HTML element with id "product-container" where you want to append the product cards.
const productContainer = document.getElementById("product-container");

// Loop through the productsData array and create product cards.
productsData.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-6", "col-lg-3", "ftco-animate","product");

    // Create the HTML structure for the product card.
    productCard.innerHTML = `
        <a href="" class="img-prod">
            <img class="img-fluid" src="${product.imageURL}" alt="${product.name}">
            ${product.discount > 0 ? `<span class="status">${product.discount}</span>` : ''}
            <div class="overlay"></div>
        </a>
        <div class="text py-3 pb-4 px-3 text-center">
            <h3><a href="">${product.name}</a></h3>
            <div class="d-flex">
                <div class="pricing">
                    <p class="price">
                        <span class="mr-2 price-dc">$${product.price.toFixed(2)}</span>
                        <span class="price-sale">$${product.price.toFixed(2)}</span>
                    </p>
                </div>
            </div>
            <div class="bottom-area d-flex px-3">
                <div class="m-auto d-flex">
                    <a href="" class="buy-now d-flex justify-content-center align-items-center text-center">
                        <span><i class="ion-ios-menu"></i></span>
                    </a>
                    <a href="" class="add-to-cart d-flex justify-content-center align-items-center mx-1" data-product-id="${product.id}">
                        <span><i class="ion-ios-cart"></i></span>
                    </a>
                    <a href="" class="heart d-flex justify-content-center align-items-center">
                        <span><i class="ion-ios-heart"></i></span>
                    </a>
                </div>
            </div>
        </div>
    `;

    // Append the product card to the product container.
    productContainer.appendChild(productCard);
});