"use strict";

const $ = (id) => document.getElementById(id);
const compact = new Intl.NumberFormat("ru", { notation: "compact", maximumFractionDigits: 1 });
const precise = new Intl.NumberFormat("ru", { maximumFractionDigits: 1 });
const whole = new Intl.NumberFormat("ru", { maximumFractionDigits: 0 });
const fmt = (value) => value >= 10000 ? compact.format(value) : precise.format(value);
const balance = (value) => value >= 10000 ? compact.format(value) : whole.format(Math.floor(value + 1e-9));
const ether = (value) => value === 1 ? "1 эфир" : `${balance(value)} ед. эфира`;
const ratio = (value, max) => Math.min(1, Math.max(0, value / max));
const write = (element, text) => {
  const next = String(text);
  if (element.textContent !== next) element.textContent = next;
};
const fill = (element, value) => { element.style.width = (100 * value).toFixed(2) + "%"; };
const icon = (name, extra = "") => `<span data-icon="${name}" ${extra}></span>`;

const glyphs = {
  logo: "M12 1.5 21.5 7v10L12 22.5 2.5 17V7L12 1.5Zm0 3.4L6.8 12l5.2 7.1 5.2-7.1L12 4.9Zm0 0V19m-5.2-7h10.4",
  gem: "M12 2 21 8l-9 14L3 8 12 2ZM3 8h18M12 2l-4 6 4 14 4-14-4-6Z",
  cursor: "M5 3l14 10-7 .9-3.7 6.1L5 3ZM13 14l3 5",
  bolt: "M13 2 4 14h7l-1 8 10-13h-7l1-7Z",
  sun: "M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2.1 2.1m9.8 9.8L19 19M5 19l2.1-2.1m9.8-9.8L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  compass: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM16 8l-2 6-6 2 2-6 6-2Z",
  info: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 11v5m0-8v.15",
  lock: "M8 10V7a4 4 0 0 1 8 0v3m-9 0h10a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19v-7.5A1.5 1.5 0 0 1 7 10Zm5 4v2",
  check: "M5 12l4 4L19 6",
  arrow: "M6 12h12m-5-5 5 5-5 5",
  tree: "M12 2 7 9h2l-5 6h4l-4 4h16l-4-4h4l-5-6h2l-5-7Zm0 17v3",
  waves: "M3 7c3-4 6 4 9 0s6 4 9 0M3 12c3-4 6 4 9 0s6 4 9 0M3 17c3-4 6 4 9 0s6 4 9 0",
  flame: "M13 2c1 5-4 6-4 10-2-1-2-3-2-4-6 6-4 14 5 14 8 0 10-9 4-15 0 3-1 4-2 5 1-5-1-7-1-10Zm-1 13c3 3 3 5 0 6-3-1-3-3 0-6Z",
  snow: "M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3m-6 16 3-3 3 3M4 10l4 1V6m12 8-4-1v5m-12-4 4-1v5m12-8-4 1V6",
  star: "M12 2c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z",
  eclipse: "M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.2 1.2m11.6 11.6L19 19M5 19l1.2-1.2M17.8 6.2 19 5M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-4.4-5.7c-5.7 4.9-1 10.2 3.6 8.7",
  sword: "M5 19 16 8m-9 4 5 5m-7-1 3 3-2 2-3-3 2-2Zm4-1 7-10 5-2-2 5-10 7Z",
  hammer: "M6 20 14 10m-9 8 2 2-2 2-2-2 2-2Zm8-8L8 6l4-4 9 8-4 4-4-4Zm-2-7 9 8",
  golem: "M5 7 9 3h6l4 4v5l2 3-3 6h-4v-4h-4v4H6l-3-6 2-3V7Zm3 4h2m4 0h2M7 15l2-2h6l2 2",
  branch: "M12 18V9m0 4H5V8m7 5h7V8M14 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-7 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
  flag: "M5 22V3m0 1c4-4 10 4 15 0v10c-5 4-11-4-15 0",
  cycle: "M20 9a8 8 0 0 0-14-3L3 9m0-5v5h5m-4 6a8 8 0 0 0 14 3l3-3m0 5v-5h-5M12 8l3 4-3 4-3-4 3-4Z",
  sound: "M3 9h4l5-4v14l-5-4H3V9Zm12 0c2 2 2 4 0 6m3-9c4 4 4 8 0 12",
  mute: "M3 9h4l5-4v14l-5-4H3V9Zm13 0 5 6m0-6-5 6",
  settings: "M9 3h6l.7 3 2 1 2.8-.8 2 4.5-2.3 2v2l1.3 2.4-3.5 3-2.5-1.4-2 .6L12 22l-4.7-.7-.4-2.6-1.7-1.4-2.8.1L2 12.5l2.6-1 .6-2.3-1-2.3 3.6-2.4L9 3Zm6 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  chart: "M3 3v18h18M7 17v-5m5 5V8m5 9V4",
  close: "M5 5l14 14M19 5 5 19",
};
const paths = Object.fromEntries(Object.entries(glyphs).map(([name, path]) => [name, new Path2D(path)]));

