const cards = document.querySelectorAll(".card");

function flipCard() {
  this.classList.toggle("flip");
}

cards.forEach((card) => card.addEventListener("click", flipCard));
let flippedCards = [];
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (flippedCards.length < 2 || flippedCards.includes(this)) {
    this.classList.toggle("flip");
    flippedCards.push(this);
  }

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkForMatch, 1000);
  }
}

function checkForMatch() {
    console.log(this.classList);
  const [firstCard, secondCard] = flippedCards;

  const firstImage = firstCard.querySelector("img").src;
  const secondImage = secondCard.querySelector("img").src;

  if (firstImage === secondImage) {
    disableCards();
    checkIfComplete();
  } else {
    unflipCards();
  }
}

function disableCards() {
  flippedCards.forEach(card => {
    card.removeEventListener("click", flipCard);
  });
  resetBoard();
}

function unflipCards() {
  flippedCards.forEach(card => {
    card.classList.remove("flip");
  });
  resetBoard();
}

function resetBoard() {
  [lockBoard, flippedCards] = [false, []];
}

function checkIfComplete() {
    let isComplete = true;
    cards.forEach(card => {
        if(!card.classList.contains("flip")) {
            isComplete = false;
        }
    })

    if(isComplete) {
        const congratulations = document.getElementById("congratulations");
        congratulations.style.visibility = "visible";
        const header = document.querySelector(".header");
        header.style.filter = "blur(15px)";
        const cardContainer = document.querySelector(".container");
        cardContainer.style.filter = "blur(15px)";
    }
}

cards.forEach(card => card.addEventListener("click", flipCard));