// Brass route (switch in gh_progression_config.js)
//  IE's alloy kiln makes brass from copper + zinc with no blaze burner, which makes Create's heated mixing optional.
//  Off by default (both routes stay); set removeKilnBrass to true to make the blaze burner the brass gate.
ServerEvents.recipes(event => {
    if (global.GH_PROGRESSION.removeKilnBrass) {
        event.remove({ id: 'immersiveengineering:alloysmelter/brass' })
    }
})
