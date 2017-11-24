function enemys() {

}

enemys.prototype.init = function () {
    this.enemys = {
        'greenSlime': {'name': '绿头怪', 'hp': 130, 'atk': 14, 'def': 4, 'money': 1, 'special': 0},
        'redSlime': {'name': '红头怪', 'hp': 156, 'atk': 21, 'def': 5, 'money': 1, 'special': 0},
        'blackSlime': {'name': '青头怪', 'hp': 189, 'atk': 27, 'def': 6, 'money': 3, 'special': 0},
        'slimelord': {'name': '怪王', 'hp': 472, 'atk': 300, 'def': 150, 'money': 35, 'special': 0},
        'bat': {'name': '小蝙蝠', 'hp': 162, 'atk': 25, 'def': 5, 'money': 2, 'special': 0},
        'bigBat': {'name': '大蝙蝠', 'hp': 451, 'atk': 92, 'def': 18, 'money': 12, 'special': 0},
        'redBat': {'name': '红蝙蝠', 'hp': 439, 'atk': 260, 'def': 140, 'money': 30, 'special': 0},
        'vampire': {'name': '冥灵魔王', 'hp': 700, 'atk': 286, 'def': 120, 'money': 27, 'special': 0},
        'skeleton': {'name': '骷髅人', 'hp': 223, 'atk': 44, 'def': 3, 'money': 5, 'special': 0},
        'skeletonSoilder': {'name': '骷髅士兵', 'hp': 343, 'atk': 58, 'def': 10, 'money': 8, 'special': 0},
        'skeletonCaptain': {'name': '骷髅队长', 'hp': 600, 'atk': 110, 'def': 20, 'money': 13, 'special': 0},
        'ghostSkeleton': {'name': '冥队长', 'hp': 836, 'atk': 236, 'def': 81, 'money': 28, 'special': 0},
        'zombie': {'name': '兽面人', 'hp': 646, 'atk': 104, 'def': 52, 'money': 17, 'special': 0},
        'zombieKnight': {'name': '兽面武士', 'hp': 701, 'atk': 202, 'def': 59, 'money': 24, 'special': 0},
        'rock': {'name': '石头人', 'hp': 436, 'atk': 135, 'def': 100, 'money': 20, 'special': 0},
        'slimeMan': {'name': '影子战士', 'hp': 608, 'atk': 134, 'def': 35, 'money': 18, 'special': 0},
        'bluePriest': {'name': '初级法师', 'hp': 150, 'atk': 52, 'def': 0, 'money': 4, 'special': 2},
        'redPriest': {'name': '高级法师', 'hp': 316, 'atk': 125, 'def': 30, 'money': 16, 'special': 2},
        'brownWizard': {'name': '初级巫师', 'hp': 500, 'atk': 358, 'def': 222, 'money': 44, 'special': 2},
        'redWizard': {'name': '高级巫师', 'hp': 1000, 'atk': 100, 'def': 350, 'money': 51, 'special': 2},
        'yellowGuard': {'name': '初级卫兵', 'hp': 444, 'atk': 85, 'def': 24, 'money': 10, 'special': 0},
        'blueGuard': {'name': '中级卫兵', 'hp': 746, 'atk': 160, 'def': 90, 'money': 24, 'special': 0},
        'redGuard': {'name': '高级卫兵', 'hp': 560, 'atk': 280, 'def': 160, 'money': 33, 'special': 0},
        'swordsman': {'name': '双手剑士', 'hp': 580, 'atk': 380, 'def': 0, 'money': 29, 'special': 1},
        'soldier': {'name': '冥战士', 'hp': 888, 'atk': 388, 'def': 88, 'money': 39, 'special': 0},
        'yellowKnight': {'name': '骑士队长', 'hp': 615, 'atk': 603, 'def': 244, 'money': 45, 'special': 0},
        'redKnight': {'name': '金骑士', 'hp': 786, 'atk': 282, 'def': 179, 'money': 38, 'special': 0},
        'darkKnight': {'name': '灵武士', 'hp': 600, 'atk': 575, 'def': 350, 'money': 56, 'special': 0},
        'blackKing': {'name': '黑衣魔王', 'hp': 1356, 'atk': 650, 'def': 356, 'money': 0, 'special': 0},
        'yellowKing': {'name': '黄衣魔王', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'greenKing': {'name': '青衣武士', 'hp': 688, 'atk': 502, 'def': 332, 'money': 53, 'special': 0},
        'blueKnight': {'name': '近卫骑士', 'hp': 400, 'atk': 375, 'def': 350, 'money': 49, 'special': 0},
        'goldSlime': {'name': '黄头怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'poisonSkeleton': {'name': '紫骷髅', 'hp': 550, 'atk': 370, 'def': 250, 'money': 42, 'special': 0},
        'poisonBat': {'name': '紫蝙蝠', 'hp': 743, 'atk': 440, 'def': 304, 'money': 52, 'special': 0},
        'steelRock': {'name': '铁面人', 'hp': 120, 'atk': 270, 'def': 0, 'money': 50, 'special': 3},
        'skeletonPriest': {'name': '骷髅法师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'skeletonKing': {'name': '骷髅王', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'skeletonWizard': {'name': '骷髅巫师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'redSkeletonCaption': {'name': '骷髅武士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'badHero': {'name': '迷失勇者', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'demon': {'name': '魔神武士', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'demonPriest': {'name': '魔神法师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'goldHornSlime': {'name': '金角怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'redKing': {'name': '红衣魔王', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'whiteKing': {'name': '白衣武士', 'hp': 766, 'atk': 544, 'def': 162, 'money': 46, 'special': 0},
        'blackMagician': {'name': '灵法师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'silverSlime': {'name': '银头怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'swordEmperor': {'name': '剑圣', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'whiteHornSlime': {'name': '尖角怪', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'badPrincess': {'name': '痛苦魔女', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'badFairy': {'name': '黑暗仙子', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'grayPriest': {'name': '中级法师', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'redSwordsman': {'name': '剑王', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'whiteGhost': {'name': '白色幽灵', 'hp': 0, 'atk': 0, 'def': 0, 'money': 0, 'special': 0},
        'poisonZombie': {'name': '绿兽人', 'hp': 660, 'atk': 443, 'def': 210, 'money': 43, 'special': 0},
    }
}

enemys.prototype.getEnemys = function (enemyId) {
    if (enemyId == undefined) {
        return this.enemys;
    }
    return this.enemys[enemyId];
}

enemys.prototype.getSpecialText = function (enemyId) {
    if (enemyId == undefined) return "";
    var special = this.enemys[enemyId].special;
    if (special == 1) return "先攻";
    if (special == 2) return "魔攻";
    if (special == 3) return "坚固";
    if (special == 4) return "2连击";
    if (special == 5) return "3连击";
    if (special == 6) return "4连击";
    if (special == 7) return "破甲";
    if (special == 8) return "反击";
    if (special == 9) return "净化";
    return "";
}

main.instance.enemys = new enemys();