// KubeJS 1.21.1 (NeoForge) tag compatibility fixes

ServerEvents.tags('item', event => {
    // --- Mod Integration & Crafting Basics ---
    event.add('ars_nouveau:golem/shard', ['extendedae:entro_crystal', 'minecraft:amethyst_shard'])
    event.add('ae2:metal_ingots', ['create:brass_ingot', 'immersiveengineering:ingot_nickel', 'minecraft:iron_ingot', 'minecraft:copper_ingot', 'minecraft:gold_ingot'])
    event.add('minecraft:trim_materials', [
        'minecraft:amethyst_shard',
        'minecraft:diamond',
        'minecraft:emerald',
        'minecraft:iron_ingot',
        'minecraft:resin_brick',
        'neovitae:demonite_trim_ingot'
    ])
    event.add('enderio:cloud_cold', ['minecraft:blue_ice', 'minecraft:packed_ice', 'minecraft:snow_block', 'minecraft:snowball'])
    event.add('arseng:p2p_attunements/spell_p2p_tunnel', ['ars_nouveau:spell_prism', 'ars_nouveau:void_prism'])
    event.add('c:tools/ranged_weapon', ['minecraft:bow', 'minecraft:crossbow', 'minecraft:trident'])
    event.add('minecraft:lectern_books', ['ars_nouveau:caster_tome', 'ars_nouveau:worn_notebook', 'immersiveengineering:manual', 'minecraft:writable_book', 'minecraft:written_book', 'neovitae:guide_book'])
    event.add('ae2:p2p_attunements/fluid_p2p_tunnel', ['minecraft:water_bucket', 'minecraft:bucket', 'minecraft:lava_bucket', 'minecraft:milk_bucket'])
    event.add('farmersdelight:serving_containers', ['minecraft:bowl', 'minecraft:bucket'])
    event.add('enderio:explosives', 'minecraft:gunpowder')
    event.add('aeronautics:levitite_catalyzer', ['minecraft:campfire', 'minecraft:fire_charge'])
    event.add('ars_nouveau:wilden_drop', 'ars_nouveau:wilden_horn')
    event.add('supplementaries:lunch_basket_blacklist', ['minecraft:lingering_potion', 'minecraft:splash_potion', 'supplementaries:lunch_basket'])

    // --- Curios & Accessories ---
    event.add('curios:curio', [
        'advanced_ae:wireless_quantum_crafter_terminal',
        'ae2:wireless_crafting_terminal',
        'ae2:wireless_terminal',
        'ae2wtlib:wireless_pattern_access_terminal',
        'ae2wtlib:wireless_pattern_encoding_terminal',
        'ae2wtlib:wireless_universal_terminal',
        'extendedae:wireless_ex_pat',
        'powah:battery_basic',
        'powah:battery_blazing',
        'powah:battery_hardened',
        'powah:battery_niotic',
        'powah:battery_nitro',
        'powah:battery_spirited',
        'powah:battery_starter'
    ])
    event.add('curios:charm', [
        'enderio:electromagnet',
        'enderio:staff_of_travelling',
        'minecraft:totem_of_undying',
        'neovitae:experience_tome',
        'neovitae:sigil_divination',
        'neovitae:sigil_fast_miner',
        'neovitae:sigil_frost',
        'neovitae:sigil_green_grove',
        'neovitae:sigil_holding',
        'neovitae:sigil_magnetism',
        'neovitae:sigil_seer',
        'neovitae:sigil_suppression',
        'neovitae:spiritus_gauge'
    ])
    event.add('accessories:back', 'sophisticatedbackpacks:netherite_backpack')
    event.add('curios:back', ['immersiveengineering:powerpack', 'sophisticatedbackpacks:netherite_backpack'])
    event.add('ars_nouveau:spellbook', ['ars_nouveau:archmage_spell_book', 'ars_nouveau:creative_spell_book'])

    // --- Food, Agriculture & Diet ---
    event.add('diet:sugars', [
        'arsdelight:activated_bastion_jam', 'arsdelight:activated_mendosteen_jam', 'arsdelight:bastion_jelly', 'arsdelight:bastion_pie_slice',
        'arsdelight:bombegrante_jelly', 'arsdelight:bombegrante_pie_slice', 'arsdelight:dawnberry_jelly', 'arsdelight:dawnberry_pie_slice',
        'arsdelight:flashpine_jelly', 'arsdelight:flashpine_pie_slice', 'arsdelight:frostaya_jelly', 'arsdelight:frostaya_pie_slice',
        'arsdelight:lightchee_jelly', 'arsdelight:lightchee_pie_slice', 'arsdelight:mendosteen_jelly', 'arsdelight:mendosteen_pie_slice',
        'arsdelight:neutralized_bombegrante_jam', 'arsdelight:neutralized_dawnberry_jam', 'arsdelight:neutralized_flashpine_jam',
        'arsdelight:neutralized_frostaya_jam', 'arsdelight:neutralized_lightchee_jam', 'arsdelight:skittle_stew', 'arsdelight:source_berry_cookie',
        'arsdelight:source_berry_cupcake', 'arsdelight:source_berry_jam', 'arsdelight:source_berry_jelly', 'arsdelight:source_berry_pie_slice',
        'fruitsdelight:bayberry_cookie', 'fruitsdelight:blueberry_custard', 'fruitsdelight:blueberry_muffin', 'fruitsdelight:cranberry_cookie',
        'fruitsdelight:cranberry_muffin', 'fruitsdelight:durian_pie', 'fruitsdelight:fig_pudding_slice', 'fruitsdelight:fig_tart',
        'fruitsdelight:hawberry_roll', 'fruitsdelight:jam_bread', 'fruitsdelight:lemon_cookie', 'fruitsdelight:lemon_tart',
        'fruitsdelight:pear_with_rock_sugar', 'fruitsdelight:persimmon_cookie', 'fruitsdelight:pineapple_pie'
    ])
    event.add('fruitsdelight:juice', ['fruitsdelight:hamimelon_shaved_ice', 'fruitsdelight:mango_milkshake'])
    event.add('createdieselgenerators:fermentable', ['farmersdelight:onion', 'farmersdelight:tomato', 'minecraft:potato', 'minecraft:sugar_cane', 'minecraft:sugar'])
    event.add('c:foods/raw_pork', 'minecraft:porkchop')
    event.add('minecraft:pig_food', ['farmersdelight:cabbage', 'farmersdelight:tomato', 'minecraft:beetroot'])
    event.add('c:seeds', [
        'ars_nouveau:magebloom_crop', 'farmersdelight:rice', 'minecraft:torchflower_seeds',
        'rusticdelight:bell_pepper_seeds', 'rusticdelight:coffee_beans', 'rusticdelight:cotton_seeds',
        'rusticdelight:dark_bell_pepper_seeds', 'rusticdelight:pale_bell_pepper_seeds', 'supplementaries:flax_seeds'
    ])
    event.add('c:foods/raw_meat', ['minersdelight:arthropod', 'mynethersdelight:minced_strider'])
    event.add('c:foods/vegetable', ['farmersdelight:onion', 'farmersdelight:tomato', 'minecraft:beetroot', 'minecraft:carrot', 'minecraft:golden_carrot'])

    // --- Flora & Wood Types ---
    event.add('minecraft:tall_flowers', [
        'farmersdelight:wild_rice',
        'minecraft:pitcher_plant'
    ])
    event.add('minecraft:small_flowers', [
        'minecraft:closed_eyeblossom', 'minecraft:open_eyeblossom', 'rusticdelight:wild_bell_peppers',
        'rusticdelight:wild_coffee', 'rusticdelight:wild_cotton', 'rusticdelight:wild_dark_bell_peppers',
        'rusticdelight:wild_pale_bell_peppers'
    ])
    event.add('minecraft:logs', ['minecraft:pale_oak_log', 'minecraft:pale_oak_wood', 'minecraft:stripped_pale_oak_log', 'minecraft:stripped_pale_oak_wood'])
    event.add('c:stripped_woods', ['ars_nouveau:stripped_green_archwood_wood', 'ars_nouveau:stripped_purple_archwood_wood', 'ars_nouveau:stripped_red_archwood_wood'])
    event.add('c:stripped_logs', ['ars_nouveau:stripped_green_archwood_log', 'ars_nouveau:stripped_purple_archwood_log', 'ars_nouveau:stripped_red_archwood_log'])
    event.add('minecraft:planks', 'immersiveengineering:fiberboard')

    // --- Ores, Materials & Tech ---
    event.add('create_new_age:stops_radiation', ['create_new_age:reactor_fuel_acceptor', 'create_new_age:reactor_heat_vent', 'create_new_age:reactor_rod'])
    //    event.add('create:crushed_raw_materials', ['create:crushed_raw_osmium', 'create:crushed_raw_quicksilver', 'create:crushed_raw_tin', 'create:crushed_raw_platinum'])
    event.add('c:ices', ['minecraft:blue_ice', 'powah:dry_ice'])
    event.add('mynethersdelight:stove_soul_fuel', ['mynethersdelight:letios_compost', 'mynethersdelight:resurgent_soil', 'mynethersdelight:resurgent_soil_farmland'])
    event.add('minecraft:soul_fire_base_blocks', ['mynethersdelight:letios_compost', 'mynethersdelight:resurgent_soil', 'mynethersdelight:resurgent_soil_farmland'])
    event.add('enderio_evolution:machine_upgrade', ['enderio_evolution:capacitor_energetic_silver'])
    event.add('enderio:capacitors', ['enderio_evolution:capacitor_energetic_silver'])
    event.add('c:budding_blocks', ['ae2:flawless_budding_quartz', 'extendedae:entro_budding_fully', 'minecraft:budding_amethyst'])
    event.add('fluxnetworks:storage', 'fluxnetworks:gargantuan_flux_storage')
    event.add('immersiveengineering:recycling/ignored_components', ['minecraft:brick', 'minecraft:nether_brick', 'supplementaries:ash_brick'])
    event.add('minecraft:beacon_payment_items', ['ars_nouveau:source_gem', 'create:brass_ingot', 'create:zinc_ingot', 'minecraft:emerald', 'create:andesite_alloy', 'minecraft:netherite_ingot'])
    event.add('supplementaries:straw', 'farmersdelight:straw')
    event.add('c:ore_rates/singular', 'minecraft:ancient_debris')
    event.add('c:ores_in_ground/stone', 'createpropulsion:platinum_ore')
    event.add('minecraft:decorated_pot_ingredients', ['minecraft:flow_pottery_sherd', 'minecraft:guster_pottery_sherd', 'minecraft:scrape_pottery_sherd'])
    event.add('minecraft:decorated_pot_sherds', ['minecraft:flow_pottery_sherd', 'minecraft:guster_pottery_sherd', 'minecraft:scrape_pottery_sherd'])
    event.add('c:rods/all_metal', 'immersiveengineering:stick_netherite')
    event.add('c:rods', 'immersiveengineering:stick_treated')
    event.add('minecraft:spears', 'minecraft:netherite_spear')
    event.add('c:tools/melee_weapons', 'minecraft:netherite_spear')
    event.add('c:tools/shears', 'not_enough_shears:netherite_shears')
    event.add('neovitae:altar/runes', 'neovitae:rune_blank')
    event.add('neovitae:spiritus_gems', 'neovitae:spiritus_gem_grand')
    event.add('minecraft:stone_crafting_materials', 'minecraft:cobbled_deepslate')
    event.add('minecraft:stone_tool_materials', 'minecraft:cobbled_deepslate')
    event.add('minecraft:gold_ores', 'minecraft:deepslate_gold_ore')

    // --- Storage & Containers ---
    event.add('c:chests', ['ae2:sky_stone_chest', 'ae2:smooth_sky_stone_chest', 'ars_nouveau:archwood_chest', 'minecraft:chest', 'minecraft:ender_chest', 'minecraft:trapped_chest', 'sophisticatedstorage:netherite_chest'])
    event.add('c:barrels', ['minecraft:barrel', 'sophisticatedstorage:netherite_barrel'])

    // --- Flora, Wood & Building Materials ---
    event.add('minecraft:planks', [
        'alexscaves:pewen_planks', 'alexscaves:thornwood_planks', 'ars_nouveau:archwood_planks',
        'createdieselgenerators:chip_wood_block', 'minecraft:pale_oak_planks', 'mynethersdelight:powdery_planks'
    ])
    event.add('minecraft:wooden_stairs', [
        'alexscaves:pewen_stairs', 'alexscaves:thornwood_stairs', 'ars_nouveau:archwood_stairs',
        'atmospheric:aspen_stairs', 'atmospheric:grimwood_stairs', 'atmospheric:kousa_stairs',
        'atmospheric:laurel_stairs', 'atmospheric:morado_stairs', 'atmospheric:rosewood_stairs',
        'atmospheric:yucca_stairs', 'autumnity:maple_stairs', 'caverns_and_chasms:azalea_stairs',
        'createdieselgenerators:chip_wood_stairs', 'environmental:pine_stairs', 'environmental:plum_stairs',
        'environmental:willow_stairs', 'environmental:wisteria_stairs', 'minecraft:pale_oak_stairs',
        'mynethersdelight:powdery_stairs'
    ])
    event.add('autumnity:snail_snacks', ['minecraft:crimson_fungus', 'minecraft:warped_fungus'])
    // --- Food, Agriculture & Animal Diets ---
    event.add('c:seeds', ['atmospheric:aloe_kernels', 'autumnity:foul_berry_pips'])
    event.add('enderio:seeds', [
        'ars_nouveau:magebloom_crop', 'atmospheric:aloe_kernels', 'autumnity:foul_berry_pips', 'farmersdelight:rice',
        'minecraft:torchflower_seeds', 'rusticdelight:bell_pepper_seeds', 'rusticdelight:coffee_beans',
        'rusticdelight:cotton_seeds', 'rusticdelight:dark_bell_pepper_seeds', 'rusticdelight:pale_bell_pepper_seeds',
        'supplementaries:flax_seeds'
    ])
    event.add('c:foods/vegetable', 'atmospheric:aloe_leaves')
    event.add('minecraft:parrot_food', [
        'atmospheric:aloe_kernels', 'farmersdelight:rice', 'minecraft:pitcher_pod', 'minecraft:torchflower_seeds',
        'rusticdelight:bell_pepper_seeds', 'rusticdelight:cotton_seeds', 'rusticdelight:dark_bell_pepper_seeds',
        'rusticdelight:pale_bell_pepper_seeds', 'supplementaries:flax_seeds'
    ])
    event.add('minecraft:cat_food', ['mynethersdelight:ghasmati', 'mynethersdelight:minced_strider', 'mynethersdelight:strider_slice'])
    event.add('minecraft:horse_food', ['supplementaries:flax', 'supplementaries:flax_block', 'supplementaries:sugar_cube'])
    event.add('minecraft:llama_food', ['minecraft:hay_block', 'supplementaries:flax'])
    event.add('minecraft:ocelot_food', 'rusticdelight:calamari')
    event.add('minecraft:fox_food', 'autumnity:foul_berries')
    event.add('minecraft:strider_food', 'mynethersdelight:hot_cream_cone')
    event.add('minecraft:pig_food', 'minecraft:golden_carrot')
    event.add('environmental:deer_flower_items', ['minecraft:apple', 'minecraft:enchanted_golden_apple'])
    event.add('environmental:deer_plantables', [
        'caverns_and_chasms:false_hope', 'caverns_and_chasms:moschatel', 'minecraft:closed_eyeblossom',
        'minecraft:open_eyeblossom', 'rusticdelight:wild_bell_peppers', 'rusticdelight:wild_coffee',
        'rusticdelight:wild_cotton', 'rusticdelight:wild_dark_bell_peppers', 'rusticdelight:wild_pale_bell_peppers'
    ])
    event.add('environmental:reindeer_tempt_items', [
        'caverns_and_chasms:false_hope', 'caverns_and_chasms:moschatel', 'environmental:cup_lichen',
        'minecraft:apple', 'minecraft:carrot', 'minecraft:closed_eyeblossom', 'minecraft:enchanted_golden_apple',
        'minecraft:golden_apple', 'minecraft:open_eyeblossom', 'rusticdelight:wild_bell_peppers',
        'rusticdelight:wild_coffee', 'rusticdelight:wild_cotton', 'rusticdelight:wild_dark_bell_peppers',
        'rusticdelight:wild_pale_bell_peppers'
    ])
    event.add('environmental:spawns_on_muddy_pig', [
        'environmental:cattail', 'environmental:dianthus', 'minecraft:brown_mushroom', 'minecraft:lily_pad',
        'minecraft:red_mushroom'
    ])
    event.add('farmersdelight:wild_crops', [
        'minersdelight:gossypium', 'mynethersdelight:bullet_pepper', 'mynethersdelight:powder_cannon',
        'rusticdelight:wild_bell_peppers', 'rusticdelight:wild_coffee', 'rusticdelight:wild_cotton',
        'rusticdelight:wild_dark_bell_peppers', 'rusticdelight:wild_pale_bell_peppers'
    ])
    event.add('ars_nouveau:whirlisprig/denied_drop', ['atmospheric:aloe_kernels', 'autumnity:foul_berry_pips'])
    // --- Ores, Materials, Pottery & Beacon ---
    event.add('c:ore_rates/dense', ['minecraft:copper_ore', 'minecraft:deepslate_copper_ore', 'minecraft:deepslate_lapis_ore', 'minecraft:lapis_ore'])
    event.add('c:ores/gold', 'minecraft:deepslate_gold_ore')
    event.add('c:ores_in_ground/deepslate', [
        'caverns_and_chasms:deepslate_silver_ore', 'caverns_and_chasms:deepslate_spinel_ore',
        'caverns_and_chasms:deepslate_tin_ore', 'createpropulsion:deepslate_platinum_ore'
    ])
    event.add('c:ores_in_ground/stone', ['caverns_and_chasms:silver_ore', 'caverns_and_chasms:spinel_ore', 'caverns_and_chasms:tin_ore'])
    event.add('c:storage_blocks/all_copper', 'minecraft:copper_block')
    event.add('c:sands', ['atmospheric:arid_sand', 'atmospheric:red_arid_sand'])
    event.add('caverns_and_chasms:cupric_fire_base_blocks', 'minecraft:raw_copper')
    event.add('caverns_and_chasms:magic_damage_items', 'abnormals_delight:silver_knife')
    event.add('minecraft:coals', 'immersiveengineering:coal_coke')
    event.add('minecraft:beacon_payment_items', [
        'caverns_and_chasms:necromium_ingot', 'caverns_and_chasms:silver_ingot', 'caverns_and_chasms:tin_ingot',
        'caverns_and_chasms:turquoise', 'caverns_and_chasms:zirconia'
    ])
    event.add('minecraft:decorated_pot_ingredients', [
        'alexscaves:dinosaur_pottery_sherd', 'alexscaves:footprint_pottery_sherd',
        'alexscaves:guardian_pottery_sherd', 'alexscaves:hero_pottery_sherd'
    ])
    event.add('minecraft:decorated_pot_sherds', [
        'alexscaves:dinosaur_pottery_sherd', 'alexscaves:footprint_pottery_sherd',
        'alexscaves:guardian_pottery_sherd', 'alexscaves:hero_pottery_sherd'
    ])
    event.add('minecraft:sulfur_cube_archetype/high_resistance', 'caverns_and_chasms:soul_silver_ore')
    event.add('minecraft:sulfur_cube_archetype/regular', [
        'atmospheric:crustose', 'environmental:buried_truffle',
        'environmental:chiseled_mud_bricks', 'environmental:dirt_bricks', 'environmental:dirt_tiles',
        'environmental:smooth_mud', 'minecraft:bone_block', 'minecraft:clay', 'minecraft:coal_block',
        'minecraft:coarse_dirt', 'minecraft:grass_block', 'minecraft:mud', 'minecraft:muddy_mangrove_roots',
        'minecraft:packed_mud', 'minecraft:podzol', 'minecraft:rooted_dirt'
    ])
    event.add('enderio:capacitors', [
        'enderio_evolution:capacitor_atm', 'enderio_evolution:capacitor_piglich',
        'enderio_evolution:capacitor_unobtainium', 'enderio_evolution:capacitor_vibranium'
    ])
    // --- Curios, Tools & Weapons ---
    event.add('curios:necklace', [
        'ars_nouveau:amulet_of_mana_boost', 'ars_nouveau:amulet_of_mana_regen', 'cognition:enlightened_amulet',
        'cognition:fortuitous_amulet', 'neovitae:spiritus_gem_grand'
    ])

    event.add('lodestone:enchantable/ranged', ['cognition:cognitive_bow', 'create:potato_cannon', 'minecraft:bow', 'minecraft:crossbow'])
    event.add('c:tools/mining_tool', 'ars_nouveau:enchanters_gauntlet')
    event.add('create:invalid_for_track_paving', 'create:wooden_bracket')
    event.add('simplyswords:runic_weapons', 'simplyswords:watching_warglaive')
    event.add('ae2:all_quartz', 'ae2:certus_quartz_crystal')

    // --- Storage Upgrades (Sophisticated Backpacks/Storage) ---
    event.add('sophisticatedbackpacks:upgrade', [
        'sophisticatedbackpacks:anvil_upgrade', 'sophisticatedbackpacks:crafting_upgrade',
        'sophisticatedbackpacks:everlasting_upgrade', 'sophisticatedbackpacks:inception_upgrade',
        'sophisticatedbackpacks:infinity_upgrade', 'sophisticatedbackpacks:sawmill/sawmill_upgrade',
        'sophisticatedbackpacks:smithing_upgrade', 'sophisticatedbackpacks:stack_downgrade_tier_1',
        'sophisticatedbackpacks:stack_downgrade_tier_2', 'sophisticatedbackpacks:stack_downgrade_tier_3',
        'sophisticatedbackpacks:stack_upgrade_omega_tier', 'sophisticatedbackpacks:stack_upgrade_starter_tier',
        'sophisticatedbackpacks:stack_upgrade_tier_1', 'sophisticatedbackpacks:stack_upgrade_tier_2',
        'sophisticatedbackpacks:stack_upgrade_tier_3', 'sophisticatedbackpacks:stack_upgrade_tier_4',
        'sophisticatedbackpacks:stonecutter_upgrade', 'sophisticatedbackpacks:survival_infinity_upgrade',
        'sophisticatedbackpacks:xp_pump_upgrade'
    ])
    event.add('sophisticatedstorage:upgrade', [
        'sophisticatedstorage:advanced_pump_upgrade', 'sophisticatedstorage:compression_upgrade',
        'sophisticatedstorage:crafting_upgrade', 'sophisticatedstorage:infinity_upgrade',
        'sophisticatedstorage:pump_upgrade', 'sophisticatedstorage:sawmill/sawmill_upgrade',
        'sophisticatedstorage:stack_downgrade_tier_1', 'sophisticatedstorage:stack_downgrade_tier_2',
        'sophisticatedstorage:stack_downgrade_tier_3', 'sophisticatedstorage:stack_upgrade_omega_tier',
        'sophisticatedstorage:stack_upgrade_tier_1', 'sophisticatedstorage:stack_upgrade_tier_1_plus',
        'sophisticatedstorage:stack_upgrade_tier_2', 'sophisticatedstorage:stack_upgrade_tier_3',
        'sophisticatedstorage:stack_upgrade_tier_4', 'sophisticatedstorage:stack_upgrade_tier_5',
        'sophisticatedstorage:stonecutter_upgrade', 'sophisticatedstorage:survival_infinity_upgrade',
        'sophisticatedstorage:xp_pump_upgrade'
    ])
    event.add('sophisticatedstorage:all_storage', [
        'sophisticatedstorage:barrel', 'sophisticatedstorage:chest', 'sophisticatedstorage:copper_barrel',
        'sophisticatedstorage:copper_chest', 'sophisticatedstorage:copper_shulker_box',
        'sophisticatedstorage:gold_barrel', 'sophisticatedstorage:gold_chest',
        'sophisticatedstorage:gold_shulker_box', 'sophisticatedstorage:iron_barrel',
        'sophisticatedstorage:iron_chest', 'sophisticatedstorage:iron_shulker_box',
        'sophisticatedstorage:limited_barrel_1', 'sophisticatedstorage:limited_barrel_2',
        'sophisticatedstorage:limited_barrel_3', 'sophisticatedstorage:limited_barrel_4',
        'sophisticatedstorage:limited_copper_barrel_1', 'sophisticatedstorage:limited_copper_barrel_2',
        'sophisticatedstorage:limited_copper_barrel_3', 'sophisticatedstorage:limited_copper_barrel_4',
        'sophisticatedstorage:limited_gold_barrel_1', 'sophisticatedstorage:limited_gold_barrel_2',
        'sophisticatedstorage:limited_gold_barrel_3', 'sophisticatedstorage:limited_gold_barrel_4',
        'sophisticatedstorage:limited_iron_barrel_1', 'sophisticatedstorage:limited_iron_barrel_2',
        'sophisticatedstorage:limited_iron_barrel_3', 'sophisticatedstorage:limited_iron_barrel_4',
        'sophisticatedstorage:limited_netherite_barrel_1', 'sophisticatedstorage:limited_netherite_barrel_2',
        'sophisticatedstorage:limited_netherite_barrel_3', 'sophisticatedstorage:limited_netherite_barrel_4',
        'sophisticatedstorage:netherite_barrel', 'sophisticatedstorage:netherite_chest',
        'sophisticatedstorage:netherite_shulker_box', 'sophisticatedstorage:shulker_box'
    ])
    // --- Mob & Creature Interactions ---
    event.add('alexscaves:teletor_spawns_with', ['minecraft:iron_hoe', 'minecraft:iron_sword'])
    event.add('alexsmobs:maned_wolf_breedables', 'minecraft:rabbit')
    event.add('alexsmobs:repairs/shield_of_the_deep', [
        'alexscaves:pewen_planks', 'alexscaves:thornwood_planks', 'alexsmobs:serrated_shark_tooth',
        'ars_nouveau:archwood_planks', 'createdieselgenerators:chip_wood_block', 'immersiveengineering:fiberboard',
        'minecraft:pale_oak_planks', 'mynethersdelight:powdery_planks'
    ])
    event.add('alexsmobs:roadrunner_breedables', 'alexsmobs:mosquito_larva')
    event.add('minecraft:dampens_vibrations', ['alexsmobs:bison_carpet', 'environmental:yak_hair_rug'])
    event.add('minecraft:freeze_immune_wearables', 'aeronautics:aviators_goggles')
    // --- Other ---
    event.add('minecraft:small_flowers', ['caverns_and_chasms:false_hope', 'caverns_and_chasms:moschatel'])
    event.add('minecraft:tall_flowers', [
        'atmospheric:tall_yucca_flower', 'environmental:bird_of_paradise', 'environmental:blue_delphinium',
        'environmental:pink_delphinium', 'environmental:purple_delphinium', 'environmental:white_delphinium'
    ])
})

