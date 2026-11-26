// EnderIO as the end-game tier (switches in gh_progression_config.js)
//  Before: Alloy Smelter / SAG Mill / Stirling Generator at depth 3 - same time as Create's water wheel -
//          because the Void Chassis was 4 iron + 4 grains of infinity.
//  After:  the chassis needs IE steel sheet and a Create brass casing, so EnderIO opens once both
//          main tech lines have reached their second tier. The SAG Mill also needs a Crushing Wheel, so its
//          ore tripling comes after Create's doubling instead of before it.
ServerEvents.recipes(event => {
    const C = global.GH_PROGRESSION

    if (C.gateVoidChassis) {
        event.remove({ id: 'enderio:void_chassis' })
        event.shaped('enderio:void_chassis', [
            'SGS',
            'GBG',
            'SGS'
        ], {
            S: '#c:plates/steel',
            G: '#c:dusts/grains_of_infinity',
            B: 'create:brass_casing'
        }).id('gearwrights:progression/void_chassis')
    }

    if (C.sagMillNeedsCrushing) {
        event.replaceInput({ id: 'enderio:sag_mill' }, 'minecraft:flint', 'create:crushing_wheel')
    }
})
