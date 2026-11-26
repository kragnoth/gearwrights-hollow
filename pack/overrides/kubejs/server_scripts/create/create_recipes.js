ServerEvents.recipes(event => {

  // mixing recipes
  // ['create:powdered_obsidian', 'minecraft:obsidian', 'minecraft:crying_obsidian']
  // event.recipes.createPressing('create:incomplete_precision_mechanism', 'minecraft:clock').id('custom:press_clock_to_incomplete_precision_mechanism');

  event.shaped('4x create:belt_connector', [
    'CCC'
  ], {
    C: 'minecraft:leather'
  }).id('arkaneworx:leather_belt_connector');
  // ['minecraft:iron_nugget', 'create:incomplete_precision_mechanism', 'create:precision_mechanism', 'create:cogwheel', 'create:large_cogwheel']
  // dev shortcut - switch in startup_scripts/gh_progression_config.js
  if (!global.GH_PROGRESSION.removePrecisionShortcut) event.shapeless('create:precision_mechanism', ['create:incomplete_precision_mechanism', 'create:cogwheel', 'create:large_cogwheel', 'minecraft:iron_nugget']).id('arkaneworx:precision_mechanism');
  event.shapeless('create:andesite_casing', ['create:andesite_alloy', '#minecraft:logs']).id('arkaneworx:andesite_casing');
  event.shapeless('create:copper_casing', ['#c:ingots/copper', '#minecraft:logs']).id('arkaneworx:copper_casing');
  event.shapeless('create:brass_casing', ['#c:ingots/brass', '#minecraft:logs']).id('arkaneworx:brass_casing');
  event.shapeless('create:railway_casing', ['#c:plates/obsidian', '#create:casing']).id('arkaneworx:train_casing');
  event.shapeless('createcasing:zinc_casing', ['#c:ingots/zinc', '#minecraft:logs']).id('arkaneworx:zinc_casing');


  // clock -> incomplete precision mechanism (dev shortcut) - switch in startup_scripts/gh_progression_config.js
  if (!global.GH_PROGRESSION.removePrecisionShortcut) {
    event.custom({
      "type": "create:pressing",
      "ingredients": [
        {
          "item": "minecraft:clock"
        }
      ],
      "results": [
        {
          "item": { "id": "create:incomplete_precision_mechanism" }
        }
      ]
    }).id('arkaneworx:press_clock');
  }




  event.custom({
    "type": "create:mixing",
    "ingredients": [
      {
        "item": "minecraft:ghast_tear"
      },
      {
        "item": "create:powdered_obsidian"
      },
      {
        "type": "fluid_stack",
        "amount": 250,
        "fluid": "minecraft:lava"
      }
    ],
    "results": [
      {
        "item": { "id": "minecraft:crying_obsidian" }
      },
      {
        "item": { "id": 'minecraft:soul_sand' }
      },
      {
        "count": 1,
        "item": { "id": "minecraft:ghast_tear" }
      }
    ],
    "heat_requirement": "heated"
  }).id("arkaneworx:crying_obsidian");



  event.custom({
    "type": "create:mixing",
    "ingredients": [
      {
        "item": 'create:powdered_obsidian'
      },
      {
        "type": "fluid_stack",
        "amount": 500,
        "fluid": "minecraft:lava"
      }
    ],
    "results": [
      {
        "item": { "id": 'minecraft:obsidian' }
      }
    ],
    "heat_requirement": "heated"
  }).id('arkaneworx:obsidian');



  event.shaped('create:propeller', [
    ' S ',
    'SCS',
    ' S '
  ], {
    C: 'create:andesite_alloy',
    S: '#c:plates'
  }).id('arkaneworx:create_propeller');

  event.shaped('create:empty_blaze_burner', [
    ' S ',
    'SCS',
    ' S '
  ], {
    C: 'minecraft:netherrack',
    S: '#c:plates'
  }).id('arkaneworx:create_burner');


  // washing
  event.custom({
    "type": "create:splashing",
    "ingredients": [
      {
        "tag": "minecraft:dirt"
      }
    ],
    "results": [
      {
        "item": { "id": "minecraft:mud" }
      }
    ]
  }).id('arkaneworx:dirt_to_mud');

  event.custom({

    "type": "minecraft:smoking",
    "experience": 0.0,
    "ingredient": {
      "item": "minecraft:mud"
    },
    "result": {
      "count": 1,
      "id": "minecraft:packed_mud"
    }

  }).id('arkaneworx:mud_to_packed_mud');


  // haunt glowstone dust into redstone dust
  event.custom({
    "type": "create:haunting",
    "ingredients": [
      {
        "item": "minecraft:glowstone_dust"
      }
    ],
    "results": [
      {
        "item": { "id": "minecraft:redstone" }
      }
    ]
  }).id('arkaneworx:haunted_glowstone_dust');

  // crush torch into glowstone dust
  event.custom({
    "type": "create:crushing",
    "ingredients": [
      {
        "item": "minecraft:torch"
      }
    ],
    "results": [
      {
        // chance 10%
        "chance": 0.1,
        "count": 2,
        "id": "minecraft:glowstone_dust"

      },
      // chance 75%, 1 glowstone dust
      {
        "chance": 0.75,
        "id": "minecraft:glowstone_dust"
      }
    ]
  }).id('arkaneworx:crushing_torch');


  // press glow berries into glowstone dust
  event.custom({
    type: "create:pressing",
    ingredients: [
      { item: 'minecraft:glow_berries' }
    ],
    results: [
      { item: { id: 'minecraft:glowstone_dust' }, count: 1, chance: 0.75 },
      { item: { id: 'minecraft:glowstone_dust' }, count: 1, chance: 0.25 }
    ]
  }).id('arkaneworx:pressing_glow_berries_to_glowstone_dust');


  event.custom({
    "type": "create:pressing",
    "ingredients": [  // Changed from "ingredient"
      {
        "item": "minecraft:packed_mud"
      }
    ],
    "results": [
      {
        "id": "minecraft:dripstone_block"
      }
    ]
  }).id('arkaneworx:packed_mud_to_dripstone_block');

  event.custom({
    "type": "create:haunting",
    "ingredients": [
      {
        "item": "minecraft:packed_mud"
      }
    ],
    "results": [
      {
        "item": { "id": "minecraft:rooted_dirt" }
      }
    ]
  }).id('arkaneworx:haunted_dirt');

  event.custom({
    "type": "create:haunting",
    "ingredients": [
      {
        "item": "minecraft:slime_block"
      }
    ],
    "results": [
      {
        "item": { "id": "minecraft:ender_pearl" }
      }
    ]
  }).id('arkaneworx:haunted_slime_block');



  event.custom({
    "type": "create:haunting",
    "ingredients": [
      {
        "item": "minecraft:feather"
      }
    ],
    "results": [
      {
        "item": { "id": "minecraft:phantom_membrane" }
      }
    ]
  }).id('arkaneworx:haunted_membrane');



  // waystone stuff ['waystones:warp_stone', 'waystones:dormant_shard']
  event.custom({
    "type": "create:haunting",
    "ingredients": [
      {
        "item": "waystones:dormant_shard"
      }
    ],
    "results": [
      {
        "item": { "id": "waystones:warp_stone" }
      }
    ]
  }).id('arkaneworx:haunt_warp_stone');


  // crushing infested stone drops xp
  event.custom({
    "type": "create:crushing",
    "ingredients": [
      {
        "item": "minecraft:infested_deepslate"
      }
    ],
    "processing_time": 250,
    "results": [
      {
        "chance": 0.75,
        "id": "create:experience_nugget"
      },
      {
        "count": 2,
        "chance": 0.25,
        "id": "create:experience_nugget"
      }
    ]
  }).id('arkaneworx:crushing_infested_deepslate');

  event.custom({
    "type": "create:crushing",
    "ingredients": [
      {
        "item": "minecraft:infested_stone"
      }
    ],
    "processing_time": 250,
    "results": [
      {
        "chance": 0.75,
        "id": "create:experience_nugget"
      },
      {
        "count": 2,
        "chance": 0.25,
        "id": "create:experience_nugget"
      }
    ]
  }).id('arkaneworx:crushing_infested_stone');

  // infested cobblestone
  event.custom({
    "type": "create:crushing",
    "ingredients": [
      {
        "item": "minecraft:infested_cobblestone"
      }
    ],
    "processing_time": 250,
    "results": [
      {
        "chance": 0.75,
        "id": "create:experience_nugget"
      },
      {
        "count": 2,
        "chance": 0.25,
        "id": "create:experience_nugget"
      }
    ]
  }).id('arkaneworx:crushing_infested_cobblestone');



});
