// ==================== 🔹 DOM References ====================
const searchInput = document.getElementById("searchInput");
const cardContainer = document.getElementById("cardContainer");
const menuIcon = document.querySelector('.menu-icon');
const menu = document.getElementById('mainMenu');
const closeBtn = document.getElementById('closeMenuBtn');
const noResultsCard = document.getElementById("noResultsCard");

// ==================== 🔹 Data Constants ====================
const cards = [
  { title: "সালাতের গুরুত্ব", details: "সালাত বা নামাজ ...", link: "pages/salat.html" },
  { title: "রমজানের গুরুত্ব", details: "রমজান মাসের গুরুত্ব ...", link: "pages/siam.html" },
  { title: "হজের গুরুত্ব", details: "হজ ইসলামের পঞ্চস্তম্ভ ...", link: "pages/hajj.html" }
];

// ==================== 🔹 Generate Cards ====================
function generateCards() {
  if (!cardContainer) return;

  for (let i = 0; i < 3; i++) {
    const data = cards[i % cards.length];
    const div = document.createElement("div");
    div.className = "card fade-card";
    div.innerHTML = `
      <div class="card-title">${data.title}</div>
      <button class="read-btn" onclick="location.href='${data.link}'">Read</button>
    `;
    cardContainer.appendChild(div);
  }
}
generateCards();

// ==================== 🔹 Intersection Observer ====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-card").forEach(card => observer.observe(card));

// ==================== 🔹 Card Search Filter ====================
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const cardsEls = Array.from(document.querySelectorAll(".fade-card"));
    let matched = [];

    cardsEls.forEach(card => {
      const titleEl = card.querySelector(".card-title");
      titleEl.innerHTML = titleEl.textContent;
      card.classList.remove("highlight-card");

      if (keyword && titleEl.textContent.toLowerCase().includes(keyword)) {
        titleEl.innerHTML = titleEl.textContent.replace(
          new RegExp(`(${keyword})`, "gi"),
          `<span class="highlight">$1</span>`
        );
        card.classList.add("highlight-card");
        matched.push(card);
      }
    });

    matched.reverse().forEach(card => cardContainer.prepend(card));

    if (keyword && matched.length === 0 && noResultsCard) {
      noResultsCard.style.display = "block";
      noResultsCard.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (noResultsCard) {
      noResultsCard.style.display = "none";
    }

    if (matched.length > 0) {
      matched[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

// ==================== 🔹 Menu Toggle ====================
if (menuIcon && menu) {
  menuIcon.addEventListener('click', function () {
    menu.classList.toggle('show');
  });
}

if (closeBtn && menu) {
  closeBtn.addEventListener('click', function () {
    menu.classList.remove('show');
  });
}

// ==================== 🔹 Swipe to Close Menu (Mobile) ====================
let touchStartX = 0;

if (menu) {
  menu.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  });

  menu.addEventListener('touchend', function (e) {
    let touchEndX = e.changedTouches[0].clientX;
    let swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) {
      menu.classList.remove('show');
    }
  });
}