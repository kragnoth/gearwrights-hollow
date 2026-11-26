// One line of lore per Escapement-chain item.
ItemEvents.modifyTooltips(event => {
  const lines = {
    'gearwrights:foundry_residue': 'What the Foundry leaves behind. Only those who can see it can gather it.',
    'gearwrights:distilled_residue': 'Gathered by someone who chose to look again.',
    'gearwrights:unwound_movement': 'A Guild movement with nothing driving it yet.',
    'gearwrights:bled_movement': 'Primed with blood. It ticks, faintly, when held.',
    'gearwrights:wound_movement': 'Wound with the void. Take it to the Hollow\'s altar.',
    'gearwrights:escapement': 'It lets the world run without asking anything of it.'
  }
  for (let id in lines) event.add(id, Text.darkGray(lines[id]))
})
