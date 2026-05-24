const heightInput = document.getElementById("heightInput");
const calculateButton = document.getElementById("calculateButton");
const totalWater = document.getElementById("totalWater");
const tankGrid = document.getElementById("tankGrid");
const errorMessage = document.getElementById("errorMessage");

function parseHeights(value) {
  const parts = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    throw new Error("Please enter at least one height.");
  }

  return parts.map((part) => {
    const height = Number(part);

    if (!Number.isInteger(height) || height < 0) {
      throw new Error("Every height must be an integer greater than or equal to 0.");
    }

    return height;
  });
}

function calculateWater(heights) {
  const leftMax = [];
  const rightMax = [];
  let highestLeft = 0;
  let highestRight = 0;

  for (let index = 0; index < heights.length; index += 1) {
    highestLeft = Math.max(highestLeft, heights[index]);
    leftMax[index] = highestLeft;
  }

  for (let index = heights.length - 1; index >= 0; index -= 1) {
    highestRight = Math.max(highestRight, heights[index]);
    rightMax[index] = highestRight;
  }

  const waterLevels = heights.map((height, index) =>
    Math.max(0, Math.min(leftMax[index], rightMax[index]) - height)
  );
  const total = waterLevels.reduce((sum, units) => sum + units, 0);

  return { total, waterLevels };
}

function renderGrid(heights, waterLevels) {
  const maxHeight = Math.max(...heights, ...waterLevels.map((water, index) => water + heights[index]), 1);

  tankGrid.innerHTML = "";
  tankGrid.style.gridTemplateColumns = `repeat(${heights.length}, minmax(38px, 1fr))`;

  for (let row = maxHeight; row >= 1; row -= 1) {
    heights.forEach((height, index) => {
      const cell = document.createElement("div");
      const waterTop = height + waterLevels[index];

      cell.className = "cell";

      if (row <= height) {
        cell.classList.add("block");
        cell.title = `Block height: ${height}`;
      } else if (row <= waterTop) {
        cell.classList.add("water");
        cell.title = "Stored water";
      }

      tankGrid.appendChild(cell);
    });
  }
}

function update() {
  try {
    const heights = parseHeights(heightInput.value);
    const { total, waterLevels } = calculateWater(heights);

    errorMessage.textContent = "";
    totalWater.textContent = total;
    renderGrid(heights, waterLevels);
  } catch (error) {
    errorMessage.textContent = error.message;
  }
}

calculateButton.addEventListener("click", update);
heightInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    update();
  }
});

update();
