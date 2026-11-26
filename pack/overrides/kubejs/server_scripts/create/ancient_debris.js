ServerEvents.recipes(event => {

    event.custom({
        type: 'create:crushing',
        ingredients: [
            { item: 'minecraft:ancient_debris' }
        ],
        processing_time: 350,
        results: [
            { count: 3, id: 'minecraft:netherite_scrap' },
            { chance: 0.5, id: 'minecraft:netherite_scrap' },
            { chance: 0.5, id: 'minecraft:netherite_scrap' }
        ]
    }).id('arkaneworx:ancient_debris_crushing')
})
