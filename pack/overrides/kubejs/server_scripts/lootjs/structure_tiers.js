// ================================================================
// Gearwright's Hollow - structure loot tiers (Industry on-ramp)
// kubejs/server_scripts/lootjs/structure_tiers.js
//
// Your create_drops.js seeds Create parts into vanilla chests, and the
// global chest pool adds cogs/nuggets everywhere. Nothing seeds the
// Industry tier (IE, Caverns & Chasms metals, oil) and your own
// gearwrights landmark/abandoned chests are vanilla-only. This adds:
//
//   TIER A  abandoned homes, camps, cabins, villages  -> lead/nickel/tin
//           ore and nuggets (lets players start the IE line)
//   TIER B  landmarks (chapel, mine, crypt, tower...) -> silver, IE plates,
//           IE hammer, core sample
//   OIL     Tarbound research sites                    -> seismic survey,
//           core sample, paraffin (points players at Immersive Petroleum)
//
// Deliberately NOT seeded: steel plates/components, EnderIO parts and
// Create New Age parts - your progression/*.js scripts gate those.
// Same API style as create_drops.js (LootJS 3.x, [min, max] arrays).
// All item and table ids were checked against the pack scrape.
// ================================================================

LootJS.modifiers(event => {

    // ---------------- TIER A ----------------
    event.addTableModifier([
        "gearwrights:chests/abandoned/house",
        "gearwrights:chests/abandoned/workshop",
        "gearwrights:chests/abandoned/study",
        "gearwrights:chests/abandoned/larder",
        "abandoned_cabins:chests/abandonedcabinloot",
        "abandoned_cabins:chests/freshcabinloot",
        "environmental:chests/log_cabin",
        "minecraft:chests/abandoned_camp_common_chest",
        "minecraft:chests/abandoned_camp_secret_chest",
        "watchtower_building:chests/towerloot",
        "watchtower_building:chests/fresh_towerloot"
    ])
    .name("gearwrights_tier_a_remnants")
    .pool(p => {
        p.rolls([0, 1]);
        p.addEntry(LootEntry.of("immersiveengineering:nugget_lead", [2, 5]).withWeight(5));
        p.addEntry(LootEntry.of("minecraft:copper_nugget", [2, 5]).withWeight(4));
        p.addEntry(LootEntry.of("immersiveengineering:raw_lead", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("immersiveengineering:nugget_nickel", [1, 3]).withWeight(2));
        p.addEntry(LootEntry.of("caverns_and_chasms:raw_tin", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("caverns_and_chasms:silver_nugget", [1, 3]).withWeight(1));
    });

    // Vanilla village house chests (Towns & Towers and the abandoned
    // villages fall back to these). The two smith tables are skipped:
    // create_drops.js already handles them.
    event.addTableModifier([
        "minecraft:chests/village/village_armorer",
        "minecraft:chests/village/village_butcher",
        "minecraft:chests/village/village_cartographer",
        "minecraft:chests/village/village_desert_house",
        "minecraft:chests/village/village_fisher",
        "minecraft:chests/village/village_fletcher",
        "minecraft:chests/village/village_mason",
        "minecraft:chests/village/village_plains_house",
        "minecraft:chests/village/village_savanna_house",
        "minecraft:chests/village/village_shepherd",
        "minecraft:chests/village/village_snowy_house",
        "minecraft:chests/village/village_taiga_house",
        "minecraft:chests/village/village_tannery",
        "minecraft:chests/village/village_temple",
        "windswept:chests/village/village_frozen_house"
    ])
    .name("gearwrights_tier_a_villages")
    .pool(p => {
        p.rolls([0, 1]);
        p.addEntry(LootEntry.of("immersiveengineering:nugget_lead", [1, 4]).withWeight(4));
        p.addEntry(LootEntry.of("minecraft:copper_nugget", [1, 4]).withWeight(4));
        p.addEntry(LootEntry.of("immersiveengineering:nugget_nickel", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("caverns_and_chasms:silver_nugget", [1, 2]).withWeight(1));
    });

    // Outposts: a little more metal, still ore-grade only.
    event.addTableModifier([
        "minecraft:chests/pillager_outpost",
        "kaisyn:outpost/common/armory"
    ])
    .name("gearwrights_tier_a_outposts")
    .pool(p => {
        p.rolls([0, 2]);
        p.addEntry(LootEntry.of("immersiveengineering:raw_lead", [1, 3]).withWeight(3));
        p.addEntry(LootEntry.of("immersiveengineering:raw_nickel", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("immersiveengineering:nugget_lead", [2, 5]).withWeight(4));
    });

    // ---------------- TIER B ----------------
    event.addTableModifier([
        "gearwrights:chests/landmark/chapel",
        "gearwrights:chests/landmark/crypt",
        "gearwrights:chests/landmark/cellar",
        "gearwrights:chests/landmark/study",
        "gearwrights:chests/landmark/tower_top"
    ])
    .name("gearwrights_tier_b_landmarks")
    .pool(p => {
        p.rolls([1, 2]);
        p.addEntry(LootEntry.of("caverns_and_chasms:silver_ingot", [1, 2]).withWeight(4));   // silver hurts the undead
        p.addEntry(LootEntry.of("caverns_and_chasms:silver_nugget", [3, 6]).withWeight(4));
        p.addEntry(LootEntry.of("immersiveengineering:plate_lead", [1, 2]).withWeight(3));
        p.addEntry(LootEntry.of("immersiveengineering:plate_nickel", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("immersiveengineering:component_iron", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("immersiveengineering:hammer").withWeight(1));
    });

    // Collapsed minehead: ore and survey tools (oil quest needs a core sample).
    event.addTableModifier("gearwrights:chests/landmark/mine")
    .name("gearwrights_tier_b_minehead")
    .pool(p => {
        p.rolls([1, 2]);
        p.addEntry(LootEntry.of("immersiveengineering:raw_lead", [2, 4]).withWeight(4));
        p.addEntry(LootEntry.of("immersiveengineering:raw_nickel", [1, 3]).withWeight(3));
        p.addEntry(LootEntry.of("caverns_and_chasms:raw_silver", [1, 3]).withWeight(3));
        p.addEntry(LootEntry.of("caverns_and_chasms:raw_tin", [1, 3]).withWeight(3));
        p.addEntry(LootEntry.of("immersiveengineering:raw_aluminum", [1, 2]).withWeight(2));
        p.addEntry(LootEntry.of("immersiveengineering:coresample").withWeight(2));
    });

    // ---------------- OIL ----------------
    event.addTableModifier([
        "tarbound:chests/researcher_cabin",
        "tarbound:chests/drowned_radio",
        "tarbound:chests/charnel_crypt",
        "tarbound:chests/wayside_shrine",
        "tarbound:chests/burned_cabin",
        "tarbound:chests/trapper_cabin"
    ])
    .name("gearwrights_tarbound_oil_hints")
    .pool(p => {
        p.rolls([0, 1]);
        p.addEntry(LootEntry.of("immersiveengineering:coresample").withWeight(3));
        p.addEntry(LootEntry.of("immersivepetroleum:seismic_survey").withWeight(2));
        p.addEntry(LootEntry.of("immersivepetroleum:paraffin_wax", [1, 3]).withWeight(3));
        p.addEntry(LootEntry.of("immersiveengineering:manual").withWeight(1));
    });

});
