/**
 * Main JavaScript File
 * Handles mobile navigation toggle and smooth scrolling
 */

(function() {
  'use strict';

  // =============================================
  // Mobile Navigation Toggle
  // =============================================
  function initMobileNav() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarToggle && navbarMenu) {
      navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        
        // Toggle aria-expanded for accessibility
        const isExpanded = navbarMenu.classList.contains('active');
        navbarToggle.setAttribute('aria-expanded', isExpanded);
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        const isClickInside = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
        
        if (!isClickInside && navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
          navbarToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu when pressing Escape key
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
          navbarToggle.setAttribute('aria-expanded', 'false');
          navbarToggle.focus();
        }
      });
    }
  }

  // =============================================
  // Smooth Scrolling for Anchor Links
  // =============================================
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        const targetId = this.getAttribute('href');
        
        // Skip if href is just "#" or target doesn't exist
        if (targetId === '#' || !document.querySelector(targetId)) {
          return;
        }

        const targetElement = document.querySelector(targetId);
        
        event.preventDefault();
        
        // Account for sticky header offset
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navbarMenu = document.querySelector('.navbar-menu');
        if (navbarMenu && navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
          const navbarToggle = document.querySelector('.navbar-toggle');
          if (navbarToggle) {
            navbarToggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }

  // =============================================
  // Initialize on DOM Ready
  // =============================================
  function init() {
    initMobileNav();
    initSmoothScroll();
    
    console.log('Ad Network Website initialized successfully.');
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
