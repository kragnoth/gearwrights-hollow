// kubejs/server_scripts/lootjs/silk_trial_spawner.js
// Requires: LootJS 1.21.1
// When the trial spawner loot table drops a trial spawner (silk touch), also drop the spawn egg
// for its mob. The trial key / ominous key chances live in data/minecraft/loot_table/blocks/trial_spawner.json.

const LootContextParams_TS = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParams')
const TrialSpawnerBE       = Java.loadClass('net.minecraft.world.level.block.entity.TrialSpawnerBlockEntity')
const EntityType_TS        = Java.loadClass('net.minecraft.world.entity.EntityType')
const SpawnEggItem_TS      = Java.loadClass('net.minecraft.world.item.SpawnEggItem')

// Mob id from a saved trial spawner tag:
//   1. "spawn_data" (the mob it is about to spawn), if the spawner has been activated
//   2. otherwise a weighted pick from normal_config.spawn_potentials (never-activated natural spawners)
function trialSpawnerMobId(tag) {
  let direct = tag.getCompound('spawn_data').getCompound('entity').getString('id')
  if (direct != '') return direct

  let pots = tag.getCompound('normal_config').getList('spawn_potentials', 10)   // 10 = compound
  if (pots.size() == 0) return ''
  let total = 0
  for (let i = 0; i < pots.size(); i++) total += Math.max(1, pots.getCompound(i).getInt('weight'))
  let roll = Math.random() * total
  for (let i = 0; i < pots.size(); i++) {
    let entry = pots.getCompound(i)
    roll -= Math.max(1, entry.getInt('weight'))
    if (roll < 0) return entry.getCompound('data').getCompound('entity').getString('id')
  }
  return ''
}

LootJS.modifiers(event => {
  event.addBlockModifier('minecraft:trial_spawner').customAction((context, loot) => {
    if (!loot.hasItem('minecraft:trial_spawner')) return

    let be = context.getParamOrNull(LootContextParams_TS.BLOCK_ENTITY)
    if (!(be instanceof TrialSpawnerBE)) return

    let tag = be.saveCustomOnly(context.getLevel().registryAccess())
    let id = trialSpawnerMobId(tag)
    if (id == '') return

    let type = EntityType_TS.byString(id).orElse(null)
    if (type == null) return
    let egg = SpawnEggItem_TS.byId(type)          // null if the mob has no spawn egg
    if (egg == null) return

    loot.addItem(egg.getDefaultInstance())        // avoids the ItemStack(ItemLike)/ItemStack(Holder) overload clash
  })
})
