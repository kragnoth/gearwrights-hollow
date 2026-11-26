// The Escapement chain and the creative items (switch: hollowEndgame in startup_scripts/gh_progression_config.js).
//  Unwound Movement  Create sequenced assembly: precision mechanism <- residue, shadow steel, press, refined radiance
//  Bled Movement     Neo Vitae altar, tier 4, 50 000 LP
//  Wound Movement    Create spout: 500 mB Essence of the Void (Tarbound)
//  Escapement        right-click the Hollow's altar with a Wound Movement (60_the_hollow.js). After release each one also
//                    takes Distilled Residue: 4, 8, 12 ... capped at 32.
//  Creative items    one Escapement each (mechanical crafting, or the Neo Vitae altar for the activation crystal).
//  Equivalents       creative motor <-> creative gear motor, creative fluid tank <-> creative fluid vessel (shapeless swap).
//  Create Encased    creative casing: brass casing + amethyst shard (cosmetic only, priced like railway casing).
ServerEvents.recipes(event => {
  if (!global.GH_PROGRESSION.hollowEndgame) return
  const R = 'gearwrights:foundry_residue', INC = 'gearwrights:incomplete_movement', E = 'gearwrights:escapement'
  const step = (type, extra) => ({ type: type, ingredients: [{ item: INC }].concat(extra ? [{ item: extra }] : []), results: [{ id: INC }] })

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'create:precision_mechanism' },
    transitional_item: { id: INC },
    loops: 1,
    sequence: [step('create:deploying', R), step('create:deploying', 'create:shadow_steel'), step('create:pressing'),
               step('create:deploying', 'create:refined_radiance')],
    results: [{ id: 'gearwrights:unwound_movement' }]
  }).id('gearwrights:hollow/unwound_movement')

  event.custom({
    type: 'neovitae:ara_vitae_recipe', input: { item: 'gearwrights:unwound_movement' },
    output: { count: 1, id: 'gearwrights:bled_movement' },
    minTier: 4, bloodNeeded: 50000, craftSpeed: 30, drainSpeed: 50, copyInputComponents: false
  }).id('gearwrights:hollow/bled_movement')

  event.custom({
    type: 'create:filling',
    ingredients: [{ item: 'gearwrights:bled_movement' }, { type: 'neoforge:single', amount: 500, fluid: 'tarbound:essence_of_the_void' }],
    results: [{ id: 'gearwrights:wound_movement' }]
  }).id('gearwrights:hollow/wound_movement')

  // --- creative items: one Escapement in the middle ---------------------------------------------------------
  const mc = (id, pattern, key) => {
    key.E = { item: E }
    event.custom({ type: 'create:mechanical_crafting', accept_mirrored: false, category: 'misc', pattern: pattern, key: key,
                   result: { count: 1, id: id }, show_notification: true }).id('gearwrights:hollow/creative/' + id.split(':')[1])
  }
  const it = id => ({ item: id }), tg = t => ({ tag: t })
  // tier 1
  mc('create:creative_motor', ['PBP', 'BEB', 'PBP'], { P: it('create:precision_mechanism'), B: it('create:brass_casing') })
  mc('create:creative_fluid_tank', ['STS', 'TET', 'STS'], { S: it('create:sturdy_sheet'), T: it('create:fluid_tank') })
  mc('create:creative_blaze_cake', ['CBC', 'BEB', 'CBC'], { C: it('create:blaze_cake'), B: it('create:blaze_burner') })
  mc('simulated:creative_physics_staff', [' R ', 'SES', ' P '], { R: it('create:refined_radiance'), S: it('create:shadow_steel'),
                                                                  P: it('create:precision_mechanism') })
  mc('enderio_evolution:eternal_creative_power', ['CBC', 'BEB', 'CBC'], { C: it('enderio_evolution:capacitor_stellar'),
                                                                           B: it('enderio_evolution:stellar_capacitor_bank') })
  mc('immersiveengineering:capacitor_creative', ['HSH', 'SES', 'HSH'], { H: it('immersiveengineering:capacitor_hv'), S: tg('c:plates/steel') })
  // tier 2
  mc('create:creative_crate', ['VSV', 'SES', 'VSV'], { V: it('create:item_vault'), S: it('create:sturdy_sheet') })
  // (Create Enchantment Industry's creative bookshelf is a block with no item, so it can't be crafted)
  mc('enderio_evolution:creative_batch_upgrade', [' U ', 'UEU', ' U '], { U: it('enderio_evolution:stellar_batch_upgrade') })
  mc('enderio_evolution:creative_stack_upgrade', [' U ', 'UEU', ' U '], { U: it('enderio_evolution:stellar_stack_upgrade') })
  event.custom({
    type: 'neovitae:ara_vitae_recipe', input: { item: E }, output: { count: 1, id: 'neovitae:activation_crystal_creative' },
    minTier: 5, bloodNeeded: 100000, craftSpeed: 20, drainSpeed: 100, copyInputComponents: false
  }).id('gearwrights:hollow/creative/activation_crystal_creative')

  // --- equivalents ---------------------------------------------------------------------------------------------
  event.shapeless('gnkinetics:creative_gear_motor', ['create:creative_motor']).id('gearwrights:hollow/swap/gear_motor')
  event.shapeless('create:creative_motor', ['gnkinetics:creative_gear_motor']).id('gearwrights:hollow/swap/motor')
  event.shapeless('create_connected:creative_fluid_vessel', ['create:creative_fluid_tank']).id('gearwrights:hollow/swap/fluid_vessel')
  event.shapeless('create:creative_fluid_tank', ['create_connected:creative_fluid_vessel']).id('gearwrights:hollow/swap/fluid_tank')

  // --- Create Encased's creative casing: cosmetic, so cheap ------------------------------------------------------
  event.remove({ id: 'createcasing:item_application/creative_casing' })
  event.custom({ type: 'create:item_application', ingredients: [it('create:brass_casing'), it('minecraft:amethyst_shard')],
                 results: [{ id: 'createcasing:creative_casing' }] }).id('gearwrights:hollow/creative_casing')
})
