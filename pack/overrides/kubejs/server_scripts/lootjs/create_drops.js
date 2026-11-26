// ================================================================
// Create-flavored loot sprinkle
//
// Adds "create:" items into vanilla chest loot tables and mob drop
// tables, scaled by tier:
//   TIER 1 (common)  - cogs, shafts, ingots, crushed ores
//   TIER 2 (mid)     - copper diving gear, brass mechanisms, casings
//   TIER 3 (high)    - rose quartz gear, precision mechanisms,
//                      refined radiance/shadow steel/chromatic
//                      compound, netherite diving suits
//
// CHEST tables use .pool(p => {...}) with a randomized roll COUNT
// (p.rolls([min, max])) and several WEIGHTED candidate entries, so
// each individual chest instance can come up empty, single-item, or
// stacked with 2-3 different items — rather than every chest of a
// given type deterministically having-or-lacking the exact same
// single item. This mimics the variance a "loot integrations"-style
// datapack gives you, without an extra mod dependency.
//
// MOB DROP tables are left as simple randomChance() rolls, since
// kill loot is already freshly re-randomized every single kill (no
// "every chest looks the same" problem to solve there).
//
// Built entirely against LootJS 3.7.0 / KubeJS 2101.7.2 / NeoForge
// 1.21.1 per the traced-from-source rule sheet — no deprecated or
// removed methods used. Count/roll ranges use the plain [min, max]
// array shorthand (NOT NumberProvider.uniform(), which double-wraps
// and fails to parse on this build).
// ================================================================

