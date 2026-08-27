const athletes = [
  {
    name: "Jamal Reed",
    meta: "Strength - Week 5 - shoulder flag",
    status: "Review",
    decision: "Repeat bench top load, trim overhead pressing, increase rows.",
    signals: [
      "Bench top set improved from 82.5kg x 4 to 82.5kg x 5 at RPE 8.",
      "Shoulder soreness appeared twice after incline pressing, max 3/10.",
      "Nutrition adherence 82%; protein target missed on two travel days.",
      "Sleep dropped below 7h for three nights, readiness down 9%."
    ],
    rows: [
      ["Mon", "Lower strength", "Back squat", "5x3 @ 82%", "Normal progression"],
      ["Wed", "Upper volume", "Bench press", "4x6 @ 75%", "Keep RPE below 8"],
      ["Fri", "Bench milestone", "Bench press", "90kg x 5 attempt", "Warm up slower"],
      ["Sat", "Conditioning", "Zone 2 bike", "35 min", "Recovery priority"]
    ]
  },
  {
    name: "Amira Khan",
    meta: "Fat loss - Week 8 - check-in due",
    status: "Due",
    decision: "Hold calories steady, add one step target, deload lower body.",
    signals: [
      "Body weight trend down 0.6kg across the week.",
      "Three workouts completed; missed Saturday due to travel.",
      "Hunger rating 8/10 on two evenings after low-protein breakfasts.",
      "Knee soreness rose after high-volume lunges."
    ],
    rows: [
      ["Mon", "Full body", "Trap bar deadlift", "4x5 moderate", "No grinders"],
      ["Tue", "Steps", "Walk", "9,500 target", "Flexible timing"],
      ["Thu", "Upper strength", "DB press", "4x8", "Neutral grip"],
      ["Sat", "Conditioning", "Incline walk", "30 min", "Travel option"]
    ]
  },
  {
    name: "Sara Lee",
    meta: "Hypertrophy - Week 2 - missed session",
    status: "Missed",
    decision: "Reschedule missed pull session and keep weekly volume intact.",
    signals: [
      "Missed pull day, but completed legs and push with strong effort.",
      "Logged low motivation after work deadlines.",
      "Progress photos submitted, body weight stable.",
      "Best adherence happens when sessions stay under 55 minutes."
    ],
    rows: [
      ["Mon", "Push", "Incline press", "4x8-10", "Superset accessories"],
      ["Wed", "Pull", "Lat pulldown", "4x10", "Rescheduled"],
      ["Fri", "Legs", "Hack squat", "4x8", "Keep total under 55m"],
      ["Sun", "Optional", "Mobility", "15 min", "Recovery win"]
    ]
  }
];

const views = {
  command: "Coach cockpit",
  program: "Program builder",
  analytics: "Trends",
  client: "Athlete app",
  ai: "AI workbench",
  market: "Market gaps"
};

const athleteList = document.getElementById("athlete-list");
const signals = document.getElementById("input-signals");
const rows = document.getElementById("program-rows");
const decision = document.getElementById("coach-decision");
const athleteTitle = document.getElementById("selected-athlete-title");
const title = document.getElementById("view-title");
const aiOutput = document.getElementById("ai-output");

function renderAthleteList() {
  athleteList.innerHTML = "";
  athletes.forEach((athlete, index) => {
    const button = document.createElement("button");
    button.className = `athlete-button${index === 0 ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <div class="athlete-top">
        <strong>${athlete.name}</strong>
        <span class="badge">${athlete.status}</span>
      </div>
      <div class="athlete-meta">${athlete.meta}</div>
    `;
    button.addEventListener("click", () => selectAthlete(index));
    athleteList.appendChild(button);
  });
}

function selectAthlete(index) {
  const athlete = athletes[index];
  document.querySelectorAll(".athlete-button").forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });
  athleteTitle.textContent = `${athlete.name} - Week 5`;
  decision.textContent = athlete.decision;
  signals.innerHTML = athlete.signals.map((signal) => `<li>${signal}</li>`).join("");
  rows.innerHTML = athlete.rows.map((row) => `
    <tr>
      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
    </tr>
  `).join("");
}

function setView(view) {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === view);
  });
  document.querySelectorAll(".view").forEach((section) => {
    section.classList.toggle("active", section.id === `view-${view}`);
  });
  title.textContent = views[view];
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.getElementById("simulate-ai").addEventListener("click", () => {
  setView("ai");
  aiOutput.innerHTML = `
    <p><strong>Draft progression:</strong> preserve the coach's existing pattern, raise lower-body intensity by 2%, and keep upper-body volume flat due to the shoulder signal.</p>
    <p><strong>Reminder:</strong> review Amira's check-in before changing calories; her hunger pattern suggests timing may matter more than calories.</p>
    <p><strong>Approval gate:</strong> no changes are sent until the coach edits and approves the week.</p>
  `;
});

document.getElementById("run-query").addEventListener("click", () => {
  aiOutput.innerHTML = `
    <p><strong>Found block:</strong> March bench accumulation produced the best response: +7.5kg estimated 1RM over 4 weeks with 91% session completion.</p>
    <p><strong>Why it worked:</strong> moderate jumps, consistent accessories, and shoulder-friendly exercise selection kept RPE controlled.</p>
    <p><strong>Suggested adaptation:</strong> repeat the structure, but replace incline DB press with machine press if soreness exceeds 3/10.</p>
  `;
});

renderAthleteList();
selectAthlete(0);
