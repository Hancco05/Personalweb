require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos (HTML, CSS, JS)

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Tu correo de Gmail
        pass: process.env.EMAIL_PASS   // Tu contraseña o App Password
    }
});

// Ruta para manejar el formulario
app.post('/send-email', async (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Destinatario (tu correo)
        subject: `Nuevo mensaje: ${asunto}`,
        text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje:\n${mensaje}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el correo', error });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
