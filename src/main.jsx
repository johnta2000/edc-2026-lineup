import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import lineupData from "../lineup-data.js";
import "./styles.css";

const { dayOrder, stageOrder, schedule } = lineupData;

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


function normalizeText(value) {
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

  return (hour < 12 ? hour + 24 : hour) * 60 + minute;
}

function compareSets(left, right) {
  return (
    dayOrder.indexOf(left.day) - dayOrder.indexOf(right.day) ||
    left.timeMinutes - right.timeMinutes ||
    stageOrder.indexOf(left.stage) - stageOrder.indexOf(right.stage) ||
    left.artist.localeCompare(right.artist, undefined, { sensitivity: "base" })
  );
}

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

const sets = schedule
  .map((set) => ({
    ...set,
    genre: getGenre(set),
    displayTime: formatTime(set.time),
    timeMinutes: getTimeMinutes(set.time),
  }))
  .sort(compareSets);

const genreOrder = [...new Set(sets.map((set) => set.genre))].sort((left, right) =>
  left.localeCompare(right, undefined, { sensitivity: "base" })
);

const timeBounds = {
  min: Math.min(...sets.map((set) => set.timeMinutes)),
  max: Math.max(...sets.map((set) => set.timeMinutes)),
};

const genreClassNames = {
  DNB: "genre-dnb",
  Dubstep: "genre-dubstep",
  Hardcore: "genre-hardcore",
  Hardstyle: "genre-hardstyle",
  Other: "genre-other",
  Techno: "genre-techno",
  "Tech House": "genre-tech-house",
  Trance: "genre-trance",
};

const dayClassNames = {
  Friday: "day-friday",
  Saturday: "day-saturday",
  Sunday: "day-sunday",
};

const dayLabels = {
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

const columnConfig = [
  { key: "day", label: "Day", className: "col-day", defaultWidth: 112, minWidth: 72 },
  { key: "time", label: "Start Time", className: "col-time", defaultWidth: 118, minWidth: 88 },
  { key: "stage", label: "Stage", className: "col-stage", defaultWidth: 200, minWidth: 120 },
  { key: "artist", label: "Artist", className: "col-artist", defaultWidth: 420, minWidth: 180 },
  { key: "genre", label: "Genre", className: "col-genre", defaultWidth: 154, minWidth: 94 },
];

function isFullTimeRange(filters) {
  return filters.timeMin === timeBounds.min && filters.timeMax === timeBounds.max;
}

function clampTime(value) {
  return Math.max(timeBounds.min, Math.min(timeBounds.max, value));
}

function readFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const timeStart = Number(params.get("start"));
  const timeEnd = Number(params.get("end"));
  const timeMin =
    Number.isFinite(timeStart) && timeStart >= timeBounds.min && timeStart <= timeBounds.max
      ? timeStart
      : timeBounds.min;
  const timeMax =
    Number.isFinite(timeEnd) && timeEnd >= timeBounds.min && timeEnd <= timeBounds.max
      ? timeEnd
      : timeBounds.max;

  return {
    query: params.get("search") ?? params.get("q") ?? "",
    daySearch: params.get("daySearch") ?? "",
    stageSearch: params.get("stageSearch") ?? "",
    genreSearch: params.get("genreSearch") ?? "",
    days: (params.get("days") ?? params.get("day") ?? "")
      .split(",")
      .filter((day) => dayOrder.includes(day)),
    stages: (params.get("stages") ?? params.get("stage") ?? "")
      .split(",")
      .filter((stage) => stageOrder.includes(stage)),
    genres: (params.get("genres") ?? params.get("genre") ?? "")
      .split(",")
      .filter((genre) => genreOrder.includes(genre)),
    timeMin: timeMin <= timeMax ? timeMin : timeBounds.min,
    timeMax: timeMin <= timeMax ? timeMax : timeBounds.max,
  };
}

