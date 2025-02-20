const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateCV(res) {
    const docDir = path.join(__dirname, "../doc");

    // Verifica si la carpeta doc/ existe, si no, la crea
    if (!fs.existsSync(docDir)) {
        fs.mkdirSync(docDir, { recursive: true });
    }

    const pdfPath = path.join(docDir, "cv_sebastian_carmona_wright.pdf");
    const doc = new PDFDocument({ margin: 50 });

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    function addTitle(text) {
        doc.font("Helvetica-Bold").fontSize(16).text(text, { align: "center" }).moveDown(1);
    }

    function addSubtitle(text) {
        doc.font("Helvetica-Bold").fontSize(12).text(text, { align: "center" }).moveDown(0.5);
    }

    function addSectionTitle(text) {
        doc.font("Helvetica-Bold").fontSize(12).text(text, { align: "left" }).moveDown(0.5);
    }

    function addText(text) {
        doc.font("Helvetica").fontSize(10).text(text, { align: "justify" }).moveDown(0.5);
    }

    function addBulletPoint(text) {
        doc.font("Helvetica").fontSize(10).text(`• ${text}`, { align: "justify" }).moveDown(0.3);
    }

    // ==================== PÁGINA 1 ====================
    addTitle("SEBASTIAN IGNACIO CARMONA WRIGHT");
    addSubtitle("19.904.461-3 | (56 9) 76654966  (56 9) 61607915");
    addSubtitle("Edad: 26 años | Nacionalidad: Chilena");
    addSubtitle("Dirección: Pasaje Matías 1167, Maipú");
    addSubtitle("s.carmonawright@gmail.com");
    addSubtitle("LinkedIn: Sebastian Ignacio Carmona Wright");
    addSubtitle("Página Web Portfolio: URL Página inicio portafolio SICW");

    addTitle("Resumen Profesional");
    addText("Ingeniero en informática con experiencia en desarrollo web, marketing digital, aplicaciones web y ventas. "
        + "Presenta conocimientos técnicos en PHP, Python, Java, React, Node y SQL. Profesional autónomo, proactivo y con capacidad de adaptación.");

    addTitle("Antecedentes Laborales");

    // Experiencias laborales
    const experiencias = [
        {
            empresa: "Collins. Santiago. Ago 2024– Oct 2024",
            cargo: "Desarrollador y soporte TI",
            descripcion: [
                "Desarrollador de Sistema y soporte en el área de informática.",
                "Automatización de procesos y reducción de carga operativa.",
                "Desarrollo de aplicaciones web en PHP y SQL.",
                "Soporte técnico para distintos departamentos."
            ],
        },
        {
            empresa: "Particular Freelance. Santiago. Ago 2023– Jun 2024",
            cargo: "Desarrollo en páginas web y soporte en marketing y ecommerce",
            descripcion: [
                "Desarrollo de sitio web con bot para clientes registrados.",
                "Implementación de pruebas TDD con Laravel y Selenium IDE.",
                "Uso de Git para control de versiones.",
                "Gestión de hosting con 000webhosting.",
                "Soporte técnico durante 2 meses posteriores al desarrollo."
            ],
        },
        {
            empresa: "Textil las Américas. Santiago. Ene 2023 – Mar 2023",
            cargo: "Soporte de páginas web en el área de marketing digital y BD",
            descripcion: [
                "Solución de problemas en sistema de pagos y mejoras en experiencia de usuario.",
                "Mantenimiento y modificación de la página comercial principal con WordPress.",
                "Soporte técnico para equipos del personal."
            ],
        }
    ];

    experiencias.forEach((exp) => {
        addSectionTitle(exp.empresa);
        addText(`Cargo: ${exp.cargo}`);
        exp.descripcion.forEach(desc => addBulletPoint(desc));
    });

    // Agregamos un salto de página para que la siguiente información esté en la página 2
    doc.addPage();

    // ==================== PÁGINA 2 ====================
    const experienciasPagina2 = [
        {
            empresa: "Tecsystem-ENTEL. Santiago. Ago 2022 – Nov 2022",
            cargo: "Equipo desarrollador de aplicaciones web TI y BD",
            descripcion: [
                "Desarrollo de una aplicación web para encuestas de satisfacción.",
                "Digitalización de documentos y eliminación de procesos manuales.",
                "Análisis de datos con Power Platforms, SQL Server y SharePoint.",
                "Implementación de automatización con Microsoft Power Automate."
            ],
        },
        {
            empresa: "deLogística. Santiago. Abr 2022 – Jul 2022",
            cargo: "Equipo de soporte y desarrollo TI",
            descripcion: [
                "Planificación y desarrollo de un nuevo sitio web empresarial.",
                "Soporte técnico en la infraestructura TI.",
                "Mejora de estrategias SEO para la página web de la empresa."
            ],
        }
    ];

    experienciasPagina2.forEach((exp) => {
        addSectionTitle(exp.empresa);
        addText(`Cargo: ${exp.cargo}`);
        exp.descripcion.forEach(desc => addBulletPoint(desc));
    });

    addTitle("Antecedentes Académicos");
    addText("Instituto Profesional Duoc UC, Maipú. Ingeniería en informática (Egresado 2024).");

    addTitle("Seminarios y Cursos");
    addText("Asp.net Core 5 - 2022 | Desarrollo en Microsoft Power Apps - 2022 | PL/SQL Oracle - 2021");

    addTitle("Información Adicional");

    addSubtitle("Idiomas");
    addText("Inglés oral y escrito, nivel intermedio.");

    addSubtitle("Software");
    addText("PHP, Java, Python, React, Node.js, SQL, PowerBI, Selenium, WordPress, HTML5/CSS3.");

    addSubtitle("Actividades e Intereses");
    addText("Mantenimiento de hardware y software, instalación de cámaras de seguridad, ciclismo, viajes.");

    addSubtitle("DISPONIBILIDAD INMEDIATA");

    // Finalizar el documento
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
