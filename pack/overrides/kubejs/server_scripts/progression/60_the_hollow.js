// The Hollow (dying_world:the_hollow) - the finale.
// Right-click the altar (reinforced deepslate on the dais) with a Gearwright's Seal, inside the Hollow, to bring down your
// doppelganger (Mob Rules 0.7+). The seal is spent. A second copy can't be called while one is alive within 64 blocks.
// Its death gives its owner (and whoever landed the kill) the 'gh_hollow_defeated' stage, which completes 'What They Opened'.

const $Registries = Java.loadClass('net.minecraft.core.registries.Registries')
const $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

const HOLLOW_KEY = $ResourceKey.create($Registries.STRUCTURE, $ResourceLocation.parse('dying_world:the_hollow'))
const HOLLOW_TAG = 'gh_hollow'
const HOLLOW_STAGE = 'gh_hollow_defeated'

function insideHollow(level, pos) {
  try {
    // getOrThrow(ResourceKey) has a single overload; Registry.get(...) is ambiguous to Rhino (ResourceKey vs ResourceLocation)
    // `let`, not `const`: Rhino 2101 throws "redeclaration of var" for a const inside a try block
    let structure =level.registryAccess().registryOrThrow($Registries.STRUCTURE).getOrThrow(HOLLOW_KEY)
    // getStructureWithPieceAt has 4 overloads (Structure/TagKey/HolderSet/Predicate) that Rhino can't choose between;
    // getStructureAt and structureHasPieceAt each have one, and together give the same piece-level check
    let manager = level.structureManager()
    let start = manager.getStructureAt(pos, structure)
    return start.isValid() && manager.structureHasPieceAt(pos, start)
  } catch (e) {
    console.error(`[the_hollow] structure check failed: ${e}`)
    return false
  }
}

// The altar's own shape also counts - reinforced deepslate (unobtainable in survival) with candles on the four
// diagonal corners two blocks out, as the Hollow builds it. Works even if the structure lookup can't see the piece.
function altarShape(block) {
  for (let d of [[-2, -2], [2, -2], [-2, 2], [2, 2]]) {
    if (String(block.offset(d[0], 0, d[1]).id).indexOf('candle') < 0) return false
  }
  return true
}

// The Hollow state (tier, held/released, days held, Escapements made) lives in kskills_perks; this script only asks it,
// through /kskills hollow ... (each command returns a number). The mod mirrors the state to the tags used here.
// server.runCommandSilent returns nothing in KubeJS 2101, so commands whose result we read go through Brigadier
// directly, which returns the command's number (0 when it fails or doesn't parse).
function cmdResult(server, command) {
  try {
    return server.getCommands().getDispatcher().execute(command, server.createCommandSourceStack().withSuppressedOutput())
  } catch (e) {
    // a failing command (e.g. "execute if" with no match) throws CommandSyntaxException: that is a 0. Anything else is a bug.
    if (String(e).indexOf('CommandSyntaxException') < 0) console.warn(`[the_hollow] command failed: ${command}: ${e}`)
    return 0
  }
}

function hollowCmd(player, args) {
  return cmdResult(player.server, `kskills hollow ${args.replace('%p', player.username)}`)
}

// The altar also takes a Wound Movement (-> Escapement) and, for released players looking through the lens,
// a Seal calls an ECHO: a stronger copy (Mob Rules rule the_hollow_echo) that drops more residue and Hallmarked gear.
const ECHO_TAG = 'gh_hollow_echo'
const DISTILLED_STEP = 4, DISTILLED_CAP = 32        // Escapement n after release costs min(32, 4n) Distilled Residue
const FIRST_ESCAPE = 'gh_first_escape'

function altarBusy(server, dim, ax, ay, az) {
  for (let t of [HOLLOW_TAG, ECHO_TAG]) {
    if (cmdResult(server, `execute in ${dim} positioned ${ax} ${ay} ${az} if entity @e[type=mobrules:doppelganger,tag=${t},distance=..64]`) > 0) return true
  }
  return false
}

// KubeJS 2101: event.cancel() throws to stop the handler immediately, so it must be the very last thing done.
// handleAltar does the work and says whether the click was the altar's; only then is the click cancelled.
BlockEvents.rightClicked('minecraft:reinforced_deepslate', event => {
  if (handleAltar(event)) event.cancel()
})

