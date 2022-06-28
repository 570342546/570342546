var roleHarvesterU = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var mineral = creep.room.find(FIND_MINERALS)[0];
        if(mineral.mineralAmount > 0){
    	    if(creep.store.getFreeCapacity() > 0) {
                if(Game.time % 3 == 0)creep.say('🙈',true);
                if(Game.time % 3 == 1)creep.say('🙉',true);
                if(Game.time % 3 == 2)creep.say('🙊',true);
                
                if(creep.harvest(mineral) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(mineral);
                }
            }
            else {
                var b = null;
                for(const type in creep.store){
                    if(type) b = type;
                }
                var terminal = creep.room.terminal;
                if(terminal) {
                    if(creep.transfer(terminal, b) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal);
                    }
                }else{
                    var storage = creep.room.storage;
                    if(creep.transfer(storage, b) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage);
                    }
                }
            }
        }else{
            var spawns = creep.room.find(FIND_MY_SPAWNS);
            var spawn = creep.pos.findClosestByPath(spawns);
            if(spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(spawn);
            }
        }
	}
};

module.exports = roleHarvesterU;