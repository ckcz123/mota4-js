/**
 * 初始化 start
 */

function core() {
    this.dom = {};
    this.statusBar = {};
    this.canvas = {};
    this.images = [];
    this.sounds = {};
    this.firstData = {};
    this.material = {
        'images': {},
        'sounds': {},
        'ground': null,
        'items': {},
        'enemys': {},
        'icons': {},
        'events': {},
        'npcs': {}
    }
    this.timeout = {
        'getItemTipTimeout': null
    }
    this.interval = {
        'twoAnimate': null,
        'fourAnimate': null,
        'boxAnimate': null,
        'heroMoveTriggerInterval': null,
        'heroMoveInterval': null,
        'heroAutoMoveScan': null,
        "tipAnimate": null,
        'openDoorAnimate': null
    }
    this.musicStatus = {
        'isIOS': false,
        'loaded': false,
        'bgmStatus': false,
        'soundStatus': true,
        'playedSound': null,
        'playedBgm': null,
    }
    this.initStatus = {
        'played': false,

        // 勇士属性
        'hero': {
            'id': '',
            'name': '',
            'hp': 0,
            'atk': 0,
            'def': 0,
            'mdef': 0,
            'money': 0,
            'loc': {'direction': 'down', 'x': 0, 'y': 0},
            'flyRange': [],
            'items': [],
        },
        'hard': null,

        // 当前地图
        'floorId': null,
        'thisMap': null,
        'maps': null,

        // 屏幕状态
        'screenMode': 'adaptive',

        // 勇士状态
        'heroMoving': false,
        'heroStop': true,
        'lockControl': false,
        'autoHeroMove': false,
        'automaticRouting': false,
        'automaticRouted': false,
        'autoStep': 0,
        'movedStep': 0,
        'destStep': 0,
        'automaticRoutingTemp': {'destX': 0, 'destY': 0, 'moveStep': []},
        'autoStepRoutes':  [],

        // event事件
        'savePage': null,
        'shops': {},
        'npcs': {},
        'event': {
            'id': null,
            'data': null
        },
        'openingDoor': null,

        // 动画
        'twoAnimateObjs': [],
        'fourAnimateObjs': [],
        'boxAnimateObjs': [],
    };
    this.status = {};
}

core.prototype.init = function (dom, statusBar, canvas, images, sounds, firstData, coreData) {
    core.dom = dom;
    core.statusBar = statusBar;
    core.canvas = canvas;
    core.images = images;
    core.sounds = sounds;
    core.firstData = firstData;
    for (var key in coreData) {
        core[key] = coreData[key];
    }
    core.initStatus.shops = firstData.shops;
    core.initStatus.npcs = firstData.npcs;
    core.dom.versionLabel.innerHTML = firstData.version;
    core.material.items = core.items.getItems();
    // core.status.maps = core.maps.getMaps();
    core.initStatus.maps = core.maps.getMaps();
    core.material.enemys = core.enemys.getEnemys();
    core.material.icons = core.icons.getIcons();
    core.material.events = core.events.getEvents();
    core.material.npcs = core.npcs.getNpcs();

    // test if iOS
    core.musicStatus.soundStatus = core.getLocalStorage('soundStatus', true);
    var userAgent = navigator.userAgent;

    if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
        console.log("你的设备为iphone，不自动播放音乐！");
        core.musicStatus.isIOS = true;
        core.musicStatus.soundStatus = false;
    }

    core.material.ground = new Image();
    core.material.ground.src = "images/ground.png";

    core.loader(function () {
        console.log(core.material);
        core.playGame();
    });
}

core.prototype.showStartAnimate = function (callback) {
    var opacityVal = 1;
    var startAnimate = window.setInterval(function () {
        opacityVal -= 0.03;
        if (opacityVal < 0) {
            clearInterval(startAnimate);
            core.dom.startTop.style.display = 'none';
            core.playGame();
            // core.dom.startButtonGroup.style.display = 'block';
            if (core.isset(callback)) callback();
        }
        core.dom.startTop.style.opacity = opacityVal;
    }, 30);
}

core.prototype.hideStartAnimate = function (callback) {
    var opacityVal = 1;
    var startAnimate = window.setInterval(function () {
        opacityVal -= 0.03;
        if (opacityVal < 0) {
            clearInterval(startAnimate);
            core.dom.startPanel.style.display = 'none';
            callback();
        }
        core.dom.startPanel.style.opacity = opacityVal;
    }, 30);
}

core.prototype.setStartProgressVal = function (val) {
    core.dom.startTopProgress.style.width = val + '%';
}

core.prototype.setStartLoadTipText = function (text) {
    core.dom.startTopLoadTips.innerHTML = text;
}

core.prototype.loader = function (callback) {
    var loadedImageNum = 0, allImageNum = 0, loadSoundNum = 0, allSoundNum = 0;
    allImageNum = core.images.length;
    for (var key in core.sounds) {
        allSoundNum += core.sounds[key].length;
    }
        for (var i = 0; i < core.images.length; i++) {
            core.loadImage(core.images[i], function (imgName, image) {
                core.setStartLoadTipText('正在加载图片 ' + imgName + "...");
                imgName = imgName.split('-');
                imgName = imgName[0];
                core.material.images[imgName] = image;
                loadedImageNum++;
                // core.setStartLoadTipText(imgName + ' 加载完毕...');
                core.setStartProgressVal(loadedImageNum * (100 / allImageNum));
                if (loadedImageNum == allImageNum) {
                    /*
                    if (core.musicStatus.isIOS) {
                        callback();
                        return;
                    }
                    core.setStartLoadTipText('图片资源加载完毕，加载音频中...');
                    core.setStartProgressVal(0);
                    for (var key in core.sounds) {
                        for (var i = 0; i < core.sounds[key].length; i++) {
                            core.setStartLoadTipText('正在加载音频 ' + core.sounds[key][i] + "...")
                            core.loadSound(core.sounds[key][i], key, function (soundName, soundType, sound) {

                                if (!core.isset(sound)) {
                                    alert("加载音频 "+ soundName +" 失败");
                                    core.musicStatus.canPlay = false;
                                    core.musicStatus.soundStatus = false;
                                    callback();
                                }

                                // alert("加载音频 "+soundName+" 成功！");

                                // clearTimeout(core.timeout.loadSoundTimeout);
                                soundName = soundName.split('-');
                                soundName = soundName[0];
                                core.material.sounds[soundType][soundName] = sound;
                                loadSoundNum++;
                                // core.setStartLoadTipText(soundName + ' 加载完毕...');
                                core.setStartProgressVal(loadSoundNum * (100 / allSoundNum));
                                if (loadSoundNum == allSoundNum) {
                                    core.setStartLoadTipText('音乐资源加载完毕');
                                    callback();
                                }
                            });
                        }
                    }
                    */
                    // 加载音频
                    for (var key in core.sounds) {
                        for (var i = 0; i < core.sounds[key].length; i++) {
                            var soundName=core.sounds[key][i];
                            soundName = soundName.split('-');
                            var sound = new Audio();
                            sound.preload = 'none';
                            sound.src = 'sounds/' + soundName[0] + '.' + key;
                            if (soundName[1] == 'loop') {
                                sound.loop = 'loop';
                            }

                            if (!core.isset(core.material.sounds[key]))
                                core.material.sounds[key] = {};
                            core.material.sounds[key][soundName[0]] = sound;
                        }
                    }
                    callback();
                }
            });
    }
}

core.prototype.loadImage = function (imgName, callback) {
    try {
        core.setStartLoadTipText('加载图片 ' + imgName + ' 中...');
        var image = new Image();
        image.src = 'images/' + imgName + '.png';
        if (image.complete) {
            callback(imgName, image);
            return;
        }
        image.onload = function () {
            callback(imgName, image);
        }
    }
    catch (e) {
        alert(e);
    }
}

core.prototype.loadSound = function() {
    if (!core.isset(core.material.sounds.mp3)) return;
    if (core.musicStatus.isIOS) return;
    if (core.musicStatus.loaded) {
        /*
        if (core.musicStatus.bgmStatus>=0) {
            return;
        }
        core.musicStatus.bgmStatus=1;
        if (core.musicStatus.soundStatus)
            core.playBgm('bgm', 'mp3');
            */

        return;
    }
    core.musicStatus.loaded=true;
    console.log("Load Sound!");

    var toLoadList = [];

    // 全部设为静音
    for (var key in core.material.sounds) {
        for (var name in core.material.sounds[key]) {
            toLoadList.push(core.material.sounds[key][name]);
        }
    }
    core.loadSoundItem(toLoadList);
}

core.prototype.loadSoundItem = function (toLoadList) {
    if (toLoadList.length==0) {
        // if (core.musicStatus.bgmStatus==0) core.musicStatus.bgmStatus=-1;
        if (core.musicStatus.bgmStatus>0) return;
        core.musicStatus.bgmStatus=1;
        if (core.musicStatus.soundStatus)
            core.playBgm('bgm', 'mp3');
        return;
    }
    var item = toLoadList.shift();
    item.oncanplay = function() {
        core.loadSoundItem(toLoadList);
    }
    item.load();
}

/*
core.prototype.loadSound = function (soundName, soundType, callback) {
    try {

        soundName = soundName.split('-');
        core.setStartLoadTipText('加载音频 ' + soundName[0] + ' 中...');
        var sound = new Audio('sounds/' + soundName[0] + '.' + soundType);
        // sound.src = 'sounds/' + soundName[0] + '.' + soundType;
        if (soundName[1] == 'loop') {
            sound.loop = 'loop';
        }

        if (!('oncanplaythrough' in document ? true : false)) {
            callback(soundName[0], soundType, sound);
            return;
        }
        sound.oncanplaythrough = function () {
            callback(soundName[0], soundType, sound);
        }
    }
    catch (e) {
        alert(e);
        callback();
    }
}
*/

core.prototype.isPlaying = function() {
    if (core.isset(core.status.played) && core.status.played)
        return true;
    return false;
}

core.prototype.resetStatus = function(hero, hard, floorId, maps) {

    // 停止各个Timeout和Interval
    for (var i in core.interval) {
        clearInterval(core.interval[i]);
    }

    // 初始化status
    core.status = core.clone(core.initStatus);
    core.status.played = true;
    // 初始化maps
    core.status.floorId = floorId;
    core.status.maps = core.clone(maps);
    // 初始化人物属性
    core.status.hero = core.clone(hero);
    core.status.hard = hard;
    // 保存页面
    core.status.savePage = core.getLocalStorage('savePage', 0);

    core.resize(main.dom.body.clientWidth, main.dom.body.clientHeight);

}

core.prototype.playGame = function () {
    if (core.isPlaying()) {
        return;
    }
    core.resetStatus(core.firstData.hero, core.firstData.hard, core.firstData.floorId,
        core.initStatus.maps);

    console.log('开始游戏');

    // core.setFirstItem();
    core.dom.floorNameLabel.innerHTML = core.status.maps[core.status.floorId].title;
    core.statusBar.floor.innerHTML = core.status.maps[core.status.floorId].name;
    core.updateStatusBar();
    core.hideStartAnimate(function () {
        core.playSound('floor', 'mp3');
        core.drawMap(core.status.floorId, function () {
            core.hide(core.dom.floorMsgGroup, 10);
            core.setHeroLoc('direction', core.status.hero.loc.direction);
            core.setHeroLoc('x', core.status.hero.loc.x);
            core.setHeroLoc('y', core.status.hero.loc.y);
            core.drawHero(core.getHeroLoc('direction'), core.getHeroLoc('x'), core.getHeroLoc('y'), 'stop');
            core.setHeroMoveTriggerInterval();
        });
    });
}

core.prototype.restart = function() {
    core.resetStatus(core.firstData.hero, core.firstData.hard, core.firstData.floorId,
        core.initStatus.maps);

    core.changeFloor(core.firstData.floorId, null, core.firstData.hero.loc, function() {
        core.drawTip('重新开始游戏');
        core.setHeroMoveTriggerInterval();
    });
}
/*
core.prototype.keyDown = function(e) {
	if(!core.status.played || core.status.keyBoardLock) {
		return;
	}
	if(core.status.automaticRouting || core.status.automaticRouted) {
		core.stopAutomaticRoute();
	}
	switch(e.keyCode) {
		case 37:
			core.moveHero('left');
		break;
		case 38:
			e.preventDefault();
			core.moveHero('up');
		break;
		case 39:
			core.moveHero('right');
		break;
		case 40:
			e.preventDefault();
			core.moveHero('down');
		break;
		case 81:
			core.setAutoHeroMove([
				{'direction': 'right', 'step': 3},
				{'direction': 'up', 'step': 1},
				{'direction': 'down', 'step': 1},
				{'direction': 'left', 'step': 2},
				{'direction': 'up', 'step': 2}
			]);
		break;
	}
}

core.prototype.keyUp = function(e) {
	if(!core.status.played || e.keyCode == 81) {
		return;
	}
	core.unLockKeyBoard();
	core.stopHero();
}
*/

