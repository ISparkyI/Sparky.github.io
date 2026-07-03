// Рік у футері
document.getElementById('year').textContent = new Date().getFullYear();

// Підсвічування активної вкладки при скролі
const sections = document.querySelectorAll('main section[id]');
const tabs = document.querySelectorAll('.tab');

const setActiveTab = () => {
  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  tabs.forEach((tab) => {
    const isActive = tab.getAttribute('href') === `#${currentId}`;
    tab.classList.toggle('tab--active', isActive);
  });
};

window.addEventListener('scroll', setActiveTab, { passive: true });
setActiveTab();

// Мобільне меню (просте розкриття вкладок)
const menuToggle = document.querySelector('.menu-toggle');
const tabsNav = document.querySelector('.tabs');

if (menuToggle && tabsNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = tabsNav.classList.toggle('tabs--open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}
