/**
 * 初始化 start
 */

function core() {
	this.dom = {};
	this.statusBar = {};
	this.canvas = {};
	this.images = {};
	this.firstData = {};
	this.material = {
		'images': {
			'25': {},
			'32': {},
			'64': {}
		},
		'sounds': {
			'mp3': {},
			'ogg': {}
		},
		'items': {},
		'enemys': {},
		'maps': {},
		'icons': {},
		'events': {}
	}
	this.timeout = {
		'loadSoundTimeout': null,
		'getItemTipTimeout': null
	}
	this.interval = {
		'twoAnimate': null,
		'fourAnimate': null,
		'changeAnimate': null,
		'heroMoveTriggerInterval': null,
		'heroMoveInterval': null,
		'heroAutoMoveScan': null,
		'getItemAnimate': [],
		'getItemTipAnimate': null,
		'openDoorAnimate': null
	}
	this.status = {
		'hero': {
            'id': '',
            'name': '',
			'floor': 0,
			'hp': 0,
			'atk': 0,
			'def': 0,
			'mdef': 0,
			'gold': 0,
		},
		'hard': 10,
		'played': false,
		'soundStatus': true,
		'heroMoving': false,
		'heroStop': true,
		'lockControl': false,
		'keyBoardLock': false,
		'mouseLock': false,
		'autoHeroMove': false,
		'automaticRouting': false,
		'automaticRoued': false,
		'screenMode': 'adaptive'
	}
	this.temp = {
		'itemList': [],
		'thisMap': null,
		'playedSound': null,
		'playedBgm': null,
		'twoAnimateObjs': [],
		'fourAnimateObjs': [],
		'openingDoor': null,
		'heroLoc': {'direction': 'down', 'x': 0, 'y': 1},
		'autoStep': 0,
		'movedStep': 0,
		'destStep': 0,
		'automaticRoutingTemp': {'destX': 0, 'destY': 0, 'moveStep': []}
	}
}

core.prototype.init = function(dom, statusBar, canvas, images, sounds, firstData, coreData) {
	core.dom = dom;
	core.statusBar = statusBar;
	core.canvas = canvas;
	core.images = images;
	core.sounds = sounds;
	core.firstData = firstData;
	for(var key in coreData) {
		core[key] = coreData[key];
	}
	core.dom.versionLabel.innerHTML = firstData.version;
	core.material.items = core.items.getItems();
	core.material.maps = core.maps.getMaps();
	core.material.enemys = core.enemys.getEnemys();
	core.material.icons = core.icons.getIcons();
	core.material.events = core.events.getEvents();

	// test if iOS
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
		console.log("你的设备为iphone，不自动播放音乐！");
		core.status.soundStatus = false;
	}

	core.loader(function() {

		console.log("播放控制...");
		if (core.status.soundStatus) {
			console.log('播放！');
            core.playBgm('bgm', 'mp3');
            console.log('成功播放！');
            core.dom.musicBtn.src = core.material.images['25'].musicPlayed.src;
		}
		else {
			console.log('不播放...');
            core.dom.musicBtn.src = core.material.images['25'].musicPaused.src;
		}

		/*
		core.showStartAnimate(function() {
			
		});
		*/
		console.log('游戏开始！');
		core.playGame();


	});
}

core.prototype.showStartAnimate = function(callback) {
	var opacityVal = 1;
	var startAnimate = window.setInterval(function() {
		opacityVal -= 0.03;
		if(opacityVal < 0) {
			clearInterval(startAnimate);
			core.dom.startTop.style.display = 'none';
			core.playGame();
			// core.dom.startButtonGroup.style.display = 'block';
			callback();
		}
		core.dom.startTop.style.opacity = opacityVal;
	}, 30);
}

core.prototype.hideStartAnimate = function(callback) {
	var opacityVal = 1;
	var startAnimate = window.setInterval(function() {
		opacityVal -= 0.03;
		if(opacityVal < 0) {
			clearInterval(startAnimate);
			core.dom.startPanel.style.display = 'none';
			callback();
		}
		core.dom.startPanel.style.opacity = opacityVal;
	}, 30);
}

core.prototype.setStartProgressVal = function(val) {
	core.dom.startTopProgress.style.width = val + '%';
}

core.prototype.setStartLoadTipText = function(text) {
	core.dom.startTopLoadTips.innerHTML = text;
}

core.prototype.loader = function(callback) {
	var loadedImageNum = 0, allImageNum = 0, loadSoundNum = 0, allSoundNum = 0;
	for(var key in core.images) {
		allImageNum += core.images[key].length;
	}
	for(var key in core.sounds) {
		allSoundNum += core.sounds[key].length;
	}
	for(var key in core.images) {
		for(var i = 0;i < core.images[key].length;i++) {
			core.loadImage(core.images[key][i] + '-' + key + 'x' + key, key, function(imgName, imgSize, image) {
				imgName = imgName.split('-');
				imgName = imgName[0];
				core.material.images[imgSize][imgName] = image;
				loadedImageNum++;
				core.setStartLoadTipText(imgName + ' 加载完毕...');
				core.setStartProgressVal(loadedImageNum * (100 / allImageNum));
				if(loadedImageNum == allImageNum) {
					core.setStartLoadTipText('图片资源加载完毕，加载音频中...');
					core.setStartProgressVal(0);
					for(var key in core.sounds) {
						for(var i = 0;i < core.sounds[key].length;i++) {
							core.loadSound(core.sounds[key][i], key, function(soundName, soundType, sound) {
								clearTimeout(core.timeout.loadSoundTimeout);
								soundName = soundName.split('-');
								soundName = soundName[0];
								core.material.sounds[soundType][soundName] = sound;
								loadSoundNum++;
								core.setStartLoadTipText(soundName + ' 加载完毕...');
								core.setStartProgressVal(loadSoundNum * (100 / allSoundNum));
								if(loadSoundNum == allSoundNum) {
									core.setStartLoadTipText('音乐资源加载完毕');
									callback();
								}
							});
						}
					}
				}
			});
		}
	}
	console.log(core.material);
}

core.prototype.loadImage = function(imgName, imgSize, callback) {
	core.setStartLoadTipText('加载 ' + imgName + ' 中...');
	var image = new Image();
	image.src = 'images/' + imgName + '.png';
	if(image.complete) {
		callback(imgName, imgSize, image);
		return;
	}
	image.onload = function() {
		callback(imgName, imgSize, image);
	}
}

core.prototype.loadSound = function(soundName, soundType, callback) {
	soundName = soundName.split('-');
	core.setStartLoadTipText('加载 ' + soundName[0] + ' 中...');
	var sound = new Audio('audio');
	sound.src = 'sounds/' + soundName[0] + '.' + soundType;
	if(soundName[1] == 'loop') {
		sound.loop = 'loop';
	}
	if(!('oncanplaythrough' in document ? true : false)) {
		callback(soundName[0], soundType, sound);
		return;
	}
	sound.oncanplaythrough = function() {
		callback(soundName[0], soundType, sound);
	}
	core.timeout.loadSoundTimeout = window.setTimeout(function() {
		callback(soundName[0], soundType, sound);
	}, 15000);
}

core.prototype.playGame = function() {
	if(core.status.played) {
		return;
	}
	core.status.played = true;
	console.log('开始游戏');
	core.setFirstItem();
	core.setFloorName(core.firstData.floor);
	core.updateStatus();
	core.hideStartAnimate(function() {
		core.drawMap(core.firstData.floor, function() {
			core.playSound('floor', 'mp3');
			core.hide(core.dom.floorMsgGroup, 10);
			core.setHeroLoc('direction', core.firstData.heroLoc.direction);
			core.setHeroLoc('x', core.firstData.heroLoc.x);
			core.setHeroLoc('y', core.firstData.heroLoc.y);
			core.drawHero(core.getHeroLoc('direction'), core.getHeroLoc('x'), core.getHeroLoc('y'), 'stop');
			core.setHeroMoveTriggerInterval();
		});
	});
}

