// kubejs/server_scripts/spawner_silk_egg.js
// Requires: KubeJS 2101.x + LootJS 1.21.1 (NeoForge 1.21.1)
//
// Silk touch on a spawner drops:
//   1. the spawner (from your existing loot table, left empty)
//   2. the spawn egg for whatever mob that spawner was set to
// The player places the empty spawner and right-clicks it with the egg.
// Vanilla SpawnEggItem.useOn sets the spawner's mob in survival, so no
// placement hack or op bypass is needed.

const LootContextParams = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParams')
const SpawnerBlockEntity = Java.loadClass('net.minecraft.world.level.block.entity.SpawnerBlockEntity')
const EntityType = Java.loadClass('net.minecraft.world.entity.EntityType')
const SpawnEggItem = Java.loadClass('net.minecraft.world.item.SpawnEggItem')
const ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')

LootJS.modifiers(event => {
    event.addBlockModifier('minecraft:spawner').customAction((context, loot) => {
        // Only act when the loot table actually dropped the spawner (i.e. silk touch hit)
        if (!loot.hasItem('minecraft:spawner')) return

            const be = context.getParamOrNull(LootContextParams.BLOCK_ENTITY)
            if (!(be instanceof SpawnerBlockEntity)) return

                // SpawnerBlockEntity -> BaseSpawner.save() writes SpawnData: { entity: { id: "..." } }
                const tag = be.saveCustomOnly(context.getLevel().registryAccess())
                if (!tag.contains('SpawnData')) return
                    const entityTag = tag.getCompound('SpawnData').getCompound('entity')

                    const type = EntityType.by(entityTag).orElse(null)   // empty spawner -> null
                    if (type == null) return

                        const egg = SpawnEggItem.byId(type)                 // null if the mob has no egg
                        if (egg == null) return

                            loot.addItem(new ItemStack(egg))
    })
})
