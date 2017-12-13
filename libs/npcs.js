function npcs() {

}

npcs.prototype.init = function () {
    this.npcs = {
        'npc1': {'id': 'npc1', 'name': '一个木牌', 'icon': 'wood'},
        'npc2': {'id': 'npc2', 'name': '一个木牌', 'icon': 'wood'},
        'npc3': {'id': 'npc3', 'name': '一个木牌', 'icon': 'wood'},
        'npc4': {'id': 'npc4', 'name': '一个木牌', 'icon': 'wood'},
        'npc5': {'id': 'npc5', 'name': '一个木牌', 'icon': 'wood'},
        'npc6': {'id': 'npc6', 'name': '一个木牌', 'icon': 'wood'},
        'npc7': {'id': 'npc7', 'name': '一个木牌', 'icon': 'wood'},
    }
}

npcs.prototype.getNpcs = function (npcId) {
    if (npcId == undefined) return this.npcs;
    return this.npcs[npcId];
}

npcs.prototype.getEffect = function (npcid, times) {
    switch (npcid) {
        case 'npc1':
            if (times == 0) {
                return [
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '欢迎来到《20层的试炼》html5复刻版！\n\n本塔是由 艾之葵 使用html5+js编写而成，\nPC/Android/iOS全平台适配，可在任何设\n备上进行游戏哦！\n\n下面是本塔的一些注意事项，请仔细阅读。'
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '1. 本塔支持全平台游戏，手机端更是能自动\n根据分辨率进行适配，达到较好的游戏体验。\n\n但是，基于游戏性能的考虑，建议Android端\n使用QQ或微信浏览器进行游戏，系统自带的\n浏览器可能会出现卡顿等情况。\n（推荐：扫描发布帖的二维码并添加到收藏）',
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '2. 本塔有背景音乐，可在菜单栏中关闭音效。\niOS平台下由于系统的某些保护措施，暂不支\n持音乐的播放。'
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '3. 本塔默认为最高难度5级。\n\n在菜单栏中可以对难度进行降低，请根据自\n身拆塔能力自行调节难度级别。'
                    },
                    {
                        'type':'text', 'id':'npc1',
                        'content': "下面是魔塔的一些介绍，有经验者可忽略。\n1. 魔塔为回合制游戏，每回合你对怪物造成\n（你的攻击-怪物防御）数值的伤害，然后怪\n物对你造成（怪物攻击-你的防御）的伤害。\n重复这一过程直到怪物死亡。\n2. 你的魔防为最终减伤值，即怪物需要先至\n少造成你的魔防数值的伤害，才能实际扣减\n你的生命值。\n3. 先攻：战斗前怪物攻击你一次。魔攻：你\n的防御视为0。坚固：怪物防御是你的攻击-1。\n4. 红宝石加攻击，蓝宝石加防御，绿宝石加\n魔防。你也可以在商店提升能力。\n5. 左边的怪物手册可以让你看到每个怪物的\n属性；楼传器可让你在到过的楼层之间往来。"
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '如有问题请于发布帖下进行反馈，小艾在此\n感谢大家的支持！\n\n祝大家游戏愉快~'
                    }
                ];
            }
            break;
        case 'npc2':
            if (times == 0) {
                return [
                    {
                        'type': 'text', 'id': 'npc2',
                        'content': '本塔共有两个商店，3F和12F。\n\n商店开启后可在菜单栏中快捷使用。'
                    },
                ];
            }
            break;
        case 'npc3':
            if (times == 0) {
                return [
                    {
                        'type': 'text', 'id': 'npc3',
                        'content': '注意蓝钥匙的转换，这是本区域的难点所在。'
                    }
                ];
            }
            break;
        case 'npc4':
            if (times == 0) {
                return [
                    {
                        'type': 'text', 'id': 'npc4',
                        'content': '恭喜来到了三区！本区域怪物伤害较高，请\n尽快开启12F的商店。'
                    }
                ];
            }
            break;
        case 'npc5':
            if (times == 0) {
                return [
                    {
                        'type': 'text', 'id': 'npc5',
                        'content': '13-15F存在三条完全不同的路线，它们差距\n不大且都能打掉本区域的Boss，你能分别通\n关这三条路线吗？'
                    }
                ];
            }
            break;
        case 'npc6':
            if (times == 0) {
                return [
                    {
                        'type': 'text', 'id': 'npc6',
                        'content': '最后一个区了，加油！'
                    }
                ];
            }
            break;
        case 'npc7':
            if (times == 0) {
                return [
                    {
                        'type': 'text', 'id': 'npc7',
                        'content': '下面的神圣剑和神圣盾你只能选择一个。\n\n不管拿哪个都是可以通关的，你能分别通关\n剑路线和盾路线吗？'
                    }
                ];
            }
            break;
    }
    return [];
}

main.instance.npcs = new npcs();
