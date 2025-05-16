document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const dropdowns = document.querySelectorAll('.dropdown');
  const overlay = document.querySelector('.overlay');
  const body = document.body;

  // Toggle sidebar
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Handle dropdown toggles
  dropdowns.forEach(dropdown => {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Close other dropdowns
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('active');
        }
      });
      
      dropdown.classList.toggle('active');
    });
  });

  // Close menu when clicking overlay
  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.style.overflow = '';
    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
  });

  // close mobile menu when window is resized above max
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      body.style.overflow = '';
      dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
  });

  // Prevent body scroll when menu is open
  navMenu.addEventListener('touchmove', (e) => {
    if (navMenu.classList.contains('active')) {
      e.preventDefault();
    }
  }, { passive: false });
});
