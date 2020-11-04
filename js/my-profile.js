let nombreUsuario = ""; 

//Función accede al nombreUsuario
function setName(){ 
    //Acceder al id donde está guardado el nombre de usuario (Index)
    nombreUsuario = document.getElementById("inputName").value;

    if(nombreUsuario != undefined && nombreUsuario != ""){
    localStorage.setItem("usuario", nombreUsuario);
    }
}

//Función que se encargará de guardar los datos del usuario
function guardar(){
    let nombre = document.getElementById("nombreC").value; //Accede a los valores de cada input
    let edad = document.getElementById("edad").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    
    if(nombre == null){
        nombre = "";
    }
    //Creo un objeto javaScript
    let obj = {
        name:nombre,
        age:edad,
        correo:email,
        telContacto:telefono
    }

    let jsonData = JSON.stringify(obj); 
    console.log(jsonData + "prueba");
    localStorage.setItem("datosUsuario",jsonData);
}
document.addEventListener("DOMContentLoaded", function (e) {
    let datos = localStorage.getItem("datosUsuario"); //Convierto el objeto javascript en un JSON
    console.log(datos);
    if(datos != null){
        let obj = JSON.parse(datos);
        //Accedo a los datos antes creados en el objeto
        document.getElementById("nombreC").value = obj.name;
        document.getElementById("edad").value = obj.age;
        document.getElementById("email").value = obj.correo;
        document.getElementById("telefono").value = obj.telContacto;
    }
});