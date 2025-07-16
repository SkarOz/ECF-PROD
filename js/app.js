const btn = document.getElementById("demanderAuCielBtn");
const resultHoroscope = document.getElementById("horoscopeResult");

btn.addEventListener("click", async function (event) {
    event.preventDefault();

    resultHoroscope.style.display = "block";
    resultHoroscope.innerHTML = "Consultation des étoiles..."

   try {
    const response = await fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!",
        }),
    })


    if (!response.ok) {
        throw new Error("Erreur lors de la récupération.");
   };

    const data = await response.json();

      let html = `<h2>${data.message}</h2>`;

        for (const signe in data.horoscope) {
            html += `
                <div class="carte-horoscope">
                    <h3>${signe}</h3>
                    <p>${data.horoscope[signe]}</p>
                </div>
            `;
        }

    console.log(data)
    resultHoroscope.innerHTML = html;

} catch (error) {
        console.log("error");
    }

});