function buildStateUrl(filters, { absolute = false } = {}) {
  const params = new URLSearchParams();

  if (filters.query.trim()) {
    params.set("search", filters.query.trim());
  }

  if (filters.daySearch.trim()) {
    params.set("daySearch", filters.daySearch.trim());
  }

  if (filters.stageSearch.trim()) {
    params.set("stageSearch", filters.stageSearch.trim());
  }

  if (filters.genreSearch.trim()) {
    params.set("genreSearch", filters.genreSearch.trim());
  }

  if (filters.days.length) {
    params.set("days", filters.days.join(","));
  }

  if (filters.stages.length) {
    params.set("stages", filters.stages.join(","));
  }

  if (filters.genres.length) {
    params.set("genres", filters.genres.join(","));
  }

  if (!isFullTimeRange(filters)) {
    params.set("start", String(filters.timeMin));
    params.set("end", String(filters.timeMax));
  }

  const nextUrl = new URL(window.location.href);
  nextUrl.search = params.toString();
  nextUrl.hash = "";

  return absolute ? nextUrl.href : `${nextUrl.pathname}${nextUrl.search}`;
}

function copyTextToClipboard(value) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(value);
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    return Promise.reject(new Error("Copy command failed"));
  }

  return Promise.resolve();
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

function App() {
  const [filters, setFilters] = useState(readFiltersFromUrl);
  const [openFilter, setOpenFilter] = useState("");
  const [shareStatus, setShareStatus] = useState("idle");
  const toolbarRef = useRef(null);

  const updateFilters = (patch) => {
    setFilters((current) => ({ ...current, ...patch }));
  };

  useEffect(() => {
    window.history.replaceState({}, "", buildStateUrl(filters));
    setShareStatus("idle");
  }, [filters]);

  useEffect(() => {
    const handlePopState = () => setFilters(readFiltersFromUrl());
    const handlePointerDown = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setOpenFilter("");
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenFilter("");
      }
    };

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (shareStatus === "idle") {
      return undefined;
    }

    const timeout = window.setTimeout(() => setShareStatus("idle"), 1800);
    return () => window.clearTimeout(timeout);
  }, [shareStatus]);

  const filteredSets = useMemo(() => {
    const query = normalizeText(filters.query.trim());
    const activeDays = new Set(filters.days);
    const activeStages = new Set(filters.stages);
    const activeGenres = new Set(filters.genres);

    return sets.filter((set) => {
      const matchesDay = !activeDays.size || activeDays.has(set.day);
      const matchesStage = !activeStages.size || activeStages.has(set.stage);
      const matchesGenre = !activeGenres.size || activeGenres.has(set.genre);
      const matchesTime =
        set.timeMinutes >= filters.timeMin && set.timeMinutes <= filters.timeMax;
      const haystack = normalizeText(
        `${set.day} ${set.time} ${set.displayTime} ${set.stage} ${set.artist} ${set.genre}`
      );
      const matchesSearch = !query || haystack.includes(query);

      return matchesDay && matchesStage && matchesGenre && matchesTime && matchesSearch;
    });
  }, [filters]);
  const shareUrl = buildStateUrl(filters);
  const hasSharedViewParams = shareUrl.includes("?");

  const clearFilters = () => {
    setOpenFilter("");
    setFilters({
      query: "",
      daySearch: "",
      stageSearch: "",
      genreSearch: "",
      days: [],
      stages: [],
      genres: [],
      timeMin: timeBounds.min,
      timeMax: timeBounds.max,
    });
  };

  const shareCurrentView = async () => {
    try {
      await copyTextToClipboard(buildStateUrl(filters, { absolute: true }));
      setShareStatus("copied");
    } catch (error) {
      setShareStatus("failed");
    }
  };

  return (
    <main className="app-page">
      <section className="schedule-shell">
        <header className="app-header">
          <div>
            <h1>EDC Las Vegas 2026 Set Times</h1>
            <p className="summary">
              {filteredSets.length} of {sets.length} sets shown
            </p>
          </div>
        </header>

        <section className="toolbar" aria-label="Schedule filters" ref={toolbarRef}>
          <input
            className="search-field"
            type="search"
            value={filters.query}
            placeholder="Search artist, time, stage, or day"
            autoComplete="off"
            onChange={(event) => updateFilters({ query: event.target.value })}
          />

          <MultiSelectFilter
            id="day"
            label="days"
            options={dayOrder}
            values={filters.days}
            searchValue={filters.daySearch}
            open={openFilter === "day"}
            onOpenChange={(open) => setOpenFilter(open ? "day" : "")}
            onSearchChange={(daySearch) => updateFilters({ daySearch })}
            onValuesChange={(days) => updateFilters({ days })}
          />

          <MultiSelectFilter
            id="stage"
            label="stages"
            options={stageOrder}
            values={filters.stages}
            searchValue={filters.stageSearch}
            open={openFilter === "stage"}
            onOpenChange={(open) => setOpenFilter(open ? "stage" : "")}
            onSearchChange={(stageSearch) => updateFilters({ stageSearch })}
            onValuesChange={(stages) => updateFilters({ stages })}
          />

          <MultiSelectFilter
            id="genre"
            label="genres"
            options={genreOrder}
            values={filters.genres}
            searchValue={filters.genreSearch}
            open={openFilter === "genre"}
            onOpenChange={(open) => setOpenFilter(open ? "genre" : "")}
            onSearchChange={(genreSearch) => updateFilters({ genreSearch })}
            onValuesChange={(genres) => updateFilters({ genres })}
          />

          <TimeFilter
            open={openFilter === "time"}
            min={filters.timeMin}
            max={filters.timeMax}
            onOpenChange={(open) => setOpenFilter(open ? "time" : "")}
            onRangeChange={(timeMin, timeMax) => updateFilters({ timeMin, timeMax })}
          />

          <button className="toolbar-button" type="button" onClick={clearFilters}>
            Clear
          </button>

          <div className="share-control">
            <button
              className={`toolbar-button share-button ${shareStatus === "copied" ? "is-copied" : ""}`}
              type="button"
              onClick={shareCurrentView}
              aria-describedby={shareStatus !== "idle" ? "share-popover" : undefined}
            >
              {shareStatus === "copied" ? (
                "Copied"
              ) : (
                <>
                  <span className="share-label-full">
                    {hasSharedViewParams ? "Share View" : "Share"}
                  </span>
                  <span className="share-label-short">Share</span>
                </>
              )}
            </button>
            {shareStatus !== "idle" ? (
              <div className="share-popover" id="share-popover" role="status">
                {shareStatus === "copied"
                  ? hasSharedViewParams
                    ? "Link copied. It includes the current search, day, stage, genre, and time filters in the URL query."
                    : "Link copied."
                  : hasSharedViewParams
                    ? "Could not copy the link. Your filters are still stored in the URL query."
                    : "Could not copy the link."}
              </div>
            ) : null}
          </div>
        </section>

        <ScheduleTable sets={filteredSets} />
      </section>
    </main>
  );
}

