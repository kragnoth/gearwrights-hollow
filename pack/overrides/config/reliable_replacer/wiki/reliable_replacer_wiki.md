# Reliable Replacer Documentation

*Total Pages Crawled: 7*

---

# Page: Reliable Replacer
**URL:** https://moddedmc.wiki/en/project/reliable-replacer/latest/docs


# Reliable Replacer

A lightweight utility for replacing one block with another, both during worldgen and afterward.
This mod allows modpack creators to effortlessly ban items or restrict their
usage using standard JSON files, without the need for complex scripts.


## What AboutBlock Swap?

I'm glad you asked! I made Reliable Replacer because of some of my personal frustrations with Block Swap. Here are
some reasons to consider switching!

- Reliable Replacer is frequently updated and supports the latest versions, while as of the time of writing this, Block
Swap is stuck on 1.20.1.
- Live config reloading! Run/reloadand see your changes instantly take place.
- Reliable Replacer is fully server-side, so it's compatible with Vanilla clients!
- Advanced filtering:Filter swaps by biome, dimensions, placed feature, coordinates, or structure!Toggle retrogen on or offper rule.Toggle player placement replacingper rule.
- Much more flexible configuration, supporting simple JSON configuration in user-defined folders and integrating with
Cloth Config.
- Per-rule toggleable persistence:Decide if replacement blocks should inherit the properties of the old block.
- Doesn't require any external libraries.

- Filter swaps by biome, dimensions, placed feature, coordinates, or structure!
- Toggle retrogen on or offper rule.
- Toggle player placement replacingper rule.

- Decide if replacement blocks should inherit the properties of the old block.


## Migrating From Block Swap

Making the switch is easy! Reliable Replacer supports a legacy format designed to work exactly like Block
Swap's configuration.

When you first launch the game with Reliable Replacer installed, aswapper.jsonfile will be automatically generated
in yourconfig/reliable_replacerfolder. This file uses a simple key-value pair format identical to Block Swap.

To migrate, simply copy the "swapper" block from your old configuration into this file:


```
{
  "swapper": {
    "oreganized:lead_door": "supplementaries:netherite_door",
    "farmersdelight:rope": "supplementaries:rope",
    "minecraft:dirt": "minecraft:stone",
    ...
  }
}
```

Note: Rules defined inswapper.jsonautomatically inherit default settings (retrogen enabled, replace on player
placement, etc.). For more advanced control, use the standard rule format.


## Features

A full feature list is available on
theModded Minecraft Wiki.

For information and examples on how to use the mod, please also refer to
thewiki.


## Quick-Start Example

Create a file calledmy_replacement.json, or whatever else you'd like, inconfig\reliable_replacer:


```
[
  {
    "inputs": [
      "minecraft:dirt"
    ],
    "output": "minecraft:diamond_block",
    "biomes": [
      "minecraft:plains"
    ],
    "min_y": "-30",
    "max_y": "64",
    "player_blocks": "true",
    "keep_nbt": "true"
  },
  {
    "inputs": [
      "minecraft:stone"
    ],
    "output": "minecraft:gold_ore"
  }
]
```


## License


---

# Page: Advanced Replacements
**URL:** https://moddedmc.wiki/en/project/reliable-replacer/latest/docs/reliable-replacer/examples/advanced


# Advanced Replacements


### Replacing Blocks with NBT Data

You can replace blocks and assign them specific NBT block entity data. This is useful for changing Spawners, Chests, or Command Blocks.
This example replaces any Blaze Spawner with a Zombie Spawner.


```
{
  "inputs": ["minecraft:spawner"],
  "input_nbt": "{SpawnData:{entity:{id:\"minecraft:blaze\"}}}",
  "output": "minecraft:spawner",
  "output_nbt": "{SpawnData:{entity:{id:\"minecraft:zombie\"}}}"
}
```


### Probabilistic Replacement

Adds a 30% chance for any Stone block to become Mossy Cobblestone.


