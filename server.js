const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Ruta para manejar la creación del archivo .txt
app.post('/create-order', (req, res) => {
    const order = req.body.order;
    const fileName = `order_${Date.now()}.txt`;
    const filePath = path.join(__dirname, 'uploads', fileName);

    // Crear el contenido del archivo
    const fileContent = order.map(item =>
        `${item.id}\t${item.name}\t${item.quantity}\t${item.price}\t${item.totalPrice}`
    ).join('\n');

    // Guardar el archivo
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error('Error al guardar el archivo:', err);
            res.status(500).send('Error al guardar el archivo');
        } else {
            console.log('Archivo guardado:', filePath);
            res.send({ fileName, filePath });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});