core.prototype.keyDown = function(e) {
	if(!core.status.played || core.status.keyBoardLock) {
		return;
	}
	if(core.status.automaticRouting || core.status.automaticRoued) {
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

core.prototype.musicBtnClick = function() {
	core.changeSoundStatus();
}

/**
 * 初始化 end
 */

/**
 * 寻路代码 start
 */

core.prototype.clearAutomaticRouteNode = function(x, y) {
	core.canvas.data.clearRect(x * 32 + 5, y * 32 + 5, 27, 27);
}

core.prototype.stopAutomaticRoute = function() {
	if(!core.status.played) {
		return;
	}
	core.stopAutoHeroMove();
	core.status.automaticRouting = false;
	core.status.automaticRoued = false;
	core.temp.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};
	core.canvas.data.clearRect(0, 0, 416, 416);
}

core.prototype.setAutomaticRoute = function(destX, destY) {
	if(!core.status.played || core.status.mouseLock) {
		return;
	}
	else if(core.status.automaticRouting) {
		core.stopAutomaticRoute();
		return;
	}
	if(core.temp.automaticRoutingTemp.moveStep.length != 0 && core.temp.automaticRoutingTemp.destX == destX && core.temp.automaticRoutingTemp.destY == destY) {
		core.status.automaticRouting = true;
		core.setAutoHeroMove(core.temp.automaticRoutingTemp.moveStep);
		core.temp.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};
		return;
	}
	var step = 0;
	var tempStep = null;
	var moveStep;
	core.temp.automaticRoutingTemp = {'destX': 0, 'destY': 0, 'moveStep': []};
	if(!(moveStep = core.automaticRoute(destX, destY))) {
		core.canvas.data.clearRect(0, 0, 416, 416);
		return false;
	}
	core.temp.automaticRoutingTemp.destX = destX;
	core.temp.automaticRoutingTemp.destY = destY;
	core.canvas.data.save();
	core.canvas.data.clearRect(0, 0, 416, 416);
	core.canvas.data.fillStyle = '#bfbfbf';
	core.canvas.data.strokeStyle = '#bfbfbf';
	core.canvas.data.lineWidth = 8;
	for(var m = 0;m < moveStep.length;m++) {
		if(tempStep == null) {
			step++;
			tempStep = moveStep[m].direction;
		}
		else if(tempStep == moveStep[m].direction) {
			step++;
		}
		else {
			core.temp.automaticRoutingTemp.moveStep.push({'direction': tempStep, 'step': step});
			step = 1;
			tempStep = moveStep[m].direction;
		}
		if(m == moveStep.length - 1) {
			core.temp.automaticRoutingTemp.moveStep.push({'direction': tempStep, 'step': step});
			core.canvas.data.fillRect(moveStep[m].x * 32 + 10, moveStep[m].y * 32 + 10, 12, 12);
		}
		else {
			core.canvas.data.beginPath();
			if(core.isset(moveStep[m + 1]) && tempStep != moveStep[m + 1].direction) {
				if(tempStep == 'up' && moveStep[m + 1].direction == 'left' || tempStep == 'right' && moveStep[m + 1].direction == 'down') {
					core.canvas.data.moveTo(moveStep[m].x * 32 + 5, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 27);
				}
				else if(tempStep == 'up' && moveStep[m + 1].direction == 'right' || tempStep == 'left' && moveStep[m + 1].direction == 'down') {
					core.canvas.data.moveTo(moveStep[m].x * 32 + 27, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 27);
				}
				else if(tempStep == 'left' && moveStep[m + 1].direction == 'up' || tempStep == 'down' && moveStep[m + 1].direction == 'right') {
					core.canvas.data.moveTo(moveStep[m].x * 32 + 27, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 5);
				}
				else if(tempStep == 'right' && moveStep[m + 1].direction == 'up' || tempStep == 'down' && moveStep[m + 1].direction == 'left') {
					core.canvas.data.moveTo(moveStep[m].x * 32 + 5, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 5);
				}
				core.canvas.data.stroke();
				continue;
			}
			switch(tempStep) {
				case 'up':
				case 'down':
					core.canvas.data.beginPath();
					core.canvas.data.moveTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 5);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 16, moveStep[m].y * 32 + 27);
					core.canvas.data.stroke();
				break;
				case 'left':
				case 'right':
					core.canvas.data.beginPath();
					core.canvas.data.moveTo(moveStep[m].x * 32 + 5, moveStep[m].y * 32 + 16);
					core.canvas.data.lineTo(moveStep[m].x * 32 + 27, moveStep[m].y * 32 + 16);
					core.canvas.data.stroke();
				break;
			}
		}
	}
	core.canvas.data.restore();
	core.status.automaticRoued = true;
}
// BFS
core.prototype.automaticRoute = function(destX, destY) {
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

    if (destX==startX && destY==startY) return false;
    queue.push(13*startX+startY);
    route[13*startX+startY] = '';

    while (queue.length!=0) {
    	var f = queue.shift();
    	var nowX = parseInt(f/13), nowY = f%13;

        for(var direction in scan) {
            var nx = nowX + scan[direction].x;
            var ny = nowY + scan[direction].y;
            var nid = 13*nx+ny;

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
        if (core.isset(route[13*destX+destY])) break;
	}

	if (!core.isset(route[13*destX+destY])) {
    	return false;
	}

	var nowX = destX, nowY = destY;
    while (nowX!=startX || nowY!=startY) {
    	var dir = route[13*nowX+nowY];
    	ans.push({'direction': dir, 'x': nowX, 'y': nowY});
    	nowX-=scan[dir].x;
    	nowY-=scan[dir].y;
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

core.prototype.stopAutoHeroMove = function() {
	core.status.autoHeroMove = false;
	core.status.automaticRouting = false;
	core.status.automaticRoued = false;
	core.temp.autoStep = 0;
	core.temp.destStep = 0;
	core.temp.movedStep = 0;
	core.stopHero();
	clearInterval(core.interval.heroAutoMoveScan);
}

core.prototype.setAutoHeroMove = function(steps, start) {
	if(steps.length == 0) {
		return;
	}
	core.temp.autoStep = 0;
	clearInterval(core.interval.heroAutoMoveScan);
	core.interval.heroAutoMoveScan = window.setInterval(function() {
		if(!core.status.autoHeroMove) {
			if(core.temp.autoStep == steps.length) {
				core.stopAutoHeroMove();
				return;
			}
			core.autoHeroMove(steps[core.temp.autoStep].direction, steps[core.temp.autoStep].step);
			core.temp.autoStep++;
		}
	}, 100);
}

core.prototype.autoHeroMove = function(direction, step) {
	core.status.autoHeroMove = true;
	core.temp.destStep = step;
	core.moveHero(direction);
}

/**
 * 自动行走 end
 */

 /**
  * 行走控制 start
  */

core.prototype.setHeroMoveInterval = function(direction, x, y, callback) {
	if(core.status.heroMoving) {
		return;
	}
	core.status.heroMoving = true;
	var moveStep = 0;
	core.interval.heroMoveInterval = window.setInterval(function() {
		switch(direction) {
			case 'up':
				moveStep -= 4;
				if(moveStep == -4 || moveStep == -8 || moveStep == -12 || moveStep == -16) {
					core.drawHero(direction, x, y, 'leftFoot', 0, moveStep);
				}
				else if(moveStep == -20 || moveStep == -24 ||moveStep == -28 || moveStep == -32) {
					core.drawHero(direction, x, y, 'rightFoot', 0, moveStep);
				}
				if(moveStep == -32) {
					core.setHeroLoc('y', '--');
					if(core.status.heroStop) {
						core.drawHero(direction, x, y - 1, 'stop');
					}
					if(core.isset(callback)) {
						callback();
					}
				}
			break;
			case 'left':
				moveStep -= 4;
				if(moveStep == -4 || moveStep == -8 || moveStep == -12 || moveStep == -16) {
					core.drawHero(direction, x, y, 'leftFoot', moveStep);
				}
				else if(moveStep == -20 || moveStep == -24 ||moveStep == -28 || moveStep == -32) {
					core.drawHero(direction, x, y, 'rightFoot', moveStep);
				}
				if(moveStep == -32) {
					core.setHeroLoc('x', '--');
					if(core.status.heroStop) {
						core.drawHero(direction, x - 1, y, 'stop');
					}
					if(core.isset(callback)) {
						callback();
					}
				}
			break;
			case 'down':
				moveStep += 4;
				if(moveStep == 4 || moveStep == 8 || moveStep == 12 || moveStep == 16) {
					core.drawHero(direction, x, y, 'leftFoot', 0, moveStep);
				}
				else if(moveStep == 20 || moveStep == 24 ||moveStep == 28 || moveStep == 32) {
					core.drawHero(direction, x, y, 'rightFoot', 0, moveStep);
				}
				if(moveStep == 32) {
					core.setHeroLoc('y', '++');
					if(core.status.heroStop) {
						core.drawHero(direction, x, y + 1, 'stop');
					}
					if(core.isset(callback)) {
						callback();
					}
				}
			break;
			case 'right':
				moveStep += 4;
				if(moveStep == 4 || moveStep == 8 || moveStep == 12 || moveStep == 16) {
					core.drawHero(direction, x, y, 'leftFoot', moveStep);
				}
				else if(moveStep == 20 || moveStep == 24 ||moveStep == 28 || moveStep == 32) {
					core.drawHero(direction, x, y, 'rightFoot', moveStep);
				}
				if(moveStep == 32) {
					core.setHeroLoc('x', '++');
					if(core.status.heroStop) {
						core.drawHero(direction, x + 1, y, 'stop');
					}
					if(core.isset(callback)) {
						callback();
					}
				}
			break;
		}
	}, 16.7);
}

core.prototype.setHeroMoveTriggerInterval = function() {
	var direction, x, y;
	var scan = {'up': {'x': 0, 'y': -1}, 'left': {'x': -1, 'y': 0}, 'down': {'x': 0, 'y': 1}, 'right': {'x': 1, 'y': 0}};
	core.interval.heroMoveTriggerInterval = window.setInterval(function() {
		if(!core.status.heroStop) {
			direction = core.getHeroLoc('direction');
			x = core.getHeroLoc('x');
			y = core.getHeroLoc('y');
			var noPass;
			noPass = core.noPass(x + scan[direction].x, y + scan[direction].y);
			if(noPass) {
				core.trigger(x + scan[direction].x, y + scan[direction].y);
				core.drawHero(direction, x, y, 'stop');
				if(core.status.autoHeroMove) {
					core.temp.movedStep++;
					if(core.temp.destStep == core.temp.movedStep) {
						core.status.autoHeroMove = false;
						core.temp.destStep = 0;
						core.temp.movedStep = 0;
						core.stopHero();
					}
				}
				else {
					core.lockKeyBoard();
					core.status.heroStop = true;
				}
				return;
			}
			core.setHeroMoveInterval(direction, x, y, function() {
				if(core.status.autoHeroMove) {
					core.temp.movedStep++;
					if(core.temp.destStep == core.temp.movedStep) {
						core.status.autoHeroMove = false;
						core.temp.destStep = 0;
						core.temp.movedStep = 0;
						core.stopHero();
						core.drawHero(core.getHeroLoc('direction'), core.getHeroLoc('x'), core.getHeroLoc('y'), 'stop');
					}
				}
				if(core.status.heroStop) {
					core.drawHero(core.getHeroLoc('direction'), core.getHeroLoc('x'), core.getHeroLoc('y'), 'stop');
				}
				core.trigger(core.getHeroLoc('x'), core.getHeroLoc('y'));
				clearInterval(core.interval.heroMoveInterval);
				core.status.heroMoving = false;
			});
		}
	}, 10);
}

core.prototype.moveHero = function(direction) {
	var heroIcon = core.material.icons.heros[core.firstData.heroId][direction];
	core.setHeroLoc('direction', direction);
	core.status.heroStop = false;
}

core.prototype.stopHero = function() {
	core.status.heroStop = true;
}

core.prototype.drawHero = function(direction, x, y, status, offsetX, offsetY) {
	offsetX = offsetX || 0;
	offsetY = offsetY || 0;
	core.clearAutomaticRouteNode(x, y);
	var heroIcon = core.material.icons.heros[core.firstData.heroId][direction];
	x = x * heroIcon.size;
	y = y * heroIcon.size;
	core.canvas.hero.clearRect(x - 32, y - 32, 96, 96);
	core.canvas.hero.drawImage(core.material.images[heroIcon.size].heros, heroIcon.loc[status] * heroIcon.size, heroIcon.loc.iconLoc * heroIcon.size, heroIcon.size, heroIcon.size, x + offsetX, y + offsetY, heroIcon.size, heroIcon.size);
}

/**
 * 行走控制 end
 */

/**
 * 地图处理 start
 */

core.prototype.openDoor = function (id, x, y, needKey) {
    // core.lockControl();
    core.stopHero();
    core.stopAutoHeroMove();
    core.stopAutomaticRoute();
	if (needKey) {
		var key = id.replace("Door","Key");
		if (!core.hasItem(key)) {
			if (key=="yellowKey" || key=="blueKey" || key=="redKey")
				core.drawTip("你没有"+core.material.items[key].name+"！", "normal");
			else core.drawTip("无法开启此门。");
			return;
		}
		else
			core.useItem(key);
	}
	// open
	core.playSound("door","ogg");
	var state = 0;
	var door = core.material.icons.animates[id];
	core.interval.openDoorAnimate = window.setInterval(function() {
        state++;
        if (state==4) {
        	clearInterval(core.interval.openDoorAnimate);
			core.removeBlock('event',x,y);
        	return;
		}
        core.canvas.event.clearRect(32*x, 32*y, 32, 32);
		core.canvas.event.drawImage(core.material.images['32'].animates, 32*state, 32*door.loc, 32, 32, 32*x, 32*y, 32, 32);
	}, 30)
}

core.prototype.battle = function(id, x, y) {
    core.stopHero();
    core.stopAutoHeroMove();
    core.stopAutomaticRoute();

    var damage=core.getDamage(id);
    if (damage>=core.status.hero.hp) {
        core.drawTip("你打不过此怪物！");
        return;
	}
	core.playSound('attack','ogg');
	core.status.hero.hp -= damage;
    core.status.hero.gold += core.material.enemys[id].money;
    core.updateStatus();
    core.removeBlock('event',x,y);
    core.canvas.event.clearRect(32*x, 32*y, 32, 32);
    core.updateFg();
}

core.prototype.getDamage = function (monsterId) {
	var monster = core.material.enemys[monsterId];
	var hero_atk = core.status.hero.atk, hero_def = core.status.hero.def, hero_mdef = core.status.hero.mdef;
	var mon_hp = monster.hp, mon_atk=monster.atk, mon_def=monster.def, mon_special=monster.special;
	return core.calDamage(hero_atk,hero_def,hero_mdef,mon_hp,mon_atk,mon_def,mon_special);
}

core.prototype.calDamage = function (hero_atk, hero_def, hero_mdef, mon_hp, mon_atk, mon_def, mon_special) {
    // 魔攻
    if (mon_special==2) hero_def=0;
    // 坚固
    if (mon_special==3 && mon_def<hero_atk-1) mon_def=hero_atk-1;
    // 模仿
    if (mon_special==10)
    {
        mon_atk=hero_atk; mon_def=hero_def;
    }
    if (hero_atk<=mon_def) return 999999999;

    var per_damage=mon_atk-hero_def;
    if (per_damage<0) per_damage=0;
    // 2连击 & 3连击

    if (mon_special==4) per_damage*=2;
    if (mon_special==5) per_damage*=3;
    if (mon_special==6) per_damage*=4;
    // 反击
    if (mon_special==8) per_damage+=(int)(0.1*hero_atk);

    // 先攻
    var damage=mon_special==1?per_damage:0;
    // 破甲
    if (mon_special==7) damage=parseInt(0.9*hero_def);
    // 净化
    if (mon_special==9) damage=3*hero_mdef;

    var turn=parseInt((mon_hp-1)/(hero_atk-mon_def));
    var ans=damage+turn*per_damage;
    ans -= hero_mdef;

    // 魔防回血
    // return ans;

    // 魔防不回血
    return ans<=0?0:ans;
}

core.prototype.changeFloor = function(floorId, stair, heroLoc) {
	core.lockControl();
	core.stopHero();
	core.stopAutoHeroMove();
	core.stopAutomaticRoute();
	core.setFloorName(floorId);
	if (core.isset(stair)) {
		// find heroLoc
		heroLoc = core.temp.heroLoc;
		var blocks = core.material.maps[floorId].blocks;
		for (var i in blocks) {
			if (core.isset(blocks[i].event) && blocks[i].event.id === stair) {
				heroLoc.x = blocks[i].x;
				heroLoc.y = blocks[i].y;
			}
		}
	}

 	window.setTimeout(function() {
 		console.log('地图切换到' + floorId);
        core.playSound('floor', 'mp3');
 		core.mapChangeAnimate('show', function() {
            core.setStatus('floor', core.material.maps[floorId].floor);
            core.updateStatus();
 			core.drawMap(floorId, function() {
				core.hide(core.dom.floorMsgGroup, 10, function() {
					core.unLockControl();
				});
				core.setHeroLoc('direction', heroLoc.direction);
				core.setHeroLoc('x', heroLoc.x);
				core.setHeroLoc('y', heroLoc.y);
				core.drawHero(core.getHeroLoc('direction'), core.getHeroLoc('x'), core.getHeroLoc('y'), 'stop');
				core.updateFg();
 			});
 		});
 	}, 50);
}

core.prototype.mapChangeAnimate = function(mode, callback) {
	if(mode == 'show') {
		core.show(core.dom.floorMsgGroup, 10, function() {
			callback();
		});
	}
	else {
		core.hide(core.dom.floorMsgGroup, 10, function() {
			callback();
		});
	}
}

core.prototype.clearMap = function(map, x, y, width, height) {
	if(map == 'all') {
		for(var m in core.canvas) {
			core.canvas[m].clearRect(0, 0, 416, 416);
		}
	}
	else {
		core.canvas[map].clearRect(x, y, width, height);
	}
}

core.prototype.fillText = function(map, text, x, y, style, font) {
	if(core.isset(style)) {
		core.setFillStyle(map, style);
	}
	if(core.isset(font)) {
		core.setFont(map, font);
	}
	core.canvas[map].fillText(text, x, y);
}

core.prototype.fillRect = function(map, x, y, width, height, style) {
	if(core.isset(style)) {
		core.setFillStyle(map, style);
	}
	core.canvas[map].fillRect(x, y, width, height);
}

core.prototype.strokeRect = function(map, x, y, width, height, style, lineWidth) {
	if(core.isset(style)) {
		core.setStrokeStyle(map, style);
	}
	if(core.isset(lineWidth)) {
		core.setLineWidth(map, lineWidth);
	}
	core.canvas[map].strokeRect(x, y, width, height);
}

core.prototype.drawBlock = function(map, image, cutX, cutY, x, y, size, zoom, clear) {
	zoom = zoom || 1;
	if(core.isset(clear) && clear == true) {
		core.canvas[map].clearRect(x * size, y * size, size, size);
	}
	core.canvas[map].drawImage(core.material.images[size][image], cutX * size, cutY * size, size, size, x * size, y * size, size * zoom, size * zoom);
}

core.prototype.setFont = function(map, font) {
	core.canvas[map].font = font;
}

core.prototype.setLineWidth = function(map, lineWidth) {
	if(map == 'all') {
		for(var m in core.canvas) {
			core.canvas[m].lineWidth = lineWidth;
		}
	}
	core.canvas[map].lineWidth = lineWidth;
}

core.prototype.saveCanvas = function(map) {
	core.canvas[map].save();
}

core.prototype.loadCanvas = function(map) {
	core.canvas[map].restore();
}

core.prototype.setOpacity = function(map, opacity) {
	if(map == 'all') {
		for(var m in core.canvas) {
			core.canvas[m].globalAlpha = opacity;
		}
	}
	core.canvas[map].globalAlpha = opacity;
}

core.prototype.setStrokeStyle = function(map, style) {
	if(map == 'all') {
		for(var m in core.canvas) {
			core.canvas[m].strokeStyle = style;
		}
	}
	else {
		core.canvas[map].strokeStyle = style;
	}
}

core.prototype.setFillStyle = function(map, style) {
	if(map == 'all') {
		for(var m in core.canvas) {
			core.canvas[m].fillStyle = style;
		}
	}
	else {
		core.canvas[map].fillStyle = style;
	}
}

core.prototype.drawMap = function(mapName, callback) {
	var mapData = core.material.maps[mapName];
	var mapBlocks = mapData.blocks;
	core.temp.thisMap = mapData;
	var x, y, blockIcon, blockImage;
	core.clearMap('all');
	core.clearGetItemAnimate();
	core.rmGlobalAnimate(null, null, true);
	core.enabledAllTrigger();
	for(x = 0;x < 13;x++) {
		for(y = 0;y < 13;y++) {
			blockIcon = core.material.icons.terrains.blackFloor;
			blockImage = core.material.images[blockIcon.size].terrains;
			core.canvas.bg.drawImage(blockImage, 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x * blockIcon.size, y * blockIcon.size, blockIcon.size, blockIcon.size);
		}
	}
	x = 0;
	y = 0;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(core.isset(mapBlocks[b].bg)) {
			blockIcon = core.material.icons[mapBlocks[b].bg.cls][mapBlocks[b].bg.id];
			blockImage = core.material.images[blockIcon.size][mapBlocks[b].bg.cls];
			x = mapBlocks[b].x * blockIcon.size;
			y = mapBlocks[b].y * blockIcon.size;
			if(mapBlocks[b].bg.cls != 'empty') {
				core.canvas.bg.drawImage(blockImage, 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x, y, blockIcon.size, blockIcon.size);
				core.addGlobalAnimate(mapBlocks[b].bg.animate, x, y, 'bg', blockIcon.loc, blockIcon.size, blockImage);
			}
			else {
				core.canvas.bg.clearRect(x, y, blockIcon.size, blockIcon.size);
			}
		}
		else {
			blockIcon = core.material.icons.terrains.blackFloor;
			blockImage = core.material.images[blockIcon.size].terrains;
			x = mapBlocks[b].x * blockIcon.size;
			y = mapBlocks[b].y * blockIcon.size;
			core.canvas.bg.drawImage(blockImage, 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x, y, blockIcon.size, blockIcon.size);
		}
		if(core.isset(mapBlocks[b].event)) {
			blockIcon = core.material.icons[mapBlocks[b].event.cls][mapBlocks[b].event.id];
			blockImage = core.material.images[blockIcon.size][mapBlocks[b].event.cls];
			core.canvas.event.drawImage(core.material.images[blockIcon.size][mapBlocks[b].event.cls], 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x, y, blockIcon.size, blockIcon.size);
			core.addGlobalAnimate(mapBlocks[b].event.animate, x, y, 'event', blockIcon.loc, blockIcon.size, blockImage);
		}
		/*
		if(core.isset(mapBlocks[b].fg)) {
			blockIcon = core.material.icons[mapBlocks[b].fg.cls][mapBlocks[b].fg.id];
			blockImage = core.material.images[blockIcon.size][mapBlocks[b].fg.cls];
			core.canvas.fg.drawImage(core.material.images[blockIcon.size][mapBlocks[b].fg.cls], 0, blockIcon.loc * blockIcon.size, blockIcon.size, blockIcon.size, x, y, blockIcon.size, blockIcon.size);
			core.addGlobalAnimate(mapBlocks[b].fg.animate, x, y, 'fg', blockIcon.loc, blockIcon.size, blockImage);
		}
		*/
	}
	core.setGlobalAnimate(core.firstData.animateSpeed);
	callback();
}

core.prototype.setFloorName = function(floorId) {
	core.dom.floorNameLabel.innerHTML = core.material.maps[floorId].title;
}

core.prototype.noPassExists = function(x, y) {
	if(core.enemyExists(x, y) || core.npcExists(x, y)) {
		return true;
	}
	return false;
}

core.prototype.npcExists = function(x, y) {
	var blocks = core.temp.thisMap.blocks;
	for(var n = 0;n < blocks.length;n++) {
		if(blocks[n].x == x && blocks[n].y == y && core.isset(blocks[n].event) && blocks[n].event.cls == 'npcs') {
			return true;
		}
	}
	return false;
}

core.prototype.terrainExists = function(x, y) {
	if(x > 12 || y > 12 || x < 0 || y < 0) {
		return true;
	}
	if(core.stairExists(x, y)) {
		return false;
	}
	var blocks = core.temp.thisMap.blocks;
	for(var t = 0;t < blocks.length;t++) {
		if(blocks[t].x == x && blocks[t].y == y) {
			for(var map in core.canvas) {
				if(core.isset(blocks[t][map]) && (blocks[t][map].cls == 'terrains' || (blocks[t][map].cls == 'animates' && core.isset(blocks[t][map].noPass) && blocks[t][map].noPass == true))) {
					return true;
				}
			}
		}
	}
	return false;
}

core.prototype.stairExists = function(x, y) {
	var blocks = core.temp.thisMap.blocks;
	for(var s = 0;s < blocks.length;s++) {
		if(blocks[s].x == x && blocks[s].y == y && core.isset(blocks[s].event) && blocks[s].event.cls == 'terrains' && core.isset(blocks[s].event.id) && (blocks[s].event.id == 'upFloor' || blocks[s].event.id == 'downFloor')) {
			return true;
		}
	}
	return false;
}

core.prototype.enemyExists = function(x, y, id) {
	var blocks = core.temp.thisMap.blocks;
	for(var e = 0;e < blocks.length;e++) {
		if(blocks[e].x == x && blocks[e].y == y && core.isset(blocks[e].event) && blocks[e].event.cls == 'enemys' && ((core.isset(id) && core.isset(blocks[e].event.id)) ? blocks[e].event.id == id : true)) {
			return true;
		}
	}
	return false;
}

core.prototype.blockExists = function(x, y) {
	if(x > 12 || y > 12 || x < 0 || y < 0) {
		return true;
	}
	var mapBlocks = core.temp.thisMap.blocks;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == x && mapBlocks[b].y == y) {
			return (mapBlocks[b].event && mapBlocks[b].event.noPass) || (mapBlocks[b].bg && mapBlocks[b].bg.noPass);
		}
	}
	return false;
}

