// Procedural ore -> raw -> dust chains for the Crushing Wheels (Create),
// SAG Mill (Ender IO) and Grinding Wheel (Create Enchantment Industry),
// all three keyed off whatever ore tags AlmostUnified is configured to
// unify. Add a new ore mod to AU's unification.json and it appears in
// all three machines here with no KubeJS changes needed.
//
// RHINO NOTE: spread (...) only works in function rest params in this
// build - never in array/object literals or call sites. No ES6 classes,
// no async/await, no import/export (all reserved-but-unimplemented).

// Byproduct rolled into the raw->dust step. Materials without an entry
// here just skip that roll - add lead/nickel/lithium/osmium/tin/uranium/
// aluminum once you've decided what their byproducts should be.
let ORE_BYPRODUCTS = {
    copper: { item: 'minecraft:clay_ball', chance: 0.5 },
    iron:   { item: 'minecraft:redstone',  chance: 0.125 },
    gold:   { item: 'minecraft:quartz',    chance: 0.25 },
    zinc:   { item: 'minecraft:clay_ball', chance: 0.15 },
    silver: { item: 'minecraft:redstone',  chance: 0.25 }
};

ServerEvents.recipes(event => {
    // AlmostUnified.getTags() is a java.util.Set<String>. Array.from()
    // works on it directly (Symbol.iterator is exposed for any Java
    // Iterable in this Rhino fork) - this is the replacement for the
    // [...spread] I mistakenly used last time.
    let auTags = Array.from(AlmostUnified.getTags());
    let oreTags = auTags.filter(t => t.startsWith('c:ores/'));

    console.log(`[ore_processing] AU is tracking ${auTags.length} tags total, ${oreTags.length} of them c:ores/*`);
    console.log(`[ore_processing] ore tags: ${oreTags.join(', ')}`);

    // Track outcomes across the whole run instead of finding out only
    // when something silently stops generating.
    let succeededMaterials = [];
    let skippedMaterials = [];
    let failedMaterials = [];

    oreTags.forEach(oreTag => {
        let material = oreTag.split('/')[1];
        let rawTag  = `c:raw_materials/${material}`;
        let dustTag = `c:dusts/${material}`;
        let gemTag  = `c:gems/${material}`;
        let byproduct = ORE_BYPRODUCTS[material];

        console.log(`[ore_processing] -- ${material}: raw=${auTags.includes(rawTag)} gem=${auTags.includes(gemTag)}`);

        // safeCustom wraps a single event.custom() call so that if THIS
        // recipe's type is unregistered or its JSON fails schema
        // validation, we log exactly which recipe id and type broke and
        // keep going - instead of one bad call killing every material
        // processed after it (see note above main loop).
        function safeCustom(id, json) {
            try {
                event.custom(json).id(id);
                console.log(`[ore_processing]    ok: ${id}`);
                return true;
            } catch (e) {
                console.log(`[ore_processing]    FAILED: ${id} (type=${json.type}) - ${e}`);
                failedMaterials.push(`${material}:${id}`);
                return false;
            }
        }

        if (auTags.includes(rawTag)) {
            // ---- Metal chain: ore -> raw -> dust ------------------------
            let rawTarget  = AlmostUnified.getTagTargetItem(rawTag);
            let dustTarget = AlmostUnified.getTagTargetItem(dustTag);
            console.log(`[ore_processing]    rawTarget=${rawTarget.isEmpty() ? 'EMPTY' : rawTarget.id} dustTarget=${dustTarget.isEmpty() ? 'EMPTY' : dustTarget.id}`);
            if (rawTarget.isEmpty() || dustTarget.isEmpty()) {
                console.log(`[ore_processing]    skipping ${material}: empty target item for ${rawTag} or ${dustTag}`);
                skippedMaterials.push(material);
                return;
            }

            // Create's crushed-raw tier has no per-material tag (confirmed
            // earlier) - it's always the static create:crushed_raw_<material>.
            let crushedId = `create:crushed_raw_${material}`;

            safeCustom(`arkaneworx:crushing/ore_to_raw/${material}`, {
                type: 'create:crushing',
                ingredients: [{ tag: oreTag }],
                processing_time: 400,
                results: withByproduct([
                    { item: { id: rawTarget.id }, count: 2 },
                    { item: { id: rawTarget.id }, count: 1, chance: 0.25 },
                    { item: { id: 'create:experience_nugget' }, count: 1, chance: 0.25 }
                ])
            });

            safeCustom(`arkaneworx:crushing/raw_to_crushed/${material}`, {
                type: 'create:crushing',
                ingredients: [{ tag: rawTag }],
                processing_time: 400,
                results: withByproduct([
                    { item: { id: crushedId }, count: 1 },
                    { item: { id: crushedId }, count: 1, chance: 0.25 },
                    { item: { id: 'create:experience_nugget' }, count: 1, chance: 0.25 }
                ], byproduct)
            });

            safeCustom(`arkaneworx:splashing/crushed_to_dust/${material}`, {
                type: 'create:splashing',
                ingredients: [{ item: crushedId }],
                results: withByproduct([
                    { item: { id: dustTarget.id }, count: 1 },
                    { item: { id: dustTarget.id }, count: 1, chance: 0.25 }
                ], byproduct)
            });

            safeCustom(`arkaneworx:sag_milling/ore_to_raw/${material}`, {
                type: 'enderio:sag_milling',
                input: { tag: oreTag },
                outputs: sagOutputs([
                    { id: rawTarget.id, count: 2 },
                    { id: rawTarget.id, count: 1, chance: 0.25 },
                    { id: 'create:experience_nugget', count: 1, chance: 0.25 }
                ]),
                energy: 3200
            });

            safeCustom(`arkaneworx:sag_milling/raw_to_dust/${material}`, {
                type: 'enderio:sag_milling',
                input: { tag: rawTag },
                outputs: sagOutputs([
                    { id: dustTarget.id, count: 1 },
                    { id: dustTarget.id, count: 1, chance: 0.25 }
                ], byproduct),
                energy: 2400
            });

            safeCustom(`arkaneworx:grinding/ore_to_raw/${material}`, {
                type: 'create_enchantment_industry:grinding',
                ingredients: [{ tag: oreTag }],
                results: grindingResults([
                    { id: rawTarget.id, count: 2 },
                    { id: rawTarget.id, count: 1, chance: 0.25 }
                ])
            });

            safeCustom(`arkaneworx:grinding/raw_to_dust/${material}`, {
                type: 'create_enchantment_industry:grinding',
                ingredients: [{ tag: rawTag }],
                results: grindingResults([
                    { id: dustTarget.id, count: 1 },
                    { id: dustTarget.id, count: 1, chance: 0.25 }
                ], byproduct)
            });

            succeededMaterials.push(material);

        } else if (auTags.includes(gemTag)) {
            // ---- Gem chain: ore -> gem directly (diamond, emerald, ...) -
            let gemTarget = AlmostUnified.getTagTargetItem(gemTag);
            console.log(`[ore_processing]    gemTarget=${gemTarget.isEmpty() ? 'EMPTY' : gemTarget.id}`);
            if (gemTarget.isEmpty()) {
                console.log(`[ore_processing]    skipping ${material}: empty target item for ${gemTag}`);
                skippedMaterials.push(material);
                return;
            }

            safeCustom(`arkaneworx:crushing/ore_to_gem/${material}`, {
                type: 'create:crushing',
                ingredients: [{ tag: oreTag }],
                processing_time: 400,
                results: withByproduct([
                    { item: { id: gemTarget.id }, count: 2 },
                    { item: { id: gemTarget.id }, count: 1, chance: 0.5 },
                    { item: { id: 'create:experience_nugget' }, count: 1, chance: 0.5 }
                ])
            });

            safeCustom(`arkaneworx:sag_milling/ore_to_gem/${material}`, {
                type: 'enderio:sag_milling',
                input: { tag: oreTag },
                outputs: sagOutputs([
                    { id: gemTarget.id, count: 2 },
                    { id: gemTarget.id, count: 1, chance: 0.5 },
                    { id: 'create:experience_nugget', count: 1, chance: 0.5 }
                ]),
                energy: 3200
            });

            safeCustom(`arkaneworx:grinding/ore_to_gem/${material}`, {
                type: 'create_enchantment_industry:grinding',
                ingredients: [{ tag: oreTag }],
                results: grindingResults([
                    { id: gemTarget.id, count: 2 },
                    { id: gemTarget.id, count: 1, chance: 0.5 }
                ])
            });

            succeededMaterials.push(material);

        } else {
            // Neither a raw tier nor a gem tag configured in AU for this ore -
            // nothing to generate procedurally; add a manual recipe if needed.
            console.log(`[ore_processing]    skipping ${material}: no raw_materials or gems tag tracked by AU`);
            skippedMaterials.push(material);
        }
    });

    console.log(`[ore_processing] DONE. processed=${succeededMaterials.length} (${succeededMaterials.join(', ')}) skipped=${skippedMaterials.length} (${skippedMaterials.join(', ')}) failed_recipes=${failedMaterials.length} (${failedMaterials.join(', ')})`);
});

// ---- result-shape helpers, one per recipe type's schema -------------------
// (No object spread here on purpose - Rhino doesn't support it. Build the
// array with .concat()/.push() instead.)

function withByproduct(results, byproduct) {
    if (!byproduct) return results;
    return results.concat([{ item: { id: byproduct.item }, count: 1, chance: byproduct.chance }]);
}

function sagOutputs(entries, byproduct) {
    let outputs = entries.map(e => {
        let out = { item: { id: e.id, count: e.count } };
        if (e.chance !== undefined) out.chance = e.chance;
        return out;
    });
    if (byproduct) outputs.push({ item: { id: byproduct.item, count: 1 }, chance: byproduct.chance });
    return outputs;
}

function grindingResults(entries, byproduct) {
    let results = entries.map(e => {
        let r = { item: { id: e.id }, count: e.count };
        if (e.chance !== undefined) r.chance = e.chance;
        return r;
    });
    if (byproduct) results.push({ item: { id: byproduct.item }, count: 1, chance: byproduct.chance });
    results.push({ id: 'create_enchantment_industry:experience', amount: 1 });
    return results;
}
