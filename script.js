document.addEventListener("DOMContentLoaded", () => {
  // Fungsi untuk memuat Animate.css (sama seperti sebelumnya)
  function loadAnimateCSS() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
    document.head.appendChild(link);
  }

  loadAnimateCSS();

  // --- Fungsionalitas Baru ---
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get("to");

  if (namaTamu) {
    // Mengganti tanda '+' di URL dengan spasi
    const cleanedName = decodeURIComponent(namaTamu.replace(/\+/g, " "));
    document.getElementById("recipient-name").textContent = cleanedName;
  }

  // --- Fungsionalitas Scrolling (sama seperti sebelumnya) ---
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedElements =
          entry.target.querySelectorAll(".animate__animated");

        animatedElements.forEach((el) => {
          const animationName = el.classList[1];
          el.classList.add(animationName);
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    observer.observe(page);
  });
});
