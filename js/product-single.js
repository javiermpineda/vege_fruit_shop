const productInfo = document.getElementById("productInfo");

let urlParams = new URLSearchParams(window.location.search);
var receivedId = urlParams.get('id');

if (receivedId==null) {
    receivedId=1;
}


console.log("recived ID"+ receivedId)

console.log(productsData);
console.log("bbbbbb"+productsData[0]);
console.log("gggg")
var infoSingleProduct = productsData.filter(productsData => (productsData.id == receivedId));
console.log( infoSingleProduct[0].imageURL);








    // Create the HTML structure for the product card.
    productInfo.innerHTML = `
   
    <div class="container">
      <div class="row">
        <div class="col-lg-6 mb-5 ftco-animate">
          <a href="images/product-7.jpg" class="image-popup"
            ><img
              src="${infoSingleProduct[0].imageURL}"
              class="img-fluid"
              alt="Colorlib Template"
          /></a>
        </div>
        <div class="col-lg-6 product-details pl-md-5 ftco-animate">
          <h3>${infoSingleProduct[0].name}</h3>
          
          <p class="price"><span>$${infoSingleProduct[0].price.toFixed(2)}</p>
          <p>
           ${infoSingleProduct[0].description}
          </p>
          <div class="row mt-4">
            <div class="col-md-6">
              <div class="form-group d-flex">
                <div class="select-wrap">
                  <div class="icon">
                    <span class="ion-ios-arrow-down"></span>
                  </div>
                  
                </div>
              </div>
            </div>
            <div class="w-100"></div>
            <div class="input-group col-md-6 d-flex mb-3">
              <span class="input-group-btn mr-2">
                <button
                  type="button"
                  class="quantity-left-minus btn"
                  data-type="minus"
                  data-field="">
                  <i class="ion-ios-remove"></i>
                </button>
              </span>
              <input
                type="text"
                id="quantity"
                name="quantity"
                class="form-control input-number"
                value="1"
                min="1"
                max="100" />
              <span class="input-group-btn ml-2">
                <button
                  type="button"
                  class="quantity-right-plus btn"
                  data-type="plus"
                  data-field="">
                  <i class="ion-ios-add"></i>
                </button>
              </span>
            </div>
            <div class="w-100"></div>
            <div class="col-md-12">
              <p style="color: #000">600 kg available</p>
            </div>
          </div>
          <p>
            <a href="#" id="addToCartBtn" class="btn btn-black py-3 px-5"
              >Add to Cart</a
            >
          </p>
        </div>
      </div>
    </div>
  `;

 
  