core.prototype.removeBlock = function(map, x, y) {
	var map = map.split(',');
	var mapBlocks = core.temp.thisMap.blocks;
	var blockIcon;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == x && mapBlocks[b].y == y) {
			core.rmGlobalAnimate(x, y);
			for(var m = 0;m < map.length;m++) {
				if(!core.isset(mapBlocks[b][map[m]])) {
					continue;
				}
				blockIcon = core.material.icons[mapBlocks[b][map[m]].cls][mapBlocks[b][map[m]].id];
				core.canvas[map[m]].clearRect(x * blockIcon.size,y * blockIcon.size, blockIcon.size, blockIcon.size);
				// delete core.temp.thisMap.blocks[b][map[m]];
			}
            core.temp.thisMap.blocks.splice(b,1);
			break;
		}
	}
}

core.prototype.noPass = function(x, y) {
	if(x > 12 || y > 12 || x < 0 || y < 0) {
		return true;
	}
	var mapBlocks = core.temp.thisMap.blocks;
	var noPass;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == x && mapBlocks[b].y == y) {
			return noPass = (mapBlocks[b].event && mapBlocks[b].event.noPass) || (mapBlocks[b].bg && mapBlocks[b].bg.noPass);
		}
	}
}

core.prototype.trigger = function(x, y) {
	var mapBlocks = core.temp.thisMap.blocks;
	var noPass;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == x && mapBlocks[b].y == y) {
			noPass = (mapBlocks[b].event && mapBlocks[b].event.noPass) || (mapBlocks[b].bg && mapBlocks[b].bg.noPass);
			if(noPass) {
				core.clearAutomaticRouteNode(x, y);
			}
			/*
			if(core.isset(mapBlocks[b].fg) && core.isset(mapBlocks[b].fg.trigger) && (core.isset(mapBlocks[b].fg.disabledTrigger) ? mapBlocks[b].fg.disabledTrigger == false : true)) {
				core.material.events[mapBlocks[b].fg.trigger](mapBlocks[b], core, function(data) {
					
				});
			}
			*/
			if(core.isset(mapBlocks[b].event) && core.isset(mapBlocks[b].event.trigger) && (core.isset(mapBlocks[b].event.disabledTrigger) ? mapBlocks[b].event.disabledTrigger == false : true)) {
				core.material.events[mapBlocks[b].event.trigger](mapBlocks[b], core, function(data) {
					
				});
			}
			else if(core.isset(mapBlocks[b].bg) && core.isset(mapBlocks[b].bg.trigger) && (core.isset(mapBlocks[b].bg.disabledTrigger) ? mapBlocks[b].bg.disabledTrigger == false : true)) {
				core.material.events[mapBlocks[b].bg.trigger](mapBlocks[b], core, function(data) {
					
				});
			}
		}
	}
}

