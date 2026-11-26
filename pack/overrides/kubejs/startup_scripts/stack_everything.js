
let DENY = /undying|^neovitae:blood_orb_/
let $Equipable  = Java.loadClass('net.minecraft.world.item.Equipable')
let $BucketItem = Java.loadClass('net.minecraft.world.item.BucketItem')

ItemEvents.modification(event => {
	event.modify('*', mod => {
		let raw = mod.item()
		if (raw.getDefaultMaxStackSize() >= 64) return
			if (DENY.test(String(raw.id)) || raw instanceof $Equipable) return
				if (raw instanceof $BucketItem && !raw.content.isSame(Items.BUCKET.content)) return
					try {
						mod.maxStackSize = 64
					} catch (e) {
						// durability items: vanilla throws "Item cannot have both durability and be stackable"
					}
	})
})
