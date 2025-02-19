require("dotenv").config();
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const generateTermsPrivacyPdf = require('./utils/termsPrivacyPdf');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'public' en la raíz
app.use(express.static(path.join(__dirname, '../public')));

// Configurar almacenamiento para Multer (máximo 64MB)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 64 * 1024 * 1024 }, // 64MB
});

// Configurar transporte de Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Configurado en .env
        pass: process.env.EMAIL_PASS, // Configurado en .env
    },
});

// Ruta para recibir el formulario
app.post("/send", upload.single("archivo"), async (req, res) => {
    try {
        const { nombre, email, asunto, mensaje } = req.body;
        let attachments = [];

        // Si hay un archivo adjunto, lo agregamos
        if (req.file) {
            attachments.push({
                filename: req.file.originalname,
                content: req.file.buffer, // Archivo en memoria
            });
        }

        // Configurar el correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "destinatario@gmail.com", // Reemplaza con tu correo de destino
            subject: asunto,
            text: `Nombre: ${nombre}\nCorreo: ${email}\nMensaje:\n${mensaje}`,
            attachments, // Adjuntar solo si hay un archivo
        };

        // Enviar correo
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Correo enviado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error al enviar el correo" });
    }
});

// Ruta para servir el archivo index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Ruta para crear y descargar el PDF con términos y condiciones y política de privacidad
app.get("/create-terms-privacy", (req, res) => {
    generateTermsPrivacyPdf(res); // Llama a la función para generar el PDF
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