```
{
  "inputs": ["minecraft:stone"],
  "output": "minecraft:mossy_cobblestone",
  "probability": 0.3
}
```


### Multi-Block Placement (Doors, Tall Grass, Beds)

When placing or removing multi-block structures like doors or tall grass, useadditional_blocksto specify the secondary blocks at relative offsets.
This example replaces a Dandelion with a Rose Bush, placing the lower half at the original location and the upper half exactly 1 block above it.


```
{
  "inputs": ["minecraft:dandelion"],
  "output": "minecraft:rose_bush",
  "output_state_properties": {
    "half": "lower"
  },
  "additional_blocks": [
    {
      "output": "minecraft:rose_bush",
      "x_offset": 0,
      "y_offset": 1,
      "z_offset": 0,
      "output_state_properties": {
        "half": "upper"
      }
    }
  ]
}
```


### Enforcing Output States

Ensure that all placed Oak Logs are vertical (axis=y), regardless of how the original block was rotated.


```
{
  "inputs": ["#minecraft:logs"],
  "output": "minecraft:oak_log",
  "output_state_properties": {
    "axis": "y"
  }
}
```


### Random Rotation

Replace Pumpkins with Carved Pumpkins, but randomize their facing direction.


```
{
  "inputs": ["minecraft:pumpkin"],
  "output": "minecraft:carved_pumpkin",
  "randomize_properties": ["facing"]
}
```


### Neighbor Conditions

Replaces Coarse Dirt with Grass Block, but only if there is Air directly above it.


```
{
  "inputs": ["minecraft:coarse_dirt"],
  "output": "minecraft:grass_block",
  "neighbors": {
    "up": "minecraft:air"
  }
}
```

