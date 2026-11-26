PlayerEvents.loggedIn(event => {
    let player = event.player
    let pData = player.persistentData

    if (pData.getBoolean('first_join_kit')) return
        pData.putBoolean('first_join_kit', true)

        let backpack = Item.of('sophisticatedbackpacks:iron_backpack[sophisticatedcore:number_of_inventory_slots=63,sophisticatedcore:number_of_upgrade_slots=3]')
        backpack.setCustomName(Text.of('Starter Pack').yellow())

        try {
            let BackpackWrapper = Java.loadClass('net.p3pp3rf1y.sophisticatedbackpacks.backpack.wrapper.BackpackWrapper')
            let wrapper = BackpackWrapper.fromStack(backpack)

            // Touching getInventoryHandler() first assigns the backpack's storage UUID

            wrapper.getInventoryHandler()

            let upgrades = wrapper.getUpgradeHandler()
            upgrades.setStackInSlot(0, Item.of('sophisticatedbackpacks:stonecutter_upgrade'))
            upgrades.setStackInSlot(1, Item.of('sophisticatedbackpacks:crafting_upgrade'))
        } catch (e) {
            console.warn(`[first_join_kit] Could not install backpack upgrades: ${e}`)
        }

        let kit = [
            Item.of('minecraft:stone_pickaxe'),
                      Item.of('minecraft:stone_shovel'),
                      Item.of('minecraft:stone_axe'), // was a duplicate stone_shovel
                      Item.of('minecraft:stone_sword'),
                      Item.of('minecraft:bread', 16),
                      Item.of('minecraft:torch', 16),
                      Item.of('minecraft:stick', 16),
                      Item.of('minecraft:oak_planks', 16),
                      backpack,
                      Item.of('minecraft:leather_leggings'),
                      Item.of('minecraft:leather_boots'),
                      Item.of('minecraft:leather_chestplate'),
        ]

        kit.forEach(stack => {
            if (!stack.isEmpty()) {
                player.give(stack)
            } else {
                console.warn(`[first_join_kit] Could not create item stack (mod missing or invalid ID)`)
            }
        })

        player.tell(Text.green('Welcome! You have received a starter kit.'))
})
