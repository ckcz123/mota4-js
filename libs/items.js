function items() {

}

items.prototype.init = function () {
    this.items = {
        // 钥匙
        'yellowKey': {'cls': 'keys', 'name': '黄钥匙'},
        'blueKey': {'cls': 'keys', 'name': '蓝钥匙'},
        'redKey': {'cls': 'keys', 'name': '红钥匙'},
        'greenKey': {'cls': 'keys', 'name': '绿钥匙'},
        // 宝石、血瓶
        'redJewel': {'cls': 'items', 'name': '红宝石'},
        'blueJewel': {'cls': 'items', 'name': '蓝宝石'},
        'greenJewel': {'cls': 'items', 'name': '绿宝石'},
        'yellowJewel': {'cls': 'items', 'name': '黄宝石'},
        'redPotion': {'cls': 'items', 'name': '红血瓶'},
        'bluePotion': {'cls': 'items', 'name': '蓝血瓶'},
        'yellowPotion': {'cls': 'items', 'name': '黄血瓶'},
        'greenPotion': {'cls': 'items', 'name': '绿血瓶'},
        'sword1': {'cls': 'items', 'name': '铁剑'},
        'sword2': {'cls': 'items', 'name': '银剑'},
        'sword3': {'cls': 'items', 'name': '骑士剑'},
        'sword4': {'cls': 'items', 'name': '圣剑'},
        'sword5': {'cls': 'items', 'name': '神圣剑'},
        'shield1': {'cls': 'items', 'name': '铁盾'},
        'shield2': {'cls': 'items', 'name': '银盾'},
        'shield3': {'cls': 'items', 'name': '骑士盾'},
        'shield4': {'cls': 'items', 'name': '圣盾'},
        'shield5': {'cls': 'items', 'name': '神圣盾'},

        // 物品
        'book': {'cls': 'constants', 'name': '怪物手册'},
        'fly': {'cls': 'constants', 'name': '楼层传送器'},

        // 道具
        'pickaxe': {'cls': 'tools', 'name': '破墙镐'},
        'bomb': {'cls': 'tools', 'name': '炸弹'},
        'centerFly': {'cls': 'tools', 'name': '中心对称飞行器'}
    }
}

items.prototype.getItems = function (itemName) {
    if (itemName == undefined) {
        return this.items;
    }
    return this.items[itemsName];
}

main.instance.items = new items();