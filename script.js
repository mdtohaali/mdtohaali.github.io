document.addEventListener("DOMContentLoaded", function () {
  const dynamicText = document.getElementById("dynamicText");
  const ayahText = document.getElementById("ayahText");
  const ayahRef = document.getElementById("ayahRef");

  const dhikr = ["Allahu Akbar", "Subhanallah", "Alhamdulillah", "La ilaha illallah", "Astaghfirullah"];
  const ayahs = [
    { text: "Indeed, Allah is with those who fear Him.", ref: "Qur'an 16:128" },
    { text: "Verily, in the remembrance of Allah do hearts find rest.", ref: "Qur'an 13:28" },
    { text: "And whoever puts their trust in Allah, then He will suffice him.", ref: "Qur'an 65:3" },
    { text: "Allah does not burden a soul beyond that it can bear.", ref: "Qur'an 2:286" },
    { text: "So remember Me; I will remember you.", ref: "Qur'an 2:152" },
    { text: "Indeed, with hardship [will be] ease.", ref: "Qur'an 94:6" },
    { text: "And seek help through patience and prayer.", ref: "Qur'an 2:45" },
    { text: "Indeed, prayer prohibits immorality and wrongdoing.", ref: "Qur'an 29:45" },
    { text: "He created the heavens and earth in truth.", ref: "Qur'an 16:3" },
    { text: "Say, 'Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah.'", ref: "Qur'an 6:162" },
    { text: "And We have certainly made the Qur'an easy for remembrance.", ref: "Qur'an 54:17" },
    { text: "Guide us to the straight path.", ref: "Qur'an 1:6" },
    { text: "Your Lord has not forsaken you, nor has He detested [you].", ref: "Qur'an 93:3" },
    { text: "Indeed, my Lord is near and responsive.", ref: "Qur'an 11:61" }
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
});
