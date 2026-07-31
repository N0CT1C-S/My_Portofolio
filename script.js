const toggle = document.getElementById("toggle");
const toggleMobile = document.getElementById("toggle-mobile");
const html = document.documentElement;
const body = document.body;

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
      toggleProjectsText.textContent = "Lihat Semua Proyek";
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
