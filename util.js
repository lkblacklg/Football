// =========================
// Global Flags & State
// =========================
let DEBUG = false;
let ballOn = 35;   // internal 0–100



// =========================
// Clock / Down / Score / Ball Position
// =========================
function adjustClock(delta) {
  const clock = document.getElementById("game-clock");

  let [min, sec] = clock.textContent.split(":").map(Number);
  let total = min * 60 + sec + delta;

  // clamp range first
  if (total < 0) total = 0;
  if (total > 900) total = 900;

  // now compute minutes/seconds AFTER clamping
  const newMin = Math.floor(total / 60);
  const newSec = total % 60;

  clock.textContent =
    String(newMin).padStart(2, "0") + ":" +
    String(newSec).padStart(2, "0");
}

function adjustQD(btn, delta) {
  const prefix = btn.id.slice(0, btn.id.indexOf("-"));
  const field = document.getElementById(prefix + "Field");
  let value = Number(field.value) + delta;
  if (value < 1) value = 1;
  if (value > 4) value = 4;
  field.value = value;
}

function adjustScore(btn, delta) {
  const team = btn.closest("[data-team]").dataset.team;
  const scoreField = document.getElementById(team + "Score");

  let score = Number(scoreField.textContent) || 0;
  score = Math.max(0, score + delta);

  scoreField.textContent = score;
}

function adjustBallOn(delta) {
  let raw = parseInt(document.getElementById("ballOn").value);
  raw = Math.min(100, Math.max(0, raw + delta));

  document.getElementById("ballOn").value = raw;
}

function newQuarter() {
  // read current quarter from the input
  let q = Number(document.getElementById("quarterField").value);

  // increment but cap at 4
  q = Math.min(q + 1, 4);

  // write it back
  document.getElementById("quarterField").value = q;

  // reset down to 1
  document.getElementById("downField").value = 1;

  // reset clock to 15:00
  document.getElementById("game-clock").textContent = "15:00";
}

// =========================
// Debug
// =========================
function debugLog(msg) {
  if (!DEBUG) return;

  const out = document.getElementById("output");
  if (out) out.innerHTML += msg + "<br>";
}



// =========================
// Dice
// =========================
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}



// =========================
// Team Loading & Dropdowns
// =========================
async function init() {
  const teams = await loadTeams();

  const homeSelect = document.getElementById("homeTeamSelect");
  const awaySelect = document.getElementById("awayTeamSelect");

  populateDropdown(homeSelect, teams);
  populateDropdown(awaySelect, teams);

  // Default to Redskins vs Dallas
  homeSelect.value = "redskins";   // ← whatever ID you used in teams.json
  awaySelect.value = "cowboys";    // ← Dallas ID

  // Trigger label + logo update
  teamSelectChange(homeSelect);
  teamSelectChange(awaySelect);
  newGame();
}
function newGame() {

document.getElementById("homeLogo").src = "./redskins.gif";
document.getElementById("homeLogo").style.display = "inline-block";

  // Reset quarter and down
  document.getElementById("quarterField").value = 1;
  document.getElementById("downField").value = 1;

  // Reset clock
  document.getElementById("game-clock").textContent = "15:00";

  // Reset scores
  document.getElementById("homeScore").textContent = 0;
  document.getElementById("awayScore").textContent = 0;

  // Reset ball position
  document.getElementById("ballOn").value = 35;

  // Reset possession
  setPossession("");
}

function populateDropdown(select, teams) {
  select.innerHTML = "";
  teams.forEach(team => {
    const option = document.createElement("option");
    option.value = team.id;
    option.textContent = team.name;
    option.dataset.logo = team.logo;
    select.appendChild(option);
  });
}

async function loadTeams() {
  const response = await fetch("teams.json");
  const data = await response.json();
  return data.teams;
}



// =========================
// Possession
// =========================
function setPossession(team) {
  const home = document.getElementById("home-possession");
  const away = document.getElementById("away-possession");

  if (team === "home") {
    home.textContent = "🏈";
    away.textContent = "";
  } else {
    home.textContent = "";
    away.textContent = "🏈";
  }
}



// =========================
// Team Select Handler
// =========================
function teamSelectChange(sel) {
  const prefix = sel.id.slice(0, 4);  // "home" or "away"
  const tlabel = document.getElementById(prefix + "Label");
  const tlogo  = document.getElementById(prefix + "Logo");

  const option = sel.options[sel.selectedIndex];
  tlabel.textContent = option.textContent;

  const logo = option.dataset.logo;

  if (tlogo) {
    if (logo && logo.trim() !== "") {
      tlogo.src = "logos/" + logo;
      tlogo.style.display = "inline-block";
    } else {
      tlogo.style.display = "none";
    }
  }
}