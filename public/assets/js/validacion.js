// Obtiene los elementos del formulario
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const btnSend = document.getElementById('btnSend');

// Agregar un evento de escucha a los campos de contraseña
usernameInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);
passwordConfirmInput.addEventListener('input', validateForm);

// Función para validar el formulario
function validateForm() {
    const usernameValue = usernameInput.value;
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    const passwordConfirmValue = passwordConfirmInput.value;

    // Verificar si todos los campos cumplen los requisitos
    if (
      usernameValue !== '' &&
      emailValue !== '' &&
      passwordValue.length >= 8 &&
      passwordConfirmValue === passwordValue
    ) {
      btnSend.disabled = false; // Habilitar el botón
    } else {
      btnSend.disabled = true; // Deshabilitar el botón
    }
  }
