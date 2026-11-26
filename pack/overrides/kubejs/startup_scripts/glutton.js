const FoodProperties = Java.loadClass("net.minecraft.world.food.FoodProperties");
const Optional = Java.loadClass("java.util.Optional");
const ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");


// Create a mapping of items to be made edible with default values
// Using bread's default values as a base (nutrition: 5, saturation: 0.6)
const itemsToMakeEdible = {
  "minecraft:glistering_melon_slice": {
    nutrition: 6,  // Slightly better than bread
    saturation: 12.0, // Slightly better than bread
    alwaysEdible: true,
    eatSeconds: 1.6, // Standard eating time
    effects: [] // No special effects
  },

  // Vanilla mushrooms - similar to carrot/apple values (3-4 nutrition, 3.6-4.8 saturation)
  "minecraft:brown_mushroom": {
    nutrition: 3,
    saturation: 3.6,
    alwaysEdible: true,
    eatSeconds: 0.8, // Super fast eating
    effects: []
  },
  "minecraft:red_mushroom": {
    nutrition: 3,
    saturation: 3.6,
    alwaysEdible: true,
    eatSeconds: 0.8, // Super fast eating
    effects: []
  }
  
  
  
  // Adding glass bottle that returns glass blocks when eaten
  /*"minecraft:sand": {
    nutrition: 1,  // 1 shank (half a hunger bar)
    saturation: 1.0, // 1 satiation
    alwaysEdible: true,
    eatSeconds: 1.6, // Standard eating time
    usingConvertsTo: new ItemStack("minecraft:glass", 1), // Returns 1 glass block
    effects: [] // No special effects
  }*/
  // Add more items as needed in the format:
  // "modid:itemname": { nutrition, saturation, alwaysEdible, eatSeconds, effects }
};

ItemEvents.modification(event => {
  // First, make specified items edible with custom properties
  Object.entries(itemsToMakeEdible).forEach(([itemId, foodProps]) => {
    event.modify(itemId, item => {
      const newFood = new FoodProperties(
        foodProps.nutrition,
        foodProps.saturation,
        foodProps.alwaysEdible,
        foodProps.eatSeconds,
        foodProps.usingConvertsTo ? Optional.of(foodProps.usingConvertsTo) : Optional.empty(), // usingConvertsTo - glass bottle returns glass block
        foodProps.effects || []
      );
      item.setFood(newFood);
    });
  });
     
  // Then proceed with making all existing food items always edible
  event.modify("*", item => {
     // Retrieve the current food component (if any).
    let currentFood = item.get("food");
    if (currentFood) {
      let newFood = new FoodProperties(
        currentFood.nutrition(),       // Existing nutrition value
        currentFood.saturation(),      // Existing saturation value
        true,                          // Override: always edible
        currentFood.eatSeconds(),      // Existing eating duration
        currentFood.usingConvertsTo(), // Existing usingConvertsTo value (an Optional)
        currentFood.effects()          // Existing effects list
      );
      item.setFood(newFood);
    }
  });
});
