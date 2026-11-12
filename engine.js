"use strict";

const Rift = (() => {
  const worlds = [
    { name: "Сумрачная шахта", icon: "gem", need: 0, boost: 1, hue: 267 },
    { name: "Шепчущий лес", icon: "tree", need: 100, boost: 1.7, hue: 179 },
    { name: "Затонувший город", icon: "waves", need: 650, boost: 2.7, hue: 212 },
    { name: "Пепельный храм", icon: "flame", need: 3200, boost: 4.2, hue: 24 },
    { name: "Грозовой предел", icon: "bolt", need: 15000, boost: 6.5, hue: 202 },
    { name: "Ледяная цитадель", icon: "snow", need: 65000, boost: 10, hue: 196 },
    { name: "Астральный разлом", icon: "star", need: 290000, boost: 16, hue: 291 },
    { name: "Багровая бездна", icon: "eclipse", need: 1250000, boost: 27, hue: 346 },
  ];

  const upgrades = [
    { name: "Рунный резец", icon: "sword", color: "violet", price: 15, scale: 1.36, click: 1, idle: 0, desc: "+1 за удар" },
    { name: "Эхо шахты", icon: "waves", color: "teal", price: 55, scale: 1.41, click: 0, idle: 2, desc: "+2 в секунду" },
    { name: "Осколочный голем", icon: "golem", color: "blue", price: 240, scale: 1.43, click: 0, idle: 9, desc: "+9 в секунду" },
    { name: "Грозовой молот", icon: "hammer", color: "amber", price: 1150, scale: 1.46, click: 25, idle: 0, desc: "+25 за удар" },
    { name: "Алхимическая печь", icon: "flame", color: "rose", price: 5100, scale: 1.50, click: 0, idle: 120, desc: "+120 в секунду" },
    { name: "Звёздный проводник", icon: "star", color: "blue", price: 22000, scale: 1.53, click: 170, idle: 280, desc: "+170 за удар · +280/с" },
  ];

  const skills = [
    { id: "root", name: "Исток", icon: "gem", price: 1, need: [], desc: "+20% ко всей добыче." },
    { id: "force", name: "Сила удара", icon: "sword", price: 1, need: ["root"], desc: "+50% осколков за удар.", color: "rose" },
    { id: "echo", name: "Эхо", icon: "waves", price: 1, need: ["root"], desc: "+50% к пассивной добыче.", color: "teal" },
    { id: "spark", name: "Искра", icon: "bolt", price: 1, need: ["root"], desc: "Начинай каждый новый цикл со 100 осколками.", color: "blue" },
    { id: "critical", name: "Точный удар", icon: "star", price: 2, need: ["force"], desc: "15% шанс нанести тройной удар.", color: "rose" },
    { id: "reserve", name: "Запасы", icon: "eclipse", price: 2, need: ["echo"], desc: "Офлайн-добыча увеличивается с 60% до 100%.", color: "teal" },
    { id: "flux", name: "Поток", icon: "cycle", price: 2, need: ["spark"], desc: "Резонанс заряжается за 28 ударов вместо 45.", color: "blue" },
    { id: "fury", name: "Ярость", icon: "flame", price: 3, need: ["critical"], desc: "Серия даёт до ×3,2 к силе удара.", color: "rose" },
    { id: "automata", name: "Легион", icon: "golem", price: 3, need: ["reserve"], desc: "Пассивная добыча удваивается.", color: "teal" },
    { id: "storm", name: "Буря", icon: "snow", price: 3, need: ["flux"], desc: "Резонанс усиливает добычу в 4 раза и длится 20 секунд.", color: "blue" },
    { id: "rupture", name: "Раскол", icon: "hammer", price: 5, need: ["fury"], desc: "Обычные и критические удары дают ещё ×2 осколков.", color: "rose" },
    { id: "core", name: "Вечный двигатель", icon: "settings", price: 5, need: ["automata"], desc: "Ещё ×2 к пассивной добыче.", color: "teal" },
    { id: "anchor", name: "Якорь миров", icon: "compass", price: 5, need: ["storm"], desc: "Каждый мир даёт дополнительно +30% к добыче.", color: "blue" },
    { id: "eclipse", name: "Затмение", icon: "eclipse", price: 8, need: ["rupture", "core", "anchor"], desc: "+100% ко всей добыче.", color: "amber" },
  ];

  const quests = [
    { name: "Первый резонанс", metric: "hits", unit: "ударов", goal: 30, reward: 25 },
    { name: "Голоса под землёй", metric: "levels", unit: "уровней", goal: 8, reward: 160 },
    { name: "По ту сторону", metric: "worlds", unit: "мира", goal: 4, reward: 950 },
    { name: "Укрощение бури", metric: "surges", unit: "резонансов", goal: 5, reward: 4800 },
    { name: "Новый круг", metric: "rebirths", unit: "цикла", goal: 3, reward: 12500 },
    { name: "За краем света", metric: "worlds", unit: "миров", goal: 8, reward: 250000 },
    { name: "Сердце разлома", metric: "earned", unit: "осколков", goal: 10000000, reward: 2000000 },
    { name: "Хранитель вечности", metric: "rebirths", unit: "циклов", goal: 10, reward: 10000000 },
  ];

  const SAVE_KEY = "riftforge.save.v1";
  const MAX = 1e100;
  const MAX_LEVEL = 160;
  const SERIES_TIME = 1450;
  const fresh = (now = Date.now()) => ({
    version: 1, savedAt: now, shards: 0, runEarned: 0, earned: 0,
    essence: 0, totalEssence: 0, rebirths: 0, world: 0, worlds: 1,
    upgrades: upgrades.map(() => 0), skills: [], hits: 0, surges: 0,
    bestCombo: 1, quest: 0, charge: 0, surgeUntil: 0, sound: false, fx: true,
  });
  const number = (value, max = MAX) => typeof value === "number" && Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : 0;
  const integer = (value, max) => Math.floor(number(value, max));
  const worldUnlocked = (state, index) => worlds[index].need <= state.runEarned;
  const unlockedCount = (state) => worlds.filter((world) => world.need <= state.runEarned).length;
  const has = (state, id) => state.skills.includes(id);
  const levelSum = (state) => state.upgrades.reduce((sum, level) => sum + level, 0);

  function restore(data, now = Date.now()) {
    if (!data || data.version !== 1 || !Array.isArray(data.upgrades) || !Array.isArray(data.skills)) {
      throw new Error("Не удалось прочитать сохранение Riftforge.");
    }
    const state = fresh(now);
    for (const key of ["shards", "runEarned", "earned", "charge", "bestCombo"]) state[key] = number(data[key]);
    for (const key of ["essence", "totalEssence", "rebirths", "hits", "surges"]) state[key] = integer(data[key], Number.MAX_SAFE_INTEGER);
    state.savedAt = integer(data.savedAt || now, now);
    state.surgeUntil = integer(data.surgeUntil, now + 20000);
    state.upgrades = upgrades.map((_, i) => integer(data.upgrades[i], MAX_LEVEL));
    for (const skill of skills) {
      if (data.skills.includes(skill.id) && skill.need.every((id) => has(state, id))) state.skills.push(skill.id);
    }
    state.world = Math.min(integer(data.world, worlds.length - 1), unlockedCount(state) - 1);
    state.worlds = Math.max(integer(data.worlds, worlds.length), unlockedCount(state));
    state.quest = integer(data.quest, quests.length);
    state.charge = Math.min(state.charge, chargeGoal(state));
    state.bestCombo = Math.max(state.bestCombo, 1);
    state.sound = data.sound === true;
    state.fx = data.fx !== false;
    return state;
  }

  function add(state, amount) {
    state.shards = Math.min(MAX, state.shards + amount);
    state.runEarned = Math.min(MAX, state.runEarned + amount);
    state.earned = Math.min(MAX, state.earned + amount);
    state.worlds = Math.max(state.worlds, unlockedCount(state));
  }

  function rates(state, now = Date.now()) {
    let click = 1;
    let idle = 0;
    upgrades.forEach((upgrade, index) => {
      click += upgrade.click * state.upgrades[index];
      idle += upgrade.idle * state.upgrades[index];
    });
    let boost = worlds[state.world].boost * (1 + state.totalEssence * 0.12);
    if (has(state, "root")) boost *= 1.2;
    if (has(state, "eclipse")) boost *= 2;
    if (has(state, "anchor")) boost *= 1.3;
    if (state.surgeUntil > now) boost *= has(state, "storm") ? 4 : 3;
    if (has(state, "force")) click *= 1.5;
    if (has(state, "rupture")) click *= 2;
    if (has(state, "echo")) idle *= 1.5;
    if (has(state, "automata")) idle *= 2;
    if (has(state, "core")) idle *= 2;
    return { click: click * boost, idle: idle * boost };
  }

  function comboMultiplier(state, count) {
    return has(state, "fury") ? 1 + Math.min(2.2, count * 0.11) : 1 + Math.min(1, count * 0.05);
  }

  function hit(state, streak, random = Math.random(), now = Date.now()) {
    const critical = has(state, "critical") && random < 0.15;
    const combo = comboMultiplier(state, streak);
    const amount = rates(state, now).click * combo * (critical ? 3 : 1);
    add(state, amount);
    state.hits += 1;
    state.bestCombo = Math.max(state.bestCombo, combo);
    if (state.surgeUntil <= now) state.charge = Math.min(chargeGoal(state), state.charge + 1);
    return { amount, critical };
  }

  const chargeGoal = (state) => has(state, "flux") ? 28 : 45;

  function activate(state, now = Date.now()) {
    if (state.charge < chargeGoal(state) || state.surgeUntil > now) return false;
    state.charge = 0;
    state.surges += 1;
    state.surgeUntil = now + (has(state, "storm") ? 20000 : 12000);
    return true;
  }

  function accrue(state, from, to, offline = false) {
    if (to <= from) return 0;
    const duration = (to - from) / 1000;
    const normal = rates(state, Number.POSITIVE_INFINITY).idle;
    let amount = normal * Math.min(duration, 28800);
    if (offline) amount *= has(state, "reserve") ? 1 : 0.6;
    else {
      const active = Math.max(0, Math.min(to, state.surgeUntil) - from) / 1000;
      amount += active * (rates(state, from).idle - normal);
    }
    if (amount > 0) add(state, amount);
    return amount;
  }

  const priceAt = (upgrade, level) => Math.ceil(upgrade.price * upgrade.scale ** level);

  function quote(state, index, mode) {
    const upgrade = upgrades[index];
    const level = state.upgrades[index];
    const limit = Math.min(mode === "max" ? MAX_LEVEL : mode, MAX_LEVEL - level);
    let count = 0;
    let cost = 0;
    while (count < limit) {
      const next = cost + priceAt(upgrade, level + count);
      if (mode === "max" && next > state.shards) break;
      cost = next;
      count += 1;
    }
    return { count, cost: count ? cost : priceAt(upgrade, level), maxed: level >= MAX_LEVEL };
  }

  function purchase(state, index, mode) {
    const { count, cost } = quote(state, index, mode);
    if (!count || state.shards < cost) return 0;
    state.shards -= cost;
    state.upgrades[index] += count;
    return count;
  }

  const rebirthGoal = (state) => Math.min(MAX, Math.ceil(5000 * 1.68 ** state.rebirths / 100) * 100);
  const rebirthReward = (state) => Math.floor(Math.sqrt(state.runEarned / rebirthGoal(state)));

  function rebirth(state) {
    const reward = rebirthReward(state);
    if (!reward) return 0;
    state.essence += reward;
    state.totalEssence += reward;
    state.rebirths += 1;
    state.shards = 0;
    state.runEarned = 0;
    state.world = 0;
    state.upgrades.fill(0);
    state.charge = 0;
    state.surgeUntil = 0;
    if (has(state, "spark")) add(state, 100);
    return reward;
  }

  function buySkill(state, id) {
    const skill = skills.find((item) => item.id === id);
    if (!skill || has(state, id) || skill.price > state.essence || !skill.need.every((required) => has(state, required))) return false;
    state.essence -= skill.price;
    state.skills.push(id);
    state.charge = Math.min(state.charge, chargeGoal(state));
    return true;
  }

  function questProgress(state, quest) {
    return quest.metric === "levels" ? levelSum(state) : state[quest.metric];
  }

  function claim(state) {
    const quest = quests[state.quest];
    if (!quest || questProgress(state, quest) < quest.goal) return 0;
    state.quest += 1;
    add(state, quest.reward);
    return quest.reward;
  }

  return {
    worlds, upgrades, skills, quests, SAVE_KEY, SERIES_TIME, fresh, restore, add, worldUnlocked,
    unlockedCount, rates, comboMultiplier, hit, chargeGoal, activate, accrue, quote, purchase,
    rebirthGoal, rebirthReward, rebirth, buySkill, questProgress, claim, has,
  };
})();

if (typeof module !== "undefined") module.exports = Rift;
