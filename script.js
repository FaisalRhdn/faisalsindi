document.addEventListener("DOMContentLoaded", () => {
  // --- Fungsionalitas Nama Tamu ---
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get("to");

  if (namaTamu) {
    const cleanedName = decodeURIComponent(namaTamu.replace(/\+/g, " "));
    document.getElementById("recipient-name").textContent = cleanedName;
  }

  // --- Fungsionalitas Tirai Pembuka & Musik ---
  const cover = document.getElementById("cover");
  const weddingMusic = document.getElementById("wedding-music");
  const photoPage = document.querySelector(".photo-page");

  function openInvitation() {
    if (!cover.classList.contains("is-open")) {
      cover.classList.add("is-open");

      // Tampilkan halaman foto secara langsung
      photoPage.classList.add("animate-in");

      // Putar musik saat tirai terbuka
      weddingMusic.play().catch((e) => {
        console.log("Musik tidak bisa diputar otomatis.");
      });

      // Hapus event listener setelah digunakan
      window.removeEventListener("scroll", openInvitation);
      cover.removeEventListener("click", openInvitation);
      cover.removeEventListener("touchstart", openInvitation);
    }
  }

  // Tambahkan event listener untuk mendeteksi gulir atau klik/sentuh
  window.addEventListener("scroll", openInvitation);
  cover.addEventListener("click", openInvitation);
  cover.addEventListener("touchstart", openInvitation);

  // --- Fungsionalitas Animasi On-Scroll (fade-in) untuk halaman selanjutnya ---
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedElements =
          entry.target.querySelectorAll(".animated-element");
        animatedElements.forEach((el) => {
          el.classList.add("animate-in");
        });
      }
    });
  }, observerOptions);

  const pages = document.querySelectorAll(".page");
  // Observer hanya mengamati halaman-halaman setelah halaman foto
  for (let i = 1; i < pages.length; i++) {
    observer.observe(pages[i]);
  }
});