function paintIcons(root = document) {
  const containers = [...root.querySelectorAll("[data-icon]")];
  if (root.matches?.("[data-icon]")) containers.unshift(root);
  for (const el of containers) {
    const name = el.dataset.icon;
    const color = getComputedStyle(el).color;
    if (el.dataset.painted === name + color || !paths[name]) continue;
    const canvas = document.createElement("canvas");
    canvas.className = "glyph";
    canvas.width = canvas.height = 64;
    canvas.setAttribute("aria-hidden", "true");
    const context = canvas.getContext("2d");
    context.scale(64 / 24, 64 / 24);
    context.lineWidth = 1.65;
    context.lineCap = context.lineJoin = "round";
    context.strokeStyle = color;
    context.stroke(paths[name]);
    el.replaceChildren(canvas);
    el.dataset.painted = name + color;
    if (el.tagName === "SPAN") el.setAttribute("aria-hidden", "true");
  }
}

function worldImage(index) {
  return index === 0 ? "assets/mine.webp" : `assets/world-${index}.webp`;
}

const worldItems = Rift.worlds.map((world, i) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "world-row";
  button.innerHTML = `<span class="world-art" data-icon="${world.icon}"></span><span class="world-data"><strong>${world.name}</strong><small></small></span>${icon("lock", 'class="world-tag"')}`;
  const art = button.querySelector(".world-art");
  art.style.setProperty("--world-hue", world.hue);
  art.style.setProperty("--world-image", `url("${worldImage(i)}")`);
  $("world-list").append(button);
  button.addEventListener("click", () => travel(i));
  return { button, detail: button.querySelector("small"), tag: button.querySelector(".world-tag") };
});

const upgradeItems = Rift.upgrades.map((upgrade, i) => {
  const row = document.createElement("div");
  row.className = "upgrade";
  row.innerHTML = `${icon(upgrade.icon, `class="upgrade-icon ${upgrade.color}"`)}<div class="upgrade-desc"><strong>${upgrade.name}</strong><small>${upgrade.desc}</small></div><button class="buy" type="button"><span class="price">${icon("gem")}<b></b></span><small></small></button>`;
  $("upgrade-list").append(row);
  const button = row.querySelector("button");
  button.addEventListener("click", () => buyUpgrade(i));
  return { button, price: button.querySelector("b"), level: button.querySelector("small") };
});

const contractItems = Rift.contracts.map((contract, index) => {
  const row = document.createElement("article");
  row.className = "expedition-item";
  row.innerHTML = `${icon(contract.icon, `class="expedition-glyph ${contract.color}"`)}<div class="expedition-copy"><strong>${contract.name}</strong><small>${contract.desc}</small><div class="track"><i></i></div><small class="expedition-counter"></small></div><button type="button" class="expedition-action" aria-label="Забрать награду за контракт"></button>`;
  $("contract-list").append(row);
  const button = row.querySelector("button");
  button.addEventListener("click", () => {
    advance();
    const amount = Rift.claimContract(state, index);
    if (!amount) return;
    toast(`Контракт завершён: +${amount} печ.`, "star");
    play("buy");
    render();
    save();
  });
  return { button, progress: row.querySelector(".track i"), counter: row.querySelector(".expedition-counter") };
});

