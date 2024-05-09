//Detecting button press
var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function() {
      //What to do when click detected.
      //Which button triggered event?
      var buttonInnerHTML = this.innerHTML;
      if(buttonInnerHTML === "Tap"){
        makeSound("m");
        buttonAnimation("m");
      }else{
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
      }


      //Detecting keyboard press
      document.addEventListener("keydown", function(event) {
        makeSound(event.key);
        buttonAnimation(event.key);
      });


      function makeSound(key) {


        switch (key) {
          case "l":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
          case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
          case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
          case "k":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
          case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
          case "d":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
          case "g":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
          case "m":
            var metronom = new Audio("sounds/metronom.mp3");
            metronom.play();
            break;
          default:
            console.log(buttonInnerHTML);
        }
      }
      });
  }

function buttonAnimation(currentKey){
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function(){
      activeButton.classList.remove("pressed");
  },100);
}

document.querySelector('.metronom_button').addEventListener('click', function () {
  // Send a request to the server to start the metronome
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'start_metronome.py');
  xhr.send();
});
