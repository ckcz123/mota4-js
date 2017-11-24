function events() {

}

events.prototype.init = function () {
    this.events = {
        'battle': function (data, core, callback) {
            //core.playSound('floor', 'mp3');
            //core.rmBlock('event', data.x, data.y);
            core.battle(data.event.id, data.x, data.y);
            if (core.isset(callback))
                callback();
        },
        'changeFloor': function (data, core, callback) {
            // core.changeFloor(data.event.data.floorId, data.event.data.heroLoc);
            core.changeFloor(data.event.data.floorId, data.event.data.stair,
                data.event.data.heroLoc, callback);
        },
        'getItem': function (data, core, callback) {
            core.getItem(data.event.id, 1, data.x, data.y);
            if (core.isset(callback))
                callback();
        },
        'openDoor': function (data, core, callback) {
            core.openDoor(data.event.id, data.x, data.y, true);
            if (core.isset(callback))
                callback();
        },
        'visitNpc': function (data, core, callback) {
            core.visitNpc(data.event.npcid);
            if (core.isset(callback))
                callback();
        },
        'openShop': function (data, core, callback) {
            core.openShop(data.event.shopid);
            if (core.isset(callback))
                callback();
        }
    }
}

events.prototype.getEvents = function (eventName) {
    if (eventName == undefined) {
        return this.events;
    }
    return this.events[eventName];
}

main.instance.events = new events();