function showComentsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + productInfo.imgSrc + `" alt="` + productInfo.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ productInfo.name +`</h4>
                        <small class="text-muted">` + productInfo.soldCount + ` artículos</small>
                    </div>
                    <div>
                    <p> ` + productInfo.category + ` </p>
                    <p> ` + productInfo.currency + " " + productInfo.cost + ` </p>
                </div>
            </div>
        </div>
    </div>
        `
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
           let productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
});