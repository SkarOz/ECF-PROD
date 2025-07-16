const btn = document.getElementById("demanderAuCielBtn");
const resultHoroscope = document.getElementById("resultHoroscope");
const zodiacContainer = document.getElementById("zodiacImages");

const zodiacSigns = [
  "bélier", "taureau", "gémeaux", "cancer", "lion", "vierge",
  "balance", "scorpion", "sagittaire", "capricorne", "verseau", "poissons"
];

function placeSignsInCircle() {
  const centerX = zodiacContainer.offsetWidth / 2;
  const centerY = zodiacContainer.offsetHeight / 2;
  const radius = Math.min(centerX, centerY) - 50;

  zodiacSigns.forEach((sign, i) => {
    const img = document.querySelector(`img[data-sign="${sign}"]`);
    const angle = (2 * Math.PI / zodiacSigns.length) * i - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle) - 64;
    const y = centerY + radius * Math.sin(angle) - 64;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = 'translate(0, 0)';
  });
}

function spawnZodiacImages() {
  zodiacContainer.innerHTML = "";
  zodiacSigns.forEach(sign => {
    const img = document.createElement("img");
    img.src = `ressources/image/zodiac/${sign}.webp`;
    img.alt = sign;
    img.className = "zodiac-img";
    img.dataset.sign = sign;
    zodiacContainer.appendChild(img);
  });
  placeSignsInCircle();
}

spawnZodiacImages();

btn.addEventListener("click", async () => {
  const images = document.querySelectorAll(".zodiac-img");
  let rotation = 0;
  const centerX = zodiacContainer.offsetWidth / 2;
  const centerY = zodiacContainer.offsetHeight / 2;
  const radius = 80;

  const rotateInterval = setInterval(() => {
    rotation += 3;
    images.forEach((img, i) => {
      const angle = (2 * Math.PI / zodiacSigns.length) * i + (rotation * Math.PI / 180);
      const x = centerX + radius * Math.cos(angle) - 32;
      const y = centerY + radius * Math.sin(angle) - 32;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.transform = `translate(0, 0)`;
    });
  }, 30);

  try {
    const response = await fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!",
      }),
    });

    if (!response.ok) throw new Error("Erreur lors de la récupération.");

    const data = await response.json();

setTimeout(() => {
  clearInterval(rotateInterval);
  images.forEach(img => {
    img.style.transform = `translate(1000px, 1000px)`;
    zodiacImages.style.display = 'none';
  });

  let html = `<h2 style="grid-column: 1 / -1; text-align: center;">Résultats du tirage :</h2>`;
  for (const signe in data.horoscope) {
    html += `
      <div class="carte-horoscope" style="display: grid; justify-content: center;">
        <img src="ressources/image/zodiac/${signe.toLowerCase()}.webp" alt="${signe}" class="zodiac-card-img" />
        <h3>${signe}</h3>
        <p>${data.horoscope[signe]}</p>
      </div>
    `;
  }
  resultHoroscope.innerHTML = html;
}, 2500);

  } catch (error) {
    clearInterval(rotateInterval);
    resultHoroscope.innerHTML = "Erreur lors de la récupération des données.";
  }
});

