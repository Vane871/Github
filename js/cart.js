let nombreUsuario = ""; 
//Variables para costos
let subtotalGlobal = 0; //Subtotal general
let arrayArticles = [];
let envio = 0; 
//Variables para validacions
let formaPago = "";
let validarDatosOK = false;
let validarForma = false;

const transferencia = "transferencia";
const credito = "tarjeta";

//Función accede al nombreUsuario
function setName(){ 
    //Acceder al id donde está guardado el nombre de usuario (Index)
    nombreUsuario = document.getElementById("inputName").value;

    if(nombreUsuario != undefined && nombreUsuario != "");
    localStorage.setItem("usuario", nombreUsuario);
}

//Función que mostrará el/los producto/s
function showCartProductsAndTotalCost(array){
    let html = "";
    let subTotal = 0;
    for(let i=0; i<array.length; i++){ //For que recorre el array mostrando la info de cada producto
        //Aclaración onchange: es un atributo de evento; se produce cuando el valor de un elemento se ha cambiado
        //En este caso, los cambios se atribuyen al subtotal
        html +=`
        <tr>
        <td><img src= ${array[i].src} width="100px"></td>
        <td>${array[i].name}</td>
        <td><input class="form-control" style="width:60px;" type="number" id=${i} value=${array[i].count} min="1" onchange="productSubTotal(this.value,${array[i].unitCost},'productSubtotal${i}')"></td>
        <td>${array[i].currency} ${array[i].unitCost}</td>
        <td><span id="productSubtotal${i}" style="font-weight:bold;">${array[i].currency} ${array[i].unitCost * array[i].count}</span></td>
    </tr>
    `
    }
       
document.getElementById("cart-products").innerHTML = html;
//Estas funciones son llamadas aquí, porque están vinculadas al JSON(se accedió a precio y cantidad)
calcularSubtotal();
total();

}

//Función que devuelve el subtotal según la cantidad
function productSubTotal(cantidad, costo, idSub){
    let sub = cantidad*costo;

    document.getElementById(idSub).innerHTML = sub;
    calcularSubtotal();
    total();
}

//Función para convertir dólares a pesos
function convSubTotal(count, i){
    let sub = 0;
    if(arrayArticles[i].currency === "USD"){
        sub = arrayArticles[i].unitCost * count * 40;
    }else{
        sub = arrayArticles[i].unitCost * count;
    }
    return sub;
}

function calcularSubtotal(){
    let subtotal = 0;
    //Este for recorre el arreglo accediendo a i(artículo/s)
    for(let i = 0;i<arrayArticles.length;i++){
        let cantidad = document.getElementById(i).value;
        let subProd = convSubTotal(cantidad,i); 
        subtotal += subProd;
    }
    //Accede al id subtotal, y le agrega la moneda(UYU)
    document.getElementById("subtotal").innerHTML = "UYU " + subtotal;
    //El sobtotal al final (general), por ahora es el mismo que al inicio
    subtotalGlobal = subtotal;
}

function total(){
    //Nota: Aún falta calcular envío
    let total = subtotalGlobal + envio;
    document.getElementById("total").innerHTML = "UYU " + total;
}

document.getElementById("premium").addEventListener("click",function(){
    envio = 0.15;
    document.getElementById("envio").innerHTML = "UYU " + envio * subtotalGlobal;
    total();
});

document.getElementById("express").addEventListener("click",function(){
    envio = 0.07;
    document.getElementById("envio").innerHTML = "UYU " + envio * subtotalGlobal;
    total();
});

document.getElementById("standard").addEventListener("click",function(){
    envio = 0.05;
    document.getElementById("envio").innerHTML = "UYU " + envio * subtotalGlobal;
    total();
});


//Forma de pago
function validar(){
    if(formaPago === credito){
        let numero = document.getElementById("creditCardNumber").value;
        let codigo = document.getElementById("creditCardSecNumber").value;
        let fecha = document.getElementById("dueDate").value;

        if(numero === "" || codigo === "" || fecha === ""){
            alert("Por favor, ingrese todos los datos");
            validarForma = false;
        }else{
            alert("Forma de pago seleccionada: crédito");
            validarForma = true;
        }
    }

    if(formaPago === transferencia){
        let numeroCuenta = document.getElementById("bankAccountNumber").value;

        if(numeroCuenta === ""){
            alert("Por favor, ingrese el número de cuenta");
            validarForma = false;
        }else{
            validarForma = true;
        }
    }
    if(formaPago == ""){
        validarOK = false;
    }
}

function validarDatos(){
    let direccion = document.getElementById("formdireccion").value;
    let pais = document.getElementById("formPais").value;
    let codigoP = document.getElementById("formCodPos").value;

    if(direccion === "" || pais === "" || codigoP === ""){
        alert("Debe completar todos los datos");
        validarDatosOK = false;
    }else{
        alert("Datos guardados con éxito");
        validarDatosOK = true;
    }
}

function finalizarCompra(){
    validarDatos();
    validar();
    if(validarDatosOK && validarForma){
        alert("Compra realizada con éxito");
    }else{
        alert("Debe completar todos los datos");
    }
}

document.getElementById("credito").addEventListener("click",function(){
    formaPago = credito;
});

document.getElementById("transferencia").addEventListener("click",function(){
    formaPago = transferencia;
});

//Aclaración fetch: toma un argumento (ruta de lo que quiero buscar) y lo devuelve en un objeto (promise).
document.addEventListener("DOMContentLoaded", function(e){
    fetch("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(response){
        return response.json(); 
        }).then(response=>{                                 
            arrayArticles = response.articles;
            showCartProductsAndTotalCost(arrayArticles);
        });
});