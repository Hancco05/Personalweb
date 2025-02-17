document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch("/send", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById("responseMessage").innerHTML = `<p class="text-success">${result.message}</p>`;
            this.reset();
        } else {
            document.getElementById("responseMessage").innerHTML = `<p class="text-danger">Error al enviar el mensaje.</p>`;
        }
    } catch (error) {
        document.getElementById("responseMessage").innerHTML = `<p class="text-danger">Error al enviar el mensaje.</p>`;
    }
});
