/**
 * TRANSTURAMA - SITIO WEB OFICIAL
 * Lógica e Interactividad JavaScript Vanilla
 * Teléfono WhatsApp: +56 9 9690 6217
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '56996906217';

  // --- 1. Header con efecto al hacer Scroll y Botón Volver Arriba ---
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- 2. Menú Drawer Móvil Deslizante (Para Celulares) ---
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-item');

  const openDrawer = () => {
    mobileDrawer?.classList.add('active');
    drawerBackdrop?.classList.add('active');
    document.body.classList.add('drawer-open');
    mobileToggleBtn?.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('active');
    drawerBackdrop?.classList.remove('active');
    document.body.classList.remove('drawer-open');
    mobileToggleBtn?.setAttribute('aria-expanded', 'false');
  };

  mobileToggleBtn?.addEventListener('click', () => {
    const isOpen = mobileDrawer?.classList.contains('active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Navegación suave con cálculo dinámico de altura del Header Sticky
  const allNavAnchors = document.querySelectorAll('.nav-link, .drawer-nav-item, .bottom-nav-item[data-bottom-nav]');
  allNavAnchors.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          e.preventDefault();
          const headerHeight = header?.offsetHeight || 75;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Si fue clic desde el drawer móvil, cerrarlo limpiamente
          if (link.classList.contains('drawer-nav-item') && mobileDrawer?.classList.contains('active')) {
            closeDrawer();
          }
        }
      }
    });
  });

  // --- 4. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Cerrar otros acordeones
      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
      questionBtn.setAttribute('aria-expanded', (!isActive).toString());
    });
  });

  // --- 5. Resaltar Enlaces Activos (Header, Drawer y Bottom Navigation) según Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  const drawerNavItems = document.querySelectorAll('.drawer-nav-item');
  const bottomNavButtons = document.querySelectorAll('.bottom-nav-item[data-bottom-nav]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // Enlaces de escritorio
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });

        // Enlaces del drawer móvil
        drawerNavItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });

        // Iconos de la barra inferior móvil
        bottomNavButtons.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('data-bottom-nav') === sectionId) {
            item.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
});
