//Step2: znao za koncept "variable scope" ali ovdje svejedno nisam znao sto postavit u globalni pristup a sto u funkcijski pristup, konkretno nisam shvatio gdje bi smjestio randomChosenColor i gamePattern
//Step7: (nisam pogledo hintove) nisam znao kako odrediti da li se funkcija izvrsila. Stavi se "false" u varijablu "started" zatim se u anonimnoj key event funkciji postavi if upit
//Step8: nisam shvacao logiku currentLevela, ali onda je sinulo: "ZA USPOREDBU CURRENTLEVELA SE KORISTI ISTI INDEX KAO ARGUMENT(checkAnswer(userClickedPattern.length-1);) KOJI SE DODJELJUJE gamePattern i userClickedPattern RADI ITERACIJE ISTOG INDEXA TO JEST ZADNJE BOJE U LISTI"
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
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random(randomNumber) * 4); //nije potrebno staviti randomNumber u .random metodu jer radi bez konteksta
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
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
    checkAnswer(userClickedPattern.length-1); /* ovdje sam iz ne shvacanja logike 
    stavio "userClickedPattern.slice(0, -1)" sto nema veze s onim sto meni treba 
    a zbog toga mi dosta dugo igra nije radila *facepalm* */
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

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(nextSequence(),
            1000);
        }
    }
    else {
        playSound("wrong"); //ovdje sam stavio wrong bez navodnika sto znaci da ga je interpretirao kao argument a treba bit kao string, zato se ostatak koda dolje nije izvrsio
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart"); //pobrinut se da se prioritetnije metode stavljaju prije nekog timeouta da se naravno izbjegne narusavanje dinamike
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        }
    }

