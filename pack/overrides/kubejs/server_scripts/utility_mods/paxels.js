ServerEvents.recipes(event => {

    // Helper function for custom paxel crafting shape
    const addPaxelRecipe = (material, paxelOutput) => {
        event.shaped(
            Item.of(paxelOutput, 1),
                     ['mmm',
                      'ms ',
                      ' s '
                     ],
                     {
                         m: material,            // The material ingredient
                         s: 'minecraft:stick'    // The handle
                     }
        )
    }

    // --- Standard Materials ---
    addPaxelRecipe('#minecraft:planks', 'paxels:wooden_paxel')
    addPaxelRecipe('#minecraft:stone_tool_materials', 'paxels:stone_paxel')
    addPaxelRecipe('minecraft:iron_ingot', 'paxels:iron_paxel')
    addPaxelRecipe('minecraft:gold_ingot', 'paxels:golden_paxel')
    addPaxelRecipe('minecraft:diamond', 'paxels:diamond_paxel')
    addPaxelRecipe('minecraft:netherite_ingot', 'paxels:netherite_paxel')

})
