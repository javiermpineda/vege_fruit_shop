$(document).ready(function () {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  updateNavbar();

  var daysSelect = $("#selectdays");
  for (let i = 1; i <= 31; i++) {
    daysSelect.append(`<option value="${i}">${i}&nbsp;&nbsp;</option>`);
  }

  var monthsSelect = $("#selectmonths");
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  for (let i = 1; i <= 12; i++) {
    monthsSelect.append(`<option value="${i}">${monthNames[i - 1]}&nbsp;</option>`);
  }

  var yearsSelect = $("#selectyears");
  var currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= currentYear - 100; i--) {
    yearsSelect.append(`<option value="${i}">${i}&nbsp;&nbsp;</option>`);
  }


  // Button Login
  $("#SubmitLogin").on("click", function () {
    var email = $(".input_login_email").val();
    var password = $(".login_password").val();
    let user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("userLogin", JSON.stringify(user));
      $(".icon-user").text(user.firstName);
      window.location.href = "index.html";
    } else {
      alert("Invalid info, please try again :)");
    }
  });

  // Button Create An Account
  $("#SubmitCreate").on("click", function () {
    event.preventDefault();

    let email = $("#email2").val();

    if (!emailRegex.test(email)) {
      $("#mensajeError").html("Please, add a valid email").show();
    } else {
      $("#mensajeError").hide();
    }

    let existUser = users.some((u) => u.email === email);

    if (existUser) {
      $("#mensajeError").show();
      return;
    } else {
      $("#mensajeError").hide();
    }

    $("#email").val(email);
    $("#mensajeError").hide();

    console.log("Show form for email: " + email);

    // Oculta el formulario existente
    $("#form_create_id").hide();

    // Muestra el nuevo formulario
    $("#newForm").show();

    // Oculta elementos con la clase 'navbar-brand'
    $(".navbar-brand").hide();

    // Muestra elementos con la clase 'navbarbrandcreateacount'
    $(".navbarbrandcreateacount").show();
  });

  // Button Register
  $("#submitAccount").on("click", function () {
    event.preventDefault();
    var formData = {
      gender: $('input[name="id_gender"]:checked').val(),
      firstName: $("#customer_firstname").val(),
      lastName: $("#customer_lastname").val(),
      email: $("#email").val(),
      password: $("#passwd").val(),
      day: $("#selectdays").val(),
      month: $("#selectmonths").val(),
      year: $("#selectyears").val(),
      newsletter: $("#newsletter").prop("checked"),
      optin: $("#optin").prop("checked"),
      State: $("#customer_State").val(),
      StreetAddress: $("#customer_Street_Address").val(),
      Apartment: $("#customer_apartment").val(),
      Town: $("#customer_Town").val(),
      Postcode: $("#customer_Postcode").val(),
      Phone: $("#Customer_Phone").val(),
    };

    let existingUser = users.find((user) => user.email === formData.email);

    if (existingUser) {
      alert(
        "Este correo electrónico ya está registrado. Por favor, utiliza otro."
      );
    } else {
      //localStorage.setItem("userLogin", JSON.stringify(formData));
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));
      users = JSON.parse(localStorage.getItem("users")) || [];
    }

    $("#newForm").hide();
    $("#FINALMESSAGE").show();
  });

  // Button Logout
  $("#logout").on("click", function () {
    localStorage.removeItem("userLogin");
    updateNavbar();
  });
  
  function updateNavbar() {
    var userLogin = localStorage.getItem("userLogin");
    if (userLogin === null) {
      $("#login").show();
      $("#logout").hide();
    } else {
      $("#login").hide();
      $("#logout").show();
    }
  }
});
