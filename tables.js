// --------------------
// TABLE DATA
// --------------------

const table1to3 = [
  { hand: "0", points: "0" },
  { hand: "Pair", points: "10" },
  { hand: "Two Pair", points: "20" },
  { hand: "Three of a Kind", points: "25" },
  { hand: "Small Straight", points: "30" },
  { hand: "Full House", points: "40" },
  { hand: "Large Straight", points: "50" },
  { hand: "Four of a Kind", points: "60" },
  { hand: "Five of a Kind", points: "Touchdown" }
];

const table4thDown = [
  { hand: "0", points: "0" },
  { hand: "Pair", points: "5" },
  { hand: "Two Pair", points: "10" },
  { hand: "Three of a Kind", points: "12" },
  { hand: "Small Straight", points: "15" },
  { hand: "Full House", points: "20" },
  { hand: "Large Straight", points: "25" },
  { hand: "Four of a Kind", points: "30" },
  { hand: "Five of a Kind", points: "Touchdown" }
];

// --------------------
// RENDER FUNCTION
// --------------------

function renderTable(data, containerId) {
  const container = document.getElementById(containerId);

  let html = `
    <table class="ref-table">
      <tr><th>Hand</th><th>Points</th></tr>
  `;

  data.forEach(row => {
    html += `<tr><td>${row.hand}</td><td>${row.points}</td></tr>`;
  });

  html += `</table>`;

  container.innerHTML = html;
}

// --------------------
// RENDER CALLS
// --------------------

renderTable(table1to3, "table-a-content");
renderTable(table4thDown, "table-b-content");