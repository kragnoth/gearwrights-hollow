// priority: 1000
// startup script: KubeJS only lets startup scripts write to `global`. Edit, then restart the game
// (or run /kubejs reload startup_scripts, then /reload) for changes to apply.
// ============================================================================================================
//  Gearwright's Hollow - progression re-tiering                                           (server_scripts/progression)
//  Target ladder:  Create kinetics  ->  IE steel + Create brass  ->  Create precision + electricity
//                  ->  Neo Vitae / Tarbound (magic-tech side branches)  ->  EnderIO (end game)
//  Every change below is a switch: set it to false and restart to get the old behaviour back.
// ============================================================================================================
global.GH_PROGRESSION = {
    // --- Create dev shortcuts (from create/create_recipes.js + recipes.js) -----------------------------------
    removePrecisionShortcut: true,    // clock -> incomplete mechanism (press) + shapeless finish. Sequenced assembly stays.
    removeCrafterShortcut:   true,    // 4 crafters from table + large cog + brass casing -> Create's 3 from electron tube
    removePressShortcut:     false,   // stone + shaft + andesite casing press. Kept: it is a fair early-game Create recipe

    // --- EnderIO becomes the late tier ------------------------------------------------------------------------
    gateVoidChassis:         true,    // every starter EnderIO machine uses it: needs IE steel + Create brass casing
    sagMillNeedsCrushing:    true,    // SAG Mill takes a Crushing Wheel instead of flint: ore tripling after Create's doubling

    // --- Create New Age electricity after brass ---------------------------------------------------------------
    gateEnergiser:           true,    // basic energiser: brass casing instead of andesite casing
    generatorCoilUsesWire:   true,    // generator coil wound from copper wire (saw-cut plates) instead of raw ingots

    // --- Brass ------------------------------------------------------------------------------------------------
    removeKilnBrass:         false,   // IE alloy kiln brass skips Create's heated mixer. Set true to force the blaze burner

    // --- Incursion alloys: Create's discontinued chromatic compound / shadow steel / refined radiance ----------
    incursionAlloys:         true,    // craftable (tar + superheated mixing, End and Nether steps) and used (seal, casings)

    // --- The Hollow endgame: Foundry Residue -> Escapement -> creative items -----------------------------------
    hollowEndgame:           true,    // residue drops, the Escapement chain and the creative-item recipes
}
