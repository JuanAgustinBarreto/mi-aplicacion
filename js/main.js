// main.js
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');

    const searchClientInput = document.getElementById('search-client');
    const searchClientBtn = document.getElementById('search-client-btn');
    const clientResults = document.getElementById('client-results');

    const searchProductInput = document.getElementById('search-product');
    const searchProductBtn = document.getElementById('search-product-btn');
    const productResults = document.getElementById('product-results');

    const orderForm = document.getElementById('order-form');
    const addToOrderBtn = document.getElementById('add-to-order');
    const orderSummary = document.getElementById('order-summary');
    const orderTableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
    const sendOrderBtn = document.getElementById('send-order-btn');

    // Placeholder data for clients and products
    const clients = [
        { id: 1, name: 'Cliente 1' },
        { id: 2, name: 'Cliente 2' },
        // Add more clients as needed
    ];

    const products = [
        { id: 1, name: 'Producto 1', price: 100 },
        { id: 2, name: 'Producto 2', price: 200 },
        // Add more products as needed
    ];

    let order = [];

    // Logout button
    logoutBtn.addEventListener('click', function() {
        redirectTo('login.html');
    });

    // Search client
    searchClientBtn.addEventListener('click', function() {
        const query = searchClientInput.value.toLowerCase();
        const filteredClients = clients.filter(client =>
            client.name.toLowerCase().includes(query) || client.id.toString().includes(query)
        );

        clientResults.innerHTML = filteredClients.map(client =>
            `<div onclick="selectClient(${client.id}, '${client.name}')">${client.name} (ID: ${client.id})</div>`
        ).join('');
    });

    // Search product
    searchProductBtn.addEventListener('click', function() {
        const query = searchProductInput.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) || product.id.toString().includes(query)
        );

        productResults.innerHTML = filteredProducts.map(product =>
            `<div onclick="selectProduct(${product.id}, '${product.name}', ${product.price})">${product.name} (ID: ${product.id})</div>`
        ).join('');
    });

    // Select client (dummy function for demo purposes)
    window.selectClient = function(id, name) {
        document.getElementById('client-id').value = id;
        showAlert(`Cliente seleccionado: ${name}`);
    };

    // Select product (dummy function for demo purposes)
    window.selectProduct = function(id, name, price) {
        document.getElementById('product-id').value = id;
        document.getElementById('product-price').value = price;
        showAlert(`Producto seleccionado: ${name}`);
    };

    // Add to order
    addToOrderBtn.addEventListener('click', function() {
        const productId = document.getElementById('product-id').value;
        const quantity = document.getElementById('product-quantity').value;
        const price = document.getElementById('product-price').value;
        const totalPrice = quantity * price;

        const product = products.find(p => p.id == productId);

        if (product) {
            order.push({...product, quantity, totalPrice });
            renderOrderTable();
        }
    });

    // Render order table
    function renderOrderTable() {
        orderTableBody.innerHTML = order.map(item =>
            `<tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.totalPrice}</td>
            </tr>`
        ).join('');
    }

    // Send order
    sendOrderBtn.addEventListener('click', function() {
        if (order.length === 0) {
            showAlert('El pedido está vacío.', 'error');
            return;
        }

        fetch('/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ order })
            })
            .then(response => response.json())
            .then(data => {
                showAlert(`Pedido guardado como archivo: ${data.fileName}`, 'success');
            })
            .catch(error => {
                showAlert('Error al enviar el pedido.', 'error');
                console.error('Error al enviar el pedido:', error);
            });
    });
});