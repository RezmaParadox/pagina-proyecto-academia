
function validarFormulario() {
  let nombre = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let mensaje = document.getElementById("message").value;

  let eNombre = document.getElementById("name");
  let eEmail = document.getElementById("email");
  let eMensaje = document.getElementById("message");

  let errorName = document.getElementById("name-error");
  let errorEmail = document.getElementById("email-error");
  let errorMessage = document.getElementById("message-error");

  let error1 = validarNombre(nombre);
  if (error1){
    errorName.textContent = error1;
    errorName.style.display = "block";
    eNombre.classList.add("border-error");
  }else{
    errorName.style.display = "none";
    eNombre.classList.add("border-accept");
  }

  let error2 = validarEmail(email);
  if (error2){
    errorEmail.textContent = error2;
    errorEmail.style.display = "block";
    eEmail.classList.add("border-error");
  }else{
    errorEmail.style.display = "none";
    eEmail.classList.add("border-accept");
  }

  let error3 = validarMensaje(mensaje);
  if (error3){
    errorMessage.textContent = error3;
    errorMessage.style.display = "block";
    eMensaje.classList.add("border-error");
  }else{
    errorMessage.style.display = "none";
    eMensaje.classList.add("border-accept");
  }
  console.log(error1, error2, error3);

  if (error1 === null && error2 === null && error3  === null) {
    eNombre.classList.remove("border-accept"); 
    eEmail.classList.remove("border-accept");
    eMensaje.classList.remove("border-accept"); 
    eNombre.classList.remove("border-error");
    eEmail.classList.remove("border-error");
    eMensaje.classList.remove("border-error");
    enviarFormulario(nombre, email, mensaje);
  }
}

function validarNombre(nombre){
    if (nombre ==="") return "El nombre es requerido";
    if (nombre.length < 10) return "El nombre debe tener al menos 10 caracteres";
    if (nombre.length > 50) return "El nombre debe tener menos de 50 caracteres";
    return null;
}

function validarEmail(email){
    if(email === "") return "El email es requerido";
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) return "El email no es válido";
    return null;
}

function validarMensaje(mensaje){
    if(mensaje === "") return "El mensaje es requerido";
    if(mensaje.length < 10) return "El mensaje debe tener al menos 10 caracteres";
    if(mensaje.length > 500) return "El mensaje debe tener menos de 500 caracteres";
    return null;
}

function limpiarFormulario() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

function enviarFormulario( nombre, email, mensaje) {
    //Inicializar EmailJS 
    emailjs.init("8yX6taQkqw-M22pvQ");
    limpiarFormulario();
    //Enviar email
    emailjs.send('service_hrqiq4j','template_8ul2bzj',{
        from_name: nombre,
        from_email: email,
        message: mensaje
    }).then(
        function(response){
            alert ("El mensaje se envio correctamente");
            
        },
        function(error){
            alert ("El mensaje no se envio correctamente");
        }
    )
}

document.addEventListener("DOMContentLoaded", () => {
    let botonEnviar = document.getElementById("enviar");
    botonEnviar.addEventListener("click", (event) =>{
        event.preventDefault();
        validarFormulario();
    })
})