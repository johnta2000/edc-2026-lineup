import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import lineupData from "../lineup-data.js";
import "./styles.css";

const { dayOrder, stageOrder, schedule } = lineupData;
const FALLBACK_SET_DURATION_MINUTES = 60;

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

function getSetId(set) {
  return `${set.day}|${set.stage}|${set.time}|${set.artist}`;
}

function addInferredEndTimes(baseSets) {
  const setsByDayAndStage = new Map();

  baseSets.forEach((set) => {
    const key = `${set.day}|${set.stage}`;
    setsByDayAndStage.set(key, [...(setsByDayAndStage.get(key) ?? []), set]);
  });

  const endTimesById = new Map();

  setsByDayAndStage.forEach((stageSets) => {
    [...stageSets]
      .sort((left, right) => left.timeMinutes - right.timeMinutes)
      .forEach((set, index, sortedSets) => {
        const nextSet = sortedSets[index + 1];
        const inferredEnd = nextSet?.timeMinutes ?? set.timeMinutes + FALLBACK_SET_DURATION_MINUTES;

        endTimesById.set(getSetId(set), Math.max(set.timeMinutes + 15, inferredEnd));
      });
  });

  return baseSets.map((set) => {
    const id = getSetId(set);
    const endTimeMinutes =
      endTimesById.get(id) ?? set.timeMinutes + FALLBACK_SET_DURATION_MINUTES;

    return {
      ...set,
      id,
      endTimeMinutes,
      endDisplayTime: timeFromMinutes(endTimeMinutes),
      displayRange: `${set.displayTime} - ${timeFromMinutes(endTimeMinutes)}`,
      durationMinutes: endTimeMinutes - set.timeMinutes,
    };
  });
}

function getOverlapMinutes(left, right) {
  if (left.id === right.id || left.day !== right.day || left.stage === right.stage) {
    return 0;
  }

  return Math.max(
    0,
    Math.min(left.endTimeMinutes, right.endTimeMinutes) -
      Math.max(left.timeMinutes, right.timeMinutes)
  );
}

function getConflictDetails(set, comparisonSets = sets) {
  return comparisonSets
    .map((candidate) => ({
      set: candidate,
      overlapMinutes: getOverlapMinutes(set, candidate),
    }))
    .filter((conflict) => conflict.overlapMinutes > 0)
    .sort(
      (left, right) =>
        left.set.timeMinutes - right.set.timeMinutes ||
        right.overlapMinutes - left.overlapMinutes ||
        stageOrder.indexOf(left.set.stage) - stageOrder.indexOf(right.set.stage) ||
        left.set.artist.localeCompare(right.set.artist, undefined, { sensitivity: "base" })
    );
}

const sets = addInferredEndTimes(
  schedule.map((set) => ({
    ...set,
    genre: getGenre(set),
    displayTime: formatTime(set.time),
    timeMinutes: getTimeMinutes(set.time),
  }))
).sort(compareSets);

const conflictIndex = new Map(sets.map((set) => [set.id, getConflictDetails(set)]));

const conflictCountById = new Map(
  sets.map((set) => [set.id, conflictIndex.get(set.id)?.length ?? 0])
);

const setsWithConflicts = sets.filter((set) => (conflictCountById.get(set.id) ?? 0) > 0).length;

const setsWithoutConflicts = sets.length - setsWithConflicts;

const scheduleCoverageSummary = `${setsWithConflicts} sets with conflicts, ${setsWithoutConflicts} clear`;

const setsById = new Map(sets.map((set) => [set.id, set]));

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

const dayDates = {
  Friday: "May 15",
  Saturday: "May 16",
  Sunday: "May 17",
};

const wallpaperStageOrder = [
  "Kinetic Field",
  "Circuit Grounds",
  "Cosmic Meadow",
  "Neon Garden",
  "Basspod",
  "Wasteland",
  "Quantum Valley",
  "Bionic Jungle",
  "Stereo Bloom",
];

