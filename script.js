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

// Contact Modal Functions
function openContactModal() {
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scroll

    // Focus on first input for better UX
    setTimeout(() => {
      const firstInput = modal.querySelector('input[type="text"]');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

function closeContactModal() {
  const modal = document.getElementById("contactModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scroll

    // Clear any messages
    const existingMessage = modal.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }
  }
}

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  const modal = document.getElementById("contactModal");
  if (event.target === modal) {
    closeContactModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeContactModal();
  }
});

// Contact Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Validate form
      if (!validateContactForm(data)) {
        return;
      }

      // Submit form
      submitContactForm(data);
    });
  }
});

function validateContactForm(data) {
  // Remove existing error messages
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Basic validation
  if (!data.name.trim()) {
    showFormMessage("Please enter your name.", "error");
    return false;
  }

  if (!data.email.trim() || !isValidEmail(data.email)) {
    showFormMessage("Please enter a valid email address.", "error");
    return false;
  }

  if (!data.subject) {
    showFormMessage("Please select a subject.", "error");
    return false;
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    showFormMessage(
      "Please enter a message with at least 10 characters.",
      "error"
    );
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message, type) {
  const form = document.getElementById("contactForm");
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  // Insert at the beginning of the form
  form.insertBefore(messageDiv, form.firstChild);

  // Auto-remove after 5 seconds for success messages
  if (type === "success") {
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

function submitContactForm(data) {
  const submitButton = document.querySelector(".btn-submit");
  const originalText = submitButton.textContent;

  // Disable button and show loading
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // Create mailto link with form data
  const subject = encodeURIComponent(`Aiki Support: ${data.subject}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Subject: ${data.subject}\n\n` +
      `Message:\n${data.message}\n\n` +
      `---\n` +
      `Sent from Aiki website contact form`
  );

  // Open email client
  const mailtoLink = `mailto:chizhang2048@gmail.com?subject=${subject}&body=${body}`;

  try {
    // Try to open email client
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
      showFormMessage(
        "Your email client should open now. If it doesn't, please send an email to chizhang2048@gmail.com with your message.",
        "success"
      );

      // Reset form
      document.getElementById("contactForm").reset();

      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = originalText;

      // Close modal after a delay
      setTimeout(() => {
        closeContactModal();
      }, 3000);
    }, 500);
  } catch (error) {
    // Fallback: show error and direct email instructions
    showFormMessage(
      "Unable to open email client. Please send your message directly to chizhang2048@gmail.com",
      "error"
    );

    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

// Enhanced email button tracking
document.addEventListener("DOMContentLoaded", function () {
  const emailButtons = document.querySelectorAll(
    ".email-button, .support-link"
  );

  emailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Track email button clicks
      trackEvent("Support", "Email Click", "Direct Email");
    });
  });

  const contactFormButton = document.querySelector(".contact-form-button");
  if (contactFormButton) {
    contactFormButton.addEventListener("click", function () {
      // Track contact form modal opens
      trackEvent("Support", "Contact Form Open", "Modal");
    });
  }
});

// Add smooth scrolling to contact section
document.addEventListener("DOMContentLoaded", function () {
  const contactLinks = document.querySelectorAll('a[href="#contact"]');

  contactLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