function MultiSelectFilter({
  id,
  label,
  options,
  values,
  searchValue,
  open,
  onOpenChange,
  onSearchChange,
  onValuesChange,
}) {
  const selectedValues = new Set(values);
  const filteredOptions = options.filter((option) =>
    normalizeText(option).includes(normalizeText(searchValue))
  );

  const toggleValue = (value, checked) => {
    if (checked && !selectedValues.has(value)) {
      onValuesChange([...values, value]);
      return;
    }

    if (!checked) {
      onValuesChange(values.filter((selected) => selected !== value));
    }
  };

  return (
    <div className={`dropdown-filter ${id}-filter`}>
      <button
        className={`control-button ${open ? "is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-filter-panel`}
        onClick={(event) => {
          event.stopPropagation();
          onOpenChange(!open);
        }}
      >
        <span>{summarizeMultiSelect(values, label)}</span>
        <span className="dropdown-caret">{open ? "⌃" : "⌄"}</span>
      </button>

      {open ? (
        <div
          className="dropdown-panel"
          id={`${id}-filter-panel`}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <input
            className="panel-search"
            type="search"
            value={searchValue}
            placeholder={`Search ${label}`}
            autoComplete="off"
            onChange={(event) => onSearchChange(event.target.value)}
          />

          <div className="option-list">
            <label className={`option-row ${values.length === 0 ? "is-selected" : ""}`}>
              <input
                type="checkbox"
                checked={values.length === 0}
                onChange={() => {
                  onValuesChange([]);
                  onSearchChange("");
                }}
              />
              <span>All {label}</span>
            </label>

            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <label
                  className={`option-row ${selectedValues.has(option) ? "is-selected" : ""}`}
                  key={option}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.has(option)}
                    onChange={(event) => toggleValue(option, event.target.checked)}
                  />
                  <span>{option}</span>
                </label>
              ))
            ) : (
              <div className="empty-panel">No matches</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TimeFilter({ open, min, max, onOpenChange, onRangeChange }) {
  const [minText, setMinText] = useState(timeFromMinutes(min));
  const [maxText, setMaxText] = useState(timeFromMinutes(max));
  const fullRange = min === timeBounds.min && max === timeBounds.max;

  useEffect(() => {
    setMinText(timeFromMinutes(min));
    setMaxText(timeFromMinutes(max));
  }, [min, max, open]);

  const applyTypedTime = (value, boundary) => {
    const parsed = parseTimeInput(value);

    if (parsed === null) {
      setMinText(timeFromMinutes(min));
      setMaxText(timeFromMinutes(max));
      return;
    }

    if (boundary === "min") {
      onRangeChange(Math.min(clampTime(parsed), max), max);
    } else {
      onRangeChange(min, Math.max(clampTime(parsed), min));
    }
  };

  return (
    <div className="dropdown-filter time-filter">
      <button
        className={`control-button ${open ? "is-open" : ""}`}
        type="button"
        aria-expanded={open}
        aria-controls="time-filter-panel"
        onClick={(event) => {
          event.stopPropagation();
          onOpenChange(!open);
        }}
      >
        <span>{fullRange ? "Set Start Times" : `${timeFromMinutes(min)} - ${timeFromMinutes(max)}`}</span>
        <span className="dropdown-caret">{open ? "⌃" : "⌄"}</span>
      </button>

      {open ? (
        <div
          className="dropdown-panel time-panel"
          id="time-filter-panel"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="panel-head">
            <div>
              <h2>Set Start Times</h2>
            </div>
            <button className="time-close" type="button" aria-label="Close time filter" onClick={() => onOpenChange(false)}>
              ×
            </button>
          </div>
          <p className="time-subtitle">Start time range</p>

          <div className="time-input-grid">
            <label>
              <span>From</span>
              <input
                type="text"
                value={minText}
                onChange={(event) => setMinText(event.target.value)}
                onBlur={() => applyTypedTime(minText, "min")}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    applyTypedTime(minText, "min");
                    event.currentTarget.blur();
                  }
                }}
              />
            </label>
            <label>
              <span>To</span>
              <input
                type="text"
                value={maxText}
                onChange={(event) => setMaxText(event.target.value)}
                onBlur={() => applyTypedTime(maxText, "max")}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    applyTypedTime(maxText, "max");
                    event.currentTarget.blur();
                  }
                }}
              />
            </label>
          </div>

          <div className="range-control">
            <div className="range-track" />
            <div
              className="range-fill"
              style={{
                left: `${((min - timeBounds.min) / (timeBounds.max - timeBounds.min)) * 100}%`,
                right: `${
                  100 - ((max - timeBounds.min) / (timeBounds.max - timeBounds.min)) * 100
                }%`,
              }}
            />
            <input
              className="range-input"
              type="range"
              min={timeBounds.min}
              max={timeBounds.max}
              value={min}
              onChange={(event) => onRangeChange(Math.min(Number(event.target.value), max), max)}
            />
            <input
              className="range-input"
              type="range"
              min={timeBounds.min}
              max={timeBounds.max}
              value={max}
              onChange={(event) => onRangeChange(min, Math.max(Number(event.target.value), min))}
            />
          </div>

          <button
            className="text-button"
            type="button"
            onClick={() => onRangeChange(timeBounds.min, timeBounds.max)}
          >
            Reset times
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ResizableHeader({ column, width, onResizeStart, resizable }) {
  return (
    <th className={`${column.className} resizable-header`} style={{ width }}>
      <span className="header-label">{column.label}</span>
      {resizable ? (
        <span
          className="column-resize-handle"
          aria-hidden="true"
          onPointerDown={(event) => onResizeStart(event, column.key)}
        />
      ) : null}
    </th>
  );
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

function ScheduleTable({ sets: visibleSets }) {
  const [columnWidths, setColumnWidths] = useState(() =>
    Object.fromEntries(columnConfig.map((column) => [column.key, column.defaultWidth]))
  );
  const resizeState = useRef(null);
  const isDesktopTable = useMediaQuery("(min-width: 761px)");

  const startColumnResize = (event, key) => {
    event.preventDefault();

    if (!isDesktopTable) {
      return;
    }

    const columnIndex = columnConfig.findIndex((column) => column.key === key);
    const nextColumn = columnConfig[columnIndex + 1];

    if (!nextColumn) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    resizeState.current = {
      key,
      nextKey: nextColumn.key,
      startX: event.clientX,
      startWidth: columnWidths[key],
      startNextWidth: columnWidths[nextColumn.key],
    };
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!resizeState.current) {
        return;
      }

      const column = columnConfig.find(({ key }) => key === resizeState.current.key);
      const nextColumn = columnConfig.find(
        ({ key }) => key === resizeState.current.nextKey
      );
      const rawDelta = event.clientX - resizeState.current.startX;
      const minDelta = column.minWidth - resizeState.current.startWidth;
      const maxDelta = resizeState.current.startNextWidth - nextColumn.minWidth;
      const delta = Math.max(minDelta, Math.min(maxDelta, rawDelta));
      const nextWidth = Math.round(resizeState.current.startWidth + delta);
      const nextColumnWidth = Math.round(
        resizeState.current.startNextWidth - delta
      );

      setColumnWidths((current) => ({
        ...current,
        [resizeState.current.key]: nextWidth,
        [resizeState.current.nextKey]: nextColumnWidth,
      }));
    };

    const stopResize = () => {
      resizeState.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopResize);
      window.removeEventListener("pointercancel", stopResize);
    };
  }, []);

  return (
    <div className="table-wrap">
      <table>
        <colgroup>
          {columnConfig.map((column) => (
            <col
              className={column.className}
              key={column.key}
              style={isDesktopTable ? { width: columnWidths[column.key] } : undefined}
            />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columnConfig.map((column, index) => (
              <ResizableHeader
                column={column}
                key={column.key}
                width={columnWidths[column.key]}
                onResizeStart={startColumnResize}
                resizable={index < columnConfig.length - 1}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleSets.length ? (
            visibleSets.map((set) => (
              <tr key={`${set.day}-${set.stage}-${set.time}-${set.artist}`}>
                <td className="day-cell">
                  <span className={`day-badge ${dayClassNames[set.day] ?? ""}`}>
                    {dayLabels[set.day] ?? set.day}
                  </span>
                </td>
                <td className="time-cell">{set.displayTime}</td>
                <td className="stage-cell">{set.stage}</td>
                <td className="artist-cell">{set.artist}</td>
                <td>
                  <span className={`genre-badge ${genreClassNames[set.genre] ?? "genre-other"}`}>
                    {set.genre}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="empty-row" colSpan="5">
                No sets match those filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const rootElement = document.querySelector("#root");
const root = window.__EDC_ROOT__ ?? createRoot(rootElement);
window.__EDC_ROOT__ = root;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