core.prototype.onclick = function (x, y) {
    // console.log("Click: (" + x + "," + y + ")");

    // 非游戏屏幕内
    if (x<0 || y<0 || x>12 || y>12) return;

    // 寻路
    if (!core.status.lockControl) {
        core.setAutomaticRoute(x, y);
        return;
    }

    // 怪物手册
    if (core.status.event.id == 'book') {
        // 上一页
        if ((x == 3 || x == 4) && y == 12) {
            core.drawEnemyBook(core.status.event.data - 1);
        }
        // 下一页
        if ((x == 8 || x == 9) && y == 12) {
            core.drawEnemyBook(core.status.event.data + 1);
        }
        // 返回
        if (x>=10 && x<=12 && y==12) {
            core.closePanel(true);
        }
        return;
    }

    // 楼层飞行器
    if (core.status.event.id == 'fly') {
        if ((x==10 || x==11) && y==9) core.drawFly(core.status.event.data-1);
        if ((x==10 || x==11) && y==5) core.drawFly(core.status.event.data+1);
        if (x>=5 && x<=7 && y==12) core.closePanel();
        if (x>=0 && x<=9 && y>=3 && y<=11) {
            var index=core.status.hero.flyRange.indexOf(core.status.floorId);
            var stair=core.status.event.data<index?"upFloor":"downFloor";
            var floorId=core.status.event.data;
            core.changeFloor(core.status.hero.flyRange[floorId], stair);
            core.closePanel();
        }
        return;
    }

    // 设置
    if (core.status.event.id == 'settings') {
        if (x >= 5 && x <= 7) {
            if (y == 3) {
                if (core.musicStatus.isIOS) {
                    core.drawTip("iOS设备不支持播放音乐");
                    return;
                }
                core.changeSoundStatus();
                core.openSettings(false);
            }
            if (y == 4) core.selectShop();
            if (y == 5) core.save(false);
            if (y == 6) core.load(false);
            if (y == 7) {
                if (core.status.hard == 0) {
                    core.drawTip("当前已是难度0，不能再降低难度了");
                    return;
                }
                core.showConfirmBox("本次操作可生命+" + (1100 - 100 * core.status.hard) + "，确定吗？", function () {
                    var add = 1100 - 100 * core.status.hard;
                    core.status.hero.hp += add;
                    core.status.hard--;
                    core.updateStatusBar();
                    core.closePanel();
                    core.drawTip("降低难度成功，生命+" + add);
                }, function () {
                    core.openSettings(false);
                });
            }
            if (y == 8) {
                core.showConfirmBox("你确定要重新开始吗？", function () {
                    // core.drawTip("重新开始游戏");
                    core.closePanel();
                    core.restart();
                }, function () {
                    core.openSettings(false);
                });
            }
            if (y == 9) core.closePanel();
            return;
        }
    }

    // 商店
    if (core.status.event.id == 'shop') {
        if (core.status.event.data == null) {
            console.log("发生错误，商店不存在？");
            return;
        }
        if (x >= 5 && x <= 7) {
            if (y >= 5 && y <= 8) {
                if (y >= 5 + core.status.event.data.choices.length) return;

                var hp = core.getStatus('hp'), atk = core.getStatus('atk'),
                    def = core.getStatus('def'), mdef = core.getStatus('mdef'),
                    money = core.getStatus('money'), yellowKey = core.itemCount('yellowKey'),
                    blueKey = core.itemCount('blueKey'), redKey = core.itemCount('redKey');
                var times = core.status.event.data.times, need = eval(core.status.event.data.need);
                if (need > money) {
                    core.drawTip("你的金币不足");
                    return;
                }
                money -= need;
                eval(core.status.event.data.choices[y - 5].effect);
                core.setStatus('hp', hp);
                core.setStatus('atk', atk);
                core.setStatus('def', def);
                core.setStatus('mdef', mdef);
                core.setStatus('money', money);
                core.setItem('yellowKey', yellowKey);
                core.setItem('blueKey', blueKey);
                core.setItem('redKey', redKey);
                core.updateStatusBar();
                core.status.event.data.times++;
                core.openShop(core.status.event.data.id);
                return;
            }

            // 退出商店
            if (y == 9) {
                core.status.event.data = null;
                core.closePanel();
                return;
            }
        }
    }

    // 快捷商店
    if (core.status.event.id == 'selectShop') {
        if (x >= 5 && x <= 7) {

            var shopList = core.status.shops, keys = Object.keys(shopList);
            var topIndex = 6 - parseInt((keys.length + 1) / 2);
            var exitIndex = 6 + parseInt((keys.length + 1) / 2);

            if (y >= topIndex && y - topIndex < keys.length) {
                // core.openShop(keys[y-topIndex]);
                if (!shopList[keys[y - topIndex]].visited) {
                    core.drawTip('该商店尚未开启');
                    return;
                }
                core.openShop(keys[y - topIndex]);
            }
            if (y == exitIndex) {
                core.closePanel();
            }
        }
        return;
    }

    // 工具栏
    if (core.status.event.id == 'toolbox') {

        // 返回
        if (x>=10 && x<=12 && y==12) {
            core.closePanel(false);
            return;
        }

        var itemId = null;
        var items = null;

        if (y>=4 && y<=7 && x!=12)
            items = Object.keys(core.status.hero.items.tools).sort();

        if (y>=9 && y<=12 && x!=12)
            items = Object.keys(core.status.hero.items.constants).sort();

        if (items==null) return;
        var index=0;
        if (y==4||y==5||y==9||y==10) index=parseInt(x/2);
        else index=6+parseInt(x/2);

        if (index>=items.length) return;
        itemId=items[index];

        if (itemId==core.status.event.data) {
            console.log("使用道具："+core.material.items[itemId].name);
            core.closePanel(false);

            if (itemId=='book') {
                core.openBook(false);
                return;
            }
            if (itemId=='fly') {
                core.useFly(false);
                return;
            }

            // TODO add other items

        }
        else {
            core.drawToolbox(itemId);
        }
        return;

    }

    // 存读档
    if (core.status.event.id == 'save' || core.status.event.id == 'load') {
        // 上一页
        if ((x == 3 || x == 4) && y == 12) {
            core.drawSLPanel(core.status.event.data - 1);
        }
        // 下一页
        if ((x == 8 || x == 9) && y == 12) {
            core.drawSLPanel(core.status.event.data + 1);
        }
        // 返回
        if (x>=10 && x<=12 && y==12) {
            core.closePanel(false);
        }

        var index=6*core.status.event.data+1;
        if (y>=1 && y<=4) {
            if (x>=1 && x<=3) core.doSL(index, core.status.event.id);
            if (x>=5 && x<=7) core.doSL(index+1, core.status.event.id);
            if (x>=9 && x<=11) core.doSL(index+2, core.status.event.id);
        }
        if (y>=7 && y<=10) {
            if (x>=1 && x<=3) core.doSL(index+3, core.status.event.id);
            if (x>=5 && x<=7) core.doSL(index+4, core.status.event.id);
            if (x>=9 && x<=11) core.doSL(index+5, core.status.event.id);
        }
        return;
    }

    // 选项
    if (core.status.event.id == 'confirmBox') {
        if ((x == 4 || x == 5) && y == 7 && core.isset(core.status.event.data.yes))
            core.status.event.data.yes();
        if ((x == 7 || x == 8) && y == 7 && core.isset(core.status.event.data.no))
            core.status.event.data.no();
        return;
    }

    // NPC
    if (core.status.event.id == 'npc') {

        var data = core.status.event.data.current;
        if (core.isset(data)) {

            // 对话，任意位置继续
            if (data.type == 'text') {
                core.npcAction();
                return;
            }

        }

    }

}

/**
 * 初始化 end
 */

/**
 * 寻路代码 start
 */

core.prototype.clearAutomaticRouteNode = function (x, y) {
    core.canvas.ui.clearRect(x * 32 + 5, y * 32 + 5, 27, 27);
}

core.prototype.stopAutomaticRoute = function () {
    if (!core.status.played) {
        return;
    }
    core.stopAutoHeroMove();
    core.status.automaticRouting = false;
    core.status.automaticRouted = false;
    core.status.autoStepRoutes = [];
    core.status.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};
    core.canvas.ui.clearRect(0, 0, 416, 416);
}

core.prototype.setAutomaticRoute = function (destX, destY) {
    if (!core.status.played || core.status.lockControl) {
        return;
    }
    else if (core.status.automaticRouting) {
        core.stopAutomaticRoute();
        return;
    }
    if (destX == core.status.hero.loc.x && destY == core.status.hero.loc.y) {
        if (core.status.hero.loc.direction == 'up') core.status.hero.loc.direction = 'right';
        else if (core.status.hero.loc.direction == 'right') core.status.hero.loc.direction = 'down';
        else if (core.status.hero.loc.direction == 'down') core.status.hero.loc.direction = 'left';
        else if (core.status.hero.loc.direction == 'left') core.status.hero.loc.direction = 'up';
        core.drawHero(core.status.hero.loc.direction, core.status.hero.loc.x, core.status.hero.loc.y, 'stop', 0, 0);
        core.status.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};
        core.canvas.ui.clearRect(0, 0, 416, 416);
        return;
    }
    // 直接移动
    /*
    if(core.status.automaticRoutingTemp.moveStep.length != 0 && core.status.automaticRoutingTemp.destX == destX && core.status.automaticRoutingTemp.destY == destY) {
        core.status.automaticRouting = true;
        core.setAutoHeroMove(core.status.automaticRoutingTemp.moveStep);
        core.status.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};
        return;
    }
    */
    var step = 0;
    var tempStep = null;
    var moveStep;
    core.status.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};
    if (!(moveStep = core.automaticRoute(destX, destY))) {
        core.canvas.ui.clearRect(0, 0, 416, 416);
        return false;
    }
    core.status.automaticRoutingTemp.destX = destX;
    core.status.automaticRoutingTemp.destY = destY;
    core.canvas.ui.save();
    core.canvas.ui.clearRect(0, 0, 416, 416);
    core.canvas.ui.fillStyle = '#bfbfbf';
    core.canvas.ui.strokeStyle = '#bfbfbf';
    core.canvas.ui.lineWidth = 8;
    for (var m = 0; m < moveStep.length; m++) {
        if (tempStep == null) {
            step++;
            tempStep = moveStep[m].direction;
        }
        else if (tempStep == moveStep[m].direction) {
            step++;
        }
        else {
            core.status.automaticRoutingTemp.moveStep.push({'direction': tempStep, 'step': step});
            step = 1;
            tempStep = moveStep[m].direction;
        }
        if (m == moveStep.length - 1) {
            core.status.automaticRoutingTemp.moveStep.push({'direction': tempStep, 'step': step});
            core.canvas.ui.fillRect(moveStep[m].x * 32 + 10, moveStep[m].y * 32 + 10, 12, 12);
        }
        else {
            core.canvas.ui.beginPath();
            if (core.isset(moveStep[m + 1]) && tempStep != moveStep[m + 1].direction) {
                if (tempStep == 'up' && moveStep[m + 1].direction == 'left' || tempStep == 'right' && moveStep[m + 1].direction == 'down') {
                    core.canvas.ui.moveTo(moveStep[m].x * 32 + 5, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 27);
                }
                else if (tempStep == 'up' && moveStep[m + 1].direction == 'right' || tempStep == 'left' && moveStep[m + 1].direction == 'down') {
                    core.canvas.ui.moveTo(moveStep[m].x * 32 + 27, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 27);
                }
                else if (tempStep == 'left' && moveStep[m + 1].direction == 'up' || tempStep == 'down' && moveStep[m + 1].direction == 'right') {
                    core.canvas.ui.moveTo(moveStep[m].x * 32 + 27, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 5);
                }
                else if (tempStep == 'right' && moveStep[m + 1].direction == 'up' || tempStep == 'down' && moveStep[m + 1].direction == 'left') {
                    core.canvas.ui.moveTo(moveStep[m].x * 32 + 5, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 5);
                }
                core.canvas.ui.stroke();
                continue;
            }
            switch (tempStep) {
                case 'up':
                case 'down':
                    core.canvas.ui.beginPath();
                    core.canvas.ui.moveTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 5);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 27);
                    core.canvas.ui.stroke();
                    break;
                case 'left':
                case 'right':
                    core.canvas.ui.beginPath();
                    core.canvas.ui.moveTo(moveStep[m].x * 32 + 5, moveStep[m].y * 32 + 16);
                    core.canvas.ui.lineTo(moveStep[m].x * 32 + 27, moveStep[m].y * 32 + 16);
                    core.canvas.ui.stroke();
                    break;
            }
        }
    }
    core.canvas.ui.restore();
    core.status.automaticRouted = true;

    // 立刻移动
    core.status.automaticRouting = true;
    // core.setAutoHeroMove(core.status.automaticRoutingTemp.moveStep);
    core.setAutoHeroMove(core.status.automaticRoutingTemp.moveStep);
    core.status.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};

}
// BFS
core.prototype.automaticRoute = function (destX, destY) {
    var startX = core.getHeroLoc('x');
    var startY = core.getHeroLoc('y');
    var nowX = startX;
    var nowY = startY;
    var scanItem = {'x': 0, 'y': 0};
    var scan = {
        'up': {'x': 0, 'y': -1},
        'left': {'x': -1, 'y': 0},
        'down': {'x': 0, 'y': 1},
        'right': {'x': 1, 'y': 0}
    };
    var queue = [];
    var route = [];
    var ans = []

    if (destX == startX && destY == startY) return false;
    queue.push(13 * startX + startY);
    route[13 * startX + startY] = '';

    while (queue.length != 0) {
        var f = queue.shift();
        var nowX = parseInt(f / 13), nowY = f % 13;

        for (var direction in scan) {
            var nx = nowX + scan[direction].x;
            var ny = nowY + scan[direction].y;
            var nid = 13 * nx + ny;

            if (core.isset(route[nid])) continue;

            if (nx == destX && ny == destY) {
                route[nid] = direction;
                break;
            }
            if (core.terrainExists(nx, ny) || core.noPassExists(nx, ny))
                continue;
            route[nid] = direction;
            queue.push(nid);
        }
        if (core.isset(route[13 * destX + destY])) break;
    }

    if (!core.isset(route[13 * destX + destY])) {
        return false;
    }

    var nowX = destX, nowY = destY;
    while (nowX != startX || nowY != startY) {
        var dir = route[13 * nowX + nowY];
        ans.push({'direction': dir, 'x': nowX, 'y': nowY});
        nowX -= scan[dir].x;
        nowY -= scan[dir].y;
    }

    ans.reverse();
    return ans;
}


/**
 * 寻路代码 end
 */

/**
 * 自动行走 start
 */

core.prototype.stopAutoHeroMove = function () {
    core.status.autoHeroMove = false;
    core.status.automaticRouting = false;
    core.status.automaticRouted = false;
    core.status.autoStep = 0;
    core.status.destStep = 0;
    core.status.movedStep = 0;
    core.status.autoStepRoutes = [];
    core.stopHero();
    clearInterval(core.interval.heroAutoMoveScan);
}

core.prototype.setAutoHeroMove = function (steps, start) {
    if (steps.length == 0) {
        return;
    }
    core.status.autoStepRoutes = steps;
    core.status.autoStep = 0;
    clearInterval(core.interval.heroAutoMoveScan);
    core.interval.heroAutoMoveScan = window.setInterval(function () {
        if (!core.status.autoHeroMove) {
            if (core.status.autoStep == core.status.autoStepRoutes.length) {
                core.stopAutoHeroMove();
                return;
            }
            core.autoHeroMove(core.status.autoStepRoutes[core.status.autoStep].direction, core.status.autoStepRoutes[core.status.autoStep].step);
            core.status.autoStep++;
        }
    }, 80);
}

core.prototype.autoHeroMove = function (direction, step) {
    core.status.autoHeroMove = true;
    core.status.destStep = step;
    core.moveHero(direction);
}

/**
 * 自动行走 end
 */

/**
 * 行走控制 start
 */

core.prototype.setHeroMoveInterval = function (direction, x, y, callback) {
    if (core.status.heroMoving) {
        return;
    }
    core.status.heroMoving = true;
    var moveStep = 0;
    core.interval.heroMoveInterval = window.setInterval(function () {
        switch (direction) {
            case 'up':
                moveStep -= 4;
                if (moveStep == -4 || moveStep == -8 || moveStep == -12 || moveStep == -16) {
                    core.drawHero(direction, x, y, 'leftFoot', 0, moveStep);
                }
                else if (moveStep == -20 || moveStep == -24 || moveStep == -28 || moveStep == -32) {
                    core.drawHero(direction, x, y, 'rightFoot', 0, moveStep);
                }
                if (moveStep == -32) {
                    core.setHeroLoc('y', '--');
                    if (core.status.heroStop) {
                        core.drawHero(direction, x, y - 1, 'stop');
                    }
                    if (core.isset(callback)) {
                        callback();
                    }
                }
                break;
            case 'left':
                moveStep -= 4;
                if (moveStep == -4 || moveStep == -8 || moveStep == -12 || moveStep == -16) {
                    core.drawHero(direction, x, y, 'leftFoot', moveStep);
                }
                else if (moveStep == -20 || moveStep == -24 || moveStep == -28 || moveStep == -32) {
                    core.drawHero(direction, x, y, 'rightFoot', moveStep);
                }
                if (moveStep == -32) {
                    core.setHeroLoc('x', '--');
                    if (core.status.heroStop) {
                        core.drawHero(direction, x - 1, y, 'stop');
                    }
                    if (core.isset(callback)) {
                        callback();
                    }
                }
                break;
            case 'down':
                moveStep+=4;
                if(moveStep == 4 || moveStep == 8 || moveStep == 12 || moveStep == 16) {
                    core.drawHero(direction, x, y, 'leftFoot', 0, moveStep);
                }
                else if(moveStep == 20 || moveStep == 24 ||moveStep == 28 || moveStep == 32) {
                    core.drawHero(direction, x, y, 'rightFoot', 0, moveStep);
                }
                if (moveStep == 32) {
                    core.setHeroLoc('y', '++');
                    if (core.status.heroStop) {
                        core.drawHero(direction, x, y + 1, 'stop');
                    }
                    if (core.isset(callback)) {
                        callback();
                    }
                }
                break;
            case 'right':
                moveStep+=4;
                if(moveStep == 4 || moveStep == 8 || moveStep == 12 || moveStep == 16) {
                    core.drawHero(direction, x, y, 'leftFoot', moveStep);
                }
                else if(moveStep == 20 || moveStep == 24 ||moveStep == 28 || moveStep == 32) {
                    core.drawHero(direction, x, y, 'rightFoot', moveStep);
                }
                if (moveStep == 32) {
                    core.setHeroLoc('x', '++');
                    if (core.status.heroStop) {
                        core.drawHero(direction, x + 1, y, 'stop');
                    }
                    if (core.isset(callback)) {
                        callback();
                    }
                }
                break;
        }
    }, 16.7);
}

