ServerEvents.recipes(event => {
    // ---- Static / Manual Removals ----------------------------------------
    event.remove({ id: 'create:crafting/kinetics/mechanical_crafter' });
    event.remove({ id: 'create:crafting/kinetics/mechanical_press' });
    event.remove({ id: 'create:crushing/blaze_rod' });

    // Extruder removals
    event.remove({ id: 'create_mechanical_extruder:extruding/asurine' });
    event.remove({ id: 'create_mechanical_extruder:extruding/crimsite' });
    event.remove({ id: 'create_mechanical_extruder:extruding/ochrum' });
    event.remove({ id: 'create_mechanical_extruder:extruding/veridium' });

    // ---- Procedural overlap removal --------------------------------------
    const PROCESSING_TYPES = [
        'create:crushing',
        'create:milling',
        'create:splashing',
        'enderio:sag_milling',
        'create_enchantment_industry:grinding',
        'immersiveengineering:crusher',
        'thermal:pulverizer'
    ];

    // Safely grab AU tags as pure JS strings to avoid Java interop bugs
    const auTags = [];
    AlmostUnified.getTags().forEach(tag => auTags.push(tag.toString()));

    const oreTags = auTags.filter(t => t.startsWith('c:ores/'));

    console.log(`[removals] checking ${oreTags.length} AU ore tags for pre-existing recipes to clear`);

    oreTags.forEach(oreTag => {
        const material = oreTag.split('/')[1];
        const rawTag  = `c:raw_materials/${material}`;
        const gemTag  = `c:gems/${material}`;
        const crushedTag = `c:crushed_ores/${material}`; // Catch-all for crushed variants

        const hasRaw = auTags.includes(rawTag);
        const hasGem = auTags.includes(gemTag);

        if (!hasRaw && !hasGem) return; // Nothing procedural generated for this

        // 1. FORMAT TAGS FOR KUBEJS (Requires '#' prefix)
        const kjsOreTag = `#${oreTag}`;
        const kjsRawTag = `#${rawTag}`;
        const kjsCrushedTag = `#${crushedTag}`;

        // 2. GATHER SPECIFIC ITEMS TO CATCH STUBBORN MODS
        // Fix: Initialize a pure JS array to avoid Java fixed-length array crashes
        let itemsToWipe = [];

        // Safely extract item IDs as strings and push them to the JS array
        Ingredient.of(kjsOreTag).getItemIds().forEach(id => itemsToWipe.push(id.toString()));

        if (hasRaw) {
            Ingredient.of(kjsRawTag).getItemIds().forEach(id => itemsToWipe.push(id.toString()));
        }

        // Add common crushed/dust variants for splashing/washing
        const crushedRawId = `create:crushed_raw_${material}`;
        if (Item.exists(crushedRawId)) {
            itemsToWipe.push(crushedRawId);
        }

        // Include the crushed tag items if it exists in AU
        if (auTags.includes(crushedTag)) {
            Ingredient.of(kjsCrushedTag).getItemIds().forEach(id => itemsToWipe.push(id.toString()));
        }

        // 3. EXECUTE REMOVALS
        PROCESSING_TYPES.forEach(type => {
            // Remove by Tag
            event.remove({ type: type, input: kjsOreTag, not: { mod: 'arkaneworx' } });

            if (hasRaw) {
                event.remove({ type: type, input: kjsRawTag, not: { mod: 'arkaneworx' } });
            }

            // Remove specifically for splashing against the crushed tag
            if (type === 'create:splashing' && auTags.includes(crushedTag)) {
                event.remove({ type: type, input: kjsCrushedTag, not: { mod: 'arkaneworx' } });
            }

            // Remove by specific item ID (The Bulletproof fallback)
            itemsToWipe.forEach(itemId => {
                event.remove({ type: type, input: itemId, not: { mod: 'arkaneworx' } });
            });
        });
    });

    console.log(`[removals] DONE. pre-existing processing recipes cleared.`);
});