const relicItems = Rift.relics.map((relic) => {
  const row = document.createElement("article");
  row.className = "expedition-item";
  row.innerHTML = `${icon(relic.icon, `class="expedition-glyph ${relic.color}"`)}<div class="expedition-copy"><strong>${relic.name}</strong><small>${relic.desc}</small></div><button type="button" class="expedition-action"></button>`;
  $("relic-list").append(row);
  const button = row.querySelector("button");
  button.addEventListener("click", () => {
    advance();
    if (!Rift.purchaseRelic(state, relic.id)) return;
    toast(`Пробуждена реликвия: ${relic.name}`, "star");
    play("buy");
    render();
    save();
  });
  return { button, row };
});

const skillElements = new Map();
const treeCanvas = document.createElement("canvas");
treeCanvas.className = "tree-lines";
treeCanvas.setAttribute("aria-hidden", "true");
$("tree-map").append(treeCanvas);
Rift.skills.forEach((skill, i) => {
  const button = document.createElement("button");
  const center = i === 0 || i === Rift.skills.length - 1;
  button.type = "button";
  button.className = "skill-node " + (skill.color ?? "");
  button.style.gridColumn = center ? 2 : (i - 1) % 3 + 1;
  button.style.gridRow = i === 0 ? 1 : center ? 6 : 2 + Math.floor((i - 1) / 3);
  button.innerHTML = `${icon(skill.icon)}<b>${skill.name}</b><small></small>`;
  button.addEventListener("click", () => {
    selectedSkill = skill.id;
    renderTree();
  });
  $("tree-map").append(button);
  skillElements.set(skill.id, button);
});

const arena = $("arena");
const crystal = $("crystal");
const particles = $("particles");
const drawing = particles.getContext("2d");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const dialogs = [...document.querySelectorAll("dialog")];
const quantityButtons = [...document.querySelectorAll("[data-buy]")];
const points = [];
const embers = Array.from({ length: 30 }, () => ({
  x: Math.random(), y: Math.random(), phase: Math.random() * Math.PI * 2, size: .4 + Math.random() * 1.2,
}));
let state = Rift.fresh();
let buyMode = 1;
let selectedSkill = "root";
let lastHit = 0;
let streak = 0;
let lastTick = Date.now();
let wasHidden = document.hidden;
let activeWorld = -1;
let previousUnlocks = 0;
let shownQuest = -1;
let audio;
let animation;
let lastSavedText = "";
let panelWidth = 0;
let panelHeight = 0;

function toast(message, glyph = "gem") {
  const item = document.createElement("div");
  item.className = "toast";
  item.innerHTML = icon(glyph) + "<span></span>";
  item.lastElementChild.textContent = message;
  $("toasts").append(item);
  paintIcons(item);
  while ($("toasts").childElementCount > 4) $("toasts").firstElementChild.remove();
  setTimeout(() => item.remove(), 3500);
}

function save() {
  state.savedAt = Date.now();
  let status = "Автосохранение";
  try {
    localStorage.setItem(Rift.SAVE_KEY, JSON.stringify(state));
  } catch {
    status = "Сохранение через файл";
  }
  if (status !== lastSavedText) {
    $("save-status").classList.toggle("error", status !== "Автосохранение");
    $("save-status").title = status;
    $("save-status").lastChild.textContent = status;
    lastSavedText = status;
  }
}

function load() {
  try {
    const raw = localStorage.getItem(Rift.SAVE_KEY);
    if (!raw) return;
    const now = Date.now();
    state = Rift.restore(JSON.parse(raw), now);
    const offline = Rift.accrue(state, state.savedAt, now, true);
    if (offline >= 1 && now - state.savedAt > 20000) toast(`Добыча за время отсутствия: +${fmt(offline)} осколков`, "bolt");
  } catch {
    toast("Сохранение не прочиталось. Можно загрузить копию в настройках.", "info");
  }
}

function advance(now = Date.now()) {
  if (!wasHidden || !document.hidden) {
    const offline = Rift.accrue(state, lastTick, now, wasHidden);
    if (wasHidden && offline >= 1 && now - lastTick > 20000) toast(`Добыча за время отсутствия: +${fmt(offline)} осколков`, "bolt");
    lastTick = now;
  }
}

