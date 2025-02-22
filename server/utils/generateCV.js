const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateCV(res) {
    const docDir = path.join(__dirname, "../doc");
    
    if (!fs.existsSync(docDir)) {
        fs.mkdirSync(docDir, { recursive: true });
    }

    const pdfPath = path.join(docDir, "cv_sebastian_carmona_wright.pdf");
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    function addTitle(text) {
        doc.font("Helvetica-Bold").fontSize(18).text(text, { align: "center" }).moveDown(1);
    }

    function addSectionTitle(text) {
        doc.font("Helvetica-Bold").fontSize(14).text(text, { align: "left" }).moveDown(0.5);
    }

    function addText(text, options = {}) {
        doc.font("Helvetica").fontSize(10).text(text, { align: "justify", ...options }).moveDown(0.5);
    }

    function addBulletPoint(text) {
        doc.font("Helvetica").fontSize(10).text(`• ${text}`, { align: "justify" }).moveDown(0.3);
    }

    addTitle("SEBASTIAN IGNACIO CARMONA WRIGHT");
    addText("19.904.461-3");
    addText("(56 9) 76654966  |  (56 9) 61607915");
    addText("Edad: 26 años | Nacionalidad: Chilena");
    addText("Dirección: Pasaje Matías 1167, Maipú");
    doc.fillColor("blue").text("s.carmonawright@gmail.com", { link: "mailto:s.carmonawright@gmail.com", underline: true });
    doc.fillColor("blue").text("Página Web Portfolio: https://sebastiancarmonawright.netlify.app/", { link: "https://sebastiancarmonawright.netlify.app/", underline: true });
    doc.fillColor("black");

    addTitle("Resumen Profesional");
    addText("Ingeniero en informática con experiencia en desarrollo web, marketing digital, aplicaciones web y ventas. Conocimientos en PHP, Python, Java, React, Node y SQL. Profesional autónomo, proactivo y con capacidad de adaptación.");

    addTitle("Antecedentes Laborales");
    
    const experiencias = [
        { empresa: "Collins (Jul 2024 – Oct 2024)", cargo: "Desarrollador y soporte TI", descripcion: [
            "Desarrollo de aplicaciones web utilizando PHP y SQL, enfocadas en la creación y mantenimiento de un sistema intranet.",
            "Automatización de procesos para optimizar flujos de trabajo, reduciendo tiempos operativos en un 30%.",
            "Soporte técnico a diferentes departamentos, solucionando problemas relacionados con software y bases de datos.",
            "Implementación de mejoras continuas en los sistemas internos para mayor eficiencia."
        ] },
        { empresa: "Particular Freelance (Ago 2023 – Jun 2024)", cargo: "Desarrollo de páginas web y ecommerce", descripcion: [
            "Desarrollo de sitios web para clientes utilizando PHP, Laravel y MySQL.",
            "Implementación de pruebas TDD con Laravel y Selenium IDE para mejorar la calidad del software.",
            "Configuración y gestión de servidores en 000webhosting y AWS.",
            "Soporte técnico y mantenimiento de las plataformas durante 2 meses post lanzamiento."
        ] },
        { empresa: "Textil las Américas (Ene 2023 – Jun 2023)", cargo: "Soporte de páginas web y marketing digital", descripcion: [
            "Mantenimiento y modificación de la página comercial principal con WordPress.",
            "Solución de problemas en sistema de pagos, logrando mejorar la tasa de conversión en un 15%.",
            "Integración de estrategias SEO para aumentar la visibilidad del sitio web."
        ] },
        { empresa: "Tecsystem-ENTEL (Ago 2022 – Dic 2022)", cargo: "Equipo desarrollador de aplicaciones web TI y BD", descripcion: [
            "Desarrollo de una aplicación web para encuestas de satisfacción de clientes, reduciendo el tiempo de respuesta en un 40%.",
            "Digitalización de documentos para eliminar procesos manuales ineficientes.",
            "Análisis de datos con Power Platforms, SQL Server y SharePoint para mejorar la toma de decisiones operativas.",
            "Implementación de automatización de reportes con Microsoft Power Automate."
        ] },
        { empresa: "deLogística (Abr 2022 – Jul 2022)", cargo: "Equipo de soporte y desarrollo TI", descripcion: [
            "Planificación y desarrollo de un nuevo sitio web empresarial, optimizando la navegación del usuario.",
            "Soporte técnico en la infraestructura TI, mejorando la estabilidad del sistema en un 25%.",
            "Mejora de estrategias SEO para la página web de la empresa, incrementando el tráfico web en un 20%."
        ] }
    ];
    
    experiencias.forEach((exp) => {
        addSectionTitle(exp.empresa);
        addText(`Cargo: ${exp.cargo}`);
        exp.descripcion.forEach(desc => addBulletPoint(desc));
    });

    doc.addPage();
    
    addTitle("Antecedentes Académicos");
    addText("Instituto Profesional Duoc UC, Maipú - Ingeniería en informática (Egresado 2024)");
    
    addTitle("Seminarios y Cursos");
    addText("Asp.net Core 5 - 2022 | Desarrollo en Microsoft Power Apps - 2022 | PL/SQL Oracle - 2021");
    
    addTitle("Información Adicional");
    addText("Idiomas: Inglés oral y escrito, nivel intermedio.");
    addText("Software: PHP, Java, Python, React, Node.js, SQL, PowerBI, Selenium, WordPress, HTML5/CSS3.");
    addText("Actividades e Intereses: Fui jugador semi profesional de videojuegos Rocket League y speedrun aficionado de videojuegos de la saga Resident Evil, mantenimiento de hardware y software y futbol.");
    
    addText("DISPONIBILIDAD INMEDIATA");
    
    doc.end();
    
    stream.on("finish", () => {
        res.download(pdfPath, "cv_sebastian_carmona_wright.pdf", (err) => {
            if (err) {
                console.error("Error al descargar el archivo PDF:", err);
                res.status(500).send("No se pudo descargar el archivo.");
            }
        });
    });
}

module.exports = generateCV;