function handleAltar(event) {
  const { player, block, level, server } = event
  if (String(event.hand) != 'MAIN_HAND') return false
  const held = String(event.item.id)
  if (held != 'hallmarked:gearwrights_seal' && held != 'gearwrights:wound_movement' && held != 'gearwrights:escapement') return false
  if (!altarShape(block) && !insideHollow(level, block.pos)) {
    player.tell(Text.of('Nothing answers. This is not the Hollow\'s altar.').darkGray().italic())
    return false
  }

  const ax = block.x + 0.5, ay = block.y + 1, az = block.z + 0.5
  const dim = String(level.dimension)

  // Release is reversible - offer an Escapement back to be held again (full Hollow Sight, locked-only drops,
  // the Hollowed gear works again). Releasing again later costs a Wound Movement but gives no Escapement (only the first does).
  if (held == 'gearwrights:escapement') {
    if (!player.tags.contains(ESCAPED)) {
      player.tell(Text.of('The Foundry already holds you.').darkPurple().italic())
      return true
    }
    if (!player.isCreative()) event.item.shrink(1)
    relockFoundry(player)
    server.runCommandSilent(`execute in ${dim} run playsound minecraft:block.end_portal.spawn hostile @a[distance=..32] ${ax} ${ay} ${az} 0.6 0.4`)
    return true
  }

  if (held == 'gearwrights:wound_movement') {
    if (!player.tags.contains(HOLLOW_STAGE)) {
      player.tell(Text.of('The altar is cold. Something here has to be put down first.').darkPurple().italic())
      return true
    }
    if (player.tags.contains(ESCAPED)) {
      // each Escapement made after release costs more Distilled Residue (4, 8, 12 ... capped)
      const made = hollowCmd(player, 'escapements %p')
      const cost = Math.min(DISTILLED_CAP, DISTILLED_STEP * (made + 1))
      const have = cmdResult(server, `clear ${player.username} gearwrights:distilled_residue 0`)
      if (have < cost) {
        player.tell(Text.of(`It wants ${cost} Distilled Residue as well. Gather it through the lens.`).darkPurple().italic())
        return true
      }
      server.runCommandSilent(`clear ${player.username} gearwrights:distilled_residue ${cost}`)
      if (!player.isCreative()) event.item.shrink(1)
      player.give('gearwrights:escapement')
      hollowCmd(player, 'escapements %p add 1')
      player.tell(Text.of(`The next one will want ${Math.min(DISTILLED_CAP, DISTILLED_STEP * (made + 2))}.`).gray().italic())
    } else {
      if (!player.isCreative()) event.item.shrink(1)
      if (!player.tags.contains(FIRST_ESCAPE)) {
        player.addTag(FIRST_ESCAPE)
        player.give('gearwrights:escapement')
      }
      escapeFoundry(player)
    }
    server.runCommandSilent(`execute in ${dim} run playsound minecraft:block.bell.resonate block @a[distance=..32] ${ax} ${ay} ${az} 1 0.5`)
    return true
  }

  // a seal: the copy (or, for a released player looking through the lens, its echo)
  if (altarBusy(server, dim, ax, ay, az)) {
    player.tell(Text.of('Something already wears your shape down here.').darkPurple().italic())
    return true
  }
  const echo = player.tags.contains(ESCAPED) && player.tags.contains('wv_' + FOUNDRY)
  if (player.tags.contains(ESCAPED) && !echo) {
    player.tell(Text.of('Nothing answers. Look through the lens.').darkPurple().italic())
    return true
  }
  let dx = ax - player.x, dz = az - player.z
  const len = Math.max(0.001, Math.sqrt(dx * dx + dz * dz))
  const sx = ax + dx / len * 8, sz = az + dz / len * 8
  const made = cmdResult(server, `execute in ${dim} run mobrules doppelganger ${player.username} ${sx.toFixed(2)} ${ay} ${sz.toFixed(2)} ${echo ? ECHO_TAG : HOLLOW_TAG}`)
  if (made <= 0) {
    player.tell(Text.of('The seal will not take. (Mob Rules 0.7 or newer is needed for the Hollow.)').red())
    return true
  }
  if (!player.isCreative()) event.item.shrink(1)
  server.runCommandSilent(`execute in ${dim} run playsound minecraft:block.end_portal.spawn hostile @a[distance=..48] ${ax} ${ay} ${az} 0.8 0.6`)
  server.runCommandSilent(`title ${player.username} title {"text":"${echo ? 'An Echo' : 'What They Opened'}","color":"dark_purple"}`)
  server.runCommandSilent(`title ${player.username} subtitle {"text":"${echo ? 'It remembers you' : 'It has been waiting in your shape'}","color":"gray","italic":true}`)
  return true
}

