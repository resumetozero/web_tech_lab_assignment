var currentIndex = 0;
var lettersArray;
var intervalId;


window.addEventListener('load', function() {
    const savedScript = localStorage.getItem('savedScript');
    if (savedScript) {
        updateSavedScript(savedScript);
        lettersArray = savedScript.split(""); // Split the saved script into individual characters
    }
});

function buttonAnimation(keyPressed) {
    var buttons = document.querySelectorAll(".keys p");
    buttons.forEach(function(button) {
        if (button.innerHTML === keyPressed) {
            var activeButton = button.parentNode;
            activeButton.classList.add("pressed");
            setTimeout(function() {
                activeButton.classList.remove("pressed");
            }, 100);
        }
    });
}


var numberOfKeys = document.querySelectorAll(".keys").length;
  for (var i = 0; i < numberOfKeys; i++) {
    (function(index) {
      document.querySelectorAll(".keys")[index].addEventListener("click", function() {
        var keyPressed = this.querySelector("p").innerHTML;
        buttonAnimation(keyPressed);
        makeSound(keyPressed);
      });
    })(i);
  }  


var save_button = document.getElementById("save_script");
save_button.addEventListener("click", () => {
    const values = document.getElementById("input_values").value;
    const username = localStorage.getItem('loggedInUser');
    const url = "http://127.0.0.1:5000/add_data"; // Update the URL to match your Flask application


    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            new_data: values
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse response JSON
        } else {
            throw new Error("Failed to add data."); // Throw an error if response is not OK
        }
    })
    .then(data => {
        // Check the success status from the response
        if (data.success) {
            updateSavedScript(values); 
            alert(data.message); // Show success message
        } else {
            alert("Failed to add data: " + data.message); // Show error message
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later."); // Show alert for any errors
    });
});



function makeSound(key) {
    switch (key) {
        case "z":
            var tom1 = new Audio("pianokeys/key01.mp3");
            tom1.play();
            break;
        case "s":
            var tom2 = new Audio("pianokeys/key02.mp3");
            tom2.play();
            break;
        case "x":
            var tom1 = new Audio("pianokeys/key03.mp3");
            tom1.play();
            break;
        case "d":
            var tom2 = new Audio("pianokeys/key04.mp3");
            tom2.play();
            break;
        case "c":
            var tom1 = new Audio("pianokeys/key05.mp3");
            tom1.play();
            break;
        case "f":
            var tom2 = new Audio("pianokeys/key06.mp3");
            tom2.play();
            break;
        case "v":
            var tom1 = new Audio("pianokeys/key07.mp3");
            tom1.play();
            break;
        case "g":
            var tom2 = new Audio("pianokeys/key08.mp3");
            tom2.play();
            break;
        case "b":
            var tom1 = new Audio("pianokeys/key09.mp3");
            tom1.play();
            break;
        case "h":
            var tom2 = new Audio("pianokeys/key10.mp3");
            tom2.play();
            break;
        case "n":
            var tom1 = new Audio("pianokeys/key11.mp3");
            tom1.play();
            break;
        case "j":
            var tom2 = new Audio("pianokeys/key12.mp3");
            tom2.play();
            break;
        case "m":
            var tom1 = new Audio("pianokeys/key13.mp3");
            tom1.play();
            break;
        case "k":
            var tom2 = new Audio("pianokeys/key14.mp3");
            tom2.play();
            break;
        case ",":
            var tom1 = new Audio("pianokeys/key15.mp3");
            tom1.play();
            break;
        case "l":
            var tom2 = new Audio("pianokeys/key16.mp3");
            tom2.play();
            break;
        case ".":
            var tom1 = new Audio("pianokeys/key17.mp3");
            tom1.play();
            break;
        case ";":
            var tom2 = new Audio("pianokeys/key18.mp3");
            tom2.play();
            break;
        case "/":
            var tom1 = new Audio("pianokeys/key19.mp3");
            tom1.play();
            break;
        case "'":
            var tom2 = new Audio("pianokeys/key20.mp3");
            tom2.play();
            break;
        case "q":
            var tom1 = new Audio("pianokeys/key21.mp3");
            tom1.play();
            break;
        case "2":
            var tom2 = new Audio("pianokeys/key22.mp3");
            tom2.play();
            break;
        case "w":
            var tom1 = new Audio("pianokeys/key23.mp3");
            tom1.play();
            break;
        case "3":
            var tom2 = new Audio("pianokeys/key24.mp3");
            tom2.play();
            break;
        case "e":
            var tom1 = new Audio("pianokeys/key01.mp3");
            tom1.play();
            break;
        case "4":
            var tom2 = new Audio("pianokeys/key01.mp3");
            tom2.play();
            break;
        case "r":
            var tom1 = new Audio("pianokeys/key03.mp3");
            tom1.play();
            break;
        case "5":
            var tom2 = new Audio("pianokeys/key04.mp3");
            tom2.play();
            break;
        case "t":
            var tom1 = new Audio("pianokeys/key05.mp3");
            tom1.play();
            break;
        case "6":
            var tom2 = new Audio("pianokeys/key06.mp3");
            tom2.play();
            break;
        case "y":
            var tom1 = new Audio("pianokeys/key07.mp3");
            tom1.play();
            break;
        case "7":
            var tom2 = new Audio("pianokeys/key08.mp3");
            tom2.play();
            break;
        case "u":
            var tom1 = new Audio("pianokeys/key09.mp3");
            tom1.play();
            break;
        case "8":
            var tom2 = new Audio("pianokeys/key10.mp3");
            tom2.play();
            break;
        case "i":
            var tom1 = new Audio("pianokeys/key11.mp3");
            tom1.play();
            break;
        case "9":
            var tom2 = new Audio("pianokeys/key12.mp3");
            tom2.play();
            break;
      default:
        console.log(key);
    }
  }



  function playScript() {
    intervalId = setInterval(function() {
        if (currentIndex < lettersArray.length) {
            var keyPressed = lettersArray[currentIndex];
            buttonAnimation(keyPressed);
            makeSound(keyPressed);
            currentIndex++;
        } else {
            clearInterval(intervalId);
            currentIndex = 0; // Reset currentIndex for future plays
        }
    }, 700);
}

document.getElementById("play_script").addEventListener("click", function() {
    playScript();
});


function updateSavedScript(value) {
    const savedScriptParagraph = document.getElementById("saved_script");
    savedScriptParagraph.textContent = value;
    // Store the value in localStorage
    localStorage.setItem('savedScript', value);
}






