"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const Rift = require("../engine.js");

test("legacy v1 saves migrate without granting free contract rewards", () => {
  const old = Rift.fresh(1000);
  old.hits = 10000;
  old.surges = 50;
  old.earned = 500000;
  delete old.sigils;
  delete old.relics;
  delete old.contracts;
  const state = Rift.restore(old, 2000);
  assert.equal(state.sigils, 0);
  assert.deepEqual(state.relics, []);
  for (let i = 0; i < Rift.contracts.length; i++) {
    assert.equal(Rift.contractProgress(state, i), 0);
    assert.equal(Rift.claimContract(state, i), 0);
  }
});
test("contracts reward seals once per target and carry forward overflow", () => {
  const state = Rift.fresh();
  state.hits = 120;
  assert.equal(Rift.contractGoal(state, 0), 75);
  assert.equal(Rift.claimContract(state, 0), 1);
  assert.equal(state.sigils, 1);
  assert.equal(state.contracts[0].claims, 1);
  assert.equal(Rift.contractProgress(state, 0), 45);
  assert.equal(Rift.claimContract(state, 0), 0);
});
test("relics cost seals, never duplicate and boost the intended production", () => {
  const state = Rift.fresh();
  state.upgrades[0] = 10;
  state.upgrades[1] = 10;
  const baseline = Rift.rates(state);
  state.sigils = 100;
  assert.equal(Rift.purchaseRelic(state, "blade"), true);
  assert.equal(Rift.purchaseRelic(state, "engine"), true);
  assert.equal(Rift.purchaseRelic(state, "blade"), false);
  assert.equal(state.sigils, 94);
  const boosted = Rift.rates(state);
  assert.equal(boosted.click, baseline.click * 1.25);
  assert.equal(boosted.idle, baseline.idle * 1.4);
});
test("chronometer affects surge duration and persists across rebirth and restore", () => {
  const state = Rift.fresh();
  state.sigils = 10;
  assert.equal(Rift.purchaseRelic(state, "chronometer"), true);
  assert.equal(Rift.surgeDuration(state), 18000);
  state.runEarned = 5000;
  Rift.rebirth(state);
  const recovered = Rift.restore(JSON.parse(JSON.stringify(state)));
  assert.equal(Rift.surgeDuration(recovered), 18000);
  assert.ok(Rift.hasRelic(recovered, "chronometer"));
});
test("malformed optional fields cannot forge owned relics or contract progress", () => {
  const value = Rift.fresh();
  value.relics = ["bogus", "blade", "blade"];
  value.sigils = -3;
  value.contracts = [{base:-100,claims:-200}, null, {}];
  const state = Rift.restore(value);
  assert.deepEqual(state.relics, ["blade"]);
  assert.equal(state.sigils, 0);
  assert.equal(state.contracts[0].claims, 0);
  assert.equal(Rift.contractProgress(state, 0), 0);
});
