//array that contains all the objects the user needs to guess
let gamesLists = [
    //singers category
    {
        category: "singers",
        hint: "stared in a nickelodeon show",
        word: "ARIANA"
    },
    {
        category: "singers",
        hint: "the first British male artist to debut at number one in both the UK and US",
        word: "ZAYN"
    },
    {
        category: "singers",
        hint: "sang the theme song in titanic movie",
        word: "CELENE"
    },
    //food
    {
        category: "food",
        hint: "a piece of bread with a topping on top",
        word: "PIZZA"
    },
    {
        category: "food",
        hint: "the known fruit from the bible",
        word: "APPLE"
    },
    {
        category: "food",
        hint: "used to make wine with",
        word: "GRAPES"
    },
    //tv shows
    {
        category: "tv shows",
        hint: "has the famous quote: how you doin?",
        word: "FRIENDS"
    },
    {
        category: "tv shows",
        hint: "a teenager who creates and hosts her own web show with her best friends",
        word: "ICARLY"
    },
    {
        category: "tv shows",
        hint: "best friends with buster",
        word: "ARTHUR"
    },
    {
        category: "tv shows",
        hint: "destined to control the four elements",
        word: "AVATAR"
    },

    //aninme characters categories
    {
        category: "anime charachters",
        hint: "demon slayer character",
        word: "NEZUKO"
    },
    {
        category: "anime charachters",
        hint: "fairytail charachter",
        word: "NATSU"
    },
    {
        category: "anime charachters",
        hint: "haikyu characters",
        word: "KUROO"
    },
    //football categories
    {
        category: "football players",
        hint: "won the world cup in 2022 in qatar",
        word: "MESSI"
    },
    {
        category: "football players",
        hint: "was the captain in real madrid",
        word: "RONALDO"
    },
    {
        category: "football players",
        hint: "won the world cup in 2018 in russia",
        word: "MBAPPE"
    },
    //countries categories
    {
        category: "countries",
        hint: "a famous tropical country",
        word: "MELDIVES"
    },
    {
        category: "countries",
        hint: "ancient mythology religion, famous for their Olympic deities.",
        word: "GREECE"
    },
    {
        category: "countries",
        hint: "known for their spaghetti",
        word: "ITALY"
    },
];

/*------------------------Random------------------------*/
const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * gamesLists.length);
    return gamesLists[randomIndex];
};

//variables
const chosenWordList = getRandomWord();
const chosenWord = chosenWordList.word;
const hint = chosenWordList.hint;
const category = chosenWordList.category;

console.log(chosenWordList);
console.log(chosenWord);
console.log(hint);
console.log(category);

/*------------------------categories------------------------*/
const categoriesTitle = document.querySelector('.categories');
categoriesTitle.innerHTML = category;

/*-------------------divs creation---------------------*/
const boxes = document.querySelector('.correct-letters');

let guess = [];

for (let i = 0; i < chosenWord.length; i++) {
    let guessDivs_creation = document.createElement('div');
    guessDivs_creation.classList.add('letter-box');
    boxes.appendChild(guessDivs_creation);
    guess.push(guessDivs_creation);
}

/*-------------------initializing keyboard---------------------*/
let keyboard = document.getElementsByClassName('letters');
const incorrectLetters = document.querySelector('.incorrect-letters');
const gameContainer = document.querySelector('.game-container');

const resetMsg = document.createElement('div');
resetMsg.classList.add('reset-message');
gameContainer.appendChild(resetMsg);

//displayed hearts
const hearts = document.querySelector('.hearts-chances');
let heartIcons = [];

for (let item = 0; item < 5; item++) {
    let heartIcon = document.createElement('i');
    heartIcon.classList.add('fa-solid', 'fa-heart');
    hearts.appendChild(heartIcon);
    heartIcons.push(heartIcon); // Store the heart icon in the array
};

// a variabe for the game
let gameOver = false;
let wonRound = false;

// Function to end the game
const endGame = () => {
    gameOver = true;

    // initialize countdown 
    let countdown = 3;

    resetMsg.innerHTML = `You Lost! loading new game in ${countdown}..`;

    const intervalCountdown = setInterval(() => {
        countdown--
        resetMsg.innerHTML = `You Lost! loading new game in ${countdown}..`;

        //when the countdown reaches zero the pages reloads aka the game starts again
        if (countdown === 0) {
            clearInterval(intervalCountdown);
            location.reload();
        }
    }, 1000);
};

// Function to handle winning the game
let isBoxesFull = () => {
    for (let i = 0; i < guess.length; i++) {
        if (guess[i].innerHTML !== chosenWord[i]) {
            return false;
        }
    }
    return true;
};


//keyboard
for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener('click', (e) => {
        //if the user loses/wins the game stops
        if (gameOver || wonRound) return;

        //Capturing the clicked letter and convert it to lowercase
        const letterKey = e.target.textContent;
        //A function to guess the letter
        const guessLetter = (letter) => {
            if (chosenWord.includes(letter)) {
                //Looping through each letter in the chosen word
                for (let j = 0; j < chosenWord.length; j++) {
                    if (chosenWord[j] === letter) {
                        //Update the div in the array
                        guess[j].innerHTML = letter;
                    }
                }
                if (isBoxesFull()) {
                    wonRound = true;
                    resetMsg.innerHTML = `Congrats! You Won The Game`;
                }
            } else {
                //if the letter is incorrect
                console.log(`Incorrect guess: ${letter}`);
                incorrectLetters.innerHTML += letterKey;

                //delete heart chances
                if (heartIcons.length > 0) {
                    let lastHeart = heartIcons.pop();
                    hearts.removeChild(lastHeart);
                }

                // Check if there are no more hearts left
                if (heartIcons.length === 0) {
                    endGame();
                }
            }
        }; //the end of the guessLetter function
        guessLetter(letterKey);
        console.log(`Letter clicked: ${letterKey}`);
    });
}
console.log(guess);

/*-------------------hint button---------------------*/
const hintBtn = document.getElementById('hint-btn');
const clueDiv = document.querySelector('.clue');
const restarnBtn = document.getElementById('restart-btn');

hintBtn.addEventListener('click', () => {
    clueDiv.innerHTML = hint;
});

restarnBtn.addEventListener('click', () => {
    location.reload();
});