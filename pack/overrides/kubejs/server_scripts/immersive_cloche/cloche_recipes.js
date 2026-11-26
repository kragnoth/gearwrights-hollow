
ServerEvents.recipes(event => {

  // ---------------------------------------------------------------------
  // Soil tiers. Every crop below is compiled against ALL of these.
  // ---------------------------------------------------------------------
  const NORMAL_SOILS = [
    { item: 'minecraft:farmland' },   // replaces dirt/cobblestone - baseline 1x tilled soil
    { item: 'minecraft:mud' },
    { item: 'minecraft:dirt' },
    { item: 'minecraft:grass_block' },
    { item: 'minecraft:rooted_dirt' },
    { item: 'minecraft:mycelium' },
    { item: 'minecraft:podzol' },
    { item: 'minecraft:crimson_nylium' },
    { item: 'minecraft:coarse_dirt' },
    { item: 'minecraft:moss_block' },
    { item: 'minecraft:warped_nylium' },
    { item: 'regions_unexplored:peat_farmland' },
    { item: 'regions_unexplored:silt_farmland' }
  ]

  // Farmland + Yellow Fertilizer only (trample-proof, the "weakest" upgrade)
  const STABLE_SOILS = [
    { item: 'farmingforblockheads:fertilized_farmland_stable' }
  ]

  // Farmland + Green Fertilizer, with or without Yellow stacked on top
  const HEALTHY_SOILS = [
    { item: 'farmingforblockheads:fertilized_farmland_healthy' },
    { item: 'farmingforblockheads:fertilized_farmland_healthy_stable' }
  ]

  // Farmland + Red Fertilizer, with or without Yellow stacked on top
  const RICH_SOILS = [
    { item: 'farmingforblockheads:fertilized_farmland_rich' },
    { item: 'farmingforblockheads:fertilized_farmland_rich_stable' }
  ]

  // farmers delight soils
  const FERTILIZED_SOILS = [
    { item: 'farmersdelight:rich_soil_farmland' },
    { item: 'mynethersdelight:resurgent_soil_farmland' }
  ]

  const SOIL_TIERS = [
    { suffix: '', soils: NORMAL_SOILS, multiplier: 1 },
    { suffix: '_stable', soils: STABLE_SOILS, multiplier: 1.2 },
    { suffix: '_healthy', soils: HEALTHY_SOILS, multiplier: 1.75 },
    { suffix: '_rich', soils: RICH_SOILS, multiplier: 1.5 },
    { suffix: '_fertilized', soils: FERTILIZED_SOILS, multiplier: 1.75 }
  ]

  // ---------------------------------------------------------------------
  // 1) BASE RECIPES. `time` is the NORMAL/1x baseline - the other 4 tiers
  //    scale off this same number.
  // ---------------------------------------------------------------------
  const EXISTING_RECIPES = [
    { id: 'allium', input: { item: 'minecraft:allium' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:allium' }, results: [{ id: 'minecraft:allium' }], time: 480 },
    { id: 'azure_bluet', input: { item: 'minecraft:azure_bluet' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:azure_bluet' }, results: [{ id: 'minecraft:azure_bluet' }], time: 480 },
    { id: 'bamboo', input: { item: 'minecraft:bamboo' }, render: { type: 'immersiveengineering:stacking', block: 'minecraft:bamboo' }, results: [{ id: 'minecraft:bamboo' }], time: 560 },
    { id: 'beetroot', input: { item: 'minecraft:beetroot_seeds' }, render: { type: 'immersiveengineering:crop', block: 'minecraft:beetroots' }, results: [{ count: 2, id: 'minecraft:beetroot' }, { chance: 0.25, output: { id: 'minecraft:beetroot_seeds' } }], time: 800 },
    { id: 'blue_orchid', input: { item: 'minecraft:blue_orchid' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:blue_orchid' }, results: [{ id: 'minecraft:blue_orchid' }], time: 480 },
    { id: 'brown_mushroom', input: { item: 'minecraft:brown_mushroom' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:brown_mushroom' }, results: [{ id: 'minecraft:brown_mushroom' }], time: 480 },
    { id: 'cactus', input: { item: 'minecraft:cactus' }, render: { type: 'immersiveengineering:stacking', block: 'minecraft:cactus' }, results: [{ id: 'minecraft:cactus' }], time: 560 },
    { id: 'carrot', input: { item: 'minecraft:carrot' }, render: { type: 'immersiveengineering:crop', block: 'minecraft:carrots' }, results: [{ count: 2, id: 'minecraft:carrot' }], time: 800 },
    { id: 'chorus_fruit', input: { item: 'minecraft:chorus_flower' }, render: { type: 'immersiveengineering:chorus' }, results: [{ id: 'minecraft:chorus_fruit' }], time: 480 },
    { id: 'cornflower', input: { item: 'minecraft:cornflower' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:cornflower' }, results: [{ id: 'minecraft:cornflower' }], time: 480 },
    { id: 'crimson_fungus', input: { item: 'minecraft:crimson_fungus' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:crimson_fungus' }, results: [{ id: 'minecraft:crimson_fungus' }], time: 560 },
    { id: 'dandelion', input: { item: 'minecraft:dandelion' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:dandelion' }, results: [{ id: 'minecraft:dandelion' }], time: 480 },
    { id: 'fern', input: { item: 'minecraft:fern' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:fern' }, results: [{ id: 'minecraft:fern' }], time: 480, hasStraw: true },
    { id: 'glow_berries', input: { item: 'minecraft:glow_berries' }, render: { type: 'immersiveengineering:crop', block: 'minecraft:cave_vines' }, results: [{ id: 'minecraft:glow_berries' }], time: 640 },
    { id: 'hemp', input: { item: 'immersiveengineering:seed' }, render: { type: 'immersiveengineering:doublecrop', block: 'immersiveengineering:hemp', doublingAge: 3 }, results: [{ id: 'immersiveengineering:hemp_fiber' }, { chance: 0.5, output: { id: 'immersiveengineering:seed' } }], time: 800, hasStraw: true },
    { id: 'lilac', input: { item: 'minecraft:lilac' }, render: { type: 'immersiveengineering:doubleflower', block: 'minecraft:lilac' }, results: [{ id: 'minecraft:lilac' }], time: 480 },
    { id: 'lily_of_the_valley', input: { item: 'minecraft:lily_of_the_valley' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:lily_of_the_valley' }, results: [{ id: 'minecraft:lily_of_the_valley' }], time: 480 },
    { id: 'melon', input: { item: 'minecraft:melon_seeds' }, render: { type: 'immersiveengineering:stem', attachedStem: 'minecraft:attached_melon_stem', crop: 'minecraft:melon', stem: 'minecraft:melon_stem' }, results: [{ id: 'minecraft:melon' }], time: 800 },
    { id: 'moss', input: { item: 'minecraft:moss_block' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:moss_carpet' }, results: [{ id: 'minecraft:moss_block' }], time: 1200 },
    { id: 'nether_wart', input: { item: 'minecraft:nether_wart' }, render: { type: 'immersiveengineering:crop', block: 'minecraft:nether_wart' }, results: [{ count: 2, id: 'minecraft:nether_wart' }], time: 800 },
    { id: 'orange_tulip', input: { item: 'minecraft:orange_tulip' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:orange_tulip' }, results: [{ id: 'minecraft:orange_tulip' }], time: 480 },
    { id: 'oxeye_daisy', input: { item: 'minecraft:oxeye_daisy' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:oxeye_daisy' }, results: [{ id: 'minecraft:oxeye_daisy' }], time: 480 },
    { id: 'peony', input: { item: 'minecraft:peony' }, render: { type: 'immersiveengineering:doubleflower', block: 'minecraft:peony' }, results: [{ id: 'minecraft:peony' }], time: 480 },
    { id: 'pink_tulip', input: { item: 'minecraft:pink_tulip' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:pink_tulip' }, results: [{ id: 'minecraft:pink_tulip' }], time: 480 },
    { id: 'pitcher_plant', input: { item: 'minecraft:pitcher_pod' }, render: { type: 'immersiveengineering:doublecrop', block: 'minecraft:pitcher_crop', doublingAge: 3 }, results: [{ id: 'minecraft:pitcher_plant' }], time: 1200 },
    { id: 'poppy', input: { item: 'minecraft:poppy' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:poppy' }, results: [{ id: 'minecraft:poppy' }], time: 480 },
    { id: 'potato', input: { item: 'minecraft:potato' }, render: { type: 'immersiveengineering:crop', block: 'minecraft:potatoes' }, results: [{ count: 2, id: 'minecraft:potato' }], time: 800 },
    { id: 'pumpkin', input: { item: 'minecraft:pumpkin_seeds' }, render: { type: 'immersiveengineering:stem', attachedStem: 'minecraft:attached_pumpkin_stem', crop: 'minecraft:pumpkin', stem: 'minecraft:pumpkin_stem' }, results: [{ id: 'minecraft:pumpkin' }], time: 800 },
    { id: 'red_mushroom', input: { item: 'minecraft:red_mushroom' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:red_mushroom' }, results: [{ id: 'minecraft:red_mushroom' }], time: 480 },
    { id: 'red_tulip', input: { item: 'minecraft:red_tulip' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:red_tulip' }, results: [{ id: 'minecraft:red_tulip' }], time: 480 },
    { id: 'rose_bush', input: { item: 'minecraft:rose_bush' }, render: { type: 'immersiveengineering:doubleflower', block: 'minecraft:rose_bush' }, results: [{ id: 'minecraft:rose_bush' }], time: 480 },
    { id: 'short_grass', input: { item: 'minecraft:short_grass' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:short_grass' }, results: [{ id: 'minecraft:short_grass' }], time: 480 },
    { id: 'sugar_cane', input: { item: 'minecraft:sugar_cane' }, render: { type: 'immersiveengineering:stacking', block: 'minecraft:sugar_cane' }, results: [{ id: 'minecraft:sugar_cane' }], time: 560 },
    { id: 'sunflower', input: { item: 'minecraft:sunflower' }, render: { type: 'immersiveengineering:doubleflower', block: 'minecraft:sunflower' }, results: [{ id: 'minecraft:sunflower' }], time: 480 },
    { id: 'sweet_berries', input: { item: 'minecraft:sweet_berries' }, render: { type: 'immersiveengineering:crop', block: 'minecraft:sweet_berry_bush' }, results: [{ count: 2, id: 'minecraft:sweet_berries' }], time: 560 },
    { id: 'torchflower', input: { item: 'minecraft:torchflower_seeds' }, render: { type: 'immersiveengineering:crop', block: 'minecraft:torchflower_crop' }, results: [{ id: 'minecraft:torchflower' }], time: 1200 },
    { id: 'warped_fungus', input: { item: 'minecraft:warped_fungus' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:warped_fungus' }, results: [{ id: 'minecraft:warped_fungus' }], time: 560 },

    { id: 'wheat', input: { item: 'minecraft:wheat_seeds' }, render: { type: 'immersiveengineering:crop', block: 'minecraft:wheat' }, results: [{ count: 2, id: 'minecraft:wheat' }, { chance: 0.25, output: { id: 'minecraft:wheat_seeds' } }], time: 640, hasStraw: true },

    { id: 'white_tulip', input: { item: 'minecraft:white_tulip' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:white_tulip' }, results: [{ id: 'minecraft:white_tulip' }], time: 480 },
    { id: 'wither_rose', input: { item: 'minecraft:wither_rose' }, render: { type: 'immersiveengineering:generic', block: 'minecraft:wither_rose' }, results: [{ id: 'minecraft:wither_rose' }], time: 480 },
    { id: 'sea_pickle',  input: { item: 'minecraft:sea_pickle'  }, render: { type: 'immersiveengineering:generic', block: 'minecraft:sea_pickle'}, results: [{ id: 'minecraft:sea_pickle'}], time: 480 }
  ]

  const NEW_RECIPES = [
    {
      id: 'farmersdelight_cabbage',
      input: { item: 'farmersdelight:cabbage_seeds' },
      render: { type: 'immersiveengineering:crop', block: 'farmersdelight:cabbages' },
      results: [
        { id: 'farmersdelight:cabbage' },
        { chance: 0.25, output: { id: 'farmersdelight:cabbage_seeds' } }
      ],
      time: 800
    },
    {
      id: 'minersdelight_wild_cave_carrot',
      input: { item: 'minersdelight:cave_carrot' },
      render: { type: 'immersiveengineering:generic', block: 'minersdelight:gossypium' },
      results: [
        { id: 'minersdelight:gossypium' },
        { chance: 0.3, output: { id: 'minersdelight:cave_carrot' } }
      ],
      time: 800
    },
    {
      id: 'farmersdelight_onion',
      input: { item: 'farmersdelight:onion' },
      render: { type: 'immersiveengineering:crop', block: 'farmersdelight:onions' },
      results: [{ count: 2, id: 'farmersdelight:onion' }],
      time: 800
    },
    {
      id: 'farmersdelight_rice',
      input: { item: 'farmersdelight:rice' },
      render: { type: 'immersiveengineering:crop', block: 'farmersdelight:rice_panicles' },
      results: [{ count: 2, id: 'farmersdelight:rice' }],
      time: 800,
      hasStraw: true
    },
    {
      id: 'farmersdelight_tomato',
      input: { item: 'farmersdelight:tomato_seeds' },
      render: { type: 'immersiveengineering:crop', block: 'farmersdelight:tomatoes' },
      results: [{ count: 3, id: 'farmersdelight:tomato' }],
      time: 800
    },
    {
      id: 'supplementaries_flax',
      input: { item: 'supplementaries:flax_seeds' },
      render: { type: 'immersiveengineering:crop', block: 'supplementaries:flax' },
      results: [
        { count: 2, id: 'supplementaries:flax' },
        { chance: 0.25, output: { id: 'supplementaries:flax_seeds' } }
      ],
      time: 640,
      hasStraw: true
    },

    // rusticdelight: bell pepper, cotton, coffee
    // NOTE: each bell pepper crop block yields one of its colored bell
    // peppers on harvest. Colors are weighted evenly below - adjust the
    // chances if the mod's actual loot table isn't uniform. (Separate
    // *_medley items also exist in the registry; they aren't used here.)
    {
      id: 'rusticdelight_bell_pepper',
      input: { item: 'rusticdelight:bell_pepper_seeds' },
      render: { type: 'immersiveengineering:crop', block: 'rusticdelight:bell_peppers' },
      results: [
        { chance: 0.333, output: { id: 'rusticdelight:bell_pepper_green' } },
        { chance: 0.333, output: { id: 'rusticdelight:bell_pepper_yellow' } },
        { chance: 0.334, output: { id: 'rusticdelight:bell_pepper_red' } },
        { chance: 0.25, output: { id: 'rusticdelight:bell_pepper_seeds' } },
        { chance: 0.05, output: { id: 'rusticdelight:dark_bell_pepper_seeds' } },
        { chance: 0.05, output: { id: 'rusticdelight:pale_bell_pepper_seeds' } }
      ],
      time: 800
    },
    {
      id: 'rusticdelight_dark_bell_pepper',
      input: { item: 'rusticdelight:dark_bell_pepper_seeds' },
      render: { type: 'immersiveengineering:crop', block: 'rusticdelight:dark_bell_peppers' },
      results: [
        { chance: 0.333, output: { id: 'rusticdelight:bell_pepper_purple' } },
        { chance: 0.333, output: { id: 'rusticdelight:bell_pepper_black' } },
        { chance: 0.334, output: { id: 'rusticdelight:bell_pepper_blue' } },
        { chance: 0.25, output: { id: 'rusticdelight:bell_pepper_seeds' } },
        { chance: 0.05, output: { id: 'rusticdelight:dark_bell_pepper_seeds' } },
        { chance: 0.05, output: { id: 'rusticdelight:pale_bell_pepper_seeds' } }
      ],
      time: 800
    },
    {
      id: 'rusticdelight_pale_bell_pepper',
      input: { item: 'rusticdelight:pale_bell_pepper_seeds' },
      render: { type: 'immersiveengineering:crop', block: 'rusticdelight:pale_bell_peppers' },
      results: [
        { chance: 0.333, output: { id: 'rusticdelight:bell_pepper_white' } },
        { chance: 0.333, output: { id: 'rusticdelight:bell_pepper_pink' } },
        { chance: 0.334, output: { id: 'rusticdelight:bell_pepper_orange' } },
        { chance: 0.25, output: { id: 'rusticdelight:bell_pepper_seeds' } },
        { chance: 0.05, output: { id: 'rusticdelight:dark_bell_pepper_seeds' } },
        { chance: 0.05, output: { id: 'rusticdelight:pale_bell_pepper_seeds' } }
      ],
      time: 800
    },

    {
      id: 'rusticdelight_cotton',
      input: { item: 'rusticdelight:cotton_seeds' },
      render: { type: 'immersiveengineering:crop', block: 'rusticdelight:cotton' },
      results: [
        { count: 2, id: 'rusticdelight:cotton_boll' },
        { chance: 0.25, output: { id: 'rusticdelight:cotton_seeds' } }
      ],
      time: 800,
      hasStraw: true
    },
    {
      id: 'rusticdelight_coffee',
      input: { item: 'rusticdelight:coffee_beans' },
      render: { type: 'immersiveengineering:crop', block: 'rusticdelight:coffee' },
      results: [{ count: 2, id: 'rusticdelight:coffee_beans' }],
      time: 800
    },

    // aloe (age 0-5, drops aloe_leaves 1-2 + always 1 kernel)
    {
      id: 'atmospheric_aloe_vera',
      input: { item: 'atmospheric:aloe_kernels' },
      render: { type: 'immersiveengineering:crop', block: 'atmospheric:aloe_vera' },
      results: [
        { count: 2, id: 'atmospheric:aloe_leaves' },
        { chance: 0.5, output: { id: 'atmospheric:aloe_kernels' } }
      ],
      time: 800
    },

    // bullet pepper: places powdery_cane, grows tall like bamboo
    {
      id: 'mynethersdelight_bullet_pepper',
      input: { item: 'mynethersdelight:bullet_pepper' },
      render: { type: 'immersiveengineering:stacking', block: 'mynethersdelight:powdery_cane' },
      results: [{ id: 'mynethersdelight:bullet_pepper' }],
      time: 560
    },

    // mycotoxic mushrooms: nether-fungus style (same as crimson/warped fungus)
    {
      id: 'regions_unexplored_mycotoxic_mushrooms',
      input: { item: 'regions_unexplored:mycotoxic_mushrooms' },
      render: { type: 'immersiveengineering:generic', block: 'regions_unexplored:mycotoxic_mushrooms' },
      results: [{ id: 'regions_unexplored:mycotoxic_mushrooms' }],
      time: 560
    }
  ]

  // ---------------------------------------------------------------------
  // 2) MODDED FLOWERS & MUSHROOMS (generated). Same shape as the vanilla
  //    flower recipes: input = the flower item, output = the same flower.
  // ---------------------------------------------------------------------
  const flowerRecipe = (full, renderType) => ({
    id: full.replace(':', '_'),
                                              input: { item: full },
                                              render: { type: renderType, block: full },
                                              results: [{ id: full }],
                                              time: 480
  })

  // Single-block flowers + small mushrooms
  const GENERIC_FLOWERS = [
    'environmental:bluebell', 'environmental:dianthus', 'environmental:tasselflower', 'environmental:violet',
    'regions_unexplored:alpha_dandelion', 'regions_unexplored:alpha_rose', 'regions_unexplored:aster',
    'regions_unexplored:fireweed', 'regions_unexplored:hibiscus', 'regions_unexplored:mallow',
    'regions_unexplored:salmon_poppy', 'regions_unexplored:tsubaki', 'regions_unexplored:waratah',
    'regions_unexplored:white_trillium', 'regions_unexplored:wilting_trillium',
    'regions_unexplored:daisy', 'regions_unexplored:felicia_daisy',
    'atmospheric:firethorn', 'atmospheric:forsythia', 'atmospheric:gilia',
    'regions_unexplored:blue_bioshroom', 'regions_unexplored:green_bioshroom',
    'regions_unexplored:pink_bioshroom', 'regions_unexplored:yellow_bioshroom'
  ]

  // Tall / large flowers (rendered like lilac / peony / rose bush)
  const DOUBLE_FLOWERS = [
    'environmental:bird_of_paradise',
    'environmental:blue_delphinium', 'environmental:pink_delphinium',
    'environmental:purple_delphinium', 'environmental:white_delphinium',
    'regions_unexplored:day_lily', 'regions_unexplored:meadow_sage', 'regions_unexplored:tassel',
    'regions_unexplored:tall_blue_bioshroom', 'regions_unexplored:tall_green_bioshroom',
    'regions_unexplored:tall_pink_bioshroom', 'regions_unexplored:tall_yellow_bioshroom',
    // Regions Unexplored large flowers
    'regions_unexplored:hyssop', 'regions_unexplored:poppy_bush', 'regions_unexplored:salmon_poppy_bush',
    'regions_unexplored:blue_lupine', 'regions_unexplored:pink_lupine', 'regions_unexplored:purple_lupine',
    'regions_unexplored:red_lupine', 'regions_unexplored:yellow_lupine',
    'regions_unexplored:black_snowbelle', 'regions_unexplored:blue_snowbelle', 'regions_unexplored:brown_snowbelle',
    'regions_unexplored:cyan_snowbelle', 'regions_unexplored:gray_snowbelle', 'regions_unexplored:green_snowbelle',
    'regions_unexplored:light_blue_snowbelle', 'regions_unexplored:light_gray_snowbelle', 'regions_unexplored:lime_snowbelle',
    'regions_unexplored:magenta_snowbelle', 'regions_unexplored:orange_snowbelle', 'regions_unexplored:pink_snowbelle',
    'regions_unexplored:purple_snowbelle', 'regions_unexplored:red_snowbelle', 'regions_unexplored:white_snowbelle',
    'regions_unexplored:yellow_snowbelle'
  ]

  const FLOWER_RECIPES = GENERIC_FLOWERS.map(f => flowerRecipe(f, 'immersiveengineering:generic'))
  .concat(DOUBLE_FLOWERS.map(f => flowerRecipe(f, 'immersiveengineering:doubleflower')))

  // ---------------------------------------------------------------------
  // Apply: remove any pre-existing recipe on that input, then add one
  // fresh recipe per soil tier, each with time scaled by that tier's
  // multiplier.
  // ---------------------------------------------------------------------
  const ALL = EXISTING_RECIPES.concat(NEW_RECIPES, FLOWER_RECIPES)

  ALL.forEach(r => {
    event.remove({ type: 'immersiveengineering:cloche', input: r.input.item })

    // Clone the results array safely in Rhino
    let finalResults = r.results.map(res => Object.assign({}, res))

    // If the crop has the hasStraw flag, append the extra straw outputs
    if (r.hasStraw) {
      finalResults.push(
        { chance: 0.25, count: 1, output: { id: 'farmersdelight:straw' } },
        { chance: 0.15, count: 2, output: { id: 'farmersdelight:straw' } }
      )
    }

    SOIL_TIERS.forEach(tier => {
      event.custom({
        type: 'immersiveengineering:cloche',
        input: r.input,
        render: r.render,
        results: finalResults,
        soil: tier.soils,
        time: Math.round(r.time / tier.multiplier)
      }).id('arkaneworx:cloche/' + r.id + tier.suffix)
    })
  })
})
