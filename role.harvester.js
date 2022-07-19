var roleHarvester = {

    run: function(creep) {
        var creep_last = null;
        for(const type in creep.store){
            if(type) creep_last = type;
        }
        var storage = creep.room.storage;
        var terminal = creep.room.terminal;
        var spawns = creep.room.find(FIND_MY_SPAWNS);
        var spawn = creep.pos.findClosestByPath(spawns);
        // creep.room.visual.text(creep.memory.h, creep.pos.x, creep.pos.y,{color: 'yellow', font: 0.5});
        if(creep.store.getUsedCapacity() == 0) {
            creep.memory.h = false;
	    }
	    if(creep.store.getFreeCapacity() == 0) {
	        creep.memory.h = true;
	    }
	    if(creep.memory.role == '运输爬4' && creep.room.name != 'E17S54'){
	        creep.moveTo(new RoomPosition(32,46, 'E17S54'));
	    }else
	    if(!creep.memory.h) {
	        const droped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(droped && droped.amount >= 100) {
                if(creep.pickup(droped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droped,{visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                let tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES,{filter: s => s.store.getUsedCapacity() >= 100});
                if (tombstone){
                    var t = null;
                    for(const type in tombstone.store){
                        if(type) t = type;
                    }
                    if (creep.withdraw(tombstone,t) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombstone,{visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    let ruin = creep.pos.findClosestByPath(FIND_RUINS,{filter: s => s.store[RESOURCE_ENERGY] > 0})
                    if (ruin && ruin.store.getUsedCapacity() > 100){
                        if (creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(ruin,{visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        let container = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > creep.store.getCapacity()-100 && i.store[RESOURCE_ENERGY] > 50});
                        if(container && container.pos.x != 19){
                            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(container,{visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }else{
                            if(creep.room.name == 'W13N59' || !storage || creep.room.energyCapacityAvailable <= 800){
                                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                                var source = creep.pos.findClosestByPath(sources);
                                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(source,{ignoreCreeps:false});
                                }
                            }else{
            	                if(Math.random()*10 > 8){
            	                    if(storage && storage.my && storage.store[RESOURCE_ENERGY] < 1000){
            	                        creep.say('家里的能量不足1k了!',true);
            	                    }else if (storage && storage.my && storage.store[RESOURCE_ENERGY] < 10000){
            	                         creep.say('家里能量好像有点少了',true);
            	                    }else{
                                        creep.say('外面没能量了但家里有',true);
            	                    }
                                }
                                if(creep.room.name == 'E17S55'){
                                    creep.moveTo(11,25)
                                }
                                if(storage.store[RESOURCE_ENERGY] < 5000){
                                    if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(terminal,{visualizePathStyle: {stroke: '#ffffff'},ignoreCreeps:false});
                                    }
                                }else
                                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffffff'},ignoreCreeps:false});
                                }
                            }
                        }
                    }
                }
            }
        }else {
            if(Math.random()*10 > 9){
                creep.say('在路上呢，别急快到了',true);
            }
            if(creep_last != RESOURCE_ENERGY){
                if(storage && storage.my && storage.store.getFreeCapacity() > 5000){
                    if(creep.transfer(storage, creep_last) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }else{
                    if(creep.transfer(terminal, creep_last) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(terminal,{visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
            }else{
                var towers = creep.room.find(FIND_STRUCTURES,{filter : t => t.structureType == STRUCTURE_TOWER && t.store.getFreeCapacity(RESOURCE_ENERGY) > 0});
                if(towers[0]){
                    if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[0],{visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }else{
                    var targets = creep.room.find(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_EXTENSION ||
                                        structure.structureType == STRUCTURE_SPAWN ||
                                        structure.structureType == STRUCTURE_LAB ||
                                        structure.structureType == STRUCTURE_NUKER ||
                                        structure.structureType == STRUCTURE_TOWER) && 
                                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                            }
                    });
                    if(targets.length > 0) {
                        var l = creep.pos.findClosestByPath(targets);
                        if(creep.transfer(l, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(l,{visualizePathStyle: {stroke: '#ffff00'}});
                        }
                    }else {
                        let powerspawn = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (i) => i.structureType == STRUCTURE_POWER_SPAWN && i.store[RESOURCE_ENERGY] < 4500});
                        if(powerspawn) {
                            if(creep.transfer(powerspawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(powerspawn,{visualizePathStyle: {stroke: '#ffff00'}});
                            }
                        }else if(storage && storage.my && storage.store.getFreeCapacity() > 5000){
                            if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage,{visualizePathStyle: {stroke: '#ffff00'}});
                            }
                        }else{
                            if(creep.transfer(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(terminal,{visualizePathStyle: {stroke: '#ffff00'}});
                            }
                        }
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;