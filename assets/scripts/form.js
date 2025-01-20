document.querySelector("#formulario").addEventListener("submit", function (event) {
    // Limpiar mensajes previos
    clearErrors(this);

    if (!validateForm(this)) {
      event.preventDefault(); // Prevenir envío solo si la validación falla
    } else {
      alert("Formulario enviado correctamente");
    }
  });
  
  // Función para validar el formulario
  function validateForm(form) {
    let isValid = true;
  
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();
  
    const labelNameError = form.querySelector("#name-error");
    const labelEmailError = form.querySelector("#email-error");
    const labelMessageError = form.querySelector("#message-error");
  
    // Validar nombre
    if (name == "") {
      isValid = false;
      labelNameError.textContent = "El nombre es requerido";
    }
  
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      isValid = false;
      labelEmailError.textContent = "El email no es válido";
    }
  
    // Validar mensaje
    if (message === "") {
      isValid = false;
      labelMessageError.textContent = "El mensaje es requerido";
    }
  
    return isValid;
  }
  
  // Función para limpiar mensajes de error
  function clearErrors(form) {
    form.querySelector("#name-error").textContent = "";
    form.querySelector("#email-error").textContent = "";
    form.querySelector("#message-error").textContent = "";
  }