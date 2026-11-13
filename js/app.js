// Returns true if the lab's last update is older than STALE_MINUTES
function isStale(lab) {
  const ageMs = Date.now() - new Date(lab.updatedAt).getTime();
  return ageMs > STALE_MINUTES * 60 * 1000;
}

// Accessible seats that are free: can't exceed the total free seats in the lab
function accessibleFree(lab) {
  return Math.min(lab.accessibleSeats, lab.capacity - lab.occupied);
}

// Reads the checkboxes and returns a new array of labs that pass every checked filter
function filterLabs() {
  const wantAccessible = document.getElementById("filter-accessible").checked;
  const wantGpu = document.getElementById("filter-gpu").checked;
  const wantPrinter = document.getElementById("filter-printer").checked;
  const freshOnly = document.getElementById("filter-fresh").checked;

  // Copy the array so the original labs data is never changed
  let result = [...labs];

  if (wantAccessible) {
    result = result.filter(lab => accessibleFree(lab) > 0);
  }
  if (wantGpu) {
    result = result.filter(lab => lab.equipment.includes("GPU"));
  }
  if (wantPrinter) {
    result = result.filter(lab => lab.equipment.includes("Printer"));
  }
  if (freshOnly) {
    result = result.filter(lab => !isStale(lab));
  }

  return result;
}

// Draws the lab cards, the summary, and the empty message based on current filters
function renderLabs() {
  const list = document.getElementById("lab-list");
  const summary = document.getElementById("summary");
  const emptyMsg = document.getElementById("empty-message");
  const shown = filterLabs();

  list.innerHTML = "";
  emptyMsg.hidden = shown.length > 0;

  let totalFree = 0;
  shown.forEach(lab => {
    const free = lab.capacity - lab.occupied;
    totalFree += free;

    const card = document.createElement("article");
    card.className = "lab-card";
    card.innerHTML = `
      <h3>${lab.name}</h3>
      <p>${lab.building}</p>
      <p>${free} of ${lab.capacity} seats free</p>
      <p>Accessible seats free: ${accessibleFree(lab)} of ${lab.accessibleSeats}</p>
      <p>Equipment: ${lab.equipment.length ? lab.equipment.join(", ") : "None"}</p>
      ${isStale(lab) ? '<p class="stale">Stale data</p>' : ""}
    `;
    list.appendChild(card);
  });

  summary.textContent = `${shown.length} labs shown, ${totalFree} free seats in total.`;
}

// Re-render whenever any filter checkbox changes
document.querySelectorAll('.filters input[type="checkbox"]').forEach(box => {
  box.addEventListener("change", renderLabs);
});

// Draw the labs on first load
renderLabs();

// Fill the lab dropdown from the labs array
function populateLabSelect() {
  const select = document.getElementById("lab-select");
  select.innerHTML = "";
  labs.forEach(lab => {
    const option = document.createElement("option");
    option.value = lab.id;
    option.textContent = lab.name;
    select.appendChild(option);
  });
}

// Returns an error message, or an empty string if the value is valid
function validateOccupied(value, lab) {
  if (value.trim() === "") return "Enter the number of occupied seats.";
  const num = Number(value);
  if (!Number.isInteger(num)) return "Enter a whole number.";
  if (num < 0) return "Occupied seats can't be negative.";
  if (num > lab.capacity) return `This lab only has ${lab.capacity} seats.`;
  return "";
}

// Handle the occupancy report form
document.getElementById("report-form").addEventListener("submit", event => {
  event.preventDefault();
  const select = document.getElementById("lab-select");
  const input = document.getElementById("occupied");
  const error = document.getElementById("occupied-error");
  const lab = labs.find(l => l.id === Number(select.value));

  const message = validateOccupied(input.value, lab);
  error.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");

  if (message) {
    input.focus();
    return;
  }

  lab.occupied = Number(input.value);
  lab.updatedAt = new Date().toISOString();
  input.value = "";
  input.setAttribute("aria-invalid", "false");
  renderLabs();
});

populateLabSelect();

// Keep the number box's max in sync with the selected lab's capacity
function syncOccupiedMax() {
  const lab = labs.find(l => l.id === Number(document.getElementById("lab-select").value));
  document.getElementById("occupied").max = lab.capacity;
}

document.getElementById("lab-select").addEventListener("change", syncOccupiedMax);
syncOccupiedMax();