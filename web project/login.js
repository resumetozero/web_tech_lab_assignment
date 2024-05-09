
document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");


    
    registerBtn.addEventListener("click", function() {
        const usernameInput = document.getElementById("username").value; 
        const passwordInput = document.getElementById("password").value; 

        fetch("http://127.0.0.1:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        })
        .then(response => {
            
            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert("Registration failed. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    });
    


    function displayUserData(userData) {
        const userDataDiv = document.getElementById("userData");
    
        const userList = document.createElement("ul");
        for (const item of userData) {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            userList.appendChild(listItem);
        }
        userDataDiv.appendChild(userList);
    }
    

    // Function to handle login
    loginBtn.addEventListener("click", function() {
        const usernameInput = document.getElementById("loginusername").value;
        const passwordInput = document.getElementById("loginpassword").value; 

        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        })
        .then(response => {
            if (response.ok) {
                alert("Login successful!"); 
                localStorage.setItem('loggedInUser', usernameInput); 
                window.location.href = "piano.html"; 
            } else {
                alert("Invalid username or password. Please try again."); 
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    });
});

