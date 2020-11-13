const ORDER_BY_COST_UPWARD = "costoAsc"
const ORDER_BY_COST_FALLING = "costoDes"
const ORDER_BY_RELEVANCE = "vendidos"
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_BY_COST_UPWARD){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_COST_FALLING){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return 1; }
            if ( a.cost < b.cost ){ return -1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_RELEVANCE){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

    function showProductsList(){

        let htmlContentToAppend = "";
        for(let i = 0; i < currentProductsArray.length; i++){
            let product = currentProductsArray[i];

            if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
    
            htmlContentToAppend += `
            <div class="col-lg-6 col-sm-12">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" style="max-width:80px;" class="img-responsive">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <div>
                        <p> ` + product.description + ` </p>
                        <p> ` + product.currency + " " + product.cost + ` </p>
                    </div>
                </div>
            </div>
        </div>
            `
            }
    
            document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
        }
    }

    function sortAndShowProducts(sortCriteria, productsArray){
        currentSortCriteria = sortCriteria;
    
        if(productsArray != undefined){
            currentProductsArray = productsArray;
        }
    
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    
        //Muestro las categorías ordenadas
        showProductsList();
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_BY_COST_UPWARD, resultObj.data);
        }
    });
});
    document.getElementById("costoAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_COST_UPWARD);
    });

    document.getElementById("costoDes").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_COST_FALLING);
    });

    document.getElementById("vendidos").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_RELEVANCE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){ 
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    }); 
