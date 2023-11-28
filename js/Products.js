var productsData = [
    {
        "id": 1,
        "name": "Bell Pepper",
        "description": "Fresh and vibrant bell peppers known for their crisp texture and sweet taste. These colorful peppers are a rich source of vitamins A and C. Grown with care in local farms, our bell peppers bring a burst of flavor to your dishes. Origin: Local Farms",
        "price": 80.00,
        "imageURL": "images/product-1.jpg",
        "category": "Vegetable",
        "discount": 10
    },
    {
        "id": 2,
        "name": "Strawberry",
        "description": "Juicy and sweet strawberries, bursting with natural sweetness and packed with antioxidants. Our strawberries are carefully cultivated to ensure the highest quality and flavor. Enjoy these delicious berries as a healthy snack or in your favorite desserts. Origin: Local Farms",
        "price": 10.00,
        "imageURL": "images/product-2.jpg",
        "category": "Fruit",
        "discount": 0
    },
    {
        "id": 3,
        "name": "Green Beans",
        "description": "Tender and crisp green beans, a versatile vegetable loaded with vitamins and minerals. Sourced from local farms, our green beans are harvested at peak freshness to preserve their natural goodness. Add these nutritious beans to your meals for a healthy boost. Origin: Local Farms",
        "price": 120.00,
        "imageURL": "images/product-3.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 4,
        "name": "Purple Cabbage",
        "description": "Colorful and nutritious purple cabbage, known for its vibrant hue and high nutritional value. Packed with antioxidants and vitamins, our purple cabbage adds a pop of color and health benefits to your salads and coleslaw. Origin: Local Farms",
        "price": 120.00,
        "imageURL": "images/product-4.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 5,
        "name": "Tomato",
        "description": "Ripe and succulent tomatoes, bursting with flavor and versatile for various culinary creations. Our tomatoes are carefully cultivated to deliver the perfect balance of sweetness and acidity. Ideal for salads, sauces, and sandwiches. Origin: Local Farms",
        "price": 80.00,
        "imageURL": "images/product-5.jpg",
        "category": "Vegetable",
        "discount": 50
    },
    {
        "id": 6,
        "name": "Broccoli",
        "description": "Nutrient-rich and delicious broccoli, known for its health benefits and distinctive taste. Our broccoli is harvested at the peak of freshness, ensuring you get the maximum nutritional value. Add this superfood to your meals for a boost of vitamins and minerals. Origin: Local Farms",
        "price": 120.00,
        "imageURL": "images/product-6.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 7,
        "name": "Carrots",
        "description": "Sweet and crunchy carrots, a classic vegetable loved for its natural sweetness and vibrant orange color. Our carrots are locally sourced, ensuring you get the freshest and most flavorful produce. Enjoy them as a snack or as a versatile ingredient in your favorite dishes. Origin: Local Farms",
        "price": 120.00,
        "imageURL": "images/product-7.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 8,
        "name": "Fruit Juice",
        "description": "Refreshing and natural fruit juice made from a blend of the finest fruits. Our fruit juice is a delightful and healthy beverage option, perfect for quenching your thirst. Enjoy the goodness of real fruits in every sip. Origin: Local and Imported Fruits",
        "price": 120.00,
        "imageURL": "images/product-8.jpg",
        "category": "Juice",
        "discount": 15
    },
    {
        "id": 9,
        "name": "Onion",
        "description": "Flavorful and versatile onions, a kitchen staple known for adding depth of flavor to a wide range of dishes. Our onions are sourced locally, ensuring quality and freshness. Elevate your culinary creations with the savory taste of our onions. Origin: Local Farms",
        "price": 80.00,
        "imageURL": "images/product-9.jpg",
        "category": "Vegetable",
        "discount": 0
    },
    {
        "id": 10,
        "name": "Apple",
        "description": "Crisp and sweet apples, a classic fruit loved for its natural sweetness and satisfying crunch. Our apples are carefully selected to provide you with the best taste and quality. Enjoy them as a healthy snack or incorporate them into your favorite recipes. Origin: Local Orchards",
        "price": 120.00,
        "imageURL": "images/product-10.jpg",
        "category": "Fruit",
        "discount": 0
    },
    {
        "id": 11,
        "name": "Garlic",
        "description": "Aromatic and flavorful garlic, a kitchen essential known for its bold taste and numerous health benefits. Our garlic is sourced locally, ensuring you get the freshest and most pungent bulbs. Enhance the taste of your dishes with the savory goodness of our garlic. Origin: Local Farms",
        "price": 120.00,
        "imageURL": "images/product-11.jpg",
        "category": "Vegetable",
        "discount": 75
    },
    {
        "id": 12,
        "name": "Chilli",
        "description": "Spicy and vibrant chili peppers, adding heat and flavor to your culinary creations. Our chili peppers are sourced locally, ensuring a fiery kick to your dishes. Spice up your meals with the bold and intense taste of our chili peppers. Origin: Local Farms",
        "price": 120.00,
        "imageURL": "images/product-12.jpg",
        "category": "Vegetable",
        "discount": 30
    }
]


// This section below should not be in controller.js

// Assuming you have an HTML element with id "product-container" where you want to append the product cards.
const productContainer = document.getElementById("product-container");

// Loop through the productsData array and create product cards.
productsData.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-6", "col-lg-3", "ftco-animate","product");

    // Create the HTML structure for the product card.
    productCard.innerHTML = `
        <a href="./product-single.html" class="img-prod">
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
                    
                </div>
            </div>
        </div>
    `;

    // Append the product card to the product container.
    productContainer.appendChild(productCard);
});