function play(kind) {
  if (!state.sound || !window.AudioContext) return;
  try {
    audio ??= new AudioContext();
    if (audio.state === "suspended") void audio.resume().catch(() => {});
    const time = audio.currentTime;
    const notes = { hit: [370], critical: [587, 880], buy: [440, 554], surge: [293, 440, 587], rebirth: [220, 330, 440, 659] }[kind];
    notes.forEach((note, index) => {
      const oscillator = audio.createOscillator();
      const envelope = audio.createGain();
      const start = time + index * .06;
      oscillator.type = kind === "hit" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(note, start);
      oscillator.frequency.exponentialRampToValueAtTime(note * .84, start + .13);
      envelope.gain.setValueAtTime(.065, start);
      envelope.gain.exponentialRampToValueAtTime(.001, start + .16);
      oscillator.connect(envelope).connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start + .17);
    });
  } catch {
    // Audio may be unavailable while the page is in the background.
  }
}

function updateSound() {
  $("sound").dataset.icon = state.sound ? "sound" : "mute";
  const label = state.sound ? "Выключить звук" : "Включить звук";
  $("sound").setAttribute("aria-label", label);
  $("sound").setAttribute("aria-pressed", state.sound);
  $("sound").title = label;
  $("sound-toggle").checked = state.sound;
  paintIcons($("sound"));
}

function setSound(enabled) {
  state.sound = enabled;
  updateSound();
  if (enabled) play("buy");
  save();
}

function showWorlds() {
  const unlocked = Rift.unlockedCount(state);
  if (previousUnlocks > 0 && unlocked > previousUnlocks) {
    const count = unlocked - previousUnlocks;
    toast(count === 1 ? `Открыт мир «${Rift.worlds[unlocked - 1].name}»` : `Открыто миров: ${count}`, "compass");
  }
  previousUnlocks = unlocked;
  write($("world-count"), `${unlocked} / ${Rift.worlds.length}`);
  worldItems.forEach(({ button, detail, tag }, i) => {
    const world = Rift.worlds[i];
    const selected = i === state.world;
    const available = i < unlocked;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-current", selected ? "location" : "false");
    button.setAttribute("aria-disabled", !available);
    button.title = available ? `${world.name} · ×${fmt(world.boost)} к добыче` : `${world.name} · откроется после добычи ${whole.format(world.need)} осколков за цикл`;
    write(detail, selected ? "Текущий мир" : available ? `×${fmt(world.boost)} к добыче` : `${balance(world.need)} осколков`);
    const tagName = selected ? "check" : available ? "arrow" : "lock";
    if (tag.dataset.icon !== tagName) {
      tag.dataset.icon = tagName;
      paintIcons(tag);
    }
  });
  if (activeWorld === state.world) return;
  activeWorld = state.world;
  const world = Rift.worlds[activeWorld];
  arena.dataset.world = activeWorld;
  arena.style.setProperty("--world-hue", world.hue);
  arena.style.setProperty("--scene", `url("${worldImage(activeWorld)}")`);
  write($("region"), `МИР ${String(activeWorld + 1).padStart(2, "0")}`);
  write($("location-title"), world.name);
  write($("location-bonus"), `×${fmt(world.boost)}`);
}

function updateUpgrades() {
  upgradeItems.forEach(({ button, price, level }, i) => {
    const quote = Rift.quote(state, i, buyMode);
    button.disabled = quote.maxed || !quote.count || quote.cost > state.shards;
    const description = quote.maxed ? "Максимальный уровень" : `Купить «${Rift.upgrades[i].name}» ×${quote.count || 1} за ${whole.format(quote.cost)}`;
    if (button.title !== description) {
      button.title = description;
      button.setAttribute("aria-label", description);
    }
    write(price, quote.maxed ? "МАКС" : balance(quote.cost));
    write(level, `Ур. ${state.upgrades[i]}${buyMode !== 1 && quote.count ? ` · ×${quote.count}` : ""}`);
  });
}

