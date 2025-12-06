// Demo Player Data (სრტიქტულად ის მოთამაშეები, რაც შენ მისაწოდებლად გქონდა)
const players = [
  { name: "_BMW", tier: "HT3", points: 10 },
  { name: "Pretty", tier: "LT3", points: 6 },
  { name: "Marlow_Geo", tier: "LT3", points: 6 },
  { name: "MinTech", tier: "LT3", points: 6 },
  { name: "Red_Blu", tier: "LT4", points: 3 },
  { name: "_ItzRealUcha", tier: "HT5", points: 2 },
  { name: "WhiteBlack", tier: "HT5", points: 2 },
  { name: "zangi777", tier: "HT5", points: 2 },
  { name: "DreamStanXO", tier: "LT5", points: 1 },
  { name: "Datasha", tier: "LT5", points: 1 },
];

// Load Minecraft Skin from Crafty.gg
function getSkinURL(username, size = 150) {
  // crafty.gg 3d bust renderer (as you used before)
  return `https://render.crafty.gg/3d/bust/${encodeURIComponent(
    username
  )}?size=${size}`;
}

// Render leaderboard (sorted by points desc)
const lbList = document.getElementById("lbList");

function renderLeaderboard() {
  // copy + sort (desc)
  const sorted = [...players].sort((a, b) => b.points - a.points);
  lbList.innerHTML = sorted
    .map((p, i) => {
      // create a simple tier circle label
      return `
      <div class="lb-row" data-player="${p.name}">
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="rank-badge">${i + 1}.</div>
        </div>

        <div class="player">
          <img class="lb-skin" src="${getSkinURL(p.name, 160)}" alt="${
        p.name
      } skin" />
          <div class="player-meta">
            <div class="player-name">${p.name}</div>
            <div class="player-sub">Points: <strong>${
              p.points
            } pts</strong></div>
          </div>
        </div>

        <div style="display:flex;justify-content:flex-end;">
          <div class="tier-badge" title="Tier: ${p.tier}">
            <span class="tier-circle">${p.tier.replace(
              /[^A-Za-z0-9]/g,
              ""
            )}</span>
            <span style="opacity:0.9; margin-left:6px;">${p.tier}</span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

renderLeaderboard();

// Search System (only searches among players array)
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    searchResults.innerHTML =
      "<p style='color:var(--muted)'>Please type a player name...</p>";
    return;
  }

  const result = players.find((p) => p.name.toLowerCase() === query);
  if (!result) {
    searchResults.innerHTML = `<div class="player-card"><p style="color:var(--muted)">No player found...</p></div>`;
    return;
  }

  // build SVG trophy icon + tier below as requested
  const svgTrophy = `
    <svg width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="6" rx="1.5" fill="#2b2f36"/>
      <path d="M7 9c0 .88.39 1.67 1 2.22V13h8v-1.78c.61-.55 1-1.34 1-2.22V6H7v3z" fill="#f5d06a"/>
      <path d="M9 14h6v2H9z" fill="#d9b34b"/>
      <path d="M10 16h4v2h-4z" fill="#caa741"/>
    </svg>
  `;

  searchResults.innerHTML = `
    <div class="player-card">
      <img src="${getSkinURL(result.name, 200)}" class="skin-img" alt="${
    result.name
  } skin" />
      <div style="display:flex;flex-direction:column;">
        <h2 style="margin:0 0 6px 0;">${result.name}</h2>
        <div style="display:flex;align-items:center;gap:12px;">
          <div class="tier-icon">${svgTrophy}</div>
          <div>
            <p class="tier-text">Tier: <strong>${result.tier}</strong></p>
            <p style="margin:6px 0 0 0; color:var(--muted)">Points: ${
              result.points
            }</p>
          </div>
        </div>
      </div>
    </div>
  `;
});
