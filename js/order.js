$(document).ready(function () {
    var userLogin = JSON.parse(localStorage.getItem('userLogin')) || null;
    var orderList = JSON.parse(localStorage.getItem('orderList')) || [];
    var cart = JSON.parse(localStorage.getItem('cart')) || {};
    var products = JSON.parse(localStorage.getItem('products')) || [];
    var paymentMethodMapping = {
        directBank: "Direct Bank Tranfer",
        checkPayment: "Check Payment",
        paypal: "Paypal"
    };

    if (userLogin !== null) {

        // Filtra los pedidos del usuario actual
        var userOrders = orderList.filter(function (order) {
            return order.userEmailOrder === userLogin.email;
        });

        console.log(userOrders);

        // Llena dinámicamente la tabla con los pedidos del usuario
        var tbody = $('#orders tbody');

        tbody.empty();

        // Verificar si el carrito está vacío
        if (Object.keys(userOrders).length === 0) {
            tbody.append("<tr><td colspan='6' class='text-center'>You don't have orders yet</td></tr>");
        } else {
            $.each(userOrders, function (index, order) {
                var rowIndex = index + 1;
                var orderDetail = order.orderDetail;

                var row = $('<tr class="text-center"></tr>');
                row.append('<td class="detail-view"><a href="#" class="show-detail" data-index="' + index + '"><span class="ion-ios-eye"></span></a></td>');
                row.append('<td class="index">' + rowIndex + '</td>');
                var selectedPaymentMethod = paymentMethodMapping[order.paymentMethod];
                row.append('<td class="paymentMethod">' + selectedPaymentMethod + '</td>');
                row.append('<td class="subTotal">' + '$' + order.Subtotal.toFixed(2) + '</td>');
                row.append('<td class="total">' + '$' + order.Total.toFixed(2) + '</td>');

                tbody.append(row);

                // Agrega un evento de clic al botón para mostrar el detalle del pedido
                row.find('.show-detail').on('click', function () {
                    // Antes de abrir el modal, obtén el orderDetail del pedido actual
                    var currentOrderDetail = userOrders[index].orderDetail;

                    // Actualiza la tabla #orderDetail con los productos del orderDetail actual
                    displayOrderDetailInTable(currentOrderDetail);

                    // Abre el modal
                    $('#orderDetailModal').modal('show');
                });
            });
        }

    } else {

        var userOrders = null;
        // Llena dinámicamente la tabla con los pedidos del usuario
        var tbody = $('#orders tbody');

        tbody.empty();

        // Verificar si el carrito está vacío
        if (userOrders === null) {
            tbody.append("<tr><td colspan='6' class='text-center'>You don't have orders yet</td></tr>");
        }
    }


    // Función para mostrar el orderDetail en la tabla #orderDetail del modal
    function displayOrderDetailInTable(orderDetail) {
        // Obtener la referencia al cuerpo de la tabla
        var tbody = $('#orderDetail tbody');

        // Limpiar el contenido actual de la tabla
        tbody.empty();

        // Recorrer los productos en el orderDetail
        for (let productId in orderDetail) {
            if (orderDetail.hasOwnProperty(productId)) {
                // Obtener el producto correspondiente (puedes obtenerlo de tu fuente de datos original)
                var product = getProductById(productId);

                // Crear una nueva fila para el producto
                var row = $("<tr class='text-center'></tr>");

                row.data("product-id", productId); // Almacena el ID del producto en el atributo data

                // Columna para la imagen del producto
                row.append(`<td class='image-prod'><div class='img' style='background-image:url(${product.imageURL});'></div></td>`);

                // Columna para el nombre del producto
                row.append("<td class='product-name'><h3>" + product.name + "</h3><p>" + product.description + "</p></td>");

                // Columna para el precio
                row.append("<td class='price'>$" + product.price.toFixed(2) + "</td>");

                // Columna para la cantidad (con un campo de entrada)
                row.append("<td class='quantity'>" + orderDetail[productId] + "</td>");

                // Columna para el total (precio * cantidad)
                var total = product.price * orderDetail[productId];
                row.append("<td class='total'>$" + total.toFixed(2) + "</td>");

                // Agregar la fila al cuerpo de la tabla
                tbody.append(row);
            }
        }
    }

    // Función para obtener un producto por su ID
    function getProductById(productId) {
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

});