// kubejs/server_scripts/trial_spawner_egg.js
// Makes a spawn egg on a trial spawner stick.
//
// Vanilla SpawnEggItem.useOn only sets the trial spawner's *next* mob (spawn_data). That is lost:
//   - after each spawn, when the config has spawn_potentials (re-rolled from the config), and
//   - when the cooldown ends, because TrialSpawnerData.reset() clears spawn_data.
// A trial spawner placed from an item has an empty config, so one egg would only last one cycle.
// This writes the egg's mob into normal_config and ominous_config spawn_potentials as well, so it persists.
// Vanilla's own egg handling still runs afterwards (event is not cancelled), so the egg is consumed normally.

const TrialSpawnerBE_E = Java.loadClass('net.minecraft.world.level.block.entity.TrialSpawnerBlockEntity')
const SpawnEggItem_E   = Java.loadClass('net.minecraft.world.item.SpawnEggItem')
const EntityType_E     = Java.loadClass('net.minecraft.world.entity.EntityType')
const TagParser_E      = Java.loadClass('net.minecraft.nbt.TagParser')
const CompoundTag_E    = Java.loadClass('net.minecraft.nbt.CompoundTag')

function setSpawnPotentials(tag, configKey, potentials) {
  if (!tag.contains(configKey)) tag.put(configKey, new CompoundTag_E())
  tag.getCompound(configKey).put('spawn_potentials', potentials.copy())
}

BlockEvents.rightClicked('minecraft:trial_spawner', event => {
  let stack = event.item
  if (!(stack.item instanceof SpawnEggItem_E)) return

  let be = event.block.entity
  if (!(be instanceof TrialSpawnerBE_E)) return

  let id = String(EntityType_E.getKey(stack.item.getType(stack)))
  let potentials = TagParser_E.parseTag('{p:[{weight:1,data:{entity:{id:"' + id + '"}}}]}').get('p')

  let reg = event.level.registryAccess()
  let tag = be.saveWithoutMetadata(reg)
  setSpawnPotentials(tag, 'normal_config', potentials)
  setSpawnPotentials(tag, 'ominous_config', potentials)
  be.loadWithComponents(tag, reg)                  // rebuilds the TrialSpawner via its codec, marks updated
  be.setChanged()
})
