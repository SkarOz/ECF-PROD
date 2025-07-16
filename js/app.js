const form = document.getElementById("horoscopeForm");
const resultHoroscope = document.getElementById("horoscopeResult");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const signe = document.getElementById("choixSigne").value;

    if (signe === "") {
        alert("Sélectionnez un signe !")
        return;
    }

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

    console.log(data)
    resultHoroscope.innerHTML = `
   <h2>${data.message}</h2>
    <p>Votre horoscope est :</p>
    <p>${data.horoscope[signe]}</p>
   `;

} catch (error) {
        console.log("error");
    }

});
