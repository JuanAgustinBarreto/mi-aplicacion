// script.js

// Función para mostrar alertas de forma centralizada
function showAlert(message, type = 'info') {
    // Crear un div para la alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Añadir la alerta al cuerpo del documento
    document.body.appendChild(alertDiv);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        document.body.removeChild(alertDiv);
    }, 3000);
}

// Función para validar campos de formulario
function validateForm(fields) {
    for (let field of fields) {
        if (field.value.trim() === '') {
            showAlert(`El campo ${field.name} es obligatorio.`, 'error');
            return false;
        }
    }
    return true;
}

// Función para redirigir a otra página
function redirectTo(page) {
    window.location.href = page;
}

// Ejemplo de uso en un evento
document.addEventListener('DOMContentLoaded', function() {
    const exampleButton = document.getElementById('example-button');
    if (exampleButton) {
        exampleButton.addEventListener('click', function() {
            showAlert('Esto es un mensaje de prueba.');
        });
    }
});