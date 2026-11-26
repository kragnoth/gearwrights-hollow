// kubejs/startup_scripts/trial_spawner_mining.js
// Makes trial spawners mine like obsidian, but only a netherite pickaxe counts as the correct tool.
//
// Vanilla trial_spawner already has hardness 50 (same as obsidian) but does NOT require the correct
// tool, and is not in #minecraft:mineable/pickaxe, so it currently mines at bare-hand speed with anything.
// This script turns on requiresCorrectToolForDrops; the datapack tags in kubejs/data/ add:
//   #minecraft:mineable/pickaxe         -> pickaxe speed applies
//   #neoforge:needs_netherite_tool      -> NeoForge puts this inside every #minecraft:incorrect_for_<tier>_tool
//                                          below netherite, so diamond and lower are "wrong tool"
// Result: netherite pickaxe = obsidian speed + drops; anything else = 1/100 speed and no drops.

BlockEvents.modification(event => {
  event.modify('minecraft:trial_spawner', block => {
    block.setRequiresTool(true)
    block.setDestroySpeed(50)          // obsidian hardness (already vanilla's value, set explicitly)
    // block.setExplosionResistance(1200) // uncomment to also match obsidian's blast resistance (vanilla: 50)
  })
})
