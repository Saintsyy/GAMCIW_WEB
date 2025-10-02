// ============================================
// 1. LOADING SCREEN & HERO ANIMATION ON LOAD
// ============================================

// FUNGSI BARU: Untuk menganimasikan elemen di hero section saat halaman dimuat
function animateHeroOnLoad() {
  const heroElements = document.querySelectorAll(".hero .fade-in-up");
  heroElements.forEach((el) => {
    const delay = el.dataset.delay || 0;
    setTimeout(() => {
      el.classList.add("visible");
    }, parseInt(delay));
  });
}

// FUNGSI event "load" DIMODIFIKASI untuk memanggil animasi hero
window.addEventListener("load", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    // Memanggil fungsi animasi hero setelah loading screen hilang
    animateHeroOnLoad(); 
  }, 1500);
});


// ============================================
// 2. NAVBAR SHRINK ON SCROLL
// ============================================
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ============================================
// 3. HAMBURGER MENU TOGGLE
// ============================================
const nav = document.querySelector("nav ul");
const burger = document.querySelector(".burger");

burger.addEventListener("click", () => {
  nav.classList.toggle("show");

  if (nav.classList.contains("show")) {
    burger.innerHTML = "✕";
  } else {
    burger.innerHTML = "☰";
  }
});

// ============================================
// 4. SMOOTH SCROLL WITH OFFSET
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      nav.classList.remove("show");
      burger.innerHTML = "☰";
    }
  });
});

// ============================================
// 5. ACTIVE MENU HIGHLIGHT
// ============================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ============================================
// 6. SCROLL REVEAL ANIMATIONS (untuk bagian selain Hero)
// ============================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;

      setTimeout(() => {
        entry.target.classList.add("visible");
      }, parseInt(delay));

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observer sekarang hanya menargetkan elemen DI LUAR hero section
document.querySelectorAll("section:not(.hero) .fade-in-up, footer .fade-in-up").forEach((el) => {
  observer.observe(el);
});


// ============================================
// 7. PARALLAX EFFECT ON HERO (KODE INI TELAH DIHAPUS)
// ============================================
// Bagian kode parallax sebelumnya telah dihapus dari sini


// ============================================
// 8. MAGNETIC HOVER EFFECT ON CTA
// ============================================
const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

// ============================================
// 9. RIPPLE EFFECT ON BUTTONS
// ============================================
document.querySelectorAll(".cta, .btn-send, nav a").forEach((button) => {
  button.addEventListener("click", function (e) {
    const existingRipple = this.querySelector(".ripple-effect");
    if(existingRipple) {
      existingRipple.remove();
    }

    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple-effect");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles dynamically
const style = document.createElement("style");
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// 10. FORM SUBMISSION WITH ANIMATION
// ============================================
function handleSubmit() {
  const form = document.querySelector(".contact-form");
  const button = form.querySelector(".btn-send");
  const originalText = button.querySelector("span").innerHTML;

  button.querySelector("span").innerHTML = "Mengirim...";
  button.style.background = "linear-gradient(135deg, #1a9d6f, #157a56)";

  setTimeout(() => {
    button.querySelector("span").innerHTML = "✓ Terkirim!";
    button.style.background = "linear-gradient(135deg, #28a745, #1e7e34)";

    alert("Terima kasih! Pesan Anda telah terkirim.");

    form.reset();

    setTimeout(() => {
      button.querySelector("span").innerHTML = originalText;
      button.style.background = "linear-gradient(135deg, #2fc18c, #1a9d6f)";
    }, 2000);
  }, 1500);
}

// ============================================
// 11. CURSOR TRAIL EFFECT (Optional)
// ============================================
const createCursorTrail = () => {
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  document.body.appendChild(trail);

  let mouseX = 0;
  let mouseY = 0;
  let trailX = 0;
  let trailY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateTrail = () => {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;

    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";

    requestAnimationFrame(animateTrail);
  };

  animateTrail();
};

// Uncomment to enable cursor trail
// createCursorTrail();

// ============================================
// 12. PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions if needed
const debouncedScroll = debounce(() => {
  // Additional scroll logic here
}, 10);

window.addEventListener("scroll", debouncedScroll);

// ============================================
// 13. LOG INITIALIZATION
// ============================================
console.log("[v0] 🍜 Mie Gacoan website initialized with enhanced animations!");
console.log(
  "[v0] Features loaded: Loading screen, navbar shrink, parallax, scroll reveal, magnetic hover, ripple effects",
);