ServerEvents.tags('block', event => {
    // --- Spawns, Terrain & Worldgen ---
    event.add('minecraft:geode_invalid_blocks', ['minecraft:bedrock', 'minecraft:blue_ice', 'minecraft:packed_ice', 'minecraft:ice'])
    event.add('minecraft:enchantment_power_provider', 'minecraft:bookshelf')
    event.add('cognition:infective_blocks', ['cognition:extravagant_agar', 'cognition:insightful_agar'])
    event.add('minecraft:occludes_vibration_signals', 'supplementaries:feather_block')
    event.add('minecraft:copper', 'minecraft:copper_block')
    event.add('neovitae:incense_path/level_1', 'minecraft:dirt_path')
    event.add('neovitae:incense_path/level_0', 'minecraft:dirt_path')
    event.add('neovitae:incense_path/level_3', ['minecraft:dirt_path', 'neovitae:wood_brick_path', 'neovitae:wood_tile_path'])
    event.add('create_new_age:stops_radiation', ['create_new_age:reactor_fuel_acceptor', 'create_new_age:reactor_heat_vent', 'create_new_age:reactor_rod'])
    event.add('minecraft:small_flowers', [
        'minecraft:closed_eyeblossom', 'minecraft:open_eyeblossom', 'minersdelight:wild_cave_carrots',
        'mynethersdelight:bullet_pepper', 'rusticdelight:wild_bell_peppers',
        'rusticdelight:wild_coffee', 'rusticdelight:wild_cotton', 'rusticdelight:wild_dark_bell_peppers',
        'rusticdelight:wild_pale_bell_peppers', 'supplementaries:wild_flax'
    ])
    event.add('minecraft:camel_sand_step_sound_blocks', [
        'enderio:painted_sand', 'lootr:suspicious_sand', 'minecraft:red_sand', 'minecraft:sand', 'minecraft:suspicious_sand',
        'utilitarian:red_snad', 'utilitarian:snad'
    ])
    event.add('minecraft:base_stone_overworld', 'minecraft:stone')
    event.add('minecraft:stone_ore_replaceables', 'minecraft:stone')
    event.add('bits_n_bobs:heavy', ['minecraft:stone'])
    event.add('c:ices', ['minecraft:blue_ice', 'powah:dry_ice'])
    event.add('minecraft:ice', ['minecraft:blue_ice', 'minecraft:frosted_ice'])
    event.add('minecraft:wither_summon_base_blocks', 'mynethersdelight:resurgent_soil')
    event.add('rightclickharvest:radius_harvest_blacklist', 'minecraft:cocoa')
    event.add('ars_nouveau:harvest/stems', 'minecraft:bamboo')
    event.add('c:budding_blocks', ['ae2:flawless_budding_quartz', 'extendedae:entro_budding_fully', 'minecraft:budding_amethyst'])
    event.add('neovitae:geode_acceleratable', ['ae2:flawless_budding_quartz', 'extendedae:entro_budding_fully', 'minecraft:budding_amethyst'])
    event.add('c:sand_growables', 'minecraft:kelp_plant')
    event.add('minecraft:crops', [
        'farmersdelight:budding_tomatoes', 'farmersdelight:tomatoes_on_rope', 'minersdelight:cave_carrots',
        'supplementaries:rope_tomatoes',
        'supplementaries:stick_tomatoes', 'minecraft:cave_vines_plant', 'minecraft:melon_stem', 'minecraft:pitcher_crop',
        'minecraft:pumpkin_stem', 'minecraft:torchflower_crop', 'rusticdelight:bell_peppers', 'rusticdelight:coffee',
        'rusticdelight:cotton', 'rusticdelight:dark_bell_peppers', 'rusticdelight:pale_bell_peppers'
    ])
    event.add('c:ore_rates/singular', 'minecraft:ancient_debris')
    event.add('minecraft:planks', 'immersiveengineering:fiberboard')
    event.add('minecraft:wool_carpets', 'ars_additions:magebloom_carpet')
    event.add('minecraft:coral_plants', ['minecraft:brain_coral', 'minecraft:tube_coral'])
    event.add('minecraft:corals', ['minecraft:brain_coral', 'minecraft:brain_coral_fan', 'minecraft:bubble_coral_fan', 'minecraft:fire_coral_fan', 'minecraft:horn_coral_fan', 'minecraft:tube_coral', 'minecraft:tube_coral_fan'])
    event.add('minecraft:terracotta', 'minecraft:terracotta')
    event.add('minecraft:walls', ['create_connected:wrapped_copycat_wall', 'enderio:painted_wall', 'immersiveengineering:wall_concrete', 'immersiveengineering:wall_concrete_brick', 'immersiveengineering:wall_concrete_leaded', 'immersiveengineering:wall_concrete_tile', 'immersiveengineering:wall_hempcrete', 'immersiveengineering:wall_hempcrete_brick'])
    event.add('supplementaries:column_shape_8x8', ['create_connected:wrapped_copycat_wall', 'enderio:painted_wall', 'immersiveengineering:wall_concrete', 'immersiveengineering:wall_concrete_brick', 'immersiveengineering:wall_concrete_leaded', 'immersiveengineering:wall_concrete_tile', 'immersiveengineering:wall_hempcrete', 'immersiveengineering:wall_hempcrete_brick'])
    event.add('immersiveengineering:concrete_for_concrete_feet', 'immersiveengineering:concrete_sprayed')
    event.add('neovitae:altar/runes', 'neovitae:rune_blank')
    event.add('carryon:block_blacklist', ['ars_additions:warp_nexus', 'sophisticatedbackpacks:netherite_backpack'])

    // --- Containers & Storage Blocks ---
    event.add('c:chests', [
        'ae2:sky_stone_chest', 'ae2:smooth_sky_stone_chest', 'ars_nouveau:archwood_chest',
        'lootr:lootr_chest', 'lootr:lootr_inventory', 'lootr:lootr_trapped_chest',
        'minecraft:chest', 'minecraft:ender_chest', 'minecraft:trapped_chest', 'sophisticatedstorage:netherite_chest'
    ])
    event.add('minecraft:shulker_boxes', 'lootr:lootr_shulker')
    event.add('create:simple_mounted_storage', [
        'farmersdelight:acacia_cabinet', 'farmersdelight:bamboo_cabinet', 'farmersdelight:basket', 'farmersdelight:birch_cabinet',
        'farmersdelight:cherry_cabinet', 'farmersdelight:crimson_cabinet', 'farmersdelight:dark_oak_cabinet', 'farmersdelight:jungle_cabinet',
        'farmersdelight:mangrove_cabinet', 'farmersdelight:oak_cabinet', 'farmersdelight:spruce_cabinet', 'farmersdelight:warped_cabinet',
        'minecraft:barrel', 'mynethersdelight:blackstone_bricks_cabinet', 'mynethersdelight:nether_bricks_cabinet', 'mynethersdelight:powdery_cabinet', 'mynethersdelight:red_nether_bricks_cabinet'
    ])
    event.add('c:barrels', ['lootr:lootr_barrel', 'minecraft:barrel', 'sophisticatedstorage:netherite_barrel'])
    event.add('farmersdelight:mushroom_colony_growable_on', ['mynethersdelight:letios_compost', 'supplementaries:planter_rich'])
    event.add('fruitsdelight:pineapple_grows_on', 'minecraft:coarse_dirt')

    // --- Flora, Wood & Terrain ---
    event.add('c:stripped_logs', 'autumnity:sappy_maple_log')
    event.add('c:stripped_woods', [
        'atmospheric:stripped_aspen_wood', 'atmospheric:stripped_grimwood', 'atmospheric:stripped_kousa_wood',
        'atmospheric:stripped_laurel_wood', 'atmospheric:stripped_morado_wood', 'atmospheric:stripped_rosewood',
        'atmospheric:stripped_yucca_wood', 'autumnity:sappy_maple_wood', 'autumnity:stripped_maple_wood',
        'environmental:stripped_pine_wood', 'environmental:stripped_plum_wood', 'environmental:stripped_willow_wood',
        'environmental:stripped_wisteria_wood'
    ])
    event.add('environmental:grass_like', 'atmospheric:crustose')
    event.add('environmental:mud_replaceables', ['minecraft:clay', 'minecraft:dirt', 'minecraft:grass_block'])
    event.add('environmental:deer_spawnable_on', 'minecraft:snow_block')
    event.add('farmersdelight:wild_crops', [
        'minersdelight:gossypium', 'minersdelight:wild_cave_carrots', 'mynethersdelight:bullet_pepper',
        'rusticdelight:wild_bell_peppers', 'rusticdelight:wild_coffee', 'rusticdelight:wild_cotton',
        'rusticdelight:wild_dark_bell_peppers', 'rusticdelight:wild_pale_bell_peppers'
    ])
    event.add('minecraft:planks', [
        'alexscaves:pewen_planks', 'alexscaves:thornwood_planks', 'ars_nouveau:archwood_planks',
        'createdieselgenerators:chip_wood_block', 'minecraft:pale_oak_planks', 'mynethersdelight:powdery_planks'
    ])
    event.add('minecraft:wooden_stairs', [
        'alexscaves:pewen_stairs', 'alexscaves:thornwood_stairs', 'ars_nouveau:archwood_stairs',
        'atmospheric:aspen_stairs', 'atmospheric:grimwood_stairs', 'atmospheric:kousa_stairs',
        'atmospheric:laurel_stairs', 'atmospheric:morado_stairs', 'atmospheric:rosewood_stairs',
        'atmospheric:yucca_stairs', 'autumnity:maple_stairs', 'caverns_and_chasms:azalea_stairs',
        'enderio:painted_stairs', 'environmental:pine_stairs', 'environmental:plum_stairs',
        'environmental:willow_stairs', 'environmental:wisteria_stairs', 'minecraft:pale_oak_stairs',
        'mynethersdelight:powdery_stairs'
    ])
    event.add('minecraft:tall_flowers', [
        'atmospheric:tall_yucca_flower', 'environmental:bird_of_paradise', 'environmental:blue_delphinium',
        'environmental:pink_delphinium', 'environmental:purple_delphinium', 'environmental:white_delphinium',
        'farmersdelight:wild_rice', 'minecraft:pitcher_plant'
    ])
    event.add('autumnity:snail_snacks', ['minecraft:crimson_fungus', 'minecraft:warped_fungus'])
    event.add('minecraft:animals_spawnable_on', 'atmospheric:arid_sand')
    event.add('minecraft:camel_sand_step_sound_blocks', [
        'atmospheric:arid_sand', 'atmospheric:red_arid_sand', 'atmospheric:suspicious_arid_sand',
        'atmospheric:suspicious_red_arid_sand'
    ])
    event.add('minecraft:foxes_spawnable_on', ['minecraft:snow', 'minecraft:snow_block'])
    event.add('minecraft:wolves_spawnable_on', ['minecraft:snow', 'minecraft:snow_block'])
    event.add('minecraft:base_stone_nether', 'supplementaries:ashen_basalt')
    // --- Ores & Stone ---
    event.add('bits_n_bobs:heavy', ['caverns_and_chasms:fragile_deepslate', 'caverns_and_chasms:fragile_stone', 'caverns_and_chasms:schist'])
    event.add('c:ores/coal', 'alexscaves:coprolith_coal_ore')
    event.add('c:stones', [
        'caverns_and_chasms:fragile_deepslate', 'caverns_and_chasms:fragile_stone', 'caverns_and_chasms:schist',
        'minecraft:stone'
    ])
    event.add('c:waxable_copper_blocks', ['caverns_and_chasms:copper_ingot', 'minecraft:copper_block'])
    event.add('minecraft:coal_ores', 'alexscaves:coprolith_coal_ore')
    event.add('minecraft:deepslate_ore_replaceables', 'caverns_and_chasms:fragile_deepslate')
    event.add('minecraft:gold_ores', 'minecraft:deepslate_gold_ore')
    event.add('minecraft:redstone_ores', 'alexscaves:guanostone_redstone_ore')
    event.add('neovitae:generative_ores', ['alexscaves:coprolith_coal_ore', 'alexscaves:galena_iron_ore'])
    // --- Storage & Containers ---
    event.add('c:barrels', ['alexscaves:metal_barrel', 'alexscaves:rusty_barrel'])
    event.add('alexscaves:submarine_assembly_blocks', 'minecraft:copper_block')
    // --- Mob Spawns, Breakables & Interactions ---
    event.add('alexscaves:grows_mussels', ['alexscaves:geothermal_vent', 'createdieselgenerators:chip_wood_block', 'immersiveengineering:fiberboard'])
    event.add('alexscaves:relicheirus_knockable_logs', 'minecraft:mangrove_roots')
    event.add('alexsmobs:cachalot_whale_breakables', 'minecraft:frosted_ice')
    event.add('alexsmobs:gelada_monkey_grass', ['minecraft:glow_lichen', 'minecraft:short_grass'])
    event.add('alexsmobs:mantis_shrimp_spawns', ['minecraft:mud', 'minecraft:muddy_mangrove_roots'])
    event.add('alexsmobs:mungus_replace_mushroom', 'minecraft:coarse_dirt')
    event.add('alexsmobs:orca_breakables', 'minecraft:frosted_ice')
    event.add('alexsmobs:soul_vulture_perches', 'minecraft:bone_block')
    event.add('alexsmobs:soul_vulture_spawns', 'mynethersdelight:resurgent_soil_farmland')
    // --- Misc Blocks ---
    event.add('ars_nouveau:an_decorative', [
        'ars_nouveau:falseweave', 'ars_nouveau:ghostweave', 'ars_nouveau:magebloom_block', 'ars_nouveau:mirrorweave',
        'ars_nouveau:sky_block'
    ])
    event.add('minecraft:occludes_vibration_signals', 'environmental:yak_hair_block')
    event.add('minecraft:walls', [
        'alexscaves:frosted_gingerbread_brick_wall', 'alexscaves:frosted_gingerbread_wall',
        'alexscaves:gingerbread_brick_wall', 'alexscaves:gingerbread_wall', 'alexscaves:guanostone_wall',
        'alexscaves:wafer_cookie_wall', 'incision:carrion_wall', 'incision:clottage_brick_wall',
        'incision:clottage_wall', 'incision:incision_carrion_wall', 'incision:stitched_carrion_wall',
        'incision:thin_vericose_stalk'
    ])
})

