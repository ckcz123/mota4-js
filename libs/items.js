function items() {
	
}

items.prototype.init = function() {
	this.items = {
		// 钥匙
		'yellowKey': {'cls': 'key', 'name': '黄钥匙'},
		'blueKey': {'cls': 'key', 'name': '蓝钥匙'},
		'redKey': {'cls': 'key', 'name': '红钥匙'},
		'greenKey': {'cls': 'key', 'name': '绿钥匙'},
		// 宝石、血瓶
        'redJewel': {'cls': 'item', 'name': '红宝石', 'effect': 'atk+'},
		'blueJewel': {'cls': 'item', 'name': '蓝宝石'},
		'greenJewel': {'cls': 'item', 'name': '绿宝石'},
		'yellowJewel': {'cls': 'item', 'name': '黄宝石'},
		'redPotion': {'cls': 'item', 'name': '红血瓶'},
        'bluePotion': {'cls': 'item', 'name': '蓝血瓶'},
        'yellowPotion': {'cls': 'item', 'name': '黄血瓶'},
        'greenPotion': {'cls': 'item', 'name': '绿血瓶'},
		'sword1': {'cls': 'item', 'name': '铁剑'},
        'sword2': {'cls': 'item', 'name': '银剑'},
        'sword3': {'cls': 'item', 'name': '骑士剑'},
        'sword4': {'cls': 'item', 'name': '圣剑'},
        'sword5': {'cls': 'item', 'name': '神圣剑'},
        'shield1': {'cls': 'item', 'name': '铁盾'},
        'shield2': {'cls': 'item', 'name': '银盾'},
        'shield3': {'cls': 'item', 'name': '骑士盾'},
        'shield4': {'cls': 'item', 'name': '圣盾'},
        'shield5': {'cls': 'item', 'name': '神圣盾'},

		// 物品
		'book': {'cls': 'constant', 'name': '怪物手册'},
		'fly': {'cls': 'constant', 'name': '楼层传送器'},

		// 道具
	}
}

items.prototype.getItems = function(itemName) {
	if(itemName == undefined) {
		return this.items;
	}
	return this.items[itemsName];
}

main.instance.items = new items();