/*------------------- GLOBAL VARIABLES -------------------*/
var playerScore = 0;
var computerScore = 0;
var gameMode = ""; // "classic" or "wildlife"
var classicChoices = ['🪨', '📄', '✂️'];
var wildlifeChoices = ['🐍', '🧸', '🦅', '🦟', '🤺'];

/*------------------- SELECT ELEMENTS -------------------*/
var classicButton = document.querySelector(".classic-button");
var wildlifeButton = document.querySelector(".wildlife-button");
var gameOptions = document.querySelector(".game-options");
var resultSection = document.querySelector(".result-section");
var humanScore = document.getElementById("human-score");
var computerScoreDisplay = document.getElementById("computer-score");
var resultText = document.getElementById("result-text");
var playAgainButton = document.getElementById("play-again");
var homeButton = document.getElementById("home");
var classicButtonsContainer = document.getElementById("classic-game");
var wildlifeButtonsContainer = document.getElementById("wildlife-game");

/*------------------- EVENT LISTENERS -------------------*/
classicButton.addEventListener("click", function () {
  startGame("classic");
});

wildlifeButton.addEventListener("click", function () {
  startGame("wildlife");
});

document.querySelectorAll(".emoji-button").forEach(button => {
  button.addEventListener("click", function () {
    playRound(button.textContent);
  });
});

playAgainButton.addEventListener("click", restartGame);
homeButton.addEventListener("click", function () {
  location.reload();
});

/*------------------- FUNCTIONS -------------------*/

function startGame(mode) {
  gameMode = mode;
  document.querySelector(".choose-game").style.display = "none";
  gameOptions.style.display = "flex"; 

  if (mode === "classic") {
    classicButtonsContainer.style.display = "flex";
    wildlifeButtonsContainer.style.display = "none";
  } else {
    classicButtonsContainer.style.display = "none";
    wildlifeButtonsContainer.style.display = "flex";
  }
}

function playRound(playerChoice) {
  var choices = gameMode === "classic" ? classicChoices : wildlifeChoices;
  var computerChoice = choices[getRandomIndex(choices)];
  var result = getWinner(playerChoice, computerChoice);

  if (result === "win") playerScore++;
  if (result === "lose") computerScore++;

  updateScore(playerChoice, computerChoice, result);
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getWinner(player, computer) {
  if (player === computer) return "draw";

  var winningRules = {
    classic: { "🪨": "✂️", "📄": "🪨", "✂️": "📄" },
    wildlife: {
      "🐍": ["🧸", "🦟"], "🧸": ["🤺", "🦅"], "🦅": ["🦟", "🐍"],
      "🦟": ["🧸", "🤺"], "🤺": ["🦅", "🐍"]
    }
  };

  var rules = winningRules[gameMode];

  if (Array.isArray(rules[player])) {
    return rules[player].includes(computer) ? "win" : "lose";
  }
  return rules[player] === computer ? "win" : "lose";
}

function updateScore(playerChoice, computerChoice, result) {
  humanScore.innerText = `Wins: ${playerScore}`;
  computerScoreDisplay.innerText = `Wins: ${computerScore}`;

  resultText.innerHTML = `
    <p>You chose ${playerChoice}, Computer chose ${computerChoice}.</p>
    <h2>${result.toUpperCase()}!</h2>
  `;

  gameOptions.style.display = "none"; 
  resultSection.style.display = "flex"; 
}

function restartGame() {
  gameOptions.style.display = "flex";
  resultSection.style.display = "none";
}
