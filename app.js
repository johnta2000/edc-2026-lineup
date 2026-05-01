const { dayOrder, stageOrder, schedule } = window.EDC_LINEUP_DATA;

const searchInput = document.querySelector("#search-input");
const dayDropdown = document.querySelector("#day-dropdown");
const stageDropdown = document.querySelector("#stage-dropdown");
const timeDropdown = document.querySelector("#time-dropdown");
const clearButton = document.querySelector("#clear-filters");
const resultsSummary = document.querySelector("#results-summary");
const scheduleBody = document.querySelector("#schedule-body");

const dropdownState = {
  day: { values: [], search: "", open: false },
  stage: { values: [], search: "", open: false },
};

let suppressUrlSync = false;

const GENRE_BY_ARTIST = {
  "1991": "DNB",
  "999999999": "Techno",
  "A.M.C with MC Phantom": "DNB",
  "Above & Beyond (Sunrise Set)": "Trance",
  "Adiel": "Techno",
  "Adrián Mills": "Techno",
  "Adriatique": "Techno",
  "Adventure Club (Throwback Set)": "Dubstep",
  "ÆON:MODE (Sunrise Set)": "DNB",
  "AHEE B2B Liquid Stranger": "Dubstep",
  "Ahmed Spins": "Other",
  "Alison Wonderland": "Other",
  "ANNA": "Techno",
  "Andrew Rayel": "Trance",
  "Armin van Buuren (Sunrise Set)": "Trance",
  "Argy": "Techno",
  "Astrix": "Trance",
  "ATLiens": "Dubstep",
  "Audiofreq B2B Code Black B2B Toneshifterz": "Hardstyle",
  "Avalon Emerson": "Techno",
  "AVELLO B2B Dennett": "Dubstep",
  "Bad Beat": "Hardstyle",
  "Bad Boombox B2B Ollie Lishman": "Techno",
  "Bashkka B2B Sedef Adasi": "Techno",
  "BAUGRUPPE90": "Techno",
  "Beltran": "Tech House",
  "Beltran B2B Simas": "Tech House",
  "Billy Gillies": "Trance",
  "Black Tiger Sex Machine": "Dubstep",
  "BOLO (Sunrise Set)": "Tech House",
  "Boogie T B2B Distinct Motive": "Dubstep",
  Bou: "DNB",
  "Boys Noize": "Techno",
  "BUNT. (In The Round)": "Other",
  Cassian: "Other",
  "Charlotte de Witte": "Techno",
  "Chris Lorenzo": "Tech House",
  "Chris Lorenzo B2B Bullet Tooth": "Tech House",
  "Chris Stussy": "Tech House",
  CID: "Tech House",
  Clawz: "Hardstyle",
  Cloonee: "Tech House",
  Cloudy: "Hardstyle",
  "Cold Blue": "Trance",
  "Cosmic Gate": "Trance",
  "Culture Shock": "DNB",
  CUTDWN: "Hardstyle",
  Cyclops: "Dubstep",
  "Da Tweekaz": "Hardstyle",
  Dabin: "Dubstep",
  "Darren Porter": "Trance",
  Darude: "Trance",
  "Dead X": "Hardstyle",
  "Deathpact ∞ Deathpact": "Dubstep",
  "Delta Heavy": "DNB",
  Discip: "Tech House",
  "DJ Gigola": "Techno",
  "DJ Gigola B2B MCR-T": "Techno",
  "DJ Isaac": "Hardstyle",
  "DJ Mandy": "Techno",
  "DJ Tennis B2B Chloé Caillet": "Other",
  "DJ Tennis B2B Red Axes": "Other",
  "Doctor P B2B Flux Pavilion B2B FuntCase": "Dubstep",
  DØMINA: "Hardstyle",
  DREYA_V: "Other",
  "DREYA V": "Other",
  DYEN: "Techno",
  EAZYBAKED: "Dubstep",
  "Eli & Fur": "Other",
  "Eli Brown": "Techno",
  "Eptic B2B Space Laces": "Dubstep",
  "Fallen with MC Dino": "DNB",
  Fisher: "Tech House",
  "Frankie Bones": "Techno",
  "Frost Children": "Other",
  "Funk Tribu": "Techno",
  "Gareth Emery": "Trance",
  Getter: "Dubstep",
  Ghengar: "Dubstep",
  GorillaT: "Dubstep",
  GRAVAGERZ: "Hardstyle",
  GRAVEDGR: "Hardstyle",
  "GRiZ B2B Wooli": "Dubstep",
  Hamdi: "Dubstep",
  Hardwell: "Other",
  HAYLA: "Other",
  "HEYZ": "Dubstep",
  HNTR: "Tech House",
  "HOL!": "Dubstep",
  "Holy Priest": "Techno",
  "Hybrid Minds": "DNB",
  "I Hate Models": "Techno",
  "Ilan Bluestone": "Trance",
  "Indira Paganotto": "Techno",
  "INFEKT B2B Samplifire": "Dubstep",
  Innellea: "Techno",
  "Interplanetary Criminal": "Other",
  "John Summit": "Tech House",
  "Johannes Schuster": "Hardstyle",
  "Joseph Capriati": "Techno",
  "Josh Baker": "Tech House",
  "Josh Baker B2B KETTAMA B2B Prospa": "Tech House",
  "Kai Wachi": "Dubstep",
  Kaskade: "Other",
  "Kevin de Vries": "Techno",
  KETTAMA: "Techno",
  "KI/KI": "Techno",
  Klangkuenstler: "Techno",
  KREAM: "Other",
  KUKO: "Hardstyle",
  "Lady Faith B2B LNY TNZ": "Hardstyle",
  "Laidback Luke B2B Chuckie": "Other",
  "Layton Giordani": "Techno",
  Levity: "Dubstep",
  "Lil Texas": "Hardcore",
  "Lilly Palmer": "Techno",
  Linska: "Other",
  "Lu.Re": "Tech House",
  Luciano: "Tech House",
  "Luke Dean": "Tech House",
  "Luuk van Dijk": "Tech House",
  MADGRRL_B2B_VESSEL: "Hardstyle",
  "MADGRRL B2B VESSEL": "Hardstyle",
  Maddix: "Techno",
  MALUGI: "Other",
  "Maria Healy": "Trance",
  "Martin Garrix": "Other",
  "Mary Droppinz": "Tech House",
  Massano: "Techno",
  "Massimiliano Pagliara": "Other",
  Mathame: "Techno",
  "Matty Ralph": "Trance",
  "Max Dean": "Tech House",
  "Max Dean B2B Luke Dean": "Tech House",
  MCR_T: "Techno",
  "MCR-T": "Techno",
  "MEDUZA³": "Other",
  MËSTIZA: "Tech House",
  mink: "Techno",
  Mish: "Hardstyle",
  "Morgan Seatree": "Tech House",
  "Murphy's Law": "Tech House",
  MUZZ: "DNB",
  "Nico Moreno": "Techno",
  "Nico Moreno B2B Holy Priest": "Techno",
  "Nightstalker with MC Dino": "DNB",
  Noizu: "Tech House",
  Nostalgix: "Other",
  Notion: "Other",
  Obskür: "Tech House",
  Omar: "Tech House",
  "Omar+": "Tech House",
  OMNOM: "Tech House",
  "Paul Oakenfold": "Trance",
  "Paul van Dyk": "Trance",
  Peekaboo: "Dubstep",
  Pegassi: "Trance",
  "Peggy Gou": "Other",
  "Peggy Gou B2B KI/KI": "Techno",
  "Player Dave": "Dubstep",
  Pooler: "Hardstyle",
  "Porter Robinson (DJ Set)": "Other",
  Prospa: "Tech House",
  Ray_Volpe: "Dubstep",
  "Ray Volpe": "Dubstep",
  Rebekah: "Techno",
  Rebüke: "Techno",
  Restricted: "Hardstyle",
  "RIOT": "Dubstep",
  "Rob Gee B2B Lenny Dee": "Hardcore",
  Roddy_Lima: "Other",
  "Roddy Lima": "Other",
  RØZ: "Techno",
  "Sammy Virji": "Other",
  "San Holo (Wholesome Riddim Set)": "Other",
  "San Pacho": "Tech House",
  "Sarah de Warren": "Trance",
  Serafina: "Hardstyle",
  "Seven Lions": "Dubstep",
  "Shingo Nakamura": "Trance",
  "Ship Wrek": "Tech House",
  Sidney_Charles_B2B_Bushbaby: "Tech House",
  "Sidney Charles B2B Bushbaby": "Tech House",
  Sihk: "Hardstyle",
  "Silva Bumpa": "Other",
  "Silvie Loto": "Tech House",
  Sippy: "Dubstep",
  Skream: "Other",
  SLAMM: "Tech House",
  Slugg: "Tech House",
  "Snow Strippers": "Other",
  Sofi_Tukker: "Other",
  "Sofi Tukker": "Other",
  Solomun: "Other",
  Spray: "Techno",
  "Stacy Christine": "Other",
  "Stan Christ": "Hardstyle",
  "Steve Aoki": "Other",
  "Sub Focus": "DNB",
  "Sub Zero Project": "Hardstyle",
  Subtronics: "Dubstep",
  SUPERSTRINGS: "Trance",
  T78: "Techno",
  "The Carry Nation": "Other",
  "The Chainsmokers": "Other",
  "The Outlaw": "Hardstyle",
  "The Prodigy": "Other",
  "The Purge": "Hardstyle",
  "The Saints": "Hardstyle",
  "Thomas Schumacher": "Techno",
  Tiësto: "Other",
  Tiga: "Other",
  "Tinlicker (DJ Set)": "Trance",
  Toman: "Tech House",
  Trace: "Other",
  Underworld: "Other",
  Vieze_Asbak: "Techno",
  "Vieze Asbak": "Techno",
  "Vintage Culture": "Other",
  Viperactive: "Dubstep",
  "Virtual Riot": "Dubstep",
  VTSS: "Techno",
  "VTSS (In The Round)": "Techno",
  "Walker & Royce B2B VNSSA": "Tech House",
  Warface: "Hardstyle",
  Warung: "Trance",
  "Wax Motif": "Tech House",
  Westend: "Tech House",
  Whethan: "Other",
  "William Black": "Dubstep",
  Wooli: "Dubstep",
  YDG: "Dubstep",
  Yosuf: "Hardstyle",
  Zedd: "Other",
};

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getTimeMinutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  const festivalHour = hour < 12 ? hour + 24 : hour;

  return festivalHour * 60 + minute;
}

