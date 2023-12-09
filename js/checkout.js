$(document).ready(function () {
  var userLogin = JSON.parse(localStorage.getItem("userLogin")) || null;
  var Subtotal = parseFloat(localStorage.getItem('Subtotal')) || 0;
  var Discount = parseFloat(localStorage.getItem('Discount')) || 0;
  var Delivery = parseFloat(localStorage.getItem('Delivery')) || 0;
  var Total = parseFloat(localStorage.getItem('Total')) || 0;

  function initialLoad() {

    $("#Subtotal").text("$" + Subtotal.toFixed(2));
    $("#Discount").text("$" + Discount.toFixed(2));
    $("#Delivery").text("$" + Delivery.toFixed(2));
    $("#Total").text("$" + Total.toFixed(2));

    if (userLogin) {
      console.log(userLogin.firstName);
      $("#checkout_firstname").val(userLogin.firstName);
      $("#checkout_lastname").val(userLogin.lastName);
      $("#checkout_State").val(userLogin.State);
      $("#checkout_Street_Address").val(userLogin.StreetAddress);
      $("#checkout_apartment").val(userLogin.Apartment);
      $("#checkout_Town").val(userLogin.Town);
      $("#checkout_Postcode").val(userLogin.Postcode);
      $("#checkout_Phone").val(userLogin.Phone);
      $("#checkout_email").val(userLogin.email);
      $("#createAccount").hide();
    } else {
      $("#createAccount").show();
    }
    checkOrderButton();
  }

  initialLoad();

  function checkOrderButton() {

    var paymentMethodSelected = $("input[name='optradio']:checked").length > 0;
    var termsAccepted = $("input[type='checkbox']").is(":checked");

    if (Total > 0 && paymentMethodSelected && termsAccepted) {
      $("a.btn-primary").prop("disabled", false);
    } else {
      $("a.btn-primary").prop("disabled", true);
    }

  }

  // Al cambiar el método de pago o aceptar términos
  $("input[name='optradio'], input[type='checkbox']").change(function () {
    checkOrderButton();
  });

  // Al hacer clic en "Place an order"
  $("#placeOrderCheckout").on("click", function(e) {
    e.preventDefault();

    // Validar si hay un valor Total mayor a 0
    if (Total <= 0) {
      alert("El Total debe ser mayor a 0.");
      return;
    }

    // Validar si se ha seleccionado un método de pago
    var paymentMethodSelected = $("input[name='optradio']:checked").length > 0;
    if (!paymentMethodSelected) {
      alert("Seleccione un método de pago.");
      return;
    }
    console.log($('input[name="optradio"]:checked').attr('id'));

    // Validar si se ha aceptado los términos y condiciones
    var termsAccepted = $("input[type='checkbox']").is(":checked");
    if (!termsAccepted) {
      alert("Acepte los términos y condiciones.");
      return;
    }

    // Guardar la información en localStorage
    var orderList = JSON.parse(localStorage.getItem("orderList")) || [];
    var orderDetail = JSON.parse(localStorage.getItem("cart")) || {};

    var order = {
      firstName: $("#checkout_firstname").val(),
      lastName: $("#checkout_lastname").val(),
      State: $("#checkout_State").val(),
      StreetAddress: $("#checkout_Street_Address").val(),
      Apartment: $("#checkout_apartment").val(),
      Town: $("#checkout_Town").val(),
      Postcode: $("#checkout_Postcode").val(),
      Phone: $("#checkout_Phone").val(),
      email: $("#checkout_email").val(),
      Subtotal: Subtotal,
      Delivery: Delivery,
      Discount: Discount,
      Total: Total,
      paymentMethod: $('input[name="optradio"]:checked').attr('id'),
      orderDetail: orderDetail,
      userEmailOrder: userLogin ? userLogin.email : $("#checkout_email").val()
    };

    orderList.push(order);
    localStorage.setItem("orderList", JSON.stringify(orderList));
    localStorage.removeItem("Delivery");
    localStorage.removeItem("Discount");
    localStorage.removeItem("Total");
    localStorage.removeItem("Subtotal");
    localStorage.removeItem("cart");

    // Redirigir a order.html
    window.location.href = "order.html";
  });

});