// Other registries. 'neovitae:sentient_upgrades' is a mod-defined registry, so it needs its full id.

ServerEvents.tags('enchantment', event => {

    event.add('c:entity_speed_enhancements', 'minecraft:swift_sneak')
    event.add('c:weapon_damage_enhancements', 'minecraft:impaling')
    event.add('minecraft:exclusive_set/damage', ['minecraft:breach', 'minecraft:density', 'minecraft:impaling'])
    event.add('minecraft:tooltip_order', [
        'minecraft:binding_curse', 'minecraft:breach', 'minecraft:channeling', 'minecraft:density',
        'minecraft:frost_walker', 'minecraft:impaling', 'minecraft:loyalty', 'minecraft:luck_of_the_sea',
        'minecraft:lunge', 'minecraft:lure', 'minecraft:mending', 'minecraft:riptide', 'minecraft:soul_speed',
        'minecraft:swift_sneak', 'minecraft:vanishing_curse', 'minecraft:wind_burst'
    ])
})

ServerEvents.tags('entity_type', event => {

    event.add('alexscaves:dinosaurs', ['alexscaves:luxtructosaurus', 'alexscaves:tremorzilla'])
    event.add('alexscaves:resists_tremorsaurus_roar', 'alexscaves:luxtructosaurus')
    event.add('alexsmobs:neutral_land_animals', 'minecraft:polar_bear')
    event.add('alexsmobs:passive_land_animals', ['alexsmobs:shoebill', 'minecraft:mule', 'minecraft:parrot'])
    event.add('alexsmobs:scatters_crows', 'minecraft:polar_bear')
    event.add('c:fishes', ['caverns_and_chasms:cavefish', 'environmental:koi', 'minecraft:pufferfish', 'minecraft:tropical_fish'])
    event.add('domesticationinnovation:petstore_cage_0', 'minecraft:rabbit')
    event.add('farmersdelight:horse_feed_tempted', ['environmental:zonkey', 'environmental:zorse'])
    event.add('minecraft:arrows', [
        'caverns_and_chasms:blunt_arrow', 'caverns_and_chasms:large_arrow', 'caverns_and_chasms:ricochet_arrow',
        'minecraft:spectral_arrow'
    ])
    event.add('minecraft:axolotl_hunt_targets', ['atmospheric:tetra', 'minecraft:glow_squid', 'minecraft:squid', 'minecraft:tadpole'])
})