LootJS.modifiers(event => {

    // ============================================================
    // TIER 1 — COMMON: cogs, shafts, ingots, crushed ores
    // ============================================================

    event.addTableModifier("minecraft:chests/abandoned_mineshaft")
    .name("steamlands_mineshaft_parts")
    .pool(p => {
        p.rolls([0, 2]); // some mineshafts: nothing extra. others: 1-2 parts.
        p.addEntry(LootEntry.of("create:cogwheel", [1, 3]).withWeight(5));
        p.addEntry(LootEntry.of("create:large_cogwheel", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("create:shaft", [1, 3]).withWeight(4));
        p.addEntry(LootEntry.of("create:crushed_raw_iron", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("create:crushed_raw_copper", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("create:zinc_ingot", [1, 3]).withWeight(2));
    });

    event.addTableModifier("minecraft:chests/simple_dungeon")
    .name("steamlands_dungeon_parts")
    .pool(p => {
        p.rolls([0, 2]);
        p.addEntry(LootEntry.of("create:large_cogwheel", [1, 2]).withWeight(4));
        p.addEntry(LootEntry.of("create:shaft", [1, 3]).withWeight(4));
        p.addEntry(LootEntry.of("create:cogwheel", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("create:andesite_alloy", [1, 2]).withWeight(2));
    });

    event.addTableModifier([
        "minecraft:chests/village/village_weaponsmith",
        "minecraft:chests/village/village_toolsmith"
    ])
    .name("steamlands_village_smith_parts")
    .pool(p => {
        p.rolls([0, 2]);
        p.addEntry(LootEntry.of("create:brass_ingot", [1, 2]).withWeight(4));
        p.addEntry(LootEntry.of("create:iron_sheet", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("create:wrench").withWeight(2));
        p.addEntry(LootEntry.of("create:golden_sheet").withWeight(1)); // rare bonus
    });

    event.addTableModifier("minecraft:chests/ruined_portal")
    .name("steamlands_ruined_portal_scrap")
    .pool(p => {
        p.rolls([0, 1]);
        p.addEntry(LootEntry.of("create:zinc_ingot", [1, 3]).withWeight(3));
        p.addEntry(LootEntry.of("create:crushed_raw_zinc", [1, 2]).withWeight(2));
    });

    // Common mob drops — small per-kill chance of loose parts.
    event.addEntityModifier(["minecraft:zombie", "minecraft:husk"])
    .name("steamlands_zombie_scrap")
    .randomChance(0.06)
    .addLoot(LootEntry.of("create:zinc_nugget", [1, 2]));

    event.addEntityModifier("minecraft:skeleton")
    .name("steamlands_skeleton_scrap")
    .randomChance(0.06)
    .addLoot(LootEntry.of("create:brass_nugget", [1, 2]));

    event.addEntityModifier("minecraft:silverfish")
    .name("steamlands_silverfish_ore_dust")
    .randomChance(0.08)
    .addLoot(LootEntry.of("create:crushed_raw_zinc"));


    // ============================================================
    // TIER 2 — MID: copper diving gear, brass mechanisms, casings
    // ============================================================

    // Drowned keep individual chance rolls, per-item, on purpose —
    // per-kill randomness already gives variety, and this keeps the
    // rare diving-suit-piece drops feeling like distinct events.
    event.addEntityModifier("minecraft:drowned")
    .name("steamlands_drowned_diving_helmet")
    .randomChance(0.05)
    .addLoot(LootEntry.of("create:copper_diving_helmet").setCount(1));

    event.addEntityModifier("minecraft:drowned")
    .name("steamlands_drowned_diving_boots")
    .randomChance(0.05)
    .addLoot(LootEntry.of("create:copper_diving_boots").setCount(1));

    event.addEntityModifier("minecraft:drowned")
    .name("steamlands_drowned_backtank")
    .randomChance(0.03)
    .addLoot(LootEntry.of("create:copper_backtank").setCount(1));

    event.addTableModifier([
        "minecraft:chests/underwater_ruin_small",
        "minecraft:chests/underwater_ruin_big",
        "minecraft:chests/shipwreck_supply",
        "minecraft:chests/shipwreck_treasure"
    ])
    .name("steamlands_shipwreck_diving_parts")
    .pool(p => {
        p.rolls([0, 2]);
        p.addEntry(LootEntry.of("create:copper_sheet", [1, 3]).withWeight(4));
        p.addEntry(LootEntry.of("create:copper_nugget", [1, 3]).withWeight(3));
        p.addEntry(LootEntry.of("create:copper_diving_boots").withWeight(1));
        p.addEntry(LootEntry.of("create:copper_backtank").withWeight(1));
    });

    event.addTableModifier("minecraft:chests/buried_treasure")
    .name("steamlands_buried_treasure_brass")
    .pool(p => {
        p.rolls([1, 2]); // buried treasure should never come up empty-handed
        p.addEntry(LootEntry.of("create:golden_sheet", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("create:brass_ingot", [2, 4]).withWeight(4));
        p.addEntry(LootEntry.of("create:brass_sheet", [1, 2]).withWeight(2));
    });

    event.addTableModifier("minecraft:chests/nether_bridge")
    .name("steamlands_fortress_mechanism_parts")
    .pool(p => {
        p.rolls([0, 2]);
        p.addEntry(LootEntry.of("create:electron_tube", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("create:brass_casing").withWeight(2));
        p.addEntry(LootEntry.of("create:rose_quartz", [2, 5]).withWeight(1)); // rare tier-3 bleed-in
    });

    event.addTableModifier([
        "minecraft:chests/bastion_treasure",
        "minecraft:chests/bastion_other",
        "minecraft:chests/bastion_bridge",
        "minecraft:chests/bastion_hoglin_stable"
    ])
    .name("steamlands_bastion_mechanism_parts")
    .pool(p => {
        p.rolls([0, 2]);
        p.addEntry(LootEntry.of("create:incomplete_precision_mechanism").withWeight(2));
        p.addEntry(LootEntry.of("create:andesite_casing", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("create:rose_quartz", [2, 4]).withWeight(1)); // rare tier-3 bleed-in
    });

    event.addEntityModifier("minecraft:piglin")
    .name("steamlands_piglin_brass")
    .randomChance(0.04)
    .addLoot(LootEntry.of("create:brass_block"));


    // ============================================================
    // TIER 3 — HIGH: rose quartz gear, precision mechanisms,
    // refined radiance / shadow steel / chromatic compound,
    // netherite diving suits
    // ============================================================

    event.addEntityModifier("minecraft:wither_skeleton")
    .name("steamlands_wither_skeleton_high_tier")
    .randomChance(0.05)
    .addAlternativesLoot(
        LootEntry.of("create:chromatic_compound"),
                         LootEntry.of("create:shadow_steel")
    );

    // Trial Chambers vaults — always give SOMETHING (vaults are meant
    // to feel rewarding), but which item(s) vary per vault.
    event.addTableModifier(LootType.VAULT)
    .name("steamlands_vault_precision_and_quartz")
    .pool(p => {
        p.rolls([1, 2]);
        p.addEntry(LootEntry.of("create:precision_mechanism").withWeight(2));
        p.addEntry(LootEntry.of("create:polished_rose_quartz", [2, 4]).withWeight(3));
        p.addEntry(LootEntry.of("create:rose_quartz_lamp", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("create:refined_radiance").withWeight(1)); // rare surprise
    });

    event.addTableModifier(["minecraft:chests/ancient_city", "minecraft:chests/ancient_city_ice_box"])
    .name("steamlands_ancient_city_high_tier")
    .pool(p => {
        p.rolls([0, 2]);
        p.addEntry(LootEntry.of("create:refined_radiance").withWeight(2));
        p.addEntry(LootEntry.of("create:shadow_steel").withWeight(2));
        p.addEntry(LootEntry.of("create:precision_mechanism").withWeight(3));
        p.addEntry(LootEntry.of("create:chromatic_compound").withWeight(1)); // rare bonus
    });

    event.addEntityModifier("minecraft:warden")
    .name("steamlands_warden_high_tier")
    .randomChance(0.2)
    .addAlternativesLoot(
        LootEntry.of("create:refined_radiance"),
                         LootEntry.of("create:chromatic_compound", [1, 2])
    );

    event.addEntityModifier("minecraft:guardian")
    .name("steamlands_guardian_rose_quartz")
    .randomChance(0.05)
    .addLoot(LootEntry.of("create:rose_quartz", [1, 2]));

    event.addEntityModifier("minecraft:elder_guardian")
    .name("steamlands_elder_guardian_netherite_diving")
    .randomChance(0.12)
    .addAlternativesLoot(
        LootEntry.of("create:netherite_diving_helmet"),
                         LootEntry.of("create:netherite_diving_boots"),
                         LootEntry.of("create:netherite_backtank")
    );

    event.addTableModifier("minecraft:chests/end_city_treasure")
    .name("steamlands_end_city_netherite_diving")
    .pool(p => {
        p.rolls([0, 1]);
        p.addEntry(LootEntry.of("create:netherite_diving_helmet").withWeight(1));
        p.addEntry(LootEntry.of("create:netherite_diving_boots").withWeight(1));
    });

    // ============================================================
    // OVERARCHING CHEST SPRINKLE — ALL CHESTS IN GAME
    // ============================================================

    event.addTableModifier(LootType.CHEST)
    .name("steamlands_global_chest_create_items")
    .pool(p => {
        p.rolls([0, 1]); // 50% chance a chest rolls nothing, 50% chance it rolls one simple part
        p.addEntry(LootEntry.of("create:cogwheel", [1, 2]).withWeight(4));
        p.addEntry(LootEntry.of("create:large_cogwheel", [1, 2]).withWeight(4));
        p.addEntry(LootEntry.of("create:shaft", [1, 2]).withWeight(4));
        p.addEntry(LootEntry.of("create:gearbox", [1, 2]).withWeight(4));
        p.addEntry(LootEntry.of("create:andesite_alloy", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("create:andesite_casing", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("create:super_glue", [1, 1]).withWeight(2));
        p.addEntry(LootEntry.of("simulated:honey_glue", [1, 1]).withWeight(2));
        p.addEntry(LootEntry.of("create:zinc_nugget", [1, 4]).withWeight(2));
        p.addEntry(LootEntry.of("create:brass_nugget", [1, 4]).withWeight(2));
    });

});
