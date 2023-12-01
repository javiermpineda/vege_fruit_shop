import { commonData } from './Products.js';

$(document).ready(function () {

	let user = commonData.getItem('user');
	let checkout = commonData.getItem('checkout');
	let order = commonData.getItem('order');
	function generateReceipt(data) {
	    let receiptHTML = '<div class="receipt-container">';
	    receiptHTML += '<div class="receipt-header">';
	    receiptHTML += '<h2>Order Receipt</h2>';
	    receiptHTML += '</div>';

	    receiptHTML += '<div class="receipt-details">';
	    for (const key in data) {
	        receiptHTML += `<p><strong>${key}:</strong> ${data[key]}</p>`;
	    }
	    receiptHTML += '</div>';

	    receiptHTML += '</div>';
	    console.log(receiptHTML);
	    return receiptHTML;
	}
	let receipt = generateReceipt(order);
	    console.log("This is the order: ",order);
	$(".receipt-container").html(generateReceipt(order));
});