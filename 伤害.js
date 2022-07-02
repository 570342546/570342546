var 伤害 = {

    /** @param {Creep} creep **/
    run: function(roomname) {
        const visual = new RoomVisual(roomname);
        Game.getObjectById('62a5e9af0cf73114d4d8c7f0').observeRoom(roomname);
        var towers = Game.rooms[roomname].find(FIND_HOSTILE_STRUCTURES,{filter:b => b.structureType == STRUCTURE_TOWER});
        for(let y = 0; y < 50; y++) {
            for(let x = 0; x < 50; x++) {
                var hc = 0;
                for(var tower of towers){
                    var length = tower.pos.getRangeTo(x,y);
                    if(length <= 5){
                        hc += 600;
                    }else if(length >= 20){
                        hc += 150
                    }else{
                        var h = length*(-30) + 750;
                        hc += h;
                    }
                }
                visual.text(hc, x, y,{font : 0.3});
            }
        }
	}
};

module.exports = 伤害;