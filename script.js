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
    ".btn-primary, .btn-secondary, .cta-button, .btn-support"
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

  // Support Form Submission
  const supportForm = document.getElementById("supportForm");

  if (supportForm) {
    supportForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(supportForm);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Validate form
      if (!validateSupportForm(data)) {
        return;
      }

      // Submit form
      submitSupportForm(data);
    });
  }
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

// Support Form Functions
function validateSupportForm(data) {
  // Remove existing error messages
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Basic validation
  if (!data.name.trim()) {
    showFormMessage("请输入您的姓名。", "error");
    return false;
  }

  if (!data.email.trim() || !isValidEmail(data.email)) {
    showFormMessage("请输入有效的邮箱地址。", "error");
    return false;
  }

  if (!data.subject) {
    showFormMessage("请选择问题类型。", "error");
    return false;
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    showFormMessage("请输入至少10个字符的详细描述。", "error");
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message, type) {
  const form = document.getElementById("supportForm");
  const messageDiv = document.createElement("div");
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;

  // Insert at the beginning of the form
  form.insertBefore(messageDiv, form.firstChild);

  // Scroll to message
  messageDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });

  // Auto-remove after 5 seconds for success messages
  if (type === "success") {
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

function submitSupportForm(data) {
  const submitButton = document.querySelector(".btn-submit-main");
  const originalText = submitButton.textContent;

  // Disable button and show loading
  submitButton.disabled = true;
  submitButton.textContent = "发送中...";

  // Map English values to Chinese for email
  const subjectMap = {
    "technical-issue": "技术问题/Bug报告",
    "feature-request": "功能请求/建议",
    "account-help": "账户帮助",
    "app-feedback": "App反馈",
    "general-question": "一般问题",
    other: "其他",
  };

  const chineseSubject = subjectMap[data.subject] || data.subject;

  // Create mailto link with form data
  const subject = encodeURIComponent(`Aiki支持请求: ${chineseSubject}`);
  const body = encodeURIComponent(
    `姓名: ${data.name}\n` +
      `邮箱: ${data.email}\n` +
      `问题类型: ${chineseSubject}\n\n` +
      `详细描述:\n${data.message}\n\n` +
      `---\n` +
      `来自Aiki官网联系表单`
  );

  // Open email client
  const mailtoLink = `mailto:chizhang2048@gmail.com?subject=${subject}&body=${body}`;

  try {
    // Try to open email client
    window.location.href = mailtoLink;

    // Show success message
    setTimeout(() => {
      showFormMessage(
        "邮件客户端应该已经打开。如果没有打开，请直接发送邮件到 chizhang2048@gmail.com",
        "success"
      );

      // Reset form
      document.getElementById("supportForm").reset();

      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = originalText;

      // Track successful form submission
      trackEvent("Support", "Form Submit", "Success");
    }, 500);
  } catch (error) {
    // Fallback: show error and direct email instructions
    showFormMessage(
      "无法打开邮件客户端。请直接发送邮件到 chizhang2048@gmail.com",
      "error"
    );

    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = originalText;

    // Track failed form submission
    trackEvent("Support", "Form Submit", "Error");
  }
}

// Enhanced email button tracking
document.addEventListener("DOMContentLoaded", function () {
  const supportLinks = document.querySelectorAll(".support-link, .btn-support");

  supportLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Track support section visits
      trackEvent("Support", "Support Link Click", "Navigation");
    });
  });

  const directEmailLinks = document.querySelectorAll(
    'a[href^="mailto:chizhang2048@gmail.com"]'
  );
  directEmailLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Track direct email clicks
      trackEvent("Support", "Direct Email Click", "Contact Info");
    });
  });
});
