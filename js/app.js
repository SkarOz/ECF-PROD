const btn = document.getElementById("demanderAuCielBtn");
const resultHoroscope = document.getElementById("resultHoroscope");
const zodiacContainer = document.getElementById("zodiacImages");

const zodiacSigns = [
  "bélier", "taureau", "gémeaux", "cancer", "lion", "vierge",
  "balance", "scorpion", "sagittaire", "capricorne", "verseau", "poissons"
];

function placeSignsInCircle(radius = null, rotation = 0) {
  const centerX = zodiacContainer.offsetWidth / 2;
  const centerY = zodiacContainer.offsetHeight / 2;
  const defaultRadius = Math.min(centerX, centerY) - 64;
  const usedRadius = radius !== null ? radius : defaultRadius;

  zodiacSigns.forEach((sign, i) => {
    const img = document.querySelector(`img[data-sign="${sign}"]`);
    const angle = (2 * Math.PI / zodiacSigns.length) * i - Math.PI / 2 + rotation;
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;
    const x = centerX + usedRadius * Math.cos(angle) - imgWidth / 2;
    const y = centerY + usedRadius * Math.sin(angle) - imgHeight / 2;
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.transform = 'translate(0, 0)';
  });
}

function spawnZodiacImages() {
  zodiacContainer.innerHTML = "";
  zodiacSigns.forEach(sign => {
    const img = document.createElement("img");
    img.src = `./ressources/image/zodiac/${sign}.webp`;
    img.alt = sign;
    img.className = "zodiac-img";
    img.dataset.sign = sign;
    img.style.position = 'absolute';
    zodiacContainer.appendChild(img);
  });
  placeSignsInCircle();
}

spawnZodiacImages();

function adjustCircle() {
  const centerX = zodiacContainer.offsetWidth / 2;
  const centerY = zodiacContainer.offsetHeight / 2;
  const radius = zodiacContainer.offsetWidth * 0.35;
  placeSignsInCircle(radius);
  return { centerX, centerY, radius };
}

adjustCircle();

window.addEventListener('resize', () => {
  adjustCircle();
});

btn.addEventListener("click", async () => {
  resultHoroscope.style.display = 'none';
  zodiacContainer.style.display = 'block';

  spawnZodiacImages();

  let rotation = 0;
  const radius = zodiacContainer.offsetWidth * 0.35;
  let animationRunning = true;

  const images = document.querySelectorAll(".zodiac-img");

  const rotateInterval = setInterval(() => {
    if (!animationRunning) return;
    rotation += 0.05;
    placeSignsInCircle(radius, rotation);
  }, 16);

  let data;
  let errorOccured = false;

  try {
    const response = await fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!",
      }),
    });

    if (!response.ok) throw new Error("Erreur lors de la récupération.");
    data = await response.json();
  } catch {
    errorOccured = true;
  }

  setTimeout(() => {
    animationRunning = false;
    clearInterval(rotateInterval)

    if (errorOccured) {
      resultHoroscope.style.display = 'block';
      resultHoroscope.innerHTML = "Erreur lors de la récupération des données.";
      zodiacContainer.style.display = 'none';
      return;
    }

    const { centerX, centerY } = adjustCircle();

    images.forEach(img => {
      img.style.transition = 'left 1.5s ease, top 1.5s ease, opacity 1.5s ease';
    });

    let transitionsEnded = 0;
    const onTransitionEnd = () => {
      transitionsEnded++;
      if (transitionsEnded === images.length) {
        let html = `
          <h2 style="grid-column: 1 / -1; text-align: center;">Résultats du tirage :</h2>
          <div class="cartes-container">
        `;

        for (const signe in data.horoscope) {
          html += `
            <div class="carte-horoscope">
              <img src="ressources/image/zodiac/${signe.toLowerCase()}.webp" alt="${signe}" class="zodiac-card-img" />
              <h3>${signe}</h3>
              <p>${data.horoscope[signe]}</p>
            </div>
          `;
        }

        html += `</div>`;
        resultHoroscope.innerHTML = html;
        resultHoroscope.style.display = 'block';
        zodiacContainer.style.display = 'none';

        images.forEach(img => {
          img.removeEventListener('transitionend', onTransitionEnd);
        });
      }
    };

    images.forEach(img => {
      img.addEventListener('transitionend', onTransitionEnd);
    });

    images.forEach((img) => {
      const angleRandom = Math.random() * 2 * Math.PI;
      const distance = Math.max(window.innerWidth, window.innerHeight) * 1.5;
      const x = centerX + distance * Math.cos(angleRandom);
      const y = centerY + distance * Math.sin(angleRandom);
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.opacity = '0';
    });

  }, 4000);
});
