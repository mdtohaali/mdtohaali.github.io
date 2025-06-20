document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;
  const isInPages = path.includes("/pages/");
  const footerPath = isInPages ? './footer.html' : 'pages/footer.html';

  fetch(footerPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch(error => {
      console.error("Footer loading error:", error);
    });
});
