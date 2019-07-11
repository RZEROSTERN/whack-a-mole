const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
let lastHole;
let score;
let timeUp;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    
    if(lastHole === hole) 
        return randomHole(holes);
    
    lastHole = hole;
    return lastHole;
    
}

function peep() {
    const time = randomTime(500, 1000);
    const hole = randomHole(holes);
    hole.classList.add("up");

    setTimeout(function() {
        hole.classList.remove("up");

        if(!timeUp) 
            peep();
    }, time);
}

function bonk(e) {
    if(!e.isTrusted) return; 
    score++; 
    this.parentNode.classList.remove("up");
    scoreBoard.textContent = score;
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;

    peep();

    setTimeout(() => (timeUp = true), 20000);
}

moles.forEach(mole => mole.addEventListener("click", bonk));