// The reward is the 'Hollowed' capstone node (no connections, cost 0; only this unlocks it)
function grantCapstone(server, player) {
  for (let node of ['hollowed_1', 'hollow_sight_1', 'lens_sight_1'])
    server.runCommandSilent(`puffish_skills skills unlock ${player.username} kskills:skill_tree ${node}`)
}

// Everyone starts locked in the Occult Foundry vision (server forceVision). Killing your copy also locks you per player
// (kept even if the server config changes). The Escapement calls escapeFoundry: Wasteland Vision's 'release' frees the
// player from both locks, and the Foundry Lens (the vision's key item) is then needed to see it again.
const FOUNDRY = 'occult_foundry'
const ESCAPED = 'gh_escaped'

function markDefeated(player) {
  if (!player) return
  const first = hollowCmd(player, 'defeat %p') > 0   // tier 5, held, locked into the vision (first time only)
  player.stages.add(HOLLOW_STAGE)                     // KubeJS stages too, if FTB uses those instead of tags
  grantCapstone(player.server, player)
  if (first && !player.tags.contains(ESCAPED)) {
    for (let piece of ['cowl', 'vestment', 'greaves', 'treads', 'censer'])   // the set's only source
      player.server.runCommandSilent(`execute as ${player.username} run hallmarked sets give hollowed ${piece}`)
    player.tell(Text.of('Hollowed: a new node has opened at the edge of your skill tree.').darkPurple())
    player.tell(Text.of('The Foundry has your shape now. It will not let you look away.').gray().italic())
  }
}

function escapeFoundry(player) {
  if (hollowCmd(player, 'release %p') == 0) return
  if (cmdResult(player.server, `clear ${player.username} wastelandvision:occult_foundry/foundry_lens 0`) == 0)
    player.give('wastelandvision:occult_foundry/foundry_lens')
  player.tell(Text.of('The world goes quiet. Through the lens the Foundry is still there, but it gives you less, and what it gave you goes cold.').gray().italic())
}

// Back into the Foundry's hold (offering an Escapement at the altar)
function relockFoundry(player) {
  hollowCmd(player, 'hold %p')
  player.tell(Text.of('You give it back. The Foundry takes you in again.').darkPurple().italic())
}

// Hollow Sight / Lens Sight: both nodes are unlocked once, with the capstone; kskills_perks switches their
// rewards on and off by tag (wv_occult_foundry from Wasteland Vision, gh_escaped from the altar). Nothing to tick here.
// a respec locks every node; give it back to anyone who has earned it
PlayerEvents.loggedIn(event => {
  if (event.player.tags.contains(HOLLOW_STAGE)) grantCapstone(event.server, event.player)
})

EntityEvents.death('mobrules:doppelganger', event => {
  const entity = event.entity
  const echo = entity.tags.contains(ECHO_TAG)
  if (!echo && !entity.tags.contains(HOLLOW_TAG)) return
  const killer = event.source.player
  const drop = (id, n) => entity.block.popItem(Item.of(id, n))
  if (echo) {
    drop('gearwrights:foundry_residue', 12)
    drop('gearwrights:distilled_residue', 4 + Math.floor(Math.random() * 3))
    if (killer) event.server.runCommandSilent(`hallmarked generate for ${killer.username} 2`)
    return
  }
  drop('gearwrights:foundry_residue', 8)
  const ownerId = entity.getOwnerUUID()
  const owner = ownerId == null ? null : event.server.playerList.getPlayer(ownerId)
  markDefeated(owner)
  if (killer && (!owner || killer.uuid != owner.uuid)) markDefeated(killer)
})