core.prototype.setHeroMoveTriggerInterval = function () {
    var direction, x, y;
    var scan = {
        'up': {'x': 0, 'y': -1},
        'left': {'x': -1, 'y': 0},
        'down': {'x': 0, 'y': 1},
        'right': {'x': 1, 'y': 0}
    };
    core.interval.heroMoveTriggerInterval = window.setInterval(function () {
        if (!core.status.heroStop) {
            direction = core.getHeroLoc('direction');
            x = core.getHeroLoc('x');
            y = core.getHeroLoc('y');
            var noPass;
            noPass = core.noPass(x + scan[direction].x, y + scan[direction].y);
            if (noPass) {
                core.trigger(x + scan[direction].x, y + scan[direction].y);
                core.drawHero(direction, x, y, 'stop');
                if (core.status.autoHeroMove) {
                    core.status.movedStep++;
                    if (core.status.destStep == core.status.movedStep) {
                        core.status.autoHeroMove = false;
                        core.status.destStep = 0;
                        core.status.movedStep = 0;
                        core.stopHero();
                    }
                }
                else {
                    core.status.heroStop = true;
                }
                return;
            }
            core.setHeroMoveInterval(direction, x, y, function () {
                if (core.status.autoHeroMove) {
                    core.status.movedStep++;
                    if (core.status.destStep == core.status.movedStep) {
                        core.status.autoHeroMove = false;
                        core.status.destStep = 0;
                        core.status.movedStep = 0;
                        core.stopHero();
                        core.drawHero(core.getHeroLoc('direction'), core.getHeroLoc('x'), core.getHeroLoc('y'), 'stop');
                    }
                }
                else if (core.status.heroStop) {
                    core.drawHero(core.getHeroLoc('direction'), core.getHeroLoc('x'), core.getHeroLoc('y'), 'stop');
                }
                core.trigger(core.getHeroLoc('x'), core.getHeroLoc('y'));
                clearInterval(core.interval.heroMoveInterval);
                core.status.heroMoving = false;
            });
        }
    }, 50);
}

core.prototype.moveHero = function (direction) {
    var heroIcon = core.material.icons.heros[core.status.hero.id][direction];
    core.setHeroLoc('direction', direction);
    core.status.heroStop = false;
}

core.prototype.stopHero = function () {
    core.status.heroStop = true;
}

core.prototype.drawHero = function (direction, x, y, status, offsetX, offsetY) {
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    core.clearAutomaticRouteNode(x, y);
    var heroIcon = core.material.icons.heros[core.status.hero.id][direction];
    x = x * heroIcon.size;
    y = y * heroIcon.size;
    core.canvas.hero.clearRect(x - 32, y - 32, 96, 96);
    core.canvas.hero.drawImage(core.material.images.heros, heroIcon.loc[status] * heroIcon.size, heroIcon.loc.iconLoc * heroIcon.size, heroIcon.size, heroIcon.size, x + offsetX, y + offsetY, heroIcon.size, heroIcon.size);
}

/**
 * 行走控制 end
 */

/**
 * 地图处理 start
 */

core.prototype.openDoor = function (id, x, y, needKey) {
    // 是否存在门
    if (!core.terrainExists(x, y, id)) return;
    // core.lockControl();
    core.stopHero();
    core.stopAutomaticRoute();
    if (needKey) {
        var key = id.replace("Door", "Key");
        if (!core.useKey(key)) {
            if (key == "yellowKey" || key == "blueKey" || key == "redKey")
                core.drawTip("你没有" + core.material.items[key].name + "！", "normal");
            else core.drawTip("无法开启此门。");
            return;
        }
    }
    // open
    core.playSound("door", "ogg");
    var state = 0;
    var door = core.material.icons.animates[id];
    core.interval.openDoorAnimate = window.setInterval(function () {
        state++;
        if (state == 4) {
            clearInterval(core.interval.openDoorAnimate);
            core.removeBlock('event', x, y);
            return;
        }
        core.canvas.event.clearRect(32 * x, 32 * y, 32, 32);
        core.canvas.event.drawImage(core.material.images.animates, 32 * state, 32 * door.loc, 32, 32, 32 * x, 32 * y, 32, 32);
    }, 30)
}

core.prototype.battle = function (id, x, y) {
    core.stopHero();
    core.stopAutomaticRoute();

    var damage = core.getDamage(id);
    if (damage >= core.status.hero.hp) {
        core.drawTip("你打不过此怪物！");
        return;
    }
    core.playSound('attack', 'ogg');
    core.status.hero.hp -= damage;
    core.status.hero.money += core.material.enemys[id].money;
    core.updateStatusBar();
    core.removeBlock('event', x, y);
    core.canvas.event.clearRect(32 * x, 32 * y, 32, 32);
    core.updateFg();
    core.drawTip("打败 " + core.material.enemys[id].name + "，金币+" + core.material.enemys[id].money);

    // 打完怪物，触发事件

    if (id == 'skeleton' && core.status.floorId == 'MT3' && !core.enemyExists(9, 4) && !core.enemyExists(11, 4)) {
        core.openDoor('specialDoor', 10, 3, false);
    }
    if (id == 'skeletonSoilder' && core.status.floorId == 'MT3' && !core.enemyExists(9, 9) && !core.enemyExists(11, 9)) {
        core.openDoor('specialDoor', 10, 8, false);
    }
    if (id == 'skeletonCaptain' && core.status.floorId == 'MT5') {
        core.openDoor('specialDoor', 6, 3, false);
        core.upload();
    }
    if (id=='zombieKnight' && core.status.floorId=='MT8' && !core.enemyExists(9, 7) && !core.enemyExists(11, 7)) {
        core.openDoor('specialDoor', 10, 8, false);
    }
    if (id=='rock' && core.status.floorId=='MT9' && !core.enemyExists(3, 1) && !core.enemyExists(3, 3)) {
        core.openDoor('specialDoor', 2, 2, false);
    }
    if (id=='vampire' && core.status.floorId=='MT10') {
        core.openDoor('specialDoor', 6, 3, false);
        core.upload();
    }
    if (id=='blueGuard' && core.status.floorId=='MT12' && !core.enemyExists(9, 8) && !core.enemyExists(11, 8)) {
        core.openDoor('specialDoor', 10, 7, false);
    }
    if (id=='redBat' && core.status.floorId=='MT12' && !core.enemyExists(9, 6) && !core.enemyExists(11, 6)) {
        core.openDoor('specialDoor', 10, 5, false);
    }
    if (id=='ghostSkeleton' && core.status.floorId=='MT12' && !core.enemyExists(9, 4) && !core.enemyExists(11, 4)) {
        core.openDoor('specialDoor', 10, 3, false);
    }
    if ((id=='soldier' || id=='redKnight') && core.status.floorId=='MT13' && !core.enemyExists(7, 1) && !core.enemyExists(7, 3)) {
        core.openDoor('specialDoor', 8, 2, false);
    }
    if (id=='redKnight' && core.status.floorId=='MT14' && !core.enemyExists(9, 4) && !core.enemyExists(9, 6)) {
        core.openDoor('specialDoor', 8, 5, false);
    }
    if (id=='yellowKnight' && core.status.floorId=='MT15') {
        core.openDoor('specialDoor', 6, 9, false);
        core.upload();
    }
    if (id=='blueKnight' && core.status.floorId=='MT17' && !core.enemyExists(5, 7) && !core.enemyExists(7, 7)) {
        core.openDoor('specialDoor', 6, 8, false);
    }
    if (id=='blackKing' && core.status.floorId=='MT20') {
        core.upload();
        core.win();
    }





}

core.prototype.getDamage = function (monsterId) {
    var monster = core.material.enemys[monsterId];
    var hero_atk = core.status.hero.atk, hero_def = core.status.hero.def, hero_mdef = core.status.hero.mdef;
    var mon_hp = monster.hp, mon_atk = monster.atk, mon_def = monster.def, mon_special = monster.special;
    return core.calDamage(hero_atk, hero_def, hero_mdef, mon_hp, mon_atk, mon_def, mon_special);
}

core.prototype.getCritical = function (monsterId) {
    var monster = core.material.enemys[monsterId];
    if (monster.special == 3) return "???";
    var last = core.calDamage(core.status.hero.atk, core.status.hero.def, core.status.hero.mdef,
        monster.hp, monster.atk, monster.def, monster.special);
    if (last == 0) return 0;

    for (var i = core.status.hero.atk + 1; i <= monster.hp + monster.def; i++) {
        var damage = core.calDamage(i, core.status.hero.def, core.status.hero.mdef,
            monster.hp, monster.atk, monster.def, monster.special);
        if (damage < last)
            return i - core.status.hero.atk;
        last = damage;
    }
    return 0;
}

core.prototype.getCriticalDamage = function (monsterId) {
    var c = core.getCritical(monsterId);
    if (c == '???') return '???';
    if (c == 0) return 0;
    var monster = core.material.enemys[monsterId];
    // if (c<=0) return 0;
    var last = core.calDamage(core.status.hero.atk, core.status.hero.def, core.status.hero.mdef,
        monster.hp, monster.atk, monster.def, monster.special);
    if (last == 999999999) return '???';

    return last - core.calDamage(core.status.hero.atk + c, core.status.hero.def, core.status.hero.mdef,
        monster.hp, monster.atk, monster.def, monster.special);
}

core.prototype.getDefDamage = function (monsterId) {
    var monster = core.material.enemys[monsterId];
    return core.getDamage(monsterId) -
        core.calDamage(core.status.hero.atk, core.status.hero.def + 1, core.status.hero.mdef,
            monster.hp, monster.atk, monster.def, monster.special)
}

core.prototype.calDamage = function (hero_atk, hero_def, hero_mdef, mon_hp, mon_atk, mon_def, mon_special) {
    // 魔攻
    if (mon_special == 2) hero_def = 0;
    // 坚固
    if (mon_special == 3 && mon_def < hero_atk - 1) mon_def = hero_atk - 1;
    // 模仿
    if (mon_special == 10) {
        mon_atk = hero_atk;
        mon_def = hero_def;
    }
    if (hero_atk <= mon_def) return 999999999;

    var per_damage = mon_atk - hero_def;
    if (per_damage < 0) per_damage = 0;
    // 2连击 & 3连击

    if (mon_special == 4) per_damage *= 2;
    if (mon_special == 5) per_damage *= 3;
    if (mon_special == 6) per_damage *= 4;
    // 反击
    if (mon_special == 8) per_damage += (int)(0.1 * hero_atk);

    // 先攻
    var damage = mon_special == 1 ? per_damage : 0;
    // 破甲
    if (mon_special == 7) damage = parseInt(0.9 * hero_def);
    // 净化
    if (mon_special == 9) damage = 3 * hero_mdef;

    var turn = parseInt((mon_hp - 1) / (hero_atk - mon_def));
    var ans = damage + turn * per_damage;
    ans -= hero_mdef;

    // 魔防回血
    // return ans;

    // 魔防不回血
    return ans <= 0 ? 0 : ans;

}

core.prototype.changeFloor = function (floorId, stair, heroLoc, callback) {
    core.lockControl();
    core.stopHero();
    core.stopAutomaticRoute();
    core.dom.floorNameLabel.innerHTML = core.status.maps[floorId].title;
    if (core.isset(stair)) {
        // find heroLoc
        heroLoc = core.status.hero.loc;
        var blocks = core.status.maps[floorId].blocks;
        for (var i in blocks) {
            if (core.isset(blocks[i].event) && blocks[i].event.id === stair) {
                heroLoc.x = blocks[i].x;
                heroLoc.y = blocks[i].y;
            }
        }
        if (core.status.maps[floorId].canFlyTo && core.status.hero.flyRange.indexOf(floorId)<0) {
            if (stair=='upFloor') core.status.hero.flyRange.unshift(floorId);
            if (stair=='downFloor') core.status.hero.flyRange.push(floorId);
        }
    }

    window.setTimeout(function () {
        // console.log('地图切换到' + floorId);
        core.playSound('floor', 'mp3');
        core.mapChangeAnimate('show', function () {
            core.statusBar.floor.innerHTML = core.status.maps[floorId].name;
            core.updateStatusBar();
            core.drawMap(floorId, function () {
                core.hide(core.dom.floorMsgGroup, 10, function () {
                    core.unLockControl();
                });
                core.setHeroLoc('direction', heroLoc.direction);
                core.setHeroLoc('x', heroLoc.x);
                core.setHeroLoc('y', heroLoc.y);
                core.drawHero(core.getHeroLoc('direction'), core.getHeroLoc('x'), core.getHeroLoc('y'), 'stop');
                core.updateFg();
                if (core.isset(callback)) callback();
            });
        });
    }, 50);
}

core.prototype.mapChangeAnimate = function (mode, callback) {
    if (mode == 'show') {
        core.show(core.dom.floorMsgGroup, 15, function () {
            callback();
        });
    }
    else {
        core.hide(core.dom.floorMsgGroup, 20, function () {
            callback();
        });
    }
}

core.prototype.clearMap = function (map, x, y, width, height) {
    if (map == 'all') {
        for (var m in core.canvas) {
            core.canvas[m].clearRect(0, 0, 416, 416);
        }
    }
    else {
        core.canvas[map].clearRect(x, y, width, height);
    }
}

core.prototype.fillText = function (map, text, x, y, style, font) {
    if (core.isset(style)) {
        core.setFillStyle(map, style);
    }
    if (core.isset(font)) {
        core.setFont(map, font);
    }
    core.canvas[map].fillText(text, x, y);
}

core.prototype.fillRect = function (map, x, y, width, height, style) {
    if (core.isset(style)) {
        core.setFillStyle(map, style);
    }
    core.canvas[map].fillRect(x, y, width, height);
}

core.prototype.strokeRect = function (map, x, y, width, height, style, lineWidth) {
    if (core.isset(style)) {
        core.setStrokeStyle(map, style);
    }
    if (core.isset(lineWidth)) {
        core.setLineWidth(map, lineWidth);
    }
    core.canvas[map].strokeRect(x, y, width, height);
}

core.prototype.drawBlock = function (map, image, cutX, cutY, x, y, size, zoom, clear) {
    zoom = zoom || 1;
    if (core.isset(clear) && clear == true) {
        core.canvas[map].clearRect(x * size, y * size, size, size);
    }
    core.canvas[map].drawImage(core.material.images[image], cutX * size, cutY * size, size, size, x * size, y * size, size * zoom, size * zoom);
}

core.prototype.setFont = function (map, font) {
    core.canvas[map].font = font;
}

core.prototype.setLineWidth = function (map, lineWidth) {
    if (map == 'all') {
        for (var m in core.canvas) {
            core.canvas[m].lineWidth = lineWidth;
        }
    }
    core.canvas[map].lineWidth = lineWidth;
}

core.prototype.saveCanvas = function (map) {
    core.canvas[map].save();
}

core.prototype.loadCanvas = function (map) {
    core.canvas[map].restore();
}

core.prototype.setOpacity = function (map, opacity) {
    if (map == 'all') {
        for (var m in core.canvas) {
            core.canvas[m].globalAlpha = opacity;
        }
    }
    core.canvas[map].globalAlpha = opacity;
}

core.prototype.setStrokeStyle = function (map, style) {
    if (map == 'all') {
        for (var m in core.canvas) {
            core.canvas[m].strokeStyle = style;
        }
    }
    else {
        core.canvas[map].strokeStyle = style;
    }
}

core.prototype.setAlpha = function (map, alpha) {
    if (map == 'all') {
        for (var m in core.canvas) {
            core.canvas[m].globalAlpha = alpha;
        }
    }
    else core.canvas[map].globalAlpha = alpha;
}

core.prototype.setOpacity = function (map, opacity) {
    if (map == 'all') {
        for (var m in core.canvas) {
            core.canvas[m].canvas.style.opacity = opacity;
        }
    }
    else core.canvas[map].canvas.style.opacity = opacity;
}

core.prototype.setFillStyle = function (map, style) {
    if (map == 'all') {
        for (var m in core.canvas) {
            core.canvas[m].fillStyle = style;
        }
    }
    else {
        core.canvas[map].fillStyle = style;
    }
}

