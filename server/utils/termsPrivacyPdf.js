const PDFDocument = require('pdfkit');

// Función para generar los términos y la política en PDF
const generateTermsPrivacyPdf = (res) => {
    const doc = new PDFDocument();

    // Ruta de salida para el archivo
    const filename = 'Terminos_y_Condiciones_y_Politica_de_Privacidad.pdf';
    
    // Configurar la respuesta para la descarga
    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-type', 'application/pdf');

    // Inicia el PDF y añade contenido
    doc.pipe(res);
    
    // Título
    doc.fontSize(18).text('Términos y Condiciones y Política de Privacidad', { align: 'center' });
    doc.moveDown(2);  // Espacio adicional
    
    // Términos y Condiciones
    doc.fontSize(14).text('Términos y Condiciones', { underline: true });
    doc.moveDown(1);
    doc.fontSize(12).text('Estos términos y condiciones rigen el uso de este sitio web. Al acceder a este sitio web, aceptas estos términos en su totalidad.');
    doc.text('Si no estás de acuerdo con alguna parte de estos términos y condiciones, no utilices este sitio web.');
    doc.moveDown(1);
    doc.text('1. Uso del sitio web');
    doc.text('- No debes usar este sitio web de manera fraudulenta o ilegal.');
    doc.text('- No debes copiar, reproducir o distribuir contenido sin permiso.');
    doc.moveDown(1);
    doc.text('2. Propiedad intelectual');
    doc.text('- Todo el contenido de este sitio web está protegido por derechos de autor.');
    doc.moveDown(1);
    doc.text('3. Limitaciones de responsabilidad');
    doc.text('- No nos hacemos responsables por daños derivados del uso de este sitio.');
    doc.moveDown(1);
    doc.text('Estos términos pueden actualizarse en cualquier momento.');
    
    doc.moveDown(2); // Espacio adicional

    // Política de Privacidad
    doc.fontSize(14).text('Política de Privacidad', { underline: true });
    doc.moveDown(1);
    doc.fontSize(12).text('Respetamos tu privacidad y protegemos tu información personal.');
    doc.moveDown(1);
    doc.text('1. Información recopilada:');
    doc.text('- Recopilamos información básica de navegación y datos de contacto cuando los proporcionas voluntariamente.');
    doc.moveDown(1);
    doc.text('2. Uso de la información:');
    doc.text('- Utilizamos la información solo para mejorar la experiencia del usuario y brindar soporte.');
    doc.moveDown(1);
    doc.text('3. Seguridad:');
    doc.text('- Implementamos medidas de seguridad para proteger la información del usuario.');
    doc.moveDown(1);
    doc.text('Si tienes preguntas sobre esta política, contáctanos.');
    
    // Finalizar el documento
    doc.end();
};

module.exports = generateTermsPrivacyPdf;
