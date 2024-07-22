//creating the variables
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restart-btn");
const winConditions = [
    //for each row
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//array of placeholders - empty strings array, one for each cell
let options = ["", "", "", "", "", "", "", "", ""];

//to keep track of our current Player 
let currentPlayer = "X";

//to keep track if the game is running - (will switch it to true when we initiliaze the game)
let running = false;

initializeGame();

/*---------------------Functions--------------------*/
//initializing the game
function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    //update the status
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

/*------when the cell is clicked------*/
function cellClicked() {
    //this refers to whatever cell is clicked on then we will get its attribute (the cellIndex in our html file)
    const cellIndex = this.getAttribute("cellIndex");

    /* checking if our index number within our options are not empty,
    we'll only want to update the cell if nothing is there */
    //if our options at cellIndex doesn't equal an empty space or if the game is not running then return (we'll not do anything.)
    if (options[cellIndex] !== "" || !running) {
        return;
    }

    //otherwise we'll invoke the updateCell function and pass this and cellIndex as arguments. followed by checkWinner function
    updateCell(this, cellIndex);
    checkWinner();
}

/*------updating the cell------*/
function updateCell(cell, index) {
    /*take options at index of the index parameter, set the sequel to currentPlayer so we are updating our placeholders*/
    options[index] = currentPlayer;
    //then we change the text content to one of these cells (whatever cell we click on originally);
    cell.textContent = currentPlayer;
}

/*------changing the player------*/
function changePlayer() {
    //using the ternary operator to check if the currentPlayer is X, if yes it changes to O's turn if not then it's x's turn
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

/*------checking the winner------*/
function checkWinner() {
    let roundWon = false; //when someone wins we change it to true

    /* We're iterating over all of the inner arrays in win conditions. We'll start with the first. We have three indexes, 0, 1, 2.
    We're going to check within our options at these three indexes, 0, 1, 2, (at least we'll start with that row) If these three are not spaces and they're all the same, that means somebody won. If there is no winner we'll check the next set of win conditions, 3, 4, 5. These are indexes within our options. at these three indexes, 3, 4, 5, if there are no spaces and they're all the same character, that means somebody won. We'll repeat this process for each set of win conditions */

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue; //if there's an empty space we'll continue and skip this iteration
        }
        if (cellA === cellB && cellB === cellC) {
            //this means we have a winner so we'll change our roundWon to true.
            roundWon = true;
            break; //then break because we don't need to continue this for loop anymore
        }
    }
    //outside our for loop
    //if our roundWon equals to true we update our status text
    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins !`;
        running = false; //the game is over
    }
    /* if there is no spaces left it's a draw - so we check if our options doesn't include any spaces
    if it's true we update the status text to draw */
    else if (!options.includes("")) {
        statusText.textContent = `Draw !`;
        running = false;
    } else {
        changePlayer();
    }
}

/*------restarting the game------*/
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
