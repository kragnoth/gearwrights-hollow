LootJS.modifiers((event) => {

    // 1. Wither drops Nether Star (Standard behavior + Looting bonus)
    event.addEntityModifier("minecraft:wither")
    .addLoot(
        LootEntry.of("minecraft:nether_star")
        .applyEnchantmentBonus("minecraft:looting", 1)
    );


});
