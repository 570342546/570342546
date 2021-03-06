var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.role =='维护爬4' && creep.room.name != 'E17S54'){
            creep.moveTo(new RoomPosition(32,46, 'E17S54'));
        }else if(creep.memory.role =='维护爬5' && creep.room.name != 'W33S14'){
            creep.moveTo(new RoomPosition(32,28, 'W33S14'));
        }else{
        var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        var color = '#ff0000';
        var storage = creep.room.storage;
	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
			creep.say('我又用完能量了🙀',true);
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('找到能量了去维护喽',true);//decide what to do
	    }
        
	    if(creep.memory.repairing) {
	        var b = null;
            for(const type in creep.store){
                if(type) b = type;
            }
            if(b != null && b != RESOURCE_ENERGY){
                if(creep.transfer(storage, b) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }else{
    			var broken = creep.pos.findClosestByPath(FIND_STRUCTURES, {
    			    filter: structure => structure.hits < structure.hitsMax-1000
    			    && structure.structureType != STRUCTURE_WALL 
    			    && structure.structureType != STRUCTURE_RAMPART
    			});
    			if(broken) {
        	        if(Math.ceil(Math.random()*10) == 5){
                        creep.say('一直在修东西好tm累',true);
                    }
    				if(creep.repair(broken) == ERR_NOT_IN_RANGE) {
    					creep.moveTo(broken,{visualizePathStyle: {stroke: color}});
    				}
    			}else{
    			      var wall;
    			      if(creep.room.name == 'E17S57'){
    			          wall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                			    filter: w => w.hits < 3000000
                			    && w.structureType == STRUCTURE_WALL
                			    && w.pos.y <= 28
                			});
    			      }else{
    			          wall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                			    filter: w => w.hits < 2000000
                			    && w.structureType == STRUCTURE_WALL
                			});
    			      }
            			if(wall){
            			    if(wall == Game.getObjectById('62d2b8022fbd1965d7632dd8')){
            			        if(creep.repair(wall) == ERR_NOT_IN_RANGE) {
                					creep.moveTo(16,19);
                				}
            			    }else
            			    if(creep.repair(wall) == ERR_NOT_IN_RANGE) {
            			        creep.moveTo(wall,{visualizePathStyle: {stroke: color}});
        				    }
            			}else{
            			    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                	        var target = creep.pos.findClosestByPath(targets);
                            if(target) {
                                // creep.build(target)
                                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(target,{visualizePathStyle: {stroke: '#0000ff'}});
                                }
                            }else{
                                var rampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    			    filter: r => r.hits < 11000000
                    			    && r.structureType == STRUCTURE_RAMPART
                    			});
                    			if(rampart){
                    			    if(rampart == Game.getObjectById('62d2b66330b48b0005de376f')){
                    			        if(creep.repair(rampart) == ERR_NOT_IN_RANGE) {
                        					creep.moveTo(16,19);
                        				}
                    			    }else
                    			    if(creep.repair(rampart) == ERR_NOT_IN_RANGE) {
                    					creep.moveTo(rampart,{visualizePathStyle: {stroke: color},ignoreCreeps:false});
                    				}
                    			}else{
                			    if(creep.room.name != 'E17S57' && creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                                    if(creep.room.name == 'E17S55'){
                                        creep.moveTo(16,19);
                                    }else if(creep.room.name == 'E17S54'){
                                        creep.moveTo(33,43);
                                    }else creep.moveTo(creep.room.controller);
                                }
                			    if(Math.ceil(Math.random()*10) == 1){
                                    creep.say('没啥可修,升级去喽.',true);
                                }
                            }
            			}
        			}
    			}
	        }
	    }
	    else {
	        const droped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if(droped && droped.amount > 100) {
                if(creep.pickup(droped) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(droped);
                }
            }else{
                let tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES,{filter: s => s.store[RESOURCE_ENERGY] > 0});
                if (tombstone){
                    if (creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tombstone);
                    }
                }else{
                    let ruin = creep.pos.findClosestByPath(FIND_RUINS,{filter: s => s.store[RESOURCE_ENERGY] > 0})
                    if (ruin){
                        if (creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(ruin);
                        }
                    }else{
                        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] >= 50});
                        if (container) {
                            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(container);
                            }
                        }else{
                            if(spawn.room.energyCapacityAvailable <= 800){
                                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                                var source = creep.pos.findClosestByPath(sources);
                                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(source);
                                }
                            }else{
                                if(storage){
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
        }
	}
};

module.exports = roleRepairer;