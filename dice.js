// --- Logic ---

function clearDiceHighlight() {
  document.querySelectorAll(".die").forEach(d => {
    d.classList.remove("die-highlight");
  });
}


function highlightMatchingDice(dice, result) {
  const diceElems = document.querySelectorAll(".die"); 
  // --- Pair, Two Pair, Three, Four, Yahtzee ---
  if (["Pair","Two Pair","Three of a Kind","Four of a Kind","Yahtzee","Full House"].includes(result)) {
    const counts = getCounts(dice);
    const targetValue = Object.keys(counts).find(v => counts[v] > 1);

    dice.forEach((val, i) => {
      if (val == targetValue) {
        diceElems[i].classList.add("die-highlight");
      }
    });
    return;
  }

  // --- Straights (highlight all dice in the straight) ---
  if (result === "Small Straight" || result === "Large Straight") {
    diceElems.forEach(d => d.classList.add("die-highlight"));
    return;
  }
}
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
function getCounts(dice) {
  const counts = {};
  dice.forEach(d => counts[d] = (counts[d] || 0) + 1);
  return counts;
}
function evaluateHand(dice) {
  const counts = getCounts(dice);
  const values = Object.values(counts).sort((a,b) => b - a);

  const unique = Object.keys(counts).length;

  // ----- Five of a Kind -----
  if (values[0] === 5) return "Yahtzee";

  // ----- Four of a Kind -----
  if (values[0] === 4) return "Four of a Kind";

  // ----- Full House (3 + 2) -----
  if (values[0] === 3 && values[1] === 2) return "Full House";

  // ----- Three of a Kind -----
  if (values[0] === 3) return "Three of a Kind";

  // ----- Two Pair -----
  if (values[0] === 2 && values[1] === 2) return "Two Pair";

  // ----- One Pair -----
  if (values[0] === 2) return "Pair";

  // ----- Straights -----
  const sorted = [...dice].sort();
  const straight = sorted.join("");

  if (straight === "12345" || straight === "23456")
    return "Large Straight";

  // Small straight patterns
  const smalls = ["1234", "2345", "3456"];
  const uniqueSorted = [...new Set(sorted)].join("");

  if (smalls.some(s => uniqueSorted.includes(s)))
    return "Small Straight";

  // ----- Otherwise -----
  return "";
}
const handRank = {
  "None": 1,
  "Pair": 2,
  "Two Pair": 3,
  "Three of a Kind": 4,
  "Small Straight": 5,
  "Large Straight": 6,
  "Full House": 7,
  "Four of a Kind": 8,
  "Yahtzee": 9
};
function updateHandDisplay(dice) {
  const result = evaluateHand(dice);
  const box = document.getElementById("handResult");

  debugLog("RESULT=" + result);
  debugLog("HIGHLIGHT? " + (result !== ""));

  box.textContent = result === "" ? "" : result;

  clearDiceHighlight();
  if (result !== "") {
    highlightMatchingDice(dice, result);
  }
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

  const rolls = diceState.map(d => d.value);

  renderFiveDice();
  updateHandDisplay(rolls);
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