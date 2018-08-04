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


let carddeck = document.querySelector('.deck');
let fragment = document.createDocumentFragment();
let movescount = document.querySelector('.moves');
let starslist = document.querySelectorAll('.stars li');
let timer = document.querySelector('.timer');

let moves = 0,
    match = 0,
    opencards = [];

const gameinit = function() {

    moves = 0, match = 0;
    opencards = [];
    //shuffle the cards
    cards = shuffle(cards);
    //empty the deck
    carddeck.innerHTML = " ";

    //add the cards to the the virtual DOM
    cards.forEach(function(e) {
        li = document.createElement('li');
        li.classList.add("card");
        li.innerHTML = '<i class="fa fa-' + e + '"></i>';
        fragment.appendChild(li);
    });

    //add the fragment to the deck
    carddeck.appendChild(fragment);

    moves = 0;
    movescount.innerHTML = moves;

    
    //timer
    second = 0;
    minute = 0;
    hour = 0;
   
    timer.innerHTML = "0:0:0";
    // clearInterval(timeNow);


    gameplay();

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

//function to display card's symbol
function show_card_symbol(event) {
    //console.log("show_card_symbol");
    event.target.classList.add("show", "open");

}
//add card content to the list of open cards


function add_open_cardlist(event) {
   // console.log("add_open_cardlist");
    let clicked_card_content = event.target.firstElementChild.classList;
    //console.log(clicked_card_content);
    opencards.push(clicked_card_content);
    return clicked_card_content;

}

//check whether the cards are opencards array match
function cards_match() {
    //console.log("check_card_match");
    open = document.querySelectorAll('.open');
    open.forEach(function(e) {
        e.classList.add("match");
    });

    return true;

}
//if cards do not match 
function cards_not_match() {
   // console.log("cards_not_match");
    open = document.querySelectorAll('.open');
    setTimeout(function() {
        open.forEach(function(e) {
            e.classList.remove("open", "show");
        })
    }, 450);
}

//count the number of moves
function addmoves() {
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
//if all the cards match then end this game
function endgame() {
    //console.log("endgame");
    clearInterval(timeNow);
    // console.log(timer.innerHTML);
    popup();
}
//timer setup
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


//function to calculate the rating of the player
let stars = document.querySelector('.stars');

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

//pop-up upon winning the game
var modal = document.getElementById('myModal');
var score = document.querySelector('.score');

function popup() {
    setTimeout(function() {
        var modalrating = document.querySelector('.stars').cloneNode(true);
        document.querySelector('.star-rating').innerHTML = " "

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // When the user clicks on the button, open the modal 

        modal.style.display = "block";

        score.innerHTML = "No of Moves: " + moves;

        document.querySelector('.star-rating').appendChild(modalrating);
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
//function to reset the game
reset = document.querySelector('.restart');
reset.addEventListener('click', function(){
    clearInterval(timeNow);
    resetstars = document.querySelectorAll('.fa-star-o');
    resetstars.forEach(function(e) {
        e.classList.remove("fa-star-o");
        e.classList.add("fa-star");
    })


    gameinit();

})


//all the function calls for hte main game handling
const gameplay = function() {
    carddeck.addEventListener('click', function(event) {
        //disable click on open card and on the deck
        if ((event.target.classList.contains("show", "match")) || (event.target.firstElementChild.classList.value == "card")) {
            return true;
        }
        show_card_symbol(event);
        addmoves();

        add_open_cardlist(event);


        if (opencards.length > 1) {
            if (opencards[1].value == opencards[0].value) {
                cards_match();
                console.log(match);
                match++;
            } else {
                cards_not_match();

            }

            //empty opencards for new match
            opencards = [];

            //adjust rating
            rating(moves);
        }

        if (match == cards.length / 2) {
            endgame();
        }

    });
}

function playAgain(){

    clearInterval(timeNow);
    resetstars = document.querySelectorAll('.fa-star-o');
    resetstars.forEach(function(e) {
        e.classList.remove("fa-star-o");
        e.classList.add("fa-star");
    })
    document.getElementById('myModal').style.display = "none";
    
    gameinit();

}
gameinit();