core.prototype.drawMap = function (mapName, callback) {
    var mapData = core.status.maps[mapName];
    var mapBlocks = mapData.blocks;
    core.status.floorId = mapName;
    core.status.thisMap = mapData;
    var x, y, blockIcon, blockImage;
    core.clearMap('all');
    core.rmGlobalAnimate(null, null, true);
    core.enabledAllTrigger();
    for (x = 0; x < 13; x++) {
        for (y = 0; y < 13; y++) {
            blockIcon = core.material.icons.terrains.blackFloor;
            blockImage = core.material.images.terrains;
            core.canvas.bg.drawImage(blockImage, 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x * blockIcon.size, y * blockIcon.size, blockIcon.size, blockIcon.size);
        }
    }
    x = 0;
    y = 0;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (core.isset(mapBlocks[b].bg)) {
            blockIcon = core.material.icons[mapBlocks[b].bg.cls][mapBlocks[b].bg.id];
            blockImage = core.material.images[mapBlocks[b].bg.cls];
            x = mapBlocks[b].x * blockIcon.size;
            y = mapBlocks[b].y * blockIcon.size;
            if (mapBlocks[b].bg.cls != 'empty') {
                core.canvas.bg.drawImage(blockImage, 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x, y, blockIcon.size, blockIcon.size);
                core.addGlobalAnimate(mapBlocks[b].bg.animate, x, y, 'bg', blockIcon.loc, blockIcon.size, blockImage);
            }
            else {
                core.canvas.bg.clearRect(x, y, blockIcon.size, blockIcon.size);
            }
        }
        else {
            blockIcon = core.material.icons.terrains.blackFloor;
            blockImage = core.material.images.terrains;
            x = mapBlocks[b].x * blockIcon.size;
            y = mapBlocks[b].y * blockIcon.size;
            core.canvas.bg.drawImage(blockImage, 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x, y, blockIcon.size, blockIcon.size);
        }
        if (core.isset(mapBlocks[b].event)) {
            blockIcon = core.material.icons[mapBlocks[b].event.cls][mapBlocks[b].event.id];
            blockImage = core.material.images[mapBlocks[b].event.cls];
            core.canvas.event.drawImage(core.material.images[mapBlocks[b].event.cls], 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x, y, blockIcon.size, blockIcon.size);
            core.addGlobalAnimate(mapBlocks[b].event.animate, x, y, 'event', blockIcon.loc, blockIcon.size, blockImage);
        }
    }
    core.setGlobalAnimate(core.firstData.animateSpeed);
    callback();
}

core.prototype.noPassExists = function (x, y) {
    if (core.enemyExists(x, y) || core.npcExists(x, y)) {
        return true;
    }
    return false;
}

core.prototype.npcExists = function (x, y) {
    var blocks = core.status.thisMap.blocks;
    for (var n = 0; n < blocks.length; n++) {
        if (blocks[n].x == x && blocks[n].y == y && core.isset(blocks[n].event) && blocks[n].event.cls == 'npcs') {
            return true;
        }
    }
    return false;
}

core.prototype.terrainExists = function (x, y, id) {
    if (x > 12 || y > 12 || x < 0 || y < 0) {
        return true;
    }
    if (core.stairExists(x, y)) {
        return false;
    }
    var blocks = core.status.thisMap.blocks;
    for (var t = 0; t < blocks.length; t++) {
        if (blocks[t].x == x && blocks[t].y == y) {
            for (var map in core.canvas) {
                if (core.isset(blocks[t][map]) && (blocks[t][map].cls == 'terrains' || (blocks[t][map].cls == 'animates' && core.isset(blocks[t][map].noPass) && blocks[t][map].noPass == true)) && ((core.isset(id) && core.isset(blocks[t][map].id)) ? blocks[t][map].id == id : true)) {
                    return true;
                }
            }
        }
    }
    return false;
}

core.prototype.stairExists = function (x, y) {
    var blocks = core.status.thisMap.blocks;
    for (var s = 0; s < blocks.length; s++) {
        if (blocks[s].x == x && blocks[s].y == y && core.isset(blocks[s].event) && blocks[s].event.cls == 'terrains' && core.isset(blocks[s].event.id) && (blocks[s].event.id == 'upFloor' || blocks[s].event.id == 'downFloor')) {
            return true;
        }
    }
    return false;
}

core.prototype.enemyExists = function (x, y, id) {
    var blocks = core.status.thisMap.blocks;
    for (var e = 0; e < blocks.length; e++) {
        if (blocks[e].x == x && blocks[e].y == y && core.isset(blocks[e].event) && blocks[e].event.cls == 'enemys' && ((core.isset(id) && core.isset(blocks[e].event.id)) ? blocks[e].event.id == id : true)) {
            return true;
        }
    }
    return false;
}

core.prototype.blockExists = function (x, y) {
    if (x > 12 || y > 12 || x < 0 || y < 0) {
        return true;
    }
    var mapBlocks = core.status.thisMap.blocks;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (mapBlocks[b].x == x && mapBlocks[b].y == y) {
            return (mapBlocks[b].event && mapBlocks[b].event.noPass) || (mapBlocks[b].bg && mapBlocks[b].bg.noPass);
        }
    }
    return false;
}

core.prototype.removeBlock = function (map, x, y) {
    var map = map.split(',');
    var mapBlocks = core.status.thisMap.blocks;
    var blockIcon;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (mapBlocks[b].x == x && mapBlocks[b].y == y) {
            core.rmGlobalAnimate(x, y);
            for (var m = 0; m < map.length; m++) {
                if (!core.isset(mapBlocks[b][map[m]])) {
                    continue;
                }
                blockIcon = core.material.icons[mapBlocks[b][map[m]].cls][mapBlocks[b][map[m]].id];
                core.canvas[map[m]].clearRect(x * blockIcon.size, y * blockIcon.size, blockIcon.size, blockIcon.size);
                // delete core.status.thisMap.blocks[b][map[m]];
            }
            core.status.thisMap.blocks.splice(b, 1);
            break;
        }
    }
}

core.prototype.noPass = function (x, y) {
    if (x > 12 || y > 12 || x < 0 || y < 0) {
        return true;
    }
    var mapBlocks = core.status.thisMap.blocks;
    var noPass;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (mapBlocks[b].x == x && mapBlocks[b].y == y) {
            return noPass = (mapBlocks[b].event && mapBlocks[b].event.noPass) || (mapBlocks[b].bg && mapBlocks[b].bg.noPass);
        }
    }
}

core.prototype.trigger = function (x, y) {
    var mapBlocks = core.status.thisMap.blocks;
    var noPass;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (mapBlocks[b].x == x && mapBlocks[b].y == y) {
            noPass = (mapBlocks[b].event && mapBlocks[b].event.noPass) || (mapBlocks[b].bg && mapBlocks[b].bg.noPass);
            if (noPass) {
                core.clearAutomaticRouteNode(x, y);
            }
            /*
            if(core.isset(mapBlocks[b].fg) && core.isset(mapBlocks[b].fg.trigger) && (core.isset(mapBlocks[b].fg.disabledTrigger) ? mapBlocks[b].fg.disabledTrigger == false : true)) {
                core.material.events[mapBlocks[b].fg.trigger](mapBlocks[b], core, function(data) {

                });
            }
            */
            if (core.isset(mapBlocks[b].event) && core.isset(mapBlocks[b].event.trigger) && (core.isset(mapBlocks[b].event.disabledTrigger) ? mapBlocks[b].event.disabledTrigger == false : true)
                    && !(core.isset(mapBlocks[b].event.noTriggerCross) && mapBlocks[b].event.noTriggerCross && (core.status.autoHeroMove || core.status.autoStep<core.status.autoStepRoutes.length))) {
                core.material.events[mapBlocks[b].event.trigger](mapBlocks[b], core, function (data) {

                });
            }
            else if (core.isset(mapBlocks[b].bg) && core.isset(mapBlocks[b].bg.trigger) && (core.isset(mapBlocks[b].bg.disabledTrigger) ? mapBlocks[b].bg.disabledTrigger == false : true)) {
                core.material.events[mapBlocks[b].bg.trigger](mapBlocks[b], core, function (data) {

                });
            }
        }
    }
}

core.prototype.setTrigger = function (x, y, map, triggerName) {
    var mapBlocks = core.status.thisMap.blocks;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (mapBlocks[b].x == x && mapBlocks[b].y == y && core.isset(mapBlocks[b][map])) {
            mapBlocks[b][map].trigger = triggerName;
        }
    }
}

core.prototype.enabledTrigger = function (x, y, map) {
    var mapBlocks = core.status.thisMap.blocks;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (mapBlocks[b].x == x && mapBlocks[b].y == y && core.isset(mapBlocks[b][map]) && core.isset(mapBlocks[b][map].trigger)) {
            mapBlocks[b][map].disabledTrigger = false;
        }
    }
}

core.prototype.enabledAllTrigger = function () {
    var mapBlocks = core.status.thisMap.blocks;
    for (var b = 0; b < mapBlocks.length; b++) {
        for (var map in core.canvas) {
            if (core.isset(mapBlocks[b][map]) && core.isset(mapBlocks[b][map].trigger)) {
                mapBlocks[b][map].disabledTrigger = false;
            }
        }
    }
}

core.prototype.disabledTrigger = function (x, y, map) {
    var mapBlocks = core.status.thisMap.blocks;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (mapBlocks[b].x == x && mapBlocks[b].y == y && core.isset(mapBlocks[b][map]) && core.isset(mapBlocks[b][map].trigger)) {
            mapBlocks[b][map].disabledTrigger = true;
        }
    }
}

core.prototype.rmTrigger = function (x, y, map) {
    var mapBlocks = core.status.thisMap.blocks;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (mapBlocks[b].x == x && mapBlocks[b].y == y && core.isset(mapBlocks[b][map]) && core.isset(mapBlocks[b][map].trigger)) {
            delete mapBlocks[b][map].trigger;
        }
    }
}

core.prototype.addGlobalAnimate = function (animateMore, x, y, map, loc, size, image) {
    if (animateMore == 2) {
        core.status.twoAnimateObjs.push({
            'x': x,
            'y': y,
            'map': map,
            'status': 0,
            'loc': loc,
            'size': size,
            'image': image
        });
    }
    else if (animateMore == 4) {
        core.status.fourAnimateObjs.push({
            'x': x,
            'y': y,
            'map': map,
            'status': 0,
            'loc': loc,
            'size': size,
            'image': image
        });
    }
}

core.prototype.rmGlobalAnimate = function (x, y, all) {
    if (all == true) {
        core.status.twoAnimateObjs = [];
        core.status.fourAnimateObjs = [];
    }
    for (var t = 0; t < core.status.twoAnimateObjs.length; t++) {
        if (core.status.twoAnimateObjs[t].x == x * core.status.twoAnimateObjs[t].size && core.status.twoAnimateObjs[t].y == y * core.status.twoAnimateObjs[t].size) {
            core.status.twoAnimateObjs.splice(t, 1);
            return;
        }
    }
    for (var f = 0; f < core.status.fourAnimateObjs.length; f++) {
        if (core.status.fourAnimateObjs[f].x == x * core.status.fourAnimateObjs[f].size && core.status.fourAnimateObjs[f].y == y * core.status.fourAnimateObjs[f].size) {
            core.status.fourAnimateObjs.splice(f, 1);
            return;
        }
    }
}

core.prototype.setGlobalAnimate = function (speed) {
    clearInterval(core.interval.twoAnimate);
    clearInterval(core.interval.fourAnimate);
    var animateClose = false;
    core.interval.twoAnimate = window.setInterval(function () {
        for (var a = 0; a < core.status.twoAnimateObjs.length; a++) {
            core.status.twoAnimateObjs[a].status = core.status.twoAnimateObjs[a].status == 0 ? 1 : 0;
            core.canvas[core.status.twoAnimateObjs[a].map].clearRect(core.status.twoAnimateObjs[a].x, core.status.twoAnimateObjs[a].y, core.status.twoAnimateObjs[a].size, core.status.twoAnimateObjs[a].size);
            for (var b = 0; b < core.status.thisMap.blocks.length; b++) {
                if (core.status.thisMap.blocks[b].x * 32 == core.status.twoAnimateObjs[a].x && core.status.thisMap.blocks[b].y * 32 == core.status.twoAnimateObjs[a].y && (!core.isset(core.status.thisMap.blocks[b][core.status.twoAnimateObjs[a].map]) || core.status.thisMap.blocks[b][core.status.twoAnimateObjs[a].map].animate == 0)) {
                    animateClose = true;
                }
            }
            if (!animateClose) {
                core.canvas[core.status.twoAnimateObjs[a].map].drawImage(core.status.twoAnimateObjs[a].image, core.status.twoAnimateObjs[a].status * 32, core.status.twoAnimateObjs[a].loc * core.status.twoAnimateObjs[a].size, core.status.twoAnimateObjs[a].size, core.status.twoAnimateObjs[a].size, core.status.twoAnimateObjs[a].x, core.status.twoAnimateObjs[a].y, core.status.twoAnimateObjs[a].size, core.status.twoAnimateObjs[a].size);
            }
            animateClose = false;
        }
    }, speed);
    core.interval.fourAnimate = window.setInterval(function () {
        for (var a = 0; a < core.status.fourAnimateObjs.length; a++) {
            core.status.fourAnimateObjs[a].status = (core.status.fourAnimateObjs[a].status == 0 ? 1 : (core.status.fourAnimateObjs[a].status == 1 ? 2 : (core.status.fourAnimateObjs[a].status == 2 ? 3 : 0)));
            core.canvas[core.status.fourAnimateObjs[a].map].clearRect(core.status.fourAnimateObjs[a].x, core.status.fourAnimateObjs[a].y, core.status.fourAnimateObjs[a].size, core.status.fourAnimateObjs[a].size);
            for (var b = 0; b < core.status.thisMap.blocks.length; b++) {
                if (core.status.thisMap.blocks[b].x * 32 == core.status.fourAnimateObjs[a].x && core.status.thisMap.blocks[b].y * 32 == core.status.fourAnimateObjs[a].y && (!core.isset(core.status.thisMap.blocks[b][core.status.fourAnimateObjs[a].map]) || core.status.thisMap.blocks[b][core.status.fourAnimateObjs[a].map].animate == 0)) {
                    animateClose = true;
                }
            }
            if (!animateClose) {
                core.canvas[core.status.fourAnimateObjs[a].map].drawImage(core.status.fourAnimateObjs[a].image, core.status.fourAnimateObjs[a].status * 32, core.status.fourAnimateObjs[a].loc * core.status.fourAnimateObjs[a].size, core.status.fourAnimateObjs[a].size, core.status.fourAnimateObjs[a].size, core.status.fourAnimateObjs[a].x, core.status.fourAnimateObjs[a].y, core.status.fourAnimateObjs[a].size, core.status.fourAnimateObjs[a].size);
            }
            animateClose = false;
        }
    }, speed / 2);
}

core.prototype.setBoxAnimate = function (speed) {
    clearInterval(core.interval.boxAnimate);
    if (core.status.boxAnimateObjs.length > 0) {
        var background = core.canvas.ui.createPattern(core.material.ground, "repeat");
        core.drawBoxAnimate(background);
        core.interval.boxAnimate = setInterval(function () {
            core.drawBoxAnimate(background);
        }, speed);
    }
}

core.prototype.drawBoxAnimate = function (background) {
    for (var a = 0; a < core.status.boxAnimateObjs.length; a++) {
        var obj = core.status.boxAnimateObjs[a];
        obj.status = obj.status == 0 ? 1 : 0;
        core.clearMap('ui', obj.bgx, obj.bgy, obj.bgsize, obj.bgsize);
        core.fillRect('ui', obj.bgx, obj.bgy, obj.bgsize, obj.bgsize, background);
        core.canvas.ui.drawImage(obj.image, obj.status * obj.icon.size, obj.icon.loc * obj.icon.size,
            obj.icon.size, obj.icon.size, obj.x, obj.y, obj.icon.size, obj.icon.size);
    }
}

core.prototype.setHeroLoc = function (itemName, itemVal) {
    if (itemVal == '++') {
        core.status.hero.loc[itemName]++;
        return;
    }
    else if (itemVal == '--') {
        core.status.hero.loc[itemName]--;
        return;
    }
    core.status.hero.loc[itemName] = itemVal;
}

