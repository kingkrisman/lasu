
document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navLinksItems = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  navLinksItems.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  });

  // Sticky header
  const nav = document.querySelector(".main-nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Theme switcher
  const themeSwitcher = document.querySelector(".theme-switcher");
  themeSwitcher.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem(
      "darkTheme",
      document.body.classList.contains("dark-theme"),
    );
  });

  // Check for saved theme preference
  if (localStorage.getItem("darkTheme") === "true") {
    document.body.classList.add("dark-theme");
  }

  // Modal functionality
  const applyBtn = document.getElementById("applyBtn");
  const applicationModal = document.getElementById("applicationModal");
  const modalClose = document.querySelector(".modal-close");

  applyBtn.addEventListener("click", function () {
    applicationModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  modalClose.addEventListener("click", function () {
    applicationModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close modal when clicking outside
  applicationModal.addEventListener("click", function (e) {
    if (e.target === applicationModal) {
      applicationModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Form validation
  const applicationForm = document.getElementById("applicationForm");
  applicationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate full name
    const fullName = document.getElementById("fullName");
    const fullNameError = document.getElementById("fullNameError");
    if (!fullName.value.trim()) {
      fullNameError.classList.add("visible");
      isValid = false;
    } else {
      fullNameError.classList.remove("visible");
    }

    // Validate email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      emailError.classList.add("visible");
      isValid = false;
    } else {
      emailError.classList.remove("visible");
    }

    // Validate phone
    const phone = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone.value.replace(/\D/g, ""))) {
      phoneError.classList.add("visible");
      isValid = false;
    } else {
      phoneError.classList.remove("visible");
    }

    // Validate program selection
    const program = document.getElementById("program");
    const programError = document.getElementById("programError");
    if (!program.value) {
      programError.classList.add("visible");
      isValid = false;
    } else {
      programError.classList.remove("visible");
    }

    if (isValid) {
      // Form is valid, submit or process data
      alert(
        "Application submitted successfully! We will contact you soon.",
      );
      applicationModal.classList.remove("active");
      document.body.style.overflow = "";
      applicationForm.reset();
    }
  });

  // Image gallery
  const galleryImages = document.querySelectorAll("[data-gallery]");
  const galleryModal = document.getElementById("galleryModal");
  const galleryImage = document.getElementById("galleryImage");
  const galleryClose = document.querySelector(".gallery-close");

  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      galleryImage.src = this.src;
      galleryImage.alt = this.alt;
      galleryModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  galleryClose.addEventListener("click", function () {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  galleryModal.addEventListener("click", function (e) {
    if (e.target === galleryModal) {
      galleryModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  // Counter animation
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 20);
    } else {
      counter.innerText = target;
    }
  }

  // Start counter animation when in view
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".counter");
          counters.forEach((counter) => {
            animateCounter(counter);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  const aboutSection = document.querySelector(".about-section");
  if (aboutSection) {
    counterObserver.observe(aboutSection);
  }
});
