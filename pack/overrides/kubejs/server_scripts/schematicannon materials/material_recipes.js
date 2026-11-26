// =====================================================================
//  Schematicannon Substitutes — cheap bulk recipes
//
//  Removes every existing recipe that outputs a substitute material
//  (compacting / mixing / mechanical crafting) and replaces them with
//  crushing-wheel + plain crafting recipes that output in bulk.
// =====================================================================

ServerEvents.recipes(event => {
    const SS = 'schematicannon_substitutes';
    const ID = 'arkaneworx:schem_subs';

    // If another mod already has a create:crushing recipe for one of the
    // inputs below, Create picks one arbitrarily. true = remove the
    // competing crushing recipe (only for the exact inputs used here).
    const REMOVE_CRUSHING_CONFLICTS = true;

    // Crushing speed (Create default is ~100-250). Lower = faster.
    const CRUSH_TIME = 50;

    const MATERIALS = [
        'metal_materials',
        'terrain_materials',
        'construction_materials',
        'crystal_materials',
        'industrial_materials',
        'precious_materials'
    ];

    // ---- helpers ---------------------------------------------------------
    // True if a tag ('#c:ingots/tin') or item id resolves to at least one item
    const exists = ing => {
        let n = 0;
        Ingredient.of(ing).getItemIds().forEach(() => n++);
        return n > 0;
    };

    const ingJson = ing => ing.startsWith('#') ? { tag: ing.substring(1) } : { item: ing };

    // results: array of counts — one entry per output stack (keeps each <= 64)
    const crush = (input, material, counts, idSuffix) => {
        if (!exists(input)) {
            console.log(`[schem_subs] skipping ${input} -> ${material} (no items)`);
            return;
        }
        if (REMOVE_CRUSHING_CONFLICTS) {
            event.remove({ type: 'create:crushing', input: input, not: { mod: 'arkaneworx' } });
        }
        event.custom({
            type: 'create:crushing',
            ingredients: [ingJson(input)],
                     processing_time: CRUSH_TIME,
                     results: counts.map(c => ({ id: `${SS}:${material}`, count: c }))
        }).id(`${ID}/crushing/${idSuffix}`);
    };

    // ---- 1. Remove all original substitute recipes -----------------------
    MATERIALS.forEach(m => event.remove({ output: `${SS}:${m}`, not: { mod: 'arkaneworx' } }));

    // ---- 2. METAL — crush ingots (x8) and storage blocks (x72) -----------
    const METALS = [
        'iron', 'copper', 'gold', 'zinc', 'brass',
        // optional — skipped automatically if the tag is empty in the pack
        'tin', 'lead', 'silver', 'nickel', 'aluminum', 'bronze',
        'steel', 'constantan', 'electrum', 'invar', 'osmium', 'uranium'
    ];
    METALS.forEach(metal => {
        crush(`#c:ingots/${metal}`, 'metal_materials', [8], `metal_ingot_${metal}`);
        crush(`#c:storage_blocks/${metal}`, 'metal_materials', [36, 36], `metal_block_${metal}`);
    });

    // ---- 3. PRECIOUS — crush gems / scrap --------------------------------
    crush('#c:gems/diamond', 'precious_materials', [16], 'precious_diamond');
    crush('#c:gems/emerald', 'precious_materials', [16], 'precious_emerald');
    crush('minecraft:netherite_scrap', 'precious_materials', [32], 'precious_netherite_scrap');

    // ---- 4. CRYSTAL — crush shards/quartz + bulk craft -------------------
    crush('#c:gems/amethyst', 'crystal_materials', [8], 'crystal_amethyst');
    crush('#c:gems/quartz', 'crystal_materials', [8], 'crystal_quartz');

    event.shapeless(`32x ${SS}:crystal_materials`, [
        '#c:gems/amethyst', '#c:gems/quartz', 'minecraft:glowstone_dust'
    ]).id(`${ID}/crafting/crystal_materials`);

    // ---- 5. INDUSTRIAL — crush alloy + bulk craft ------------------------
    crush('create:andesite_alloy', 'industrial_materials', [8], 'industrial_andesite_alloy');

    event.shapeless(`32x ${SS}:industrial_materials`, [
        'create:andesite_alloy', 'create:andesite_alloy', '#c:ingots/brass'
    ]).id(`${ID}/crafting/industrial_materials`);

    // ---- 6. TERRAIN — bulk craft -----------------------------------------
    event.shapeless(`32x ${SS}:terrain_materials`, [
        '#c:sands', '#c:gravels', '#minecraft:dirt'
    ]).id(`${ID}/crafting/terrain_materials`);

    // ---- 7. CONSTRUCTION — bulk craft ------------------------------------
    event.shaped(`32x ${SS}:construction_materials`, [
        'LB',
        'BL'
    ], {
        L: '#minecraft:logs',
        B: 'minecraft:stone_bricks'
    }).id(`${ID}/crafting/construction_materials`);

    console.log('[schem_subs] substitute material recipes replaced');
});