core.prototype.setTrigger = function(x, y, map, triggerName) {
	var mapBlocks = core.temp.thisMap.blocks;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == x && mapBlocks[b].y == y && core.isset(mapBlocks[b][map])) {
			mapBlocks[b][map].trigger = triggerName;
		}
	}
}

core.prototype.enabledTrigger = function(x, y, map) {
	var mapBlocks = core.temp.thisMap.blocks;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == x && mapBlocks[b].y == y && core.isset(mapBlocks[b][map]) && core.isset(mapBlocks[b][map].trigger)) {
			mapBlocks[b][map].disabledTrigger = false;
		}
	}
}

core.prototype.enabledAllTrigger = function() {
	var mapBlocks = core.temp.thisMap.blocks;
	for(var b = 0;b < mapBlocks.length;b++) {
		for(var map in core.canvas) {
			if(core.isset(mapBlocks[b][map]) && core.isset(mapBlocks[b][map].trigger)) {
				mapBlocks[b][map].disabledTrigger = false;
			}
		}
	}
}

core.prototype.disabledTrigger = function(x, y, map) {
	var mapBlocks = core.temp.thisMap.blocks;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == x && mapBlocks[b].y == y && core.isset(mapBlocks[b][map]) && core.isset(mapBlocks[b][map].trigger)) {
			mapBlocks[b][map].disabledTrigger = true;
		}
	}
}

