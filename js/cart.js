import { commonData } from './Products.js';
import { productsData } from './Products.js';

// Initialize the cart from localStorage when the page loads?
$(document).ready(function () {


	// solve the inconsistency between pages
	// Please keep it commented out.
	// cart = JSON.parse(localStorage.getItem('cart')) || {};
	let cart = commonData.getItem('cart');

	// Same with products
	// products = JSON.parse(localStorage.getItem('products')) || {};
	if (!commonData.getItem('products')) {
		commonData.setItem('products', JSON.stringify(productsData))
	}
	let products = commonData.getItem('products');
	if (typeof products === 'string') {
	    // Parse the string into an array
	    products = JSON.parse(products);
	}

	// Display the total cart quantity when the page loads
	$(document).on("click", '#InitialContent .add-to-cart', function (e) {
		e.preventDefault();
		console.log("InitialContent");
		const productId = $(this).data("product-id");
		
		cart[productId] = cart[productId] ? ++cart[productId] : 1;
		console.log(cart)

		// Save the cart to localStorage after each modification
		saveCartToLocalStorage();

		// Update the total cart quantity and display it
		updateCartTotal();
	});

	$("#productInfo .add-to-cart").on("click", function (e) {
		e.preventDefault();
		console.log("productInfo");
		// Get the value from the quantity input
		var quantityValue = parseInt($("#quantity").val(), 10);

		const productId = $(this).data("product-id");
		cart[productId] = cart[productId] ? cart[productId] + quantityValue : quantityValue;
		// console.log(cart)

		// Save the cart to localStorage after each modification
		saveCartToLocalStorage();

		// Update the total cart quantity and display it
		updateCartTotal();
	});

	// Function to save the cart to localStorage
	function saveCartToLocalStorage() {
		commonData.setItem('cart',cart);
		commonData.removeItem('checkout');
		// localStorage.setItem('cart', JSON.stringify(cart));
	}

	// Function to update the total cart quantity and display it
	function updateCartTotal() {
		let total = Object.values(cart).reduce((a, b) => a + b, 0);
		$('.cart-count').text(`[${total}]`);
		console.log("Cart updated to " + total, cart);
	}

	// Function to display the products in the cart in the table
	function displayCartInTable() {
		// Get a reference to the table body
		var tbody = $(".table tbody");

		// Clear the current content of the table
		tbody.empty();

		// Iterate through the products in the cart
		for (let productId in cart) {
			if (cart.hasOwnProperty(productId)) {
				// Get the corresponding product (you can get it from your original data source)
				var product = getProductById(productId);

				// Create a new row for the product
				var row = $("<tr class='text-center'></tr>");

				row.data("product-id", productId); // Store the product ID in the data attribute

				// Column for the remove button
				row.append("<td class='product-remove' ><a href='#'><span class='ion-ios-close'></span></a></td>");

				// Column for the product image
				row.append(`<td class='image-prod'><div class='img' style='background-image:url(${product.imageURL});'></div></td>`);

				// Column for the product name
				row.append("<td class='product-name'><h3>" + product.name + "</h3><p>" + product.description + "</p></td>");

				// Column for the price
				row.append("<td class='price'>$" + product.price.toFixed(2) + "</td>");

				// Column for the quantity (with an input field)
				row.append("<td class='quantity'><div class='input-group mb-3'><input type='number' name='quantity' class='quantity form-control input-number' value='" + cart[productId] + "' min='1' max='100'></div></td>");

				// Column for the total (price * quantity)
				var total = product.price * cart[productId];
				row.append("<td class='total'>$" + total.toFixed(2) + "</td>");

				// Add the row to the table body
				tbody.append(row);
			}
		}
	}

	// Function to get a product by its ID
	function getProductById(productId) {

		// console.log("These are the products:", products);
		// console.log("Getting product with ID: " + productId);
		console.log("getProductById",typeof products,products);
		// Search for the product in the array of products
		var product = products.find(function (item) {
			return item.id === parseInt(productId, 10);
		});

		// Check if the product was found
		if (product) {
			return product;
		} else {
			console.error("Product not found with ID:", productId);
			return null; // Or you can throw an exception, depending on your needs
		}
	}

	// Add a click event to the product removal button
	$(".table").on("click", ".product-remove", function () {
		// Find the parent row of the removal button
		var row = $(this).closest("tr");

		// Get the product ID from the row (assuming the ID is stored in a data attribute)
		var productId = row.data("product-id");

		// Remove the product from the cart and update the table
		removeProductFromCart(productId);
		displayCartInTable();
	});

	// Function to remove a product from the cart by its ID
	function removeProductFromCart(productId) {

		// Check if the product is in the cart
		if (cart.hasOwnProperty(productId)) {
			// Remove the product from the cart
			delete cart[productId];

			// Save the updated cart to localStorage
			saveCartToLocalStorage();

			// Update the total cart quantity and display the updated table
			updateCartTotal();
			displayCartInTable();
		}
	}

	// Add an input event to the quantity fields to handle changes in quantity
	$(".table").on("input", ".quantity input", function () {
		// Find the parent row of the input field
		var row = $(this).closest("tr");

		// Get the product ID from the row
		var productId = row.data("product-id");

		// Update the quantity in the cart
		updateQuantityInCart(productId, $(this).val());

		// Update the table and totals
		displayCartInTable();
	});

	// Function to update the quantity of a product in the cart
	function updateQuantityInCart(productId, newQuantity) {

		// Check if the product is in the cart
		if (cart.hasOwnProperty(productId)) {
			// Update the quantity of the product in the cart
			cart[productId] = parseInt(newQuantity, 10) || 1; // Ensure that the quantity is a valid integer greater than or equal to 1

			// Save the updated cart to localStorage
			saveCartToLocalStorage();

			// Update the total cart quantity and display the updated table
			updateCartTotal();
		}
	}


	const calculateTotalPrice = (cart, products) => {
		let totalPrice = 0;

		for (const productId in cart) {
			if (cart.hasOwnProperty(productId)) {
				const quantity = cart[productId];
				const product = products.find(p => p.id === parseInt(productId, 10));

				if (product) {
					// Check if the product has a discount
					const discountedPrice = (1 - product.discount / 100) * product.price;
					totalPrice += discountedPrice * quantity;
				}
			}
		}

		return totalPrice.toFixed(2); // toFixed(2) to round to two decimal places
	};

	// Function to calculate the total discount for products in the cart
	const calculateDiscountPrice = (cart, products) => {
		console.log("calculateDiscountPrice",cart,products)
		let totalDiscount = 0;

		for (const productId in cart) {
			if (cart.hasOwnProperty(productId)) {
				const quantity = cart[productId];
				const product = products.find(p => p.id === parseInt(productId, 10));

				if (product) {
					// Add the discount amount for each product in the cart
					totalDiscount += (product.discount / 100) * product.price * quantity;
				} else {
					console.error(`Product with ID ${productId} not found in productsData.`);
				}
			}
		}

		return parseFloat(totalDiscount).toFixed(2);
	};
	function loadCheckoutTotal(){

		if (!commonData.getItem('checkout')) {
			const totalPrice = calculateTotalPrice(cart, productsData);
			const delivery = totalPrice > 100 ? 0 : (Math.random() * 20);
			const discount = calculateDiscountPrice(cart, productsData);
			const total = parseFloat(totalPrice) + parseFloat(delivery) - parseFloat(discount);

			const checkout = {
				"totalPrice":totalPrice,
				"delivery":delivery.toFixed(2),
				"discount":discount,
				"total":total.toFixed(2)
			}
			commonData.setItem('checkout',checkout);
		}
		let totals = commonData.getItem('checkout');
		// Loading cart totals
		$("#cart-checkout").html(
		`<div class="row justify-content-end">
			<div class="col-lg-4 mt-5 cart-wrap">
				<div class="cart-total mb-3">
					<h3>Cart Totals</h3>
					<p class="d-flex">
						<span>Subtotal</span>
						<span>$` + totals.totalPrice + `</span>
					</p>
					<p class="d-flex">
						<span>Delivery</span>
						<span>$` + totals.delivery + `</span>
					</p>
					<p class="d-flex">
						<span>Discount</span>
						<span>$` + totals.discount + `</span>
					</p>
					<hr>
					<p class="d-flex total-price">
						<span>Total</span>
						<span>` + totals.total + `</span>
					</p>
				</div>
				<p><a href="checkout.html" class="btn btn-primary py-3 px-4">Proceed to Checkout</a></p>
			</div>
		</div>
			`);
	}
	function loadCheckoutPageTotals(){
		const totals = commonData.getItem('checkout');
		$("#checkout-page-totals").replaceWith(`
			<div class="col-md-12 d-flex mb-5">
				<div class="cart-detail cart-total p-3 p-md-4">
					<h3 class="billing-heading mb-4">Cart Total</h3>
					<p class="d-flex">
						<span>Subtotal</span>
						<span>$` + totals.totalPrice + `</span>
					</p>
					<p class="d-flex">
						<span>Delivery</span>
						<span>$` + totals.delivery + `</span>
					</p>
					<p class="d-flex">
						<span>Discount</span>
						<span>$` + totals.discount + `</span>
					</p>
					<hr>
					<p class="d-flex total-price">
						<span>Total</span>
						<span>$` + totals.total + `</span>
					</p>
				</div>
			</div>`)
	}
	loadGenericHeader();
	loadGenericFooter();
	updateCartTotal();
	loadCheckoutTotal();
	displayCartInTable();
	loadCheckoutPageTotals()
});