const wallpaperThemes = {
  Friday: {
    accent: "#ff2bd6",
    accentDark: "#1aa7ff",
    accentSoft: "#7cf8ff",
    glow: "#0d46c8",
    secondaryGlow: "#451067",
    dayFill: "#ffffff",
  },
  Saturday: {
    accent: "#24e4ff",
    accentDark: "#ff2bd6",
    accentSoft: "#fff06a",
    glow: "#0830a8",
    secondaryGlow: "#5b0f73",
    dayFill: "#e9fbff",
  },
  Sunday: {
    accent: "#fff34f",
    accentDark: "#ff2f90",
    accentSoft: "#7cf8ff",
    glow: "#1237b5",
    secondaryGlow: "#5c0d68",
    dayFill: "#fff6bd",
  },
};

const wallpaperStagePalette = [
  { start: "#13c9ff", end: "#ff2bd6", label: "#05040c" },
  { start: "#ff2bd6", end: "#fff34f", label: "#06040a" },
  { start: "#7cf8ff", end: "#1f7dff", label: "#05040c" },
  { start: "#ff7a18", end: "#ff2bd6", label: "#07030a" },
  { start: "#a8ff3e", end: "#24e4ff", label: "#041014" },
  { start: "#fff34f", end: "#ff7a18", label: "#08050a" },
  { start: "#875cff", end: "#24e4ff", label: "#05040c" },
  { start: "#ff2f90", end: "#875cff", label: "#06040a" },
  { start: "#24e4ff", end: "#fff34f", label: "#05040c" },
];

const wallpaperSize = {
  width: 1290,
  height: 2796,
};

