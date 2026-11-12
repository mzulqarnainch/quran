const preloader = document.getElementById("preloader");
const loaderText = document.getElementById("loaderText");
const pageSections = document.querySelectorAll(".page-section");
const navTriggers = document.querySelectorAll(".nav-trigger");
const courseSelect = document.getElementById("courseSelect");

// Reusable function to show the exact green + Quran Majeed + spinning circle loader
function triggerSectionTransition(targetId, loadingMessage, selectedCourse = null) {
  // 1. Update the loading heading text dynamically
  loaderText.textContent = loadingMessage || "Loading Al-Noor Academy...";

  // 2. Show the green preloader overlay immediately
  document.body.classList.add("loading");
  preloader.classList.remove("fade-out");

  // 3. Switch the active section behind the loader (no scrolling!)
  setTimeout(() => {
    pageSections.forEach((sec) => {
      if (sec.id === targetId) {
        sec.classList.add("active-section");
      } else {
        sec.classList.remove("active-section");
      }
    });

    // Update active state in top navbar
    document.querySelectorAll(".nav-links .nav-trigger").forEach((link) => {
      if (link.dataset.target === targetId) {
        link.classList.add("active-nav");
      } else {
        link.classList.remove("active-nav");
      }
    });

    // Pre-select course if triggered from a course card
    if (selectedCourse && courseSelect) {
      courseSelect.value = selectedCourse;
    }

    // Ensure viewport starts cleanly at top (0, 0) with zero scroll animation
    window.scrollTo(0, 0);
  }, 300);

  // 4. Fade out loader so ONLY the chosen section appears directly
  setTimeout(() => {
    preloader.classList.add("fade-out");
    document.body.classList.remove("loading");
  }, 1100);
}

// Initial website load animation
window.addEventListener("load", () => {
  loaderText.textContent = "Loading Al-Noor Academy...";
  setTimeout(() => {
    preloader.classList.add("fade-out");
    document.body.classList.remove("loading");
  }, 1400);
});

// Handle all navigation buttons, hero buttons, course enroll links, and footer links
navTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = trigger.dataset.target;
    const customTitle = trigger.dataset.title || `Loading ${targetId} Page...`;
    const selectedCourse = trigger.dataset.course || null;

    // Close mobile menu if open
    navLinks.classList.remove("active");

    if (targetId) {
      triggerSectionTransition(targetId, customTitle, selectedCourse);
    }
  });
});

// Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Course category filter
const filterButtons = document.querySelectorAll(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    courseCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Lightbox modal for Quran gallery
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const caption = item.querySelector("figcaption");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
});

// Automatic image fallback if any external link fails to load
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.src = "https://images.pexels.com/photos/30938321/pexels-photo-30938321.jpeg?auto=compress&cs=tinysrgb&w=800";
  });
});

// Enrollment form submission -> Opens WhatsApp with pre-filled details
const enrollForm = document.getElementById("enrollForm");
const formMessage = document.getElementById("formMessage");

// REPLACE THIS WITH YOUR WHATSAPP NUMBER (country code + number, no '+' or spaces)
const ACADEMY_WHATSAPP_NUMBER = "923001234567";

enrollForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const age = document.getElementById("studentAge").value;
  const course = courseSelect.value;
  const contact = document.getElementById("contactEmail").value.trim();

  const message =
    `Assalamu Alaikum Al-Noor Academy! I would like to book a Free Trial Class.\n\n` +
    `*Student Name:* ${name}\n` +
    `*Age Group:* ${age}\n` +
    `*Selected Course:* ${course}\n` +
    `*Contact:* ${contact}`;

  const whatsappURL = `https://wa.me/${ACADEMY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  formMessage.textContent = `Opening WhatsApp to send your registration details...`;
  window.open(whatsappURL, "_blank", "noopener,noreferrer");
  enrollForm.reset();
});

// Dynamic footer year
document.getElementById("year").textContent = new Date().getFullYear();