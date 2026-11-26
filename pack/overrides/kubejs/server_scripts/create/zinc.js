
// Adding the items to tags
ServerEvents.tags('item', event => {
    event.add('c:dusts', 'arkaneworx:zinc_dust');
    event.add('c:dusts/zinc', 'arkaneworx:zinc_dust');
});

// Adding Recipes
ServerEvents.recipes(event => {
    // 1. Create Washing: Crushed Raw Zinc -> Zinc Dust

    // 2. Vanilla Furnace: Zinc Dust -> Zinc Ingot
    event.smelting('create:zinc_ingot', 'arkaneworx:zinc_dust')
    .id('arkaneworx:smelting/zinc_dust_to_ingot');
});