core.prototype.getHeroLoc = function (itemName) {
    return core.status.hero.loc[itemName];
}

core.prototype.updateFg = function () {
    if (!core.isset(core.status.thisMap) || !core.isset(core.status.thisMap.blocks)) return;
    // 更新显伤
    var mapBlocks = core.status.thisMap.blocks;
    core.clearMap('fg', 0, 0, 416, 416);
    // 没有怪物手册
    if (!core.hasItem('book')) return;
    core.setFont('fg', "bold 11px Arial");
    var hero_hp = core.status.hero.hp;
    for (var b = 0; b < mapBlocks.length; b++) {
        var x = mapBlocks[b].x, y = mapBlocks[b].y;
        if (core.isset(mapBlocks[b].event) && mapBlocks[b].event.cls == 'enemys') {
            var id = mapBlocks[b].event.id;

            var damage = core.getDamage(id);
            var color = "#000000";
            if (damage <= 0) color = '#00FF00';
            else if (damage < hero_hp / 3) color = '#FFFFFF';
            else if (damage < hero_hp * 2 / 3) color = '#FFFF00';
            else if (damage < hero_hp) color = '#FF7F00';
            else color = '#FF0000';

            if (damage == 999999999) damage = "???";
            else if (damage > 100000) damage = (damage / 100000).toFixed(1) + "w";

            core.setFillStyle('fg', '#000000');
            core.canvas.fg.fillText(damage, 32 * x + 2, 32 * (y + 1) - 2);
            core.canvas.fg.fillText(damage, 32 * x, 32 * (y + 1) - 2);
            core.canvas.fg.fillText(damage, 32 * x + 2, 32 * (y + 1));
            core.canvas.fg.fillText(damage, 32 * x, 32 * (y + 1));

            core.setFillStyle('fg', color);
            core.canvas.fg.fillText(damage, 32 * x + 1, 32 * (y + 1) - 1);

        }
    }
}

/**
 * 地图处理 end
 */

/**
 * 物品处理 start
 */
core.prototype.itemCount = function (itemId) {
    if (!core.isset(itemId) || !core.isset(core.material.items[itemId])) return 0;
    var itemCls = core.material.items[itemId].cls;
    return core.isset(core.status.hero.items[itemCls][itemId]) ? core.status.hero.items[itemCls][itemId] : 0;
}

core.prototype.hasItem = function (itemId) {
    return core.itemCount(itemId) > 0;
}

core.prototype.setItem = function (itemId, itemNum) {
    var itemCls = core.material.items[itemId].cls;
    if (itemCls == 'item') return;
    if (!core.isset(core.status.hero.items[itemCls])) {
        core.status.hero.items[itemCls] = {};
    }
    core.status.hero.items[itemCls][itemId] = itemNum;
}

core.prototype.useKey = function (itemId) {
    if (!core.hasItem(itemId)) return false;
    var itemCls = core.material.items[itemId].cls;
    core.status.hero.items[itemCls][itemId]--;
    core.updateStatusBar();
    return true;
}

core.prototype.useItem = function (itemId) {
    // 使用道具
    if (!core.canUseItem(itemId)) return;
    var itemCls = core.material.items[itemId].cls;

    // 永久道具
    if (itemCls == 'constants') {
        if (itemId=='book') {
            core.drawEnemyBook(1);
        }
        if (itemId=='fly') {
            core.drawFly(core.status.hero.flyRange.indexOf(core.status.floorId));
        }
    }
    // 消耗道具
    if (itemCls == 'tools') {

    }
    return;
}

core.prototype.canUseItem = function (itemId) {
    // 没有道具
    if (!core.hasItem(itemId)) return false;

    var itemCls = core.material.items[itemId].cls;

    if (itemId == 'book') return true;
    if (itemId == 'fly') return core.status.hero.flyRange.indexOf(core.status.floorId)>=0;
    if (itemId == 'pickaxe') {
        // 破墙镐

        return false;
    }
    if (itemId == 'bomb') {
        // 炸弹

        return false;
    }
    if (itemId == 'centerFly') {
        // 中心对称

        return false;
    }
    return false;
}

core.prototype.addItem = function (itemId, itemNum) {
    var itemData = core.material.items[itemId];
    var itemCls = itemData.cls;
    if (itemCls == 'item') return;
    if (!core.isset(core.status.hero.items[itemCls])) {
        core.status.hero.items[itemCls] = {};
        core.status.hero.items[itemCls][itemId] = 0;
    }
    else if (!core.isset(core.status.hero.items[itemCls][itemId])) {
        core.status.hero.items[itemCls][itemId] = 0;
    }
    core.status.hero.items[itemCls][itemId] += itemNum;
}

/*
core.prototype.removeBlock = function(itemX, itemY) {
   var mapBlocks = core.status.thisMap.blocks;
   for(var b = 0;b < mapBlocks.length;b++) {
       if(mapBlocks[b].x == itemX && mapBlocks[b].y == itemY) {
           // delete mapBlocks[b].event;
           // mapBlocks[b]
           core.status.thisMap.blocks.splice(b,1);
           break;
       }
   }
}
*/

core.prototype.getItemEffect = function (itemId, itemNum) {
    var currfloor = parseInt(core.status.thisMap.name);
    var hard = parseInt((currfloor + 4) / 5);
    var itemCls = core.material.items[itemId].cls;

    // 消耗品
    if (itemCls === 'items') {
        if (itemId === 'redJewel') core.status.hero.atk += 1 + hard;
        if (itemId === 'blueJewel') core.status.hero.def += 1 + hard;
        if (itemId === 'greenJewel') core.status.hero.mdef += 2 + 3 * hard;
        // if (itemId == 'yellowJewel') core.status.hero.atk+=1+hard;
        if (itemId === 'redPotion') core.status.hero.hp += 100;
        if (itemId === 'bluePotion') core.status.hero.hp += 250;
        if (itemId === 'yellowPotion') core.status.hero.hp += 500;
        if (itemId === 'greenPotion') core.status.hero.hp += 800;
        if (itemId === 'sword1') core.status.hero.atk += 10;
        if (itemId === 'sword2') core.status.hero.atk += 20;
        if (itemId === 'sword5') core.status.hero.atk += 40;
        if (itemId === 'shield1') core.status.hero.def += 10;
        if (itemId === 'shield2') core.status.hero.def += 20;
        if (itemId === 'shield5') core.status.hero.def += 40;
    }
    else {
        core.addItem(itemId, itemNum);
    }
}

core.prototype.getItemEffectTip = function (itemId) {
    var currfloor = parseInt(core.status.thisMap.name);
    var hard = parseInt((currfloor + 4) / 5);

    if (itemId === 'redJewel') return "攻击+" + (1 + hard);
    if (itemId === 'blueJewel') return "防御+" + (1 + hard);
    if (itemId === 'greenJewel') return "魔防+" + (2 + 3 * hard);
    // if (itemId == 'yellowJewel') core.status.hero.atk+=1+hard;
    if (itemId === 'redPotion') return "生命+100";
    if (itemId === 'bluePotion') return "生命+250";
    if (itemId === 'yellowPotion') return "生命+500";
    if (itemId === 'greenPotion') return "生命+800";
    if (itemId === 'sword1') return "攻击+10";
    if (itemId === 'sword2') return "攻击+20";
    if (itemId === 'sword5') return "攻击+40";
    if (itemId === 'shield1') return "防御+10";
    if (itemId === 'shield2') return "防御+20";
    if (itemId === 'shield5') return "防御+40";

    return "";
}

core.prototype.getItem = function (itemId, itemNum, itemX, itemY) {
    // core.getItemAnimate(itemId, itemNum, itemX, itemY);
    core.playSound('item', 'ogg');
    var itemCls = core.material.items[itemId].cls;
    core.getItemEffect(itemId, itemNum);
    core.removeBlock('event', itemX, itemY);
    var text = '获得 ' + core.material.items[itemId].name;
    if (itemNum > 1) text += "x" + itemNum;
    if (itemCls === 'items') text += "，" + core.getItemEffectTip(itemId);
    core.drawTip(text, 'image', core.material.icons.items[itemId]);
    core.canvas.event.clearRect(itemX * 32, itemY * 32, 32, 32);
    core.updateStatusBar();
}

core.prototype.drawTip = function (text, type, itemIcon) {
    type = type || 'normal';
    var textX, textY, width, height, hide = false, opacityVal = 0;
    clearInterval(core.interval.tipAnimate);
    core.setFont('data', "16px Arial");
    core.saveCanvas('data');
    core.setOpacity('data', 0);
    if (type == 'normal') {
        textX = 16;
        textY = 18;
        width = textX + core.canvas.data.measureText(text).width + 16;
        height = 42;
    }
    else if (type == 'image' && core.isset(itemIcon)) {
        textX = 44;
        textY = 18;
        width = textX + core.canvas.data.measureText(text).width + 8;
        height = 42;
    }
    else {
        core.loadCanvas('data');
        return;
    }
    core.interval.tipAnimate = window.setInterval(function () {
        if (hide) {
            opacityVal -= 0.1;
        }
        else {
            opacityVal += 0.1;
        }
        core.setOpacity('data', opacityVal);
        core.clearMap('data', 5, 5, 400, height);
        core.fillRect('data', 5, 5, width, height, '#000');
        if (core.isset(itemIcon)) {
            core.canvas.data.drawImage(core.material.images.items, 0, itemIcon.loc * itemIcon.size, itemIcon.size, itemIcon.size, 10, 8, itemIcon.size, itemIcon.size);
        }
        core.fillText('data', text, textX + 5, textY + 15, '#fff');
        if (opacityVal > 0.6 || opacityVal < 0) {
            if (hide) {
                core.loadCanvas('data');
                core.clearMap('data', 5, 5, 400, height);
                core.setOpacity('data', 1);
                clearInterval(core.interval.tipAnimate);
                return;
            }
            else {
                if (!core.timeout.getItemTipTimeout) {
                    core.timeout.getItemTipTimeout = window.setTimeout(function () {
                        hide = true;
                        core.timeout.getItemTipTimeout = null;
                    }, 1000);
                }
                opacityVal = 0.6;
                core.setOpacity('data', opacityVal);
            }
        }
    }, 30);
}

/**
 * 物品处理 end
 */

/*
 * NPC事件
 */
core.prototype.visitNpc = function (npcId) {
    // core.drawTip("NPC对话事件尚未完成");

    // 正在移动中...
    if (!core.status.heroStop) {
        setTimeout(function () {
            core.visitNpc(npcId);
        }, 30);
        return;
    }

    if (!core.isset(core.status.npcs[npcId]))
        core.status.npcs[npcId] = 0;
    var times=core.status.npcs[npcId];

    var list = core.npcs.getEffect(npcId, times);
    if (list.length==0) return;

    core.status.event.data = {'id': npcId, 'list': list};
    core.status.event.id = 'npc';
    core.lockControl();

    core.npcAction();

}

core.prototype.npcAction = function() {

    if (core.status.event.data.list.length==0) {
        core.closePanel(false);
        return;
    }

    var data = core.status.event.data.list.shift();
    core.status.event.data.current = data;

    // 对话
    if (data.type=='text') {
        core.drawTextBox(data.content, core.isset(data.isHero)&&data.isHero?'hero':data.id);
    }
    // TODO 添加其他可能的NPC事件

}

core.prototype.drawTextBox = function(content, npcId) {
    var background = core.canvas.ui.createPattern(core.material.ground, "repeat");

    var contents = content.split('\n');

    var isHero = npcId=='hero';

    core.clearMap('ui', 0, 0, 416, 416);

    var left=10, top = Math.min(416-24*(contents.length+1)-65, 250), right = 416 - 2*left, bottom = 416 - 10 - top;

    // var left = 97, top = 64, right = 416 - 2 * left, bottom = 416 - 2 * top;
    core.setAlpha('ui', 0.85);
    core.fillRect('ui', left, top, right, bottom, '#000000');
    core.setAlpha('ui', 1);
    core.strokeRect('ui', left - 1, top - 1, right + 1, bottom + 1, '#FFFFFF', 2);

    // 名称
    core.canvas.ui.textAlign = "left";

    var content_left = left + 25, content_top = top+45;
    if (core.isset(npcId)) {
        content_left = left+63;
        content_top = top+57;
        core.fillText('ui', isHero?core.status.hero.name:core.material.npcs[npcId].name, left + 63, top + 30, '#FFD700', 'bold 22px Verdana');

        // 动画
        core.strokeRect('ui', left + 15 - 1, top + 40 - 1, 34, 34, '#FFD700', 2);
        if (isHero) {
            core.status.boxAnimateObjs = [];
            core.setBoxAnimate(core.firstData.animateSpeed);
            core.clearMap('ui', left + 15, top + 40, 32, 32);
            core.fillRect('ui', left + 15, top + 40, 32, 32, background);
            var heroIcon = core.material.icons.heros[core.status.hero.id]['down'];
            core.canvas.ui.drawImage(core.material.images.heros, heroIcon.loc['stop'] * heroIcon.size, heroIcon.loc.iconLoc * heroIcon.size, heroIcon.size, heroIcon.size, left+15, top+30, 32, 32);
        }
        else {
            core.status.boxAnimateObjs = [];
            core.status.boxAnimateObjs.push({
                'bgx': left + 15, 'bgy': top + 40, 'bgsize': 32,
                'image': core.material.images.npcs,
                'x': left + 15, 'y': top + 40, 'icon': core.material.icons.npcs[core.material.npcs[npcId].icon]
            });
            core.setBoxAnimate(core.firstData.animateSpeed);
        }
    }

    for (var i=0;i<contents.length;i++) {
        core.fillText('ui', contents[i], content_left, content_top, '#FFFFFF', '16px Verdana');
        content_top+=24;
    }

    core.fillText('ui', '<点击任意位置继续>', 270, 393, '#CCCCCC', '13px Verdana');

    /*
    // 对话
    core.canvas.ui.textAlign = "left";
    core.fillText('ui', "勇敢的武士啊，给我" + need, left + 60, top + 65, '#FFFFFF', 'bold 14px Verdana');
    core.fillText('ui', "金币你就可以：", left + 60, top + 83);

    // 选项
    core.canvas.ui.textAlign = "center";
    for (var i = 0; i < shop.choices.length; i++) {
        var choice = shop.choices[i];
        core.fillText('ui', choice.text, 208, top + 120 + 32 * i, "#FFFFFF", "bold 17px Verdana");
    }
    core.fillText('ui', "退出商店", 208, top + 248);
    */
}

/**
 * 系统机制 start
 */

core.prototype.setLocalStorage = function(key, value) {
    try {
        localStorage.setItem(core.firstData.name + "-" + key, JSON.stringify(value));
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}
core.prototype.getLocalStorage = function(key, defaultValue) {
    var value = localStorage.getItem(core.firstData.name+"-"+key);
    if (core.isset(value)) return JSON.parse(value);
    return defaultValue;
}

core.prototype.clone = function (data) {
    if (!core.isset(data)) return data;
    // date
    if (data instanceof Date) {
        var copy=new Date();
        copy.setTime(data.getTime());
        return copy;
    }
    // array
    if (data instanceof Array) {
        var copy=[];
        for (var i=0;i<data.length;i++) {
            copy.push(core.clone(data[i]));
        }
        return copy;
    }
    // object
    if (data instanceof Object) {
        var copy={};
        for (var i in data) {
            if (data.hasOwnProperty(i))
                copy[i]=core.clone(data[i]);
        }
        return copy;
    }
    return data;
}

core.prototype.formatDate = function(date) {
    if (!core.isset(date)) return "";
    return date.getFullYear()+"-"+core.setTwoDigits(date.getMonth()+1)+"-"+core.setTwoDigits(date.getDate())+" "
        +core.setTwoDigits(date.getHours())+":"+core.setTwoDigits(date.getMinutes())+":"+core.setTwoDigits(date.getSeconds());
}

core.prototype.setTwoDigits = function (x) {
    return x<10?"0"+x:x;
}

core.prototype.win = function() {
    core.drawTip("你赢了！");
}

core.prototype.upload = function () {

}

// 作弊
core.prototype.cheat = function() {
    core.setStatus('hp', 10000);
    core.setStatus('atk', 1000);
    core.setStatus('def', 1000);
    core.setStatus('mdef', 1000);
    core.setStatus('money', 1000);
    core.setItem('yellowKey', 50);
    core.setItem('blueKey', 50);
    core.setItem('redKey', 50);
    core.setItem('book', 1);
    core.setItem('fly', 1);
    for (var i in core.status.maps)
        if (core.status.maps[i].canFlyTo && core.status.hero.flyRange.indexOf(i)<0)
            core.status.hero.flyRange.push(i);
    core.updateStatusBar();
    core.drawTip("作弊成功");
}

core.prototype.showConfirmBox = function (text, yesCallback, noCallback) {
    core.status.event.id = 'confirmBox';
    core.status.event.data = {'yes': yesCallback, 'no': noCallback};

    var background = core.canvas.ui.createPattern(core.material.ground, "repeat");
    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 1);
    core.setFillStyle('ui', background);
    core.setFont('ui', "bold 19px Verdana");
    var length = core.canvas.ui.measureText(text).width;

    var left = Math.min(208 - 40 - length / 2, 100), top = 140, right = 416 - 2 * left, bottom = 416 - 2 * top;

    core.fillRect('ui', left, top, right, bottom, background);
    core.strokeRect('ui', left - 1, top - 1, right + 1, bottom + 1, '#FFFFFF', 2);
    core.canvas.ui.textAlign = "center";
    core.fillText('ui', text, 208, top + 50, "#FFFFFF");

    core.fillText('ui', "确定", 208 - 38, top + 105, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "取消", 208 + 38, top + 105);

}

