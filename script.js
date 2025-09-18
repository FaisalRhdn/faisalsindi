document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const namaTamu = urlParams.get("to");

  if (namaTamu) {
    const cleanedName = decodeURIComponent(namaTamu.replace(/\+/g, " "));
    document.getElementById("recipient-name").textContent = cleanedName;
  }

  const cover = document.getElementById("cover");
  const weddingMusic = document.getElementById("wedding-music");
  const photoPage = document.querySelector(".photo-page");
  const musicOverlay = document.getElementById("music-overlay");
  const musicButton = document.getElementById("music-button");
  const musicTitle = document.getElementById("music-title");

  musicTitle.textContent = "Andmesh - Anugerah Terindah"; // Ganti dengan judul lagu aslimu

  function openInvitation() {
    if (!cover.classList.contains("is-open")) {
      cover.classList.add("is-open");
      photoPage.classList.add("animate-in");

      weddingMusic
        .play()
        .then(() => {
          musicOverlay.classList.add("is-visible");
          musicButton.classList.remove("paused");
          musicButton.classList.add("is-playing");
        })
        .catch((e) => {
          console.log("Musik tidak bisa diputar otomatis.");
          musicOverlay.classList.add("is-visible");
          musicButton.classList.add("paused");
          musicButton.classList.remove("is-playing");
        });

      window.removeEventListener("scroll", openInvitation);
      cover.removeEventListener("click", openInvitation);
      cover.removeEventListener("touchstart", openInvitation);
    }
  }

  window.addEventListener("scroll", openInvitation);
  cover.addEventListener("click", openInvitation);
  cover.addEventListener("touchstart", openInvitation);

  musicButton.addEventListener("click", () => {
    if (weddingMusic.paused) {
      weddingMusic.play();
      musicButton.classList.remove("paused");
      musicButton.classList.add("is-playing");
    } else {
      weddingMusic.pause();
      musicButton.classList.add("paused");
      musicButton.classList.remove("is-playing");
    }
  });

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
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const pages = document.querySelectorAll(".page");
  for (let i = 1; i < pages.length; i++) {
    observer.observe(pages[i]);
  }
});
