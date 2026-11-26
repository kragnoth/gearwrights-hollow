// Fills cross-mod recipe gaps.
// Rhino-safe: no spread, no rest params, no destructuring.
//
// Every recipe is guarded: all listed items must exist (Item.exists) or it is
// skipped with a console warning, so a wrong id never breaks the reload.
//
// Sawmill counts are read from the matching acacia recipe at load time.
// If recipe.json isn't available in your KubeJS version, a warning is logged
// and the sawmill block skips.

ServerEvents.recipes(function (event) {
    function allExist(items) {
        for (var i = 0; i < items.length; i++) {
            if (!Item.exists(items[i])) return false;
        }
        return true;
    }

    // needed: array of item ids that must exist
    function add(json, id, needed) {
        if (!allExist(needed)) {
            console.warn('[gap-fill] skipped ' + id + ': missing item among ' + needed.join(', '));
            return;
        }
        event.custom(json).id(id);
    }

    // ------------------------------------------------ 1. powah -> create:crushing
    // c:ores gap (create:crushing). raw -> uraninite already smelts in powah's own recipes.
    // VERIFY yields against powah's ore loot tables; they are estimates.
    if (Platform.isLoaded('powah') && Platform.isLoaded('create')) {
        var powahOres = [
            { name: 'uraninite_ore_poor', raws: 1 },
            { name: 'uraninite_ore', raws: 2 },
            { name: 'uraninite_ore_dense', raws: 3 },
            { name: 'deepslate_uraninite_ore_poor', raws: 1 },
            { name: 'deepslate_uraninite_ore', raws: 2 },
            { name: 'deepslate_uraninite_ore_dense', raws: 3 }
        ];
        powahOres.forEach(function (o) {
            add({
                type: 'create:crushing',
                ingredients: [{ item: 'powah:' + o.name }],
                processing_time: 400,
                results: [
                    { count: o.raws, id: 'powah:uraninite_raw' },
                    { chance: 0.5, id: 'powah:uraninite_raw' }
                ]
            }, 'kubejs:powah/crushing/' + o.name, ['powah:' + o.name, 'powah:uraninite_raw']);
        });
    }

    // -------------------------------- 2. farmersdelight:cutting (stripped logs)
    // Gap: c:stripped_logs / c:stripped_woods outputs for pale oak and RU wisteria.
    // sappy_maple is left out on purpose: it is a tapping result, not a stripping one.
    if (Platform.isLoaded('farmersdelight')) {
        var strips = [
            { from: 'minecraft:pale_oak_log', to: 'minecraft:stripped_pale_oak_log' },
            { from: 'minecraft:pale_oak_wood', to: 'minecraft:stripped_pale_oak_wood' },
            { from: 'regions_unexplored:wisteria_log', to: 'regions_unexplored:stripped_wisteria_log' },
            { from: 'regions_unexplored:wisteria_wood', to: 'regions_unexplored:stripped_wisteria_wood' }
        ];
        strips.forEach(function (s) {
            add({
                type: 'farmersdelight:cutting',
                ingredients: [{ item: s.from }],
                result: [
                    { item: { count: 1, id: s.to } },
                    { item: { count: 1, id: 'farmersdelight:tree_bark' } }
                ],
                sound: { sound_id: 'minecraft:item.axe.strip' },
                tool: [
                    { type: 'farmersdelight:item_ability', action: 'axe_strip' },
                    { tag: 'minecraft:axes' }
                ]
            }, 'kubejs:farmersdelight/cutting/' + s.to.replace(':', '_'),
                [s.from, s.to, 'farmersdelight:tree_bark']);
        });
    }

    // ------------------------------------------------ 3. woodworks:sawmill
    // Gaps: minecraft:logs / logs_that_burn inputs and wooden_buttons / fences /
    // pressure_plates outputs for pale oak, regions_unexplored and mynethersdelight powdery.
    if (Platform.isLoaded('woodworks')) {
        var counts = {};
        try {
            event.forEachRecipe({ type: 'woodworks:sawmill', mod: 'woodworks' }, function (r) {
                counts[String(r.getId())] = r.json.getAsJsonObject('result').get('count').getAsInt();
            });
        } catch (e) {
            console.warn('[gap-fill] could not read woodworks sawmill templates: ' + e);
        }

        var parts = ['button', 'fence', 'pressure_plate'];

        // logTag null = wood has no logs (powdery)
        var woods = [
            { ns: 'minecraft', wood: 'pale_oak', logTag: 'minecraft:pale_oak_logs', planks: 'minecraft:pale_oak_planks' },
            { ns: 'mynethersdelight', wood: 'powdery', logTag: null, planks: 'mynethersdelight:powdery_planks' }
        ];

        // The 22 RU woods with missing buttons/fences/plates. alpha is excluded:
        // it only has slab/stairs in the dump. ashen/silver_birch were removed by a script on purpose.
        var ruWoods = [
            'baobab', 'blackwood', 'blue_bioshroom', 'brimwood', 'cobalt', 'cypress', 'dead',
            'eucalyptus', 'green_bioshroom', 'joshua', 'kapok', 'larch', 'magnolia', 'maple',
            'palm', 'pine', 'pink_bioshroom', 'redwood', 'socotra', 'willow', 'wisteria',
            'yellow_bioshroom'
        ];
        ruWoods.forEach(function (w) {
            woods.push({
                ns: 'regions_unexplored',
                wood: w,
                logTag: 'regions_unexplored:' + w + '_logs',
                planks: 'regions_unexplored:' + w + '_planks'
            });
        });

        woods.forEach(function (w) {
            parts.forEach(function (part) {
                var out = w.ns + ':' + w.wood + '_' + part;
                var sources = [{ src: 'planks', ingredient: { item: w.planks } }];
                if (w.logTag) sources.push({ src: 'logs', ingredient: { tag: w.logTag } });

                sources.forEach(function (s) {
                    var count = counts['woodworks:acacia_' + part + '_from_acacia_' + s.src + '_sawing'];
                    if (count === undefined) {
                        console.warn('[gap-fill] no acacia template for ' + part + '/' + s.src + ', skipped ' + out);
                        return;
                    }
                    add({
                        type: 'woodworks:sawmill',
                        ingredient: s.ingredient,
                        result: { count: count, id: out }
                    }, 'kubejs:sawmill/' + w.wood + '_' + part + '_from_' + s.src, [out, w.planks]);
                });
            });
        });
    }
});