core.prototype.checkStatus = function (name, need, item, clearData) {
    if (need && core.status.event.id == name) {
        core.closePanel(clearData);
        return false;
    }

    if (need && core.status.lockControl) return false;
    if (core.isset(item) && item && !core.hasItem(name)) {
        core.drawTip("你没有" + core.material.items[name].name);
        return false;
    }
    if (!core.status.heroStop) {
        core.drawTip("请先停止勇士行动");
        return false;
    }

    core.lockControl();
    core.status.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};
    core.status.event.id = name;
    return true;
}

core.prototype.openBook = function (need) {
    if (!core.checkStatus('book', need, true, true))
        return;

    core.useItem('book');
}

core.prototype.useFly = function (need) {
    if (!core.checkStatus('fly', need, true))
        return;

    if (!core.canUseItem('fly')) {
        core.drawTip("楼层传送器好像失效了");
        core.unLockControl();
        core.status.event.data = null;
        core.status.event.id = null;
        return;
    }

    core.useItem('fly');
    return;
}

core.prototype.openToolbox = function (need) {

    if (!core.checkStatus('toolbox', need))
        return;

    // core.drawTip("工具箱还未完成");
    core.drawToolbox();
}

core.prototype.save = function(need) {
    if (!core.checkStatus('save', need))
        return;
    core.drawSLPanel(core.status.savePage);
}

core.prototype.load = function (need) {
    if (!core.checkStatus('load', need))
        return;
    core.drawSLPanel(core.status.savePage);
}

core.prototype.doSL = function (id, type) {
    if (type=='save') {
        if (core.saveData("save"+id)) {
            core.closePanel();
            core.drawTip('存档成功！');
            core.setLocalStorage('savePage', core.status.savePage);
        }
        else {
            core.drawTip('存储空间不足，请覆盖已有的存档或在菜单栏中进行清理');
        }
        return;
    }
    else if (type=='load') {
        var data = core.getLocalStorage("save"+id, null);
        if (!core.isset(data)) {
            core.drawTip("无效的存档");
            return;
        }
        core.closePanel();
        core.loadData(data, function() {
            core.setLocalStorage('savePage', core.status.savePage);
            core.drawTip("读档成功");
        });
        return;
    }
}

core.prototype.saveData = function(dataId) {
    var data = {
        'floorId': core.status.floorId,
        'hero': core.clone(core.status.hero),
        'hard': core.status.hard,
        'maps': core.maps.save(core.status.maps),
        'npcs': {},
        'shops': {},
        'version': core.firstData.version,
        'time': new Date().getTime()
    };
    // set shop times
    for (var shop in core.status.shops) {
        data.shops[shop]={
            'times': core.status.shops[shop].times,
            'visited': core.status.shops[shop].visited
        }
    }
    return core.setLocalStorage(dataId, data);
    // console.log(core.getLocalStorage(dataId));
}

core.prototype.loadData = function (data, callback) {
    core.resetStatus(data.hero, data.hard, data.floorId,
        core.maps.load(data.maps));
    // load shop times
    for (var shop in core.status.shops) {
        core.status.shops[shop].times = data.shops[shop].times;
        core.status.shops[shop].visited = data.shops[shop].visited;
    }
    // core.status.shops = core.clone(data.shops);

    core.changeFloor(data.floorId, null, data.hero.loc, function() {
        core.setHeroMoveTriggerInterval();
        if (core.isset(callback)) callback();
    });
}

core.prototype.openSettings = function (need) {
    if (!core.checkStatus('settings', need))
        return;

    var background = core.canvas.ui.createPattern(core.material.ground, "repeat");
    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 1);
    core.setFillStyle('ui', background);
    var left = 97, top = 64, right = 416 - 2 * left, bottom = 416 - 2 * top;
    core.fillRect('ui', left, top, right, bottom, background);
    core.strokeRect('ui', left - 1, top - 1, right + 1, bottom + 1, '#FFFFFF', 2);

    // 名称
    core.canvas.ui.textAlign = "center";
    core.fillText('ui', "音乐： " + (core.musicStatus.soundStatus ? "[ON]" : "[OFF]"), 208, top + 56, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "快捷商店", 208, top + 88, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "保存游戏", 208, top + 120, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "读取游戏", 208, top + 152, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "降低难度", 208, top + 184, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "重新开始", 208, top + 216, "#FFFFFF", "bold 17px Verdana");
    core.fillText('ui', "返回游戏", 208, top + 248, "#FFFFFF", "bold 17px Verdana");

}

core.prototype.selectShop = function () {

    core.status.event.id = 'selectShop';
    var background = core.canvas.ui.createPattern(core.material.ground, "repeat");
    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 1);
    core.setFillStyle('ui', background);

    var shopList = core.status.shops, keys = Object.keys(shopList);
    var len = keys.length + 1;
    if (len % 2 == 0) len++;

    var left = 97, top = 208 - 32 - 16 * len, right = 416 - 2 * left, bottom = 416 - 2 * top;
    core.fillRect('ui', left, top, right, bottom, background);
    core.strokeRect('ui', left - 1, top - 1, right + 1, bottom + 1, '#FFFFFF', 2);

    core.canvas.ui.textAlign = "center";
    for (var i = 0; i < keys.length; i++) {
        core.fillText('ui', shopList[keys[i]].name, 208, top + 56 + 32 * i, "#FFFFFF", "bold 17px Verdana");
    }

    core.fillText('ui', "返回游戏", 208, top + bottom - 40);

}

core.prototype.openShop = function (id) {
    var shop = core.status.shops[id];
    // 正在移动中...
    if (!core.status.heroStop) {
        setTimeout(function () {
            core.openShop(id);
        }, 30);
        return;
    }
    core.status.event.data = shop;
    core.status.event.id = 'shop';
    core.lockControl();
    shop.visited = true;

    var background = core.canvas.ui.createPattern(core.material.ground, "repeat");

    var times = shop.times, need = eval(shop.need);

    clearInterval(core.interval.tipAnimate);
    core.clearMap('data', 0, 0, 416, 416);
    core.setOpacity('data', 1);

    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 1);
    core.setFillStyle('ui', background);

    var left = 97, top = 64, right = 416 - 2 * left, bottom = 416 - 2 * top;
    core.fillRect('ui', left, top, right, bottom, background);
    core.strokeRect('ui', left - 1, top - 1, right + 1, bottom + 1, '#FFFFFF', 2);

    // 名称
    core.canvas.ui.textAlign = "center";
    core.fillText('ui', shop.title, left + 135, top + 34, '#FFFFFF', 'bold 19px Verdana');

    // 动画
    core.strokeRect('ui', left + 15 - 1, top + 30 - 1, 34, 34, '#DDDDDD', 2);
    core.status.boxAnimateObjs = [];
    core.status.boxAnimateObjs.push({
        'bgx': left + 15, 'bgy': top + 30, 'bgsize': 32,
        'image': core.material.images.npcs,
        'x': left + 15, 'y': top + 30, 'icon': core.material.icons.npcs[shop.icon]
    });
    core.setBoxAnimate(core.firstData.animateSpeed);

    // 对话
    core.canvas.ui.textAlign = "left";
    core.fillText('ui', "勇敢的武士啊，给我" + need, left + 60, top + 65, '#FFFFFF', 'bold 14px Verdana');
    core.fillText('ui', "金币你就可以：", left + 60, top + 83);

    // 选项
    core.canvas.ui.textAlign = "center";
    for (var i = 0; i < shop.choices.length; i++) {
        var choice = shop.choices[i];
        core.fillText('ui', choice.text, 208, top + 120 + 32 * i, "#FFFFFF", "bold 17px Verdana");
    }
    core.fillText('ui', "退出商店", 208, top + 248);

}

core.prototype.closePanel = function (clearData) {
    core.status.boxAnimateObjs = [];
    core.setBoxAnimate(core.firstData.animateSpeed);
    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 1.0);
    if (core.isset(clearData) && clearData)
        core.clearMap('data', 0, 0, 416, 416);
    core.unLockControl();
    core.status.event.data = null;
    core.status.event.id = null;
}

core.prototype.getCurrentEnemys = function () {
    var enemys = [];
    var used = {};
    var mapBlocks = core.status.thisMap.blocks;
    for (var b = 0; b < mapBlocks.length; b++) {
        if (core.isset(mapBlocks[b].event) && mapBlocks[b].event.cls == 'enemys') {
            var monsterId = mapBlocks[b].event.id;
            if (core.isset(used[monsterId])) continue;

            var monster = core.material.enemys[monsterId];
            var mon_def = monster.def;
            // 坚固
            if (monster.special==3 && mon_def<core.status.hero.atk-1)
                mon_def = core.status.hero.atk-1;

            enemys.push({
                'id': monsterId, 'name': monster.name, 'hp': monster.hp, 'atk': monster.atk, 'def': mon_def,
                'money': monster.money, 'special': core.enemys.getSpecialText(monsterId),
                'damage': core.getDamage(monsterId), 'critical': core.getCritical(monsterId),
                'criticalDamage': core.getCriticalDamage(monsterId), 'defDamage': core.getDefDamage(monsterId)
            });

            used[monsterId] = true;
        }
    }

    enemys.sort(function (a, b) {
        if (a.damage == b.damage) {
            return a.money - b.money;
        }
        return a.damage - b.damage;
    });
    return enemys;
}

core.prototype.drawEnemyBook = function (page) {

    var enemys = core.getCurrentEnemys();
    var background = core.canvas.ui.createPattern(core.material.ground, "repeat");

    clearInterval(core.interval.tipAnimate);
    core.clearMap('data', 0, 0, 416, 416);
    core.setOpacity('data', 1);

    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 1);
    core.setFillStyle('ui', background);
    core.fillRect('ui', 0, 0, 416, 416);

    core.setAlpha('ui', 0.6);
    core.setFillStyle('ui', '#000000');
    core.fillRect('ui', 0, 0, 416, 416);

    core.setAlpha('ui', 1);
    core.canvas.ui.textAlign = 'left';
    core.setFont('ui', 'bold 15px Verdana');

    if (enemys.length == 0) {
        core.fillText('ui', "本层无怪物", 83, 222, '#999999', "bold 50px Verdana");
        // 退出
        core.canvas.ui.textAlign = 'center';
        core.fillText('ui', '返回游戏', 370, 403,'#DDDDDD', 'bold 15px Verdana');
        return;
    }

    var perpage = 6;
    var totalPage = parseInt((enemys.length - 1) / perpage) + 1;
    if (page < 1) page = 1;
    if (page > totalPage) page = totalPage;
    core.status.event.data = page;
    var start = (page - 1) * perpage, end = Math.min(page * perpage, enemys.length);

    enemys = enemys.slice(start, end);
    core.status.boxAnimateObjs = [];
    for (var i = 0; i < enemys.length; i++) {
        // 边框
        var enemy = enemys[i];
        core.strokeRect('ui', 22, 62 * i + 22, 42, 42, '#DDDDDD', 2);

        // 怪物
        core.status.boxAnimateObjs.push({
            'bgx': 22, 'bgy': 62 * i + 22, 'bgsize': 42,
            'image': core.material.images.enemys,
            'x': 27, 'y': 62 * i + 27, 'icon': core.material.icons.enemys[enemy.id]
        });

        // 数据
        core.canvas.ui.textAlign = "center";
        core.fillText('ui', enemy.name, 115, 62 * i + 47, '#DDDDDD', 'bold 17px Verdana');
        core.canvas.ui.textAlign = "left";
        core.fillText('ui', '生命', 165, 62 * i + 32, '#DDDDDD', '13px Verdana');
        core.fillText('ui', enemy.hp, 195, 62 * i + 32, '#DDDDDD', 'bold 13px Verdana');
        core.fillText('ui', '攻击', 255, 62 * i + 32, '#DDDDDD', '13px Verdana');
        core.fillText('ui', enemy.atk, 285, 62 * i + 32, '#DDDDDD', 'bold 13px Verdana');
        core.fillText('ui', '防御', 335, 62 * i + 32, '#DDDDDD', '13px Verdana');
        core.fillText('ui', enemy.def, 365, 62 * i + 32, '#DDDDDD', 'bold 13px Verdana');
        core.fillText('ui', '金币', 165, 62 * i + 50, '#DDDDDD', '13px Verdana');
        core.fillText('ui', enemy.money, 195, 62 * i + 50, '#DDDDDD', 'bold 13px Verdana');

        var damage = enemy.damage;
        var color = '#FFFF00';
        if (damage >= core.status.hero.hp) color = '#FF0000';
        if (damage == 0) color = '#00FF00';
        if (damage == 999999999) damage = '无法战斗';
        var length = core.canvas.ui.measureText(damage).width;
        core.fillText('ui', damage, 326 - length / 2, 62 * i + 50, color, 'bold 13px Verdana');

        // 属性
        if (enemy.special != '') {
            core.setFont('data', 'bold 12px Verdana');
            var length = core.canvas.data.measureText(enemy.special).width;
            core.setAlpha('data', '0.4');
            core.fillRect('data', 64 - 4 - length, 62 * i + 46, length + 4, 17, '#000000');
            core.setAlpha('data', '1');
            core.fillText('data', enemy.special, 64 - 2 - length, 62 * i + 59, '#FF6A6A', 'bold 12px Verdana')
        }

        core.fillText('ui', '临界', 165, 62 * i + 68, '#DDDDDD', '13px Verdana');
        core.fillText('ui', enemy.critical, 195, 62 * i + 68, '#DDDDDD', 'bold 13px Verdana');
        core.fillText('ui', '减伤', 255, 62 * i + 68, '#DDDDDD', '13px Verdana');
        core.fillText('ui', enemy.criticalDamage, 285, 62 * i + 68, '#DDDDDD', 'bold 13px Verdana');
        core.fillText('ui', '1防', 335, 62 * i + 68, '#DDDDDD', '13px Verdana');
        core.fillText('ui', enemy.defDamage, 365, 62 * i + 68, '#DDDDDD', 'bold 13px Verdana');

    }
    core.setBoxAnimate(core.firstData.animateSpeed);
    core.drawPagination(page, totalPage);
}

core.prototype.drawPagination = function (page, totalPage) {

    core.setFont('ui', 'bold 15px Verdana');
    core.setFillStyle('ui', '#DDDDDD');

    var length = core.canvas.ui.measureText(page + " / " + page).width;

    core.canvas.ui.textAlign = 'left';
    core.fillText('ui', page + " / " + totalPage, (416 - length) / 2, 403);

    core.canvas.ui.textAlign = 'center';
    if (page > 1)
        core.fillText('ui', '上一页', 208 - 80, 403);
    if (page < totalPage)
        core.fillText('ui', '下一页', 208 + 80, 403);

    // 退出
    core.fillText('ui', '返回游戏', 370, 403);

}