function updateQuest() {
  const quest = Rift.quests[state.quest];
  const reward = $("quest-reward");
  if (!quest) {
    write($("quest-name"), "Все поручения выполнены");
    write($("quest-count"), `${Rift.quests.length} / ${Rift.quests.length}`);
    reward.hidden = true;
    fill($("quest-progress"), 1);
    return;
  }
  const value = Math.min(quest.goal, Rift.questProgress(state, quest));
  write($("quest-name"), quest.name);
  write($("quest-count"), `${balance(value)} / ${balance(quest.goal)} ${quest.unit}`);
  fill($("quest-progress"), ratio(value, quest.goal));
  reward.hidden = false;
  reward.disabled = value < quest.goal;
  if (shownQuest !== state.quest || reward.dataset.ready !== String(!reward.disabled)) {
    reward.innerHTML = `${icon("gem")}${reward.disabled ? "+" : "Забрать +"}${balance(quest.reward)}`;
    reward.dataset.ready = String(!reward.disabled);
    paintIcons(reward);
    shownQuest = state.quest;
  }
}

function updateExpeditions() {
  write($("sigils"), balance(state.sigils));
  contractItems.forEach(({ button, progress, counter }, index) => {
    const contract = Rift.contracts[index];
    const goal = Rift.contractGoal(state, index);
    const value = Rift.contractProgress(state, index);
    const ready = value >= goal;
    fill(progress, ratio(value, goal));
    write(counter, `${balance(Math.min(value, goal))} / ${balance(goal)} ${contract.unit} · завершено ${state.contracts[index].claims}`);
    write(button, ready ? `Забрать +${contract.reward}` : `+${contract.reward} печ.`);
    button.disabled = !ready;
    button.setAttribute("aria-label", `${contract.name}: ${ready ? "получить" : "награда"} ${contract.reward} печатей`);
  });
  relicItems.forEach(({ button, row }, index) => {
    const relic = Rift.relics[index];
    const owned = Rift.hasRelic(state, relic.id);
    row.classList.toggle("acquired", owned);
    write(button, owned ? "Получено" : `${relic.price} печ.`);
    button.disabled = owned || state.sigils < relic.price;
    button.setAttribute("aria-label", owned ? `${relic.name} уже получена` : `Купить ${relic.name} за ${relic.price} печатей`);
  });
}

function updateSurge(now) {
  const remaining = Math.max(0, state.surgeUntil - now);
  const storm = Rift.has(state, "storm");
  const duration = Rift.surgeDuration(state) / 1000;
  const goal = Rift.chargeGoal(state);
  const portion = remaining ? ratio(remaining, duration * 1000) : ratio(state.charge, goal);
  $("surge").disabled = Boolean(remaining) || state.charge < goal;
  $("surge").title = remaining ? "Резонанс активен" : `Удары для заряда: ${state.charge} из ${goal}`;
  write($("surge-detail"), remaining ? `Добыча ×${storm ? 4 : 3}` : `×${storm ? 4 : 3} к добыче на ${duration} секунд`);
  write($("surge-value"), remaining ? `${Math.ceil(remaining / 1000)} с` : portion === 1 ? "Включить" : `${Math.floor(portion * 100)}%`);
  arena.classList.toggle("resonant", Boolean(remaining));
  fill($("surge-progress"), portion);
}

function render(now = Date.now()) {
  const rates = Rift.rates(state, now);
  write($("shards"), balance(state.shards));
  write($("per-click"), "+" + fmt(rates.click));
  write($("per-second"), "+" + fmt(rates.idle));
  write($("essence"), balance(state.essence));
  const sinceHit = performance.now() - lastHit;
  const activeCombo = lastHit > 0 && sinceHit < Rift.SERIES_TIME;
  write($("combo-value"), "×" + fmt(Rift.comboMultiplier(state, activeCombo ? streak : 0)));
  fill($("combo-progress"), activeCombo ? 1 - sinceHit / Rift.SERIES_TIME : 0);
  showWorlds();
  updateUpgrades();
  updateQuest();
  updateExpeditions();
  updateSurge(now);
  const goal = Rift.rebirthGoal(state);
  const available = Rift.rebirthReward(state);
  const canRebirth = available > 0;
  write($("rebirth-count"), `${balance(state.runEarned)} / ${balance(goal)}`);
  fill($("rebirth-progress"), ratio(state.runEarned, goal));
  $("rebirth").setAttribute("aria-disabled", !canRebirth);
  $("rebirth-lock").style.display = canRebirth ? "none" : "";
  if ($("rebirth-dialog").open) write($("rebirth-reward"), "+" + ether(available));
}

