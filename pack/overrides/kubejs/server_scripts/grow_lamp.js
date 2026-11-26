// 1. Right-click glass with glowstone dust -> Grow Lamp
// 2. Every second, each lamp boosts crops within RADIUS (until the lamp is broken)

// ---------- config ----------
let LAMP_GLASS     = ['minecraft:glass']             // blocks that can be converted
let LAMP_FUEL      = 'minecraft:glowstone_dust'      // item used to convert
let RADIUS         = 5                               // horizontal radius (circle)
let Y_DOWN         = 3                               // blocks below the lamp to scan
let Y_UP           = 2                               // blocks above the lamp to scan
// Vanilla random-tick rate (randomTickSpeed 3) is ~0.0146 per block per second.
// ACCEL_CHANCE 0.15  ~= 10x natural growth speed. Set to 0 to disable.
let ACCEL_CHANCE   = 0.15
// Bonemeal pulse (separate handler): every BONEMEAL_INTERVAL seconds, with BONEMEAL_PULSE_CHANCE,
// bonemeal BONEMEAL_COUNT random crops in range that can still grow. Set BONEMEAL_PULSE_CHANCE to 0 to disable.
let BONEMEAL_INTERVAL     = 10      // seconds between pulse attempts (lamp ticks once per second)
let BONEMEAL_PULSE_CHANCE = 0.5     // chance a pulse fires when the interval comes up
let BONEMEAL_COUNT        = 1       // crops bonemealed per pulse
// ----------------------------

let RL           = Java.loadClass('net.minecraft.resources.ResourceLocation')
let TagKey       = Java.loadClass('net.minecraft.tags.TagKey')
let Registries   = Java.loadClass('net.minecraft.core.registries.Registries')
let CropBlock    = Java.loadClass('net.minecraft.world.level.block.CropBlock')
let StemBlock    = Java.loadClass('net.minecraft.world.level.block.StemBlock')
let Bonemealable = Java.loadClass('net.minecraft.world.level.block.BonemealableBlock')
let Block        = Java.loadClass('net.minecraft.world.level.block.Block')
let Particles    = Java.loadClass('net.minecraft.core.particles.ParticleTypes')
let SoundEvents  = Java.loadClass('net.minecraft.sounds.SoundEvents')
let SoundSource  = Java.loadClass('net.minecraft.sounds.SoundSource')
let Hand         = Java.loadClass('net.minecraft.world.InteractionHand')
let BoneMealItem = Java.loadClass('net.minecraft.world.item.BoneMealItem')
let Items        = Java.loadClass('net.minecraft.world.item.Items')

let TARGETS = TagKey.create(Registries.BLOCK, RL.parse('kubejs:grow_lamp_targets'))

// Rhino explicit-overload keys (KubeJS's type wrappers make the plain calls ambiguous)
let STATE_IS_TAG = 'is(net.minecraft.tags.TagKey)'
let PLAY_SOUND = 'playSound(net.minecraft.world.entity.player.Player,net.minecraft.core.BlockPos,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)'

// ---------- conversion ----------
BlockEvents.rightClicked(event => {
  if (event.hand != Hand.MAIN_HAND) return
    if (event.item.id != LAMP_FUEL) return
      if (!LAMP_GLASS.includes(String(event.block.id))) return

        let level = event.level, pos = event.block.pos
        event.block.set('kubejs:grow_lamp')
        if (!event.player.isCreative()) event.item.shrink(1)
          // Explicit overload: plain playSound(null, ...) is ambiguous between the Entity and Player versions in Rhino
          level[PLAY_SOUND](null, pos, SoundEvents.AMETHYST_BLOCK_CHIME, SoundSource.BLOCKS, 1.0, 1.2)
          level.sendParticles(Particles.GLOW, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 12, 0.3, 0.3, 0.3, 0.02)
          event.cancel()
})

// ---------- growth: random-tick acceleration ----------
let isTarget = (state, block) =>
state[STATE_IS_TAG](TARGETS) || block instanceof CropBlock || block instanceof StemBlock   // modded CropBlocks work untagged

BlockEvents.blockEntityTick('kubejs:grow_lamp', event => {
  let level = event.level
  let c = event.block.pos
  let rand = level.random
  let r2 = RADIUS * RADIUS

  for (let dx = -RADIUS; dx <= RADIUS; dx++) {
    for (let dz = -RADIUS; dz <= RADIUS; dz++) {
      if (dx * dx + dz * dz > r2) continue
        for (let dy = -Y_DOWN; dy <= Y_UP; dy++) {
          let pos = c.offset(dx, dy, dz)
          let state = level.getBlockState(pos)
          if (state.isAir()) continue
            let block = state.getBlock()
            if (!isTarget(state, block)) continue

              // Acceleration path: an extra vanilla random tick (respects light, farmland, max age)
              if (ACCEL_CHANCE > 0 && state.isRandomlyTicking() && rand.nextFloat() < ACCEL_CHANCE) {
                let beforeId = Block.getId(state)                       // Rhino hides .equals(); compare state ids
                state.randomTick(level, pos, rand)
                if (Block.getId(level.getBlockState(pos)) != beforeId) {
                  level.sendParticles(Particles.HAPPY_VILLAGER, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5, 3, 0.25, 0.2, 0.25, 0)
                }
              }
        }
    }
  }
})

// ---------- growth: random bonemeal pulse (separate handler) ----------
BlockEvents.blockEntityTick('kubejs:grow_lamp', event => {
  if (BONEMEAL_PULSE_CHANCE <= 0) return
    if ((event.tick / 20) % BONEMEAL_INTERVAL != 0) return     // handler runs every 20 ticks
      let level = event.level
      if (level.random.nextFloat() >= BONEMEAL_PULSE_CHANCE) return

        let c = event.block.pos
        let r2 = RADIUS * RADIUS
        let candidates = []

        for (let dx = -RADIUS; dx <= RADIUS; dx++) {
          for (let dz = -RADIUS; dz <= RADIUS; dz++) {
            if (dx * dx + dz * dz > r2) continue
              for (let dy = -Y_DOWN; dy <= Y_UP; dy++) {
                let pos = c.offset(dx, dy, dz)
                let state = level.getBlockState(pos)
                if (state.isAir()) continue
                  let block = state.getBlock()
                  if (!isTarget(state, block) || !(block instanceof Bonemealable)) continue
                    if (!block.isValidBonemealTarget(level, pos, state)) continue   // skips fully grown crops
                      candidates.push(pos)
              }
          }
        }

        for (let i = 0; i < BONEMEAL_COUNT && candidates.length > 0; i++) {
          let idx = Math.floor(Math.random() * candidates.length)
          let pos = candidates.splice(idx, 1)[0]
          // Vanilla/NeoForge path: fires BonemealEvent, then isValid -> isBonemealSuccess -> performBonemeal.
          // Throwaway stack: applyBonemeal shrinks it, nothing is taken from players.
          if (BoneMealItem.applyBonemeal(Items.BONE_MEAL.getDefaultInstance(), level, pos, null)) {
            level.levelEvent(1505, pos, 15)                            // vanilla bonemeal particles + sound
          }
        }
})
