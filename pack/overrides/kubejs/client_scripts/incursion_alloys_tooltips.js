// Lore lines for the incursion alloys (see server_scripts/progression/50_incursion_alloys.js)
ItemEvents.modifyTooltips(event => {
    event.add('create:chromatic_compound', Text.darkGray('Draught condensate. The Gearwrights bottled what came through the gates.'))
    event.add('create:shadow_steel', Text.darkGray('Steeped in the cold of the Beyond. It never quite warms in the hand.'))
    event.add('create:refined_radiance', Text.darkGray('Fired with the heat from Below. Brighter than it has any right to be.'))
})
