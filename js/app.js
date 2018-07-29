
let cards = ['diamond','diamond','paper-plane-o','paper-plane-o','anchor','anchor','bolt','bolt','cube','cube','bomb','bomb', 'leaf', 'leaf','bicycle','bicycle']

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let moves = 0, match = 0;  second = 0;  opencards = []; nowTime =0; timeflag = false;

let carddeck = document.querySelector('.deck');
//game start
let start = function(){

	let fragment = document.createDocumentFragment();
	cards = shuffle(cards);
	carddeck.innerHTML = " ";
	moves = 0
	document.querySelector('.moves').innerHTML =  moves;

	cards.forEach(function(e){
 	li = document.createElement('li');
 	li.classList.add("card");
 	li.innerHTML = '<i class="fa fa-'+e+'"></i>';
 	fragment.appendChild(li);
 	});

	carddeck.appendChild(fragment);

	//card full functioning
	cardgame();


	resetTimer(nowTime);
	second = 0;
	document.querySelector('.timer').innerHTML = second;
	//initTime();


}


//increment the the number of moves
let addmove = function(){
	moves++;
	document.querySelector('.moves').innerHTML =  moves;
	
}


//reset the game
reset = document.querySelector('.restart');
reset.addEventListener('click', function(){
	//console.log('reset');
	stars = document.querySelectorAll('.fa-star-o');
	stars.forEach(function(e){
		e.classList.remove("fa-star-o");
		e.classList.add("fa-star");
	})
	start();
})


let cardgame = function(){
	

	carddeck.addEventListener('click', function(e){
		
	if(e.target.classList.contains("show","match")){
			return true;
		}

		let cardcontent = e.target.firstElementChild.classList;
		e.target.classList.add("open","show");
		opencards.push(cardcontent);

		if(opencards.length > 1){
			if(cardcontent.value == opencards[0].value){
				open = document.querySelectorAll('.open');
				open.forEach(function(e){
					e.classList.add("match");
				});
				match++;
			}
			else{
				open = document.querySelectorAll('.open');
				setTimeout(function(){
					open.forEach(function(e){
						e.classList.remove("open", "show");
					})
				}, 450);
			}
			
			opencards = []
			addmove();
			rating(moves);

		}

		//game finished
		if(match == cards.length/2){
			setTimeout(function(){
				alert('done');

			},2000)
		}
	});
}

function initTime(){
	nowTime = setInterval(function(){
		second++;
		document.querySelector('.timer').innerHTML = second;
	},1000);
}

function resetTimer(timer){
	if(timer){
		clearInterval(timer);
	}
}


star0 = 0
star1 = 7
star2 = 5

let rating = function(moves){
	stars = document.querySelector('.stars');
	//console.log(stars);
	if(star0 >=0 && moves <= star1){

	}else if(star1 > 5 && star2 <= 7 ){
		stars.lastElementChild.firstElementChild.classList.remove("fa-star");
		stars.lastElementChild.firstElementChild.classList.add("fa-star-o");


	}else if(star2 > 7){
	stars.lastElementChild.previousElementSibling.firstElementChild.classList.remove("fa-star");
	stars.lastElementChild.previousElementSibling.firstElementChild.classList.add("fa-star-o");

	}

}

//begin
start();
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