var greenSound, redSound, blueSound, yellowSound, errorSound;

var score = 0;
var highscore = 0;

var currentColor = "";

$(document).ready(function () {

    loadSounds();

    $('.colorbutton').addClass('pressed');
    
    
    document.getElementById('newGameButton').addEventListener("click", startGameloop);

    document.getElementById('proceedButton').disabled = true;
    

    
});

function loadSounds() {
    greenSound = new Howl({
        src: ['sounds/green.mp3','sounds/green.ogg']
    });

    redSound = new Howl({
        src: ['sounds/red.mp3','sounds/red.ogg']
    });

    blueSound = new Howl({
        src: ['sounds/blue.mp3','sounds/blue.ogg']
    });

    yellowSound = new Howl({
        src: ['sounds/yellow.mp3','sounds/yellow.ogg']
    });

    errorSound = new Howl({
        src: ['sounds/error.mp3','sounds/error.ogg']
    });
}

function startGameloop() {
    var gameRunning = true;
    var mistakesWhereMade = false;
    var sequence = ["green", "red", "yellow", "blue"];
    // var sequence = ["red"];
    // var sequence = [];
    
    // set initial score to 0
    score = 0;
    
    // start main game loop
    while (gameRunning) {
    
    // prepare sequence and play old sequence.
    disableButtons();
    // sequence = addNewColor(sequence);
    playSequence(sequence);
    
    setTimeout (function () {
        enableButtons();
    }, sequence.length * 500);
    gameRunning = false;
    }
    
    
    
}


function playSequence(sequence) {
    var toneLength = 500;
    
    for (i=0; i<sequence.length; i++) {
       switch (sequence[i]) {
           // $('#'+squence[i])
            case "red":
                setTimeout(function () {
                    $(red).removeClass('pressed');
                    // timeout for button back off
                    setTimeout(function () {
                        $(red).addClass('pressed');},toneLength);
                    redSound.play()},
                     i * toneLength);
                    
                break;
            case "green":
                setTimeout(function () {
                    $(green).removeClass('pressed');
                    // timeout for button back off
                    setTimeout(function () {
                        $(green).addClass('pressed');},toneLength);
                    greenSound.play()},
                     i * toneLength);
                break;
            case "yellow":
                setTimeout(function () {
                    $(yellow).removeClass('pressed');
                    // timeout for button back off
                    setTimeout(function () {
                        $(yellow).addClass('pressed');},toneLength);
                    yellowSound.play()},
                     i * toneLength);
                break;
            case "blue":
                setTimeout(function () {
                    $(blue).removeClass('pressed');
                    // timeout for button back off
                    setTimeout(function () {
                        $(blue).addClass('pressed');},toneLength);
                    blueSound.play()},
                     i * toneLength);
                break;
       }
    }
     
}

function handleColorClick(event, sequence, position) {
    var seq = [event.target.id];
    playSequence(seq);
}

function addNewColor(sequence) {
    var seq;
    $.ajax({
      type: "GET",
      url: "php/nextColor.php?sequence=[]",
      success: function(data, status){
         // alert("Data: " + data + " status: " + status);
         seq = JSON.parse(data);
         sequence = seq.sequence;
      }
    });
    
    // sequence.push("green");
    // alert("value is: " +$('sequence'));
    return seq;
}

function disableButtons() {
    document.getElementById('newGameButton').disabled = true;
    document.getElementById('proceedButton').disabled = true;
    var colorButtons = document.getElementsByClassName('colorbutton');
    for (i=0; i<colorButtons.length; i++) {
        colorButtons[i].removeEventListener("click", handleColorClick);
    }
}

function enableButtons() {
   // document.getElementById('newGameButton').disabled = false;
    document.getElementById('proceedButton').disabled = false;
    var colorButtons = document.getElementsByClassName('colorbutton');
    for (i=0; i<colorButtons.length; i++) {
        colorButtons[i].addEventListener("click", handleColorClick);
    }
}

function copyArray(input) {
    var copy = input.slice();
    return copy;
}
