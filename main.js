var gameState = {
    words: ["tomato", "cornflower", "pineapple", "lemon"],
    currWord: "",
    guessingWord: []
}


$(document).ready(function () {

    $("#startGame").click(function () {
        // set currWord to a random string from words
        var randomIndex = Math.floor(Math.random() * gameState.words.length);
        gameState.currWord = gameState.words[randomIndex].toUpperCase();
        gameState.currWord.split('').forEach(function () {
            gameState.guessingWord.push("_")
        })

        // replace the start button with a string of _ chars with the length of currWord
        // <div id="guessingWord">_ _ _ _ _ _ _ </div>
        var guessingWordDiv = $("<div>");
        guessingWordDiv.attr("id", "guessingWord")
        guessingWordDiv.text(gameState.guessingWord.join(" "))
        $("#startGame").replaceWith(guessingWordDiv);
    });

    $(".letterButton").click(function (event) {
        var guess = event.target.textContent;

        // check if guess is in currWord
        var guessedIndexes = getGuessedIndexes(gameState.currWord, guess);
        
        guessedIndexes.forEach(function (index) {
            gameState.guessingWord[index] = guess;
        });

        $("#guessingWord").text(gameState.guessingWord.join(" "));
    })

})




function getGuessedIndexes (word, guess) {
    // set variable for bad guesses
    var badGuesses = []
    // if currWord is TOMATO
    // and guess is T
    // return [0, 4]

    // if currWord is TOMATO
    // and guess is z
    // return []

    // if currWord is TOMATO
    // and guess is A
    // return [3]
    return word.split('').reduce(function (acc, letter, i) {
        if (letter === guess) acc.push(i);
        return acc;
        else (badguesses.push(letter))
    }, [])
    
    var badGuesses = []

}


// Draw the canvas
function drawCanvas() {
    var c = canvas.getContext('2d');
    
    // reset the canvas and set basic styles
    canvas.width = canvas.width;
    c.lineWidth = 10;
    c.strokeStyle = 'green';
    c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
    c.fillStyle = 'red';
    // draw the ground
    drawLine(c, [20,190], [180,190]);
    // start building the gallows if there's been a bad guess
    if (badGuesses > 0) {
        // create the upright
        c.strokeStyle = '#A52A2A';
        drawLine(c, [30,185], [30,10]);
        if (badGuesses > 1) {
            // create the arm of the gallows
            c.lineTo(150,10);
            c.stroke();
        }
        if (badGuesses > 2) {
            c.strokeStyle = 'black';
            c.lineWidth = 3;
            // draw rope
            drawLine(c, [145,15], [145,30]);
            // draw head
            c.beginPath();
            c.moveTo(160, 45);
            c.arc(145, 45, 15, 0, (Math.PI/180)*360);
            c.stroke(); 
        }
        if (badGuesses > 3) {
            // draw body
            drawLine(c, [145,60], [145,130]);
        }
        if (badGuesses > 4) {
            // draw left arm
            drawLine(c, [145,80], [110,90]);
        }
        if (badGuesses > 5) {
            // draw right arm
            drawLine(c, [145,80], [180,90]);
        }
        if (badGuesses > 6) {
            // draw left leg
            drawLine(c, [145,130], [130,170]);
        }
        if (badGuesses > 7) {
            // draw right leg and end game
            drawLine(c, [145,130], [160,170]);
            c.fillText('Game over', 45, 110);
            // remove the alphabet pad
            letters.innerHTML = '';
            // display the correct answer
            // need to use setTimeout to prevent race condition
            setTimeout(showResult, 200);
            // increase score of lost games
            // display the score after two seconds
            // code to be added later
        }
    }
    // if the word has been guessed correctly, display message,
    // update score of games won, and then show score after 2 seconds
    if (correctGuesses == wordLength) {
        letters.innerHTML = '';
        c.fillText('You won!', 45,110);
        // increase score of won games
        // display score
        // code to be added later
    }
}