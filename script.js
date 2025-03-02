// Get DOM elements
const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".result"),
    optionImages = document.querySelectorAll(".option_image"),
    userNameInput = document.querySelector("#user-name"),
    enterNameBtn = document.querySelector("#enter-name-btn"),
    userScoreLabel = document.querySelector("#user-score-label"),
    cpuScoreLabel = document.querySelector("#cpu-score-label");

let userScore = 0;
let cpuScore = 0;
let userName = "";

// Event listener for entering name
enterNameBtn.addEventListener("click", () => {
    userName = userNameInput.value.trim();
    if (userName !== "") {
        // Hide the name input area after entering name
        document.querySelector(".player-info").style.display = "none";
    } else {
        alert("Please enter your name!");
    }
});

// Loop through each option image element
optionImages.forEach((image, index) => {
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        // Reset images before the round
        userResult.src = cpuResult.src = "images/rock.png";
        result.textContent = "Wait...";

        // Deactivate other options
        optionImages.forEach((image2, index2) => {
            if (index !== index2) image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

        // Set timeout to delay result calculation
        let time = setTimeout(() => {
            gameContainer.classList.remove("start");

            // Get the source of the clicked option
            let imageSrc = e.target.querySelector("img").src;
            userResult.src = imageSrc;

            // Generate a random number for CPU choice
            let randomNumber = Math.floor(Math.random() * 3);
            let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
            cpuResult.src = cpuImages[randomNumber];

            // Assign values to the choices
            let cpuValue = ["R", "P", "S"][randomNumber];
            let userValue = ["R", "P", "S"][index];

            // Outcome options
            let outcomes = {
                RR: "Draw",
                RP: "Cpu",
                RS: "User",
                PP: "Draw",
                PR: "User",
                PS: "Cpu",
                SS: "Draw",
                SR: "Cpu",
                SP: "User",
            };

            let outComeValue = outcomes[userValue + cpuValue];

            // Display outcome message
            result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;

            // Update scores
            if (outComeValue === "User") {
                userScore++;
                userScoreLabel.textContent = `${userName}'s Score: ${userScore}`;
            } else if (outComeValue === "Cpu") {
                cpuScore++;
                cpuScoreLabel.textContent = `CPU's Score: ${cpuScore}`;
            }
        }, 1500);
    });
});
