import { filter } from './fetch_movie_list.js';

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('main').style.opacity = 1;
    }, 500);
});

const navHome = document.getElementById('nav-home');
navHome.style.opacity = 1;
navHome.style.fontFamily = 'Airbnb-Cereal-bd';
navHome.style.letterSpacing = '0.2px';
navHome.style.paddingBottom = '5px';
navHome.style.borderBottom = '2px solid rgba(255, 255, 255, 0.6)';
// 로고 드래그 방지
document.getElementById('logo').addEventListener('mousedown', (e) => {
    e.preventDefault();
});
// 카드요소 호버 이펙트
document.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('card-poster')) {
        const card_rate = e.target.parentNode.querySelector('.card-rate');
        card_rate.style.display = 'block';
        card_rate.style.transform = 'matrix(1, 0, 0, 1, 0, -8)';
        card_rate.style.transition = 'ease-in-out 0.4s';
    }
});
document.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('card-poster')) {
        const card_rate = e.target.parentNode.querySelector('.card-rate');
        card_rate.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
        card_rate.style.transition = 'ease-in-out 0.4s';
    }
});
// 카드요소 호버 이펙트 종료
document
    .getElementById('main-movie-container')
    .addEventListener('mousedown', (e) => {
        e.preventDefault();
    });

document.getElementById('section-2').addEventListener('mousedown', (e) => {
    e.preventDefault();
});

const leftArrow = document.getElementById('arrow-left');
const rightArrow = document.getElementById('arrow-right');
let arrowCounter = 0;
let arrowVariable = 0;
leftArrow.addEventListener('click', (e) => {
    const cardsContainer =
        e.target.parentNode.querySelector('#cards-container');
    const totalCardContainerWitdh = cardsContainer.scrollWidth;
    if (arrowCounter) {
        arrowVariable += cardsContainer.offsetWidth;
        cardsContainer.style.transform = `translateX(${arrowVariable}px)`;
        arrowCounter--;
    }
});
rightArrow.addEventListener('click', (e) => {
    const cardsContainer =
        e.target.parentNode.querySelector('#cards-container');
    const totalCardContainerWitdh = cardsContainer.scrollWidth;
    if (totalCardContainerWitdh + arrowVariable < cardsContainer.offsetWidth) {
        return;
    }
    if (arrowCounter >= 0) {
        arrowVariable = arrowVariable - cardsContainer.offsetWidth;
        cardsContainer.style.transform = `translateX(${arrowVariable}px)`;
        arrowCounter++;
    }
});

// search

document.getElementById('search-icon').addEventListener('click', () => {
    if (Number(document.getElementById('search-input').style.opacity) === 0) {
        document.getElementById('search-input').style.opacity = 1;
        document.getElementById('search-input').style.zIndex = 1;
        document.getElementById('search-input').value = '';
        document.getElementById('search-input').focus();
    } else {
        document.getElementById('search-input').style.opacity = 0;
        document.getElementById('search-input').style.zIndex = -1;
        document.getElementById('search-input').value = '';
        filter();
    }
});
document.getElementById('search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('search-input').style.opacity = 0;
        document.getElementById('search-input').style.zIndex = -1;
        document.getElementById('search-input').value = '';
        filter();
    }
});