core.prototype.rmTrigger = function(x, y, map) {
	var mapBlocks = core.temp.thisMap.blocks;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == x && mapBlocks[b].y == y && core.isset(mapBlocks[b][map]) && core.isset(mapBlocks[b][map].trigger)) {
			delete mapBlocks[b][map].trigger;
		}
	}
}

core.prototype.addGlobalAnimate = function(animateMore, x, y, map, loc, size, image) {
	if(animateMore == 2) {
		core.temp.twoAnimateObjs.push({'x': x, 'y': y, 'map': map, 'status': 0, 'loc': loc, 'size': size, 'image': image});
	}
	else if(animateMore == 4) {
		core.temp.fourAnimateObjs.push({'x': x, 'y': y, 'map': map, 'status': 0, 'loc': loc, 'size': size, 'image': image});
	}
}

core.prototype.rmGlobalAnimate = function(x, y, all) {
	if(all == true) {
		core.temp.twoAnimateObjs = [];
		core.temp.fourAnimateObjs = [];
	}
	for(var t = 0;t < core.temp.twoAnimateObjs.length;t++) {
		if(core.temp.twoAnimateObjs[t].x == x * core.temp.twoAnimateObjs[t].size && core.temp.twoAnimateObjs[t].y == y * core.temp.twoAnimateObjs[t].size) {
			core.temp.twoAnimateObjs.splice(t, 1);
			return;
		}
	}
	for(var f = 0;f < core.temp.fourAnimateObjs.length;f++) {
		if(core.temp.fourAnimateObjs[f].x == x * core.temp.fourAnimateObjs[f].size && core.temp.fourAnimateObjs[f].y == y * core.temp.fourAnimateObjs[f].size) {
			core.temp.fourAnimateObjs.splice(f, 1);
			return;
		}
	}
}

core.prototype.setGlobalAnimate = function(speed) {
	clearInterval(core.interval.twoAnimate);
	clearInterval(core.interval.fourAnimate);
	var animateClose = false;
	core.interval.twoAnimate = window.setInterval(function() {
		for(var a = 0;a < core.temp.twoAnimateObjs.length;a++) {
			core.temp.twoAnimateObjs[a].status = core.temp.twoAnimateObjs[a].status == 0 ? 1 : 0;
			core.canvas[core.temp.twoAnimateObjs[a].map].clearRect(core.temp.twoAnimateObjs[a].x, core.temp.twoAnimateObjs[a].y, core.temp.twoAnimateObjs[a].size, core.temp.twoAnimateObjs[a].size);
			for(var b = 0;b < core.temp.thisMap.blocks.length;b++) {
				if(core.temp.thisMap.blocks[b].x * 32 == core.temp.twoAnimateObjs[a].x && core.temp.thisMap.blocks[b].y * 32 == core.temp.twoAnimateObjs[a].y && (!core.isset(core.temp.thisMap.blocks[b][core.temp.twoAnimateObjs[a].map]) || core.temp.thisMap.blocks[b][core.temp.twoAnimateObjs[a].map].animate == 0)) {
					animateClose = true;
				}
			}
			if(!animateClose) {
				core.canvas[core.temp.twoAnimateObjs[a].map].drawImage(core.temp.twoAnimateObjs[a].image, core.temp.twoAnimateObjs[a].status * 32, core.temp.twoAnimateObjs[a].loc * core.temp.twoAnimateObjs[a].size, core.temp.twoAnimateObjs[a].size, core.temp.twoAnimateObjs[a].size, core.temp.twoAnimateObjs[a].x, core.temp.twoAnimateObjs[a].y, core.temp.twoAnimateObjs[a].size, core.temp.twoAnimateObjs[a].size);
			}
			animateClose = false;
		}
	}, speed);
	core.interval.fourAnimate = window.setInterval(function() {
		for(var a = 0;a < core.temp.fourAnimateObjs.length;a++) {
			core.temp.fourAnimateObjs[a].status = (core.temp.fourAnimateObjs[a].status == 0 ? 1 : (core.temp.fourAnimateObjs[a].status == 1 ? 2 : (core.temp.fourAnimateObjs[a].status == 2 ? 3 : 0)));
			core.canvas[core.temp.fourAnimateObjs[a].map].clearRect(core.temp.fourAnimateObjs[a].x, core.temp.fourAnimateObjs[a].y, core.temp.fourAnimateObjs[a].size, core.temp.fourAnimateObjs[a].size);
			for(var b = 0;b < core.temp.thisMap.blocks.length;b++) {
				if(core.temp.thisMap.blocks[b].x * 32 == core.temp.fourAnimateObjs[a].x && core.temp.thisMap.blocks[b].y * 32 == core.temp.fourAnimateObjs[a].y && (!core.isset(core.temp.thisMap.blocks[b][core.temp.fourAnimateObjs[a].map]) || core.temp.thisMap.blocks[b][core.temp.fourAnimateObjs[a].map].animate == 0)) {
					animateClose = true;
				}
			}
			if(!animateClose) {
				core.canvas[core.temp.fourAnimateObjs[a].map].drawImage(core.temp.fourAnimateObjs[a].image, core.temp.fourAnimateObjs[a].status * 32, core.temp.fourAnimateObjs[a].loc * core.temp.fourAnimateObjs[a].size, core.temp.fourAnimateObjs[a].size, core.temp.fourAnimateObjs[a].size, core.temp.fourAnimateObjs[a].x, core.temp.fourAnimateObjs[a].y, core.temp.fourAnimateObjs[a].size, core.temp.fourAnimateObjs[a].size);
			}
			animateClose = false;
		}
	}, speed / 2);
}

