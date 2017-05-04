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
    }, [])
    
}