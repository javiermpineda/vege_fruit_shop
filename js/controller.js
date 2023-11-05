if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(productsData))
}



let products = JSON.parse(localStorage.getItem('products'));


let valueCategory = '';
function selectOption(id, menuOption) {
    document.getElementById('InitialContent').style.display = 'none';
    document.getElementById(id).style.display = 'flex';
    document.querySelectorAll('.menu-option').forEach(etiqueta => {
        etiqueta.classList.remove('active')
    })

    menuOption.classList.add('active');


}


function renderProductos() {

    valueCategory = '';
    // let productosPorNegocio = productos.filter(producto => producto.negocio == idNegocio);


    document.getElementById('InitialContent').innerHTML = '';

    for (let i = 0; i < products.length; i++) {

        document.getElementById('InitialContent').innerHTML +=
            `

    <div  class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
        <div class="product">
            <a href="#" class="img-prod"><img class="img-fluid" src="${products[i].imageURL}" alt="Colorlib Template">
                <div class="overlay"></div>
            </a>
            <div class="text py-3 pb-4 px-3 text-center">
                <h3><a href="#">${products[i].name}</a></h3>
                <div class="d-flex">
                    <div class="pricing">
                        <p class="price"><span>$${products[i].price.toFixed(2)}</span></p>
                    </div>
                </div>
                <div class="bottom-area d-flex px-3">
                    <div class="m-auto d-flex">
                        <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                            <span><i class="ion-ios-menu"></i></span>
                        </a>
                        <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                            <span><i class="ion-ios-cart" onclick="addCart(products[${i}])"></i></span>
                        </a>
                        <a href="#" class="heart d-flex justify-content-center align-items-center ">
                            <span><i class="ion-ios-heart"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
     </div>

   `

    }

    document.getElementById('InitialContent').style.display = 'flex';

    document.querySelectorAll('.menu-option').forEach(etiqueta => {
        etiqueta.classList.remove('active')
    });


}
function renderProductosByCategory(category) {

    valueCategory = category;
    let productsByCategory = products.filter(products => products.category == category);


    document.getElementById('InitialContent').innerHTML = '';


    for (let i = 0; i < productsByCategory.length; i++) {

        document.getElementById('InitialContent').innerHTML +=
            `

    <div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
        <div class="product">
            <a href="#" class="img-prod"><img class="img-fluid" src="${productsByCategory[i].imageURL}" alt="Colorlib Template">
                <div class="overlay"></div>
            </a>
            <div class="text py-3 pb-4 px-3 text-center">
                <h3><a href="#">${productsByCategory[i].name}</a></h3>
                <div class="d-flex">
                    <div class="pricing">
                        <p class="price"><span>$${productsByCategory[i].price.toFixed(2)}</span></p>
                    </div>
                </div>
                <div class="bottom-area d-flex px-3">
                    <div class="m-auto d-flex">
                        <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                            <span><i class="ion-ios-menu"></i></span>
                        </a>
                        <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                            <span><i class="ion-ios-cart"></i></span>
                        </a>
                        <a href="#" class="heart d-flex justify-content-center align-items-center ">
                            <span><i class="ion-ios-heart"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
     </div>

   `

    }




    document.getElementById('InitialContent').style.display = 'flex';

    document.querySelectorAll('.menu-option').forEach(etiqueta => {
        etiqueta.classList.remove('active')
    });


}



function renderProductosByCategoryPrice() {
    const category = valueCategory;
    const price = document.getElementById('rangeValue').textContent;
    console.log(price);
    if (valueCategory == '') {
        var renderProductosByCategoryPrice = products.filter(products => (products.price <= price));
    } else {
        var renderProductosByCategoryPrice = products.filter(products => (products.category == category) && (products.price <= price));
    }
    console.log(renderProductosByCategoryPrice);
    document.getElementById('InitialContent').innerHTML = '';


    for (let i = 0; i < renderProductosByCategoryPrice.length; i++) {

        document.getElementById('InitialContent').innerHTML +=
            `

    <div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
        <div class="product">
            <a href="#" class="img-prod"><img class="img-fluid" src="${renderProductosByCategoryPrice[i].imageURL}" alt="Colorlib Template">
                <div class="overlay"></div>
            </a>
            <div class="text py-3 pb-4 px-3 text-center">
                <h3><a href="#">${renderProductosByCategoryPrice[i].name}</a></h3>
                <div class="d-flex">
                    <div class="pricing">
                        <p class="price"><span>$${renderProductosByCategoryPrice[i].price.toFixed(2)}</span></p>
                    </div>
                </div>
                <div class="bottom-area d-flex px-3">
                    <div class="m-auto d-flex">
                        <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                            <span><i class="ion-ios-menu"></i></span>
                        </a>
                        <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                            <span><i class="ion-ios-cart"></i></span>
                        </a>
                        <a href="#" class="heart d-flex justify-content-center align-items-center ">
                            <span><i class="ion-ios-heart"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
     </div>

   `

    }




    document.getElementById('InitialContent').style.display = 'flex';

    document.querySelectorAll('.menu-option').forEach(etiqueta => {
        etiqueta.classList.remove('active')
    });
}

function search_products(){
    let result;
    let search = document.getElementById('searcher');
    result = products.filter(products => products.name.toLowerCase().includes(search.value.toLowerCase()))
    document.getElementById('InitialContent').innerHTML = '';

    if(search.value != '')
    for(let i=0; i< result.length; i++){
        document.getElementById('InitialContent').innerHTML += 
        ` <div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
        <div class="product">
            <a href="#" class="img-prod"><img class="img-fluid" src="${result[i].imageURL}" alt="Colorlib Template">
                <div class="overlay"></div>
            </a>
            <div class="text py-3 pb-4 px-3 text-center">
                <h3><a href="#">${result[i].name}</a></h3>
                <div class="d-flex">
                    <div class="pricing">
                        <p class="price"><span>$${result[i].price.toFixed(2)}</span></p>
                    </div>
                </div>
                <div class="bottom-area d-flex px-3">
                    <div class="m-auto d-flex">
                        <a href="#" class="add-to-cart d-flex justify-content-center align-items-center text-center">
                            <span><i class="ion-ios-menu"></i></span>
                        </a>
                        <a href="#" class="buy-now d-flex justify-content-center align-items-center mx-1">
                            <span><i class="ion-ios-cart"></i></span>
                        </a>
                        <a href="#" class="heart d-flex justify-content-center align-items-center ">
                            <span><i class="ion-ios-heart"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
     </div>`
    }



}

const rangeInput = document.getElementById('rangeInput');
const rangeValue = document.getElementById('rangeValue');
rangeInput.addEventListener('input', showValue)

function showValue() {
    rangeValue.textContent = rangeInput.value;
}
renderProductos()

function addCart(product){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Add the product to the cart
    cart.push(product);
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}