var model = {    //keeps track of the ships: where they are, if they've been hit or sunk
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	/*ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },   //an array/property that holds the ships location and hits
			{ locations: ["24", "34", "44"], hits: ["", "", ""] },
			{ locations: ["10", "11", "12"], hits: ["", "", ""] }],*/
	ships: [{ locations: [0, 0, 0], hits: ["", "", ""] },   
			{ locations: [0, 0, 0], hits: ["", "", ""] },
			{ locations: [0, 0, 0], hits: ["", "", ""] }],

	fire: function(guess) {   //the method accepts a guess

		for(i = 0; i < this.numShips; i++) {  //then we iterate through the array of ships, examining one ship at a time
			var ship = this.ships[i]; //here we have our hands on a ship; we need to see if the guess matches any of its loactions
			var index = ship.locations.indexOf(guess);  //searches an array for a matching value and returns its index, or -1 if it can't find it

			if (ship.hits[index] === "hit") {
				view.displayMessage("Oops, you already hit that location!");
				return true;
			}else if (index >= 0) {  //if we have an index greater than or equal to zero, the users guess is in the location's array, and we have a hit
				ship.hits[index] = "hit";
				view.displayHit(guess);  //notify to the view that we got a hit at the location guess
				view.displayMessage("Hit!");  //and then ask the view to display the message "Hit!"

				if (this.isSunk(ship)) {
					view.displayMessage("You sank my battleship!");  //let the player know that this hit sank a battleship
					this.shipsSunk++;  //if the ship is sunk, then we increase the number of ships that are sunk in model's shipSunk property
				}
				return true;
			}
		}
		view.displayMiss(guess);  //notify the view that we got a miss at the location guess
		view.displayMessage("You missed."); //and ask the view to display the message "You missed"

		return false;
	},
	isSunk: function(ship) {  //a method that takes a ship and checks every possible location for a hit
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;  //if there's a location that doesn't have a hit, then the ship is still floating, return false
			}
		}
		return true;
	},
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col= Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
};

var view = {   //displays updates with hits, misses and messages for the user
	displayMessage: function(msg) {  //this method takes a string mesage and displays it in the message area
		var messageArea = document.getElementById("messageArea"); //gets the messageArea element from html page
		messageArea.innerHTML = msg; //updates the messageAre element text by setting its innerhtml to msg
	}, 
	displayHit: function(location) {  //this method take the players guess of the location of the ship and displays hit on the board
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	}, 
	displayMiss: function(location) {  //this method take the players guess of the board thats not on a ship and displays miss on the board
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	} 
};

var controller = {  //glues everything together, including the playes input and executing the game logic
	guesses:  0,

	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;  //adds one to the guesses property
			var hit = model.fire(location);  //we pass the row and column in the form of a string to the model's fire method
			if (hit && model.shipsSunk === model.numShips) {  //if the guess was a hit and the num of ships that are sunk is = num of ships in the game, then show the player a message that they've sunk all the ships
				view.displayMessage("You sank my battleship, in " + this.guesses + " guesses");  //shows the player the total num of guesses it took to sink the ship
			}
		}
	}	
}

function parseGuess(guess) {  //a helper function
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];  //an array loaded with each letter that could be part of a valid guess

	if (guess == null || guess.length !== 2) {  //check for null and make sure the length is 2 characters
		alert("Opps, please enter a letter and a number on the board.");
	} else { 
		var firstChar = guess.charAt(0); 
		var row = alphabet.indexOf(firstChar); //then, using indexOf, we get back a number between zero and six that corresponds to the letter
		var column = guess.charAt(1);  //added code to grab the second character in the string, which represents the column

		if (isNaN(row) || isNaN(column)) { //checking to see if either of the row or column is not a number using the isNaN function
			alert("Opps, that isn't on the board.");
		} else if (row < 0 || row >= model.boardSize ||
			       column < 0 || column >= model.boardSize) {   //making sure the number is between 0 and 6 (also relying on type converstion here)
			alert("Opps, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}
function handleFireButton() {                 //this function is called whenever you click Fire!
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value.toUpperCase();
	controller.processGuess(guess);   //passing the players guess to the controller
	guessInput.value = "";           //this resets the input after the player makes a guess, so no one has to delete it after every guess
}

function handleKeyPress(e) {                 //here's the key press handler, it's called whenever you press a key in the input field in the page (the (e) is an event object to the handler about wehich key was pressed)
	var fireButton = document.getElementById("fireButton");
	e = e || window.event;
	if (e.keyCode === 13) {   //if you press RETURN/ENTER key, the events code property will be set to 13. If thats the case, then we want to cause the Fire! button to act like it was clicked
		fireButton.click();   //I do that by calling the fireButton's click method
		return false;  //and I return false so the form doesn't do anything else
	}
}



window.onload = init;    //I want this page to run init when the page is fully loaded

function init() {  //created an init fucntion
	var fireButton = document.getElementById("fireButton"); //first I get a reference to the Fire! button using the id
	fireButton.onclick = handleFireButton;                  //then I added a click handler function to the button
	var guessInput = document.getElementById("guessInput");  
	guessInput.onkeypress = handleKeyPress; //this one handles key press events from the HTML input field
	model.generateShipLocations(); 
}

