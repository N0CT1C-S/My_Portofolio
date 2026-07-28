// Toggle dark mode
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

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  updateLightMode(true);
}

// Mobile menu toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Smooth scrolling for anchor links
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

// Typing Animation
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
    typingElement.textContent = ""; // Clear existing text
    typeEffect();
  }
});
