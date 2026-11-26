LootJS.modifiers((event) => {
  // Get all blocks and filter for specific budding blocks (excluding broken/damaged variants)
  Ingredient.of(/.*/).stacks.forEach(stack => {
    // Check if it's a budding block but exclude broken/damaged/etc variants
    if (stack.id.includes("budding") &&
      !stack.id.includes("broken") &&
      !stack.id.includes("damaged") &&
      !stack.id.includes("chipped") &&
      !stack.id.includes("flawed")) {
      event
        .addBlockModifier(stack.id)
        .removeLoot(Ingredient.all)
        .addLoot(
          LootEntry.of(stack.id).when((c) =>
            c.matchMainHand(ItemFilter.hasEnchantment("minecraft:silk_touch"))
          )
        );
    }
    // Check if it's a glass block using the tag
    if (stack.hasTag('c:glass_blocks')) {
      event
        .addBlockModifier(stack.id)
        .removeLoot(Ingredient.all)
        .addLoot(LootEntry.of(stack.id)); // No silk touch requirement
    }
    if (stack.hasTag('c:glass_panes')) {
      event
        .addBlockModifier(stack.id)
        .removeLoot(Ingredient.all)
        .addLoot(LootEntry.of(stack.id)); // No silk touch requirement
    }
  });
});