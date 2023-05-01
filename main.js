// constants
const colours = {
    '1': 'blue',
    '0': 'beige',
    '-1': 'red'
}
//state variables
let board;
let turn;
let winner;
//cached html elements
const playermessage = document.querySelector('h1');
const playagain = document.querySelector('button');
const tiles = document.querySelectorAll('#board > div');
const playingspace = document.querySelector('#board');
//event listeners
playagain.addEventListener('click', init);
tiles.forEach(function(tile){
    tile.addEventListener('click', placexo);
});
//functions
function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    turn = 1;
    winner = null;
    render();
};
//contains all render functions
function render() {
    renderboard();
    rendermessage();
    rendercontrols();
};
//assigns each tile and index value
//sets tile colour to colours contained in colours object
function renderboard() {
    board.forEach(function(squareval, index) {
        const squares = document.getElementById(`tile${index}`);
        squares.style.backgroundColor = colours[squareval];
    });
};
//displays mesages upon win/loss/draw by changing index.html content
function rendermessage() {
    if (winner === 'draw') {
        playermessage.innerText = "Game Is A Draw";
        playermessage.style.color = 'white'
    } else if (winner) {
        playermessage.innerHTML = `<span style="color:${colours[winner]}">${colours[winner].toUpperCase()} WIN'S</span>`;
        playermessage.style.fontSize = `8vmin`
        playingspace.style.opacity = `0.4`;
    } else {
        playermessage.innerHTML = `<span style="color:${colours[turn]}">${colours[turn].toUpperCase()}'s Turn</span>`;
        playermessage.style.textShadow = `0 0 20px ${colours[turn]}`
        playingspace.style.boxShadow = `5px 5px 10px ${colours[turn]}, -5px -5px 10px ${colours[turn]}`;
        playingspace.style.border = `.2vmin solid ${colours[turn]}`;
        playingspace.style.opacity = `1`;
        playermessage.style.fontSize = `5vmin`;
    }
};
//shows play button
function rendercontrols() {
    if (winner) {
        playagain.style.visibility = 'visible'
    } else {
        playagain.style.visibility = 'hidden'
    }
};

// checks if tile is equal to 0 and winner isnt true
//takes id of clicked element and replaces it with an empty string then changes it to integer 
//also swaps turns if winner is not truthy
//board[index] = turn; sets the value of the clicked element to 1/-1 for players turns
function placexo(evt) {
    const index = parseInt(evt.target.id.replace('tile', ''));
    if (board[index] === 0 && !winner) {
        board[index] = turn;
        turn *= -1;
        winner = checkwinner();
        //if winner is not true and checkdraw is true winner is equal to draw
        if (!winner && checkdraw()) {
            winner = 'draw';
        }
        render();
        
    }
}
function checkwinner() {
    const possiblewins = [
        //down
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        //across
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //diag
        [0, 4, 8],
        [2, 4, 6]
    ]
    // iterates over possible wins and compares possible wins against 
    for (let y = 0; y < possiblewins.length; y++) {
        //used google for how to compare array vs array and it suggested array destructuring 
        //assigns each element of each sub array to a b c to check for winning matches
        //if a b and c are all true then there must be a win
        const [a, b, c] = possiblewins[y];
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            //returns player who last played a move either 1 or -1
            return board[a];
        }
    }
    return null;
};
//iterates over board array and checks if any tiles are equal to 0, returns flase if they are which means a win is still possible and true if not so its a draw
function checkdraw() {
    for (let x = 0; x < board.length; x++) {
        if (board[x] === 0) {
            return false;
        } else {

        }  
    }
    return true;
}
init();

//animation functions


