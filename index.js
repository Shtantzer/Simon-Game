//Step2: znao za koncept "variable scope" ali ovdje svejedno nisam znao sto postavit u globalni pristup a sto u funkcijski pristup, konkretno nisam shvatio gdje bi smjestio randomChosenColor i gamePattern
//Step7: (nisam pogledo hintove) nisam znao kako odrediti da li se funkcija izvrsila. Stavi se "false" u varijablu "started" zatim se u anonimnoj key event funkciji postavi if upit

buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;
started = false; 

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random(randomNumber) * 4); //nije potrebno staviti randomNumber u .random metodu jer radi bez konteksta
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).animate({
        opacity: 0
    }, 100)
    $("#" + randomChosenColor).animate({
        opacity: 1
    }, 100)
    playSound(randomChosenColor);
    
}

$(".btn").click(function(e) {
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);
}
