if(!localStorage.getItem('products')){
    localStorage.setItem('products',JSON.stringify(productsData))
}

var products = JSON.parse(localStorage.getItem('products'));

function selectOption(id, menuOption){
    document.getElementById('InitialContent').style.display = 'none';
    document.getElementById(id).style.display = 'flex';
    document.querySelectorAll('.menu-option').forEach(etiqueta =>{
        etiqueta.classList.remove('active')
    })

    menuOption.classList.add('active');

   
}

function renderProductos(){
    

   // let productosPorNegocio = productos.filter(producto => producto.negocio == idNegocio);


    document.getElementById('InitialContent').innerHTML = '';


    for(let i = 0; i< products.length; i++){
       
        document.getElementById('InitialContent').innerHTML += 
        `

    <div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated">
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

    document.querySelectorAll('.menu-option').forEach(etiqueta =>{
        etiqueta.classList.remove('active')
    });


}
function renderProductosByCategory(category){
    

    let productsByCategory = products.filter(products => products.category == category);


    document.getElementById('InitialContent').innerHTML = '';


    for(let i = 0; i< productsByCategory.length; i++){
       
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

    document.querySelectorAll('.menu-option').forEach(etiqueta =>{
        etiqueta.classList.remove('active')
    });


}