//Step2: znao za koncept "variable scope" ali ovdje svejedno nisam znao sto postavit u globalni pristup a sto u funkcijski pristup, konkretno nisam shvatio gdje bi smjestio randomChosenColor i gamePattern
//Step7: (nisam pogledo hintove) nisam znao kako odrediti da li se funkcija izvrsila. Stavi se "false" u varijablu "started" zatim se u anonimnoj key event funkciji postavi if upit
//Step8: nisam shvacao logiku currentLevela, ali onda je sinulo: "ZA USPOREDBU CURRENTLEVELA SE KORISTI ISTI INDEX KAO ARGUMENT(checkAnswer(userClickedPattern.length-1);) KOJI SE DODJELJUJE gamePattern i userClickedPattern RADI ITERACIJE ISTOG INDEXA TO JEST ZADNJE BOJE U LISTI"
buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;
started = false; 

$("#start-game").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
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
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    
}

$(".btn").click(function(e) {
    var userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1); /* ovdje sam iz ne shvacanja logike 
    stavio "userClickedPattern.slice(0, -1)" sto nema veze s onim sto meni treba 
    a zbog toga mi dosta dugo igra nije radila *facepalm* */
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
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
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {nextSequence()}, 500);
        }
    }
    else {
        playSound("wrong"); //ovdje sam stavio wrong bez navodnika sto znaci da ga je interpretirao kao argument a treba bit kao string, zato se ostatak koda dolje nije izvrsio
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press ").append("<span id='start-game'>HERE</span>").append(" to restart");
        
        //$("#level-title").text("Game Over, Press Any Key to Restart"); //pobrinut se da se prioritetnije metode stavljaju prije nekog timeouta da se naravno izbjegne narusavanje dinamike
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("#start-game").click(function() { // ne razumijem zasto je click event potreban ak se sa keypress eventom sve lijepo automatski aktiviralo 
            startOver();
        });
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $("#level-title").text("Level " + level);
    nextSequence();
    // takoder ne razumijem zasto sam morao dodat ove dvije linije ako sam samo promijenio vrstu listenera, u desktop verziji samo imao startOver u else-u a startOver funkcija se 
    //sastojala od level = 0; gamePattern = []; i started = false; Kada bi pritisnuo tipku, igra bi sama generirala uzorak to jest zapocela novu igru
}

