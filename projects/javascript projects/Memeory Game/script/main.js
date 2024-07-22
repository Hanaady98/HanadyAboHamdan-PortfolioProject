/*---------------imports---------------*/

import { cardsData } from "./cardsData.js";

/*--------------- VARIABLES ---------------*/

const cardsContainer = document.querySelector('.cards-container');

let isFirstCardFlipped = false;
let isGameLocked = false;
let cardOne, cardTwo;

const teamRocket = document.querySelector(".teamRocket");

/*--------------- LEVEL BUTTONS  ---------------*/

const levelButtonsContainer = document.querySelector('.level-buttons');
const easyBtn = document.getElementById('easyBtn');
const mediumBtn = document.getElementById('mediumBtn');
const hardBtn = document.getElementById('hardBtn');
const resetButton = document.getElementById('resetBtn');

/*--------------- LEVELS ---------------*/

const levels = {
    easy: 12,
    medium: 24,
    hard: 36
};

/*--------------- CREATE CARDS ---------------*/

function createCards(level) {
    cardsContainer.innerHTML = ''; // Clear previous cards

    const numberOfCards = levels[level];
    const cardsSubset = cardsData.slice(0, numberOfCards);

    // Shuffle the cards
    shuffleArray(cardsSubset);

    cardsSubset.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'cards';
        cardElement.dataset.image = card.image;
        cardElement.id = card.id;

        const frontCard = document.createElement('div');
        frontCard.className = 'front-card';

        const img = document.createElement('img');
        img.src = card.src;
        img.alt = card.alt;

        frontCard.appendChild(img);

        const backCard = document.createElement('div');
        backCard.className = 'back-card';

        cardElement.appendChild(frontCard);
        cardElement.appendChild(backCard);

        cardsContainer.appendChild(cardElement);
    });

    cardsContainer.style.display = 'grid';
    levelButtonsContainer.style.display = 'none';
    teamRocket.style.display = "none";
    resetButton.style.display = 'block';

    // Add event listeners to newly created cards
    document.querySelectorAll('.cards').forEach(card => card.addEventListener('click', flipCard));
}

/*--------------- FLIP CARD FUNCTION ---------------*/

function flipCard(e) {
    const clickedCard = e.target.closest(".cards");

    if (!clickedCard || isGameLocked) return;
    if (clickedCard === cardOne) return;

    clickedCard.classList.add('flip');

    if (!isFirstCardFlipped) {
        isFirstCardFlipped = true;
        cardOne = clickedCard;
        return;
    }
    cardTwo = clickedCard;
    checkForMatch();
}

/*--------------- CHECK FOR MATCH ---------------*/

function checkForMatch() {
    const isMatch = cardOne.dataset.image === cardTwo.dataset.image;

    isMatch ? disableCards() : unflipCards();
}

/*--------------- DISABLE CARDS ---------------*/

function disableCards() {
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    resetBoard();
}

/*--------------- UNFLIP CARDS ---------------*/

function unflipCards() {
    isGameLocked = true;

    setTimeout(() => {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');
        resetBoard();
    }, 1500);
}

/*--------------- RESET BOARD ---------------*/

function resetBoard() {
    isFirstCardFlipped = false;
    isGameLocked = false;
    cardOne = null;
    cardTwo = null;
}

/*--------------- SHUFFLE ARRAY ---------------*/

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/*--------------- RESET GAME ---------------*/

function resetGame() {
    location.reload();
}

/*--------------- EVENT LISTENERS ---------------*/

easyBtn.addEventListener('click', () => createCards('easy'));
mediumBtn.addEventListener('click', () => createCards('medium'));
hardBtn.addEventListener('click', () => createCards('hard'));

resetButton.addEventListener('click', resetGame);
