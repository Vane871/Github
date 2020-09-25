let nombreUsuario = ""; //Variable global

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////