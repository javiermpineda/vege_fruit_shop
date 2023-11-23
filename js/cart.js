// Inicializar el carrito desde el localStorage al cargar la página

//This is a new comment

$(document).ready(function () {
    var cart = JSON.parse(localStorage.getItem('cart')) || {};
    var products = JSON.parse(localStorage.getItem('products')) || [];
    // Mostrar la cantidad total del carrito al cargar la página
    updateCartTotal();
    $(".add-to-cart").on("click", function (e) {
        e.preventDefault();
        const productId = $(this).data("product-id");
        cart[productId] = cart[productId] ? ++cart[productId] : 1;
        console.log(cart)

        // Guardar el carrito en el localStorage después de cada modificación
        saveCartToLocalStorage();

        // Actualizar la cantidad total del carrito y mostrarla
        updateCartTotal();
    });

    // Función para guardar el carrito en el localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Función para actualizar la cantidad total del carrito y mostrarla
    function updateCartTotal() {
        let total = Object.values(cart).reduce((a, b) => a + b, 0);
        $('.cart-count').text(`[${total}]`);
        console.log(total);
    }

    // Función para mostrar los productos del carrito en la tabla
    function displayCartInTable() {
        // Obtener la referencia al cuerpo de la tabla
        var tbody = $(".table tbody");

        // Limpiar el contenido actual de la tabla
        tbody.empty();

        // Recorrer los productos en el carrito
        for (let productId in cart) {
            if (cart.hasOwnProperty(productId)) {
                // Obtener el producto correspondiente (puedes obtenerlo de tu fuente de datos original)
                var product = getProductById(productId);

                // Crear una nueva fila para el producto
                var row = $("<tr class='text-center'></tr>");

                row.data("product-id", productId); // Almacena el ID del producto en el atributo data

                // Columna para el botón de eliminar
                row.append("<td class='product-remove' ><a href='#'><span class='ion-ios-close'></span></a></td>");

                // Columna para la imagen del producto
                row.append(`<td class='image-prod'><div class='img' style='background-image:url(${product.imageURL});'></div></td>`);

                // Columna para el nombre del producto
                row.append("<td class='product-name'><h3>" + product.name + "</h3><p>" + product.description + "</p></td>");

                // Columna para el precio
                row.append("<td class='price'>$" + product.price.toFixed(2) + "</td>");

                // Columna para la cantidad (con un campo de entrada)
                row.append("<td class='quantity'><div class='input-group mb-3'><input type='number' name='quantity' class='quantity form-control input-number' value='" + cart[productId] + "' min='1' max='100'></div></td>");

                // Columna para el total (precio * cantidad)
                var total = product.price * cart[productId];
                row.append("<td class='total'>$" + total.toFixed(2) + "</td>");

                // Agregar la fila al cuerpo de la tabla
                tbody.append(row);
            }
        }
    }

    // Función para obtener un producto por su ID
    function getProductById(productId) {
        console.log(products);
        console.log(productId);
        // Buscar el producto en el array de productos
        var product = products.find(function (item) {
            return item.id === parseInt(productId, 10);;
        });

        // Verificar si el producto fue encontrado
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado con ID:", productId);
            return null; // O puedes lanzar una excepción, dependiendo de tus necesidades
        }

    }

    // Llamar a la función para mostrar los productos del carrito en la tabla
    displayCartInTable();

    // Agrega un evento clic al botón de eliminación de productos
    $(".table").on("click", ".product-remove", function () {
        // Encuentra la fila padre del botón de eliminación
        var row = $(this).closest("tr");

        // Obtén el ID del producto desde la fila (suponiendo que el ID está almacenado en un atributo data)
        var productId = row.data("product-id");

        // Elimina el producto del carrito y actualiza la tabla
        removeProductFromCart(productId);
        displayCartInTable();
    });

    // Función para eliminar un producto del carrito por su ID
    function removeProductFromCart(productId) {
        // Verifica si el producto está en el carrito
        if (cart.hasOwnProperty(productId)) {
            // Elimina el producto del carrito
            delete cart[productId];

            // Guarda el carrito actualizado en el localStorage
            saveCartToLocalStorage();

            // Actualiza la cantidad total del carrito y muestra la tabla actualizada
            updateCartTotal();
            displayCartInTable();
        }
    }

    // Agrega un evento input a los campos de cantidad para manejar cambios en la cantidad
    $(".table").on("input", ".quantity input", function () {
        // Encuentra la fila padre del campo de entrada
        var row = $(this).closest("tr");

        // Obtén el ID del producto desde la fila
        var productId = row.data("product-id");

        // Actualiza la cantidad en el carrito
        updateQuantityInCart(productId, $(this).val());

        // Actualiza la tabla y los totales
        displayCartInTable();
    });

    // Función para actualizar la cantidad de un producto en el carrito
    function updateQuantityInCart(productId, newQuantity) {
        // Verifica si el producto está en el carrito
        if (cart.hasOwnProperty(productId)) {
            // Actualiza la cantidad del producto en el carrito
            cart[productId] = parseInt(newQuantity, 10) || 1; // Asegura que la cantidad sea un número entero válido mayor o igual a 1

            // Guarda el carrito actualizado en el localStorage
            saveCartToLocalStorage();

            // Actualiza la cantidad total del carrito y muestra la tabla actualizada
            updateCartTotal();
        }
    }

});
