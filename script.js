// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Handle navigation link clicks
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add scroll effect to header
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;

    // Add/remove blur effect based on scroll position
    if (scrollTop > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .step, .screenshot-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Mobile menu toggle (if needed in future)
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const navLinksContainer = document.querySelector(".nav-links");

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function () {
      navLinksContainer.classList.toggle("mobile-open");
    });
  }

  // Add click tracking for analytics (placeholder)
  const downloadButtons = document.querySelectorAll(
    ".btn-primary, .app-store-button"
  );
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Analytics tracking would go here
      console.log("Download button clicked");

      // You can add Google Analytics, Facebook Pixel, or other tracking here
      // Example: gtag('event', 'click', { event_category: 'Download', event_label: 'Hero CTA' });
    });
  });

  // Lazy loading for images (additional optimization)
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Add some visual feedback for button interactions
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .cta-button"
  );
  buttons.forEach((button) => {
    button.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.98)";
    });

    button.addEventListener("mouseup", function () {
      this.style.transform = "";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Parallax effect for hero section (subtle)
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const hero = document.querySelector(".hero");

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
});

// Add some utility functions
function trackEvent(category, action, label) {
  // Placeholder for analytics tracking
  console.log(`Event tracked: ${category} - ${action} - ${label}`);

  // Example implementations:
  // Google Analytics 4
  // gtag('event', action, { event_category: category, event_label: label });

  // Facebook Pixel
  // fbq('track', action, { category: category, label: label });
}

// Error handling for missing elements
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
  // Scroll-based animations or effects can go here
}, 10);
