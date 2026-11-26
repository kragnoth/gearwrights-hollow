// Create cutting: EVERY log / wood / stem / hyphae -> its stripped variant + bark.
//
// Create generates its own unstripped -> stripped cutting recipes at runtime, so
// their IDs aren't known ahead of time. Each pair below first removes any
// create:cutting recipe that outputs the stripped block, then adds the bark version.
//
// Pairs were derived from item.json: every `<ns>:stripped_X` item whose
// unstripped `<ns>:X` also exists (98 pairs). Re-generate the list if you add wood mods.

ServerEvents.recipes(event => {
    // Default bark output (Farmer's Delight)
    const BARK_ITEM = 'farmersdelight:tree_bark'
    const PROCESSING_TIME = 50

    // [ unstripped input, stripped output ]
    const STRIPPABLES = [
        // atmospheric
        ['atmospheric:aspen_log', 'atmospheric:stripped_aspen_log'],
        ['atmospheric:aspen_wood', 'atmospheric:stripped_aspen_wood'],
        ['atmospheric:grimwood', 'atmospheric:stripped_grimwood'],
        ['atmospheric:grimwood_log', 'atmospheric:stripped_grimwood_log'],
        ['atmospheric:kousa_log', 'atmospheric:stripped_kousa_log'],
        ['atmospheric:kousa_wood', 'atmospheric:stripped_kousa_wood'],
        ['atmospheric:laurel_log', 'atmospheric:stripped_laurel_log'],
        ['atmospheric:laurel_wood', 'atmospheric:stripped_laurel_wood'],
        ['atmospheric:morado_log', 'atmospheric:stripped_morado_log'],
        ['atmospheric:morado_wood', 'atmospheric:stripped_morado_wood'],
        ['atmospheric:rosewood', 'atmospheric:stripped_rosewood'],
        ['atmospheric:rosewood_log', 'atmospheric:stripped_rosewood_log'],
        ['atmospheric:yucca_log', 'atmospheric:stripped_yucca_log'],
        ['atmospheric:yucca_wood', 'atmospheric:stripped_yucca_wood'],

        // autumnity
        ['autumnity:maple_log', 'autumnity:stripped_maple_log'],
        ['autumnity:maple_wood', 'autumnity:stripped_maple_wood'],

        // caverns_and_chasms
        ['caverns_and_chasms:azalea_log', 'caverns_and_chasms:stripped_azalea_log'],
        ['caverns_and_chasms:azalea_wood', 'caverns_and_chasms:stripped_azalea_wood'],

        // environmental
        ['environmental:pine_log', 'environmental:stripped_pine_log'],
        ['environmental:pine_wood', 'environmental:stripped_pine_wood'],
        ['environmental:plum_log', 'environmental:stripped_plum_log'],
        ['environmental:plum_wood', 'environmental:stripped_plum_wood'],
        ['environmental:willow_log', 'environmental:stripped_willow_log'],
        ['environmental:willow_wood', 'environmental:stripped_willow_wood'],
        ['environmental:wisteria_log', 'environmental:stripped_wisteria_log'],
        ['environmental:wisteria_wood', 'environmental:stripped_wisteria_wood'],

        // minecraft
        ['minecraft:acacia_log', 'minecraft:stripped_acacia_log'],
        ['minecraft:acacia_wood', 'minecraft:stripped_acacia_wood'],
        ['minecraft:birch_log', 'minecraft:stripped_birch_log'],
        ['minecraft:birch_wood', 'minecraft:stripped_birch_wood'],
        ['minecraft:cherry_log', 'minecraft:stripped_cherry_log'],
        ['minecraft:cherry_wood', 'minecraft:stripped_cherry_wood'],
        ['minecraft:crimson_hyphae', 'minecraft:stripped_crimson_hyphae'],
        ['minecraft:crimson_stem', 'minecraft:stripped_crimson_stem'],
        ['minecraft:dark_oak_log', 'minecraft:stripped_dark_oak_log'],
        ['minecraft:dark_oak_wood', 'minecraft:stripped_dark_oak_wood'],
        ['minecraft:jungle_log', 'minecraft:stripped_jungle_log'],
        ['minecraft:jungle_wood', 'minecraft:stripped_jungle_wood'],
        ['minecraft:mangrove_log', 'minecraft:stripped_mangrove_log'],
        ['minecraft:mangrove_wood', 'minecraft:stripped_mangrove_wood'],
        ['minecraft:oak_log', 'minecraft:stripped_oak_log'],
        ['minecraft:oak_wood', 'minecraft:stripped_oak_wood'],
        ['minecraft:pale_oak_log', 'minecraft:stripped_pale_oak_log'],
        ['minecraft:pale_oak_wood', 'minecraft:stripped_pale_oak_wood'],
        ['minecraft:spruce_log', 'minecraft:stripped_spruce_log'],
        ['minecraft:spruce_wood', 'minecraft:stripped_spruce_wood'],
        ['minecraft:warped_hyphae', 'minecraft:stripped_warped_hyphae'],
        ['minecraft:warped_stem', 'minecraft:stripped_warped_stem'],

        // regions_unexplored
        ['regions_unexplored:bamboo_log', 'regions_unexplored:stripped_bamboo_log'],
        ['regions_unexplored:baobab_log', 'regions_unexplored:stripped_baobab_log'],
        ['regions_unexplored:baobab_wood', 'regions_unexplored:stripped_baobab_wood'],
        ['regions_unexplored:blackwood_log', 'regions_unexplored:stripped_blackwood_log'],
        ['regions_unexplored:blackwood_wood', 'regions_unexplored:stripped_blackwood_wood'],
        ['regions_unexplored:blue_bioshroom_hyphae', 'regions_unexplored:stripped_blue_bioshroom_hyphae'],
        ['regions_unexplored:blue_bioshroom_stem', 'regions_unexplored:stripped_blue_bioshroom_stem'],
        ['regions_unexplored:brimwood_log', 'regions_unexplored:stripped_brimwood_log'],
        ['regions_unexplored:brimwood_wood', 'regions_unexplored:stripped_brimwood_wood'],
        ['regions_unexplored:cobalt_log', 'regions_unexplored:stripped_cobalt_log'],
        ['regions_unexplored:cobalt_wood', 'regions_unexplored:stripped_cobalt_wood'],
        ['regions_unexplored:cypress_log', 'regions_unexplored:stripped_cypress_log'],
        ['regions_unexplored:cypress_wood', 'regions_unexplored:stripped_cypress_wood'],
        ['regions_unexplored:dead_log', 'regions_unexplored:stripped_dead_log'],
        ['regions_unexplored:dead_wood', 'regions_unexplored:stripped_dead_wood'],
        ['regions_unexplored:eucalyptus_log', 'regions_unexplored:stripped_eucalyptus_log'],
        ['regions_unexplored:eucalyptus_wood', 'regions_unexplored:stripped_eucalyptus_wood'],
        ['regions_unexplored:green_bioshroom_hyphae', 'regions_unexplored:stripped_green_bioshroom_hyphae'],
        ['regions_unexplored:green_bioshroom_stem', 'regions_unexplored:stripped_green_bioshroom_stem'],
        ['regions_unexplored:joshua_log', 'regions_unexplored:stripped_joshua_log'],
        ['regions_unexplored:joshua_wood', 'regions_unexplored:stripped_joshua_wood'],
        ['regions_unexplored:kapok_log', 'regions_unexplored:stripped_kapok_log'],
        ['regions_unexplored:kapok_wood', 'regions_unexplored:stripped_kapok_wood'],
        ['regions_unexplored:larch_log', 'regions_unexplored:stripped_larch_log'],
        ['regions_unexplored:larch_wood', 'regions_unexplored:stripped_larch_wood'],
        ['regions_unexplored:magnolia_log', 'regions_unexplored:stripped_magnolia_log'],
        ['regions_unexplored:magnolia_wood', 'regions_unexplored:stripped_magnolia_wood'],
        ['regions_unexplored:maple_log', 'regions_unexplored:stripped_maple_log'],
        ['regions_unexplored:maple_wood', 'regions_unexplored:stripped_maple_wood'],
        ['regions_unexplored:palm_log', 'regions_unexplored:stripped_palm_log'],
        ['regions_unexplored:palm_wood', 'regions_unexplored:stripped_palm_wood'],
        ['regions_unexplored:pine_log', 'regions_unexplored:stripped_pine_log'],
        ['regions_unexplored:pine_wood', 'regions_unexplored:stripped_pine_wood'],
        ['regions_unexplored:pink_bioshroom_hyphae', 'regions_unexplored:stripped_pink_bioshroom_hyphae'],
        ['regions_unexplored:pink_bioshroom_stem', 'regions_unexplored:stripped_pink_bioshroom_stem'],
        ['regions_unexplored:redwood_log', 'regions_unexplored:stripped_redwood_log'],
        ['regions_unexplored:redwood_wood', 'regions_unexplored:stripped_redwood_wood'],
        ['regions_unexplored:small_oak_log', 'regions_unexplored:stripped_small_oak_log'],
        ['regions_unexplored:socotra_log', 'regions_unexplored:stripped_socotra_log'],
        ['regions_unexplored:socotra_wood', 'regions_unexplored:stripped_socotra_wood'],
        ['regions_unexplored:willow_log', 'regions_unexplored:stripped_willow_log'],
        ['regions_unexplored:willow_wood', 'regions_unexplored:stripped_willow_wood'],
        ['regions_unexplored:wisteria_log', 'regions_unexplored:stripped_wisteria_log'],
        ['regions_unexplored:wisteria_wood', 'regions_unexplored:stripped_wisteria_wood'],
        ['regions_unexplored:yellow_bioshroom_hyphae', 'regions_unexplored:stripped_yellow_bioshroom_hyphae'],
        ['regions_unexplored:yellow_bioshroom_stem', 'regions_unexplored:stripped_yellow_bioshroom_stem']

    ]

    // Not logs, so left out by default (bamboo blocks / powdery cane block).
    // Move them into STRIPPABLES if you want bark from them too.
    // ['minecraft:bamboo_block', 'minecraft:stripped_bamboo_block'], ['mynethersdelight:powdery_block', 'mynethersdelight:stripped_powdery_block']

    STRIPPABLES.forEach(pair => {
        const input = pair[0]
        const output = pair[1]

        // Drop Create's runtime-generated (or any other) cutting recipe for this output
        event.remove({ type: 'create:cutting', output: output })

        event.custom({
            type: 'create:cutting',
            ingredients: [
                { item: input }
            ],
            results: [
                { item: { id: output, count: 1 } },
                { item: { id: BARK_ITEM, count: 1 } }
            ],
            processingTime: PROCESSING_TIME
        }).id('kubejs:create_cutting/' + output.replace(':', '_'))
    })
})
