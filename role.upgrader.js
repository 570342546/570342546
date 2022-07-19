var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var con = creep.room.controller;
        var terminal = creep.room.terminal;
        // if(con.level == 8 && con.ticksToDowngrade > 1000000000){
            
        // }else{
            var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
            var storage = creep.room.storage;
                var lab = Game.getObjectById('6295e9040a952e492de76cc5');
                if(creep.room.name == 'E17S57' && creep.body[0].boost == undefined && lab.store[RESOURCE_GHODIUM_ACID] >= 30){
                    
                    if(lab.boostCreep(creep,[creep.getActiveBodyparts(WORK)]) == ERR_NOT_IN_RANGE){
                        creep.moveTo(lab);
                    }
                    
                }else{
                    if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                        creep.memory.upgrading = false;
                        creep.say('😥身上没能量了',true);
            	    }
            	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            	        creep.memory.upgrading = true;
            	        creep.say('😸去升级控制器啰',true);
            	    }
            	    
            	    if(creep.memory.upgrading) {
            	        if(Math.ceil(Math.random()*10) == 9){
                            creep.say('升级升级💪',true);
                        }
                        if(creep.upgradeController(con) == ERR_NOT_IN_RANGE) {
                            if(creep.room.name == 'E17S55'){
                                creep.moveTo(16,19);
                            }else if(creep.room.name == 'E17S54'){
                                creep.moveTo(34,43);
                            }else creep.moveTo(con,{ignoreCreeps:false,reusePath: 40});
                        }
                    }else {
                        if(Math.ceil(Math.random()*10) == 9){
                            creep.say('能量在哪呢，哦看到了',true);
                        }else if(Math.ceil(Math.random()*10) == 8){
                            creep.say('别一直看着我行不行!',true);
                        }
                        if(creep.room.name == 'E17S56'){
                            const link = Game.getObjectById('62ab22a64d1dab2608d90acc');
                            creep.withdraw(link,RESOURCE_ENERGY);
                            creep.moveTo(link)
                        }else if(creep.room.name == 'W13N59'){
                            const link = Game.getObjectById('62d3f4c355ce7d5fe29e5c8d');
                            creep.withdraw(link,RESOURCE_ENERGY);
                            creep.moveTo(link)
                        }else
                        {
                            if(creep.room.name == 'E17S55'){
                                if(storage && storage.my){
                                    if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(storage);
                                    }
                                }
                            }else if(creep.room.name == 'W33S14'){
                                if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(terminal);
                                }
                            }
                            else{
                                var containers = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > creep.store.getCapacity() - 100 && i.store[RESOURCE_ENERGY] > 0});
                                var container = creep.pos.findClosestByPath(containers);
                                if(container){
                                    if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(container);
                                    }
                                }else{
                                    if(spawn.room.energyCapacityAvailable <= 800 || !storage){
                                        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                                        var source = creep.pos.findClosestByPath(sources);
                                        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                            creep.moveTo(source,{ignoreCreeps:false});
                                        }
                                    }else{
                                        if(storage && storage.my){
                                            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                                creep.moveTo(storage);
                                            }
                                        }
                                    }
                                }
                            }
                    // }
                }
            }
        }
	}
};

module.exports = roleUpgrader;