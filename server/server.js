require("dotenv").config();
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const mammoth = require("mammoth"); // Importar mammoth para convertir docx a HTML
const generateTermsPrivacyPdf = require('./utils/termsPrivacyPdf');
const generateCV = require("./utils/generateCV");


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

// Ruta para convertir el archivo .docx a HTML y visualizarlo
app.get("/view-cv", (req, res) => {
    const docxPath = path.join(__dirname, 'doc', 'cv.docx');

    // Leer el archivo .docx y convertirlo a HTML
    mammoth.convertToHtml({ path: docxPath })
        .then(result => {
            const htmlContent = result.value;
            res.send(`
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Visualizar CV</title>
                </head>
                <body>
                    <h1>Currículum Vitae</h1>
                    <div>${htmlContent}</div>
                </body>
                </html>
            `);
        })
        .catch(error => {
            res.status(500).send('Error al procesar el archivo .docx');
            console.error(error);
        });
});

// Ruta para descargar el archivo .docx
app.get("/download-cv", (req, res) => {
    const filePath = path.join(__dirname, 'doc', 'cv.docx');
    res.download(filePath, 'cv.docx', (err) => {
        if (err) {
            console.error('Error al descargar el archivo', err);
            res.status(500).send('Error al descargar el archivo');
        }
    });
});

// Ruta para crear y descargar el PDF con términos y condiciones y política de privacidad
app.get("/create-terms-privacy", (req, res) => {
    generateTermsPrivacyPdf(res); // Llama a la función para generar el PDF
});

// Ruta para generar y descargar el CV en PDF
app.get("/download-cv-pdf", (req, res) => {
    generateCV(res);
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
