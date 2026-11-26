// kubejs/startup_scripts/grow_lamp_block.js
// Registers the Grow Lamp: a glass block with glowstone in it that boosts nearby crops.
// It has no item form. Players make it in-world (glowstone dust on glass) and breaking it
// returns glass + glowstone dust via data/kubejs/loot_table/blocks/grow_lamp.json.
//
// Textures: the model (assets/kubejs/models/block/grow_lamp_base.json) is a glass shell around a
// fullbright inner core. It only references texture IDs, so whatever resource pack or mod currently
// provides these textures is what you see. Swap the IDs to any loaded texture, modded ones included.
let LAMP_TEXTURES = {
  glass: 'minecraft:block/glass',       // outer shell, e.g. 'create:block/framed_glass'
  core:  'minecraft:block/glowstone',   // inner fullbright core, e.g. 'minecraft:block/ochre_froglight_side'
  particle: 'minecraft:block/glass'     // break particles
}

StartupEvents.registry('block', event => {
  event.create('kubejs:grow_lamp')
    .displayName('Grow Lamp')
    .parentModel('kubejs:block/grow_lamp_base')
    .textures(LAMP_TEXTURES)
    .glassSoundType()
    .hardness(0.3)
    .resistance(0.3)
    .lightLevel(1.0)          // 0..1 in KubeJS 2101 -> light 15, also satisfies crop light checks
    .defaultCutout()          // same render type as vanilla glass
    .noItem()                 // also sets NO_DROPS, so the datapack loot table is used instead
    .blockEntity(be => {
      be.serverTicking()
      be.tickFrequency(20)    // one scan per second; logic lives in server_scripts/grow_lamp.js
    })
})
