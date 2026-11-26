// Incursion alloys (switch: incursionAlloys in startup_scripts/gh_progression_config.js)
//  Create still registers chromatic compound, shadow steel and refined radiance, but has had no recipe for them since 0.5:
//  they only dropped as rare loot, and their one use was Create Encased's cosmetic casings. Here they become the
//  Gearwrights' incursion materials, made from what leaks through the gates:
//    Chromatic Compound  superheated mixing: 3 powdered obsidian + polished rose quartz + glowstone + 250 mB tar
//                        (blaze cake + Tarbound tar: late Create, after the Nether)
//    Shadow Steel        mixing: compound + echo shard + 2 popped chorus fruit         (the Beyond: End + deep dark)
//    Refined Radiance    superheated mixing: compound + 2 glowstone + weakened soul    (the Below: Nether heat)
//  Uses: a third way to make the Gearwrights' Seal (Hallmarked), Create's shadow steel / refined radiance casings,
//  plus Create Encased's sheets as before. (A worldshaper recipe was tried and dropped: Create's worldshaper places blocks
//  without consuming them, so in survival it duplicates anything.)
//  The rare loot drops (create_drops.js, dying_world_loot_bridge.js) stay as a second source.
ServerEvents.recipes(event => {
    if (!global.GH_PROGRESSION.incursionAlloys) return

    event.custom({
        type: 'create:mixing',
        ingredients: [
            { item: 'create:powdered_obsidian' }, { item: 'create:powdered_obsidian' }, { item: 'create:powdered_obsidian' },
            { item: 'create:polished_rose_quartz' }, { item: 'minecraft:glowstone_dust' },
            { type: 'neoforge:single', amount: 250, fluid: 'tarbound:tar' }
        ],
        results: [{ id: 'create:chromatic_compound' }],
        heat_requirement: 'superheated'
    }).id('gearwrights:incursion/chromatic_compound')

    event.custom({
        type: 'create:mixing',
        ingredients: [
            { item: 'create:chromatic_compound' }, { item: 'minecraft:echo_shard' },
            { item: 'minecraft:popped_chorus_fruit' }, { item: 'minecraft:popped_chorus_fruit' }
        ],
        results: [{ id: 'create:shadow_steel' }]
    }).id('gearwrights:incursion/shadow_steel')

    event.custom({
        type: 'create:mixing',
        ingredients: [
            { item: 'create:chromatic_compound' }, { item: 'minecraft:glowstone_dust' }, { item: 'minecraft:glowstone_dust' },
            { item: 'tarbound:weakened_soul' }
        ],
        results: [{ id: 'create:refined_radiance' }],
        heat_requirement: 'superheated'
    }).id('gearwrights:incursion/refined_radiance')

    // the Guild's own mark: a third route to the Gearwrights' Seal (also nether star / dragon egg)
    event.shapeless('hallmarked:gearwrights_seal', ['hallmarked:smiths_stamp', 'create:shadow_steel', 'create:refined_radiance'])
        .id('gearwrights:incursion/gearwrights_seal')

    // Create's own casings for the two alloys (Create has the blocks but no recipe)
    event.custom({ type: 'create:item_application', ingredients: [{ item: 'create:brass_casing' }, { item: 'create:shadow_steel' }],
        results: [{ id: 'create:shadow_steel_casing' }] }).id('gearwrights:incursion/shadow_steel_casing')
    event.custom({ type: 'create:item_application', ingredients: [{ item: 'create:brass_casing' }, { item: 'create:refined_radiance' }],
        results: [{ id: 'create:refined_radiance_casing' }] }).id('gearwrights:incursion/refined_radiance_casing')
})