core.prototype.setHeroLoc = function(itemName, itemVal) {
	if(itemVal == '++') {
		core.temp.heroLoc[itemName]++;
		return;
	}
	else if(itemVal == '--') {
		core.temp.heroLoc[itemName]--;
		return;
	}
	core.temp.heroLoc[itemName] = itemVal;
}

core.prototype.getHeroLoc = function(itemName) {
	return core.temp.heroLoc[itemName];
}

core.prototype.updateFg = function () {
	if (!core.isset(core.temp.thisMap) || !core.isset(core.temp.thisMap.blocks)) return;
	// 更新显伤
    var mapBlocks = core.temp.thisMap.blocks;
	core.clearMap('fg', 0, 0, 416, 416);
	// 没有怪物手册
	if (!core.hasItem('book')) return;
    core.setFont('fg', "bold 11px Arial");
    var hero_hp = core.status.hero.hp;
    for(var b = 0;b < mapBlocks.length;b++) {
    	var x=mapBlocks[b].x, y=mapBlocks[b].y;
    	if (core.isset(mapBlocks[b].event) && mapBlocks[b].event.cls=='enemys') {
    		var id = mapBlocks[b].event.id;

    		var damage = core.getDamage(id);
    		var color = "#000000";
    		if (damage<=0) color = '#00FF00';
    		else if (damage<hero_hp/3) color = '#FFFFFF';
    		else if (damage<hero_hp*2/3) color = '#FFFF00';
    		else if (damage<hero_hp) color = '#FF7F00';
    		else color = '#FF0000';

    		if (damage==999999999) damage="???";
    		else if (damage>100000) damage=(damage/100000).toFixed(1)+"w";

            var length=core.canvas.fg.measureText(damage).width;


            core.setFillStyle('fg', '#000000');
            core.canvas.fg.fillText(damage, 32*x+2, 32*(y+1)-2);
            core.canvas.fg.fillText(damage, 32*x, 32*(y+1)-2);
            core.canvas.fg.fillText(damage, 32*x+2, 32*(y+1));
            core.canvas.fg.fillText(damage, 32*x, 32*(y+1));

			core.setFillStyle('fg', color);
            core.canvas.fg.fillText(damage, 32*x+1, 32*(y+1)-1);

		}
    }
}

/**
 * 地图处理 end
 */

/**
 * 物品处理 start
 */
core.prototype.hasItem = function(itemId) {
    var itemCls = core.material.items[itemId].cls;
    return core.isset(core.temp.itemList[itemCls]) && core.isset(core.temp.itemList[itemCls][itemId]) && core.temp.itemList[itemCls][itemId]>0;
}

core.prototype.useItem = function(itemId) {
	if (!core.hasItem(itemId)) return;
    var itemCls = core.material.items[itemId].cls;
    core.temp.itemList[itemCls][itemId]--;
    core.updateStatus();
}

 core.prototype.addItem = function(itemId, itemNum) {
     var itemData = core.material.items[itemId];
     var itemCls = itemData.cls;
 	if (itemCls == 'item') return;
 	if(!core.isset(core.temp.itemList[itemCls])) {
 		core.temp.itemList[itemCls] = {};
 		core.temp.itemList[itemCls][itemId] = 0;
 	}
 	else if(!core.isset(core.temp.itemList[itemCls][itemId])) {
 		core.temp.itemList[itemCls][itemId] = 0;
 	}
 	core.temp.itemList[itemCls][itemId]+=itemNum;
 }

 /*
core.prototype.removeBlock = function(itemX, itemY) {
	var mapBlocks = core.temp.thisMap.blocks;
	for(var b = 0;b < mapBlocks.length;b++) {
		if(mapBlocks[b].x == itemX && mapBlocks[b].y == itemY) {
			// delete mapBlocks[b].event;
			// mapBlocks[b]
			core.temp.thisMap.blocks.splice(b,1);
			break;
		}
	}
}
*/

core.prototype.getItemEffect = function(itemId, itemNum) {
	var currfloor = parseInt(core.status.hero.floor);
	var hard = parseInt((currfloor+4)/5);
    var itemCls = core.material.items[itemId].cls;

    // 消耗品
    if (itemCls === 'item') {
        if (itemId === 'redJewel') core.status.hero.atk+=1+hard;
        if (itemId === 'blueJewel') core.status.hero.def+=1+hard;
        if (itemId === 'greenJewel') core.status.hero.mdef+=2+3*hard;
        // if (itemId == 'yellowJewel') core.status.hero.atk+=1+hard;
        if (itemId === 'redPotion') core.status.hero.hp+=100;
        if (itemId === 'bluePotion') core.status.hero.hp+=250;
        if (itemId === 'yellowPotion') core.status.hero.hp+=500;
        if (itemId === 'greenPotion') core.status.hero.hp+=800;
        if (itemId === 'sword1') core.status.hero.atk+=10;
        if (itemId === 'sword2') core.status.hero.atk+=20;
        if (itemId === 'sword5') core.status.hero.atk+=40;
        if (itemId === 'shield1') core.status.hero.def+=10;
        if (itemId === 'shield2') core.status.hero.def+=20;
        if (itemId === 'shield5') core.status.hero.def+=40;
	}
	else {
        core.addItem(itemId, itemNum);
	}
}

