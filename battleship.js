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
var model = {    //keeps track of the ships: where they are, if they've been hit or sunk
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },   //an array/property that holds the ships location and hits
			{ locations: ["24", "34", "44"], hits: ["", "", ""] },
			{ locations: ["10", "11", "12"], hits: ["", "", ""] }],

	fire: function(guess) {   //the method accepts a guess

		for(i = 0; i < this.numShips; i++) {  //then we iterate through the array of ships, examining one ship at a time
			var ship = this.ships[i]; //here we have our hands on a ship; we need to see if the guess matches any of its loactions
		    locations = ship.locations;  //we've accessed the ship's set of locations 
			var index = locations.indexOf(guess);  //searches an array for a matching value and returns its index, or -1 if it can't find it
			if (index >= 0) {  //if we have an index greater than or equal to zero, the users guess is in the location's array, and we have a hit

			}


		}
	}
};
    
var controller = {  //glues everything together, including the playes input and executing the game logic

}
