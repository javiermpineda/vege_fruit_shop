if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(productsData))
}

let products = JSON.parse(localStorage.getItem('products'));

let valueCategory = ' ';

function selectOption(id, menuOption) {
    $('#InitialContent').hide();
    $('#' + id).show();
    $('.menu-option').removeClass('active');
    $(menuOption).addClass('active');
}

function renderProductos() {
    appendProductHTML(products);
}

function renderProductosByCategory(category) {
    valueCategory = category;
    let productsByCategory = products.filter(p => p.category === category);
    appendProductHTML(productsByCategory);
    recargarScript('js/cart.js');

}

function renderProductosByCategoryPrice() {
    const category = valueCategory;
    const priceValue = $('#rangeValue').text();
    const price = parseFloat(priceValue);

    var filteredProducts;
    if (valueCategory === ' ') {
        filteredProducts = products.filter(p => p.price <= price);
    } else {
        filteredProducts = products.filter(p => p.category === category && parseFloat(p.price) <= price);
    }

    appendProductHTML(filteredProducts);
    recargarScript('js/cart.js');
}

function search_products() {
    let searchValue = $('#searcher').val().toLowerCase();
    let result = products.filter(p => p.name.toLowerCase().includes(searchValue));

    if (searchValue !== ' ') {
        appendProductHTML(result);
        recargarScript('js/cart.js');
    }
    recargarScript('js/cart.js');
}

const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');
rangeInput.addEventListener('input', showValue)

function showValue() {
    rangeValue.textContent = rangeInput.value;
}

function appendProductHTML(productsToRender) {
    $('#InitialContent').empty().css('display', 'flex');

    $.each(productsToRender, function (index, product) {
        let priceTag = ' ';
        let discountTag = ' ';

        if (product.discount > 0) {
            let discountedPrice = product.price - (product.price * product.discount / 100);
            priceTag = `<p class="price"><span class="mr-2 price-dc">$${product.price.toFixed(2)}</span><span class="price-sale">$${discountedPrice.toFixed(2)}</span></p>`;
            discountTag = `<span class="status">${product.discount}%</span>`;
        } else {
            priceTag = `<p class="price"><span>$${product.price.toFixed(2)}</span></p>`;
            discountTag = ' ';
        }

        $('#InitialContent').append(`
            <div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
                <div class="product">
                    <a href="product-single.html?id=${product.id}" class="img-prod"><img class="img-fluid" src="${product.imageURL}" alt="Colorlib Template">
                       ${discountTag}
                        <div class="overlay"></div>
                    </a>
                    <div class="text py-3 pb-4 px-3 text-center">
                        <h3><a href="#">${product.name}</a></h3>
                        <div class="d-flex">
                            <div class="pricing">
                               ${priceTag}
                            </div>
                        </div>
                        <div class="bottom-area d-flex px-3">
                            <div class="m-auto d-flex">
                                <a href="#" class="buy-now d-flex justify-content-center align-items-center text-center" data-product-id="${product.id}">
                                    <span><i class="ion-ios-menu"></i></span>
                                </a>
                                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center mx-1" data-product-id="${product.id}">
                                    <span><i class="ion-ios-cart"></i></span>
                                </a>
                                <a href="#" class="heart d-flex justify-content-center align-items-center">
                                    <span><i class="ion-ios-heart"></i></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    $('.menu-option').removeClass('active');
}

function recargarScript(nombreScript) {
    var scriptActual = document.querySelector('script[src="js/cart.js"]');
    var nuevoScript = document.createElement('script');
    nuevoScript.src = nombreScript;
    scriptActual.parentNode.replaceChild(nuevoScript, scriptActual);
}

$(document).ready(function () {
    renderProductos();
});