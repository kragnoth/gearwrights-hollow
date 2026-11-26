ServerEvents.recipes(event => {
    // Standard Farmland
    event.shapeless('minecraft:farmland', [
        'minecraft:dirt',
        '#minecraft:hoes'
    ]).keepIngredient('#minecraft:hoes').id('arkaneworx:farmland');

    // Farmer's Delight: Rich Soil Farmland
    event.shapeless('farmersdelight:rich_soil_farmland', [
        'farmersdelight:rich_soil',
        '#minecraft:hoes'
    ]).keepIngredient('#minecraft:hoes').id('arkaneworx:rich_soil_farmland');

    // My Nethers Delight: Resurgent Soil Farmland
    event.shapeless('mynethersdelight:resurgent_soil_farmland', [
        'mynethersdelight:resurgent_soil',
        '#minecraft:hoes'
    ]).keepIngredient('#minecraft:hoes').id('arkaneworx:resurgent_soil_farmland');

    // Farming for Blockheads: Stable Farmland (Yellow Fertilizer)
    event.shapeless('farmingforblockheads:fertilized_farmland_stable', [
        'minecraft:dirt',
        'farmingforblockheads:yellow_fertilizer',
        '#minecraft:hoes'
    ]).keepIngredient('#minecraft:hoes').id('arkaneworx:fertilized_farmland_stable');

    // Farming for Blockheads: Rich Farmland (Green Fertilizer)
    event.shapeless('farmingforblockheads:fertilized_farmland_rich', [
        'minecraft:dirt',
        'farmingforblockheads:green_fertilizer',
        '#minecraft:hoes'
    ]).keepIngredient('#minecraft:hoes').id('arkaneworx:fertilized_farmland_rich');

    // Farming for Blockheads: Healthy Farmland (Red Fertilizer)
    event.shapeless('farmingforblockheads:fertilized_farmland_healthy', [
        'minecraft:dirt',
        'farmingforblockheads:red_fertilizer',
        '#minecraft:hoes'
    ]).keepIngredient('#minecraft:hoes').id('arkaneworx:fertilized_farmland_healthy');

    // Farming for Blockheads: Rich Stable Farmland (Green + Yellow Fertilizer)
    event.shapeless('farmingforblockheads:fertilized_farmland_rich_stable', [
        'minecraft:dirt',
        'farmingforblockheads:green_fertilizer',
        'farmingforblockheads:yellow_fertilizer',
        '#minecraft:hoes'
    ]).keepIngredient('#minecraft:hoes').id('arkaneworx:fertilized_farmland_rich_stable');

    // Farming for Blockheads: Healthy Stable Farmland (Red + Yellow Fertilizer)
    event.shapeless('farmingforblockheads:fertilized_farmland_healthy_stable', [
        'minecraft:dirt',
        'farmingforblockheads:red_fertilizer',
        'farmingforblockheads:yellow_fertilizer',
        '#minecraft:hoes'
    ]).keepIngredient('#minecraft:hoes').id('arkaneworx:fertilized_farmland_healthy_stable');
});
