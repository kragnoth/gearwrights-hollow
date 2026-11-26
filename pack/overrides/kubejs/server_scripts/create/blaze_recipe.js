ServerEvents.recipes(event => {

  // crush blaze rod into blaze powder, with a chance of glowstone dust or redstone
  event.custom({
      "type": "create:crushing",
      "ingredients": [
          {
              "item": "minecraft:blaze_rod"
          }
      ],
      "processing_time": 200,
      "results": [
          {
              "count": 3,
              "id": "minecraft:blaze_powder"
          },
          {
              "chance": 0.75,
              "id": "minecraft:blaze_powder"
          },
          {
              "chance": 0.5,
              "id": "minecraft:blaze_powder"
          },
          {
              "chance": 0.5,
              "id": "minecraft:blaze_powder"
          },
          {
              "chance": 0.25,
              "id": "minecraft:blaze_powder"
          },
          {
              "chance": 0.15,
              "id": "minecraft:glowstone_dust"
          },
          {
              "chance": 0.1,
              "id": "minecraft:redstone"
          }
      ]
  }).id('arkaneworx:crushing_blaze_rod');
});
