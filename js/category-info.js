var category = {}; //Variable global
////////////////////////////////////////////////////////////////////////////////////////////////

 //Función que mostrará las imágenes 
 function showImagesGallery(array){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        //Html para la/s imágenes que se mostrarán
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        //Aquí estará accediendo al id creado en el html
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend; 
        }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Lanza un evento; algo va a pasar. (e es evento)
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORY_INFO_URL).then(function(resultObj){ //getJSONData accede a url´s que contienen información
        if (resultObj.status === "ok")
        {
            category = resultObj.data;
            //Agregando datos al html y accediendo a ids creados en él
            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
        
            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.productCount;
            productCriteriaHTML.innerHTML = category.productCriteria;

            showImagesGallery(category.images); //Mostrará las imágenes)
        }
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////

let nombreUsuario = ""; 

//Limpia los datos que se habían proporcionado
document.addEventListener("DOMContentLoaded", function(e){
    localStorage.clear(); 
    localStorage.removeItem('usuario');
});

//Función accede al nombreUsuario
function setName(){ 
    //Acceder al id donde está guardado el nombre de usuario (Index)
    nombreUsuario = document.getElementById("inputName").value;

    if(nombreUsuario != undefined && nombreUsuario != "");
    localStorage.setItem("usuario", nombreUsuario);
}