function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function compareSets(left, right) {
  return (
    dayOrder.indexOf(left.day) - dayOrder.indexOf(right.day) ||
    left.timeMinutes - right.timeMinutes ||
    stageOrder.indexOf(left.stage) - stageOrder.indexOf(right.stage) ||
    left.artist.localeCompare(right.artist, undefined, { sensitivity: "base" })
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const sets = schedule
  .map((set) => ({
    ...set,
    genre: getGenre(set),
    displayTime: formatTime(set.time),
    timeMinutes: getTimeMinutes(set.time),
  }))
  .sort(compareSets);

const timeBounds = {
  min: Math.min(...sets.map((set) => set.timeMinutes)),
  max: Math.max(...sets.map((set) => set.timeMinutes)),
};

const timeState = {
  open: false,
  min: timeBounds.min,
  max: timeBounds.max,
};

function getGenre(set) {
  if (GENRE_BY_ARTIST[set.artist]) {
    return GENRE_BY_ARTIST[set.artist];
  }

  const stageFallbacks = {
    Basspod: "Dubstep",
    Wasteland: "Hardstyle",
    "Quantum Valley": "Trance",
    "Neon Garden": "Techno",
    "Stereo Bloom": "Tech House",
  };

  return stageFallbacks[set.stage] ?? "Other";
}

function closeDropdowns(exceptKey = "") {
  for (const key of Object.keys(dropdownState)) {
    if (key !== exceptKey) {
      dropdownState[key].open = false;
    }
  }

  if (exceptKey !== "time") {
    timeState.open = false;
  }
}

function summarizeMultiSelect(values, label) {
  if (!values.length) {
    return `All ${label}`;
  }

  if (values.length === 1) {
    return values[0];
  }

  return `${values.length} ${label}`;
}

function renderDropdown(container, key, options, label) {
  const state = dropdownState[key];
  const filteredOptions = options.filter((option) =>
    normalize(option).includes(normalize(state.search))
  );
  const selectedValues = new Set(state.values);
  const currentLabel = summarizeMultiSelect(state.values, label);

  container.innerHTML = `
    <button
      class="dropdown-button"
      type="button"
      aria-expanded="${state.open ? "true" : "false"}"
    >
      <span>${escapeHtml(currentLabel)}</span>
      <span class="dropdown-caret">⌄</span>
    </button>
    ${
      state.open
        ? `
      <div class="dropdown-panel">
        <input
          class="dropdown-search"
          type="search"
          placeholder="Search ${label}"
          value="${escapeHtml(state.search)}"
        />
        <div class="dropdown-options">
          <label class="dropdown-option ${state.values.length === 0 ? "is-selected" : ""}">
            <input type="checkbox" data-role="clear" ${state.values.length === 0 ? "checked" : ""} />
            <span>All ${escapeHtml(label)}</span>
          </label>
          ${
            filteredOptions.length
              ? filteredOptions
                  .map(
                    (option) => `
              <label class="dropdown-option ${selectedValues.has(option) ? "is-selected" : ""}">
                <input
                  type="checkbox"
                  data-role="option"
                  value="${escapeHtml(option)}"
                  ${selectedValues.has(option) ? "checked" : ""}
                />
                <span>${escapeHtml(option)}</span>
              </label>
            `
                  )
                  .join("")
              : `<div class="dropdown-empty">No matches</div>`
          }
        </div>
      </div>
    `
        : ""
    }
  `;

  container.querySelector(".dropdown-button").addEventListener("click", (event) => {
    event.stopPropagation();
    state.open = !state.open;
    closeDropdowns(key);
    render();
  });

  const panel = container.querySelector(".dropdown-panel");
  if (panel) {
    panel.addEventListener("click", (event) => event.stopPropagation());
  }

  const search = container.querySelector(".dropdown-search");
  if (search) {
    search.focus();
    search.setSelectionRange(search.value.length, search.value.length);
    search.addEventListener("click", (event) => event.stopPropagation());
    search.addEventListener("input", (event) => {
      event.stopPropagation();
      state.search = event.target.value;
      render();
    });
  }

  const clearOption = container.querySelector('[data-role="clear"]');
  if (clearOption) {
    clearOption.addEventListener("change", (event) => {
      event.stopPropagation();
      state.values = [];
      state.search = "";
      render();
    });
  }

  for (const option of container.querySelectorAll('[data-role="option"]')) {
    option.addEventListener("change", (event) => {
      event.stopPropagation();
      const value = event.target.value;

      if (event.target.checked && !state.values.includes(value)) {
        state.values = [...state.values, value];
      } else if (!event.target.checked) {
        state.values = state.values.filter((selected) => selected !== value);
      }

      render();
    });
  }
}

function renderDropdowns() {
  renderDropdown(dayDropdown, "day", dayOrder, "days");
  renderDropdown(stageDropdown, "stage", stageOrder, "stages");
}

function timeFromMinutes(totalMinutes) {
  const normalized = totalMinutes % (24 * 60);
  const hour = Math.floor(normalized / 60);
  const minute = normalized % 60;

  return formatTime(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
}

function parseTimeInput(value) {
  const cleaned = value.trim().toLowerCase();
  const match = cleaned.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);

  if (!match) {
    return null;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2] ?? "0");
  const meridiem = match[3];

  if (minute > 59 || hour > 23 || hour < 0) {
    return null;
  }

  if (meridiem) {
    if (hour < 1 || hour > 12) {
      return null;
    }

    if (meridiem === "pm" && hour !== 12) {
      hour += 12;
    }

    if (meridiem === "am" && hour === 12) {
      hour = 0;
    }
  }

  const festivalHour = hour < 12 ? hour + 24 : hour;

  return festivalHour * 60 + minute;
}

function clampTime(value) {
  return Math.max(timeBounds.min, Math.min(timeBounds.max, value));
}

function isFullTimeRange() {
  return timeState.min === timeBounds.min && timeState.max === timeBounds.max;
}

function renderTimeDropdown() {
  const label = isFullTimeRange()
    ? "Set Start Times"
    : `${timeFromMinutes(timeState.min)} - ${timeFromMinutes(timeState.max)}`;

  timeDropdown.innerHTML = `
    <button
      class="dropdown-button time-button ${timeState.open ? "is-active" : ""}"
      type="button"
      aria-expanded="${timeState.open ? "true" : "false"}"
    >
      <span data-role="time-button-label">${escapeHtml(label)}</span>
      <span class="dropdown-caret">${timeState.open ? "⌃" : "⌄"}</span>
    </button>
    ${
      timeState.open
        ? `
      <div class="time-panel">
        <div class="time-panel-head">
          <h2>Set Start Times</h2>
          <button class="time-close" type="button" aria-label="Close time filter">×</button>
        </div>
        <p class="time-subtitle">Start time range</p>
        <div class="time-input-row">
          <label>
            <span>From</span>
            <input
              data-role="time-min-text"
              type="text"
              inputmode="text"
              value="${escapeHtml(timeFromMinutes(timeState.min))}"
              aria-label="Type earliest set start time"
            />
          </label>
          <label>
            <span>To</span>
            <input
              data-role="time-max-text"
              type="text"
              inputmode="text"
              value="${escapeHtml(timeFromMinutes(timeState.max))}"
              aria-label="Type latest set start time"
            />
          </label>
        </div>
        <div class="range-control">
          <div class="range-track"></div>
          <div data-role="time-fill" class="range-fill" style="left: ${
            ((timeState.min - timeBounds.min) / (timeBounds.max - timeBounds.min)) * 100
          }%; right: ${
            100 - ((timeState.max - timeBounds.min) / (timeBounds.max - timeBounds.min)) * 100
          }%;"></div>
          <input
            class="range-input"
            data-role="time-min"
            type="range"
            min="${timeBounds.min}"
            max="${timeBounds.max}"
            step="1"
            value="${timeState.min}"
            aria-label="Earliest set time"
          />
          <input
            class="range-input"
            data-role="time-max"
            type="range"
            min="${timeBounds.min}"
            max="${timeBounds.max}"
            step="1"
            value="${timeState.max}"
            aria-label="Latest set time"
          />
        </div>
        <div class="time-actions">
          <button class="time-reset" type="button">Reset times</button>
        </div>
      </div>
    `
        : ""
    }
  `;

  timeDropdown.querySelector(".time-button").addEventListener("click", (event) => {
    event.stopPropagation();
    timeState.open = !timeState.open;
    closeDropdowns("time");
    render();
  });

  const panel = timeDropdown.querySelector(".time-panel");
  if (panel) {
    panel.addEventListener("click", (event) => event.stopPropagation());
  }

  const closeButton = timeDropdown.querySelector(".time-close");
  if (closeButton) {
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      timeState.open = false;
      render();
    });
  }

  const minInput = timeDropdown.querySelector('[data-role="time-min"]');
  const maxInput = timeDropdown.querySelector('[data-role="time-max"]');
  const minTextInput = timeDropdown.querySelector('[data-role="time-min-text"]');
  const maxTextInput = timeDropdown.querySelector('[data-role="time-max-text"]');

  if (minInput && maxInput) {
    minInput.addEventListener("input", (event) => {
      timeState.min = Math.min(Number(event.target.value), timeState.max);
      event.target.value = timeState.min;
      updateTimeFilterDisplay();
      renderResults();
    });

    maxInput.addEventListener("input", (event) => {
      timeState.max = Math.max(Number(event.target.value), timeState.min);
      event.target.value = timeState.max;
      updateTimeFilterDisplay();
      renderResults();
    });
  }

  function applyTypedTime(input, boundary) {
    const parsed = parseTimeInput(input.value);

    if (parsed === null) {
      input.value =
        boundary === "min"
          ? timeFromMinutes(timeState.min)
          : timeFromMinutes(timeState.max);
      return;
    }

    if (boundary === "min") {
      timeState.min = Math.min(clampTime(parsed), timeState.max);
    } else {
      timeState.max = Math.max(clampTime(parsed), timeState.min);
    }

    updateTimeFilterDisplay();
    renderResults();
  }

  for (const input of [
    [minTextInput, "min"],
    [maxTextInput, "max"],
  ]) {
    const [textInput, boundary] = input;

    if (!textInput) {
      continue;
    }

    textInput.addEventListener("click", (event) => event.stopPropagation());
    textInput.addEventListener("change", () => applyTypedTime(textInput, boundary));
    textInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        applyTypedTime(textInput, boundary);
        textInput.blur();
      }
    });
  }

  const resetButton = timeDropdown.querySelector(".time-reset");
  if (resetButton) {
    resetButton.addEventListener("click", (event) => {
      event.stopPropagation();
      timeState.min = timeBounds.min;
      timeState.max = timeBounds.max;
      render();
    });
  }
}

