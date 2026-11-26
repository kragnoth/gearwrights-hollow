// Create New Age electricity after the brass tier (switches in gh_progression_config.js)
//  Before: basic energiser = andesite casing + lightning rod (depth 3, alongside the first cogs).
ServerEvents.recipes(event => {
    const C = global.GH_PROGRESSION

    if (C.gateEnergiser) {
        event.replaceInput({ id: 'create_new_age:shapeless/basic_energiser' }, 'create:andesite_casing', 'create:brass_casing')
    }

    if (C.generatorCoilUsesWire) {
        // copper wire comes from saw-cut copper plates, so generators need a press and a saw first
        event.replaceInput({ id: 'create_new_age:shaped/generator_coil' }, '#c:ingots/copper', 'create_new_age:copper_wire')
    }
})
