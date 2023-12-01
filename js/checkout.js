import { commonData } from './Products.js';

// (function ($) {
let user = commonData.getItem('user');
if (!commonData.getItem('orders')) {
	commonData.setItem('orders', []);
}
let order = {};
let checkout = commonData.getItem('checkout');

if (typeof user === 'string') {
    // Parse the string into an array
    try {
		var parsedData = JSON.parse(user);
	} catch (error) {
		console.error('Error parsing JSON:', error);
	}

    user = parsedData;
}	
	user = {
		gender: 'Male',
	    firstName: 'John',
	    lastName: 'Doe',
	    email: 'john.doe@example.com',
	    day: '15',
	    month: 'May',
	    year: '1990',
	    newsletter: true, // or false depending on whether the checkbox is checked
	    optin: true, // or false depending on whether the checkbox is checked
	    State: 'New York',
	    StreetAddress: '123 Main St',
	    Town: 'Cityville',
	    Postcode: '10001',
	    Phone: '555-1234'
	}
	console.log("Loading user",user);
	$("#checkout_form").html(`<div class="container">
			<div class="row justify-content-center">
				<div class="col-xl-7">
					<form action="#" class="billing-form">
						<h3 class="mb-4 billing-heading">Billing Details</h3>
						<div class="row align-items-end">
							<div class="col-md-6">
								<div class="form-group">
									<label for="firstname">First Name</label>
									<input type="text" class="form-control" placeholder="" value="${user.firstName}" name="firstName">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="lastname">Last Name</label>
									<input type="text" class="form-control" placeholder="" value="${user.lastName}" name="lastName">
								</div>
							</div>
							<div class="w-100"></div>
							<div class="col-md-12">
								<div class="form-group">
									<label for="country">State / Country</label>
									<div class="select-wrap">
										<div class="icon"><span class="ion-ios-arrow-down"></span></div>
										<select name="" id="" class="form-control">
											<option value="">${user.State}</option name="State">
											<option value="">France</option>
											<option value="">Italy</option>
											<option value="">Philippines</option>
											<option value="">South Korea</option>
											<option value="">Hongkong</option>
											<option value="">Japan</option>
										</select>
									</div>
								</div>
							</div>
							<div class="w-100"></div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="streetaddress">Street Address</label>
									<input type="text" class="form-control" placeholder="House number and street name" value="${user.StreetAddress}" name="StreetAddress">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<input type="text" class="form-control"
										placeholder="Appartment, suite, unit etc: (optional)">
								</div>
							</div>
							<div class="w-100"></div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="towncity">Town / City</label>
									<input type="text" class="form-control" placeholder="" value="${user.Town}" name="Town">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="postcodezip">Postcode / ZIP *</label>
									<input type="text" class="form-control" placeholder="" value="${user.Postcode}" name="Postcode">
								</div>
							</div>
							<div class="w-100"></div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="phone">Phone</label>
									<input type="text" class="form-control" placeholder="" value="${user.Phone}" name="Phone">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label for="emailaddress">Email Address</label>
									<input type="text" class="form-control" placeholder="${user.email}" name="email">
								</div>
							</div>
							<div class="w-100"></div>
							<div class="col-md-12">
								<div class="form-group mt-4">
									<div class="radio">
										<label class="mr-3"><input type="radio" name="optradio"> Create an Account?
										</label>
										<label><input type="radio" name="optradio"> Ship to different address</label>
									</div>
								</div>
							</div>
						</div>
					</form><!-- END -->
				</div>
				<div class="col-xl-5">
					<div class="row mt-5 pt-3">
						<div id="checkout-page-totals">
							<!-- Loading contents from cart.js -->				
						</div>
						<div class="col-md-12">
							<div class="cart-detail p-3 p-md-4">
								<h3 class="billing-heading mb-4">Payment Method</h3>
								<div class="form-group">
									<div class="col-md-12">
										<div class="radio">
											<label><input type="radio" name="optradio" class="mr-2" value="Bank"> Direct Bank
												Tranfer</label>
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<div class="radio">
											<label><input type="radio" name="optradio" class="mr-2" value="Check"> Check
												Payment</label>
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<div class="radio">
											<label><input type="radio" name="optradio" class="mr-2" value="Paypal"> Paypal</label>
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<div class="checkbox">
											<label><input type="checkbox" value="" class="mr-2"> I have read and accept
												the terms and conditions</label>
										</div>
									</div>
								</div>
								<p><a href="order.html" id="placeOrder" class="btn btn-primary py-3 px-4">Place an order</a></p>
							</div>
						</div>
					</div>
				</div> <!-- .col-md-8 -->
			</div>
		</div>`);

$("#placeOrder").on("click",function(){
	// Create an object to store form data
    var formData = {};

    // Iterate through each form element with class "form-control"
    document.querySelectorAll('.form-control').forEach(function (input) {
        // Get the name attribute of the input (assumes the name attribute is set)
        var fieldName = input.getAttribute('name');

        // Get the value of the input
        var fieldValue = input.value;

        // Add the field and value to the formData object
        formData[fieldName] = fieldValue;

    });
    var selectedPaymentMethod = $("input[name='optradio']:checked").val();
    Object.assign(order,formData, checkout,{'selectedPaymentMethod':selectedPaymentMethod});
    console.log(order);
    commonData.setItem('order',order);
    window.location.href="order.html";
});