function updateTimeFilterDisplay() {
  const label = isFullTimeRange()
    ? "Set Start Times"
    : `${timeFromMinutes(timeState.min)} - ${timeFromMinutes(timeState.max)}`;
  const buttonLabel = timeDropdown.querySelector('[data-role="time-button-label"]');
  const minTextInput = timeDropdown.querySelector('[data-role="time-min-text"]');
  const maxTextInput = timeDropdown.querySelector('[data-role="time-max-text"]');
  const minRangeInput = timeDropdown.querySelector('[data-role="time-min"]');
  const maxRangeInput = timeDropdown.querySelector('[data-role="time-max"]');
  const fill = timeDropdown.querySelector('[data-role="time-fill"]');

  if (buttonLabel) {
    buttonLabel.textContent = label;
  }

  if (minTextInput) {
    minTextInput.value = timeFromMinutes(timeState.min);
  }

  if (maxTextInput) {
    maxTextInput.value = timeFromMinutes(timeState.max);
  }

  if (minRangeInput) {
    minRangeInput.value = timeState.min;
  }

  if (maxRangeInput) {
    maxRangeInput.value = timeState.max;
  }

  if (fill) {
    fill.style.left = `${
      ((timeState.min - timeBounds.min) / (timeBounds.max - timeBounds.min)) * 100
    }%`;
    fill.style.right = `${
      100 - ((timeState.max - timeBounds.min) / (timeBounds.max - timeBounds.min)) * 100
    }%`;
  }
}

function readStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") ?? "";
  const dayValues = (params.get("days") ?? params.get("day") ?? "")
    .split(",")
    .filter(Boolean);
  const stageValues = (params.get("stages") ?? params.get("stage") ?? "")
    .split(",")
    .filter(Boolean);
  const timeStart = Number(params.get("start"));
  const timeEnd = Number(params.get("end"));

  searchInput.value = q;
  dropdownState.day.values = dayValues.filter((day) => dayOrder.includes(day));
  dropdownState.stage.values = stageValues.filter((stage) =>
    stageOrder.includes(stage)
  );
  timeState.min =
    Number.isFinite(timeStart) && timeStart >= timeBounds.min && timeStart <= timeBounds.max
      ? timeStart
      : timeBounds.min;
  timeState.max =
    Number.isFinite(timeEnd) && timeEnd >= timeBounds.min && timeEnd <= timeBounds.max
      ? timeEnd
      : timeBounds.max;

  if (timeState.min > timeState.max) {
    timeState.min = timeBounds.min;
    timeState.max = timeBounds.max;
  }
}

function syncUrlState() {
  if (suppressUrlSync) {
    return;
  }

  const params = new URLSearchParams();
  const query = searchInput.value.trim();

  if (query) {
    params.set("q", query);
  }

  if (dropdownState.day.values.length) {
    params.set("days", dropdownState.day.values.join(","));
  }

  if (dropdownState.stage.values.length) {
    params.set("stages", dropdownState.stage.values.join(","));
  }

  if (!isFullTimeRange()) {
    params.set("start", String(timeState.min));
    params.set("end", String(timeState.max));
  }

  const nextUrl = `${window.location.pathname}${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  window.history.replaceState({}, "", nextUrl);
}

function getFilteredSets() {
  const query = normalize(searchInput.value.trim());
  const activeDays = new Set(dropdownState.day.values);
  const activeStages = new Set(dropdownState.stage.values);

  return sets.filter((set) => {
    const matchesDay = !activeDays.size || activeDays.has(set.day);
    const matchesStage = !activeStages.size || activeStages.has(set.stage);
    const matchesTime =
      set.timeMinutes >= timeState.min && set.timeMinutes <= timeState.max;
    const haystack = normalize(
      `${set.day} ${set.time} ${set.displayTime} ${set.stage} ${set.artist} ${set.genre}`
    );
    const matchesSearch = !query || haystack.includes(query);

    return matchesDay && matchesStage && matchesTime && matchesSearch;
  });
}

function renderTable(filteredSets) {
  if (!filteredSets.length) {
    scheduleBody.innerHTML = `
      <tr>
        <td class="empty-row" colspan="5">No sets match those filters.</td>
      </tr>
    `;
    return;
  }

  scheduleBody.innerHTML = filteredSets
    .map((set) => {
      return `
        <tr>
          <td class="day-cell">${escapeHtml(set.day)}</td>
          <td class="time-cell">${escapeHtml(set.displayTime)}</td>
          <td>${escapeHtml(set.stage)}</td>
          <td class="artist-cell">${escapeHtml(set.artist)}</td>
          <td>${escapeHtml(set.genre)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderResults() {
  const filteredSets = getFilteredSets();

  resultsSummary.textContent = `${filteredSets.length} of ${sets.length} sets shown`;
  renderTable(filteredSets);
  syncUrlState();
}

function render() {
  renderDropdowns();
  renderTimeDropdown();
  renderResults();
}

searchInput.addEventListener("input", render);

document.addEventListener("click", () => {
  closeDropdowns();
  render();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDropdowns();
    render();
  }
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  dropdownState.day.values = [];
  dropdownState.day.search = "";
  dropdownState.stage.values = [];
  dropdownState.stage.search = "";
  timeState.min = timeBounds.min;
  timeState.max = timeBounds.max;
  closeDropdowns();
  render();
});

window.addEventListener("popstate", () => {
  suppressUrlSync = true;
  readStateFromUrl();
  render();
  suppressUrlSync = false;
});

readStateFromUrl();
render();
