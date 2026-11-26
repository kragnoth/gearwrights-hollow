ServerEvents.recipes(event => {


        event.custom(
        {
            type: 'create:crushing',
            ingredients: [
                { item: 'minecraft:crying_obsidian' }
            ],
            processing_time: 400,
            results: [
                { item: { id: 'create:powdered_obsidian' }, count: 1 },
                { item: { id: 'minecraft:crying_obsidian' }, count: 1, chance: 0.75 },
                { item: { id: 'minecraft:ghast_tear' }, count: 1, chance: 0.15 },
                { item: { id: 'minecraft:amethyst_shard' }, count: 1, chance: 0.25 },
                { item: { id: 'minecraft:amethyst_shard' }, count: 1, chance: 0.125 }
            ]
        }).id('arkaneworx:crushing/crying_obsidian');

        event.custom({
            type: 'create_enchantment_industry:grinding',
            ingredients: [
                { item: 'minecraft:crying_obsidian' }
            ],
            results: [
                { item: { id: 'create:powdered_obsidian' }, count: 1 },
                { item: { id: 'minecraft:crying_obsidian' }, count: 1, chance: 0.75 },
                { item: { id: 'minecraft:ghast_tear' }, count: 1, chance: 0.15 },
                { item: { id: 'minecraft:amethyst_shard' }, count: 1, chance: 0.25 }
            ]
        }).id('arkaneworx:grinding/crying_obsidian');
});
