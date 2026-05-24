const buildings = [
  { key: "T", name: "Theatre", buildTime: 5, earning: 1500 },
  { key: "P", name: "Pub", buildTime: 4, earning: 1000 },
  { key: "C", name: "Commercial Park", buildTime: 10, earning: 2000 },
];

const timeInput = document.getElementById("timeInput");
const calculateButton = document.getElementById("calculateButton");
const maxEarnings = document.getElementById("maxEarnings");
const solutionsList = document.getElementById("solutionsList");
const errorMessage = document.getElementById("errorMessage");
const caseButtons = document.querySelectorAll(".case-button");

function money(value) {
  return `$${value}`;
}

function getScheduleProfit(timeUnits, counts) {
  const schedule = [];

  buildings.forEach((building, index) => {
    for (let count = 0; count < counts[index]; count += 1) {
      schedule.push(building);
    }
  });

  schedule.sort((a, b) => b.earning / b.buildTime - a.earning / a.buildTime);

  let elapsed = 0;
  let profit = 0;

  schedule.forEach((building) => {
    elapsed += building.buildTime;

    if (elapsed <= timeUnits) {
      profit += (timeUnits - elapsed) * building.earning;
    }
  });

  return profit;
}

function findBestSolutions(timeUnits) {
  let bestProfit = 0;
  const bestSolutions = [];
  const maxCounts = buildings.map((building) => Math.floor(timeUnits / building.buildTime));

  for (let t = 0; t <= maxCounts[0]; t += 1) {
    for (let p = 0; p <= maxCounts[1]; p += 1) {
      for (let c = 0; c <= maxCounts[2]; c += 1) {
        const counts = [t, p, c];
        const totalBuildTime = counts.reduce(
          (sum, count, index) => sum + count * buildings[index].buildTime,
          0
        );

        if (totalBuildTime > timeUnits) {
          continue;
        }

        const profit = getScheduleProfit(timeUnits, counts);

        if (profit > bestProfit) {
          bestProfit = profit;
          bestSolutions.length = 0;
          bestSolutions.push(counts);
        } else if (profit === bestProfit) {
          bestSolutions.push(counts);
        }
      }
    }
  }

  bestSolutions.sort((a, b) => b[0] - a[0] || b[1] - a[1] || b[2] - a[2]);

  return { bestProfit, bestSolutions };
}

function renderSolutions(solutions) {
  solutionsList.innerHTML = "";

  if (solutions.length === 0) {
    solutionsList.innerHTML = '<p class="empty">No buildings can be completed in this time.</p>';
    return;
  }

  solutions.forEach((counts, index) => {
    const row = document.createElement("div");
    row.className = "solution";
    row.innerHTML = `
      <strong>${index + 1}.</strong>
      <span>T: <strong>${counts[0]}</strong></span>
      <span>P: <strong>${counts[1]}</strong></span>
      <span>C: <strong>${counts[2]}</strong></span>
    `;
    solutionsList.appendChild(row);
  });
}

function update() {
  const timeUnits = Number(timeInput.value);

  if (!Number.isInteger(timeUnits) || timeUnits < 0) {
    errorMessage.textContent = "Please enter a whole number greater than or equal to 0.";
    return;
  }

  const { bestProfit, bestSolutions } = findBestSolutions(timeUnits);

  errorMessage.textContent = "";
  maxEarnings.textContent = money(bestProfit);
  renderSolutions(bestSolutions);
}

calculateButton.addEventListener("click", update);
timeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    update();
  }
});

caseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    timeInput.value = button.dataset.time;
    update();
  });
});

update();
