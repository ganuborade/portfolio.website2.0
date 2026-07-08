const toggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('show');
        }
    });
});

function setActiveLink() {
    const sections = document.querySelectorAll('main section[id]');
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
        const id = section.getAttribute('id');
        const offsetTop = section.offsetTop;
        const offsetBottom = offsetTop + section.offsetHeight;

        navLinks.forEach((link) => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${id}` && scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                link.classList.add('active');
            }
        });
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));

function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-theme');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}