const toggle = document.getElementById("toggle");
const toggleMobile = document.getElementById("toggle-mobile");
const html = document.documentElement;
const body = document.body;
const backgroundVideo = document.querySelector(".site-background-video");

if (backgroundVideo) {
  backgroundVideo.addEventListener("loadeddata", () => {
    console.log("Background video berhasil dimuat.");
  });

  backgroundVideo.addEventListener("error", () => {
    console.error("Background video gagal dimuat. Periksa nama file, lokasi, dan format MP4.");
    backgroundVideo.style.display = "none";
  });

  backgroundVideo.play().catch(() => {
    console.warn("Autoplay tidak tersedia; video memerlukan interaksi pengguna.");
  });
}

function updateLightMode(isLight) {
  if (isLight) {
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    if (toggle) toggle.checked = true;
    if (toggleMobile) toggleMobile.checked = true;
  } else {
    body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
    if (toggle) toggle.checked = false;
    if (toggleMobile) toggleMobile.checked = false;
  }
}

if (toggle) toggle.addEventListener("change", () => updateLightMode(toggle.checked));
if (toggleMobile) toggleMobile.addEventListener("change", () => updateLightMode(toggleMobile.checked));

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  updateLightMode(true);
}

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

let clickAudioContext;

function playAerospaceClick() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  clickAudioContext ||= new AudioContext();
  if (clickAudioContext.state === "suspended") {
    clickAudioContext.resume();
  }

  const now = clickAudioContext.currentTime;
  const oscillator = clickAudioContext.createOscillator();
  const gain = clickAudioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(620, now);
  oscillator.frequency.exponentialRampToValueAtTime(220, now + 0.11);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.045, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  oscillator.connect(gain);
  gain.connect(clickAudioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.13);
}

function triggerAerospaceFeedback(element) {
  element.classList.remove("aero-clicked");
  void element.offsetWidth;
  element.classList.add("aero-clicked");
  window.setTimeout(() => element.classList.remove("aero-clicked"), 420);
  playAerospaceClick();
}

document.querySelectorAll("button, .btn-primary, .btn-secondary").forEach((element) => {
  element.addEventListener("click", () => triggerAerospaceFeedback(element));
});

const skillsTrack = document.getElementById("skillsTrack");
if (skillsTrack && !skillsTrack.dataset.loopReady) {
  const skillsGroup = document.createElement("div");
  skillsGroup.className = "skills-carousel-group";

  Array.from(skillsTrack.children).forEach((item) => skillsGroup.appendChild(item));

  const duplicateGroup = skillsGroup.cloneNode(true);
  duplicateGroup.setAttribute("aria-hidden", "true");
  skillsTrack.append(skillsGroup, duplicateGroup);
  skillsTrack.dataset.loopReady = "true";
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      if (mobileMenu) mobileMenu.classList.add("hidden");
      window.scrollTo({
        top: targetElement.offsetTop - 64,
        behavior: 'smooth'
      });
    }
  });
});

const typingElement = document.getElementById("typing-text");
const textToType = "Muhammad Sabillilah Ramadhan";
let index = 0;

function typeEffect() {
  if (!typingElement) return;
  if (index < textToType.length) {
    typingElement.textContent += textToType.charAt(index);
    index++;
    setTimeout(typeEffect, 100);
  } else {
    typingElement.classList.add("typing-cursor");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typingElement) {
    typingElement.textContent = "";
    typeEffect();
  }
});

const toggleProjectsBtn = document.getElementById("toggle-projects-btn");
const toggleProjectsText = document.getElementById("toggle-projects-text");
const toggleProjectsIcon = document.getElementById("toggle-projects-icon");
const extraProjects = document.querySelectorAll(".extra-project");