core.prototype.drawFly = function(page) {

    if (page<0) page=0;
    if (page>=core.status.hero.flyRange.length) page=core.status.hero.flyRange.length-1;
    core.status.event.data = page;

    var floorId = core.status.hero.flyRange[page];
    var title = core.status.maps[floorId].title;

    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 0.85);
    core.fillRect('ui', 0, 0, 416, 416, '#000000');
    core.setAlpha('ui', 1);
    core.canvas.ui.textAlign = 'center';
    core.fillText('ui', '楼层跳跃', 208, 60, '#FFFFFF', "bold 28px Verdana");
    core.fillText('ui', '返回游戏', 208, 403, '#FFFFFF', "bold 15px Verdana")
    core.fillText('ui', title, 356, 247, '#FFFFFF', "bold 19px Verdana");
    if (page<core.status.hero.flyRange.length-1)
        core.fillText('ui', '▲', 356, 247-64, '#FFFFFF', "17px Verdana");
    if (page>0)
        core.fillText('ui', '▼', 356, 247+64, '#FFFFFF', "17px Verdana");
    core.strokeRect('ui', 20, 100, 273, 273, '#FFFFFF', 2);
    core.drawThumbnail('ui', core.status.maps[floorId].blocks, 20, 100, 273);
}

core.prototype.drawToolbox = function(selectId) {

    if (!core.hasItem(selectId))
        selectId=null;
    core.status.event.data=selectId;

    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 0.85);
    core.fillRect('ui', 0, 0, 416, 416, '#000000');
    core.setAlpha('ui', 1);
    core.setFillStyle('ui', '#DDDDDD');
    core.setStrokeStyle('ui', '#DDDDDD');
    core.canvas.ui.lineWidth = 2;
    core.canvas.ui.strokeWidth = 2;

    // 画线
    core.canvas.ui.beginPath();
    core.canvas.ui.moveTo(0, 130);
    core.canvas.ui.lineTo(416, 130);
    core.canvas.ui.stroke();
    core.canvas.ui.beginPath();
    core.canvas.ui.moveTo(0,129);
    core.canvas.ui.lineTo(0,105);
    core.canvas.ui.lineTo(72,105);
    core.canvas.ui.lineTo(102,129);
    core.canvas.ui.fill();

    core.canvas.ui.beginPath();
    core.canvas.ui.moveTo(0, 290);
    core.canvas.ui.lineTo(416, 290);
    core.canvas.ui.stroke();
    core.canvas.ui.beginPath();
    core.canvas.ui.moveTo(0,289);
    core.canvas.ui.lineTo(0,265);
    core.canvas.ui.lineTo(72,265);
    core.canvas.ui.lineTo(102,289);
    core.canvas.ui.fill();

    // 文字
    core.canvas.ui.textAlign = 'left';
    core.fillText('ui', "消耗道具", 5, 124, '#333333', "bold 16px Verdana");
    core.fillText('ui', "永久道具", 5, 284);

    // 描述
    if (core.isset(selectId)) {
        var item=core.material.items[selectId];
        core.fillText('ui', item.name, 10, 32, '#FFD700', "bold 20px Verdana")
        core.fillText('ui', item.text, 10, 62, '#FFFFFF', '17px Verdana');
        core.fillText('ui', '<继续点击该道具即可进行使用>', 10, 89, '#CCCCCC', '14px Verdana');
    }

    core.canvas.ui.textAlign = 'right';
    var images = core.material.images.items;
    // 消耗道具
    var tools = Object.keys(core.status.hero.items.tools).sort();
    for (var i=0;i<tools.length;i++) {
        var tool=tools[i];
        var icon=core.material.icons.items[tool];
        if (i<6) {
            core.canvas.ui.drawImage(images, 0, icon.loc*icon.size, icon.size, icon.size, 16*(4*i+1)+5, 144+5, icon.size, icon.size)
            // 个数
            core.fillText('ui', core.itemCount(tool), 16*(4*i+1)+40, 144+38, '#FFFFFF', "bold 14px Verdana");
            if (selectId == tool)
                core.strokeRect('ui', 16*(4*i+1)+1, 144+1, icon.size+8, icon.size+8, '#FFD700');
        }
        else {
            core.canvas.ui.drawImage(images, 0, icon.loc*icon.size, icon.size, icon.size, 16*(4*(i-6)+1)+5, 144+64+5, icon.size, icon.size)
            if (selectId == tool)
                core.strokeRect('ui', 16*(4*(i-6)+1)+1, 144+64+1, icon.size+8, icon.size+8, '#FFD700');

        }
    }

    // 永久道具
    var constants = Object.keys(core.status.hero.items.constants).sort();
    for (var i=0;i<constants.length;i++) {
        var constant=constants[i];
        var icon=core.material.icons.items[constant];
        if (i<6) {
            core.canvas.ui.drawImage(images, 0, icon.loc*icon.size, icon.size, icon.size, 16*(4*i+1)+5, 304+5, icon.size, icon.size)
            // core.fillText('ui', core.itemCount(constant), 16*(4*i+1)+40, 304+38, '#FFFFFF', "bold 16px Verdana")
            if (selectId == constant)
                core.strokeRect('ui', 16*(4*i+1)+1, 304+1, icon.size+8, icon.size+8, '#FFD700');
        }
        else {
            core.canvas.ui.drawImage(images, 0, icon.loc*icon.size, icon.size, icon.size, 16*(4*(i-6)+1)+5, 304+64+5, icon.size, icon.size)
            if (selectId == constant)
                core.strokeRect('ui', 16*(4*(i-6)+1)+1, 304+64+1, icon.size+8, icon.size+8, '#FFD700');
        }
    }

    // 退出
    core.canvas.ui.textAlign = 'center';
    core.fillText('ui', '返回游戏', 370, 403,'#DDDDDD', 'bold 15px Verdana');

}

core.prototype.drawSLPanel = function(page) {

    if (page<0) page=0;
    if (page>=30) page=29;
    core.status.event.data = page;
    core.status.savePage = page;

    core.clearMap('ui', 0, 0, 416, 416);
    core.setAlpha('ui', 0.85);
    core.fillRect('ui', 0, 0, 416, 416, '#000000');
    core.setAlpha('ui', 1);
    core.canvas.ui.textAlign = 'center';

    var u=416/6, size=117;

    for (var i=0;i<6;i++) {
        var id=6*page+i+1;
        var data=core.getLocalStorage("save"+id,null);

        if (i<3) {
            core.fillText('ui', '存档'+id, (2*i+1)*u, 35, '#FFFFFF', "bold 17px Verdana");
            core.strokeRect('ui', (2*i+1)*u-size/2, 50, size, size, '#FFFFFF', 2);
            if (core.isset(data) && core.isset(data.floorId)) {
                core.drawThumbnail('ui', core.maps.load(data.maps[data.floorId]).blocks, (2*i+1)*u-size/2, 50, size, data.hero.loc);
                core.fillText('ui', core.formatDate(new Date(data.time)), (2*i+1)*u, 65+size, '#FFFFFF', '10px Verdana');
            }
            else {
                core.fillRect('ui', (2*i+1)*u-size/2, 50, size, size, '#333333', 2);
                core.fillText('ui', '空', (2*i+1)*u, 117, '#FFFFFF', 'bold 30px Verdana');
            }
        }
        else {
            core.fillText('ui', '存档'+id, (2*i-5)*u, 230, '#FFFFFF', "bold 17px Verdana");
            core.strokeRect('ui', (2*i-5)*u-size/2, 245, size, size, '#FFFFFF', 2);
            if (core.isset(data) && core.isset(data.floorId)) {
                core.drawThumbnail('ui', core.maps.load(data.maps[data.floorId]).blocks, (2*i-5)*u-size/2, 245, size, data.hero.loc);
                core.fillText('ui', core.formatDate(new Date(data.time)), (2*i-5)*u, 260+size, '#FFFFFF', '10px Verdana');
            }
            else {
                core.fillRect('ui', (2*i-5)*u-size/2, 245, size, size, '#333333', 2);
                core.fillText('ui', '空', (2*i-5)*u, 245+70, '#FFFFFF', 'bold 30px Verdana');
            }
        }
    }
    core.drawPagination(page+1, 30);
}

core.prototype.drawThumbnail = function(canvas, blocks, x, y, size, heroLoc) {
    core.clearMap(canvas, x, y, size, size);
    var persize = size/13;
    for (var i=0;i<13;i++) {
        for (var j=0;j<13;j++) {
            var blockIcon = core.material.icons.terrains.blackFloor;
            var blockImage = core.material.images.terrains;
            core.canvas[canvas].drawImage(blockImage, 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x + i * persize, y + j * persize, persize, persize);
        }
    }
    for (var b in blocks) {
        var block = blocks[b];
        if (core.isset(block.event)) {
            var i = block.x, j = block.y;
            var blockIcon = core.material.icons[block.event.cls][block.event.id];
            var blockImage = core.material.images[block.event.cls];
            //core.canvas[canvas].clearRect(x + i * persize, y + j * persize, persize, persize);
            core.canvas[canvas].drawImage(blockImage, 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x + i * persize, y + j * persize, persize, persize);
        }
    }
    if (core.isset(heroLoc)) {
        var heroIcon = core.material.icons.heros[core.status.hero.id][heroLoc.direction];
        core.canvas[canvas].drawImage(core.material.images.heros, heroIcon.loc['stop'] * heroIcon.size, heroIcon.loc.iconLoc * heroIcon.size, heroIcon.size, heroIcon.size, x+persize*heroLoc.x, y+persize*heroLoc.y, persize, persize);
    }
}

core.prototype.setStatus = function (statusName, statusVal) {
    if (core.isset(core.status.hero[statusName])) {
        core.status.hero[statusName] = statusVal;
    }
}

core.prototype.getStatus = function (statusName) {
    if (core.isset(core.status.hero[statusName])) {
        return core.status.hero[statusName];
    }
}

core.prototype.updateStatusBar = function () {
    // core.statusBar.floor.innerHTML = core.maps.maps[core.status.floorId].name;
    var statusList = ['hp', 'atk', 'def', 'mdef', 'money'];
    statusList.forEach(function (item) {
        core.statusBar[item].innerHTML = core.getStatus(item);
    });
    var keys = ['yellowKey', 'blueKey', 'redKey'];
    keys.forEach(function (key) {
        core.statusBar[key].innerHTML = core.setTwoDigits(core.status.hero.items.keys[key]);
    })
    core.statusBar.hard.innerHTML = "Hard: " + core.status.hard;
    if (core.hasItem('book')) {
        core.statusBar.image.book.style.opacity = 1;
    } else {
        core.statusBar.image.book.style.opacity = 0.3;
    }
    if (core.hasItem('fly')) {
        core.statusBar.image.fly.style.opacity = 1;
    } else {
        core.statusBar.image.fly.style.opacity = 0.3;
    }
    core.updateFg();
}

core.prototype.lockControl = function () {
    core.status.lockControl = true;
}

core.prototype.unLockControl = function () {
    core.status.lockControl = false;
}
/*
core.prototype.lockKeyBoard = function() {
	core.status.keyBoardLock = true;
}

core.prototype.unLockKeyBoard = function() {
	core.status.keyBoardLock = false;
}
*/

core.prototype.isset = function (val) {
    if (val == undefined || val == null) {
        return false;
    }
    return true
}

core.prototype.getClickLoc = function (x, y) {
    var statusBar = {'x': 0, 'y': 0};
    var size = 32;
    switch (core.status.screenMode) {
        case 'adaptive':
            var zoom = (422 - main.dom.body.clientWidth) / 4.22;
            statusBar.x = 0;
            statusBar.y = core.dom.statusBar.offsetHeight + 3 - zoom;
            size = size - size * zoom / 100;
            break;
        case 'vertical':
            statusBar.x = 0;
            statusBar.y = core.dom.statusBar.offsetHeight + 3;
            break;
        case 'horizontal':
            statusBar.x = core.dom.statusBar.offsetWidth + 3;
            statusBar.y = 0;
            break;
    }
    var left = core.dom.gameGroup.offsetLeft + statusBar.x;
    var top = core.dom.gameGroup.offsetTop + statusBar.y;
    return {'x': x - left, 'y': y - top, 'size': size};
}

core.prototype.playSound = function (soundName, soundType) {
    if (!core.musicStatus.soundStatus || !core.musicStatus.loaded) {
        return;
    }
    /*
    if (core.isset(core.musicStatus.playedSound)) {
        // core.musicStatus.playedSound.pause();
    }
    */
    core.musicStatus.playedSound = core.material.sounds[soundType][soundName];
    core.musicStatus.playedSound.play();
}

core.prototype.playBgm = function (bgmName, bgmType) {
    if (core.musicStatus.isIOS || !core.musicStatus.loaded) return;
    if (core.isset(core.musicStatus.playedBgm)) {
        core.musicStatus.playedBgm.pause();
    }
    core.musicStatus.playedBgm = core.material.sounds[bgmType][bgmName];
    if (core.musicStatus.soundStatus)
        core.musicStatus.playedBgm.play();
}

core.prototype.changeSoundStatus = function () {
    if (core.musicStatus.soundStatus) {
        main.core.disabledSound();
    }
    else {
        main.core.enabledSound();
    }
}

core.prototype.enabledSound = function () {
    // core.musicStatus.playedBgm.play();
    core.musicStatus.soundStatus = true;
    core.playBgm('bgm', 'mp3');
    core.setLocalStorage('soundStatus', true);
}

core.prototype.disabledSound = function () {
    core.musicStatus.playedBgm.pause();
    core.musicStatus.soundStatus = false;
    core.setLocalStorage('soundStatus', false);
}

core.prototype.show = function (obj, speed, callback) {
    if (!core.isset(speed)) {
        obj.style.display = 'block';
        return;
    }
    obj.style.display = 'block';
    obj.style.opacity = 0;
    var opacityVal = 0;
    var showAnimate = window.setInterval(function () {
        opacityVal += 0.03;
        obj.style.opacity = opacityVal;
        if (opacityVal > 1) {
            clearInterval(showAnimate);
            if (core.isset(callback)) {
                callback();
            }
        }
    }, speed);
}

core.prototype.hide = function (obj, speed, callback) {
    if (!core.isset(speed)) {
        obj.style.display = 'none';
        return;
    }
    var opacityVal = 1;
    var hideAnimate = window.setInterval(function () {
        opacityVal -= 0.03;
        obj.style.opacity = opacityVal;
        if (opacityVal < 0) {
            obj.style.display = 'none';
            clearInterval(hideAnimate);
            if (core.isset(callback)) {
                callback();
            }
        }
    }, speed);
}

