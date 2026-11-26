ServerEvents.tags('block', event => {
  event.add('ae2:growth_acceleratable', 'minecraft:pointed_dripstone')
})

ServerEvents.tags('item', event => {
  event.add('minecraft:pickaxes', [
                                    'paxels:wooden_paxel',
                                    'paxels:stone_paxel',
                                    'paxels:iron_paxel',
                                    'paxels:golden_paxel',
                                    'paxels:diamond_paxel',
                                    'paxels:netherite_paxel'
                                  ]);

  event.add('c:tools/swords', '@simplyswords')
  event.add('c:tools', '@simplyswords')
  // RC1 audit: removed - 8 of its 9 tag references don't exist (incl. typo 'c:armor/chestplats'); a missing required
  // reference makes the whole c:armors tag fail to load. Mods already fill c:armors (13 entries).
  event.add('c:tools/shears', '@not_enough_shears')
});
