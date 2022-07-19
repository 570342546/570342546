var roleHelper = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.hits < creep.hitsMax){
            creep.heal(creep);
        }
        var n = creep.room.name;
        if(n == 'W15N55')Game.flags['Flag9'].setPosition(new RoomPosition(43,36, 'W15N56'));
        var f = Game.flags['Flag9'];
        var help = false;
        if(n == 'W13N59') help = true;
        console.log(creep,'(',creep.ticksToLive,'):',creep.pos,'->',f.pos,help);
        if(help){
            var body_length = creep.body.length;
            if(creep.ticksToLive < 300)creep.memory.live = false;
            if(creep.ticksToLive >= 1500-(600/body_length) || creep.room.energyAvailable < 100)creep.memory.live = true;
            if(creep.memory.live){
                if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                    creep.memory.building = false;
                    creep.say('身上没能量用了啊😹',true);
        	    }
        	    if(!creep.memory.building && creep.store.getUsedCapacity() > 0) {
        	        creep.memory.building = true;
        	        creep.say('🚧 建造/升级',true);
        	    }
                if(creep.memory.building) {
                    var c = creep.room.controller
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    var target = creep.pos.findClosestByPath(targets);
                    if(target) {
                        if(creep.build(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }else{
                        if(creep.upgradeController(c) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(c);
                        }
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
                                var link = Game.getObjectById('62d3f4c355ce7d5fe29e5c8d')
                                if(link.store[RESOURCE_ENERGY] > 0){
                                    if(creep.withdraw(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)creep.moveTo(link)
                                }else creep.memory.building = false;
                            }
                        }
                    }
                }
            }else{
                if(Game.getObjectById('62ce7e4531110807da0910f7').renewCreep(creep) == ERR_NOT_IN_RANGE)creep.moveTo(8,13)
            }
        }else{
            if(n =='W15N55' && creep.pos.x < 38){
                creep.moveTo(38,10)
            }else{
                if(!creep.pos.isEqualTo(f)){
                    creep.moveTo(f,{reusePath: 50,visualizePathStyle: {stroke: '#ffffff'}});
                }else{
                    if(n == 'E16S55'){
                        f.setPosition(new RoomPosition(18,13, 'E15S55'));
                    }else if(n == 'W15N55'){
                        f.setPosition(new RoomPosition(47,26, 'W15N56'));
                    }else if(n == 'W15N56'){
                        f.setPosition(new RoomPosition(11,14, 'W14N56'));
                    }else if(n == 'W14N56'){
                        f.setPosition(new RoomPosition(47,9, 'W14N58'));
                    }else if(n == 'W14N58'){
                        f.setPosition(new RoomPosition(2,40, 'W13N59'));
                    }
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
        
        
        // if(creep.room.name != 'E18S55'){
        //     creep.moveTo(new RoomPosition(25,25,'E18S55'))
        // }else{
        //     if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        //         creep.memory.building = false;
        //         creep.say('身上没能量用了啊😹',true);
    	   // }
    	   // if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    	   //     creep.memory.building = true;
    	   //     creep.say('🚧 正在去建设工地建造',true);
    	   // }
    	   // if(creep.memory.building){
        //         if(creep.build(Game.getObjectById('62bd0a09eebd84c5c7cba49a')) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(target,{visualizePathStyle: {stroke: '#0000ff'}});
        //         }
    	   // }else{
    	   //     if(creep.withdraw(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    	   //         creep.moveTo(24,6)
    	   //     }
    	   // }
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

module.exports = roleHelper;