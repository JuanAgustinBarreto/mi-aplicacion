document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    // Login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple authentication (replace with actual authentication)
        if (username === 'admin' && password === 'admin') {
            redirectTo('main.html');
        } else {
            showAlert('Credenciales incorrectas', 'error');
        }
    });
});