function drawTree() {
  if (!$("tree-dialog").open) return;
  const map = $("tree-map").getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  treeCanvas.width = Math.ceil(map.width * dpr);
  treeCanvas.height = Math.ceil(map.height * dpr);
  const context = treeCanvas.getContext("2d");
  context.scale(dpr, dpr);
  const middle = (element) => {
    const box = element.getBoundingClientRect();
    return { x: box.left + box.width / 2 - map.left, y: box.top + box.height / 2 - map.top };
  };
  for (const skill of Rift.skills) {
    const to = middle(skillElements.get(skill.id));
    for (const parent of skill.need) {
      const from = middle(skillElements.get(parent));
      const bend = (from.y + to.y) / 2;
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.bezierCurveTo(from.x, bend, to.x, bend, to.x, to.y);
      context.lineWidth = Rift.has(state, parent) ? 2 : 1.2;
      context.strokeStyle = Rift.has(state, parent) ? "#a375d8" : "#594368";
      context.stroke();
    }
  }
}

function renderTree() {
  write($("tree-essence"), balance(state.essence));
  for (const skill of Rift.skills) {
    const element = skillElements.get(skill.id);
    const learned = Rift.has(state, skill.id);
    const unlocked = skill.need.every((id) => Rift.has(state, id));
    element.classList.toggle("learned", learned);
    element.classList.toggle("ready", !learned && unlocked && state.essence >= skill.price);
    element.classList.toggle("selected", selectedSkill === skill.id);
    element.setAttribute("aria-pressed", selectedSkill === skill.id);
    write(element.lastElementChild, learned ? "Изучено" : ether(skill.price));
  }
  const skill = Rift.skills.find((item) => item.id === selectedSkill);
  const missing = skill.need.filter((id) => !Rift.has(state, id)).map((id) => Rift.skills.find((item) => item.id === id).name);
  const learned = Rift.has(state, skill.id);
  const reason = missing.length ? `Нужны навыки: ${missing.join(", ")}` : state.essence < skill.price && !learned ? "Эфир можно получить при перерождении." : "";
  const detail = $("skill-info");
  detail.innerHTML = `<div><h3>${skill.name}</h3><p>${skill.desc}</p><small>${reason}</small></div><button class="primary" type="button">${learned ? "Изучено" : `Изучить · ${skill.price}`}</button>`;
  const button = detail.querySelector("button");
  button.disabled = learned || missing.length > 0 || state.essence < skill.price;
  button.addEventListener("click", () => {
    advance();
    if (!Rift.buySkill(state, skill.id)) return;
    play("buy");
    renderTree();
    skillElements.get(skill.id).focus();
    render();
    save();
  });
  drawTree();
}

