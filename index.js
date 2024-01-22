//Step2: znao za koncept "variable scope" ali ovdje svejedno nisam znao sto postavit u globalni pristup a sto u funkcijski pristup, konkretno nisam shvatio gdje bi smjestio randomChosenColor i gamePattern

buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];


function nextSequence() {
    var randomNumber = Math.floor(Math.random(randomNumber) * 4); //nije potrebno staviti randomNumber u .random metodu jer radi bez konteksta
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
}