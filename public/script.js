document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        asunto: document.getElementById("asunto").value,
        mensaje: document.getElementById("mensaje").value
    };

    try {
        const response = await fetch("/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        document.getElementById("responseMessage").innerHTML = `<p class="text-success">${result.message}</p>`;
        document.getElementById("contactForm").reset();
    } catch (error) {
        document.getElementById("responseMessage").innerHTML = `<p class="text-danger">Error al enviar el mensaje.</p>`;
    }
});