const columnConfig = [
  { key: "day", label: "Day", className: "col-day", defaultWidth: 112, minWidth: 72 },
  { key: "time", label: "Start Time", className: "col-time", defaultWidth: 118, minWidth: 88 },
  { key: "stage", label: "Stage", className: "col-stage", defaultWidth: 200, minWidth: 120 },
  { key: "artist", label: "Artist", className: "col-artist", defaultWidth: 420, minWidth: 180 },
  { key: "genre", label: "Genre", className: "col-genre", defaultWidth: 154, minWidth: 94 },
  { key: "conflicts", label: "Conflicts", className: "col-conflicts", defaultWidth: 156, minWidth: 110 },
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

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getApproxTextWidth(value, fontSize) {
  return value.length * fontSize * 0.56;
}

function truncateSvgText(value, fontSize, maxWidth) {
  if (getApproxTextWidth(value, fontSize) <= maxWidth) {
    return value;
  }

  const ellipsis = "...";
  const maxCharacters = Math.max(
    4,
    Math.floor((maxWidth - getApproxTextWidth(ellipsis, fontSize)) / (fontSize * 0.56))
  );

  return `${value.slice(0, maxCharacters).trimEnd()}${ellipsis}`;
}

function makeWallpaperSvg(day) {
  const theme = wallpaperThemes[day] ?? wallpaperThemes.Friday;
  const daySets = sets.filter((set) => set.day === day);
  const setsByStage = new Map(
    wallpaperStageOrder.map((stage) => [
      stage,
      daySets
        .filter((set) => set.stage === stage)
        .sort((left, right) => left.timeMinutes - right.timeMinutes),
    ])
  );
  const { width, height } = wallpaperSize;
  const pagePad = 42;
  const safeZoneBottom = Math.round(height * 0.25);
  const titleTop = safeZoneBottom + 54;
  const gridTop = safeZoneBottom + 178;
  const gridBottom = height - 28;
  const gridGap = 14;
  const cardWidth = (width - pagePad * 2 - gridGap * 2) / 3;
  const cardHeight = (gridBottom - gridTop - gridGap * 2) / 3;
  const stageHeaderHeight = 48;
  const rows = wallpaperStageOrder
    .map((stage, index) => {
      const stageTheme = wallpaperStagePalette[index % wallpaperStagePalette.length];
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = pagePad + col * (cardWidth + gridGap);
      const y = gridTop + row * (cardHeight + gridGap);
      const stageSets = setsByStage.get(stage) ?? [];
      const contentTop = y + stageHeaderHeight + 42;
      const availableHeight = cardHeight - stageHeaderHeight - 66;
      const rowStep = Math.min(52, availableHeight / Math.max(stageSets.length, 1));
      const timeFontSize = stageSets.length > 10 ? 21 : 22;
      const artistBaseSize = stageSets.length > 10 ? 28 : 30;
      const artistX = x + 98;
      const artistMaxWidth = cardWidth - 120;
      const textRows = stageSets
        .map((set, setIndex) => {
          const yPos = contentTop + setIndex * rowStep;
          const artist = truncateSvgText(set.artist, artistBaseSize, artistMaxWidth);

          return `
            <line x1="${x + 16}" x2="${x + cardWidth - 16}" y1="${yPos + 17}" y2="${yPos + 17}" stroke="#7cf8ff" stroke-opacity="0.08"/>
            <text x="${x + 16}" y="${yPos}" fill="${stageTheme.end}" font-size="${timeFontSize}" font-weight="800" font-family="Arial Narrow, Arial, sans-serif">${escapeXml(set.displayTime.replace(" ", ""))}</text>
            <text x="${artistX}" y="${yPos}" fill="#ffffff" font-size="${artistBaseSize}" font-weight="800" font-family="Arial Narrow, Arial, sans-serif">${escapeXml(artist)}</text>
          `;
        })
        .join("");

      return `
        <g>
          <rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="7" fill="url(#cardGradient)" stroke="${stageTheme.start}" stroke-opacity="0.72"/>
          <rect x="${x}" y="${y}" width="${cardWidth}" height="${stageHeaderHeight}" rx="7" fill="url(#stageGradient${index})"/>
          <rect x="${x}" y="${y + stageHeaderHeight - 7}" width="${cardWidth}" height="7" fill="${stageTheme.end}"/>
          <text x="${x + 16}" y="${y + 33}" fill="${stageTheme.label}" font-size="22" font-weight="900" letter-spacing="2.1" font-family="Arial Black, Impact, Arial, sans-serif">${escapeXml(stage.toUpperCase())}</text>
          ${textRows}
        </g>
      `;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="21%" r="72%">
          <stop offset="0%" stop-color="${theme.glow}"/>
          <stop offset="48%" stop-color="${theme.secondaryGlow}"/>
          <stop offset="100%" stop-color="#05040c"/>
        </radialGradient>
        <linearGradient id="stageGradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="${theme.accentDark}"/>
          <stop offset="100%" stop-color="${theme.accent}"/>
        </linearGradient>
        ${wallpaperStagePalette
          .map(
            (stageTheme, index) => `
        <linearGradient id="stageGradient${index}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="${stageTheme.start}"/>
          <stop offset="100%" stop-color="${stageTheme.end}"/>
        </linearGradient>`
          )
          .join("")}
        <linearGradient id="cardGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#050b28" stop-opacity="0.96"/>
          <stop offset="48%" stop-color="#090724" stop-opacity="0.91"/>
          <stop offset="100%" stop-color="#03030b" stop-opacity="0.98"/>
        </linearGradient>
        <pattern id="edcRays" width="86" height="86" patternUnits="userSpaceOnUse">
          <path d="M0 43 H86 M43 0 V86" stroke="#24e4ff" stroke-opacity="0.08" stroke-width="2"/>
        </pattern>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="34"/>
        </filter>
      </defs>

      <rect width="${width}" height="${height}" fill="url(#bgGlow)"/>
      <rect width="${width}" height="${height}" fill="url(#edcRays)" opacity="0.45"/>
      <circle cx="645" cy="300" r="560" fill="#24e4ff" opacity="0.14" filter="url(#softGlow)"/>
      <circle cx="1065" cy="1210" r="430" fill="#ff2bd6" opacity="0.18" filter="url(#softGlow)"/>
      <circle cx="205" cy="2190" r="380" fill="#fff34f" opacity="0.1" filter="url(#softGlow)"/>
      <path d="M-120 672 C238 420 1052 420 1410 672" fill="none" stroke="#24e4ff" stroke-width="12" stroke-opacity="0.42"/>
      <path d="M-100 712 C246 492 1044 492 1390 712" fill="none" stroke="#ff2bd6" stroke-width="7" stroke-opacity="0.48"/>
      <path d="M-80 752 C254 564 1036 564 1370 752" fill="none" stroke="#fff34f" stroke-width="4" stroke-opacity="0.34"/>
      <g opacity="0.8">
        <circle cx="104" cy="628" r="16" fill="#fff34f"/>
        <circle cx="140" cy="650" r="12" fill="#ff2bd6"/>
        <circle cx="1116" cy="626" r="18" fill="#24e4ff"/>
        <circle cx="1160" cy="654" r="12" fill="#fff34f"/>
      </g>

      <text x="${pagePad}" y="92" fill="${theme.accentSoft}" font-size="22" font-weight="900" letter-spacing="3" font-family="Arial Narrow, Arial, sans-serif">${escapeXml(dayDates[day])}</text>
      <text x="${pagePad}" y="${titleTop}" fill="${theme.accentSoft}" font-size="18" font-weight="900" letter-spacing="5" font-family="Arial Black, Impact, Arial, sans-serif">EDC LAS VEGAS 2026</text>
      <text x="${pagePad}" y="${titleTop + 72}" fill="${theme.dayFill}" font-size="78" font-weight="900" letter-spacing="0" font-family="Arial Black, Impact, Arial, sans-serif">${escapeXml(day.toUpperCase())}</text>
      <line x1="${pagePad}" x2="${width - pagePad}" y1="${gridTop - 32}" y2="${gridTop - 32}" stroke="#24e4ff" stroke-opacity="0.52"/>

      ${rows}

    </svg>`;
}

function makeWallpaperDataUrl(day) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(makeWallpaperSvg(day))}`;
}

function downloadDayWallpaper(day) {
  const image = new Image();
  const url = makeWallpaperDataUrl(day);

  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = wallpaperSize.width;
    canvas.height = wallpaperSize.height;

    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `edc-las-vegas-2026-${day.toLowerCase()}-phone-wallpaper.png`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    }, "image/png");
  };

  image.src = url;
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
  const [wallpaperOpen, setWallpaperOpen] = useState(false);
  const [selectedConflictSetId, setSelectedConflictSetId] = useState("");
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

  const selectedConflictSet = selectedConflictSetId
    ? setsById.get(selectedConflictSetId)
    : null;
  const selectedConflictIsVisible =
    selectedConflictSet && filteredSets.some((set) => set.id === selectedConflictSet.id);
  const comparisonSet = selectedConflictIsVisible ? selectedConflictSet : null;
  const comparisonConflicts = comparisonSet ? conflictIndex.get(comparisonSet.id) ?? [] : [];
  const compareSet = (setId) => {
    setSelectedConflictSetId((currentSetId) => (currentSetId === setId ? "" : setId));
  };
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
              {filteredSets.length} of {sets.length} sets shown · {scheduleCoverageSummary}
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

        {comparisonSet ? (
          <ConflictComparison
            set={comparisonSet}
            conflicts={comparisonConflicts}
            onClose={() => setSelectedConflictSetId("")}
          />
        ) : null}

        <ScheduleTable
          sets={filteredSets}
          comparisonSetId={comparisonSet?.id ?? ""}
          conflictIndex={conflictIndex}
          onCompareSet={compareSet}
        />
      </section>
      <button className="wallpaper-launcher" type="button" onClick={() => setWallpaperOpen(true)}>
        Wallpapers
      </button>
      {wallpaperOpen ? <WallpaperDownloads onClose={() => setWallpaperOpen(false)} /> : null}
    </main>
  );
}

