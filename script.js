const dynamicText = document.getElementById("dynamicText");
const ayahText = document.getElementById("ayahText");
const ayahRef = document.getElementById("ayahRef");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const dhikr = ["Allahu Akbar", "Subhanallah", "Alhamdulillah", "La ilaha illallah", "Astaghfirullah"];
const ayahs = [
  { text: "বল,তিনিই আল্লাহ,এক ও অদ্বিতীয়।", ref: "Qur'an ১১২:১" },
  { text: "নিশ্চয়ই কষ্টের সাথে রয়েছে স্বস্তি।", ref: "Qur'an ৯৪:৬" },
  { text: "মিথ্যারোপকারীদের জন্য সেদিনের দুর্ভোগ।", ref: "Qur'an ৭৭:১৫" },
  { text: "অতএব তুমি মহান রবের নামে তাসবীহ পাঠ করো।", ref: "Qur'an ৬৯:৫২" },
  { text: "আর তোমার রবের প্রতি আকৃষ্ট হও।", ref: "Qur'an ৯৪:৮" },
  { text: "সে মনে করে তার সম্পদ তাকে চিরজীবী করবে।", ref: "Qur'an ১০৪:৩" }
  
  
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
  { title: "সালাতের গুরুত্ব", details: "সালাত বা নামাজ ইসলামের অন্যতম স্তম্ভ এবং প্রতিটি মুসলমানের জন্য বাধ্যতামূলক একটি ইবাদত। এটি আল্লাহর আনুগত্য ও দাসত্বের একটি বহিঃপ্রকাশ, যা বান্দাকে আল্লাহর আরও কাছে নিয়ে যায় এবং আত্মশুদ্ধি ও মানসিক প্রশান্তি এনে দেয়। সালাত মুসলিম জীবনে শৃঙ্খলা ও নিষ্ঠা প্রতিষ্ঠা করে এবং অশ্লীল ও গর্হিত কাজ থেকে বিরত থাকতে সাহায্য করে। সালাতের গুরুত্ব ও তাৎপর্য: আল্লাহর সন্তুষ্টি অর্জন:সালাত আদায়ের মাধ্যমে বান্দা আল্লাহর সন্তুষ্টি অর্জন করতে পারে। আত্মশুদ্ধি ও মানসিক প্রশান্তি:সালাত মানসিক চাপ কমাতে সাহায্য করে এবং আত্মাকে পরিশুদ্ধ করে। শৃঙ্খলা ও নিয়মানুবর্তিতা:সালাত জীবনে শৃঙ্খলা ও নিয়মানুবর্তিতা আনে। অশ্লীল ও গর্হিত কাজ থেকে বিরত রাখা:সালাত মানুষকে সকল প্রকার অশ্লীল ও গর্হিত কাজ থেকে বিরত থাকতে সাহায্য করে। আল্লাহর নৈকট্য লাভ:সালাত আল্লাহর সাথে বান্দার সরাসরি যোগাযোগের মাধ্যম এবং বান্দাকে আল্লাহর আরও কাছাকাছি নিয়ে যায়। সফলতা লাভ:যারা সালাতে বিনয়ী ও একাগ্রচিত্ত, তারা দুনিয়া ও আখিরাতে সফলতা লাভ করে। গুনাহ মাফ:সালাত যথাযথভাবে আদায় করলে আল্লাহ বান্দার গুনাহ মাফ করে দেন। দৃষ্টি ও কর্মের নিয়ন্ত্রণ:সালাত মানুষের দৃষ্টি ও কর্মকে নিয়ন্ত্রণ করতে সাহায্য করে। জামাতে সালাত আদায়:জামাতে সালাত আদায় একাকী আদায়ের চেয়ে অনেক বেশি সওয়াবের। সালাত একটি গুরুত্বপূর্ণ ইবাদত, যা মুসলিম জীবনে অপরিহার্য। এর মাধ্যমে আল্লাহর নৈকট্য লাভ, আত্মশুদ্ধি ও মানসিক প্রশান্তি অর্জন করা যায়।" },
  { title: "রমজানের গুরুত্ব", details: "রমজান মাসের গুরুত্ব অপরিসীম, এটি মুসলিমদের জন্য একটি পবিত্র মাস। এই মাসে রোজা রাখা প্রত্যেক সামর্থ্যবান মুসলমানের জন্য ফরজ বা আবশ্যক। রমজান আত্ম-সংযম, তাকওয়া (আল্লাহ ভীতি) এবং আত্ম-শুদ্ধির মাস। এই মাসে মুসলিমরা অধিক ইবাদত করে এবং কুরআন তেলাওয়াত করে। এই মাসে লাইলাতুল কদর রয়েছে, যা হাজার মাসের চেয়েও উত্তম। রমজানের গুরুত্বের কিছু দিক নিচে তুলে ধরা হলো:আল্লাহর সন্তুষ্টি অর্জন:রমজান মাস মুসলিমদের জন্য আল্লাহর সন্তুষ্টি অর্জনের সুবর্ণ সুযোগ নিয়ে আসে। এই মাসে অধিক ইবাদত করে আল্লাহর নৈকট্য লাভ করা যায়। আত্ম-সংযম ও তাকওয়া:রমজানের রোজা মুসলিমদের প্রবৃত্তির তাড়না থেকে মুক্ত করে আত্ম-সংযমী হতে শেখায় এবং তাকওয়া (আল্লাহ ভীতি) অর্জনে সহায়তা করে। কুরআন নাজিল:রমজান মাসেই পবিত্র কুরআন নাজিল হয়েছে, যা মুসলিমদের জন্য পথপ্রদর্শক। এই মাসে বেশি বেশি কুরআন তেলাওয়াত করা ও এর মর্মার্থ অনুধাবন করার চেষ্টা করা উচিত। লাইলাতুল কদর:রমজানের শেষ দশকে রয়েছে লাইলাতুল কদর। এই রাতে ইবাদত করলে হাজার মাসের ইবাদতের সমান সওয়াব পাওয়া যায়। জাহান্নাম থেকে মুক্তি:রমজানের রোজা জাহান্নাম থেকে মুক্তির কারণ হতে পারে। এই মাসে জাহান্নামের দরজা বন্ধ করে দেওয়া হয় এবং শয়তানকে শৃঙ্খলাবদ্ধ করা হয়। ক্ষমা লাভ:রমজান মাস গুনাহ মাফের মাস। এই মাসে আল্লাহর কাছে ক্ষমা চাইলে আল্লাহ বান্দাকে ক্ষমা করে দেন। সামাজিক ঐক্য:রমজান মাস মুসলিমদের মধ্যে ভ্রাতৃত্ব ও ঐক্যবোধ সৃষ্টি করে। মুসলিমরা একত্রে ইফতার করে, তারাবির নামাজ আদায় করে এবং একে অপরের প্রতি সহানুভূতিশীল হয়। নৈতিক ও আধ্যাত্মিক উন্নতি:রমজান মাস মুসলিমদের নৈতিক ও আধ্যাত্মিক উন্নতির জন্য একটি গুরুত্বপূর্ণ সময়। এই মাসে মানুষ অন্যায় ও গর্হিত কাজ থেকে দূরে থাকে এবং ভালো কাজে উৎসাহিত হয়। রমজান মাস মুসলিমদের জন্য একটি বিশেষ নেয়ামত। এই মাসের গুরুত্ব অনুধাবন করে এর যথাযথ সদ্ব্যবহার করা উচিত। " },
  { title: "হজের গুরুত্ব", details: "হজ ইসলামের পঞ্চস্তম্ভের মধ্যে একটি গুরুত্বপূর্ণ স্তম্ভ এবং এটি শারীরিক ও আর্থিকভাবে সক্ষম প্রত্যেক মুসলমানের জন্য জীবনে একবার পালন করা ফরজ। হজের গুরুত্ব অপরিসীম, যা মুসলিমদের জন্য আধ্যাত্মিক, সামাজিক ও ঐতিহাসিক তাৎপর্য বহন করে। হজের গুরুত্ব:ইসলামের পঞ্চস্তম্ভ:হজ ইসলামের পাঁচটি স্তম্ভের মধ্যে একটি, যা প্রত্যেক সামর্থ্যবান মুসলমানের জন্য আবশ্যিক। আল্লাহর সন্তুষ্টি:হজ পালনের মাধ্যমে আল্লাহর নৈকট্য লাভ করা যায় এবং এটি বান্দার প্রতি আল্লাহর সন্তুষ্টির একটি গুরুত্বপূর্ণ মাধ্যম। গুনাহ মাফ:হজের মাধ্যমে অতীতের গুনাহ মাফ হওয়ার সম্ভাবনা থাকে এবং নতুন জীবন শুরু করার সুযোগ পাওয়া যায়। ঐক্য ও সংহতি:হজ মুসলিম বিশ্বের ঐক্য ও সংহতি প্রদর্শনের একটি গুরুত্বপূর্ণ উপলক্ষ্য। বিশ্বের বিভিন্ন প্রান্ত থেকে আসা মুসলিমরা একই স্থানে একত্রিত হয়ে আল্লাহর ইবাদত করে, যা মুসলিম উম্মাহর মধ্যে ভ্রাতৃত্ববোধ ও সংহতি বৃদ্ধি করে। আত্ম-শুদ্ধি ও আত্ম-উপলব্ধি:হজ পালনের মাধ্যমে বান্দা আত্ম-শুদ্ধি ও আত্ম-উপলব্ধির পথে অগ্রসর হতে পারে। এই সফরে বান্দা নিজের দুর্বলতা ও সীমাবদ্ধতা উপলব্ধি করতে পারে এবং নিজেকে নতুন করে চিনতে পারে। নবীদের স্মৃতি বিজরিত:হজ কেবল একটি ইবাদত নয়, এটি ইব্রাহিম (আ.) এবং মুহাম্মাদ (সা.) সহ অন্যান্য নবীদের স্মৃতিবিজরিত স্থান ও ঘটনার সাথে জড়িত। সামাজিক ও অর্থনৈতিক গুরুত্ব:হজ মুসলিম বিশ্বে অর্থনৈতিক ও সামাজিক গুরুত্ব বহন করে। এটি মুসলিম দেশগুলোর মধ্যে ব্যবসা-বাণিজ্য ও সাংস্কৃতিক আদান প্রদানে সহায়তা করে। সংক্ষেপে, হজ মুসলিমদের জন্য একটি গুরুত্বপূর্ণ ইবাদত যা তাদের আত্মিক, সামাজিক ও অর্থনৈতিক জীবনে ইতিবাচক প্রভাব ফেল।" },
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
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}

modal.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});

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
  const cards = Array.from(document.querySelectorAll(".fade-card"));
  let matchedCards = [];

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
      matchedCards.push(card);
    }
  });

  matchedCards.reverse().forEach(card => {
    cardContainer.prepend(card);
  });

  if (matchedCards.length > 0) {
    matchedCards[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }
});