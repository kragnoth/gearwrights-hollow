// Create dev-environment shortcuts -> back to Create's intended recipes (switches in gh_progression_config.js)
// Note: KubeJS's event.remove() only sees mod/datapack recipes, not recipes other scripts add, so the shortcuts
// themselves are switched off inside recipes.js and create/create_recipes.js.
ServerEvents.recipes(event => {
    const C = global.GH_PROGRESSION

    if (C.removePrecisionShortcut) {
        // Nothing to add: the clock shortcut lives in create/create_recipes.js and now reads this switch.
        // Create's own sequenced assembly (golden sheet -> cogwheel, large cogwheel, iron nugget, 5 loops) remains.
    }

    if (C.removeCrafterShortcut) {
        // the 4-crafter shortcut in recipes.js reads this switch; create/removals.js removes Create's own recipe,
        // so it is restored here under our own id
        event.shaped('3x create:mechanical_crafter', [
            'E',
            'C',
            'T'
        ], {
            E: 'create:electron_tube',
            C: 'create:brass_casing',
            T: 'minecraft:crafting_table'
        }).id('gearwrights:progression/mechanical_crafter')
    }

    if (C.removePressShortcut) {
        // the stone press in recipes.js reads this switch; restore Create's iron-block press
        event.shaped('create:mechanical_press', [
            'S',
            'C',
            'I'
        ], {
            S: 'create:shaft',
            C: 'create:andesite_casing',
            I: '#c:storage_blocks/iron'
        }).id('gearwrights:progression/mechanical_press')
    }
})
