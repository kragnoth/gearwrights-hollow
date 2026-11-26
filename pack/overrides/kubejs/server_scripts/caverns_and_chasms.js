const MOD_ID = 'caverns_and_chasms'

// '' = plain copper, others prefix "copper" per vanilla convention
const stages = ['', 'exposed_', 'weathered_', 'oxidized_']
const pieces = ['helmet', 'chestplate', 'leggings', 'boots', 'sword', 'shovel', 'pickaxe', 'axe', 'hoe']

const filter = [
    { mod: MOD_ID, type: 'minecraft:crafting_shaped' },
{ mod: MOD_ID, type: 'minecraft:crafting_shapeless' },
]

// Standard metal materials mapping block tags -> ingot tags
const ingotMaterials = [
    'iron',
'gold',
'copper',
'netherite',
'exposed_copper',
'weathered_copper',
'oxidized_copper'
]

// Standard raw materials mapping raw block tags -> raw material tags
const rawMaterials = ['iron', 'gold', 'copper', 'silver', 'tin']

ServerEvents.recipes(event => {

    // --- 1. Replace block tags with ingot tags ---
    ingotMaterials.forEach(material => {
        event.replaceInput(filter, `#c:storage_blocks/${material}`, `#c:ingots/${material}`)
    })

    // --- 2. Explicit direct item replacement fallback for vanilla copper blocks ---
    stages.forEach(stage => {
        // Handle vanilla naming quirk: base block is 'copper_block', oxidized are '[stage]copper'
        let blockItem = stage === '' ? 'minecraft:copper_block' : `minecraft:${stage}copper`

        event.replaceInput(filter, blockItem, '#c:ingots/copper')
    })

    // --- 3. Replace raw storage block tags with raw material tags ---
    rawMaterials.forEach(material => {
        event.replaceInput(filter, `#c:storage_blocks/raw_${material}`, `#c:raw_materials/${material}`)
    })

    // --- 4. Re-register waxed copper variant recipes ---
    stages.forEach(stage => {
        pieces.forEach(piece => {
            let base = `${MOD_ID}:${stage}copper_${piece}`
            let waxed = `${MOD_ID}:waxed_${stage}copper_${piece}`

            // Remove whatever recipe currently produces the waxed variant
            event.remove({ output: waxed })

            // Re-add as shapeless: honeycomb + non-waxed variant
            event.shapeless(waxed, ['minecraft:honeycomb', base])
        })
    })

})
