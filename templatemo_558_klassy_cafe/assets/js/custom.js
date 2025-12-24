(() => {
  'use strict';

  const header = document.querySelector('.header-area');
  const hero = document.querySelector('#top');
  const menuTrigger = document.querySelector('.menu-trigger');
  const nav = document.querySelector('.header-area .nav');

  const setHeaderState = () => {
    if (!header || !hero) {
      return;
    }
    const triggerPoint = hero.offsetHeight - header.offsetHeight;
    if (window.scrollY >= triggerPoint) {
      header.classList.add('background-header');
    } else {
      header.classList.remove('background-header');
    }
  };

  const closeMenu = () => {
    if (!nav || !menuTrigger) {
      return;
    }
    nav.classList.remove('is-open');
    menuTrigger.classList.remove('active');
    menuTrigger.setAttribute('aria-expanded', 'false');
  };

  if (menuTrigger && nav) {
    menuTrigger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuTrigger.classList.toggle('active', isOpen);
      menuTrigger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('.scroll-to-section a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        const offset = header ? header.offsetHeight + 12 : 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMenu();
      }
    });
  });

  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));

  const setActiveLink = () => {
    if (!sections.length || !navLinks.length) {
      return;
    }
    const position = window.scrollY + 120;
    let currentId = sections[0].id;

    sections.forEach((section) => {
      if (position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', isActive);
    });
  };

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  window.addEventListener('scroll', () => {
    setHeaderState();
    setActiveLink();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });

  setHeaderState();
  setActiveLink();
})();