ServerEvents.tags('fluid', event => {

    event.add('create:bottomless/allow', ['alexscaves:acid', 'alexscaves:acid_flowing', 'alexscaves:purple_soda', 'alexscaves:purple_soda_flowing'])
})

ServerEvents.tags('mob_effect', event => {

    event.add('ars_nouveau:unstable_gifts', [
        'minecraft:absorption', 'minecraft:conduit_power', 'minecraft:fire_resistance', 'minecraft:haste',
        'minecraft:night_vision', 'minecraft:regeneration', 'minecraft:resistance', 'minecraft:slow_falling',
        'minecraft:strength'
    ])
})

// Biomes where mossy waystones can generate.
ServerEvents.tags('worldgen/biome', event => {

    event.add('waystones:has_structure/mossy_waystone', ['minecraft:mangrove_swamp', 'minecraft:mushroom_fields', 'minecraft:swamp'])
})

// neovitae:sentient_upgrades: Neo Vitae's sentient item upgrade order.
ServerEvents.tags('neovitae:sentient_upgrades', event => {

    event.add('neovitae:tooltip_order', [
        'neovitae:arrow_protect', 'neovitae:digging', 'neovitae:elytra', 'neovitae:experienced',
        'neovitae:fall_protect', 'neovitae:fire_resist', 'neovitae:gilded', 'neovitae:health', 'neovitae:jump',
        'neovitae:knockback_resist', 'neovitae:luck', 'neovitae:melee_damage', 'neovitae:netherite_protect',
        'neovitae:physical_protect', 'neovitae:poison_resist', 'neovitae:repair', 'neovitae:self_sacrifice',
        'neovitae:speed', 'neovitae:sprint_attack'
    ])
})
