var product = {};
var productList = {};
const maxRating = 5;
var productScore = "";
var comments = [];
var score = "";

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesWrapper").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(relatedProductsArray) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productList = resultObj.data;

            let htmlRelatedProducts = "";

            for (let i = 0; i < relatedProductsArray.length; i++) {
                let relatedProductPosition = relatedProductsArray[i];
                let relatedProduct = productList[relatedProductPosition];

                htmlRelatedProducts += `
                <div class= "col-lg-3 col-md-4 col-6 border">
                    <div id="relatedProductImg" class= "row">
                        <img class="img-fluid p-2" src="`+relatedProduct.imgSrc+`">                                              
                    </div>                   
                    <div "relatedProductInfo" class= "row p-2">
                    <p>`+ relatedProduct.name + `</p> 
                    <p>`+ relatedProduct.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="products-info.html">Ver</a>
                    </div>                     
                </div>`
            }
            document.getElementById("relatedProductsContainer").innerHTML = htmlRelatedProducts;
        }
    })
}

function showComments() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
         comments = resultObj.data;

            let html = '';

            
            for (let i = 0; i<comments.length; i++) {
                 let productScore = comments[i].score;
                 let score = "";
                 for (let i = 1; i <= productScore; i++) {
                     score += '<i class="fas fa-star checked"></i>'
                 }

                 for(let i = productScore + 1; i <= 5; i++){
                    score += '<i class="fas fa-star"></i>'
                 }



            html += `
            <li class="media">
               <div class="media-body">
                  <label class="mt-0"><strong>${comments[i].user}</strong>
                     <span class="mute"> - ${comments[i].dateTime}</span><span>${score}</span>
                   </label>
                   <br/>
                   <label class="small">${comments[i].description}</label>
                   <hr/>
               </div>
            </li>
            `
            };
        document.getElementById("feedbackProductsContainer").innerHTML = html;
        }
    });
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + " " + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            
            showImagesGallery(product.images);
            showRelatedProducts(product.relatedProducts);
        }
    });
    showComments();
});