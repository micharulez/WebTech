var greenSound, redSound, blueSound, yellowSound, errorSound;

var score = 0;
var highscore = 0;

var currentArray

$(document).ready(function () {

    loadSounds();

    $('.colorbutton').addClass('pressed');


    document.getElementById('newGameButton').addEventListener("click", startGameloop);

    document.getElementById('proceedButton').disabled = true;
    document.getElementById('proceedButton').addEventListener("click", startGameloop);

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
    //var sequence = ["green", "red", "yellow", "blue", "green", "red", "blue"];
    //var sequence = ["red"];
    var sequence = [];

    sequence = JSON.stringify(sequence);
    addNewColor(sequence);
    // set initial score to 0
    score = 0;

    // start main game loop
    while (gameRunning) {

    // prepare sequence and play old sequence.
    disableButtons();

    setTimeout (function () {           //hier funktioniert was nicht: die Zeit passt nicht
        enableButtons();
    }, sequence.length * 140 );
    gameRunning = false;
    }
}

function checkArray(sequence){
      alert("check startet");
  for (i=0; i<currentArray.length;i++) {
        alert("das currentarray:    " + currentArray[i]);
     switch (sequence[0]) {
          case "red":
               alert("case red:   " + sequence[i]);
            if (currentArray[i] = "red"){
             continue
            } else {
              alert("error")
              errorSound.play();
              document.getElementById('proceedButton').disabled = true;
              document.getElementById('newGameButton').disabled = false;
            }
            break;
          case "green":
                alert("case green:   " + sequence[i]);
            if (currentArray[i] = "green"){
              continue
            } else {
              alert("error")
            errorSound.play();
            document.getElementById('proceedButton').disabled = true;
            document.getElementById('newGameButton').disabled = false;
          }
            break;
          case "yellow":
                alert("case yellow:   " + sequence[i]);
            if (currentArray[i] = "yellow"){
              continue
            } else {
              alert("error")
            errorSound.play();
            document.getElementById('proceedButton').disabled = true;
            document.getElementById('newGameButton').disabled = false;
          }
            break;
          case "blue":
                alert("case blue:   " + sequence[i]);
            if (currentArray[i] = "blue"){
              continue
            } else {
              alert("error")
            errorSound.play();
            document.getElementById('proceedButton').disabled = true;
            document.getElementById('newGameButton').disabled = false;
          }
            break;
     }
  }
}


function playSequence(sequence) {
    var toneLength = 500;
    currentArray = sequence;
    for (i=0; i<sequence.length; i++) {
       switch (sequence[i]) {
           // $('#'+squence[i])
            case "red":
                setTimeout(function () {
                    $(red).removeClass('pressed');
                    // timeout for button back off
                    setTimeout(function () {
                        $(red).addClass('pressed');},450);
                    redSound.play()},
                     i * toneLength);

                break;
            case "green":
                setTimeout(function () {
                    $(green).removeClass('pressed');
                    // timeout for button back off
                    setTimeout(function () {
                        $(green).addClass('pressed');},450);
                    greenSound.play()},
                     i * toneLength);
                break;
            case "yellow":
                setTimeout(function () {
                    $(yellow).removeClass('pressed');
                    // timeout for button back off
                    setTimeout(function () {
                        $(yellow).addClass('pressed');},450);
                    yellowSound.play()},
                     i * toneLength);
                break;
            case "blue":
                setTimeout(function () {
                    $(blue).removeClass('pressed');
                    // timeout for button back off
                    setTimeout(function () {
                        $(blue).addClass('pressed');},450);
                    blueSound.play()},
                     i * toneLength);
                break;
       }
    }

}

function handleColorClick(event, sequence, position) {
    var seq = [event.target.id];
    playSequence(seq);
    checkArray(seq);
}

function addNewColor(sequence) {
    var seq;
    $.ajax({
      type: 'GET',
      url: 'php/nextColor.php',
      data: {sequence: sequence},
      dataType: 'JSON',
      success: function(data, status){
         seq = data;
         playSequence(["red", "red"]);
      },
      error: function(jqXHR, textStatus){
        alert('Request failed: ' + textStatus);
      }
    });
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
    var colorButtons = document.getElementsByClassName('colorbutton');
    for (i=0; i<colorButtons.length; i++) {
        colorButtons[i].addEventListener("click", handleColorClick);
    }
}

function copyArray(input) {
    var copy = input.slice();
    return copy;
}

// TODO: Prüfen ob sequence korrekt, wenn nicht Fehlerton;; Score implementieren