core.prototype.resize = function (width, height) {

    // show image

    for (var x in core.statusBar.image) {
        core.statusBar.image[x].style.display = 'block';
    }

    var halfWidth = width / 2;
    if (width < 422) {
        var zoom = (422 - width) / 4.22;
        var scale = 1 - zoom / 100;
        var top = (84 - zoom);
        // var helfmoveBtnGroupWidth = (109 - zoom) / 2;
        core.dom.gameGroup.style.top = '3px';
        core.dom.gameGroup.style.left = '3px';
        core.dom.gameGroup.style.width = (width - 6) + 'px';
        core.dom.gameGroup.style.height = 555 * scale + 'px';
        //core.dom.startBackground.style.height = (top + width) + 'px';
        //core.dom.startButtonGroup.style.bottom = '15px';
        //core.dom.startButtonGroup.style.fontSize = '1rem';
        core.dom.floorMsgGroup.style.width = (width - 6) + 'px';
        core.dom.statusBar.style.width = (width - 6) + 'px';
        core.dom.statusBar.style.height = top + 'px';
        core.dom.statusBar.style.fontSize = 16 * scale + 'px';
        core.dom.toolBar.style.display = 'block';
        core.dom.toolBar.style.top = 503 * scale + 'px';
        core.dom.toolBar.style.width = (width - 6) + 'px';
        core.dom.toolBar.style.height = 49 * scale + 'px';
        for (var i = 0; i < core.dom.gameCanvas.length; i++) {
            core.dom.gameCanvas[i].style.borderTop = '3px #fff solid';
            core.dom.gameCanvas[i].style.borderLeft = '';
            core.dom.gameCanvas[i].style.top = top + 'px';
            core.dom.gameCanvas[i].style.left = '0px';
            core.dom.gameCanvas[i].style.right = '0px';
            core.dom.gameCanvas[i].style.width = (width - 6) + 'px';
            core.dom.gameCanvas[i].style.height = (width - 6) + 'px';
        }


        // Draw StatusBar

        // floor
        core.statusBar.image.floor.style.width = 32 * scale + "px";
        core.statusBar.image.floor.style.height = 32 * scale + "px";
        core.statusBar.image.floor.style.top = 8 * scale + "px";
        core.statusBar.image.floor.style.left = 8 * scale + "px";
        core.statusBar.floor.style.top = 16 * scale + "px";
        core.statusBar.floor.style.left = 48 * scale + "px";
        // hp
        core.statusBar.image.heart.style.width = 32 * scale + "px";
        core.statusBar.image.heart.style.height = 32 * scale + "px";
        core.statusBar.image.heart.style.top = 8 * scale + "px";
        core.statusBar.image.heart.style.left = 90 * scale + "px";
        core.statusBar.hp.style.top = 16 * scale + "px";
        core.statusBar.hp.style.left = 130 * scale + "px";
        // atk
        core.statusBar.image.atk.style.width = 32 * scale + "px";
        core.statusBar.image.atk.style.height = 32 * scale + "px";
        core.statusBar.image.atk.style.top = 8 * scale + "px";
        core.statusBar.image.atk.style.left = 210 * scale + "px";
        core.statusBar.atk.style.top = 16 * scale + "px";
        core.statusBar.atk.style.left = 246 * scale + "px";
        // def
        core.statusBar.image.def.style.width = 32 * scale + "px";
        core.statusBar.image.def.style.height = 32 * scale + "px";
        core.statusBar.image.def.style.top = 8 * scale + "px";
        core.statusBar.image.def.style.left = 316 * scale + "px";
        core.statusBar.def.style.top = 16 * scale + "px";
        core.statusBar.def.style.left = 352 * scale + "px";
        // mdef
        core.statusBar.image.mdef.style.width = 32 * scale + "px";
        core.statusBar.image.mdef.style.height = 32 * scale + "px";
        core.statusBar.image.mdef.style.top = 44 * scale + "px";
        core.statusBar.image.mdef.style.left = 8 * scale + "px";
        core.statusBar.mdef.style.top = 52 * scale + "px";
        core.statusBar.mdef.style.left = 48 * scale + "px";
        // money
        core.statusBar.image.money.style.width = 32 * scale + "px";
        core.statusBar.image.money.style.height = 32 * scale + "px";
        core.statusBar.image.money.style.top = 44 * scale + "px";
        core.statusBar.image.money.style.left = 138 * scale + "px";
        core.statusBar.money.style.top = 52 * scale + "px";
        core.statusBar.money.style.left = 178 * scale + "px";
        // keys
        core.statusBar.yellowKey.style.top = 52 * scale + "px";
        core.statusBar.yellowKey.style.left = 268 * scale + "px";
        core.statusBar.blueKey.style.top = 52 * scale + "px";
        core.statusBar.blueKey.style.left = 308 * scale + "px";
        core.statusBar.redKey.style.top = 52 * scale + "px";
        core.statusBar.redKey.style.left = 348 * scale + "px";
        // book
        core.statusBar.image.book.style.width = 32 * scale + "px";
        core.statusBar.image.book.style.height = 32 * scale + "px";
        core.statusBar.image.book.style.top = 516 * scale + "px";
        core.statusBar.image.book.style.left = 8 * scale + "px";
        // fly
        core.statusBar.image.fly.style.width = 32 * scale + "px";
        core.statusBar.image.fly.style.height = 32 * scale + "px";
        core.statusBar.image.fly.style.top = 516 * scale + "px";
        core.statusBar.image.fly.style.left = 54 * scale + "px";
        // toolbox
        core.statusBar.image.toolbox.style.width = 32 * scale + "px";
        core.statusBar.image.toolbox.style.height = 32 * scale + "px";
        core.statusBar.image.toolbox.style.top = 516 * scale + "px";
        core.statusBar.image.toolbox.style.left = 100 * scale + "px";
        // save
        core.statusBar.image.save.style.width = 32 * scale + "px";
        core.statusBar.image.save.style.height = 32 * scale + "px";
        core.statusBar.image.save.style.top = 516 * scale + "px";
        core.statusBar.image.save.style.left = 146 * scale + "px";
        // load
        core.statusBar.image.load.style.width = 32 * scale + "px";
        core.statusBar.image.load.style.height = 32 * scale + "px";
        core.statusBar.image.load.style.top = 516 * scale + "px";
        core.statusBar.image.load.style.left = 192 * scale + "px";
        // setting
        core.statusBar.image.settings.style.width = 32 * scale + "px";
        core.statusBar.image.settings.style.height = 32 * scale + "px";
        core.statusBar.image.settings.style.top = 516 * scale + "px";
        core.statusBar.image.settings.style.left = 238 * scale + "px";
        // hard
        core.statusBar.hard.style.top = 522 * scale + "px";
        core.statusBar.hard.style.left = 300 * scale + "px";

        core.status.screenMode = 'adaptive';
        console.log('已调整为自适应屏');
    }
    else if (width < 548) {
        core.dom.gameGroup.style.left = (halfWidth - 208) + 'px';
        core.dom.gameGroup.style.top = '3px';
        core.dom.gameGroup.style.width = '416px';
        core.dom.gameGroup.style.height = '555px';
        //core.dom.startBackground.style.height = '548px';
        //core.dom.startButtonGroup.style.bottom = '20px';
        //core.dom.startButtonGroup.style.fontSize = '1.2rem';
        core.dom.floorMsgGroup.style.width = '416px';
        core.dom.statusBar.style.width = '416px';
        core.dom.statusBar.style.height = '84px';
        core.dom.statusBar.style.fontSize = '16px';
        core.dom.toolBar.style.display = 'block';
        core.dom.toolBar.style.top = '503px';
        core.dom.toolBar.style.width = '416px';
        core.dom.toolBar.style.height = '49px';

        for (var i = 0; i < core.dom.gameCanvas.length; i++) {
            core.dom.gameCanvas[i].style.borderTop = '3px #fff solid';
            core.dom.gameCanvas[i].style.borderLeft = '';
            core.dom.gameCanvas[i].style.top = '84px';
            core.dom.gameCanvas[i].style.left = '0px';
            core.dom.gameCanvas[i].style.right = '0px';
            core.dom.gameCanvas[i].style.width = '416px';
            core.dom.gameCanvas[i].style.height = '416px';
        }


        // Draw StatusBar

        // floor
        core.statusBar.image.floor.style.width = "32px";
        core.statusBar.image.floor.style.height = "32px";
        core.statusBar.image.floor.style.top = "8px";
        core.statusBar.image.floor.style.left = "8px";
        core.statusBar.floor.style.top = "16px";
        core.statusBar.floor.style.left = "48px";
        // hp
        core.statusBar.image.heart.style.width = "32px";
        core.statusBar.image.heart.style.height = "32px";
        core.statusBar.image.heart.style.top = "8px";
        core.statusBar.image.heart.style.left = "90px";
        core.statusBar.hp.style.top = "16px";
        core.statusBar.hp.style.left = "130px";
        // atk
        core.statusBar.image.atk.style.width = "32px";
        core.statusBar.image.atk.style.height = "32px";
        core.statusBar.image.atk.style.top = "8px";
        core.statusBar.image.atk.style.left = "210px";
        core.statusBar.atk.style.top = "16px";
        core.statusBar.atk.style.left = "246px";
        // def
        core.statusBar.image.def.style.width = "32px";
        core.statusBar.image.def.style.height = "32px";
        core.statusBar.image.def.style.top = "8px";
        core.statusBar.image.def.style.left = "316px";
        core.statusBar.def.style.top = "16px";
        core.statusBar.def.style.left = "352px";
        // mdef
        core.statusBar.image.mdef.style.width = "32px";
        core.statusBar.image.mdef.style.height = "32px";
        core.statusBar.image.mdef.style.top = "44px";
        core.statusBar.image.mdef.style.left = "8px";
        core.statusBar.mdef.style.top = "52px";
        core.statusBar.mdef.style.left = "48px";
        // money
        core.statusBar.image.money.style.width = "32px";
        core.statusBar.image.money.style.height = "32px";
        core.statusBar.image.money.style.top = "44px";
        core.statusBar.image.money.style.left = "138px";
        core.statusBar.money.style.top = "52px";
        core.statusBar.money.style.left = "178px";
        // keys
        core.statusBar.yellowKey.style.top = "52px";
        core.statusBar.yellowKey.style.left = "268px";
        core.statusBar.blueKey.style.top = "52px";
        core.statusBar.blueKey.style.left = "308px";
        core.statusBar.redKey.style.top = "52px";
        core.statusBar.redKey.style.left = "348px";
        // book
        core.statusBar.image.book.style.width = "32px";
        core.statusBar.image.book.style.height = "32px";
        core.statusBar.image.book.style.top = "514px";
        core.statusBar.image.book.style.left = "8px";
        // fly
        core.statusBar.image.fly.style.width = "32px";
        core.statusBar.image.fly.style.height = "32px";
        core.statusBar.image.fly.style.top = "514px";
        core.statusBar.image.fly.style.left = "54px";
        // toolbox
        core.statusBar.image.toolbox.style.width = "32px";
        core.statusBar.image.toolbox.style.height = "32px";
        core.statusBar.image.toolbox.style.top = "516px";
        core.statusBar.image.toolbox.style.left = "100px";
        // save
        core.statusBar.image.save.style.width = "32px";
        core.statusBar.image.save.style.height = "32px";
        core.statusBar.image.save.style.top = "516px";
        core.statusBar.image.save.style.left = "146px";
        // load
        core.statusBar.image.load.style.width = "32px";
        core.statusBar.image.load.style.height = "32px";
        core.statusBar.image.load.style.top = "516px";
        core.statusBar.image.load.style.left = "192px";
        // setting
        core.statusBar.image.settings.style.width = "32px";
        core.statusBar.image.settings.style.height = "32px";
        core.statusBar.image.settings.style.top = "516px";
        core.statusBar.image.settings.style.left = "238px";
        // hard
        core.statusBar.hard.style.top = "522px";
        core.statusBar.hard.style.left = "300px";

        core.status.screenMode = 'vertical';
        console.log('已调整为竖屏');
    }
    else {
        core.dom.gameGroup.style.left = (halfWidth - 274) + 'px';
        core.dom.gameGroup.style.top = (height / 2 - 208) + 'px';
        core.dom.gameGroup.style.width = '548px';
        core.dom.gameGroup.style.height = '416px';
        //core.dom.startBackground.style.height = '416px';
        //core.dom.startButtonGroup.style.bottom = '20px';
        //core.dom.startButtonGroup.style.fontSize = '1.4rem';
        core.dom.floorMsgGroup.style.width = '416px';
        core.dom.statusBar.style.width = '129px';
        core.dom.statusBar.style.height = '416px';
        core.dom.statusBar.style.fontSize = '16px';
        core.dom.toolBar.style.display = 'none';
        for (var i = 0; i < core.dom.gameCanvas.length; i++) {
            core.dom.gameCanvas[i].style.borderTop = '';
            core.dom.gameCanvas[i].style.borderLeft = '3px #fff solid';
            core.dom.gameCanvas[i].style.top = '0px';
            core.dom.gameCanvas[i].style.left = '129px';
            core.dom.gameCanvas[i].style.right = '0px';
            core.dom.gameCanvas[i].style.width = '416px';
            core.dom.gameCanvas[i].style.height = '416px';
        }

        // Draw StatusBar

        // floor
        core.statusBar.image.floor.style.width = "32px";
        core.statusBar.image.floor.style.height = "32px";
        core.statusBar.image.floor.style.top = "20px";
        core.statusBar.image.floor.style.left = "8px";
        core.statusBar.floor.style.top = "30px";
        core.statusBar.floor.style.left = "50px";
        // hp
        core.statusBar.image.heart.style.width = "32px";
        core.statusBar.image.heart.style.height = "32px";
        core.statusBar.image.heart.style.top = "60px";
        core.statusBar.image.heart.style.left = "8px";
        core.statusBar.hp.style.top = "68px";
        core.statusBar.hp.style.left = "50px";
        // atk
        core.statusBar.image.atk.style.width = "32px";
        core.statusBar.image.atk.style.height = "32px";
        core.statusBar.image.atk.style.top = "100px";
        core.statusBar.image.atk.style.left = "8px";
        core.statusBar.atk.style.top = "108px";
        core.statusBar.atk.style.left = "50px";
        // def
        core.statusBar.image.def.style.width = "32px";
        core.statusBar.image.def.style.height = "32px";
        core.statusBar.image.def.style.top = "140px";
        core.statusBar.image.def.style.left = "8px";
        core.statusBar.def.style.top = "148px";
        core.statusBar.def.style.left = "50px";
        // mdef
        core.statusBar.image.mdef.style.width = "32px";
        core.statusBar.image.mdef.style.height = "32px";
        core.statusBar.image.mdef.style.top = "180px";
        core.statusBar.image.mdef.style.left = "8px";
        core.statusBar.mdef.style.top = "188px";
        core.statusBar.mdef.style.left = "50px";
        // money
        core.statusBar.image.money.style.width = "32px";
        core.statusBar.image.money.style.height = "32px";
        core.statusBar.image.money.style.top = "220px";
        core.statusBar.image.money.style.left = "8px";
        core.statusBar.money.style.top = "228px";
        core.statusBar.money.style.left = "50px";
        // keys
        core.statusBar.yellowKey.style.top = "268px";
        core.statusBar.yellowKey.style.left = "8px";
        core.statusBar.blueKey.style.top = "268px";
        core.statusBar.blueKey.style.left = "50px";
        core.statusBar.redKey.style.top = "268px";
        core.statusBar.redKey.style.left = "92px";
        // book
        core.statusBar.image.book.style.width = "32px";
        core.statusBar.image.book.style.height = "32px";
        core.statusBar.image.book.style.top = "303px";
        core.statusBar.image.book.style.left = "8px";
        // fly
        core.statusBar.image.fly.style.width = "32px";
        core.statusBar.image.fly.style.height = "32px";
        core.statusBar.image.fly.style.top = "303px";
        core.statusBar.image.fly.style.left = "50px";
        // toolbox
        core.statusBar.image.toolbox.style.width = "32px";
        core.statusBar.image.toolbox.style.height = "32px";
        core.statusBar.image.toolbox.style.top = "303px";
        core.statusBar.image.toolbox.style.left = "92px";
        // save
        core.statusBar.image.save.style.width = "32px";
        core.statusBar.image.save.style.height = "32px";
        core.statusBar.image.save.style.top = "343px";
        core.statusBar.image.save.style.left = "8px";
        // load
        core.statusBar.image.load.style.width = "32px";
        core.statusBar.image.load.style.height = "32px";
        core.statusBar.image.load.style.top = "343px";
        core.statusBar.image.load.style.left = "50px";
        // setting
        core.statusBar.image.settings.style.width = "32px";
        core.statusBar.image.settings.style.height = "32px";
        core.statusBar.image.settings.style.top = "343px";
        core.statusBar.image.settings.style.left = "92px";
        // hard
        core.statusBar.hard.style.left = "22px";
        core.statusBar.hard.style.top = "383px";

        core.status.screenMode = 'horizontal';
        console.log('已调整为横屏');
    }
    // core.dom.startBackground.style.left = '-' + ((core.dom.startBackground.offsetWidth - core.dom.gameGroup.offsetWidth) / 2) + 'px';
}

/**
 * 系统机制 end
 */

var core = new core();
main.instance.core = core;