if (toggleProjectsBtn) {
  toggleProjectsBtn.addEventListener("click", () => {
    const isShown = extraProjects[0] && extraProjects[0].classList.contains("show");

    if (isShown) {
      extraProjects.forEach((project) => project.classList.remove("show"));
      toggleProjectsText.textContent = "Lihat Semua Projects";
      toggleProjectsIcon.classList.remove("rotate-180");

      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        window.scrollTo({
          top: projectsSection.offsetTop - 64,
          behavior: "smooth"
        });
      }
    } else {
      extraProjects.forEach((project, i) => {
        setTimeout(() => {
          project.classList.add("show");
        }, i * 100);
      });
      toggleProjectsText.textContent = "Tampilkan Lebih Sedikit";
      toggleProjectsIcon.classList.add("rotate-180");
    }
  });
}

const toggleCertificatesBtn = document.getElementById("toggle-certificates-btn");
const toggleCertificatesText = document.getElementById("toggle-certificates-text");
const toggleCertificatesIcon = document.getElementById("toggle-certificates-icon");
const extraCertificates = document.querySelectorAll(".extra-certificate");

if (toggleCertificatesBtn && extraCertificates.length > 0) {
  toggleCertificatesBtn.addEventListener("click", () => {
    const isShown = extraCertificates[0] && extraCertificates[0].classList.contains("show");

    if (isShown) {
      extraCertificates.forEach((cert) => cert.classList.remove("show"));
      toggleCertificatesText.textContent = "Lihat Semua Certificates";
      toggleCertificatesIcon.classList.remove("rotate-180");

      const certificatesSection = document.getElementById("certificates");
      if (certificatesSection) {
        window.scrollTo({
          top: certificatesSection.offsetTop - 64,
          behavior: "smooth"
        });
      }
    } else {
      extraCertificates.forEach((cert, i) => {
        setTimeout(() => {
          cert.classList.add("show");
        }, i * 100);
      });
      toggleCertificatesText.textContent = "Tampilkan Lebih Sedikit";
      toggleCertificatesIcon.classList.add("rotate-180");
    }
  });
}

const certificateModal = document.getElementById("certificate-modal");
const certificateModalImg = document.getElementById("certificate-modal-img");
const certificateModalTitle = document.getElementById("certificate-modal-title");
const certificateModalMeta = document.getElementById("certificate-modal-meta");
const certificateModalClose = document.getElementById("certificate-modal-close");
const certificateBtns = document.querySelectorAll(".certificate-card-btn");

function openCertificateModal(btn) {
  const img = btn.getAttribute("data-img");
  const title = btn.getAttribute("data-title");
  const issuer = btn.getAttribute("data-issuer");
  const date = btn.getAttribute("data-date");

  if (certificateModalImg) {
    certificateModalImg.src = img || "";
    certificateModalImg.alt = title || "";
  }
  if (certificateModalTitle) {
    certificateModalTitle.textContent = title || "";
  }
  if (certificateModalMeta) {
    certificateModalMeta.textContent = `${issuer || ""} · ${date || ""}`;
  }

  if (certificateModal) {
    certificateModal.classList.remove("hidden");
    certificateModal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }
}

function closeCertificateModal() {
  if (certificateModal) {
    certificateModal.classList.add("hidden");
    certificateModal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }
}

certificateBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openCertificateModal(btn);
  });
});

if (certificateModalClose) {
  certificateModalClose.addEventListener("click", closeCertificateModal);
}

if (certificateModal) {
  certificateModal.addEventListener("click", (e) => {
    if (e.target === certificateModal) closeCertificateModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCertificateModal();
});

const contactSubmit = document.getElementById("contact-submit");
const waNumber = "6285185799456";

if (contactSubmit) {
  contactSubmit.addEventListener("click", () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      alert("Mohon lengkapi semua field terlebih dahulu.");
      return;
    }

    const waText = `Halo, saya ${name} (${email}).%0A%0A${encodeURIComponent(message)}`;
    const waLink = `https://wa.me/${waNumber}?text=${waText}`;
    window.open(waLink, "_blank");
  });
}
