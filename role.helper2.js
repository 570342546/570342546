var roleHelper2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.hits < creep.hitsMax){
            creep.heal(creep);
        }
        var n = creep.room.name;
        if(n == 'W35S15')Game.flags['Flag10'].setPosition(new RoomPosition(8,25, 'W34S14'));
        var f = Game.flags['Flag10'];
        var help = false;
        if(n == 'W33S14') help = true;
        console.log(creep,'(',creep.ticksToLive,'):',creep.pos,'->',f.pos,creep.memory.building,help);
        if(help){
            var c = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(c && c.owner.username != 'yaddrx2') {
                creep.attack(c);
                creep.moveTo(c,{visualizePathStyle: {stroke: '#ff0000'}});
            }
            var c = Game.getObjectById('5bbcab2b9099fc012e633038')
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('身上没能量用了啊😹',true);
    	    }
    	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    	        creep.memory.building = true;
    	        creep.say('🚧 建造/升级',true);
    	    }
            if(creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                var target = creep.pos.findClosestByPath(targets);
                if(target) {
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }else if(creep.upgradeController(c) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(c);
                }
	        }else{
	            const droped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if(droped && droped.amount >= 100) {
                    if(creep.pickup(droped) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droped,{visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    let tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES,{filter: s => s.store.getUsedCapacity(RESOURCE_ENERGY) >= 100});
                    if (tombstone){
                        if (creep.withdraw(tombstone,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(tombstone,{visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        let ruin = creep.pos.findClosestByPath(FIND_RUINS,{filter: s => s.store[RESOURCE_ENERGY] > 0})
                        if (ruin){
                            if (creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(ruin,{visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }else{
                            let container = creep.pos.findClosestByPath(FIND_STRUCTURES,{filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > creep.store.getCapacity()-100 && i.store[RESOURCE_ENERGY] > 50});
                            if(container && container.pos.x != 19){
                                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                    creep.moveTo(container);
                                }
                            }else{
                                var storage = creep.room.storage;
                                if(storage.store[RESOURCE_ENERGY] > 5000){
                                    if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(storage);
                                    }
                                }else{
                                    var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                                    var source = creep.pos.findClosestByPath(sources);
                                    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                                        creep.moveTo(source);
                                    }
                                }
                            }
                        }
                    }
                }
	        }
        }else{
             if(f && n != 'W35S15'){
                if(!creep.pos.isEqualTo(f)){
                    creep.moveTo(f);
                }else{
                    if(n == 'E16S56'){
                        f.setPosition(new RoomPosition(16,2, 'E16S55'));
                    }else if(n == 'E16S55'){
                        f.setPosition(new RoomPosition(20,36, 'E15S55'));
                    }else if(n == 'E15S55'){
                        f.setPosition(new RoomPosition(30,3, 'W35S15'));
                    }else if(n == 'W35S15'){
                        f.setPosition(new RoomPosition(14,25, 'W34S14'));
                    }else if(n == 'W34S14'){
                        f.setPosition(new RoomPosition(1,28, 'W33S14'));
                    }
                }
            }else{
                if(creep.pos.y < 0){
                    creep.moveTo(33,2);
                }else{
                    creep.moveTo(new RoomPosition(8,25, 'W34S14'));
                }
            }
        }
        
        // var f = Game.flags['Flag9'];
        // var help = false;
        // var n = creep.room.name;
        // console.log(creep.room.name,':',creep.pos.x,',',creep.pos.y,creep.memory.h);
        // if(n == 'E17S49' || n == 'E16S49'){
        //     help = true;
        // }
        // if(creep.hits < creep.hitsMax){
        //     creep.heal(creep);
        // }
        // if(help){
        //     if(creep.store[RESOURCE_ENERGY] == 0 ) creep.memory.h = false;
        //     if(creep.store[RESOURCE_ENERGY] == 250) creep.memory.h = true;
        //     if(creep.memory.h){
        //         if(n == 'E16S49'){
        //             creep.moveTo(new RoomPosition(2,15, 'E17S49'))
        //         }else{
        //             var target = creep.room.find(FIND_CONSTRUCTION_SITES);
        //             if(target[0]) {
        //                 if(creep.build(target[0]) == ERR_NOT_IN_RANGE) {
        //                     creep.moveTo(target[0]);
        //                 }
        //             }
        //         }
        //     }else{
        //         const droped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        //         if(droped) {
        //             if(creep.pickup(droped) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(droped,{visualizePathStyle: {stroke: '#ffffff'}});
        //             }
        //         }else{
        //             if(n == 'E17S49'){
        //                 creep.moveTo(new RoomPosition(47,15, 'E16S49'))
        //             }else{
        //                 var k = Game.getObjectById('5bbcade69099fc012e638197');
        //                 if(creep.harvest(k) == ERR_NOT_IN_RANGE) {
        //                     creep.moveTo(k);
        //                 }
        //             }
        //         }
        //     }
        // }else{
        //     if(f){
        //         if(!creep.pos.isEqualTo(f)){
        //             creep.moveTo(f);
        //         }else{
        //             if(creep.room.name == 'E16S56'){
        //                 f.setPosition(new RoomPosition(26,23, 'E15S56'));
        //             }else if(creep.room.name == 'E15S56'){
        //                 f.setPosition(new RoomPosition(6,7, 'E15S55'));
        //             }else if(creep.room.name == 'E15S55'){
        //                 f.setPosition(new RoomPosition(25,34, 'E15S54'));
        //             }else if(creep.room.name == 'E15S54'){
        //                 f.setPosition(new RoomPosition(44,6, 'E14S54'));
        //             }else if(creep.room.name == 'E14S54'){
        //                 f.setPosition(new RoomPosition(28,2, 'E14S53'));
        //             }else if(creep.room.name == 'E14S53'){
        //                 f.setPosition(new RoomPosition(36,4, 'E14S52'));
        //             }else if(creep.room.name == 'E14S52'){
        //                 f.setPosition(new RoomPosition(40,42, 'E14S51'));
        //             }else if(creep.room.name == 'E14S51'){
        //                 f.setPosition(new RoomPosition(24,24, 'E15S50'));
        //             }else if(creep.room.name == 'E15S50'){
        //                 f.setPosition(new RoomPosition(3,48, 'E16S49'));
        //             }
        //         }
        //     } 
        // }
        
        
        
        
        
        
        
        
        
        
        // if(creep.room.name != 'E17S54'){
        //     creep.moveTo(new RoomPosition(35,44, 'E17S54'));
        // }else{
        //     var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
    	   // if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        //         creep.memory.building = false;
        //         creep.say('身上没能量用了啊😹',true);
    	   // }
    	   // if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    	   //     creep.memory.building = true;
    	   //     creep.say('🚧 正在去建设工地建造',true);
    	   // }
    
        //     var storage = creep.room.storage;
    	   // if(creep.memory.building) {
    	   //     var b = null;
        //         for(const type in creep.store){
        //             if(type) b = type;
        //         }
        //         if(b != RESOURCE_ENERGY && storage){
        //             if(creep.transfer(storage, b) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(storage);
        //             }
        //         }else{
        //             var targets = creep.room.find(FIND_STRUCTURES, {
        //                     filter: (structure) => {
        //                         return (structure.structureType == STRUCTURE_EXTENSION ||
        //                                 structure.structureType == STRUCTURE_SPAWN ||
        //                                 structure.structureType == STRUCTURE_LAB ||
        //                                 structure.structureType == STRUCTURE_TOWER) && 
        //                                 structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        //                     }
        //             });
        //             if(targets.length > 0){
        //                 var l = creep.pos.findClosestByPath(targets);
        //                 if(creep.transfer(l, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //                     creep.moveTo(l,{visualizePathStyle: {stroke: '#ffff00'}});
        //                 }
        //             }else{
        //     	        targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        //     	        var target = creep.pos.findClosestByPath(targets);
        //                 if(target) {
        //                     // creep.build(target)
        //                     if(creep.build(target) == ERR_NOT_IN_RANGE) {
        //                         creep.moveTo(target,{visualizePathStyle: {stroke: '#0000ff'}});
        //                     }
        //                 }else{
                            
        //                     // creep.upgradeController(creep.room.controller)
        //                     if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        //                         if(creep.room.name == 'E17S54'){
        //                             creep.moveTo(34,43);
        //                         }else creep.moveTo(creep.room.controller);
        //                     }
        //                 }
        //             }
        //         }
    	   // }else {
    	   //     const droped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
        //         if(droped && droped.amount > 100) {
        //             if(creep.pickup(droped) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(droped,{visualizePathStyle: {stroke: '#ffffff'}});
        //             }
        //         }else{
        //             let tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES,{filter: s => s.store.getUsedCapacity() > 0});
        //             if (tombstone){
        //                 if (creep.withdraw(tombstone,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //                     creep.moveTo(tombstone,{visualizePathStyle: {stroke: '#ffffff'}});
        //                 }
        //             }else{
        //     	        var containers = creep.room.find(FIND_STRUCTURES, {filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] >= 100});
        //                 var container = creep.pos.findClosestByPath(containers);
        //                 if(container){
        //                     if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //                         creep.moveTo(container);
        //                     }
        //                 }else{
        //                     var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        //                     var source = creep.pos.findClosestByPath(sources);
                            
        //                     if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        //                         creep.moveTo(source,);
        //                     }
        //                 }
        //             }
        //         }
    	   // }
        // }
	}
};

module.exports = roleHelper2;