function resizeParticles() {
  const box = arena.getBoundingClientRect();
  panelWidth = box.width;
  panelHeight = box.height;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  particles.width = Math.round(panelWidth * dpr);
  particles.height = Math.round(panelHeight * dpr);
  drawing.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawParticles(time) {
  drawing.clearRect(0, 0, panelWidth, panelHeight);
  if (!state.fx || reducedMotion.matches || document.hidden) {
    animation = undefined;
    points.length = 0;
    return;
  }
  const hue = Rift.worlds[state.world].hue;
  for (const ember of embers) {
    const x = ember.x * panelWidth + Math.sin(time / 2400 + ember.phase) * 10;
    const y = ((ember.y + 1 - (time / 39000) % 1) % 1) * panelHeight;
    const alpha = .18 + Math.sin(time / 730 + ember.phase) * .15;
    drawing.fillStyle = `hsla(${hue},100%,80%,${alpha})`;
    drawing.beginPath();
    drawing.arc(x, y, ember.size, 0, Math.PI * 2);
    drawing.fill();
  }
  for (let i = points.length - 1; i >= 0; i -= 1) {
    const point = points[i];
    const age = (time - point.start) / point.life;
    if (age >= 1) {
      points.splice(i, 1);
      continue;
    }
    const progress = Math.max(0, age);
    const x = point.x + point.dx * progress;
    const y = point.y + point.dy * progress;
    drawing.globalAlpha = Math.min(1, (1 - progress) * 1.65);
    drawing.fillStyle = point.critical ? "#ffce8b" : `hsl(${hue},100%,83%)`;
    if (point.text) {
      drawing.textAlign = "center";
      drawing.font = `bold ${point.critical ? 26 : 22}px "Segoe UI",sans-serif`;
      drawing.strokeStyle = "#1b0b31";
      drawing.lineWidth = 3;
      drawing.strokeText(point.text, x, y);
      drawing.fillText(point.text, x, y);
    } else {
      const size = point.size * (1 - progress);
      drawing.fillRect(x, y, size, size);
    }
  }
  drawing.globalAlpha = 1;
  animation = requestAnimationFrame(drawParticles);
}

function wakeParticles() {
  if (animation === undefined) animation = requestAnimationFrame(drawParticles);
}

function hit(event) {
  const now = Date.now();
  const time = performance.now();
  advance(now);
  streak = lastHit > 0 && time - lastHit < Rift.SERIES_TIME ? streak + 1 : 0;
  lastHit = time;
  const result = Rift.hit(state, streak, Math.random(), now);
  play(result.critical ? "critical" : "hit");
  if (state.fx && !reducedMotion.matches) {
    const box = arena.getBoundingClientRect();
    const x = event.detail ? event.clientX - box.left : box.width * .5;
    const y = event.detail ? event.clientY - box.top : box.height * .47;
    points.push({ x, y: y - 12, dx: (Math.random() - .5) * 34, dy: -80, start: time, life: 850, text: "+" + fmt(result.amount), critical: result.critical });
    for (let i = 0; i < 9; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 25 + Math.random() * 60;
      points.push({ x, y, dx: Math.cos(angle) * distance, dy: Math.sin(angle) * distance, start: time, life: 280 + Math.random() * 230, size: 2 + Math.random() * 3, critical: result.critical });
    }
    crystal.classList.remove("hit");
    arena.classList.remove("hit");
    void crystal.offsetWidth;
    crystal.classList.add("hit");
    arena.classList.add("hit");
    wakeParticles();
  }
  render(now);
}

function travel(index) {
  advance();
  if (!Rift.worldUnlocked(state, index)) {
    toast(`Добудь ${whole.format(Rift.worlds[index].need)} осколков за цикл.`, "lock");
    return;
  }
  if (state.world === index) return;
  state.world = index;
  play("buy");
  render();
  save();
}

function buyUpgrade(index) {
  advance();
  if (Rift.purchase(state, index, buyMode)) {
    play("buy");
    render();
    save();
  }
}

function showSettings() {
  $("fx-toggle").checked = state.fx;
  updateSound();
  $("settings-dialog").showModal();
}

function showStats() {
  const items = [
    ["Всего осколков добыто", balance(state.earned)], ["Добыто за этот цикл", balance(state.runEarned)],
    ["Ударов по кристаллу", whole.format(state.hits)], ["Лучшая серия", "×" + fmt(state.bestCombo)],
    ["Миров открыто за всё время", `${state.worlds} / ${Rift.worlds.length}`], ["Резонансов", whole.format(state.surges)],
    ["Перерождений", whole.format(state.rebirths)], ["Всего эфира получено", balance(state.totalEssence)],
    ["Изучено навыков", `${state.skills.length} / ${Rift.skills.length}`], ["Поручений выполнено", `${state.quest} / ${Rift.quests.length}`],
    ["Печатей Разлома", balance(state.sigils)], ["Пробуждённых реликвий", `${state.relics.length} / ${Rift.relics.length}`],
    ["Экспедиций завершено", whole.format(state.contracts.reduce((sum, item) => sum + item.claims, 0))],
  ];
  $("summary").innerHTML = items.map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`).join("");
  $("stats-dialog").showModal();
}

crystal.addEventListener("click", hit);
window.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.altKey || event.ctrlKey || event.metaKey || dialogs.some((dialog) => dialog.open)) return;
  if (event.target === crystal && event.repeat) event.preventDefault();
  if (event.target.closest("button, input, a, textarea, [contenteditable]")) return;
  event.preventDefault();
  if (!event.repeat) crystal.click();
});
$("sound").addEventListener("click", () => setSound(!state.sound));
$("sound-toggle").addEventListener("change", (event) => setSound(event.target.checked));
$("fx-toggle").addEventListener("change", (event) => {
  state.fx = event.target.checked;
  if (!state.fx) {
    crystal.classList.remove("hit");
    arena.classList.remove("hit");
  }
  wakeParticles();
  save();
});
$("settings").addEventListener("click", showSettings);
$("stats-open").addEventListener("click", showStats);
$("tree-open").addEventListener("click", () => {
  $("tree-dialog").showModal();
  $("upgrade-tab").classList.remove("selected");
  $("tree-open").classList.add("selected");
  renderTree();
});
$("tree-dialog").addEventListener("close", () => {
  $("upgrade-tab").classList.add("selected");
  $("tree-open").classList.remove("selected");
});
$("upgrade-tab").addEventListener("click", () => upgradeItems.find((item) => !item.button.disabled)?.button.focus());
for (const dialog of dialogs) {
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
}
for (const button of quantityButtons) {
  button.addEventListener("click", () => {
    buyMode = button.dataset.buy === "max" ? "max" : Number(button.dataset.buy);
    quantityButtons.forEach((element) => element.setAttribute("aria-pressed", element === button));
    updateUpgrades();
  });
}
$("quest-reward").addEventListener("click", () => {
  advance();
  const amount = Rift.claim(state);
  if (!amount) return;
  toast(`Поручение выполнено. +${fmt(amount)} осколков`, "flag");
  play("buy");
  render();
  save();
});
$("surge").addEventListener("click", () => {
  const now = Date.now();
  advance(now);
  if (!Rift.activate(state, now)) return;
  play("surge");
  render(now);
  save();
});
$("rebirth").addEventListener("click", () => {
  advance();
  if (Rift.rebirthReward(state) === 0) {
    toast(`Добудь ${whole.format(Rift.rebirthGoal(state))} осколков за цикл.`, "lock");
    return;
  }
  $("rebirth-dialog").showModal();
  render();
});
$("rebirth-confirm").addEventListener("click", () => {
  advance();
  const amount = Rift.rebirth(state);
  if (!amount) return;
  streak = lastHit = 0;
  previousUnlocks = 0;
  points.length = 0;
  $("rebirth-dialog").close();
  play("rebirth");
  toast(`Цикл ${state.rebirths + 1} начался. +${ether(amount)}`, "sun");
  render();
  save();
});
$("export").addEventListener("click", () => {
  advance();
  save();
  const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "riftforge-save.json";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
});
$("import").addEventListener("click", () => $("import-file").click());
$("import-file").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;
  try {
    if (file.size > 100000) throw new Error("Файл слишком большой.");
    const now = Date.now();
    const restored = Rift.restore(JSON.parse(await file.text()), now);
    Rift.accrue(restored, restored.savedAt, now, true);
    state = restored;
    lastTick = now;
    previousUnlocks = 0;
    streak = lastHit = 0;
    updateSound();
    wakeParticles();
    $("settings-dialog").close();
    render();
    save();
    toast("Сохранение загружено.", "check");
  } catch {
    $("settings-dialog").close();
    toast("Выбери файл сохранения Riftforge в формате JSON.", "info");
  }
});

document.addEventListener("visibilitychange", () => {
  advance();
  wasHidden = document.hidden;
  if (wasHidden) save();
  else {
    render();
    wakeParticles();
  }
});
window.addEventListener("pagehide", () => {
  if (wasHidden) return;
  advance();
  save();
});
reducedMotion.addEventListener("change", wakeParticles);
new ResizeObserver(resizeParticles).observe(arena);
new ResizeObserver(drawTree).observe($("tree-map"));

load();
lastTick = Date.now();
render();
paintIcons();
updateSound();
resizeParticles();
wakeParticles();
save();
setInterval(() => {
  if (document.hidden) return;
  const now = Date.now();
  advance(now);
  render(now);
}, 115);
setInterval(() => {
  if (!document.hidden) save();
}, 5000);
