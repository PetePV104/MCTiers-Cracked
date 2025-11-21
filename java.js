// ======================================================================
// REAL DATA — Replace with your own players
// ======================================================================
// Demo data structure:

const demoData = {
  1: [{ name: "", score: 60, matches: 3, tier: 1 }],

  2: [{ name: "", score: 40, matches: 3, tier: 2 }],

  3: [{ name: "", score: 10, matches: 3, tier: 3 }],

  4: [
    { name: "Marlow_Geo", score: 4, matches: 3, tier: 4 },
    { name: "Red_Blu", score: 3, matches: 3, tier: 4 },
  ],

  5: [
    { name: "_ItzRealUcha", score: 2, matches: 3, tier: 5 },
    { name: "WhiteBlack", score: 2, matches: 3, tier: 5 },
    { name: "Datasha", score: 1, matches: 3, tier: 5 },
    { name: "DreamStanXO", score: 1, matches: 3, tier: 5 },
  ],
};

// Sort all data (descending scores)
Object.keys(demoData).forEach((t) => {
  demoData[t].sort((a, b) => b.score - a.score);
});

// ======================================================================
// SVGs (unchanged except your design)
// ======================================================================
function tierSVG(tier) {
  switch (tier) {
    case 5:
      return `
        <svg width="120" height="150" viewBox="0 0 120 150">
          <circle cx="60" cy="40" r="35" stroke="#A99CF5" stroke-width="6" fill="none"/>
          <polygon points="60,10 85,25 85,55 60,70 35,55 35,25"
            fill="#C28AE8" stroke="white" stroke-width="4"/>
          <rect x="20" y="90" width="80" height="45" rx="12" fill="#4A4664"/>
          <text x="60" y="118" font-size="30" fill="#B9A9D8" text-anchor="middle" font-weight="700">
            Tier 5
          </text>
        </svg>
      `;
    case 4:
      return `
        <svg width="120" height="150" viewBox="0 0 120 150">
          <circle cx="60" cy="40" r="35" stroke="#6E65FF" stroke-width="6" fill="none"/>
          <polygon points="60,10 85,25 85,55 60,70 35,55 35,25"
            fill="#B98CFF" stroke="white" stroke-width="4"/>
          <rect x="20" y="90" width="80" height="45" rx="12" fill="#2B2D33"/>
          <text x="60" y="118" font-size="30" fill="#C8B9FF" text-anchor="middle" font-weight="700">
            Tier 4
          </text>
        </svg>
      `;
    case 3:
      return `
        <svg width="120" height="150" viewBox="0 0 120 150">
          <circle cx="60" cy="40" r="35" stroke="#8A6037" stroke-width="6" fill="none"/>
          <polygon points="60,10 85,25 85,55 60,70 35,55 35,25"
            fill="#C38AE7" stroke="white" stroke-width="4"/>
          <rect x="20" y="90" width="80" height="45" rx="12" fill="#7A5530"/>
          <text x="60" y="118" font-size="30" fill="#FFA865" text-anchor="middle" font-weight="700">
            Tier 3
          </text>
        </svg>
      `;
    case 2:
      return `
        <svg width="120" height="150" viewBox="0 0 120 150">
          <circle cx="60" cy="40" r="35" stroke="#8E97A4" stroke-width="6" fill="none"/>
          <polygon points="60,10 85,25 85,55 60,70 35,55 35,25"
            fill="#C38AE7" stroke="white" stroke-width="4"/>
          <rect x="20" y="90" width="80" height="45" rx="12" fill="#5E6878"/>
          <text x="60" y="118" font-size="30" fill="#C7D4FF" text-anchor="middle" font-weight="700">
            Tier 2
          </text>
        </svg>
      `;
    default:
      return `
        <svg width="120" height="150" viewBox="0 0 120 150">
          <circle cx="60" cy="40" r="35" stroke="#9E7F2A" stroke-width="6" fill="none"/>
          <polygon points="60,10 85,25 85,55 60,70 35,55 35,25"
            fill="#C28AE8" stroke="white" stroke-width="4"/>
          <rect x="20" y="90" width="80" height="45" rx="12" fill="#7A6420"/>
          <text x="60" y="118" font-size="30" fill="#EDC85C" text-anchor="middle" font-weight="700">
            Tier 1
          </text>
        </svg>
      `;
  }
}

function pickFillForTier(t) {
  const fills = {
    1: "#C28AE8",
    2: "#8AC8E8",
    3: "#E8B38A",
    4: "#8AE8A6",
    5: "#E88AB4",
  };
  return fills[t] || "#C28AE8";
}

// ======================================================================
// Inject tier icons
// ======================================================================
const tiersWrap = document.querySelector(".tiers-wrap");
for (let t = 1; t <= 5; t++) {
  const div = document.createElement("div");
  div.className = "tier-badge";
  div.innerHTML =
    tierSVG(t) +
    `<div class="tier-title">Tier ${t}</div>
     <div class="tier-sub">Top 10 — CPvP</div>`;

  div.addEventListener("click", () => {
    document.getElementById("tierSelect").value = String(t);
    renderLeaderboards(t);
    document
      .getElementById("leaderboardContainer")
      .scrollIntoView({ behavior: "smooth" });
  });

  tiersWrap.appendChild(div);
}

// ======================================================================
// Dropdown handler
// ======================================================================
document.getElementById("tierSelect").addEventListener("change", (e) => {
  const val = e.target.value;
  renderLeaderboards(val === "all" ? null : Number(val));
});

// initial load
renderLeaderboards(null);

// ======================================================================
// Leaderboard renderer
// ======================================================================
function renderLeaderboards(tierFilter) {
  const container = document.getElementById("leaderboardContainer");
  container.innerHTML = "";

  const tiers = tierFilter ? [tierFilter] : [1, 2, 3, 4, 5];

  tiers.forEach((t) => {
    const card = document.createElement("div");
    card.className = "lb-card";

    card.innerHTML = `
      <div class="lb-header">
        <div style="display:flex;align-items:center;gap:12px;">
          ${miniTierSVG(t)}
          <div>
            <div style="font-weight:700">Tier ${t} — CPvP</div>
            <div style="font-size:12px;color:var(--muted)">Top 10 Players</div>
          </div>
        </div>
      </div>
    `;

    const list = document.createElement("div");
    list.className = "lb-list";

    list.innerHTML = `
      <div style="font-weight:700">Player</div>
      <div style="font-weight:700">Score</div>
      <div style="font-weight:700">Matches</div>
    `;

    (demoData[t] || []).slice(0, 10).forEach((p, idx) => {
      list.innerHTML += `
        <div class="player">
          <div class="rank-badge">${idx + 1}</div>
          <div>
            <div style="font-weight:600">${p.name}</div>
            <div style="font-size:12px;color:var(--muted)">tier ${p.tier}</div>
          </div>
        </div>
        <div>${p.score}</div>
        <div>${p.matches}</div>
      `;
    });

    card.appendChild(list);
    container.appendChild(card);
  });
}

// mini SVG
function miniTierSVG(t) {
  return `
  <svg width="56" height="70" viewBox="0 0 120 150">
    <circle cx="60" cy="40" r="35" stroke="#9E7F2A" stroke-width="4" fill="none"/>
    <polygon points="60,10 85,25 85,55 60,70 35,55 35,25"
      fill="${pickFillForTier(t)}" stroke="white" stroke-width="3"/>
    <rect x="40" y="90" width="40" height="30" rx="8" fill="#7A6420"/>
    <text x="60" y="112" font-size="18" fill="#EDC85C" text-anchor="middle" font-weight="700">T${t}</text>
  </svg>`;
}
