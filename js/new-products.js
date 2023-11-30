import { productsData } from './Products.js';

if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(productsData))
}


let valueCategory = ' ';



function renderProductos() {
    let products = productsData;
    appendProductHTML(products);
}

function renderProductosByCategory(category) {
    valueCategory = category;
    let productsByCategory = products.filter(p => p.category === category);
    appendProductHTML(productsByCategory);


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
                                
                                <a href="#" class="add-to-cart d-flex justify-content-center align-items-center mx-1" data-product-id="${product.id}">
                                    <span><i class="ion-ios-cart"></i></span>
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



$(document).ready(function () {
    renderProductos();
});