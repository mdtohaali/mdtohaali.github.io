const dynamicText = document.getElementById("dynamicText");
const ayahText = document.getElementById("ayahText");
const ayahRef = document.getElementById("ayahRef");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const dhikr = ["Allahu Akbar", "Subhanallah", "Alhamdulillah", "La ilaha illallah", "Astaghfirullah"];
const ayahs = [
  { text: "Indeed, Allah is with those who fear Him.", ref: "Qur'an 16:128" },
  { text: "Verily, in the remembrance of Allah do hearts find rest.", ref: "Qur'an 13:28" },
  { text: "And whoever puts their trust in Allah, then He will suffice him.", ref: "Qur'an 65:3" },
  { text: "Allah does not burden a soul beyond that it can bear.", ref: "Qur'an 2:286" },
  { text: "So remember Me; I will remember you.", ref: "Qur'an 2:152" },
  { text: "Indeed, with hardship [will be] ease.", ref: "Qur'an 94:6" }
];

let dhikrIndex = 0;
setInterval(() => {
  dynamicText.textContent = dhikr[dhikrIndex];
  dynamicText.style.animation = 'none';
  void dynamicText.offsetWidth;
  dynamicText.style.animation = 'fadeSlide 1s ease-in-out';
  dhikrIndex = (dhikrIndex + 1) % dhikr.length;
}, 3000);

function showRandomAyah() {
  const ayah = ayahs[Math.floor(Math.random() * ayahs.length)];
  ayahText.style.opacity = '0';
  ayahText.style.transform = 'translateY(20px)';
  void ayahText.offsetWidth;

  ayahText.textContent = `"${ayah.text}"`;
  ayahRef.textContent = ayah.ref;

  ayahText.style.animation = 'ayahAnimate 1s ease-in-out forwards';
}

showRandomAyah();
setInterval(showRandomAyah, 6000);

const cards = [
  { title: "Importance of Salah", details: "Salah is the pillar of Islam and the first thing we will be asked about on the Day of Judgment." },
  { title: "Fasting in Ramadan", details: "Fasting is a means of attaining Taqwa and one of the greatest forms of worship." },
  { title: "Charity in Islam", details: "Charity purifies your wealth and soul, and helps those in need." },
];

const cardContainer = document.getElementById("cardContainer");
for (let i = 0; i < 20; i++) {
  const data = cards[i % cards.length];
  const div = document.createElement("div");
  div.className = "card fade-card";
  div.innerHTML = `
    <div class="card-title">${data.title} ${i + 1}</div>
    <button class="read-btn" onclick="openModal('${data.title} ${i + 1}', \`${data.details.repeat(20)}\`)">Read</button>
  `;
  cardContainer.appendChild(div);
}

function openModal(title, content) {
  modalTitle.textContent = title;
  modalBody.textContent = content;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-card').forEach(card => observer.observe(card));

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const cards = document.querySelectorAll(".fade-card");
  cards.forEach(card => {
    const title = card.querySelector(".card-title");
    title.innerHTML = title.textContent;
    card.classList.remove("highlight-card");

    if (keyword && title.textContent.toLowerCase().includes(keyword)) {
      title.innerHTML = title.textContent.replace(
        new RegExp(`(${keyword})`, "gi"),
        '<span class="highlight">$1</span>'
      );
      card.classList.add("highlight-card");
      cardContainer.prepend(card);
    }
  });
});