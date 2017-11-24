function npcs() {

}

npcs.prototype.init = function () {
    this.npcs = {
        'npc1': {'id': 'npc1', 'name': '木牌1', 'icon': 'wood'},
        'npc2': {'id': 'npc2', 'name': '木牌2', 'icon': 'wood'},
        'npc3': {'id': 'npc3', 'name': '木牌3', 'icon': 'wood'},
        'npc4': {'id': 'npc4', 'name': '木牌4', 'icon': 'wood'},
        'npc5': {'id': 'npc5', 'name': '木牌5', 'icon': 'wood'},
        'npc6': {'id': 'npc6', 'name': '木牌6', 'icon': 'wood'},
        'npc7': {'id': 'npc7', 'name': '木牌7', 'icon': 'wood'},
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
                        'content': '欢迎来到本塔！\n本塔是由艾之葵使用html5编写而成，支持PC/Android/iOS全平台适配，可以在任何支持html5的平台上进行游戏哦！\n下面是本塔的一些注意事项，请仔细阅读。'
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '1. 本塔支持全平台游戏，手机端更是能自动根据分辨率进行适配。\n但是基于游戏性能的考虑，建议Android端使用QQ或微信浏览器打开进行游戏（扫描发布帖中的二维码，并添加到收藏），否则可能会出现卡顿的情况。',
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '2. 本塔有背景音乐，可在菜单栏中关闭音效。\niOS平台下由于某些保护措施，暂不支持音乐的播放。'
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '3. 本塔默认为最高难度10级，此难度下为红海Lv2级别，难度较高，非大佬请谨慎尝试。在菜单栏中可对难度进行降低，一般而言5级为普通，2级为简单，请根据自身拆塔能力自行调节难度级别。'
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '4. 更多的游戏提示在上面的木牌也都有说明，依次阅读即可。'
                    },
                    {
                        'type': 'text', 'id': 'npc1',
                        'content': '如有问题请于发布帖下进行反馈，小艾在此感谢大家的支持！'
                    }
                ];
            }
            break;
        case 'npc2':
            if (times == 0) {
                return [];
            }
            break;
        case 'npc3':
            if (times == 0) {
                return [];
            }
            break;
        case 'npc4':
            if (times == 0) {
                return [];
            }
            break;
        case 'npc5':
            if (times == 0) {
                return [];
            }
            break;
        case 'npc6':
            if (times == 0) {
                return [];
            }
            break;
        case 'npc7':
            if (times == 0) {
                return [];
            }
            break;
    }
    return [];
}

main.instance.npcs = new npcs();