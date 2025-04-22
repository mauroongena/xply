export function handleHeaderScroll() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
  
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
  
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('header--hidden');
      } else {
        header.classList.remove('header--hidden');
      }
  
      lastScrollY = currentScrollY;
    });
  }
  