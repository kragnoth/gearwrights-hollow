// Items of the Hollow endgame (textures in kubejs/assets/gearwrights/textures/item/).
//  Foundry Residue -> (Create sequenced assembly) Unwound Movement -> (Neo Vitae altar) Bled Movement
//  -> (Create spout, Essence of the Void) Wound Movement -> (the Hollow's altar) Escapement -> creative items.
StartupEvents.registry('item', event => {
  event.create('gearwrights:foundry_residue').displayName('Foundry Residue').rarity('uncommon')
  event.create('gearwrights:distilled_residue').displayName('Distilled Residue').rarity('rare').glow(true)
  event.create('gearwrights:incomplete_movement').displayName('Incomplete Movement').maxStackSize(1)
  event.create('gearwrights:unwound_movement').displayName('Unwound Movement').rarity('uncommon').maxStackSize(16)
  event.create('gearwrights:bled_movement').displayName('Bled Movement').rarity('rare').maxStackSize(16)
  event.create('gearwrights:wound_movement').displayName('Wound Movement').rarity('rare').maxStackSize(16)
  event.create('gearwrights:escapement').displayName('Escapement').rarity('epic').glow(true).maxStackSize(16)
})
