var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role =='建造爬4' && creep.room.name != 'E17S54'){
            creep.moveTo(new RoomPosition(32,46, 'E17S54'));
        }else if(creep.memory.help == 'help'&& creep.room.name != 'E17S56'){
            console.log(creep.pos)
            creep.moveTo(new RoomPosition(32,46, 'E17S56'));
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
                            creep.moveTo(target,{ignoreCreeps:false});
                        }
                    }else{
                        var rampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            			    filter: r => r.hits < 10001000
            			    && r.structureType == STRUCTURE_RAMPART
            			});
            			if(rampart){
            			    if(rampart == Game.getObjectById('62d2b66330b48b0005de376f')){
            			        if(creep.repair(rampart) == ERR_NOT_IN_RANGE) {
                					creep.moveTo(16,19);
                				}
            			    }else
            			    if(creep.repair(rampart) == ERR_NOT_IN_RANGE) {
            					creep.moveTo(rampart,{ignoreCreeps:false});
            				}
            			}else
                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            if(creep.room.name == 'E17S55'){
                                creep.moveTo(16,19);
                            }else creep.moveTo(creep.room.controller,{ignoreCreeps:false});
                        }
                    }
                }
    	    }else {
                if(creep.room.name == 'E17S56' && creep.pos.x >= 34){
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
                        if(container && creep.room.name != 'E17S57' && creep.room.name != 'E17S55'){
                            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(container,{visualizePathStyle: {stroke: '#0000ff'}});
                            }
                        }else{
                            if(creep.room.name != 'E17S56' && spawn.room.energyCapacityAvailable <= 800){
                                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                                var source = creep.pos.findClosestByPath(sources);
                                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(source);
                                }
                            }else{
                                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(storage,{ignoreCreeps:false});
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