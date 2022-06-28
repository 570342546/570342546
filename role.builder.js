var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role =='建造爬4' && creep.room.name != 'E17S54'){
            creep.moveTo(new RoomPosition(32,46, 'E17S54'));
        }else{
        var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('身上没能量用了啊😹',true);
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 建造/升级',true);
	    }

	    if(creep.memory.building) {
	        var b = null;
            for(const type in creep.store){
                if(type) b = type;
            }
            if(b != RESOURCE_ENERGY){
                var storage = creep.room.storage;
                if(creep.transfer(storage, b) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }else{
    	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    	        var target = creep.pos.findClosestByPath(targets);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target,{visualizePathStyle: {stroke: '#0000ff'}});
                    }
                }else{
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        if(creep.room.name == 'E17S55'){
                            creep.moveTo(16,19);
                        }else creep.moveTo(creep.room.controller);
                    }
                }
            }
	    }else {
            //         var containers = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 200});
            //         var container = creep.pos.findClosestByPath(containers);
                    
            //         var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            //         var source = creep.pos.findClosestByPath(sources);
                    
            //         var range1 = creep.pos.getRangeTo(container);
            //         var range2 = creep.pos.getRangeTo(source);
            //         if(containers.length == 0 && sources.length > 0){
            //             if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //                 creep.moveTo(source);
            //             }
            //         }else if(containers.length > 0 && sources.length == 0){
            //             if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //                 creep.moveTo(container,{visualizePathStyle: {stroke: '#ffffff'}});
            //             }
            //         }else if(containers.length > 0 && sources.length > 0){
            //             if(range1 >= range2){
            //             if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            //                     creep.moveTo(source);
            //                 }
            //             }else{
            //                 if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //                     creep.moveTo(container,{visualizePathStyle: {stroke: '#ffffff'}});
            //                 }
            //             }
            //         }
            // }
            if(creep.room.name == 'E17S56'){
                const link = Game.getObjectById('62ab22a64d1dab2608d90acc');
                creep.withdraw(link,RESOURCE_ENERGY);
                creep.moveTo(link)
            }else{
                const droped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if(droped) {
                    if(creep.pickup(droped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droped,{visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    var storage = creep.room.storage;
                    var containers = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 100});
                    var container = creep.pos.findClosestByPath(containers);
                    if(container && creep.room.name != 'E17S57'){
                        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container,{visualizePathStyle: {stroke: '#0000ff'}});
                        }
                    }else{
                        if(spawn.room.energyCapacityAvailable <= 800){
                            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                            var source = creep.pos.findClosestByPath(sources);
                            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(source);
                            }
                        }else{
                            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage,{visualizePathStyle: {stroke: '#0000ff'}});
                            }
                        }
                    }
                }
            }
	    }
	}
    }
};

module.exports = roleBuilder;