You can also use direction keywords (sides,any,all), block tags (#tag), and lists of blocks:


```
{
  "inputs": ["minecraft:stone"],
  "output": "minecraft:mossy_cobblestone",
  "neighbors": {
    "sides": ["#minecraft:logs", "minecraft:water"],
    "any": "minecraft:mossy_cobblestone"
  }
}
```


### Block State Filtering

Replaces only the top half of tall flowers (like Sunflowers) with Air, effectively removing them, while leaving the bottom half (or other flowers) alone.


```
{
  "inputs": ["minecraft:sunflower", "minecraft:lilac"],
  "state_properties": {
    "half": "upper"
  },
  "remove": true
}
```


### Coordinate Range

This rule replaces all Lava with Water, but only within a 200-block radius of the world spawn on the X and Z axes.


```
{
  "inputs": ["minecraft:lava"],
  "output": "minecraft:water",
  "min_x": "spawn-200",
  "max_x": "spawn+200",
  "min_z": "spawn-200",
  "max_z": "spawn+200"
}
```


### Structure Modification

Replace Cobblestone with Mossy Cobblestone, but only inside Jungle Temples.


```
{
  "inputs": ["minecraft:cobblestone"],
  "output": "minecraft:mossy_cobblestone",
  "structures": ["minecraft:jungle_temple"]
}
```


### Inverted Conditions (Not)

You can use thenotfield to apply a rule everywhereexceptin specific conditions.
This example replaces Grass Blocks with Podzol everywhere,exceptin the Plains biome.


```
{
  "inputs": ["minecraft:grass_block"],
  "output": "minecraft:podzol",
  "not": {
    "biomes": ["minecraft:plains"]
  }
}
```


### Random Output Selection

You can specify a list of outputs to randomly choose from.
This is useful for adding visual variation or handling cases where variants are split into different block IDs (rather than block states).


```
{
  "inputs": ["minecraft:wool"],
  "outputs": [
    "minecraft:red_wool",
    "minecraft:blue_wool",
    "minecraft:green_wool"
  ]
}
```


### Selective Item NBT Replacement

Instead of replacing the entire NBT compound for a chest, you can target specific items inside its inventory to mutate. This is perfect for migrating items from removed mods or updating tools to equivalents like Tinkers Construct.

This example searches any block tagged#c:chestsfor a Vanilla Iron Sword, replaces it with a Tinkers Construct sword, and applies the necessary tool data NBT without touching any other items in the chest.


```
{
  "inputs": ["#c:chests"],
  "item_replacements": [
    {
      "list_name": "Items",
      "match_id": "minecraft:iron_sword",
      "replace_id": "tconstruct:sword",
      "replace_nbt": "{tic_stats:{Damage:5.5f,AttackSpeed:1.6f}}"
    }
  ]
}
```

You can apply a probability to individual item replacements. Because the mod evaluates item replacements from top to bottom, you can stack them with cumulative probabilities to randomize an item into one of several different outcomes independently per slot.

This example randomizes wooden swords found inside a chest into either a Tinkers Construct Sword (50% chance) or a Dagger (50% chance). Each wooden sword in the chest rolls independently!


```
{
  "inputs": ["#c:chests"],
  "item_replacements": [
    {
      "probability": 0.5,
      "list_name": "Items",
      "match_id": "minecraft:wooden_sword",
      "replace_id": "tconstruct:sword",
      "replace_nbt": "{Damage:0,tic_broken:0b,tic_materials:[\"tconstruct:iron\",\"tconstruct:wood\",\"tconstruct:wood\"]}"
    },
    {
      "probability": 1.0,
      "list_name": "Items",
      "match_id": "minecraft:wooden_sword",
      "replace_id": "tconstruct:dagger",
      "replace_nbt": "{Damage:0,tic_broken:0b,tic_materials:[\"tconstruct:iron\",\"tconstruct:wood\"]}"
    }
  ]
}
```


---

# Page: Features
**URL:** https://moddedmc.wiki/en/project/reliable-replacer/latest/docs/reliable-replacer/features


# Features

Reliable Replacer offers the ability to modify world generation and block placement logic without requiring complex scripting.


### Core Features

- Block Replacement: Swap any block for another during world generation or retrogen.
- Block Swap Migration: Natively supports theBlock Swapconfiguration format for easy migration.
- Multi-Block Structures: Place or remove secondary blocks at specific offsets (ideal for doors, beds, or tall grass).
- Namespace Filtering: Target entire mods using wildcard syntax (e.g., replace allfarmersdelight:*blocks).
- State Retention: Automatically copy block properties (like rotation or waterlogging) from the original block to the replacement.
- State Filtering: Target specific block states (e.g., only replace doors that areopen=trueor stairs that arehalf=top).
- NBT Filtering: Target specific blocks with NBT (e.g. only Spider Spawners or Chests with certain items).
- Output State Enforcement: Force specific properties on the replacement block (e.g., ensure all placed logs are vertical).
- Property Randomization: Randomize specific properties (like rotation) for natural variation.
- Probabilistic Replacement: Define a chance for a replacement to happen (e.g., 50% chance) to add variation.
- Retrogen: Apply replacement rules to chunks that have already been generated when they are loaded next.
- Player Placement: Apply replacement rules to any blocks that players place.
- NBT Item Replacements: Selectively modify and update specific items inside lists like Inventories (Chests, Barrels, etc.) without having to replace the entire NBT object.


### Context Awareness

The mod can apply rules conditionally based on the environment:

- Biomes: Only replace blocks in specific biomes.
- Dimensions: Restrict rules to the Nether, End, or custom dimensions.
- Structures: Apply changes only inside specific structures (e.g., Villages, Strongholds).
- Neighbors: Check adjacent blocks using specific directions, directional keywords (any,all,sides), block IDs, tags (#tag), arrays, or wildcards.
- Coordinates: Filter by X, Y, Z coordinates, with support for world-spawn relative positions.


---

# Page: Basic Replacements
**URL:** https://moddedmc.wiki/en/project/reliable-replacer/latest/docs/reliable-replacer/examples/basic


# Basic Replacements


### Simple Block Swap

Replaces all Granite with Deepslate.


```
{
  "inputs": ["minecraft:granite"],
  "output": "minecraft:deepslate"
}
```


### Removing Blocks

Removes all Bedrock from the world.


```
{
  "inputs": ["minecraft:bedrock"],
  "remove": true
}
```


### Mod ID Wildcard

Replacesallblocks fromexamplemodwithminecraft:stone.
This is useful if you remove a mod but want to keep the world geometry intact.


```
{
  "inputs": ["examplemod:*"],
  "output": "minecraft:stone"
}
```


### Biome Specific

Replaces Grass Blocks with Sand, but only in Plains biomes.


```
{
  "inputs": ["minecraft:grass_block"],
  "output": "minecraft:sand",
  "biomes": ["minecraft:plains"]
}
```


---

# Page: Missing IDs
**URL:** https://moddedmc.wiki/en/project/reliable-replacer/latest/docs/reliable-replacer/missing_ids


# Missing IDs


### Missing ID Remapping

Reliable Replacer includes a system to handle blocks that no longer exist in your modpack (e.g., after removing a mod).
This prevents air blocks by remapping orphaned IDs to valid blocks as chunks are loaded.


#### How it Works

Unlike standard replacement rules that run during world generation, the missing ID remapper intercepts the chunk loading process.
It scans the chunk's block palette for specific strings and replaces them before the game attempts to resolve them into actual blocks.


#### Configuration

This feature is configured in the global configuration file located atconfig/reliable_replacer.json. Use YACL for easy editing.

Example Configuration:


```
{
  "enabled": true,
  "missing_id_map": {
    "oldmod:deleted_block": "minecraft:stone",
    "another_mod:missing_ore": "minecraft:deepslate"
  }
}
```

- Key (Left side):The exact string ID of the block that was removed (e.g.,"oldmod:deleted_block").
- Value (Right side):The valid block ID you want to appear in its place (e.g.,"minecraft:stone").


---

# Page: Usage
**URL:** https://moddedmc.wiki/en/project/reliable-replacer/latest/docs/reliable-replacer/usage


# Usage


### Configuration Location

The mod watches the./config/reliable_replacer/folder in your instance.

- Auto-Generated Files: On first launch, the mod generatesexample_rules.json.disabled(for reference) andswapper.json(for legacy support).
- Custom Files: You can create any number of additional.jsonfiles in this folder.
- Recursive Loading: The mod loads all JSON files found in this directory and its subdirectories.
- Reloading: You can reload changes in-game using/reload.


### Global Configuration

Global settings are found inconfig/reliable_replacer.jsonor via theYACLmenu in-game.

Available options:

- "enabled"(Boolean, defaulttrue): Master switch for the mod's features.
- "enable_retrogen"(Boolean, defaulttrue): Global switch to toggle retro-generation block scanning on loaded chunks. Whenfalse(or when no active rules have retrogen enabled), retrogen chunk scans are skipped completely.
- "missing_id_map"(Object): Remap missing block IDs when loading chunks or structure templates.


### JSON Structure

A rule file can contain a single rule object or an array of rule objects.

Single Rule:


```
{
  "inputs": ["minecraft:dirt"],
  "output": "minecraft:stone"
}
```

Multiple Rules:


```
[
  {
    "inputs": ["minecraft:dirt"],
    "output": "minecraft:stone"
  },
  {
    "inputs": ["minecraft:gravel"],
    "output": "minecraft:sand"
  }
]
```


### Block Swap Format

To make migrating fromBlock Swapeasier, Reliable Replacer supports a simplified key-value format. You can use the auto-generatedswapper.jsonor add a"swapper"block to any of your config files.


```
{
  "swapper": {
    "oldmod:input_block": "newmod:output_block",
    "minecraft:dirt": "minecraft:stone"
  }
}
```


---

# Page: Filtering
**URL:** https://moddedmc.wiki/en/project/reliable-replacer/latest/docs/reliable-replacer/filtering


# Filtering

Every rule is defined by a JSON object with specific fields.
If a field is omitted, that specific condition is ignored (i.e., it matches everything).


### Input & Output


FieldTypeDescriptioninputsList<String>A list of block IDs, namespaces, or tags to replace.Specific:"minecraft:stone"Wildcard:"modid:*"Tags:"#minecraft:logs"outputStringThe block ID to place instead.Defaults to original block if omitted.outputsList<String>A list of possible block IDs to randomly choose from. If used, the replacement will be randomly selected from this list.removeBooleanIftrue, the block is explicitly replaced with Air. Overridesoutput.keep_statesBooleanIftrue, attempts to copy shared properties (rotation, waterlogging, etc.) to the new block. Default:true. SeeState Retentionfor details.


### Output Customization

You can further control the properties of the placed block using these fields.


FieldTypeDescriptionoutput_nbtStringA JSON string representing NBT data to apply to the output block (e.g.,"{SpawnData:{entity:{id:\"minecraft:zombie\"}}}").output_state_propertiesMap<String, String>Force specific properties on the output block (e.g.,{"axis": "y"}). Overrideskeep_states.randomize_propertiesList<String>A list of properties to randomize (e.g.,["facing", "rotation"]). Deterministic based on position.item_replacementsList<Object>A list of rules to selectively replace individual items inside a block entity's NBT arrays (like chests).


### Item Replacements Properties

When using theitem_replacementsarray, each rule object accepts the following properties to surgically swap items inside NBT lists:


PropertyTypeDescriptionlist_nameStringThe NBT key of the list to iterate over. Defaults to"Items". Supports dot-notation for nested lists (e.g.,"Inventory.Items").match_idStringThe registry ID of the item you want to find and replace (e.g.,"minecraft:wooden_sword").replace_idStringThe new item registry ID to replace the matched item with.replace_nbtString(Optional)A stringified NBT compound to merge directly into the new item'stagproperty.probabilityFloat(Optional)A number between0.0and1.0representing the independent chance for this specific item replacement to occur. Great for loot randomization!


### Multi-Block Structures

Use theadditional_blocksfield to place or remove secondary blocks at specific offsets relative to the main block.


FieldTypeDescriptionadditional_blocksList<Object>A list of offset block definitions to apply alongside the main replacement.

Additional Block Object properties:

- output/outputs: The block ID(s) to place at the offset.
- remove: Boolean. Iftrue, explicitly sets the offset block to Air.
- x_offset,y_offset,z_offset: Integers representing the coordinate offset relative to the original block (Default0).
- output_nbt: A JSON string representing NBT data to apply to this offset block.
- output_state_properties: A Map to force specific properties on this offset block.
- randomize_properties: A List of properties to randomize for this offset block.


### World Conditions


FieldTypeDescriptionbiomes/biomeList<String> / StringList or single ID of biomes where this rule applies.dimensions/dimensionList<String> / StringList or single ID of dimensions (e.g.,minecraft:overworld).structures/structureList<String> / StringList or single ID of structures. The rule only runs if the block is inside one of these structures.features/featureList<String> / StringList or single ID of worldgen feature IDs, tags, or tree types (e.g.,minecraft:oak,minecraft:ore_diamond_buried,#c:ores). Only applies during initial world generation.structure_radiusIntegerOptional block radius around structure bounding boxes / pieces (Default0).biome_radiusIntegerOptional block radius around matching biomes (Default0).feature_radiusIntegerOptional block radius around feature origin / placement bounds (Default0).radiusIntegerGeneral fallback block radius for structures, biomes, and features if specific radius is omitted.

Note:Large radius checks can have a hit on worldgen performance.


### Coordinates

Coordinate fields accept simple numbers or relative text.


FieldDescriptionmin_x,max_xBounds on the X axis.min_y,max_yBounds on the Y axis.min_z,max_zBounds on the Z axis.

Coordinate Syntax:

- "64": Absolute coordinate.
- "spawn": The world spawn coordinate.
- "spawn+100": 100 blocks positive from spawn.
- "spawn-50": 50 blocks negative from spawn.


### Advanced Logic


FieldTypeDefaultDescriptionprobabilityFloat1.0A number between0.0and1.0representing the chance for the replacement to occur (e.g.,0.5= 50%).retrogenBooleantrueIftrue, this rule runs on already generated chunks when they are loaded.player_blocksBooleantrueIftrue, this rule applies instantly when a player places a block.keep_nbtBooleantrueIftrue, this rule retains block NBT when swapping (chest loot, inventories, etc).notObjectnullAn object containing conditions to exclude. If thenotconditions match, the rule is skipped.


### State Filters

Use thestate_propertiesfield to only replace blocks that match specific states (properties).


```
"state_properties": {
  "half": "upper",
  "lit": "true"
}
```

- The key is the property name (e.g.,facing,age,layers).
- The value is the required state as a string.


### Neighbor Filters

Use theneighborsfield to only replace blocks if their neighbors match specific block conditions.


```
"neighbors": {
  "up": "minecraft:air",
  "sides": ["#minecraft:logs", "minecraft:stone"],
  "down": "#minecraft:dirt"
}
```

- Keys (Directions & Direction Keywords):Specific Directions:up(ortop),down(orbottom),north,south,east,west.any: Matches ifat least oneof the 6 neighboring blocks satisfies the condition.all: Matches only ifall 6neighboring blocks satisfy the condition.sidesorhorizontal: Matches ifat least onehorizontal neighbor (north, south, east, west) satisfies the condition.all_sidesorall_horizontal: Matches only ifall 4horizontal neighbors satisfy the condition.
- Values (Block Matching):Single Block ID:"minecraft:air"Block List / Array:["minecraft:air", "minecraft:cave_air"](matches if neighbor is any block in the list)Block Tags:Prefix with#(e.g.,"#minecraft:logs","#c:stones")Wildcards & Patterns:Supports wildcard namespaces (e.g.,"modid:*"or regex pattern matching).

- Specific Directions:up(ortop),down(orbottom),north,south,east,west.
- any: Matches ifat least oneof the 6 neighboring blocks satisfies the condition.
- all: Matches only ifall 6neighboring blocks satisfy the condition.
- sidesorhorizontal: Matches ifat least onehorizontal neighbor (north, south, east, west) satisfies the condition.
- all_sidesorall_horizontal: Matches only ifall 4horizontal neighbors satisfy the condition.

- Single Block ID:"minecraft:air"
- Block List / Array:["minecraft:air", "minecraft:cave_air"](matches if neighbor is any block in the list)
- Block Tags:Prefix with#(e.g.,"#minecraft:logs","#c:stones")
- Wildcards & Patterns:Supports wildcard namespaces (e.g.,"modid:*"or regex pattern matching).


### State Retention

Whenkeep_statesis set totrue(default), the mod attempts to be smart about how it places the new block by copying the block state (properties) from the original block.

How it works:

The mod looks for properties that exist onboththe original block and the replacement block.

- If both blocks share a property definition (e.g.,facing,waterlogged,power,lit), the value is copied over.
- If a property exists on the original but not the replacement (or vice versa), it is simply ignored.

Examples:

- Perfect Match (Stair -> Stair):You replaceoak_stairswithstone_stairs. Both blocks havefacing,half,shape, andwaterlogged. The new stairs will face the exact same way and connect exactly like the old ones.
- Partial Match (Chest -> Furnace):You replace achestwith afurnace. Both blocks have thefacingproperty. The furnace will face the same direction as the chest. However, the chest'stypeproperty (left/right/single) is ignored because furnaces don't have it.
- No Match (Log -> Furnace):You replace anoak_logwith afurnace. Logs use theaxisproperty (x, y, z) for rotation. Furnaces use thefacingproperty (north, south, east, west). Since these properties are different, the furnace will spawn with its default rotation.


---

