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
        'book': {'cls': 'constants', 'name': '怪物手册', 'text': '可以查看当前楼层各怪物属性。'},
        'fly': {'cls': 'constants', 'name': '楼层传送器', 'text': '可以自由往来去过的楼层。'},
        'coin': {'cls': 'constants', 'name': '幸运金币', 'text': '持有时打败怪物可得双倍金币'},
        'snow': {'cls': 'constants', 'name': '冰冻徽章', 'text': '可以将面前的一块熔岩变成平地'},
        'cross': {'cls': 'constants', 'name': '十字架', 'text': '持有后无视怪物的无敌属性'},

        // 道具
        'pickaxe': {'cls': 'tools', 'name': '破墙镐', 'text': '可以破坏勇士面前的一堵墙。'},
        'icePickaxe': {'cls': 'tools', 'name': '破冰稿', 'text': '可以破坏勇士面前的一堵冰墙。'},
        'bomb': {'cls': 'tools', 'name': '炸弹', 'text': '可以炸掉勇士四周的怪物。'},
        'centerFly': {'cls': 'tools', 'name': '中心对称飞行器', 'text': '可以飞向当前楼层中心对称的位置。'},
        'upFly': {'cls': 'tools', 'name': '上楼器', 'text': '可以飞往楼上的相同位置。'},
        'downFly': {'cls': 'tools', 'name': '下楼器', 'text': '可以飞往楼下的相同位置。'}
    }
}

items.prototype.getItems = function (itemName) {
    if (itemName == undefined) {
        return this.items;
    }
    return this.items[itemsName];
}

main.instance.items = new items();