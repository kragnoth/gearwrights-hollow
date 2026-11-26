const metals = ['iron', 'zinc', 'copper']


ServerEvents.recipes(event => {

  event.remove({id: "waystones:warp_dust"})

  event.shapeless('16x waystones:warp_dust', ['#c:ender_pearls', '#c:gems/amethyst']).id('waystones:warp_dust')

  event.replaceInput(
    { input: 'minecraft:ender_pearl' },
    'minecraft:ender_pearl',
    '#c:ender_pearls'
  );

  event.replaceInput(
    { input: 'minecraft:quartz' },
    'minecraft:quartz',
    '#c:gems/quartz'
  );

  event.remove({id: 'create:crushing/nether_gold_ore'})


  // Loop through all recipes to find ones with ender pearl input
  event.forEachRecipe({ input: '#c:ender_pearls' }, recipe => {
    // Get the recipe's output ID as a string
    let outputId = recipe.getOriginalRecipeResult().getId();

    // Check if the output ID contains "eye" - if it does, skip this recipe
    if (outputId.includes('eye') || outputId.includes('pearl') || outputId.includes('warp')) {
      return; // Skip this recipe, don't replace the ender pearl
    }

    // If we get here, the output doesn't contain "eye", so replace the ender pearl
    event.replaceInput(
      { id: recipe.getId() }, // Target this specific recipe by its ID
                       '#c:ender_pearls',
                       'waystones:warp_dust'
    );
  });


  event.replaceInput(
    { input: 'minecraft:candle' }, // Filter to find recipes with the input item
    'minecraft:candle',            // The ingredient to replace
    '#minecraft:candles'               // The replacement ingredient (tag)
  );

  event.replaceInput(
    {
      input: 'minecraft:leather'
    },
    'minecraft:leather',
    '#c:leathers'
  );
  // dev shortcut - switch in startup_scripts/gh_progression_config.js
  if (!global.GH_PROGRESSION.removeCrafterShortcut) event.shapeless('4x create:mechanical_crafter', ['minecraft:crafting_table', 'create:large_cogwheel', 'create:brass_casing']).id('arkaneworx:mechanical_crafter')
    event.shapeless('minecraft:bread', ['#c:crops/wheat', '#c:crops/wheat', '#c:crops/wheat']).id('arkaneworx:shapeless_bread')
  event.shapeless('create:encased_chain_drive', ['#c:chains', '#create:casing']).id('arkaneworx:shapeless_chaindrive')
  event.remove({ id: 'minecraft:chain' })
  event.remove({ id: 'create:crafting/appliances/chain_from_zinc' })


  metals.forEach(metal => {
    event.shapeless('8x minecraft:chain', [`#c:nuggets/${metal}`, `#c:nuggets/${metal}`, `#c:ingots/${metal}`]).id(`arkaneworx:shapeless_chain_${metal}`)
  });

  event.campfireCooking('create:scorchia', 'create:scoria', 0.35, 600).id('arkaneworx:campfire_cooking_scoria')

  event.shaped('minecraft:hopper', [
    'ILI',
    'ILI',
    ' I '
  ], {
    I: 'minecraft:iron_ingot',
    L: '#minecraft:logs'
  }).id("arkaneworx:loghopper")



  /*event.shaped('2x create:crushing_wheel', [
    'AAA',
    'AZA',
    'AAA'
  ], {
    A: 'create:andesite_alloy',
    Z: 'create:zinc_block'
  }).id("arkaneworx:crushing_wheel")*/


  event.shaped('4x minecraft:chest', [
    'LLL',
    'L L',
    'LLL'
  ], {
    L: '#minecraft:logs'
  }).id("arkaneworx:fourbychest")

  // stone press - switch in startup_scripts/gh_progression_config.js
  if (!global.GH_PROGRESSION.removePressShortcut) {
    event.shaped('create:mechanical_press', [
      'S',
      'C',
      'B'
    ], {
      S: 'create:shaft',
      C: 'create:andesite_casing',
      B: '#c:stones'
    }).id("arkaneworx:stone_andesite_casing_press")
  }

  event.shaped('6x minecraft:scaffolding', [
    'SWS',
    'SCS',
    'S S'
  ], {
    S: 'minecraft:stick',
    W: '#minecraft:wooden_slabs',
    C: '#c:strings'
  }).id('arkaneworx:oak_scaffolding')



});


