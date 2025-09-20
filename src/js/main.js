/* Your JS here. */
import '../css/main.scss';

// 3. Position Indicator
const navBar = document.getElementById('navbar');  // We use this to find the section in the bar
const menuLinks = Array.from(document.querySelectorAll('#navbar .menu a'));

const sections = [];
for (let i = 0; i < menuLinks.length; i++) {
    const link = menuLinks[i];
    const target = link.getAttribute('href');   
    const sec = document.querySelector(target); 
    if (sec) {
        sections.push(sec);
    }
}   // For this part, we use getAttributeto get element like "#about", 
    // and use document.querySelector('#about') to get the section


function updateHighlight() {
    const shrink = (window.scrollY || document.documentElement.scrollTop) > 10;
    navBar.classList.toggle('shrink', shrink);
    const navBottom = navBar.getBoundingClientRect().bottom; // We use this to know that which section is below the navbar

    let activeSection = sections[0];
    for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        if (sec.getBoundingClientRect().top <= navBottom + 1) {
        activeSection = sec;
        }
    }

    // Here is the sitution for the bottom, and we will force to highlight the last section
    const atPageEnd = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (atPageEnd) {
        activeSection = sections[sections.length - 1];
    }

    // Update and highlight 
    for (let i = 0; i < menuLinks.length; i++) {
        const link = menuLinks[i];
        const linkTarget = link.getAttribute('href');
        const activeId = '#' + activeSection.id;
        link.classList.toggle('active', linkTarget === activeId);
    }
}

// These three lines are event listener
window.addEventListener('load', updateHighlight);
window.addEventListener('scroll', updateHighlight);
window.addEventListener('resize', updateHighlight);

const track = document.querySelector('.carousel .track');
const prev = document.querySelector('.carousel .nav_prev');
const next = document.querySelector('.carousel .nav_next');

if (track && prev && next) {
    const imgs = Array.from(track.children);
    let idx = 0;

    function move(to) {
        const total = imgs.length;
        idx = (to + total) % total;   
        track.style.transform = `translateX(-${idx * 100}%)`;
    }

    prev.addEventListener('click', () => move(idx - 1));
    next.addEventListener('click', () => move(idx + 1));
}


// Part for the Modal
const modal = document.getElementById('playerModal');
const openBtn  = document.querySelector('[data-open-modal]');
const closeEls = document.querySelectorAll('[data-close-modal]');

openBtn.addEventListener('click', () => modal.classList.add('show'));

closeEls.forEach(el => {
    el.addEventListener('click', () => modal.classList.remove('show'));
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('show');
});
