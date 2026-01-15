// --- Logic ---
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// state: 5 dice, each with value + held
let diceState = [
  { value: 1, held: false },
  { value: 1, held: false },
  { value: 1, held: false },
  { value: 1, held: false },
  { value: 1, held: false }
];

// --- Dice Faces ---
const diceFaces = {
  1: "⚀",
  2: "⚁",
  3: "⚂",
  4: "⚃",
  5: "⚄",
  6: "⚅"
};

// roll all dice, but only change ones that aren't held
function rollAllDice() {
  diceState.forEach(die => {
    if (!die.held) {
      die.value = rollDice();
    }
  });
  renderFiveDice();
}

// toggle hold on a single die
function toggleHold(index) {
  diceState[index].held = !diceState[index].held;
  renderFiveDice();
}

// --- Render ---
function renderFiveDice() {
  const area = document.getElementById("dice-area");
  area.innerHTML = "";

  const rolls = diceState.map(d => d.value);
  debugLog(JSON.stringify(rolls));

  diceState.forEach((dieObj, index) => {
    // wrapper so we can put a dot above the die
    const wrapper = document.createElement("div");
    wrapper.classList.add("die-wrapper");
    wrapper.onclick = () => toggleHold(index);

    // dot above die (visible only when held)
    const dot = document.createElement("div");
    dot.classList.add("hold-dot");
    dot.textContent="●";
    dot.style.visibility = dieObj.held ? "visible" : "hidden";

    // actual die face
    const die = document.createElement("span");
    die.textContent = diceFaces[dieObj.value];
    die.classList.add("die");

    if (index < 2) {
      die.classList.add("die-red");     // first 2 dice
    } else {
      die.classList.add("die-white");   // last 3 dice
    }

    wrapper.appendChild(dot);
    wrapper.appendChild(die);
    area.appendChild(wrapper);
  });
}

// --- Trigger ---
function rollAndDisplay() {
  rollAllDice();
}