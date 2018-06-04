var greenSound, redSound, blueSound, yellowSound, errorSound;

var score;
var highscore = 0;

var currentArray = [];   //das aktuelle Array von nextColor.php
var counter = 0;    //zählt Anzahl der eingaben pro Runde ab für checkArray()

$(document).ready(function () {

    loadSounds();

    $('.colorbutton').addClass('pressed');     //"Aus" Status
    $('#newGameButton').click(function(){     //nach dem drücken der Starttaste: "An" Status
    $('.colorbutton').removeClass('pressed');
    });

    document.getElementById('newGameButton').addEventListener("click", function(){    //Beim Klicken von "neues Spiel" wird der Score zurückgesetzt
      score = 0;                                                                      //das Array geleert für ein neues Spiel und das Spiel neugestartet
      updateScore();
      currentArray = [];
      startGameloop(currentArray);
    });

    document.getElementById('proceedButton').disabled = true;         // Abschalten des "Weiter" Buttons
    document.getElementById('proceedButton').addEventListener("click", function(){
      score++;                        //Beim "weiter" Klicken wird der Score erhöht und geupdatet sowie eine neue Spielrunde gestartet
      updateScore();
      startGameloop(currentArray);
    });

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


function startGameloop(seq) {      //mit dieser Funktion werden die Farben JSON codiert und die Buttons für die Dauer des Abspielens abgeschaltet
    var sequence = seq;

    sequence = JSON.stringify(sequence);
    addNewColor(sequence);         //schicken des JSON codierten Arrays zum AJAX Get Befehl

    disableButtons();

    setTimeout (function () {
        enableButtons();
    }, currentArray.length * 500 );

}

function updateScore(){            //erhört den Score und passt gegebenenfalls den Highscore an
  if(score > highscore){
    highscore = score;
  }
  document.getElementById('score').innerHTML = score;
  document.getElementById('highscore').innerHTML = highscore;
}

function checkArray(sequence){        //überprüft nach Aufruf mit Array aus Farbfolgen, ob die gedrückten Tasten
                                        //der Reihenfolge der Farben im Array übereinstimmt
  switch (sequence[0]) {                // unterteilung in Fälle bzw. in jeweilige Farben
    case "red":
      if (currentArray[counter] == "red"){    //wenn die geklickte Farbe mit der Farbe des Arrays übereinstimmt
              counter++;                      //wird die Laufvariable erhöht
              if (counter == currentArray.length) {     //wurde die Farbabfolge erfolgreich eingegeben
                counter = 0;                            //wird die Laufvariable zurückgesetzt und die Buttons deaktiviert
                disableButtons();
                document.getElementById('proceedButton').disabled = false;
              }
            } else {              //bei falscher Eingabe werden die Buttons deaktiviert und ein Fehrlerton gespielt
              disableButtons()      // sowie die Laufvariable zurückgesetzt
              counter = 0;
              setTimeout(function() {
                 $('.colorbutton').addClass('pressed');
               }, 600);
              setTimeout(function() {
                 errorSound.play();
               }, 200);
              document.getElementById('newGameButton').disabled = false;
            }
            break;
          case "green":
            if (currentArray[counter] == "green"){
                counter++;
                if (counter == currentArray.length) {
                  counter = 0;
                  disableButtons();
                  document.getElementById('proceedButton').disabled = false;
                }
            } else {
              disableButtons()
                counter = 0;
                setTimeout(function() {
                   $('.colorbutton').addClass('pressed');
                 }, 600);
              setTimeout(function() {
                 errorSound.play();
               }, 200);
            document.getElementById('newGameButton').disabled = false;
          }
            break;
          case "yellow":
           if (currentArray[counter] == "yellow"){
              counter++;
              if (counter == currentArray.length) {
                counter = 0;
                disableButtons();
                document.getElementById('proceedButton').disabled = false;
                }
            } else {
              disableButtons();
              counter = 0;
              setTimeout(function() {
                 $('.colorbutton').addClass('pressed');
               }, 600);
            setTimeout(function() {
               errorSound.play();
             }, 200);
            document.getElementById('newGameButton').disabled = false;
          }
            break;
          case "blue":
            if (currentArray[counter] == "blue"){
                counter++;
                if (counter == currentArray.length) {
                  counter = 0;
                  disableButtons();
                  document.getElementById('proceedButton').disabled = false;
                }
            } else {
              disableButtons();
              counter = 0;
              setTimeout(function() {
                 $('.colorbutton').addClass('pressed');
               }, 600);
              setTimeout(function() {
                 errorSound.play();
               }, 200);
            document.getElementById('newGameButton').disabled = false;
          }
            break;
     }
}


function playSequence(sequence) {         //diese Funktion spielt Farbsequenzen und einzelne Farben ab
    var toneLength = 500;
    for (i=0; i<sequence.length; i++) {       //ein Array mit Farbsequenzen wird durchlaufen
       switch (sequence[i]) {         //verschiedene Farbfälle
            case "red":
                setTimeout(function () {
                    $(red).addClass('pressed');     //es wird zunächst eine Farbe als gedrückt markiert
                    setTimeout(function () {
                        $(red).removeClass('pressed');},450);     //dann wird die Farbe wieder normal angezeigt
                    redSound.play()},       //während die Farbe als gedrückt angezeigt wird, wird auch der entsprechende Ton abgespielt
                     i * toneLength);

                break;
            case "green":
                setTimeout(function () {
                    $(green).addClass('pressed');
                    setTimeout(function () {
                        $(green).removeClass('pressed');},450);
                    greenSound.play()},
                     i * toneLength);
                break;
            case "yellow":
                setTimeout(function () {
                    $(yellow).addClass('pressed');
                    setTimeout(function () {
                        $(yellow).removeClass('pressed');},450);
                    yellowSound.play()},
                     i * toneLength);
                break;
            case "blue":
                setTimeout(function () {
                    $(blue).addClass('pressed');
                    setTimeout(function () {
                        $(blue).removeClass('pressed');},450);
                    blueSound.play()},
                     i * toneLength);
                break;
       }
    }

}

function handleColorClick(event, sequence, position) {    //verschickt Buttoncklicks zu den jeweiligen Funktionen
    var seq = [event.target.id];
    playSequence(seq);
    checkArray(seq);
}

function addNewColor(sequence) {     //Hier wird ein Array zum php script geschickt und ein Array als antwort empfangen
    var seq;
    $.ajax({
      type: 'GET',
      url: 'php/nextColor.php',
      data: {sequence: sequence},    //Das Array was in die php Datei gehört muss "sequence" heißen
      dataType: 'JSON',
      success: function(data, status){    //Bei erfolgreichem senden wird ein Array empfangen
         seq = data;
         playSequence(seq.sequence);  //schicken zum abspielen des neuen Arrays
         currentArray = seq.sequence; //speichern des Arrays in einer Globalen Variable
      },
      error: function(jqXHR, textStatus){   //Wenn das verschicken fehlerhaft war wird dies angezeigt
        alert('Request failed: ' + textStatus);
      }
    });
}

function disableButtons() {       //alle Buttons werden deaktiviert
    document.getElementById('newGameButton').disabled = true;
    document.getElementById('proceedButton').disabled = true;
    var colorButtons = document.getElementsByClassName('colorbutton');
    for (i=0; i<colorButtons.length; i++) {
        colorButtons[i].removeEventListener("click", handleColorClick);
    }
}

function enableButtons() {    //Farbbuttons werden aktiviert
    var colorButtons = document.getElementsByClassName('colorbutton');
    for (i=0; i<colorButtons.length; i++) {
        colorButtons[i].addEventListener("click", handleColorClick);
    }
}

function copyArray(input) {   //wurde nicht benutzt
    var copy = input.slice();
    return copy;
}