core.prototype.getItemEffectTip = function (itemId) {
    var currfloor = parseInt(core.status.hero.floor);
    var hard = parseInt((currfloor+4)/5);

    if (itemId === 'redJewel') return "攻击+"+(1+hard);
    if (itemId === 'blueJewel') return "防御+"+(1+hard);
    if (itemId === 'greenJewel') return "魔防+"+(2+3*hard);
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

core.prototype.getItem = function(itemId, itemNum, itemX, itemY) {
	// core.getItemAnimate(itemId, itemNum, itemX, itemY);
	core.playSound('item', 'ogg');
    var itemCls = core.material.items[itemId].cls;
	core.getItemEffect(itemId, itemNum);
	core.removeBlock('event',itemX, itemY);
	var text = '获得 ' + core.material.items[itemId].name;
	if (itemNum>1) text += "x"+itemNum;
	if (itemCls==='item') text += "，" + core.getItemEffectTip(itemId);
	core.drawTip(text, 'image', core.material.icons.items[itemId]);
    core.canvas.event.clearRect(itemX * 32, itemY * 32, 32, 32);
    core.updateStatus();
}

core.prototype.clearGetItemAnimate = function() {
	for(var a = 0;a < core.interval.getItemAnimate.length;a++) {
		clearInterval(core.interval.getItemAnimate[a]);
	}
}

core.prototype.drawTip = function(text, type, itemIcon) {
	type = type || 'normal';
	var textX, textY, width, height, hide = false, opacityVal = 0;
	clearInterval(core.interval.getItemTipAnimate);
	// core.canvas.ui.font = "16px Arial";
	core.setFont('ui', "16px Arial");
	core.saveCanvas('ui');
	core.setOpacity('ui', 0);
	if(type == 'normal') {
		textX = 16;
		textY = 18;
		width = textX + core.canvas.ui.measureText(text).width + 8;
		height = 42;
	}
	else if(type == 'image' && core.isset(itemIcon)) {
		textX = 44;
		textY = 18;
		width = textX + core.canvas.ui.measureText(text).width + 8;
		height = 42;
	}
	else {
		core.loadCanvas('ui');
		return;
	}
	core.interval.getItemTipAnimate = window.setInterval(function() {
		if(hide) {
			opacityVal -= 0.1;
		}
		else {
			opacityVal += 0.1;
		}
		core.setOpacity('ui', opacityVal);
		core.clearMap('ui', 5, 5, 400, height);
		core.fillRect('ui', 5, 5, width, height, '#000');
		if(core.isset(itemIcon)) {
			core.canvas.ui.drawImage(core.material.images['32'].items, 0, itemIcon.loc * itemIcon.size, itemIcon.size, itemIcon.size, 10, 8, itemIcon.size, itemIcon.size);
		}
		core.fillText('ui', text, textX + 5, textY + 15, '#fff');
		if(opacityVal > 0.6 || opacityVal < 0) {
			if(hide) {
				core.loadCanvas('ui');
				core.clearMap('ui', 5, 5, 400, height);
				core.setOpacity('ui', 1);
				clearInterval(core.interval.getItemTipAnimate);
				return;
			}
			else {
				if(!core.timeout.getItemTipTimeout) {
					core.timeout.getItemTipTimeout = window.setTimeout(function() {
						hide = true;
						core.timeout.getItemTipTimeout = null;
					}, 1000);
				}
				opacityVal = 0.6;
				core.setOpacity('ui', opacityVal);
			}
		}
	}, 30);
}
/*
core.prototype.getItemAnimate = function(itemId, itemNum, itemX, itemY) {
	var top = 0;
	var intervalIndex = core.interval.getItemAnimate.length;
	var itemIcon = core.material.icons.items[itemId];
	itemX = itemX * itemIcon.size;
	itemY = itemY * itemIcon.size;
	core.drawTip('获得 ' + core.material.items[itemId].name + ' x ' + itemNum, 'image', itemIcon);
	core.interval.getItemAnimate[core.interval.getItemAnimate.length] = window.setInterval(function() {
		top += 3;
		core.canvas.event.clearRect(itemX, itemY, 32, 32);
		core.canvas.event.drawImage(core.material.images['32'].items, 0, itemIcon.loc * itemIcon.size - top, itemIcon.size, itemIcon.size, itemX, itemY, itemIcon.size, itemIcon.size);
		core.canvas.event.clearRect(itemX, itemY + 30, 32, 2);
		if(top >= 30) {
			top = 0;
			clearInterval(core.interval.getItemAnimate[intervalIndex]);
		}
	}, 30);
}
*/

/**
 * 物品处理 end
 */

/**
 * 系统机制 start
 */

core.prototype.setFirstItem = function() {
	core.setStatus('level', core.firstData.heroLevel);
	core.setStatus('hp', core.firstData.heroHp);
	core.setStatus('atk', core.firstData.heroAtk);
	core.setStatus('def', core.firstData.heroDef);
	core.setStatus('gold', core.firstData.heroGold);
	core.setStatus('exp', core.firstData.heroExp);
	for(var itemClass in core.firstData.heroItem) {
		if(!core.isset(core.temp.itemList[itemClass])) {
			core.temp.itemList[itemClass] = {};
		}
		for(var itemName in core.firstData.heroItem[itemClass]) {
			if(!core.isset(core.temp.itemList[itemClass][itemName])) {
				core.temp.itemList[itemClass][itemName] = 0;
			}
		}
	}
}

core.prototype.setStatus = function(statusName, statusVal) {
	if(core.isset(core.status.hero[statusName])) {
		core.status.hero[statusName] = statusVal;
	}
}

core.prototype.getStatus = function(statusName) {
	if(core.isset(core.status.hero[statusName])) {
		return core.status.hero[statusName];
	}
}

core.prototype.updateStatus = function() {
	var statusList = ['floor', 'hp', 'atk', 'def', 'mdef', 'gold'];
	statusList.forEach(function (item) {
        core.statusBar[item].innerHTML = core.getStatus(item);
	});
    var keys = ['yellowKey', 'blueKey', 'redKey'];
	keys.forEach(function (key) {
		var num = core.temp.itemList.key[key];
		if (num<10) num = "0"+num;
        core.statusBar[key].innerHTML = num;
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

core.prototype.lockControl = function() {
	core.status.lockControl = true;
}

core.prototype.unLockControl = function() {
	core.status.lockControl = false;
}

core.prototype.lockKeyBoard = function() {
	core.status.keyBoardLock = true;
}

core.prototype.unLockKeyBoard = function() {
	core.status.keyBoardLock = false;
}

core.prototype.isset = function(val) {
	if(val == undefined || val == null) {
		return false;
	}
	return true
}

core.prototype.getClickLoc = function(x, y) {
	var statusBar = {'x': 0, 'y': 0};
	var size = 32;
	switch(core.status.screenMode) {
		case 'adaptive':
            var zoom = (422 - main.dom.body.clientWidth) / 4.22;
			statusBar.x = 0;
			statusBar.y = 132 - zoom;
			size = size - size * zoom / 100;
		break;
		case 'vertical': 
			statusBar.x = 0;
			statusBar.y = 132;
		break;
		case 'horizontal': 
			statusBar.x = 132;
			statusBar.y = 0;
		break;
	}
	var left = core.dom.gameGroup.offsetLeft + statusBar.x;
	var top = core.dom.gameGroup.offsetTop + statusBar.y;
	return {'x': x - left, 'y': y - top, 'size': size};
}

core.prototype.soundPlayed = function(soundName, soundType) {
	return core.material.sounds[soundType][soundName].paused;
}

core.prototype.playSound = function(soundName, soundType) {
	if(!core.status.soundStatus) {
		return;
	}
	if (core.isset(core.temp.playedSound)) {
		core.temp.playedSound.pause();
	}
	core.temp.playedSound = core.material.sounds[soundType][soundName];
	core.temp.playedSound.play();
}

core.prototype.playBgm = function(bgmName, bgmType) {
	if(!core.status.soundStatus) {
		return;
	}
	if(core.isset(core.temp.playedBgm)) {
		core.temp.playedBgm.pause();
	}
	core.temp.playedBgm = core.material.sounds[bgmType][bgmName];
	core.temp.playedBgm.play();
}

core.prototype.changeSoundStatus = function() {
	if(core.status.soundStatus) {
		main.core.disabledSound();
	}
	else {
		main.core.enabledSound();
	}
}

core.prototype.enabledSound = function() {
	core.dom.musicBtn.src = core.material.images['25'].musicPlayed.src;
	core.temp.playedBgm.play();
	core.status.soundStatus = true;
}

core.prototype.disabledSound = function() {
	core.dom.musicBtn.src = core.material.images['25'].musicPaused.src;
	core.temp.playedBgm.pause();
	core.status.soundStatus = false;
}

core.prototype.show = function(obj, speed, callback) {
	if(!core.isset(speed)) {
		obj.style.display = 'block';
		return;
	}
	obj.style.display = 'block';
	obj.style.opacity = 0;
	var opacityVal = 0;
	var showAnimate = window.setInterval(function() {
		opacityVal += 0.03;
		obj.style.opacity = opacityVal;
		if(opacityVal > 1) {
			clearInterval(showAnimate);
			if(core.isset(callback)) {
				callback();
			}
		}
	}, speed);
}

core.prototype.hide = function(obj, speed, callback) {
	if(!core.isset(speed)) {
		obj.style.display = 'none';
		return;
	}
	var opacityVal = 1;
	var hideAnimate = window.setInterval(function() {
		opacityVal -= 0.03;
		obj.style.opacity = opacityVal;
		if(opacityVal < 0) {
			obj.style.display = 'none';
			clearInterval(hideAnimate);
			if(core.isset(callback)) {
				callback();
			}
		}
	}, speed);
}

core.prototype.resize = function(width, height) {
	var halfWidth = width / 2;
	if(width < 422) {
		var zoom = (422 - width) / 4.22;
		var scale = 1 - zoom / 100;
		var top = (129 - zoom);
		// var helfmoveBtnGroupWidth = (109 - zoom) / 2;
        core.dom.gameGroup.style.top = '3px';
        core.dom.gameGroup.style.left = '3px';
		core.dom.gameGroup.style.width = (width - 6) + 'px';
		core.dom.gameGroup.style.height = (top + width - 3) + 'px';
		core.dom.startTopLoadTips.style.fontSize = '0.6rem';
		//core.dom.startBackground.style.height = (top + width) + 'px';
		//core.dom.startButtonGroup.style.bottom = '15px';
		//core.dom.startButtonGroup.style.fontSize = '1rem';
		core.dom.floorMsgGroup.style.width = (width - 6) + 'px';
		core.dom.statusBar.style.width = (width - 6) + 'px';
		core.dom.statusBar.style.height = top + 'px';
		for(var i = 0;i < core.dom.gameCanvas.length;i++) {
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
        core.statusBar.image.floor.style.width = 32*scale + "px";
        core.statusBar.image.floor.style.height = 32*scale + "px";
        core.statusBar.image.floor.style.top = 8*scale + "px";
        core.statusBar.image.floor.style.left = 8*scale + "px";
        core.statusBar.floor.style.top = 16*scale + "px";
        core.statusBar.floor.style.left = 48*scale + "px";
        // hp
        core.statusBar.image.heart.style.width = 32*scale + "px";
        core.statusBar.image.heart.style.height = 32*scale + "px";
        core.statusBar.image.heart.style.top = 8*scale + "px";
        core.statusBar.image.heart.style.left = 90*scale + "px";
        core.statusBar.hp.style.top = 16*scale + "px";
        core.statusBar.hp.style.left = 130*scale + "px";
        // atk
        core.statusBar.image.atk.style.width = 32*scale + "px";
        core.statusBar.image.atk.style.height = 32*scale + "px";
        core.statusBar.image.atk.style.top = 8*scale + "px";
        core.statusBar.image.atk.style.left = 210*scale + "px";
        core.statusBar.atk.style.top = 16*scale + "px";
        core.statusBar.atk.style.left = 246*scale + "px";
        // def
        core.statusBar.image.def.style.width = 32*scale + "px";
        core.statusBar.image.def.style.height = 32*scale + "px";
        core.statusBar.image.def.style.top = 8*scale + "px";
        core.statusBar.image.def.style.left = 316*scale + "px";
        core.statusBar.def.style.top = 16*scale + "px";
        core.statusBar.def.style.left = 352*scale + "px";
        // mdef
        core.statusBar.image.mdef.style.width = 32*scale + "px";
        core.statusBar.image.mdef.style.height = 32*scale + "px";
        core.statusBar.image.mdef.style.top = 44*scale + "px";
        core.statusBar.image.mdef.style.left = 8*scale + "px";
        core.statusBar.mdef.style.top = 52*scale + "px";
        core.statusBar.mdef.style.left = 48*scale + "px";
        // gold
        core.statusBar.image.gold.style.width = 32*scale + "px";
        core.statusBar.image.gold.style.height = 32*scale + "px";
        core.statusBar.image.gold.style.top = 44*scale + "px";
        core.statusBar.image.gold.style.left = 138*scale + "px";
        core.statusBar.gold.style.top = 52*scale + "px";
        core.statusBar.gold.style.left = 178*scale + "px";
        // keys
        core.statusBar.yellowKey.style.top = 52*scale + "px";
        core.statusBar.yellowKey.style.left = 268*scale + "px";
        core.statusBar.blueKey.style.top = 52*scale + "px";
        core.statusBar.blueKey.style.left = 308*scale + "px";
        core.statusBar.redKey.style.top = 52*scale + "px";
        core.statusBar.redKey.style.left = 348*scale + "px";
        // book
        core.statusBar.image.book.style.width = 32*scale + "px";
        core.statusBar.image.book.style.height = 32*scale + "px";
        core.statusBar.image.book.style.top = 86*scale + "px";
        core.statusBar.image.book.style.left = 8*scale + "px";
        // fly
        core.statusBar.image.fly.style.width = 32*scale + "px";
        core.statusBar.image.fly.style.height = 32*scale + "px";
        core.statusBar.image.fly.style.top = 86*scale + "px";
        core.statusBar.image.fly.style.left = 54*scale + "px";
        // toolbox
        core.statusBar.image.toolbox.style.width = 32*scale + "px";
        core.statusBar.image.toolbox.style.height = 32*scale + "px";
        core.statusBar.image.toolbox.style.top = 86*scale + "px";
        core.statusBar.image.toolbox.style.left = 100*scale + "px";
        // save
        core.statusBar.image.save.style.width = 32*scale + "px";
        core.statusBar.image.save.style.height = 32*scale + "px";
        core.statusBar.image.save.style.top = 86*scale + "px";
        core.statusBar.image.save.style.left = 146*scale + "px";
        // load
        core.statusBar.image.load.style.width = 32*scale + "px";
        core.statusBar.image.load.style.height = 32*scale + "px";
        core.statusBar.image.load.style.top = 86*scale + "px";
        core.statusBar.image.load.style.left = 192*scale + "px";
        // setting
        core.statusBar.image.settings.style.width = 32*scale + "px";
        core.statusBar.image.settings.style.height = 32*scale + "px";
        core.statusBar.image.settings.style.top = 86*scale + "px";
        core.statusBar.image.settings.style.left = 238*scale + "px";
        // hard
        core.statusBar.hard.style.top = 94*scale + "px";
        core.statusBar.hard.style.left = 300*scale + "px";

		core.status.screenMode = 'adaptive';
		console.log('已调整为自适应屏');
	}
	else if(width < 548) {
		core.dom.gameGroup.style.left = (halfWidth - 208) + 'px';
		core.dom.gameGroup.style.top = '3px';
		core.dom.gameGroup.style.width = '416px';
		core.dom.gameGroup.style.height = '548px';
		core.dom.startTopLoadTips.style.fontSize = '0.6rem';
		//core.dom.startBackground.style.height = '548px';
		//core.dom.startButtonGroup.style.bottom = '20px';
		//core.dom.startButtonGroup.style.fontSize = '1.2rem';
		core.dom.floorMsgGroup.style.width = '416px';
		core.dom.statusBar.style.width = '416px';
		core.dom.statusBar.style.height = '129px';
		for(var i = 0;i < core.dom.gameCanvas.length;i++) {
			core.dom.gameCanvas[i].style.borderTop = '3px #fff solid';
			core.dom.gameCanvas[i].style.borderLeft = '';
			core.dom.gameCanvas[i].style.top = '129px';
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
        // gold
        core.statusBar.image.gold.style.width = "32px";
        core.statusBar.image.gold.style.height = "32px";
        core.statusBar.image.gold.style.top = "44px";
        core.statusBar.image.gold.style.left = "138px";
        core.statusBar.gold.style.top = "52px";
        core.statusBar.gold.style.left = "178px";
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
        core.statusBar.image.book.style.top = "86px";
        core.statusBar.image.book.style.left = "8px";
        // fly
        core.statusBar.image.fly.style.width = "32px";
        core.statusBar.image.fly.style.height = "32px";
        core.statusBar.image.fly.style.top = "86px";
        core.statusBar.image.fly.style.left = "54px";
        // toolbox
        core.statusBar.image.toolbox.style.width = "32px";
        core.statusBar.image.toolbox.style.height = "32px";
        core.statusBar.image.toolbox.style.top = "86px";
        core.statusBar.image.toolbox.style.left = "100px";
        // save
        core.statusBar.image.save.style.width = "32px";
        core.statusBar.image.save.style.height = "32px";
        core.statusBar.image.save.style.top = "86px";
        core.statusBar.image.save.style.left = "146px";
        // load
        core.statusBar.image.load.style.width = "32px";
        core.statusBar.image.load.style.height = "32px";
        core.statusBar.image.load.style.top = "86px";
        core.statusBar.image.load.style.left = "192px";
        // setting
        core.statusBar.image.settings.style.width = "32px";
        core.statusBar.image.settings.style.height = "32px";
        core.statusBar.image.settings.style.top = "86px";
        core.statusBar.image.settings.style.left = "238px";
        // hard
        core.statusBar.hard.style.top = "94px";
        core.statusBar.hard.style.left = "300px";

		core.status.screenMode = 'vertical';
		console.log('已调整为竖屏');
	}
	else {
		core.dom.gameGroup.style.left = (halfWidth - 274) + 'px';
		core.dom.gameGroup.style.top = (height / 2 - 208) + 'px';
		core.dom.gameGroup.style.width = '548px';
		core.dom.gameGroup.style.height = '416px';
		core.dom.startTopLoadTips.style.fontSize = '0.6rem';
		//core.dom.startBackground.style.height = '416px';
		//core.dom.startButtonGroup.style.bottom = '20px';
		//core.dom.startButtonGroup.style.fontSize = '1.4rem';
		core.dom.floorMsgGroup.style.width = '416px';
		core.dom.statusBar.style.width = '129px';
		core.dom.statusBar.style.height = '416px';
		for(var i = 0;i < core.dom.gameCanvas.length;i++) {
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
        core.statusBar.def.innerHTML = "10";
        // mdef
        core.statusBar.image.mdef.style.width = "32px";
        core.statusBar.image.mdef.style.height = "32px";
        core.statusBar.image.mdef.style.top = "180px";
        core.statusBar.image.mdef.style.left = "8px";
        core.statusBar.mdef.style.top = "188px";
        core.statusBar.mdef.style.left = "50px";
        // gold
        core.statusBar.image.gold.style.width = "32px";
        core.statusBar.image.gold.style.height = "32px";
        core.statusBar.image.gold.style.top = "220px";
        core.statusBar.image.gold.style.left = "8px";
        core.statusBar.gold.style.top = "228px";
        core.statusBar.gold.style.left = "50px";
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