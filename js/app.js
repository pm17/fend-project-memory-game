/*
 * Create a list that holds all of your cards
 */
let cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'bomb', 'bomb', 'leaf', 'leaf', 'bicycle', 'bicycle']


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*
@description for shuffling cards
@param {array} 
@returns {array} shuffled cards
*/
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//variables
//cardDeck for holding all the cards
let cardDeck = document.querySelector('.deck');
//fragment to add the elements to virtual DOM
let fragment = document.createDocumentFragment();
//selecting the element to show the number of moves
let movesCount = document.querySelector('.moves');

//let starsList = document.querySelectorAll('.stars li');

//to show the time
let timer = document.querySelector('.timer');


let moves = 0,
    match = 0,
    openCards = [];


/*
@description for restting variable and initiating the game (shuffling and click)
*/
const gameInit = function() {

    moves = 0, match = 0;
    openCards = [];
    //shuffle the cards
    cards = shuffle(cards);
    //empty the deck
    cardDeck.innerHTML = " ";

    //add the cards to the the virtual DOM
    cards.forEach(function(e) {
        li = document.createElement('li');
        li.classList.add("card");
        li.innerHTML = '<i class="fa fa-' + e + '"></i>';
        fragment.appendChild(li);
    });

    //add the fragment to the deck
    cardDeck.appendChild(fragment);

    moves = 0;
    movesCount.innerHTML = moves;


    //timer
    second = 0;
    minute = 0;
    hour = 0;

    timer.innerHTML = "0:0:0";
    // clearInterval(timeNow);


    gamePlay();

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/*
@description function to display card's symbol
*/
function showCardSymbol(event) {
    //console.log("showCardSymbol");
    event.target.classList.add("show", "open");

}

/*
@description add card content to the list of open cards
@param {object} a element from the page
*/
function addOpenCardlist(event) {
    // console.log("addOpenCardlist");
   // console.log(typeof(event));
    let clickedCardContent = event.target.firstElementChild.classList;
    //console.log(clickedCardContent);
    openCards.push(clickedCardContent);
}
/*
@description check whether the cards of opencards array match
*/
function cardsMatch() {
    //console.log("checkCardMatch");
    open = document.querySelectorAll('.open');
    open.forEach(function(e) {
        e.classList.add("match");
    });

    return true;

}
/*
@description if cards do not match close the cards
*/
function cardsNotMatch() {
    // console.log("cardsNotMatch");
    open = document.querySelectorAll('.open');
    setTimeout(function() {
        open.forEach(function(e) {
            e.classList.remove("open", "show");
        })
    }, 450);
}
/*
@description count the number of moves
*/
function addMoves() {
    // console.log("addmoves");
    moves++;
    document.querySelector('.moves').innerHTML = moves;
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        initTime();
    }
}
/*
@description if all the cards match then end this game
*/
function endgame() {
    //console.log("endgame");
    clearInterval(timeNow);
    // console.log(timer.innerHTML);
    popup();
}
/*
@description game timer setup
*/
function initTime() {
    timeNow = setInterval(function() {
        second++;
        timer.innerHTML = hour + ":" + minute + ":" + second;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
    }, 1000)
}

//rating system
//rating control system
star0 = 0
star1 = 7
star2 = 10


let stars = document.querySelector('.stars');
/*
@description  function to calculate the rating of the player
*/
let rating = function(moves) {
    if (moves >= star0 && moves <= star1) {

    } else if (moves > star1 && moves <= star2) {
        stars.lastElementChild.firstElementChild.classList.remove("fa-star");
        stars.lastElementChild.firstElementChild.classList.add("fa-star-o");


    } else if (moves > star2) {
        stars.lastElementChild.previousElementSibling.firstElementChild.classList.remove("fa-star");
        stars.lastElementChild.previousElementSibling.firstElementChild.classList.add("fa-star-o");

    }

}

var modal = document.getElementById('myModal');
var score = document.querySelector('.score');
/*
@description pop-up upon winning the game
*/
function popup() {
    setTimeout(function() {
        var modalRating = document.querySelector('.stars').cloneNode(true);
        var modalTimer = document.querySelector('.timer').cloneNode(true);
        document.querySelector('.star-rating').innerHTML = " "

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 

        modal.style.display = "block";

        score.innerHTML = "No of Moves: " + moves;

        document.querySelector('.star-rating').appendChild(modalRating);
        document.querySelector('.star-rating').appendChild(modalTimer);
        //console.log(document.querySelector('.star-rating').innerHTML);



        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    }, 800)
}
/*
@description function to reset the game
*/
reset = document.querySelector('.restart');
reset.addEventListener('click', function() {
    clearInterval(timeNow);
    resetStars = document.querySelectorAll('.fa-star-o');
    resetStars.forEach(function(e) {
        e.classList.remove("fa-star-o");
        e.classList.add("fa-star");
    })


    gameInit();

})
/*
@description all the functimertion calls for the main game handling
*/

const gamePlay = function() {
    cardDeck.addEventListener('click', function(event) {
        //disable click on open card and on the deck
        if ((event.target.classList.contains("show", "match")) || (event.target.firstElementChild.classList.value == "card")) {
            return true;
        }
        showCardSymbol(event);
        addOpenCardlist(event);
        addMoves();

        if (openCards.length > 1) {
            
            if (openCards[1].value == openCards[0].value) {
                cardsMatch();
                //console.log(match);
                match++;
            } else {
                cardsNotMatch();

            }

            //empty opencards for new match
            openCards = [];

            //adjust rating
            rating(moves);
        }

        if (match == cards.length / 2) {
            endgame();
        }

    });
}
/*
@description Function to click on the modal for playagain 
*/
function playAgain() {

    clearInterval(timeNow);
    resetStars = document.querySelectorAll('.fa-star-o');
    resetStars.forEach(function(e) {
        e.classList.remove("fa-star-o");
        e.classList.add("fa-star");
    })
    document.getElementById('myModal').style.display = "none";

    gameInit();

}
gameInit();