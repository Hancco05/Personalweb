document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Creamos el FormData para manejar el archivo
    const formData = new FormData(this);

    // Añadimos los campos adicionales manualmente
    formData.append('nombre', document.getElementById("nombre").value);
    formData.append('email', document.getElementById("email").value);
    formData.append('asunto', document.getElementById("asunto").value);
    formData.append('mensaje', document.getElementById("mensaje").value);

    try {
        const response = await fetch("/send", { // Se corrige la ruta
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message); // Muestra una alerta con el mensaje de éxito
            this.reset();
        } else {
            alert("Error al enviar el mensaje."); // Muestra una alerta con el error
        }
    } catch (error) {
        alert("Error al enviar el mensaje."); // Muestra una alerta con el error
    }
});