function WallpaperDownloads({ onClose }) {
  const previewUrls = useMemo(
    () => Object.fromEntries(dayOrder.map((day) => [day, makeWallpaperDataUrl(day)])),
    []
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="wallpaper-modal-backdrop"
      role="presentation"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="wallpaper-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wallpaper-title"
      >
        <div className="wallpaper-section-head">
          <div>
            <h2 id="wallpaper-title">Schedule Wallpapers</h2>
            <p>Lock screen PNGs of the full schedule</p>
          </div>
          <button className="wallpaper-close" type="button" aria-label="Close wallpapers" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="wallpaper-grid">
          {dayOrder.map((day) => (
            <article className={`wallpaper-card wallpaper-${day.toLowerCase()}`} key={day}>
              <div className="wallpaper-preview-wrap">
                <img
                  className="wallpaper-preview"
                  src={previewUrls[day]}
                  width={wallpaperSize.width}
                  height={wallpaperSize.height}
                  alt={`${day} EDC Las Vegas 2026 phone wallpaper preview`}
                  loading="lazy"
                />
              </div>
              <div className="wallpaper-card-footer">
                <div>
                  <h3>{day}</h3>
                  <span>All stages</span>
                </div>
                <button type="button" onClick={() => downloadDayWallpaper(day)}>
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ConflictComparison({ set, conflicts, onClose }) {
  const timeScopeSets = conflicts.length ? conflicts.map((conflict) => conflict.set) : [set];
  const scopedTimeMin = Math.min(...timeScopeSets.map((conflictSet) => conflictSet.timeMinutes));
  const scopedTimeMax = Math.max(...timeScopeSets.map((conflictSet) => conflictSet.endTimeMinutes));
  const conflictGenreOptions = [...new Set(conflicts.map((conflict) => conflict.set.genre))].sort(
    (left, right) => left.localeCompare(right, undefined, { sensitivity: "base" })
  );
  const [conflictQuery, setConflictQuery] = useState("");
  const [conflictGenres, setConflictGenres] = useState([]);
  const [conflictGenreSearch, setConflictGenreSearch] = useState("");
  const [conflictTimeMin, setConflictTimeMin] = useState(scopedTimeMin);
  const [conflictTimeMax, setConflictTimeMax] = useState(scopedTimeMax);
  const [conflictTimeMinText, setConflictTimeMinText] = useState(timeFromMinutes(scopedTimeMin));
  const [conflictTimeMaxText, setConflictTimeMaxText] = useState(timeFromMinutes(scopedTimeMax));
  const [openConflictFilter, setOpenConflictFilter] = useState("");
  const conflictModalRef = useRef(null);
  const scopedTimeSpan = Math.max(1, scopedTimeMax - scopedTimeMin);
  const normalizedConflictQuery = normalizeText(conflictQuery.trim());
  const activeConflictGenres = new Set(conflictGenres);
  const hasActiveConflictFilters =
    Boolean(normalizedConflictQuery) ||
    Boolean(conflictGenres.length) ||
    conflictTimeMin !== scopedTimeMin ||
    conflictTimeMax !== scopedTimeMax;
  const filteredConflicts = conflicts.filter((conflict) => {
    const matchesQuery =
      !normalizedConflictQuery ||
      normalizeText(
        `${conflict.set.artist} ${conflict.set.stage} ${conflict.set.genre} ${conflict.set.displayTime} ${conflict.set.displayRange}`
      ).includes(normalizedConflictQuery);
    const matchesGenre =
      !activeConflictGenres.size || activeConflictGenres.has(conflict.set.genre);
    const matchesTime =
      conflict.set.endTimeMinutes > conflictTimeMin &&
      conflict.set.timeMinutes < conflictTimeMax;

    return matchesQuery && matchesGenre && matchesTime;
  });
  const conflictLabel = `${conflicts.length} Conflict${conflicts.length === 1 ? "" : "s"} On ${set.day}`;
  const comparisonRows = [
    { set, isSelected: true },
    ...filteredConflicts.map((conflict) => ({
      set: conflict.set,
      isSelected: false,
    })),
  ];
  const filteredConflictLabel = hasActiveConflictFilters
    ? `${filteredConflicts.length} of ${conflicts.length} shown`
    : `${conflicts.length} shown`;
  const conflictTimeFullRange =
    conflictTimeMin === scopedTimeMin && conflictTimeMax === scopedTimeMax;
  const conflictTimeButtonLabel = conflictTimeFullRange
    ? "Set Start Times"
    : `${timeFromMinutes(conflictTimeMin)} - ${timeFromMinutes(conflictTimeMax)}`;

  const applyTypedConflictTime = (value, boundary) => {
    const parsed = parseTimeInput(value);

    if (parsed === null) {
      setConflictTimeMinText(timeFromMinutes(conflictTimeMin));
      setConflictTimeMaxText(timeFromMinutes(conflictTimeMax));
      return;
    }

    const nextValue = Math.max(scopedTimeMin, Math.min(scopedTimeMax, parsed));

    if (boundary === "min") {
      const nextMin = Math.min(nextValue, conflictTimeMax);
      setConflictTimeMin(nextMin);
      setConflictTimeMinText(timeFromMinutes(nextMin));
    } else {
      const nextMax = Math.max(nextValue, conflictTimeMin);
      setConflictTimeMax(nextMax);
      setConflictTimeMaxText(timeFromMinutes(nextMax));
    }
  };

  const updateConflictTimeMin = (value) => {
    const nextMin = Math.min(Number(value), conflictTimeMax);
    setConflictTimeMin(nextMin);
    setConflictTimeMinText(timeFromMinutes(nextMin));
  };

  const updateConflictTimeMax = (value) => {
    const nextMax = Math.max(Number(value), conflictTimeMin);
    setConflictTimeMax(nextMax);
    setConflictTimeMaxText(timeFromMinutes(nextMax));
  };

  const resetConflictTimes = () => {
    setConflictTimeMin(scopedTimeMin);
    setConflictTimeMax(scopedTimeMax);
    setConflictTimeMinText(timeFromMinutes(scopedTimeMin));
    setConflictTimeMaxText(timeFromMinutes(scopedTimeMax));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (openConflictFilter) {
          setOpenConflictFilter("");
        } else {
          onClose();
        }
      }
    };
    const handlePointerDown = (event) => {
      if (conflictModalRef.current && !conflictModalRef.current.contains(event.target)) {
        return;
      }

      if (!event.target.closest(".dropdown-filter")) {
        setOpenConflictFilter("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [onClose, openConflictFilter]);

  return (
    <div
      className="conflict-modal-backdrop"
      role="presentation"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="conflict-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="conflict-title"
        ref={conflictModalRef}
      >
        <div className="conflict-panel-head">
          <div>
            <h2 id="conflict-title">Conflict Analysis</h2>
            <p className="conflict-subtitle">
              <span>{set ? conflictLabel : "No matching sets"}</span>
              {set ? <span>({filteredConflictLabel})</span> : null}
            </p>
          </div>
          <button
            className="conflict-close"
            type="button"
            aria-label="Close conflict analysis"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {set ? (
          <>
            <div className="conflict-filter-bar">
              <input
                className="conflict-search"
                type="search"
                value={conflictQuery}
                placeholder="Search conflicts"
                autoComplete="off"
                onChange={(event) => setConflictQuery(event.target.value)}
              />
              <MultiSelectFilter
                id="conflict-genre"
                label="genres"
                options={conflictGenreOptions}
                values={conflictGenres}
                searchValue={conflictGenreSearch}
                open={openConflictFilter === "genre"}
                onOpenChange={(open) => setOpenConflictFilter(open ? "genre" : "")}
                onSearchChange={setConflictGenreSearch}
                onValuesChange={setConflictGenres}
              />
            </div>

            <div className="dropdown-filter conflict-time-filter">
              <button
                className={`control-button ${openConflictFilter === "time" ? "is-open" : ""}`}
                type="button"
                aria-expanded={openConflictFilter === "time"}
                aria-controls="conflict-time-filter-panel"
                onClick={() =>
                  setOpenConflictFilter((openFilter) =>
                    openFilter === "time" ? "" : "time"
                  )
                }
              >
                <span>{conflictTimeButtonLabel}</span>
                <span className="dropdown-caret">
                  {openConflictFilter === "time" ? "⌃" : "⌄"}
                </span>
              </button>

              {openConflictFilter === "time" ? (
                <div className="dropdown-panel conflict-time-panel" id="conflict-time-filter-panel">
                  <p className="time-subtitle">Start time range</p>
                  <div className="time-input-grid">
                    <label>
                      <span>From</span>
                      <input
                        type="text"
                        value={conflictTimeMinText}
                        onChange={(event) => setConflictTimeMinText(event.target.value)}
                        onBlur={() => applyTypedConflictTime(conflictTimeMinText, "min")}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            applyTypedConflictTime(conflictTimeMinText, "min");
                            event.currentTarget.blur();
                          }
                        }}
                      />
                    </label>
                    <label>
                      <span>To</span>
                      <input
                        type="text"
                        value={conflictTimeMaxText}
                        onChange={(event) => setConflictTimeMaxText(event.target.value)}
                        onBlur={() => applyTypedConflictTime(conflictTimeMaxText, "max")}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            applyTypedConflictTime(conflictTimeMaxText, "max");
                            event.currentTarget.blur();
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="range-control conflict-range-control">
                    <div className="range-track" />
                    <div
                      className="range-fill"
                      style={{
                        left: `${((conflictTimeMin - scopedTimeMin) / scopedTimeSpan) * 100}%`,
                        right: `${100 - ((conflictTimeMax - scopedTimeMin) / scopedTimeSpan) * 100}%`,
                      }}
                    />
                    <input
                      className="range-input"
                      type="range"
                      min={scopedTimeMin}
                      max={scopedTimeMax}
                      value={conflictTimeMin}
                      onChange={(event) => updateConflictTimeMin(event.target.value)}
                    />
                    <input
                      className="range-input"
                      type="range"
                      min={scopedTimeMin}
                      max={scopedTimeMax}
                      value={conflictTimeMax}
                      onChange={(event) => updateConflictTimeMax(event.target.value)}
                    />
                  </div>

                  <button className="text-button conflict-reset-times" type="button" onClick={resetConflictTimes}>
                    Reset times
                  </button>
                </div>
              ) : null}
            </div>

            <div className="comparison-list">
              {comparisonRows.map((row) => (
                <article
                  className={`comparison-row ${row.isSelected ? "is-selected" : ""}`}
                  key={row.set.id}
                >
                  <span className="comparison-artist">{row.set.artist}</span>
                  <span className="comparison-stage">{row.set.stage}</span>
                  <span className="comparison-time">{row.set.displayRange}</span>
                </article>
              ))}
              {filteredConflicts.length ? null : (
                <div className="empty-conflict">No conflicts match that filter.</div>
              )}
            </div>
          </>
        ) : (
          <div className="empty-conflict">No sets match those filters.</div>
        )}
      </section>
    </div>
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

function ScheduleTable({ sets: visibleSets, comparisonSetId, conflictIndex, onCompareSet }) {
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
            visibleSets.map((set) => {
              const conflicts = conflictIndex.get(set.id) ?? [];
              const isCompared = comparisonSetId === set.id;

              return (
                <tr
                  className={isCompared ? "is-compared-row" : ""}
                  key={`${set.day}-${set.stage}-${set.time}-${set.artist}`}
                >
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
                  <td className="conflict-cell">
                    {conflicts.length ? (
                      <button
                        className={`conflict-button ${isCompared ? "is-active" : ""}`}
                        type="button"
                        aria-label={`${isCompared ? "Close" : "Compare"} ${set.artist} conflicts`}
                        onClick={() => onCompareSet(set.id)}
                      >
                        {conflicts.length}
                      </button>
                    ) : (
                      <span className="clear-conflict">Clear</span>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="empty-row" colSpan={columnConfig.length}>
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
