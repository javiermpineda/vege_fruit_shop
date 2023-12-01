import { commonData } from './Products.js';

// Agrega un evento al botón "Create an account"
// var createAccountButton = document.getElementById('SubmitCreate');
// createAccountButton.addEventListener('click', function(event) {
// 	// Evitar que el formulario se envíe de forma predeterminada
// 	event.preventDefault();

// 	// Llamar a la función copiarTexto cuando se haga clic en el botón
// 	copiarTexto();
// });

function copiarTexto() {
	var correoIngresado = document.getElementById("email2").value;
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(correoIngresado)) {
		// Mostrar un mensaje de error indicando que el formato del correo electrónico no es válido
		var mensajeError = document.getElementById("mensajeError");
		mensajeError.innerHTML = 'Please, add a valid email';
		mensajeError.style.display = 'inline';
		return; // No continuamos con el proceso de registro
	} else {
		// Ocultar el mensaje de error si estaba visible y el formato del correo es válido
		var mensajeError = document.getElementById("mensajeError");
		mensajeError.style.display = 'none';
	}

	// Obtener el valor del correo electrónico ingresado
	var correoIngresado = document.getElementById("email2").value;

	// Verificar si el correo electrónico ya está registrado en el commonData
	var existingData = commonData.getItem('formData');
	if (existingData) {
		// Convertir los datos existentes de commonData a un objeto
		existingData = JSON.parse(existingData);

		// Verificar si el correo electrónico coincide con alguno en los datos existentes
		var correoExistente = existingData.find(function(data) {
			return data.email === correoIngresado;
		});

		if (correoExistente) {
			// Mostrar un mensaje de error indicando que el correo electrónico ya está registrado
			var mensajeError = document.getElementById("mensajeError");
			mensajeError.style.display = 'inline';
			return; // No continuamos con el proceso de registro
		} else {
			// Ocultar el mensaje de error si estaba visible
			var mensajeError = document.getElementById("mensajeError");
			mensajeError.style.display = 'none';
		}
	}

	// Si el correo electrónico no está registrado, continuar con el proceso de registro
	document.getElementById("email").value = correoIngresado;

	// Ocultar el mensaje de error si estaba visible
	var mensajeError = document.getElementById("mensajeError");
	mensajeError.style.display = 'none';

	console.log("Texto copiado: " + correoIngresado);

	// Llamar a la función showNewRegistrationForm si el correo no está registrado
	showNewRegistrationForm();
}

// Función para mostrar el nuevo formulario y ocultar el existente
function showNewRegistrationForm() {
	// Tu código para mostrar el nuevo formulario
	event.preventDefault();

	// Oculta el formulario existente
	var existingForm = document.getElementById('form_create_id');
	existingForm.style.display = 'none';

	// Muestra el nuevo formulario
	var newForm = document.getElementById('newForm');
	newForm.style.display = 'inline';

	// Oculta elementos con la clase 'navbar-brand'
	var existingLabels = document.querySelectorAll('.navbar-brand');
	existingLabels.forEach(function(label) {
		label.style.display = 'none';
	});

	// Muestra elementos con la clase 'navbarbrandcreateacount'
	var newLabels = document.querySelectorAll('.navbarbrandcreateacount');
	newLabels.forEach(function(label) {
		label.style.display = 'inline';
	});
}

// Agrega un evento al botón "Create an account"
// var createAccountButton = document.getElementById('SubmitCreate');
// createAccountButton.addEventListener('click', copiarTexto);

function captureFormData() {
		// Recuperar datos existentes del commonData
		var existingData = JSON.parse(commonData.getItem('formData')) || [];

		var formData = {
				gender: document.querySelector('input[name="id_gender"]:checked').value,
				firstName: document.getElementById('customer_firstname').value,
				lastName: document.getElementById('customer_lastname').value,
				email: document.getElementById('email').value,
				password: document.getElementById('passwd').value,
				day: document.getElementById('days').value,
				month: document.getElementById('months').value,
				year: document.getElementById('years').value,
				newsletter: document.getElementById('newsletter').checked,
				optin: document.getElementById('optin').checked,
				State: document.getElementById('customer_State').value,
				StreetAddress: document.getElementById('customer_Street_Address').value,
				customer: document.getElementById('customer_apartment').value,  
				Town: document.getElementById('customer_Town').value,
				Postcode: document.getElementById('customer_Postcode').value,
				Phone: document.getElementById('Customer_Phone').value
		};

		// Verificar si existingData es un array
		if (!Array.isArray(existingData)) {
				existingData = [];
		}

		// Agregar el nuevo formulario a la lista existente
		existingData.push(formData);

		// Almacenar la lista actualizada en commonData
		commonData.setItem('formData', JSON.stringify(existingData));
}


function handleRegistration() {
		// Capturar los datos del formulario
		captureFormData();

		// Ocultar el formulario
		var newForm = document.getElementById('newForm');
		newForm.style.display = 'none';

		// Mostrar el mensaje final
		var finalMessage = document.getElementById('FINALMESSAGE');
		finalMessage.style.display = 'block';
}


document.getElementById('SubmitLogin').addEventListener('click', function() {
	var emailInput = document.querySelector('.input_login_email');
	var passwordInput = document.querySelector('.login_password');
	var email = emailInput.value;
	var password = passwordInput.value;
	if (commonData.getItem('formData')) {
	}
	var existingData = JSON.parse(commonData.getItem('formData')) || [];
	if (typeof existingData === 'string') {
	    // Parse the string into an array
	    try {
			var parsedData = JSON.parse(products);
		} catch (error) {
			console.error('Error parsing JSON:', error);
		}

	    existingData = parsedData;
	}
	console.log("This is the user",existingData);
	var user = existingData.find(function(user) {
			return user.email === email && user.password === password;
	});
	if (user) {
	// Guardar información del usuario en commonData
	commonData.setItem('user', JSON.stringify(user));
	// Obtener el nombre del usuario almacenado en el Local Storage
	var storedUser = JSON.parse(commonData.getItem('user'));
	var userName = storedUser ? storedUser.firstName : '';
	// Guardar el nombre de usuario en el Local Storage
	commonData.setItem('userName', userName);
	var login = document.getElementById('SubmitLogin');
	var loger = document.querySelector('.icon-user');
	loger.textContent = userName;
	// Redirigir a index.html
	window.location.href = 'index.html';
	} else {
	alert('invalid info, please try again :)');
	}
});

$("#SubmitCreate").on("click",function(){
	copiarTexto();
});
$("#submitAccount").on("click",function(){
	handleRegistration()
});